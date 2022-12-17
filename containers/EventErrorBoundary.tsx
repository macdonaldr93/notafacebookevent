import { Component, ErrorInfo, ReactNode } from 'react';
import { Container, Box, Typography } from '@mui/material';
import { NextSeo } from 'next-seo';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class EventErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <>
          <NextSeo title="Not Found" />
          <Container maxWidth="md">
            <Box my={10}>
              <section>
                <Box textAlign="center">
                  <Typography variant="h2" component="h1" gutterBottom>
                    We can&apos;t find the event
                  </Typography>
                  <Typography variant="h5" component="p" gutterBottom>
                    Ask your friend for the URL to their event again
                  </Typography>
                </Box>
              </section>
            </Box>
          </Container>
        </>
      );
    }

    return this.props.children;
  }
}
