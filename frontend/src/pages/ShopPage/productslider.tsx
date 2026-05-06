import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
    Grid,
    Card,
    CardMedia,
    CardContent,
    Typography,
    IconButton,
    Box,
    CircularProgress
} from '@mui/material';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import CompareArrowsOutlinedIcon from '@mui/icons-material/CompareArrowsOutlined';

import { motion, AnimatePresence } from 'framer-motion';

const MotionBox = motion(Box);

const iconContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
};

const iconItem = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 }
};

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  stock: number;
  free_shipping?: boolean;
}

interface ProductSliderProps {
    activeCategory: string;
    priceRange: number[];
}

const ProductSlider: React.FC<ProductSliderProps> = ({ activeCategory, priceRange }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/products');
                if (response.ok) {
                    const data = await response.json();
                    setProducts(data.products || []);
                }
            } catch (err) {
                console.error("Failed to fetch products", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const filteredProducts = products.filter(product => {
        const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
        const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
        return matchesCategory && matchesPrice;
    });

    if (loading) {
       return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress color="primary" /></Box>;
    }

    return (
        <Box sx={{ mt: 4 }}>
            <Grid container spacing={4} sx={{ justifyContent: 'flex-start' }}>
                <AnimatePresence mode="popLayout">
                    {filteredProducts.map(product => (
                        <Grid 
                            size={{ xs: 12, sm: 6, md: 4, lg: 4 }} 
                            key={product._id}
                            component={motion.div}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.4, ease: 'easeInOut' }}
                        >
                            <Card sx={{ 
                                height: '100%', 
                                overflow: 'hidden', 
                                boxShadow: '0 4px 12px rgba(0,0,0,0.05)', 
                                borderRadius: 3, 
                                border: '1px solid #f0f0f0',
                                transition: 'transform 0.3s ease',
                                '&:hover': { boxShadow: '0 12px 24px rgba(0,0,0,0.1)' }
                            }} elevation={0}>
                                <MotionBox
                                    initial="hidden"
                                    whileHover="visible"
                                    sx={{ position: 'relative', overflow: 'hidden' }}
                                >
                                    <RouterLink to={`/product/${product._id}`}>
                                        <CardMedia
                                            component="img"
                                            height="280"
                                            image={product.image || 'https://picsum.photos/400/400?random=' + product._id}
                                            alt={product.name}
                                            sx={{ objectFit: 'cover', transition: 'transform 0.5s ease', '&:hover': { transform: 'scale(1.1)' } }}
                                        />
                                    </RouterLink>

                                    <MotionBox
                                        variants={iconContainer}
                                        sx={{
                                            position: 'absolute',
                                            top: 12,
                                            right: 12,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 1
                                        }}
                                    >
                                        {[FavoriteBorderIcon, CompareArrowsOutlinedIcon, VisibilityOutlinedIcon, ShoppingCartOutlinedIcon].map(
                                            (Icon, i) => (
                                                <MotionBox key={i} variants={iconItem}>
                                                    <IconButton
                                                        size="small"
                                                        sx={{
                                                            backgroundColor: '#fff',
                                                            color: '#111',
                                                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                                            '&:hover': {
                                                                backgroundColor: '#169C5C',
                                                                color: '#fff'
                                                            }
                                                        }}
                                                    >
                                                        <Icon fontSize="small" />
                                                    </IconButton>
                                                </MotionBox>
                                            )
                                        )}
                                    </MotionBox>
                                </MotionBox>

                                <CardContent sx={{ pt: 2.5 }}>
                                    <Typography variant="h6" noWrap sx={{ fontWeight: 800, fontSize: '1.1rem', color: '#111', mb: 0.5 }}>
                                        {product.name}
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <Typography sx={{ fontWeight: 900, color: '#169C5C', fontSize: '1.2rem' }}>
                                            ${Number(product.price).toFixed(2)}
                                        </Typography>
                                        <Typography variant="caption" sx={{ color: '#999', bgcolor: '#f8f8f8', px: 1, py: 0.5, borderRadius: 1 }}>
                                            {product.category}
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </AnimatePresence>
                {filteredProducts.length === 0 && (
                    <Box sx={{ width: '100%', textAlign: 'center', py: 10 }}>
                        <Typography variant="h5" color="textSecondary" gutterBottom>No products found in this category or price range.</Typography>
                        <Typography color="textSecondary">Try adjusting your filters.</Typography>
                    </Box>
                )}
            </Grid>
        </Box>
    )
}

export default ProductSlider;
