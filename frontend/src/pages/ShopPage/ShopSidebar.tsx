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
  activeCategory: string;
  setActiveCategory: (value: string) => void;
}

const ShopSidebar: React.FC<ShopSidebarProps> = ({ 
  priceRange, 
  setPriceRange, 
  activeCategory, 
  setActiveCategory 
}) => {
  const categories = ['All', 'Sofa', 'Table', 'Chair', 'Bed', 'Other'];

  const brands = ['IdealInstitute', 'BroyHill', 'CornDell', 'PlushLounge', 'ComfortHome'];

  return (
    <Box sx={{ 
      width: 250, 
      display: { xs: 'none', md: 'block' },
      position: 'sticky',
      top: 100,
      alignSelf: 'start',
      height: 'fit-content',
      pr: 2,
    }}>
      {/* Categories */}
      <Box sx={{ mb: 4 }}>
        <ListCategories 
          categories={categories} 
          activeCategory={activeCategory} 
          setActiveCategory={setActiveCategory} 
        />
      </Box>

      <Divider sx={{ my: 1, borderColor: '#f0f0f0' }} />
      
      {/* ... brands and other filters ... */}
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

      <FilterAccordion title="Price">
        <Box sx={{ px: 1, pt: 2 }}>
          <Slider
            value={priceRange}
            onChange={(_, newValue) => setPriceRange(newValue as number[])}
            valueLabelDisplay="auto"
            min={0}
            max={1000}
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
      <FilterAccordion title="Color"><Typography variant="caption" sx={{ color: '#999' }}>Options coming soon...</Typography></FilterAccordion>
    </Box>
  );
};

const ListCategories = ({ 
  categories, 
  activeCategory, 
  setActiveCategory 
}: { 
  categories: string[], 
  activeCategory: string, 
  setActiveCategory: (v: string) => void 
}) => (
  <Box>
    {categories.map((cat) => (
      <Typography 
        key={cat} 
        onClick={() => setActiveCategory(cat)}
        sx={{ 
          fontSize: '0.95rem', 
          fontWeight: cat === activeCategory ? 700 : 400, 
          py: 0.8, 
          cursor: 'pointer', 
          color: cat === activeCategory ? '#1fa055' : '#555',
          borderLeft: cat === activeCategory ? '3px solid #1fa055' : '3px solid transparent',
          pl: 1.5,
          ml: -1.5,
          transition: 'all 0.2s ease',
          '&:hover': { color: '#1fa055', pl: 2 },
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
