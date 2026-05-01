import { Link as RouterLink } from 'react-router-dom';
import {
    Grid,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Typography,
    IconButton,
    Box,
} from '@mui/material';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import CompareArrowsOutlinedIcon from '@mui/icons-material/CompareArrowsOutlined';

import { motion } from 'framer-motion';

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
  id: number | string;
  name: string;
  slug: string;
  price: string | number;
  image?: string;
  free_shipping?: boolean;
}

const dummyProducts: Product[] = [
  { id: 1, name: 'Minimalist Chair', slug: 'minimalist-chair', price: 120.00, free_shipping: true },
  { id: 2, name: 'Wooden Coffee Table', slug: 'wooden-coffee-table', price: 240.00, free_shipping: false },
  { id: 3, name: 'Nordic Lamp', slug: 'nordic-lamp', price: 85.00, free_shipping: true },
  { id: 4, name: 'Leather Sofa', slug: 'leather-sofa', price: 890.00, free_shipping: true },
  { id: 5, name: 'Round Mirror', slug: 'round-mirror', price: 150.00, free_shipping: false },
  { id: 6, name: 'Ceramic Vase', slug: 'ceramic-vase', price: 60.00, free_shipping: true },
  { id: 7, name: 'Bookcase', slug: 'bookcase', price: 300.00, free_shipping: false },
  { id: 8, name: 'Office Desk', slug: 'office-desk', price: 450.00, free_shipping: true },
];

const ProductSlider = () => {
    return (
        <Box sx={{ mt: 4 }}>
            <Grid container spacing={4} sx={{ justifyContent: 'center' }}>
                {dummyProducts.map(product => (
                    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={product.id}>
                        <Card sx={{ height: '100%', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', borderRadius: 2, border: '1px solid #f0f0f0' }} elevation={0}>
                            <MotionBox
                                initial="hidden"
                                whileHover="visible"
                                sx={{ position: 'relative', overflow: 'hidden' }}
                            >
                                <RouterLink to={`/product/${product.slug}`}>
                                    <CardMedia
                                        component="img"
                                        height="300"
                                        image={product.image || 'https://picsum.photos/400/400?random=' + product.id}
                                        alt={product.name}
                                        sx={{ objectFit: 'cover', transition: 'transform 0.4s ease-in-out', '&:hover': { transform: 'scale(1.05)' } }}
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

                            <CardContent>
                                <Typography variant="h6" noWrap sx={{ fontWeight: 700, fontSize: '1.05rem', color: '#111' }}>
                                    {product.name}
                                </Typography>
                                <Typography sx={{ fontWeight: 800, color: '#169C5C', mt: 0.5 }}>
                                    ${Number(product.price).toFixed(2)}
                                </Typography>
                            </CardContent>

                            <CardActions sx={{ px: 2, pb: 2 }}>
                                {product.free_shipping && (
                                    <Typography variant="caption" sx={{ color: '#111', bgcolor: '#f0f0f0', px: 1, py: 0.5, borderRadius: 1, fontWeight: 700 }}>
                                        Free Shipping
                                    </Typography>
                                )}
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}

export default ProductSlider;
