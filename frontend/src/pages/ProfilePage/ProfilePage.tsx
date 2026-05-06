import React, { useState, useEffect } from 'react';
import { Box, Container, Paper, Typography, Button, Divider, Avatar, Grid, CircularProgress, Chip } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

interface OrderItem {
  productId: {
    _id: string;
    name: string;
    image: string;
  };
  quantity: number;
  _id: string;
}

interface Order {
  _id: string;
  totalAmount: number;
  status: string;
  createdAt: string;
  products: OrderItem[];
}

const ProfilePage = () => {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  React.useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!token) return;
      try {
        const response = await fetch('http://localhost:5000/api/orders/my-orders', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await response.json();
        if (response.ok) {
          setOrders(data.orders || []);
        }
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      } finally {
        setLoadingOrders(false);
      }
    };
    fetchOrders();
  }, [token]);

  if (!user) {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'warning';
      case 'Shipped': return 'info';
      case 'Delivered': return 'success';
      case 'Cancelled': return 'error';
      default: return 'default';
    }
  };

  return (
    <Box sx={{ minHeight: '80vh', bgcolor: '#f7f9fa', pb: 10 }}>
      {/* Cover Banner */}
      <Box
        sx={{
          height: 250,
          width: '100%',
          backgroundImage: 'url(https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&w=1600&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative'
        }}
      >
        <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, bgcolor: 'rgba(0,0,0,0.3)' }} />
      </Box>

      <Container maxWidth="md" sx={{ mt: -10, position: 'relative', zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Paper elevation={0} sx={{ p: 0, borderRadius: 3, border: '1px solid #eaeaea', overflow: 'hidden', boxShadow: '0 10px 40px rgba(0,0,0,0.05)' }}>

            {/* Top section with Avatar */}
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, p: { xs: 4, md: 5 }, alignItems: 'center', gap: 4, bgcolor: '#fff' }}>
              <Avatar
                sx={{
                  width: 130,
                  height: 130,
                  bgcolor: 'primary.main',
                  fontSize: '3.5rem',
                  border: '5px solid #fff',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.1)'
                }}
              >
                {user.name.charAt(0).toUpperCase()}
              </Avatar>

              <Box sx={{ flexGrow: 1, textAlign: { xs: 'center', sm: 'left' } }}>
                <Typography variant="h4" sx={{ fontWeight: 800, color: '#1a1a1a' }}>{user.name}</Typography>
                <Typography variant="subtitle1" color="text.secondary" sx={{ fontWeight: 500 }}>
                  {user.role === 'admin' ? 'Administrator' : 'Premium Customer'}
                </Typography>
              </Box>

              <Button
                variant="outlined"
                color="error"
                onClick={handleLogout}
                sx={{
                  borderRadius: 2, px: 3, py: 1, fontWeight: 'bold', textTransform: 'none',
                  borderWidth: 2, '&:hover': { borderWidth: 2 }
                }}
              >
                Log Out
              </Button>
            </Box>

            <Divider />

            {/* Bottom Section with Details */}
            <Box sx={{ p: { xs: 4, md: 5 }, bgcolor: '#fafafa' }}>
              {location.state?.orderPlaced && (
                <Box sx={{ mb: 4, p: 2, bgcolor: '#e6f4ea', borderRadius: 2, border: '1px solid #169C5C' }}>
                  <Typography sx={{ color: '#169C5C', fontWeight: 700, textAlign: 'center' }}>
                    🎉 Your order has been placed successfully!
                  </Typography>
                </Box>
              )}

              <Typography variant="h6" sx={{ fontWeight: 800, mb: 4, color: '#1a1a1a' }}>
                Account Information
              </Typography>

              <Grid container spacing={4} sx={{ mb: 6 }}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box sx={{ p: 3, bgcolor: '#fff', borderRadius: 2, border: '1px solid #eee' }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1, textTransform: 'uppercase', letterSpacing: 1, fontSize: '0.75rem', fontWeight: 700 }}>
                      Full Name
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600, fontSize: '1.1rem' }}>
                      {user.name}
                    </Typography>
                  </Box>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box sx={{ p: 3, bgcolor: '#fff', borderRadius: 2, border: '1px solid #eee' }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1, textTransform: 'uppercase', letterSpacing: 1, fontSize: '0.75rem', fontWeight: 700 }}>
                      Email Address
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600, fontSize: '1.1rem' }}>
                      {user.email}
                    </Typography>
                  </Box>
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <Box sx={{ p: 3, bgcolor: '#fff', borderRadius: 2, border: '1px solid #eee' }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1, textTransform: 'uppercase', letterSpacing: 1, fontSize: '0.75rem', fontWeight: 700 }}>
                      Account ID
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500, fontFamily: 'monospace', color: '#666' }}>
                      {user.id}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

              {/* Order History Section */}
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 3, color: '#1a1a1a' }}>
                Recent Orders
              </Typography>

              {loadingOrders ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                  <CircularProgress />
                </Box>
              ) : orders.length === 0 ? (
                <Box sx={{ p: 4, bgcolor: '#fff', borderRadius: 2, border: '1px dashed #ccc', textAlign: 'center' }}>
                  <Typography color="text.secondary">No recent orders found.</Typography>
                </Box>
              ) : (
                <Grid container spacing={3}>
                  {orders.map((order) => (
                    <Grid size={{ xs: 12 }} key={order._id}>
                      <Paper elevation={0} sx={{ p: 3, borderRadius: 2, border: '1px solid #eaeaea', bgcolor: '#fff' }}>
                        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', mb: 2, gap: 2 }}>
                          <Box>
                            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600, mb: 0.5 }}>
                              Order #{order._id.substring(order._id.length - 8).toUpperCase()}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Placed on {new Date(order.createdAt).toLocaleDateString()}
                            </Typography>
                          </Box>
                          <Box sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
                            <Typography variant="h6" sx={{ fontWeight: 800, color: '#169C5C', mb: 1 }}>
                              ${order.totalAmount.toFixed(2)}
                            </Typography>
                            <Chip
                              label={order.status}
                              color={getStatusColor(order.status) as any}
                              size="small"
                              sx={{ fontWeight: 'bold' }}
                            />
                          </Box>
                        </Box>
                        <Divider sx={{ my: 2 }} />
                        <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', pb: 1 }}>
                          {order.products.map((item, index) => (
                            <Box key={index} sx={{ display: 'flex', alignItems: 'center', minWidth: 'fit-content', gap: 1.5 }}>
                              <Box
                                sx={{
                                  width: 50,
                                  height: 50,
                                  backgroundImage: `url(${item.productId?.image})`,
                                  backgroundSize: 'cover',
                                  backgroundPosition: 'center',
                                  borderRadius: 1,
                                  bgcolor: '#f5f5f5' // Fallback if image fails
                                }}
                              />
                              <Box>
                                <Typography variant="body2" sx={{ fontWeight: 600, maxWidth: 150, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                  {item.productId?.name || 'Unknown Product'}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  Qty: {item.quantity}
                                </Typography>
                              </Box>
                            </Box>
                          ))}
                        </Box>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              )}

            </Box>

          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default ProfilePage;
