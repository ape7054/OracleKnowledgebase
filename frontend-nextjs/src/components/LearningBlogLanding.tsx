/** @jsxImportSource react */
import React from 'react';
import Link from 'next/link';
// 导入 Simple Icons
import { 
  SiReact, 
  SiNextdotjs, 
  SiTypescript, 
  SiGo, 
  SiDocker
} from 'react-icons/si';

// 提取样式常量以避免每次渲染时重新创建对象
const styles = {
  heroText: { textAlign: 'center' as const, fontSize: '18px', maxWidth: '600px', margin: '0 auto 40px' },
  heroButtons: { gap: '24px', flexWrap: 'wrap' as const },
  heroButton: { width: 'auto', padding: '0 32px' },
  sectionTitle: { marginBottom: '80px', marginTop: '100px' },
  sectionDesc: { fontSize: '18px', maxWidth: '600px', margin: '0 auto' },
  iconContainer: { 
    width: '40px', 
    height: '40px', 
    background: 'var(--primary-gradient)', 
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px'
  },
  cardButton: { width: 'auto', padding: '12px 24px' },
  tableSeparator: { width: '100%', height: '1px', background: '#2B2C3B', margin: '8px 0' },
  viewAllButton: { width: 'auto', padding: '16px 32px' },
  techTitle: { color: '#18C8FF', marginBottom: '16px', fontSize: '18px' },
  techList: { display: 'flex', flexDirection: 'column' as const, gap: '8px', width: '100%' },
  techItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  techName: { opacity: 0.9 },
  footerGrid: { alignItems: 'start' as const },
  footerTitle: { textAlign: 'left' as const, marginBottom: '20px' },
  footerButtons: { marginTop: '20px', display: 'flex', gap: '16px' },
  footerButton: { width: 'auto', padding: '12px 20px' },
  navList: { display: 'flex', flexDirection: 'column' as const, gap: '8px' },
  navLink: { opacity: 0.7, textDecoration: 'none' },
  contactList: { display: 'flex', flexDirection: 'column' as const, gap: '8px' },
  contactItem: { opacity: 0.7 },
  footerBottom: { 
    marginTop: '40px', 
    paddingTop: '20px', 
    borderTop: '1px solid rgba(255,255,255,0.1)',
    textAlign: 'center' as const
  },
  copyright: { opacity: 0.5 }
};

const LearningBlogLanding: React.FC = React.memo(() => {
  return (
    <div className="landing-page">
      {/* 背景装饰元素 */}
      <div className="background-decoration">
        {/* 网格线 */}
        <div className="grid-overlay" />
        
        {/* 浮动几何形状 */}
        <div className="floating-shapes">
          <div className="shape shape-1" />
          <div className="shape shape-2" />
          <div className="shape shape-3" />
        </div>
      </div>

      {/* 导航栏 */}
      <header className="header">
        <div className="header-content">
          <Link href="/" className="logo">
            Learning <span className="gradient-text">Stack</span>
          </Link>
          <nav className="menu">
        
            <a href="#features" className="menu-item">记录</a>
            <Link href="/articles" className="menu-item" prefetch={true}>文章</Link>
            <Link href="/trade" className="menu-item" prefetch={true}>项目</Link>
            <a href="#about" className="menu-item">关于</a>
          </nav>
        </div>
      </header>

      {/* 主题区域 */}
      <section className="hero-section" id="home">
        <div className="container">
          <div className="animate-fade-in-up">
            <h1 className="heading-primary">
              记录，思考
              <br />
              <span className="gradient-text">持续创造</span>
            </h1>
            <p className="body-text" style={styles.heroText}>
              无论是技术的深度、历史的回响，还是对AI未来的畅想，
              这里是我记录学习、沉淀思考的地方。
            </p>
            <div className="flex-center" style={styles.heroButtons}>
              <Link href="/articles" className="btn-primary" style={styles.heroButton} prefetch={true}>
                开始阅读
              </Link>
              <Link href="/trade" className="btn-secondary" style={styles.heroButton} prefetch={true}>
                查看项目
              </Link>
            </div>
          </div>
          
          {/* 技术栈展示 - Logo Cloud 风格 */}
          <div style={{ marginTop: '48px' }}>
            <div className="logo-cloud-grid" style={{ marginTop: '32px' }}>
              <Link href="/articles?tag=react" className="tech-logo-item-simple" prefetch={true}>
                <SiReact className="tech-svg-simple" />
              </Link>
              
              <Link href="/articles?tag=nextjs" className="tech-logo-item-simple" prefetch={true}>
                <SiNextdotjs className="tech-svg-simple" />
              </Link>
              
              <Link href="/articles?tag=typescript" className="tech-logo-item-simple" prefetch={true}>
                <SiTypescript className="tech-svg-simple" />
              </Link>
              
              <Link href="/articles?tag=go" className="tech-logo-item-simple" prefetch={true}>
                <SiGo className="tech-svg-simple" />
              </Link>
              
              <Link href="/articles?tag=docker" className="tech-logo-item-simple" prefetch={true}>
                <SiDocker className="tech-svg-simple" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 特色功能区域 */}
      <section className="features-section" id="features">
        <div className="container">
          <div className="text-center" style={styles.sectionTitle}>
            <h2 className="heading-secondary">
              我的 <span className="gradient-text">学习记录</span>
            </h2>
            <p className="body-text" style={styles.sectionDesc}>
              记录技术学习历程，分享知识探索过程中的心得体会
            </p>
          </div>
          
          <div className="grid grid-3">
            <div className="info-card animate-fade-in-up">
              <div className="glass-icon">
                <div style={styles.iconContainer}>
                  💻
                </div>
              </div>
              <h3 className="heading-tertiary">技术深度</h3>
              <p className="body-text" style={{ textAlign: 'center' }}>
                深入浅出的技术文章，从基础概念到高级应用，助您掌握核心技能。
              </p>
              <Link href="/articles" className="btn-primary" style={styles.cardButton} prefetch={true}>
                阅读文章
              </Link>
            </div>

            <div className="info-card animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="glass-icon">
                <div style={styles.iconContainer}>
                  🚀
                </div>
              </div>
              <h3 className="heading-tertiary">项目实践</h3>
              <p className="body-text" style={{ textAlign: 'center' }}>
                真实项目案例分析，完整的开发流程记录，理论与实践完美结合。
              </p>
              <Link href="/trade" className="btn-primary" style={styles.cardButton} prefetch={true}>
                查看项目
              </Link>
            </div>

            <div className="info-card animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div className="glass-icon">
                <div style={styles.iconContainer}>
                  🎯
                </div>
              </div>
              <h3 className="heading-tertiary">学习路径</h3>
              <p className="body-text" style={{ textAlign: 'center' }}>
                系统化的学习路线，从零开始到技术专家，每一步都有明确的指导。
              </p>
              <Link href="/dashboard" className="btn-primary" style={styles.cardButton}>
                开始学习
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 最新文章区域 */}
      <section className="features-section" id="articles">
        <div className="container">
          <div className="text-center" style={{ marginBottom: '60px' }}>
            <h2 className="heading-secondary">
              最新 <span className="gradient-text">文章</span>
            </h2>
            <p className="body-text" style={{ fontSize: '18px' }}>
              精选技术文章，持续更新中
            </p>
          </div>
          
          <div className="data-table" style={{ margin: '0 auto' }}>
            <Link href="/articles" className="table-row" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="table-cell" style={{ width: '250px' }}>Next.js 14 全栈开发指南</div>
              <div className="table-cell table-cell-purple" style={{ width: '100px' }}>热门</div>
              <div className="table-cell" style={{ width: '120px', textAlign: 'right' }}>2024-12-15</div>
              <div className="table-cell table-cell-green" style={{ width: '80px', textAlign: 'right' }}>新增</div>
            </Link>
            
            <div style={styles.tableSeparator}></div>
            
            <Link href="/articles" className="table-row" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="table-cell" style={{ width: '250px' }}>React 性能优化技巧</div>
              <div className="table-cell table-cell-purple" style={{ width: '100px' }}>推荐</div>
              <div className="table-cell" style={{ width: '120px', textAlign: 'right' }}>2024-12-10</div>
              <div className="table-cell table-cell-green" style={{ width: '80px', textAlign: 'right' }}>精选</div>
            </Link>
            
            <div style={styles.tableSeparator}></div>
            
            <Link href="/articles" className="table-row" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="table-cell" style={{ width: '250px' }}>TypeScript 进阶实战</div>
              <div className="table-cell table-cell-purple" style={{ width: '100px' }}>深度</div>
              <div className="table-cell" style={{ width: '120px', textAlign: 'right' }}>2024-12-05</div>
              <div className="table-cell table-cell-green" style={{ width: '80px', textAlign: 'right' }}>更新</div>
            </Link>
            
            <div style={styles.tableSeparator}></div>
            
            <Link href="/articles" className="table-row" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="table-cell" style={{ width: '250px' }}>Go 微服务架构设计</div>
              <div className="table-cell table-cell-purple" style={{ width: '100px' }}>系列</div>
              <div className="table-cell" style={{ width: '120px', textAlign: 'right' }}>2024-12-01</div>
              <div className="table-cell table-cell-green" style={{ width: '80px', textAlign: 'right' }}>完结</div>
            </Link>
          </div>
          
          <div className="text-center" style={{ marginTop: '40px' }}>
                          <Link href="/articles" className="btn-primary" style={styles.viewAllButton} prefetch={true}>
                查看所有文章
              </Link>
          </div>
        </div>
      </section>

      {/* 技术栈展示 */}
      <section className="features-section" id="projects">
        <div className="container">
          <div className="text-center" style={{ marginBottom: '60px' }}>
            <h2 className="heading-secondary">
              技术 <span className="gradient-text">栈</span>
            </h2>
            <p className="body-text" style={{ fontSize: '18px' }}>
              我专注的技术领域和工具
            </p>
          </div>
          
          <div className="grid grid-3">
            <div className="info-card">
              <h4 style={styles.techTitle}>前端技术</h4>
              <div style={styles.techList}>
                <div style={styles.techItem}>
                  <span className="body-text-small" style={styles.techName}>React/Next.js</span>
                  <span className="body-text-small table-cell-green">精通</span>
                </div>
                <div style={styles.techItem}>
                  <span className="body-text-small" style={styles.techName}>TypeScript</span>
                  <span className="body-text-small table-cell-green">精通</span>
                </div>
                <div style={styles.techItem}>
                  <span className="body-text-small" style={styles.techName}>Tailwind CSS</span>
                  <span className="body-text-small table-cell-purple">熟练</span>
                </div>
                <div style={styles.techItem}>
                  <span className="body-text-small" style={styles.techName}>Vue.js</span>
                  <span className="body-text-small table-cell-purple">熟练</span>
                </div>
              </div>
            </div>
            
            <div className="info-card">
              <h4 style={styles.techTitle}>后端技术</h4>
              <div style={styles.techList}>
                <div style={styles.techItem}>
                  <span className="body-text-small" style={styles.techName}>Node.js</span>
                  <span className="body-text-small table-cell-green">精通</span>
                </div>
                <div style={styles.techItem}>
                  <span className="body-text-small" style={styles.techName}>Go</span>
                  <span className="body-text-small table-cell-purple">熟练</span>
                </div>
                <div style={styles.techItem}>
                  <span className="body-text-small" style={styles.techName}>Python</span>
                  <span className="body-text-small table-cell-purple">熟练</span>
                </div>
                <div style={styles.techItem}>
                  <span className="body-text-small" style={styles.techName}>MySQL/PostgreSQL</span>
                  <span className="body-text-small table-cell-green">精通</span>
                </div>
              </div>
            </div>
            
            <div className="info-card">
              <h4 style={styles.techTitle}>开发工具</h4>
              <div style={styles.techList}>
                <div style={styles.techItem}>
                  <span className="body-text-small" style={styles.techName}>Docker</span>
                  <span className="body-text-small table-cell-green">精通</span>
                </div>
                <div style={styles.techItem}>
                  <span className="body-text-small" style={styles.techName}>Git</span>
                  <span className="body-text-small table-cell-green">精通</span>
                </div>
                <div style={styles.techItem}>
                  <span className="body-text-small" style={styles.techName}>Kubernetes</span>
                  <span className="body-text-small table-cell-purple">学习中</span>
                </div>
                <div style={styles.techItem}>
                  <span className="body-text-small" style={styles.techName}>AWS/云服务</span>
                  <span className="body-text-small table-cell-purple">熟练</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="footer" id="about">
        <div className="container">
          <div className="grid grid-3" style={styles.footerGrid}>
            <div>
              <h3 className="heading-tertiary" style={styles.footerTitle}>
                Learning <span className="gradient-text">Stack</span>
              </h3>
              <p className="body-text">
                专注于前端开发、全栈技术和现代Web应用的技术博客。
                分享学习心得，记录成长历程。
              </p>
              <div style={styles.footerButtons}>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="btn-secondary" style={styles.footerButton}>
                  GitHub
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="btn-secondary" style={styles.footerButton}>
                  Twitter
                </a>
              </div>
            </div>
            
            <div>
              <h4 style={styles.techTitle}>快速导航</h4>
              <div style={styles.navList}>
                <Link href="/articles" className="body-text-small" style={styles.navLink} prefetch={true}>技术文章</Link>
                <Link href="/trade" className="body-text-small" style={styles.navLink} prefetch={true}>项目展示</Link>
                <Link href="/dashboard" className="body-text-small" style={styles.navLink}>学习路径</Link>
                <Link href="/account" className="body-text-small" style={styles.navLink}>关于我</Link>
              </div>
            </div>
            
            <div>
              <h4 style={styles.techTitle}>联系方式</h4>
              <div style={styles.contactList}>
                <p className="body-text-small" style={styles.contactItem}>📧 hello@learningstack.dev</p>
                <p className="body-text-small" style={styles.contactItem}>🔗 github.com/learningstack</p>
                <p className="body-text-small" style={styles.contactItem}>🐦 @learningstack</p>
                <p className="body-text-small" style={styles.contactItem}>📍 Remote / 远程工作</p>
              </div>
            </div>
          </div>
          
          <div style={styles.footerBottom}>
            <p className="body-text-small" style={styles.copyright}>
              © 2024 Learning Stack. 用心记录每一次成长。
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
});

// 设置displayName以便于调试
LearningBlogLanding.displayName = 'LearningBlogLanding';

export default LearningBlogLanding; 