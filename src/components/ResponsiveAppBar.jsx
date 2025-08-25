import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { alpha } from '@mui/material/styles';

const NAV_LINKS = [
  { label: 'Problem', href: '#problem' },
  { label: 'Solution', href: '#solution' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
];

export default function ResponsiveAppBar({ onOpenSignUp }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [atTop, setAtTop] = React.useState(true);

  React.useEffect(() => {
    const onScroll = () => setAtTop(window.scrollY <= 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const openMobile = () => setMobileOpen(true);
  const closeMobile = () => setMobileOpen(false);

  const handleAnchorClick = (e, href) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    closeMobile();
  };

  const ctaSx = {
    bgcolor: '#000',
    color: '#fff',
    borderRadius: '999px',
    px: 2,
    py: 0.75,
    textTransform: 'none',
    '&:hover': { bgcolor: '#3CDA9C', color: '#000' },
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: 'transparent',
          boxShadow: 'none',
          zIndex: (t) => t.zIndex.appBar,
          top: atTop ? 0 : 12, // drop down when scrolled = floating look
          transition: (t) => t.transitions.create(['top'], { duration: 220 }),
        }}
      >
        <Container maxWidth="lg" disableGutters>
          <Toolbar disableGutters sx={{ px: { xs: 2, md: 0 } }}>
            <Paper
              elevation={0}
              sx={(theme) => ({
                width: '100%',
                mx: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 1,
                px: { xs: 1.75, sm: 3.25 },
                py: { xs: 1, sm: 1.5 },

                // transforms between fixed (top) and floating (scrolled)
                borderRadius: atTop ? 0 : '999px',
                border: atTop ? '0px solid transparent' : '1px solid',
                borderColor: atTop ? 'transparent' : 'divider',
                bgcolor: atTop
                  ? theme.palette.background.paper
                  : alpha(theme.palette.background.paper, 0.8),
                backdropFilter: atTop ? 'none' : 'saturate(180%) blur(10px)',
                boxShadow: atTop ? 'none' : '0 8px 24px rgba(0,0,0,0.08)',
                transition: (t) =>
                  t.transitions.create(
                    ['border-radius', 'box-shadow', 'background-color', 'backdrop-filter', 'border-color'],
                    { duration: 220 }
                  ),
              })}
            >
              {/* Left: brand */}
              <Box
                component="a"
                href="#hero"
                onClick={(e) => handleAnchorClick(e, '#hero')}
                sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}
              >
                {/* Replace with your logo image if you have one */}
                <Box
                  sx={{
                    height: 28,
                    width: 28,
                    borderRadius: '6px',
                    bgcolor: '#3CDA9C',
                    mr: 1,
                  }}
                />
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 700, letterSpacing: '.12em', display: { xs: 'none', sm: 'inline' } }}
                >
                  Zenith
                </Typography>
              </Box>

              {/* Center: nav (desktop) */}
              <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 0.5 }}>
                {NAV_LINKS.map((item) => (
                  <Button
                    key={item.label}
                    color="inherit"
                    size="small"
                    onClick={(e) => handleAnchorClick(e, item.href)}
                    component="a"
                    href={item.href}
                    sx={{
                      borderRadius: '999px',
                      px: 1.25,
                      textTransform: 'none',
                      '&:hover': { bgcolor: (t) => alpha(t.palette.text.primary, 0.06) },
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
              </Box>

              {/* Right: CTA (desktop) */}
              <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
                <Button variant="contained" disableElevation sx={ctaSx} onClick={onOpenSignUp}>
                  Join Waitlist
                </Button>
              </Box>

              {/* Mobile hamburger */}
              <Box sx={{ display: { xs: 'flex', sm: 'none' } }}>
                <IconButton onClick={openMobile} aria-label="open menu" size="small">
                  <MenuIcon />
                </IconButton>
              </Box>
            </Paper>
          </Toolbar>
        </Container>

        {/* Mobile Drawer */}
        <Drawer
          anchor="left"
          open={mobileOpen}
          onClose={closeMobile}
          ModalProps={{ keepMounted: true }}
          PaperProps={{
            sx: {
              width: '100vw',
              maxWidth: 520,
              height: '100dvh',
              bgcolor: 'background.paper',
              p: 2,
              display: 'flex',
              flexDirection: 'column',
            },
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 1, py: 1 }}>
            <Typography fontWeight={700}>Zenith</Typography>
            <IconButton onClick={closeMobile} aria-label="close menu">
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider sx={{ my: 1 }} />
          <List sx={{ px: 1 }}>
            {NAV_LINKS.map((item) => (
              <ListItemButton
                key={item.label}
                onClick={(e) => handleAnchorClick(e, item.href)}
                component="a"
                href={item.href}
                sx={{ py: 2 }}
              >
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  {item.label}
                </Typography>
              </ListItemButton>
            ))}
          </List>

          <Box sx={{ mt: 'auto', px: 1 }}>
            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={() => {
                closeMobile();
                onOpenSignUp?.();
              }}
              sx={{
                borderRadius: '999px',
                py: 1.2,
                bgcolor: '#000',
                color: '#fff',
                textTransform: 'none',
                '&:hover': { bgcolor: '#3CDA9C', color: '#000' },
              }}
            >
              Join Waitlist
            </Button>
          </Box>
        </Drawer>
      </AppBar>

      {/* Spacer so content doesn't hide behind fixed AppBar */}
      <Box sx={(t) => t.mixins.toolbar} />
    </>
  );
}
