import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ResponsiveAppBar from './components/ResponsiveAppBar';

export default function App() {
  const [setOpen] = React.useState(false); // demo for CTA

  return (
    <>
      <ResponsiveAppBar onOpenSignUp={() => setOpen(true)} />

      {/* HERO */}
      <Box id="hero" sx={{ py: 10 }}>
        <Container maxWidth="lg">
          <Typography variant="h2" fontWeight={800} gutterBottom>
            Sticky → Floating Navbar Demo
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3 }}>
            Scroll down to see the header drop into a floating pill. Scroll back to the very
            top to see it return to a flat, fixed bar.
          </Typography>
        </Container>
      </Box>
      {/* DEMO SECTIONS */}
      {[
        { id: 'problem', title: 'Problem' },
        { id: 'solution', title: 'Solution' },
        { id: 'pricing', title: 'Pricing' },
        { id: 'faq', title: 'FAQ' },
      ].map((s) => (
        <Box id={s.id} key={s.id} sx={{ py: 14, bgcolor: s.id === 'solution' ? 'background.default' : 'background.paper' }}>
          <Container maxWidth="lg">
            <Typography variant="h3" fontWeight={800} gutterBottom>{s.title}</Typography>
          </Container>
        </Box>
      ))}

      <Box sx={{ py: 14 }} />
    </>
  );
}
