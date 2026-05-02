
import { Box, Typography, Chip } from '@mui/material';



const TopColorFilter = () => {

  const colorFilters = [
    { name: 'Blue', color: '#38587d' },
    { name: 'Beige', color: '#dcd1c3' },
    { name: 'Teal', color: '#4aa09c' },
    { name: 'Pink', color: '#d98b8b' },
    { name: 'Orange', color: '#e87440' },
    { name: 'Burgundy', color: '#7a2020' },
  ];


  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: { xs: 'column', sm: 'row' },
      alignItems: { xs: 'flex-start', sm: 'center' }, 
      gap: { xs: 2, sm: 3 }, 
      mb: 6, 
      pb: 3, 
      borderBottom: '1px solid #eee',
    }}>
      <Typography 
        variant="body2" 
        sx={{ 
          fontWeight: 700, 
          color: '#333', 
          whiteSpace: 'nowrap',
          fontSize: '0.95rem'
        }}
      >
        Shop by color
      </Typography>
      
      <Box sx={{ 
        display: 'flex', 
        gap: 1.5, 
        overflowX: 'auto', 
        width: '100%',
        pb: { xs: 1, sm: 0 },
        '&::-webkit-scrollbar': { display: 'none' },
        '-ms-overflow-style': 'none',
        'scrollbar-width': 'none',
      }}>
        {colorFilters.map((filter, idx) => (
          <Chip
            key={idx}
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ 
                  width: 12, 
                  height: 12, 
                  borderRadius: '50%', 
                  bgcolor: filter.color,
                  boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.05)'
                }} />
                <Typography sx={{ fontWeight: 600, fontSize: '0.85rem', color: '#333' }}>
                  {filter.name}
                </Typography>
              </Box>
            }
            variant="outlined"
            sx={{
              borderRadius: '50px',
              borderColor: '#e5e7eb',
              height: 40,
              px: 0.5,
              backgroundColor: 'transparent',
              flexShrink: 0,
              '&:hover': { 
                bgcolor: '#f9fafb', 
                borderColor: '#d1d5db',
                transform: 'translateY(-1px)'
              },
              transition: 'all 0.2s',
              cursor: 'pointer'
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default TopColorFilter;
