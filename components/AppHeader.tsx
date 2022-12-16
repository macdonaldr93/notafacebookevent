import { AccountCircle } from '@mui/icons-material';
import { AppBar, Container, Toolbar, Typography, Box } from '@mui/material';
import { useUsername } from '../hooks/useUsername';

export function AppHeader() {
  const { username } = useUsername();

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              fontWeight: 700,
              flexGrow: 1,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            NOT A FACEBOOK EVENT
          </Typography>
          {username && (
            <Box display="flex" alignItems="center">
              <AccountCircle sx={{ mr: 1 }} />
              <Typography
                variant="h6"
                noWrap
                sx={{
                  fontWeight: 700,
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                {username}
              </Typography>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
