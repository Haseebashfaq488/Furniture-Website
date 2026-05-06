import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  Button, 
  CircularProgress, 
  Alert, 
  Paper, 
  Chip,
  Rating
} from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  stock: number;
  ratings?: {
    average: number;
    count: number;
  };
}

const SingleProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [addMessage, setAddMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [addingToCart, setAddingToCart] = useState(false);
  
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${id}`);
        if (!response.ok) {
          throw new Error('Failed to load product. Please check if backend is running.');
        }
        const data = await response.json();
        setProduct(data.product);
      } catch (err: any) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }
    if (!product) return;

    setAddingToCart(true);
    setAddMessage(null);
    try {
      await addToCart(product._id, 1);
      setAddMessage({ type: 'success', text: 'Added to cart successfully!' });
      setTimeout(() => setAddMessage(null), 3000);
    } catch (err: any) {
      setAddMessage({ type: 'error', text: err.message || 'Failed to add to cart' });
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (error || !product) {
    return (
      <Container sx={{ py: 8 }}>
        <Alert severity="error">{error || 'Product not found'}</Alert>
        <Button component={Link} to="/shop" startIcon={<KeyboardBackspaceIcon />} sx={{ mt: 2 }}>
          Back to Shop
        </Button>
      </Container>
    );
  }

  return (
    <Box sx={{ bgcolor: '#fdfdfd', minHeight: '100vh', py: 6 }}>
      <Container maxWidth="lg">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <Button component={Link} to="/shop" startIcon={<KeyboardBackspaceIcon />} sx={{ mb: 4, color: '#666', textTransform: 'none', fontWeight: 600 }}>
            Back to Catalog
          </Button>
        </motion.div>

        <Grid container spacing={8}>
          {/* Product Image Section */}
          <Grid size={{ xs: 12, md: 6 }}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <Paper 
                elevation={0} 
                sx={{ 
                  borderRadius: 6, 
                  overflow: 'hidden', 
                  border: '1px solid #f0f0f0',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.04)',
                  position: 'relative'
                }}
              >
                <Box
                  component="img"
                  src={product.image}
                  alt={product.name}
                  sx={{
                    width: '100%',
                    height: { xs: 400, md: 600 },
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
                <Chip 
                  label="New Arrival" 
                  sx={{ 
                    position: 'absolute', 
                    top: 24, 
                    left: 24, 
                    bgcolor: '#1fa055', 
                    color: '#fff', 
                    fontWeight: 800,
                    px: 1
                  }} 
                />
              </Paper>
            </motion.div>
          </Grid>

          {/* Product Details Section */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ pt: { md: 2 } }}>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
                <Typography variant="overline" sx={{ color: '#1fa055', fontWeight: 800, letterSpacing: 2 }}>
                  {product.category}
                </Typography>
                
                <Typography variant="h2" sx={{ fontWeight: 900, fontSize: { xs: '2.5rem', md: '3.5rem' }, color: '#111', mt: 1, mb: 2, lineHeight: 1.1 }}>
                  {product.name}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
                  <Rating value={product.ratings?.average || 0} precision={0.5} readOnly size="large" />
                  <Typography variant="body2" sx={{ color: '#888', fontWeight: 600 }}>
                    ({product.ratings?.count || 0} Verified Reviews)
                  </Typography>
                </Box>

                <Typography variant="h3" sx={{ color: '#169C5C', fontWeight: 900, mb: 4 }}>
                  ${product.price.toFixed(2)}
                </Typography>

                <Typography variant="body1" sx={{ color: '#555', fontSize: '1.1rem', lineHeight: 1.8, mb: 6 }}>
                  {product.description}
                </Typography>

                <Box sx={{ mb: 6 }}>
                  <Typography variant="subtitle2" sx={{ color: '#999', textTransform: 'uppercase', letterSpacing: 1, mb: 2, fontWeight: 700 }}>
                    Stock Availability
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: product.stock > 0 ? '#1fa055' : '#d32f2f' }} />
                    <Typography sx={{ fontWeight: 700, color: product.stock > 0 ? '#1fa055' : '#d32f2f' }}>
                      {product.stock > 0 ? `${product.stock} Units left in stock` : 'Out of stock'}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <Button 
                    variant="contained" 
                    fullWidth
                    size="large" 
                    disabled={product.stock === 0 || addingToCart}
                    onClick={handleAddToCart}
                    sx={{ 
                      py: 2.5, 
                      bgcolor: '#111',
                      color: '#fff',
                      fontWeight: 800, 
                      fontSize: '1.1rem',
                      textTransform: 'none',
                      borderRadius: 4,
                      boxShadow: '0 10px 20px rgba(0,0,0,0.15)',
                      '&:hover': { bgcolor: '#333' }
                    }}
                  >
                    {addingToCart ? <CircularProgress size={24} color="inherit" /> : 'Add to Shopping Bag'}
                  </Button>
                  
                  {addMessage && (
                    <Alert severity={addMessage.type} sx={{ borderRadius: 3, fontWeight: 600 }}>
                      {addMessage.text}
                    </Alert>
                  )}
                </Box>

                {/* Trust Badges */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 8, pt: 4, borderTop: '1px solid #eee' }}>
                  {[
                    { icon: <LocalShippingOutlinedIcon />, text: 'Free Delivery' },
                    { icon: <VerifiedUserOutlinedIcon />, text: '2 Year Warranty' },
                    { icon: <AutorenewOutlinedIcon />, text: '30-Day Returns' }
                  ].map((badge, i) => (
                    <Box key={i} sx={{ textAlign: 'center' }}>
                      <Box sx={{ color: '#1fa055', mb: 1 }}>{badge.icon}</Box>
                      <Typography variant="caption" sx={{ fontWeight: 700, color: '#666' }}>{badge.text}</Typography>
                    </Box>
                  ))}
                </Box>
              </motion.div>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default SingleProductPage;
