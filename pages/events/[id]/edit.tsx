import {
  Alert,
  Box,
  Button,
  Container,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import { doc, DocumentReference } from 'firebase/firestore';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import { useFirestore, useFirestoreDocData } from 'reactfire';
import { EventData } from '../../../types/events';
import { getEventManagePassword } from '../../../utils/cookies';

export interface EventsIdProps {
  id: string;
}

export default function EventsId({ id }: EventsIdProps) {
  const managePassword = getEventManagePassword(id);
  const [modalOpen, setModalOpen] = useState(!managePassword);
  const firestore = useFirestore();
  const eventRef = doc(firestore, 'events', id) as DocumentReference<EventData>;
  const { status, data } = useFirestoreDocData(eventRef);

  if (!managePassword) {
    return (
      <Dialog open={modalOpen}>
        <DialogTitle>Admin mode</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To edit this event, you have to enter your admin password.
          </DialogContentText>
          <TextField
            autoFocus
            margin="normal"
            id="name"
            label="Admin password"
            type="password"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button>Unlock</Button>
        </DialogActions>
      </Dialog>
    );
  }

  return (
    <main id="main">
      <Container>
        <Head>
          <title>{data?.name ?? 'Untitled'} - Not a Facebook Event</title>
          <meta name="description" content="Host events off of Facebook" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {status === 'loading' && <p>Loading...</p>}
        <Typography variant="subtitle1" component="p" gutterBottom>
          {data?.startAt?.toDate().toLocaleDateString()}
        </Typography>
        <Typography variant="h2" component="h1" gutterBottom>
          {data?.name}
        </Typography>
        <Alert
          severity="info"
          action={
            <Button variant="outlined" size="small">
              Going
            </Button>
          }
        >
          Ryan invited you
        </Alert>
        <Box>
          <Typography variant="body1" component="p" gutterBottom>
            {data?.description}
          </Typography>
        </Box>
        <Paper>
          <Typography>3 people are going</Typography>
        </Paper>
        <Typography>Timeline</Typography>
        <Paper>
          <Typography>3 people are going</Typography>
        </Paper>
      </Container>
    </main>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  if (!context.params?.id) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      id: context.params.id,
    },
  };
}
