import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Button,
  Chip,
  IconButton,
  Slide
} from '@mui/material';
import {
  Close,
  OpenInNew,
  Source,
  AccessTime,
  Visibility
} from '@mui/icons-material';
import { useTheme, alpha } from '@mui/material/styles';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const NewsDialog = ({ selectedArticle, onClose }) => {
  const theme = useTheme();

  return (
    <Dialog
      open={Boolean(selectedArticle)}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      maxWidth="md"
      fullWidth
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: 4,
          background: alpha(theme.palette.background.paper, 0.9),
          backdropFilter: 'blur(20px)',
          border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
          boxShadow: `0 25px 50px ${alpha('#000', 0.3)}`
        }
      }}
    >
      {selectedArticle && (
        <>
          <DialogTitle sx={{ p: 4, pb: 2 }}>
            <Typography variant="h4" component="div" sx={{ 
              fontWeight: 800,
              lineHeight: 1.3,
              pr: 6
            }}>
              {selectedArticle.title}
            </Typography>
            <IconButton
              onClick={onClose}
              sx={{
                position: 'absolute',
                right: 16,
                top: 16,
                bgcolor: alpha(theme.palette.error.main, 0.1),
                color: theme.palette.error.main,
                '&:hover': {
                  bgcolor: alpha(theme.palette.error.main, 0.2),
                  transform: 'scale(1.1)'
                }
              }}
            >
              <Close />
            </IconButton>
          </DialogTitle>
          
          <DialogContent dividers sx={{ 
            p: 4, 
            borderColor: alpha(theme.palette.divider, 0.2),
            maxHeight: '60vh',
            overflowY: 'auto'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 2, mb: 3 }}>
              <Chip
                icon={<Source sx={{ fontSize: 16 }} />}
                label={selectedArticle.source}
                sx={{
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  color: theme.palette.primary.main,
                  fontWeight: 600
                }}
              />
              <Chip
                icon={<AccessTime sx={{ fontSize: 16 }} />}
                label={selectedArticle.time}
                variant="outlined"
              />
              <Chip
                icon={<Visibility sx={{ fontSize: 16 }} />}
                label={`${selectedArticle.views} views`}
                variant="outlined"
              />
            </Box>
            
            <Box
              component="img"
              src={selectedArticle.image}
              alt={selectedArticle.title}
              sx={{
                width: '100%',
                maxHeight: '300px',
                objectFit: 'cover',
                borderRadius: 3,
                my: 3,
                border: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                boxShadow: `0 8px 32px ${alpha('#000', 0.1)}`
              }}
            />
            
            <Typography sx={{ 
              lineHeight: 1.8, 
              whiteSpace: 'pre-wrap',
              fontSize: '1.1rem',
              color: 'text.primary'
            }}>
              {selectedArticle.summary.replace(/...$/, '')}
            </Typography>
          </DialogContent>
          
          <DialogActions sx={{ p: 3, gap: 2 }}>
            <Button 
              onClick={onClose}
              variant="outlined"
              sx={{ minWidth: 100 }}
            >
              Close
            </Button>
            <Button 
              variant="contained" 
              onClick={() => window.open(selectedArticle.link, '_blank')}
              endIcon={<OpenInNew />}
              sx={{
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                minWidth: 140
              }}
            >
              Read Full Article
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

export default NewsDialog; 