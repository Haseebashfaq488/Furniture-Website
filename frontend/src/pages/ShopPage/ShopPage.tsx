'use client';

import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Chip,
  IconButton,
  Breadcrumbs,
  Link as MuiLink,
} from '@mui/material';
import { Close, GridView, ViewStream, ViewModule } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import ProductSlider from './productslider';
import ShopSidebar from './ShopSidebar';
import TopColorFilter from './TopColorFilter';

const ShopPage = () => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>(['Burgundy Red', 'Chairs']);
  const [priceRange, setPriceRange] = useState<number[]>([200, 2500]);

  const removeFilter = (filter: string) => {
    setSelectedFilters(selectedFilters.filter(f => f !== filter));
  };

  return (
    <Box sx={{ bgcolor: '#fff', minHeight: '100vh', pb: 10 }}>
      {/* Breadcrumbs Section */}
      <Box sx={{ borderBottom: '1px solid #eee', py: 2, mb: 4 }}>
        <Container maxWidth="xl">
          <Breadcrumbs separator="›" aria-label="breadcrumb" sx={{ fontSize: '0.85rem' }}>
            <MuiLink component={Link} to="/" underline="hover" color="inherit">Home</MuiLink>
            <Typography color="text.primary" sx={{ fontSize: '0.85rem' }}>Shop</Typography>
          </Breadcrumbs>
        </Container>
      </Box>

      <Container maxWidth="xl">
        {/* Title */}
        <Typography variant="h3" sx={{ fontWeight: 800, mb: 4, letterSpacing: '-0.5px' }}>
          Shop
        </Typography>

        {/* Top Horizontal Color Filter */}
        <TopColorFilter />

        {/* Selected Filters & Controls Bar */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 6,
          flexWrap: 'wrap',
          gap: 2
        }}>
          {/* Active Chips */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
             <Typography variant="caption" sx={{ fontWeight: 700, color: '#999', textTransform: 'uppercase' }}>Selected filters</Typography>
             <Box sx={{ display: 'flex', gap: 1 }}>
                {selectedFilters.map((filter) => (
                  <Chip
                    key={filter}
                    label={filter}
                    onDelete={() => removeFilter(filter)}
                    deleteIcon={<Close sx={{ fontSize: 14 }} />}
                    sx={{ 
                        borderRadius: '8px', 
                        bgcolor: '#f2f2f2', 
                        fontWeight: 600,
                        fontSize: '0.75rem',
                        height: 32,
                        '& .MuiChip-label': { px: 1.5 }
                    }}
                  />
                ))}
             </Box>
          </Box>

          {/* View & Sort Controls */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: '#f9f9f9', borderRadius: 2, p: 0.5 }}>
                <IconButton size="small"><GridView sx={{ fontSize: 18 }} /></IconButton>
                <IconButton size="small" color="inherit" sx={{ opacity: 0.3 }}><ViewModule sx={{ fontSize: 18 }} /></IconButton>
                <IconButton size="small" color="inherit" sx={{ opacity: 0.3 }}><ViewStream sx={{ fontSize: 18 }} /></IconButton>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="body2" sx={{ color: '#666' }}>Sort by</Typography>
                <select style={{ 
                    border: '1px solid #eee', 
                    borderRadius: '50px', 
                    padding: '8px 16px',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    outline: 'none',
                    cursor: 'pointer'
                }}>
                    <option>Price - High to low</option>
                    <option>Price - Low to high</option>
                    <option>Newest Arrival</option>
                </select>
            </Box>

            <select style={{ 
                    border: '1px solid #eee', 
                    borderRadius: '50px', 
                    padding: '8px 16px',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    outline: 'none'
            }}>
                <option>Show 24</option>
                <option>Show 48</option>
            </select>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', gap: 6, position: 'relative' }}>
          {/* Sidebar - Sticky */}
          <ShopSidebar priceRange={priceRange} setPriceRange={setPriceRange} />

          {/* Product Grid - Scrollable */}
          <Box sx={{ flex: 1 }}>
            <ProductSlider />
            
            {/* Pagination Placeholder */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8, gap: 1 }}>
                <Box sx={{ width: 40, height: 40, borderRadius: '50%', border: '1px solid #eee', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s', '&:hover': { bgcolor: '#1fa055', color: '#fff', borderColor: '#1fa055' } }}>1</Box>
                <Box sx={{ width: 40, height: 40, borderRadius: '50%', border: '1px solid #1fa055', bgcolor: '#1fa055', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600 }}>2</Box>
                <Box sx={{ ml: 2, height: 40, px: 3, borderRadius: '50px', bgcolor: '#111', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, cursor: 'pointer', fontSize: '0.9rem' }}>Next page</Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ShopPage;