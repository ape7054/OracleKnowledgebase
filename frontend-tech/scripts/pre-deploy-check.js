#!/usr/bin/env node

/**
 * 部署前检查脚本
 * 用于验证项目是否准备好部署到 Vercel
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('\n🔍 开始检查项目部署准备...\n');

let hasErrors = false;
let warnings = 0;
const checks = [];

// ========== 检查项目文件 ==========

function checkFile(file, description, required = true) {
  const exists = fs.existsSync(path.join(process.cwd(), file));
  checks.push({
    name: description,
    status: exists ? 'success' : (required ? 'error' : 'warning'),
    message: exists ? `✅ ${file} 存在` : (required ? `❌ ${file} 缺失` : `⚠️  ${file} 不存在（可选）`)
  });
  
  if (!exists && required) {
    hasErrors = true;
  } else if (!exists) {
    warnings++;
  }
  
  return exists;
}

console.log('📁 检查项目文件...');
checkFile('package.json', 'Package.json', true);
checkFile('next.config.ts', 'Next.js 配置', true);
checkFile('vercel.json', 'Vercel 配置', true);
checkFile('tsconfig.json', 'TypeScript 配置', true);
checkFile('tailwind.config.js', 'Tailwind 配置', true);
checkFile('.env.local', '环境变量文件', false);
console.log('');

// ========== 检查 Git 状态 ==========

console.log('🔀 检查 Git 状态...');
try {
  const gitStatus = execSync('git status --porcelain', { encoding: 'utf-8' });
  
  if (gitStatus.trim()) {
    checks.push({
      name: 'Git 状态',
      status: 'warning',
      message: `⚠️  有未提交的更改\n   运行: git status 查看详情`
    });
    warnings++;
  } else {
    checks.push({
      name: 'Git 状态',
      status: 'success',
      message: '✅ 所有更改已提交'
    });
  }
  
  // 检查是否有远程仓库
  try {
    const remote = execSync('git remote -v', { encoding: 'utf-8' });
    if (remote.includes('github.com')) {
      checks.push({
        name: 'Git 远程仓库',
        status: 'success',
        message: '✅ 已配置 GitHub 远程仓库'
      });
    } else {
      checks.push({
        name: 'Git 远程仓库',
        status: 'error',
        message: '❌ 未找到 GitHub 远程仓库'
      });
      hasErrors = true;
    }
  } catch (error) {
    checks.push({
      name: 'Git 远程仓库',
      status: 'error',
      message: '❌ 未配置远程仓库'
    });
    hasErrors = true;
  }
} catch (error) {
  checks.push({
    name: 'Git 状态',
    status: 'error',
    message: '❌ 无法检查 Git 状态（未初始化 Git？）'
  });
  hasErrors = true;
}
console.log('');

// ========== 检查依赖 ==========

console.log('📦 检查依赖...');
const nodeModulesExists = fs.existsSync(path.join(process.cwd(), 'node_modules'));
checks.push({
  name: '依赖安装',
  status: nodeModulesExists ? 'success' : 'error',
  message: nodeModulesExists ? '✅ node_modules 存在' : '❌ 未安装依赖，请运行: npm install'
});

if (!nodeModulesExists) {
  hasErrors = true;
}

// 检查关键依赖
if (nodeModulesExists) {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
  const criticalDeps = ['next', 'react', 'next-intl', 'velite'];
  
  criticalDeps.forEach(dep => {
    const depPath = path.join(process.cwd(), 'node_modules', dep);
    const exists = fs.existsSync(depPath);
    checks.push({
      name: `依赖: ${dep}`,
      status: exists ? 'success' : 'error',
      message: exists ? `✅ ${dep} 已安装` : `❌ ${dep} 未安装`
    });
    if (!exists) hasErrors = true;
  });
}
console.log('');

// ========== 检查构建 ==========

console.log('🏗️  尝试构建项目...');
try {
  console.log('   (这可能需要几分钟...)\n');
  execSync('npm run build', { 
    stdio: 'pipe',
    encoding: 'utf-8'
  });
  
  checks.push({
    name: '项目构建',
    status: 'success',
    message: '✅ 构建成功！'
  });
  
  // 检查 .next 目录
  const nextDir = fs.existsSync(path.join(process.cwd(), '.next'));
  if (nextDir) {
    checks.push({
      name: '构建输出',
      status: 'success',
      message: '✅ .next 目录生成成功'
    });
  }
} catch (error) {
  checks.push({
    name: '项目构建',
    status: 'error',
    message: '❌ 构建失败！请修复错误后再部署\n' + error.stdout?.slice(0, 500)
  });
  hasErrors = true;
}
console.log('');

// ========== 检查配置文件 ==========

console.log('⚙️  检查配置...');

// 检查 vercel.json
if (fs.existsSync('vercel.json')) {
  try {
    const vercelConfig = JSON.parse(fs.readFileSync('vercel.json', 'utf-8'));
    
    if (vercelConfig.buildCommand && vercelConfig.buildCommand.includes('npm run build')) {
      checks.push({
        name: 'Vercel 构建命令',
        status: 'success',
        message: '✅ 构建命令配置正确'
      });
    } else {
      checks.push({
        name: 'Vercel 构建命令',
        status: 'warning',
        message: '⚠️  构建命令可能不正确'
      });
      warnings++;
    }
    
    if (vercelConfig.framework === 'nextjs') {
      checks.push({
        name: 'Vercel 框架',
        status: 'success',
        message: '✅ 框架设置为 Next.js'
      });
    }
  } catch (error) {
    checks.push({
      name: 'Vercel 配置',
      status: 'warning',
      message: '⚠️  vercel.json 解析失败'
    });
    warnings++;
  }
}

// 检查 package.json scripts
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
if (packageJson.scripts?.build) {
  checks.push({
    name: 'Build script',
    status: 'success',
    message: `✅ 构建脚本: ${packageJson.scripts.build}`
  });
} else {
  checks.push({
    name: 'Build script',
    status: 'error',
    message: '❌ package.json 缺少 build script'
  });
  hasErrors = true;
}

console.log('');

// ========== 输出结果 ==========

console.log('📊 检查结果汇总：\n');
console.log('━'.repeat(60));

checks.forEach(check => {
  console.log(`${check.message}`);
});

console.log('━'.repeat(60));
console.log('');

if (hasErrors) {
  console.log('❌ 发现 ' + checks.filter(c => c.status === 'error').length + ' 个错误，请修复后再部署！\n');
  console.log('💡 建议操作：');
  console.log('   1. 修复上述错误');
  console.log('   2. 运行 npm install 安装依赖');
  console.log('   3. 运行 npm run build 测试构建');
  console.log('   4. 提交并推送代码到 GitHub');
  console.log('');
  process.exit(1);
} else if (warnings > 0) {
  console.log(`⚠️  发现 ${warnings} 个警告，但可以继续部署。\n`);
  console.log('✅ 项目准备就绪！可以部署到 Vercel\n');
  console.log('📝 下一步：');
  console.log('   1. git add . && git commit -m "准备部署"');
  console.log('   2. git push origin master');
  console.log('   3. 在 Vercel 导入项目：https://vercel.com/new');
  console.log('   4. 添加域名 tech.ency.asia');
  console.log('');
  console.log('📚 详细文档：docs/VERCEL_DEPLOYMENT_GUIDE.md');
  console.log('');
  process.exit(0);
} else {
  console.log('✅ 完美！项目已准备好部署\n');
  console.log('📝 下一步：');
  console.log('   1. git push origin master');
  console.log('   2. 在 Vercel 导入项目：https://vercel.com/new');
  console.log('   3. 添加域名 tech.ency.asia');
  console.log('');
  console.log('📚 详细文档：docs/VERCEL_DEPLOYMENT_GUIDE.md');
  console.log('');
  process.exit(0);
}

