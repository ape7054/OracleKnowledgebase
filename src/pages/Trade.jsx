import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Chip,
  Stack,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Divider,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import {
  Save,
  Preview,
  Code,
  Visibility,
  Terminal,
  Edit,
  Publish,
  EditNote,
  Tag,
  Category,
  Schedule,
  Delete,
  Refresh,
  CloudUpload
} from '@mui/icons-material';
import MDEditor from '@uiw/react-md-editor';
import '@uiw/react-md-editor/markdown-editor.css';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const Editor = () => {
  const { user } = useAuth();
  const [article, setArticle] = useState({
    id: null,
    title: '',
    content: '# 新文章标题\n\n开始你的技术分享...\n\n## 代码示例\n\n```javascript\nconsole.log("Hello, Learning Stack!");\n```\n\n## 学习要点\n\n- 要点一\n- 要点二\n- 要点三',
    summary: '',
    category: '前端开发',
    tags: [],
    status: 'draft',
    coverImage: ''
  });

  const [newTag, setNewTag] = useState('');
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [saveDialog, setSaveDialog] = useState(false);
  const [saving, setSaving] = useState(false);

  const categories = [
    '前端开发', '后端开发', '数据库', 'DevOps', '学习心得', '项目实战'
  ];

  const predefinedTags = [
    'React', 'Go', 'MySQL', 'Docker', 'JavaScript', 'Material-UI',
    '学习笔记', '踩坑记录', 'API设计', '性能优化', '最佳实践'
  ];

  const handleAddTag = (tagName) => {
    if (tagName && !article.tags.includes(tagName)) {
      setArticle(prev => ({
        ...prev,
        tags: [...prev.tags, tagName]
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setArticle(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSave = async (publishNow = false) => {
    setSaving(true);
    try {
      const articleToSave = {
        ...article,
        status: publishNow ? 'published' : 'draft',
        updatedAt: new Date().toISOString(),
        author: user?.email || 'Anonymous',
        readTime: Math.ceil(article.content.split(' ').length / 200) // 大约每分钟200字
      };

      // 这里后续会连接真实API
      console.log('保存文章:', articleToSave);
      localStorage.setItem(`article_${Date.now()}`, JSON.stringify(articleToSave));
      
      toast.success(publishNow ? '📰 文章发布成功！' : '💾 草稿保存成功！', {
        style: {
          background: '#0c1421',
          color: '#00ffff',
          border: '1px solid #00ffff40'
        }
      });
      
      setSaveDialog(false);
    } catch (error) {
      toast.error('保存失败，请重试');
      console.error('保存文章失败:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box sx={{
      background: 'linear-gradient(135deg, #0c1421 0%, #1a1a2e 100%)',
      minHeight: '100vh',
      color: '#e0e0e0',
      position: 'relative'
    }}>
      {/* 科技感背景 */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300ffff' fill-opacity='0.02'%3E%3Cpath d='M0 0h40v40H0zM40 40h40v40H40z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        opacity: 0.3
      }} />

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1, py: 3 }}>
        {/* 终端风格标题栏 */}
        <Paper sx={{
          background: 'rgba(0,255,255,0.05)',
          border: '1px solid #00ffff40',
          borderRadius: '12px',
          p: 3,
          mb: 3
        }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h6" sx={{ 
                color: '#00ffff', 
                fontFamily: 'monospace',
                mb: 1
              }}>
                {'> vim article.md'}
              </Typography>
              <Typography variant="body2" sx={{ 
                color: '#a0a0a0',
                fontFamily: 'monospace'
              }}>
                {'# Markdown Editor - INSERT MODE'}
              </Typography>
            </Box>

            <Stack direction="row" spacing={2}>
              <Button
                variant="outlined"
                startIcon={<Save />}
                onClick={() => setSaveDialog(true)}
                sx={{
                  borderColor: '#00ffff',
                  color: '#00ffff',
                  fontFamily: 'monospace',
                  '&:hover': {
                    backgroundColor: 'rgba(0,255,255,0.1)',
                    boxShadow: '0 0 15px rgba(0, 255, 255, 0.3)'
                  }
                }}
              >
                :w save
              </Button>

              <Button
                variant={isPreviewMode ? 'contained' : 'outlined'}
                startIcon={isPreviewMode ? <Code /> : <Visibility />}
                onClick={() => setIsPreviewMode(!isPreviewMode)}
                sx={{
                  borderColor: '#ff00ff',
                  color: isPreviewMode ? '#000' : '#ff00ff',
                  backgroundColor: isPreviewMode ? '#ff00ff' : 'transparent',
                  fontFamily: 'monospace',
                  '&:hover': {
                    backgroundColor: isPreviewMode ? '#ff00ff' : 'rgba(255,0,255,0.1)',
                    boxShadow: '0 0 15px rgba(255, 0, 255, 0.3)'
                  }
                }}
              >
                {isPreviewMode ? ':q editor' : ':r preview'}
              </Button>
            </Stack>
          </Stack>
        </Paper>

        <Grid container spacing={3}>
          {/* 左侧：文章元数据编辑 */}
          <Grid item xs={12} lg={3}>
            <Stack spacing={3}>
              {/* 文章基本信息 */}
              <Paper sx={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid #333',
                borderRadius: '12px',
                p: 3
              }}>
                <Typography variant="h6" sx={{ 
                  color: '#00ffff',
                  fontFamily: 'monospace',
                  mb: 3
                }}>
                  {'> article.config'}
                </Typography>

                <Stack spacing={3}>
                  <TextField
                    label="文章标题"
                    value={article.title}
                    onChange={(e) => setArticle(prev => ({ ...prev, title: e.target.value }))}
                    fullWidth
                    InputLabelProps={{ 
                      sx: { color: '#a0a0a0', fontFamily: 'monospace' }
                    }}
                    InputProps={{
                      sx: {
                        color: '#e0e0e0',
                        fontFamily: 'monospace',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#333'
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#00ffff40'
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#00ffff'
                        }
                      }
                    }}
                  />

                  <FormControl fullWidth>
                    <InputLabel sx={{ color: '#a0a0a0', fontFamily: 'monospace' }}>
                      分类
                    </InputLabel>
                    <Select
                      value={article.category}
                      onChange={(e) => setArticle(prev => ({ ...prev, category: e.target.value }))}
                      sx={{
                        color: '#e0e0e0',
                        fontFamily: 'monospace',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#333'
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#00ffff40'
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#00ffff'
                        }
                      }}
                    >
                      {categories.map(cat => (
                        <MenuItem key={cat} value={cat} sx={{ 
                          fontFamily: 'monospace',
                          color: '#e0e0e0',
                          '&:hover': {
                            backgroundColor: 'rgba(0,255,255,0.1)'
                          }
                        }}>
                          {cat}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <TextField
                    label="文章摘要"
                    value={article.summary}
                    onChange={(e) => setArticle(prev => ({ ...prev, summary: e.target.value }))}
                    multiline
                    rows={3}
                    fullWidth
                    InputLabelProps={{ 
                      sx: { color: '#a0a0a0', fontFamily: 'monospace' }
                    }}
                    InputProps={{
                      sx: {
                        color: '#e0e0e0',
                        fontFamily: 'monospace',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#333'
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#00ffff40'
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#00ffff'
                        }
                      }
                    }}
                  />
                </Stack>
              </Paper>

              {/* 标签管理 */}
              <Paper sx={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid #333',
                borderRadius: '12px',
                p: 3
              }}>
                <Typography variant="h6" sx={{ 
                  color: '#ff00ff',
                  fontFamily: 'monospace',
                  mb: 3
                }}>
                  {'> tags --list'}
                </Typography>

                {/* 当前标签 */}
                <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap', gap: 1 }}>
                  {article.tags.map(tag => (
                    <Chip
                      key={tag}
                      label={`#${tag}`}
                      onDelete={() => handleRemoveTag(tag)}
                      sx={{
                        background: 'rgba(255,0,255,0.1)',
                        color: '#ff00ff',
                        fontFamily: 'monospace',
                        border: '1px solid #ff00ff40',
                        '& .MuiChip-deleteIcon': {
                          color: '#ff00ff'
                        }
                      }}
                    />
                  ))}
                </Stack>

                {/* 添加新标签 */}
                <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                  <TextField
                    size="small"
                    placeholder="新标签..."
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleAddTag(newTag);
                      }
                    }}
                    InputProps={{
                      sx: {
                        color: '#e0e0e0',
                        fontFamily: 'monospace',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#333'
                        }
                      }
                    }}
                    sx={{ flex: 1 }}
                  />
                  <Button
                    variant="outlined"
                    onClick={() => handleAddTag(newTag)}
                    sx={{
                      borderColor: '#ff00ff',
                      color: '#ff00ff',
                      minWidth: 'auto',
                      px: 2
                    }}
                  >
                    +
                  </Button>
                </Stack>

                {/* 预设标签 */}
                <Typography variant="caption" sx={{ 
                  color: '#a0a0a0',
                  fontFamily: 'monospace',
                  mb: 1,
                  display: 'block'
                }}>
                  # 常用标签:
                </Typography>
                <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
                  {predefinedTags.filter(tag => !article.tags.includes(tag)).map(tag => (
                    <Chip
                      key={tag}
                      label={tag}
                      size="small"
                      onClick={() => handleAddTag(tag)}
                      sx={{
                        background: 'rgba(0,255,255,0.05)',
                        color: '#00ffff',
                        fontFamily: 'monospace',
                        fontSize: '0.7rem',
                        border: '1px solid #00ffff20',
                        cursor: 'pointer',
                        '&:hover': {
                          background: 'rgba(0,255,255,0.1)'
                        }
                      }}
                    />
                  ))}
                </Stack>
              </Paper>

              {/* 发布状态 */}
              <Paper sx={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid #333',
                borderRadius: '12px',
                p: 3
              }}>
                <Typography variant="h6" sx={{ 
                  color: '#ffa500',
                  fontFamily: 'monospace',
                  mb: 3
                }}>
                  {'> status.log'}
                </Typography>

                <Stack spacing={2}>
                  <Box>
                    <Typography variant="caption" sx={{ 
                      color: '#a0a0a0',
                      fontFamily: 'monospace'
                    }}>
                      current_status:
                    </Typography>
                    <Typography variant="body1" sx={{ 
                      color: article.status === 'published' ? '#00ff88' : '#ffa500',
                      fontFamily: 'monospace',
                      fontWeight: 600
                    }}>
                      {article.status}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography variant="caption" sx={{ 
                      color: '#a0a0a0',
                      fontFamily: 'monospace'
                    }}>
                      word_count:
                    </Typography>
                    <Typography variant="body1" sx={{ 
                      color: '#00ffff',
                      fontFamily: 'monospace',
                      fontWeight: 600
                    }}>
                      {article.content.split(' ').length}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography variant="caption" sx={{ 
                      color: '#a0a0a0',
                      fontFamily: 'monospace'
                    }}>
                      read_time:
                    </Typography>
                    <Typography variant="body1" sx={{ 
                      color: '#ff00ff',
                      fontFamily: 'monospace',
                      fontWeight: 600
                    }}>
                      {Math.ceil(article.content.split(' ').length / 200)} min
                    </Typography>
                  </Box>
                </Stack>
              </Paper>
            </Stack>
          </Grid>

          {/* 右侧：Markdown编辑器 */}
          <Grid item xs={12} lg={9}>
            <Paper sx={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid #333',
              borderRadius: '12px',
              overflow: 'hidden',
              height: 'calc(100vh - 200px)'
            }}>
              {/* 编辑器标题栏 */}
              <Box sx={{
                background: 'rgba(0,0,0,0.3)',
                borderBottom: '1px solid #333',
                p: 2,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}>
                    <Box sx={{ 
                      width: 12, height: 12, 
                      borderRadius: '50%', 
                      background: '#ff4757' 
                    }} />
                    <Box sx={{ 
                      width: 12, height: 12, 
                      borderRadius: '50%', 
                      background: '#ffa500' 
                    }} />
                    <Box sx={{ 
                      width: 12, height: 12, 
                      borderRadius: '50%', 
                      background: '#00ff88' 
                    }} />
                  </Box>
                  
                  <Typography variant="body2" sx={{ 
                    color: '#a0a0a0',
                    fontFamily: 'monospace'
                  }}>
                    {article.title || 'untitled.md'} - {article.status}
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={1}>
                  <IconButton
                    size="small"
                    onClick={() => setIsPreviewMode(!isPreviewMode)}
                    sx={{
                      color: isPreviewMode ? '#ff00ff' : '#00ffff',
                      border: `1px solid ${isPreviewMode ? '#ff00ff40' : '#00ffff40'}`,
                      '&:hover': {
                        boxShadow: `0 0 10px ${isPreviewMode ? 'rgba(255,0,255,0.3)' : 'rgba(0,255,255,0.3)'}`
                      }
                    }}
                  >
                    {isPreviewMode ? <Code /> : <Visibility />}
                  </IconButton>
                </Stack>
              </Box>

              {/* Markdown编辑器 */}
              <Box sx={{ height: 'calc(100% - 64px)' }}>
                <MDEditor
                  value={article.content}
                  onChange={(value) => setArticle(prev => ({ ...prev, content: value || '' }))}
                  preview={isPreviewMode ? 'preview' : 'edit'}
                  hideToolbar={false}
                  data-color-mode="dark"
                  height="100%"
                  style={{
                    backgroundColor: 'transparent',
                  }}
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* 保存对话框 */}
      <Dialog 
        open={saveDialog} 
        onClose={() => setSaveDialog(false)}
        PaperProps={{
          sx: {
            background: 'linear-gradient(135deg, #0c1421 0%, #1a1a2e 100%)',
            border: '1px solid #00ffff40',
            color: '#e0e0e0'
          }
        }}
      >
        <DialogTitle sx={{ 
          color: '#00ffff',
          fontFamily: 'monospace'
        }}>
          {'> git commit -m "article"'}
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ 
            color: '#a0a0a0',
            fontFamily: 'monospace',
            mb: 2
          }}>
            选择保存方式：
          </Typography>
          <Stack spacing={2}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<EditNote />}
              onClick={() => handleSave(false)}
              disabled={saving}
              sx={{
                borderColor: '#ffa500',
                color: '#ffa500',
                fontFamily: 'monospace',
                '&:hover': {
                  backgroundColor: 'rgba(255,165,0,0.1)'
                }
              }}
            >
              保存草稿 (draft)
            </Button>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<Publish />}
              onClick={() => handleSave(true)}
              disabled={saving || !article.title || !article.summary}
              sx={{
                borderColor: '#00ff88',
                color: '#00ff88',
                fontFamily: 'monospace',
                '&:hover': {
                  backgroundColor: 'rgba(0,255,136,0.1)'
                }
              }}
            >
              发布文章 (publish)
            </Button>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setSaveDialog(false)}
            sx={{ color: '#a0a0a0', fontFamily: 'monospace' }}
          >
            :q quit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Editor;