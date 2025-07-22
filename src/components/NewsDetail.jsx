import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Button,
  IconButton,
  Chip,
  Avatar,
  Divider,
  TextField,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Rating,
  Share as ShareIcon
} from '@mui/material';
import {
  Close,
  ThumbUp,
  ThumbDown,
  Share,
  Bookmark,
  BookmarkBorder,
  Comment,
  TrendingUp,
  TrendingDown,
  AccessTime,
  Visibility
} from '@mui/icons-material';
import { useTheme, alpha } from '@mui/material/styles';

const NewsDetail = ({ open, onClose, newsItem }) => {
  const theme = useTheme();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likes, setLikes] = useState(newsItem?.likes || 0);
  const [dislikes, setDislikes] = useState(newsItem?.dislikes || 0);
  const [userReaction, setUserReaction] = useState(null);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([
    {
      id: 1,
      user: 'CryptoTrader',
      avatar: '👤',
      content: '这个消息对市场影响很大，值得关注！',
      time: '5分钟前',
      likes: 12
    },
    {
      id: 2,
      user: 'BlockchainExpert',
      avatar: '🔗',
      content: '技术分析显示这是一个重要的转折点。',
      time: '10分钟前',
      likes: 8
    }
  ]);

  if (!newsItem) return null;

  const handleReaction = (type) => {
    if (userReaction === type) {
      // 取消反应
      setUserReaction(null);
      if (type === 'like') setLikes(likes - 1);
      else setDislikes(dislikes - 1);
    } else {
      // 切换反应
      if (userReaction === 'like') setLikes(likes - 1);
      if (userReaction === 'dislike') setDislikes(dislikes - 1);
      
      setUserReaction(type);
      if (type === 'like') setLikes(likes + 1);
      else setDislikes(dislikes + 1);
    }
  };

  const handleAddComment = () => {
    if (comment.trim()) {
      const newComment = {
        id: comments.length + 1,
        user: '当前用户',
        avatar: '👨‍💻',
        content: comment,
        time: '刚刚',
        likes: 0
      };
      setComments([newComment, ...comments]);
      setComment('');
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: newsItem.title,
        text: newsItem.summary,
        url: window.location.href
      });
    } else {
      // 复制到剪贴板
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.98) 100%)'
            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.98) 100%)',
          backdropFilter: 'blur(10px)',
          border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
          borderRadius: 3,
          maxHeight: '90vh'
        }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'flex-start',
        pb: 1
      }}>
        <Box sx={{ flex: 1, pr: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
            {newsItem.title}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Chip
              label={newsItem.source}
              size="small"
              color="primary"
              variant="outlined"
            />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <AccessTime sx={{ fontSize: 16, color: 'text.secondary' }} />
              <Typography variant="caption" color="text.secondary">
                {newsItem.time}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Visibility sx={{ fontSize: 16, color: 'text.secondary' }} />
              <Typography variant="caption" color="text.secondary">
                {newsItem.views || '1.2k'} 阅读
              </Typography>
            </Box>
            <Chip
              icon={newsItem.sentiment === 'positive' ? <TrendingUp /> : <TrendingDown />}
              label={newsItem.sentiment === 'positive' ? '利好' : '利空'}
              size="small"
              color={newsItem.sentiment === 'positive' ? 'success' : 'error'}
              variant="filled"
            />
          </Box>
        </Box>
        <IconButton onClick={onClose} size="small">
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 1 }}>
        {/* 新闻摘要 */}
        <Typography variant="body1" sx={{ 
          mb: 3, 
          p: 2, 
          backgroundColor: alpha(theme.palette.primary.main, 0.05),
          borderRadius: 2,
          borderLeft: `4px solid ${theme.palette.primary.main}`
        }}>
          {newsItem.summary}
        </Typography>

        {/* 新闻内容 */}
        <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
          {newsItem.content || `
            这是一条重要的加密货币新闻。Bitcoin在过去24小时内表现出强劲的上涨趋势，
            主要受到机构投资者持续买入和监管环境改善的推动。
            
            市场分析师认为，这一趋势可能会持续到下个季度，特别是在即将到来的
            比特币ETF审批决定之前。投资者应该密切关注相关政策动向和市场情绪变化。
            
            技术分析显示，Bitcoin已经突破了关键阻力位，下一个目标价位可能在
            $125,000附近。然而，投资者仍需谨慎，因为加密货币市场的波动性较高。
          `}
        </Typography>

        <Divider sx={{ my: 3 }} />

        {/* 互动区域 */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <Button
            startIcon={<ThumbUp />}
            variant={userReaction === 'like' ? 'contained' : 'outlined'}
            size="small"
            onClick={() => handleReaction('like')}
            color="success"
          >
            {likes}
          </Button>
          <Button
            startIcon={<ThumbDown />}
            variant={userReaction === 'dislike' ? 'contained' : 'outlined'}
            size="small"
            onClick={() => handleReaction('dislike')}
            color="error"
          >
            {dislikes}
          </Button>
          <Button
            startIcon={isBookmarked ? <Bookmark /> : <BookmarkBorder />}
            variant="outlined"
            size="small"
            onClick={() => setIsBookmarked(!isBookmarked)}
            color="warning"
          >
            {isBookmarked ? '已收藏' : '收藏'}
          </Button>
          <Button
            startIcon={<Share />}
            variant="outlined"
            size="small"
            onClick={handleShare}
          >
            分享
          </Button>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* 评论区 */}
        <Box>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            评论 ({comments.length})
          </Typography>
          
          {/* 添加评论 */}
          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              multiline
              rows={3}
              placeholder="写下你的看法..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              onClick={handleAddComment}
              disabled={!comment.trim()}
            >
              发表评论
            </Button>
          </Box>

          {/* 评论列表 */}
          <List>
            {comments.map((comment) => (
              <ListItem key={comment.id} alignItems="flex-start" sx={{ px: 0 }}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                    {comment.avatar}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {comment.user}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {comment.time}
                      </Typography>
                    </Box>
                  }
                  secondary={
                    <Box>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        {comment.content}
                      </Typography>
                      <Button
                        size="small"
                        startIcon={<ThumbUp />}
                        sx={{ minWidth: 'auto', p: 0.5 }}
                      >
                        {comment.likes}
                      </Button>
                    </Box>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} variant="outlined">
          关闭
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewsDetail;
