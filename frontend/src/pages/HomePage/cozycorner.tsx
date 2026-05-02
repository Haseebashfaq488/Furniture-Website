
import {
    Grid,
    Box,
    Container,
    Typography,
    Card,
    CardContent,
} from '@mui/material';
import {
    Construction,   // instead of Hammer           
    Favorite,       // instead of Heart
    Chair,          // ✅ correct
    HeadsetMic,     // ✅ correct
} from '@mui/icons-material';

import ForestIcon from '@mui/icons-material/Forest';
import cozycorner from '../../assets/images/Whycozycorner.jpg';
import WaterFillButton from '../ShopPage/AnimatedButton';

const HeroSection = () => {

    return (
        <Box
            sx={{
                backgroundColor: '#ffffff',
                py: { xs: 6, md: 10 },
            }}
        >
            <Container maxWidth="xl">
                <Grid container spacing={4} sx={{ justifyContent: 'center', alignItems: 'center' }}>
                    {/* Left Text Content */}
                    <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6 }}>
                        <Box sx={{ maxWidth: { md: '90%' } }}>
                            <Typography
                                variant="h2"
                                component="h1"
                                sx={{
                                    fontSize: { xs: '2.5rem', md: '3.2rem' },
                                    fontWeight: 700,
                                    lineHeight: 1.1,
                                    mb: 3,
                                }}
                            >
                                Specializes in artisanal, handcrafted furniture, blending traditional woodworking techniques!
                            </Typography>

                            <Typography
                                variant="body1"
                                sx={{
                                    fontSize: '1.1rem',
                                    color: '#555',
                                    mb: 4,
                                    maxWidth: '85%',
                                }}
                            >
                                With contemporary design to create timeless pieces that add warmth and character to any space.
                            </Typography>

                            <WaterFillButton
                                sx={{
                                    borderRadius: '50px',
                                    px: 4,
                                    py: 1.5,
                                    textTransform: 'none',
                                    fontSize: '1.1rem',
                                    fillColor: "#0ea5e9",

                                }}
                            >
                                About CozyCorner
                            </WaterFillButton>
                        </Box>
                    </Grid>

                    {/* Right Image */}
                    <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6 }}>
                        <Box
                            component="img"
                            src={cozycorner} // Replace with your actual image path
                            alt="Modern dining room with handcrafted furniture"
                            sx={{
                                width: '100%',
                                height: 'auto',
                                borderRadius: 2,
                                boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                            }}
                        />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

const FeaturesSection = () => {
    const features = [
        {
            icon: <Construction sx={{ fontSize: 40 }} />,
            title: 'Craftsmanship Guaranteed',
            description: 'Every piece is meticulously handcrafted by skilled artisans.',
        },
        {
            icon: <ForestIcon sx={{ fontSize: 40 }} />,
            title: 'Sustainability at Heart',
            description: 'We prioritize eco-friendly materials and practices in our creations.',
        },
        {
            icon: <Favorite sx={{ fontSize: 40 }} />,
            title: 'Customize for a Personal Touch',
            description: 'Tailor your furniture to fit your space and style perfectly.',
        },
        {
            icon: <Chair sx={{ fontSize: 40 }} />,
            title: 'Durability and Quality Focus',
            description: 'Built to last, using only the highest quality materials.',
        },
        {
            icon: <HeadsetMic sx={{ fontSize: 40 }} />,
            title: 'Customize for a Personal Touch',
            description: 'Dedicated support to ensure a seamless shopping experience.',
        },
    ];

    return (
        <Box sx={{ py: 8, backgroundColor: '#f8f9fa' }}>
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    {features.map((feature, index) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }} key={index}>
                            <Card
                                elevation={0}
                                sx={{
                                    height: '100%',
                                    textAlign: 'center',
                                    backgroundColor: 'transparent',
                                    '&:hover': {
                                        transform: 'translateY(-8px)',
                                        transition: 'all 0.3s ease',
                                    },
                                }}
                            >
                                <CardContent sx={{ pt: 4 }}>
                                    <Box
                                        sx={{
                                            color: '#10b981',
                                            mb: 3,
                                            display: 'flex',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        {feature.icon}
                                    </Box>

                                    <Typography
                                        variant="h6"
                                        component="h3"
                                        sx={{
                                            fontWeight: 600,
                                            mb: 2,
                                            fontSize: '1.1rem',
                                        }}
                                    >
                                        {feature.title}
                                    </Typography>

                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: '#666',
                                            lineHeight: 1.6,
                                        }}
                                    >
                                        {feature.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export { HeroSection, FeaturesSection };
