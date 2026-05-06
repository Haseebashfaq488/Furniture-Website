import { Container, Typography, Box, Paper, Grid, IconButton, Button, CircularProgress, Divider, Alert } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import RemoveShoppingCartOutlinedIcon from '@mui/icons-material/RemoveShoppingCartOutlined';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
};

const CartPage = () => {
  const { cart, loading, updateQuantity, removeFromCart, fetchCart } = useCart();
  const { isAuthenticated, token } = useAuth();
  const navigate = useNavigate();
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const handleCheckout = async () => {
    if (!isAuthenticated || !token) return;
    
    setCheckoutLoading(true);
    setCheckoutError(null);
    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          shippingAddress: {
            address: '123 Furniture St',
            city: 'Designville',
            postalCode: '12345',
            country: 'US'
          }
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Checkout failed');
      }

      await fetchCart(); // Cart is cleared on backend, this syncs frontend
      navigate('/profile', { state: { orderPlaced: true } });
    } catch (err: any) {
      setCheckoutError(err.message || 'An error occurred during checkout');
    } finally {
      setCheckoutLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <Container maxWidth="md" sx={{ py: 12, textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 800 }}>Your Cart</Typography>
          <Alert severity="info" sx={{ mb: 4, borderRadius: 2, justifyContent: 'center' }}>
            Please log in to view and manage your personalized cart.
          </Alert>
          <Button 
            variant="contained" 
            color="primary" 
            size="large"
            onClick={() => navigate('/auth')}
            sx={{ px: 4, py: 1.5, borderRadius: 2, fontWeight: 'bold', textTransform: 'none', fontSize: '1.1rem' }}
          >
            Log In or Sign Up
          </Button>
        </motion.div>
      </Container>
    );
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress color="primary" size={60} />
      </Box>
    );
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 12, textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
          <RemoveShoppingCartOutlinedIcon sx={{ fontSize: 100, color: '#e0e0e0', mb: 3 }} />
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 800, color: '#1a1a1a' }}>
            Your cart is empty
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 5, fontWeight: 'normal' }}>
            Looks like you haven't added anything to your cart yet.
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            component={Link} 
            to="/shop" 
            size="large"
            sx={{ 
              px: 5, py: 1.5, borderRadius: 2, fontWeight: 'bold', fontSize: '1.1rem', textTransform: 'none',
              boxShadow: '0 4px 14px rgba(22, 156, 92, 0.4)',
              transition: 'transform 0.2s',
              '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 6px 20px rgba(22, 156, 92, 0.5)' }
            }}
          >
            Start Shopping
          </Button>
        </motion.div>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 800, mb: 6, color: '#1a1a1a' }}>
          Your Shopping Cart
        </Typography>
      </motion.div>

      <Grid container spacing={5}>
        <Grid size={{ xs: 12, md: 8 }}>
          <motion.div variants={containerVariants} initial="hidden" animate="show">
            {cart.items.map((item) => (
              <motion.div key={item.productId._id} variants={itemVariants}>
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 2, mb: 3, border: '1px solid #eaeaea', borderRadius: 3,
                    transition: 'box-shadow 0.3s, border-color 0.3s',
                    '&:hover': { boxShadow: '0 8px 24px rgba(0,0,0,0.06)', borderColor: '#e0e0e0' }
                  }}
                >
                  <Grid container spacing={3} sx={{ alignItems: 'center' }}>
                    <Grid size={{ xs: 4, sm: 3 }}>
                      <Box
                        sx={{
                          width: '100%',
                          paddingTop: '100%',
                          backgroundImage: `url(${item.productId.image})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          borderRadius: 2
                        }}
                      />
                    </Grid>
                    <Grid size={{ xs: 8, sm: 4 }}>
                      <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5, color: '#1a1a1a', lineHeight: 1.2 }}>
                        {item.productId.name}
                      </Typography>
                      <Typography variant="body1" sx={{ color: '#169C5C', fontWeight: 600 }}>
                        ${item.productId.price.toFixed(2)}
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'flex-start', sm: 'center' }, bgcolor: '#f5f5f5', borderRadius: 50, p: 0.5, width: 'fit-content' }}>
                        <IconButton 
                          size="small" 
                          onClick={() => updateQuantity(item.productId._id, Math.max(1, item.quantity - 1))}
                          disabled={item.quantity <= 1}
                          sx={{ color: '#555' }}
                        >
                          <RemoveIcon fontSize="small" />
                        </IconButton>
                        <Typography sx={{ mx: 2, fontWeight: 700, fontSize: '1rem', minWidth: '20px', textAlign: 'center' }}>
                          {item.quantity}
                        </Typography>
                        <IconButton 
                          size="small" 
                          onClick={() => updateQuantity(item.productId._id, Math.min(item.productId.stock, item.quantity + 1))}
                          disabled={item.quantity >= item.productId.stock}
                          sx={{ color: '#555' }}
                        >
                          <AddIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 2 }} sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'flex-start', sm: 'flex-end' }, justifyContent: 'center' }}>
                      <Typography variant="h6" sx={{ color: '#1a1a1a', fontWeight: 800 }}>
                        ${(item.productId.price * item.quantity).toFixed(2)}
                      </Typography>
                      <IconButton 
                        onClick={() => removeFromCart(item.productId._id)}
                        sx={{ mt: 1, color: '#ff4d4f', bgcolor: 'rgba(255, 77, 79, 0.1)', '&:hover': { bgcolor: 'rgba(255, 77, 79, 0.2)' } }}
                        size="small"
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Paper>
              </motion.div>
            ))}
          </motion.div>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Box sx={{ position: { md: 'sticky' }, top: { md: 100 } }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
              <Paper elevation={0} sx={{ p: 4, border: '1px solid #eaeaea', borderRadius: 3, bgcolor: '#fafafa' }}>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 800, mb: 3 }}>
                  Order Summary
                </Typography>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography sx={{ color: 'text.secondary', fontSize: '1.1rem' }}>Subtotal</Typography>
                  <Typography sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>${cart.totalPrice?.toFixed(2) || '0.00'}</Typography>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                  <Typography sx={{ color: 'text.secondary', fontSize: '1.1rem' }}>Shipping</Typography>
                  <Typography sx={{ fontWeight: 'bold', fontSize: '1.1rem', color: 'primary.main' }}>Free</Typography>
                </Box>

                <Divider sx={{ my: 3, borderColor: '#ddd' }} />

                {checkoutError && (
                  <Alert severity="error" sx={{ mb: 3 }}>
                    {checkoutError}
                  </Alert>
                )}

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4, alignItems: 'center' }}>
                  <Typography variant="h5" sx={{ fontWeight: '900' }}>Total</Typography>
                  <Typography variant="h4" sx={{ fontWeight: '900', color: 'primary.main' }}>
                    ${cart.totalPrice?.toFixed(2) || '0.00'}
                  </Typography>
                </Box>

                <Button 
                  variant="contained" 
                  color="primary" 
                  fullWidth 
                  size="large"
                  startIcon={checkoutLoading ? <CircularProgress size={20} color="inherit" /> : <ShoppingCartCheckoutIcon />}
                  disabled={checkoutLoading}
                  onClick={handleCheckout}
                  sx={{ 
                    py: 1.8, fontSize: '1.1rem', fontWeight: 800, borderRadius: 2, textTransform: 'none',
                    boxShadow: '0 4px 14px rgba(22, 156, 92, 0.4)',
                    transition: 'transform 0.2s',
                    '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 6px 20px rgba(22, 156, 92, 0.5)' }
                  }}
                >
                  {checkoutLoading ? 'Processing...' : 'Proceed to Checkout'}
                </Button>
              </Paper>
            </motion.div>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CartPage;
