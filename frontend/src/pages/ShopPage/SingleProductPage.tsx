import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Box, Container, Grid, Typography, Button, CircularProgress, Alert, Paper, Divider, Chip } from '@mui/material';
import Rating from '@mui/material/Rating';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

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
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Button component={Link} to="/shop" startIcon={<KeyboardBackspaceIcon />} sx={{ mb: 4, color: 'text.secondary' }}>
        Back to Shop
      </Button>

      <Paper elevation={0} sx={{ p: 4, border: '1px solid #eee', borderRadius: 3 }}>
        <Grid container spacing={6}>
          {/* Product Image */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                width: '100%',
                height: 450,
                backgroundImage: `url(${product.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: 2,
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
              }}
            />
          </Grid>

          {/* Product Details */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Chip label={product.category} color="primary" variant="outlined" sx={{ mb: 2 }} />
            
            <Typography variant="h3" gutterBottom sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, color: '#111', fontWeight: 800 }}>
              {product.name}
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1, mb: 2 }}>
              <Rating value={product.ratings?.average || 0} precision={0.5} readOnly />
              <Typography variant="body2" color="text.secondary">
                ({product.ratings?.count || 0} reviews)
              </Typography>
            </Box>

            <Typography variant="h4" sx={{ color: '#169C5C', mb: 3, fontWeight: 700 }}>
              ${product.price.toFixed(2)}
            </Typography>

            <Divider sx={{ my: 3 }} />

            <Typography variant="body1" sx={{ color: '#555', lineHeight: 1.8, mb: 4 }}>
              {product.description}
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Box>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Availability
                </Typography>
                <Typography variant="body1" color={product.stock > 0 ? "success.main" : "error.main"} sx={{ fontWeight: 600 }}>
                  {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                </Typography>
              </Box>

              <Button 
                variant="contained" 
                color="primary" 
                size="large" 
                startIcon={<ShoppingCartOutlinedIcon />}
                disabled={product.stock === 0}
                sx={{ 
                  py: 1.5, 
                  fontWeight: 700, 
                  fontSize: '1.1rem',
                  textTransform: 'none',
                  borderRadius: 2
                }}
              >
                {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default SingleProductPage;
