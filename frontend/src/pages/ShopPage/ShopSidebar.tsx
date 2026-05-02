import React from 'react';
import {
  Box,
  Typography,
  Divider,
  FormControlLabel,
  Checkbox,
  Slider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface ShopSidebarProps {
  priceRange: number[];
  setPriceRange: (value: number[]) => void;
}

const ShopSidebar: React.FC<ShopSidebarProps> = ({ priceRange, setPriceRange }) => {
  const categories = [
    'Kitchen', 'Lighting', 'Living room', 'Miscellaneous', 'Office', 'Sofas', 'Tables', 'Wardrobes'
  ];

  const brands = ['IdealInstitute', 'BroyHill', 'CornDell', 'PlushLounge', 'ComfortHome'];

  return (
    <Box sx={{ 
      width: 250, 
      display: { xs: 'none', md: 'block' },
      position: 'sticky',
      top: 100, // Adjusted for navbar height
      alignSelf: 'start',
      height: 'fit-content',
      pr: 2,
    }}>
      {/* Categories */}
      <Box sx={{ mb: 4 }}>
        <ListCategories categories={categories} />
      </Box>

      <Divider sx={{ my: 1, borderColor: '#f0f0f0' }} />

      {/* Brands Accordion */}
      <FilterAccordion title="Brands">
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          {brands.map((brand) => (
            <FormControlLabel
              key={brand}
              control={<Checkbox size="small" color="success" />}
              label={brand}
              sx={{ '& .MuiTypography-root': { fontSize: '0.9rem', color: '#555' } }}
            />
          ))}
        </Box>
      </FilterAccordion>

      <Divider sx={{ my: 2 }} />

      {/* Price Accordion */}
      <FilterAccordion title="Price">
        <Box sx={{ px: 1, pt: 2 }}>
          <Slider
            value={priceRange}
            onChange={(_, newValue) => setPriceRange(newValue as number[])}
            valueLabelDisplay="auto"
            min={0}
            max={5000}
            size="small"
            sx={{ 
                color: '#1fa055',
                '& .MuiSlider-thumb': { width: 12, height: 12 }
            }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
            <Typography variant="caption" sx={{ color: '#666' }}>${priceRange[0]}</Typography>
            <Typography variant="caption" sx={{ color: '#666' }}>${priceRange[1]}</Typography>
          </Box>
        </Box>
      </FilterAccordion>

      <Divider sx={{ my: 2 }} />

      {/* Color Accordion */}
      <FilterAccordion title="Color">
        <Typography variant="caption" sx={{ color: '#999' }}>Color options here...</Typography>
      </FilterAccordion>

      <Divider sx={{ my: 2 }} />

      {/* Product Type Accordion */}
      <FilterAccordion title="Product Type">
        <Typography variant="caption" sx={{ color: '#999' }}>Type options here...</Typography>
      </FilterAccordion>

      <Divider sx={{ my: 2 }} />

      {/* Finish Accordion */}
      <FilterAccordion title="Finish">
        <Typography variant="caption" sx={{ color: '#999' }}>Finish options here...</Typography>
      </FilterAccordion>
    </Box>
  );
};

const ListCategories = ({ categories }: { categories: string[] }) => (
  <Box>
    {categories.map((cat) => (
      <Typography 
        key={cat} 
        sx={{ 
          fontSize: '0.95rem', 
          fontWeight: 400, 
          py: 0.8, 
          cursor: 'pointer', 
          color: '#555',
          borderLeft: cat === 'Living room' ? '3px solid #1fa055' : '3px solid transparent',
          pl: 1.5,
          ml: -1.5,
          '&:hover': { color: '#1fa055' },
          ...(cat === 'Living room' && { color: '#1fa055', fontWeight: 700 })
        }}
      >
        {cat}
      </Typography>
    ))}
  </Box>
);

const FilterAccordion = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <Accordion disableGutters elevation={0} sx={{ 
    backgroundColor: 'transparent', 
    '&:before': { display: 'none' },
    '& .MuiAccordionSummary-root': { px: 0, minHeight: 40 },
    '& .MuiAccordionSummary-content': { my: 0.5 },
  }}>
    <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ fontSize: 18 }} />}>
      <Typography sx={{ fontWeight: 700, fontSize: '0.9rem', textTransform: 'capitalize' }}>
        {title}
      </Typography>
    </AccordionSummary>
    <AccordionDetails sx={{ px: 0, pt: 0 }}>
      {children}
    </AccordionDetails>
  </Accordion>
);

export default ShopSidebar;
