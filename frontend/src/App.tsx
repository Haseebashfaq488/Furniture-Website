import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import Navbar from './Navbar';
import Home from './pages/HomePage/Home';
import ShopPage from './pages/ShopPage/ShopPage';
import ConfiguratorPage from './pages/ConfiguratorPage/ConfiguratorPage';
import Footer from './Footer';

// Define the global theme matching CozyCorner demo
const theme = createTheme({
  typography: {
    fontFamily: '"Albert Sans", sans-serif',
    h1: { fontSize: '70px', fontWeight: 600, lineHeight: 1.05 },
    h2: { fontSize: '40px', fontWeight: 600, lineHeight: 1.2 },
    h3: { fontSize: '30px', fontWeight: 600, lineHeight: 1.2 },
    h5: { fontSize: '24px', fontWeight: 600, lineHeight: 1.2 },
    body1: { fontSize: '15px', fontWeight: 400 },
    body2: { fontSize: '14px', fontWeight: 400 },
  },
  palette: {
    primary: { main: '#169C5C' }, // Brand green color
    background: { default: '#fff' },
    text: { primary: '#000' },
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          '@media (min-width: 1200px)': {
            paddingLeft: '100px',
            paddingRight: '100px',
            maxWidth: '100% !important',
          },
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/configurator" element={<ConfiguratorPage />} />
      </Routes>
      <Footer />
    </ThemeProvider>
  );
}

export default App;



