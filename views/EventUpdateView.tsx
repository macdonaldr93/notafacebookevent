import { Delete, Visibility } from '@mui/icons-material';
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
  Grid,
} from '@mui/material';
import { Box } from '@mui/system';
import { doc, setDoc, Timestamp, serverTimestamp } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useFirestore } from 'reactfire';
import { EventForm, EventFormValues } from '../containers';
import { EventData } from '../types/events';
import { eventFormToEventData } from '../utils/eventForm';

export function EventUpdateView({ id, data }: { id: string; data: EventData }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const firestore = useFirestore();
  const eventRef = doc(firestore, 'events', id);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    getValues,
    setError,
  } = useForm<EventFormValues>({
    defaultValues: {
      adminPassword: '',
      coverMedia: undefined,
      description: data?.description ?? '',
      location: data?.location ?? '',
      locationUrl: data?.locationUrl ?? '',
      name: data?.name ?? '',
      startAt: data?.startAt?.toDate() ?? '',
      endAt: data?.endAt?.toDate() ?? '',
    },
  });

  const onEventDelete = async () => {
    const adminPassword = getValues().adminPassword;

    if (!adminPassword) {
      enqueueSnackbar('Fill in the admin password', {
        variant: 'error',
      });
      setError('adminPassword', {
        type: 'required',
        message: 'This is required',
      });
      return;
    }

    setDeleting(true);

    try {
      await setDoc(
        eventRef,
        {
          admin: {
            managePassword: adminPassword,
          },
          visibility: 'archived',
          archivedAt: serverTimestamp(),
        },
        { merge: true },
      );
      router.push('/');
      enqueueSnackbar('Event deleted', { variant: 'success' });
    } catch (err) {
      console.error(err);
      setDeleting(false);
      enqueueSnackbar('Failed to delete event. Try again', {
        variant: 'error',
      });
    }
  };

  const onSubmit: SubmitHandler<EventFormValues> = async formValues => {
    if (formValues.startAt === '') {
      enqueueSnackbar('Event start cannot be blank', { variant: 'error' });
      return;
    }

    try {
      await setDoc(eventRef, eventFormToEventData(formValues), { merge: true });
      enqueueSnackbar('Event updated', { variant: 'success' });
    } catch (err) {
      console.error(err);
      enqueueSnackbar('Failed to update event. Try again', {
        variant: 'error',
      });
    }
  };

  return (
    <>
      <Container maxWidth="md">
        <Box my={10}>
          <Box mb={5}>
            <Grid
              container
              spacing={1}
              alignItems="center"
              justifyContent="flex-end"
            >
              <Grid item>
                <Fab
                  color="secondary"
                  variant="extended"
                  href={`/events/${id}`}
                >
                  <Visibility sx={{ mr: 1 }} /> View
                </Fab>
              </Grid>
              <Grid item>
                <Fab
                  color="error"
                  variant="extended"
                  onClick={() => setModalOpen(true)}
                >
                  <Delete sx={{ mr: 1 }} /> Delete
                </Fab>
              </Grid>
            </Grid>
          </Box>
          <EventForm
            control={control}
            isSubmitting={isSubmitting}
            onSubmit={handleSubmit(onSubmit)}
          />
        </Box>
      </Container>
      <Dialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This will permanently delete your event.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            type="submit"
            variant="contained"
            color="error"
            onClick={onEventDelete}
            disabled={deleting}
          >
            Yes, I&apos;m sure
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
