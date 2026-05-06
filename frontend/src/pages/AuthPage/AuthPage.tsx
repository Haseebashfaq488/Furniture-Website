import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Tab, Tabs, Alert, CircularProgress, Paper, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';

const AuthPage = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const isLogin = tabIndex === 0;
    const url = isLogin 
      ? 'http://localhost:5000/api/auth/login' 
      : 'http://localhost:5000/api/auth/register';

    const body = isLogin 
      ? { email, password } 
      : { name, email, password };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Authentication failed');
      }

      login(data.user, data.token);
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '85vh', display: 'flex' }}>
      <Grid container>
        {/* Left Image Section */}
        <Grid 
          size={{ xs: 12, md: 6 }}
          sx={{
            display: { xs: 'none', md: 'block' },
            backgroundImage: 'url(https://images.unsplash.com/photo-1618220179428-22790b46a0eb?auto=format&fit=crop&w=1200&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative'
          }}
        >
          <Box 
            sx={{
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.6))',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              p: 6
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Typography variant="h3" sx={{ color: '#fff', fontWeight: 'bold', mb: 2 }}>
                Elevate your living space.
              </Typography>
              <Typography variant="h6" sx={{ color: '#ddd', fontWeight: 'normal' }}>
                Join CozyCorner today and discover premium furniture tailored to your lifestyle.
              </Typography>
            </motion.div>
          </Box>
        </Grid>

        {/* Right Form Section */}
        <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: { xs: 3, sm: 6, md: 8 }, bgcolor: '#fafafa' }}>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            style={{ width: '100%', maxWidth: '450px' }}
          >
            <Paper elevation={0} sx={{ p: { xs: 3, sm: 5 }, borderRadius: 3, border: '1px solid #eaeaea', bgcolor: '#fff', boxShadow: '0 10px 40px rgba(0,0,0,0.04)' }}>
              <Typography variant="h4" component="h1" align="center" gutterBottom sx={{ fontWeight: 800, color: '#1a1a1a', mb: 3 }}>
                {tabIndex === 0 ? 'Welcome Back' : 'Create an Account'}
              </Typography>

              <Tabs 
                value={tabIndex} 
                onChange={handleTabChange} 
                variant="fullWidth" 
                sx={{ mb: 4, '& .MuiTab-root': { fontWeight: 600, fontSize: '1rem', textTransform: 'none' } }}
                textColor="primary"
                indicatorColor="primary"
              >
                <Tab label="Log In" />
                <Tab label="Sign Up" />
              </Tabs>

              {error && (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                  <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>{error}</Alert>
                </motion.div>
              )}

              <form onSubmit={handleSubmit}>
                {tabIndex === 1 && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} transition={{ duration: 0.3 }}>
                    <TextField
                      label="Full Name"
                      type="text"
                      fullWidth
                      variant="outlined"
                      margin="normal"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                    />
                  </motion.div>
                )}

                <TextField
                  label="Email Address"
                  type="email"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />

                <TextField
                  label="Password"
                  type="password"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  size="large"
                  disabled={loading}
                  sx={{ 
                    mt: 4, mb: 2, height: 54, fontSize: '1.1rem', fontWeight: 700, borderRadius: 2,
                    textTransform: 'none', boxShadow: '0 4px 14px rgba(22, 156, 92, 0.4)',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 20px rgba(22, 156, 92, 0.5)'
                    }
                  }}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : (tabIndex === 0 ? 'Log In' : 'Sign Up')}
                </Button>
              </form>
            </Paper>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AuthPage;
