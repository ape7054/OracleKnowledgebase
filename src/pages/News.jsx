import React, { useState, useRef } from 'react';
import {
  Box,
  Container,
  Grid,
  Stack,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNewsData } from '../components/news/useNewsData';
import LoadingScreen from '../components/common/LoadingScreen';
import NewsHeader from '../components/news/NewsHeader';
import NewsCard from '../components/news/NewsCard';
import SentimentPanel from '../components/news/SentimentPanel';
import CategoriesPanel from '../components/news/CategoriesPanel';
import NewsDialog from '../components/news/NewsDialog';
import BackgroundElements from '../components/news/BackgroundElements';

const NewsProfessional = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedArticle, setSelectedArticle] = useState(null);
  
  const {
    loading,
    news,
    refreshing,
    newArticleId,
    handleRefreshNews
  } = useNewsData();

  const handleOpenDialog = (article) => {
    setSelectedArticle(article);
  };

  const handleCloseDialog = () => {
    setSelectedArticle(null);
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Box sx={{
      minHeight: '100vh',
      background: theme.palette.mode === 'dark'
        ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)'
        : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <BackgroundElements />

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1, py: 4 }}>
        <NewsHeader 
          news={news}
          refreshing={refreshing}
          onRefreshNews={handleRefreshNews}
        />

        {/* 主要内容区域 */}
        <Grid container spacing={4}>
          {/* 左侧新闻列表 */}
          <Grid item xs={12} lg={8}>
            <Stack spacing={4}>
              {news.map((item, index) => (
                <NewsCard
                  key={item.id}
                  item={item}
                  index={index}
                  newArticleId={newArticleId}
                  onOpenDialog={handleOpenDialog}
                />
              ))}
            </Stack>
          </Grid>

          {/* 右侧边栏 */}
          <Grid item xs={12} lg={4}>
            <Stack spacing={4}>
              <SentimentPanel />
              <CategoriesPanel />
            </Stack>
          </Grid>
        </Grid>
      </Container>

      <NewsDialog
        selectedArticle={selectedArticle}
        onClose={handleCloseDialog}
      />
    </Box>
  );
};

export default NewsProfessional;
