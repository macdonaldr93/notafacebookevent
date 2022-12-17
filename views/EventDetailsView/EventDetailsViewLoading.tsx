import {
  AccessTime,
  ThumbUp,
  Share,
  EventAvailable,
  ArrowDropDown,
  People,
  Event,
} from '@mui/icons-material';
import {
  Container,
  Box,
  Typography,
  Skeleton,
  Grid,
  Fab,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

export function EventDetailsViewLoading() {
  return (
    <Container maxWidth="md">
      <Box my={10}>
        <section>
          <Box textAlign="center">
            <Box flexDirection="row" justifyContent="center" display="flex">
              <AccessTime color="secondary" sx={{ mr: 1 }} />
              <Typography variant="subtitle1" component="p" gutterBottom>
                <Skeleton variant="text" />
              </Typography>
            </Box>
            <Typography variant="h2" component="h1" gutterBottom>
              <Skeleton variant="text" />
            </Typography>
            <Grid container spacing={1} justifyContent="center">
              <Grid item>
                <Fab color="primary" variant="extended" disabled>
                  <ThumbUp sx={{ mr: 1 }} /> Going
                </Fab>
              </Grid>
              <Grid item>
                <Fab color="secondary" variant="extended" disabled>
                  <Share sx={{ mr: 1 }} /> Share
                </Fab>
              </Grid>
              <Grid item>
                <Fab color="secondary" variant="extended" disabled>
                  <EventAvailable sx={{ mr: 1 }} /> Calendar <ArrowDropDown />
                </Fab>
              </Grid>
            </Grid>
          </Box>
          <Box mt={10}>
            <Paper sx={{ p: 2, mt: 2 }}>
              <Typography variant="h6">Details</Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <Event color="secondary" />
                  </ListItemIcon>
                  <ListItemText primary={<Skeleton variant="text" />} />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <People color="secondary" />
                  </ListItemIcon>
                  <ListItemText primary={<Skeleton variant="text" />} />
                </ListItem>
              </List>
              <Typography variant="body1" component="p">
                <Skeleton variant="rectangular" />
              </Typography>
            </Paper>
          </Box>
        </section>
      </Box>
    </Container>
  );
}
