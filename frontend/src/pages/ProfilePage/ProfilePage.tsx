import React from 'react';
import { Box, Container, Paper, Typography, Button, Divider, Avatar } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Typography variant="h3" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
        My Profile
      </Typography>
      
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 4, alignItems: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 200 }}>
            <Avatar 
              sx={{ 
                width: 120, 
                height: 120, 
                bgcolor: 'primary.main', 
                fontSize: '3rem',
                mb: 2
              }}
            >
              {user.name.charAt(0).toUpperCase()}
            </Avatar>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{user.name}</Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              {user.role === 'admin' ? 'Administrator' : 'Customer'}
            </Typography>
            <Button 
              variant="outlined" 
              color="error" 
              onClick={handleLogout}
              sx={{ mt: 2 }}
            >
              Log Out
            </Button>
          </Box>
          
          <Box sx={{ flexGrow: 1, width: '100%' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }} gutterBottom>
              Account Details
            </Typography>
            <Divider sx={{ mb: 3 }} />
            
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">Full Name</Typography>
              <Typography variant="body1" sx={{ fontWeight: 'medium' }}>{user.name}</Typography>
            </Box>
            
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">Email Address</Typography>
              <Typography variant="body1" sx={{ fontWeight: 'medium' }}>{user.email}</Typography>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">Account ID</Typography>
              <Typography variant="body1" sx={{ fontWeight: 'medium', fontFamily: 'monospace' }}>
                {user.id}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default ProfilePage;
