'use client';
import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Paper,
  Card,
  CardContent,
  Button,
  TextField,
  Avatar,
  Stack,
  Divider,
  Chip,
  IconButton,
  Tab,
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Switch,
  FormControlLabel,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  Person,
  Security,
  History,
  Settings,
  Edit,
  Save,
  Cancel,
  Visibility,
  VisibilityOff,
  Home,
  AccountBalanceWallet,
  TrendingUp,
  TrendingDown,
  Logout,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { useAuth } from '@/lib/context/AuthContext';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index } = props;
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

interface TradeHistoryItem {
  id: string;
  type: 'buy' | 'sell';
  symbol: string;
  amount: number;
  price: number;
  total: number;
  timestamp: string;
  status: 'completed' | 'pending' | 'failed';
}

function AccountContent() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [profileData, setProfileData] = useState({
    username: user?.username || 'demo_user',
    email: user?.email || 'demo@example.com',
    fullName: '演示用户',
    phone: '+86 138 0000 0000',
    avatar: '',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [settings, setSettings] = useState({
    notifications: true,
    emailUpdates: false,
    twoFactorAuth: false,
    darkMode: true,
  });

  // 模拟交易历史数据
  const [tradeHistory] = useState<TradeHistoryItem[]>([
    {
      id: '1',
      type: 'buy',
      symbol: 'BTC',
      amount: 0.5,
      price: 45000,
      total: 22500,
      timestamp: new Date().toISOString(),
      status: 'completed'
    },
    {
      id: '2',
      type: 'sell',
      symbol: 'ETH',
      amount: 2.0,
      price: 3000,
      total: 6000,
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      status: 'completed'
    },
    {
      id: '3',
      type: 'buy',
      symbol: 'ADA',
      amount: 1000,
      price: 0.5,
      total: 500,
      timestamp: new Date(Date.now() - 172800000).toISOString(),
      status: 'pending'
    }
  ]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleProfileSave = async () => {
    setLoading(true);
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsEditing(false);
    setLoading(false);
    alert('个人信息已更新！');
  };

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('新密码与确认密码不一致');
      return;
    }
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setLoading(false);
    alert('密码修改成功！');
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('zh-CN');
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
          <Typography variant="h4" gutterBottom>
            账户管理
          </Typography>
          <Typography variant="body1" color="text.secondary">
            管理您的个人信息、安全设置和交易历史
          </Typography>
        </Box>
        
        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            startIcon={<Home />}
            onClick={() => router.push('/')}
            sx={{
              borderColor: '#00ffff',
              color: '#00ffff',
              '&:hover': {
                borderColor: '#0099cc',
                backgroundColor: 'rgba(0, 255, 255, 0.1)',
              },
            }}
          >
            返回首页
          </Button>
          
          <Button
            variant="outlined"
            startIcon={<Logout />}
            onClick={logout}
            color="error"
          >
            退出登录
          </Button>
        </Stack>
      </Box>

      <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={3}>
        {/* 侧边栏 - 用户信息卡片 */}
        <Box flex={{ xs: 1, md: '0 0 300px' }}>
          <Card
            sx={{
              background: 'rgba(26, 31, 46, 0.6)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(0, 255, 255, 0.1)',
              p: 3,
            }}
          >
            <Box textAlign="center">
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  mx: 'auto',
                  mb: 2,
                  backgroundColor: '#00ffff',
                  fontSize: '2rem',
                }}
              >
                {profileData.username[0].toUpperCase()}
              </Avatar>
              
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                {profileData.fullName}
              </Typography>
              
              <Typography variant="body2" color="text.secondary" gutterBottom>
                @{profileData.username}
              </Typography>
              
              <Chip
                label="验证用户"
                color="success"
                size="small"
                sx={{ mb: 2 }}
              />
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box>
              <Typography variant="subtitle2" gutterBottom>
                账户统计
              </Typography>
              
              <Stack spacing={1}>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body2" color="text.secondary">
                    账户余额
                  </Typography>
                  <Typography variant="body2" fontWeight="bold">
                    $50,000.00
                  </Typography>
                </Box>
                
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body2" color="text.secondary">
                    总交易次数
                  </Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {tradeHistory.length}
                  </Typography>
                </Box>
                
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body2" color="text.secondary">
                    注册时间
                  </Typography>
                  <Typography variant="body2" fontWeight="bold">
                    2024-01-01
                  </Typography>
                </Box>
              </Stack>
            </Box>
          </Card>
        </Box>

        {/* 主要内容区域 */}
        <Box flex={1}>
          <Paper
            sx={{
              background: 'rgba(26, 31, 46, 0.6)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(0, 255, 255, 0.1)',
            }}
          >
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={activeTab}
                onChange={handleTabChange}
                sx={{
                  '& .MuiTab-root': { color: 'text.secondary' },
                  '& .Mui-selected': { color: '#00ffff' },
                  '& .MuiTabs-indicator': { backgroundColor: '#00ffff' },
                }}
              >
                <Tab icon={<Person />} label="个人信息" />
                <Tab icon={<Security />} label="安全设置" />
                <Tab icon={<History />} label="交易历史" />
                <Tab icon={<Settings />} label="账户设置" />
              </Tabs>
            </Box>

            {/* 个人信息 */}
            <TabPanel value={activeTab} index={0}>
              <Stack spacing={3}>
                <Box display="flex" justifyContent="between" alignItems="center">
                  <Typography variant="h6">个人信息</Typography>
                  <Button
                    variant={isEditing ? 'contained' : 'outlined'}
                    startIcon={isEditing ? <Save /> : <Edit />}
                    onClick={isEditing ? handleProfileSave : () => setIsEditing(true)}
                    disabled={loading}
                  >
                    {loading ? <CircularProgress size={20} /> : (isEditing ? '保存' : '编辑')}
                  </Button>
                </Box>

                <TextField
                  label="用户名"
                  value={profileData.username}
                  onChange={(e) => setProfileData(prev => ({...prev, username: e.target.value}))}
                  disabled={!isEditing}
                  fullWidth
                />

                <TextField
                  label="邮箱地址"
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData(prev => ({...prev, email: e.target.value}))}
                  disabled={!isEditing}
                  fullWidth
                />

                <TextField
                  label="真实姓名"
                  value={profileData.fullName}
                  onChange={(e) => setProfileData(prev => ({...prev, fullName: e.target.value}))}
                  disabled={!isEditing}
                  fullWidth
                />

                <TextField
                  label="手机号码"
                  value={profileData.phone}
                  onChange={(e) => setProfileData(prev => ({...prev, phone: e.target.value}))}
                  disabled={!isEditing}
                  fullWidth
                />

                {isEditing && (
                  <Button
                    variant="outlined"
                    startIcon={<Cancel />}
                    onClick={() => setIsEditing(false)}
                    color="error"
                  >
                    取消
                  </Button>
                )}
              </Stack>
            </TabPanel>

            {/* 安全设置 */}
            <TabPanel value={activeTab} index={1}>
              <Stack spacing={4}>
                <Box>
                  <Typography variant="h6" gutterBottom>
                    修改密码
                  </Typography>
                  
                  <Stack spacing={2}>
                    <TextField
                      label="当前密码"
                      type={showPassword ? 'text' : 'password'}
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData(prev => ({...prev, currentPassword: e.target.value}))}
                      fullWidth
                      InputProps={{
                        endAdornment: (
                          <IconButton onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        ),
                      }}
                    />

                    <TextField
                      label="新密码"
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData(prev => ({...prev, newPassword: e.target.value}))}
                      fullWidth
                    />

                    <TextField
                      label="确认新密码"
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData(prev => ({...prev, confirmPassword: e.target.value}))}
                      fullWidth
                    />

                    <Button
                      variant="contained"
                      onClick={handlePasswordChange}
                      disabled={loading || !passwordData.currentPassword || !passwordData.newPassword}
                      sx={{
                        background: 'linear-gradient(45deg, #00ffff, #0099cc)',
                        '&:hover': {
                          background: 'linear-gradient(45deg, #0099cc, #00ffff)',
                        },
                      }}
                    >
                      {loading ? <CircularProgress size={20} /> : '修改密码'}
                    </Button>
                  </Stack>
                </Box>

                <Divider />

                <Box>
                  <Typography variant="h6" gutterBottom>
                    双重认证
                  </Typography>
                  
                  <Alert severity="info" sx={{ mb: 2 }}>
                    启用双重认证可以大大提高您账户的安全性
                  </Alert>
                  
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.twoFactorAuth}
                        onChange={(e) => setSettings(prev => ({...prev, twoFactorAuth: e.target.checked}))}
                      />
                    }
                    label="启用双重认证 (2FA)"
                  />
                </Box>
              </Stack>
            </TabPanel>

            {/* 交易历史 */}
            <TabPanel value={activeTab} index={2}>
              <Typography variant="h6" gutterBottom>
                交易历史
              </Typography>
              
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>类型</TableCell>
                      <TableCell>币种</TableCell>
                      <TableCell>数量</TableCell>
                      <TableCell>价格</TableCell>
                      <TableCell>总额</TableCell>
                      <TableCell>时间</TableCell>
                      <TableCell>状态</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tradeHistory.map((trade) => (
                      <TableRow key={trade.id}>
                        <TableCell>
                          <Chip
                            icon={trade.type === 'buy' ? <TrendingUp /> : <TrendingDown />}
                            label={trade.type === 'buy' ? '买入' : '卖出'}
                            color={trade.type === 'buy' ? 'success' : 'error'}
                            size="small"
                          />
                        </TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>{trade.symbol}</TableCell>
                        <TableCell>{trade.amount}</TableCell>
                        <TableCell>{formatCurrency(trade.price)}</TableCell>
                        <TableCell>{formatCurrency(trade.total)}</TableCell>
                        <TableCell>{formatDate(trade.timestamp)}</TableCell>
                        <TableCell>
                          <Chip
                            label={trade.status === 'completed' ? '已完成' : trade.status === 'pending' ? '待处理' : '失败'}
                            color={trade.status === 'completed' ? 'success' : trade.status === 'pending' ? 'warning' : 'error'}
                            size="small"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </TabPanel>

            {/* 账户设置 */}
            <TabPanel value={activeTab} index={3}>
              <Stack spacing={3}>
                <Typography variant="h6">通知设置</Typography>
                
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.notifications}
                      onChange={(e) => setSettings(prev => ({...prev, notifications: e.target.checked}))}
                    />
                  }
                  label="启用推送通知"
                />

                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.emailUpdates}
                      onChange={(e) => setSettings(prev => ({...prev, emailUpdates: e.target.checked}))}
                    />
                  }
                  label="接收邮件更新"
                />

                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.darkMode}
                      onChange={(e) => setSettings(prev => ({...prev, darkMode: e.target.checked}))}
                    />
                  }
                  label="暗色主题"
                />

                <Divider />

                <Box>
                  <Typography variant="h6" color="error" gutterBottom>
                    危险操作
                  </Typography>
                  
                  <Alert severity="warning" sx={{ mb: 2 }}>
                    以下操作不可逆转，请谨慎使用
                  </Alert>
                  
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => alert('删除账户功能暂未开放')}
                  >
                    删除账户
                  </Button>
                </Box>
              </Stack>
            </TabPanel>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
}

export default function AccountPage() {
  return (
    <ProtectedRoute>
      <AccountContent />
    </ProtectedRoute>
  );
} 