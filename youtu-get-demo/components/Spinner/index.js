import React from 'react';
import {
  makeStyles,
  Box,
  Container,
  Typography,
  CircularProgress,
} from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles({
  wrapper: {
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    alignItems: 'center',
    color: 'inherit',
    zIndex: 1,
    userSelect: 'none',
  },
  spinner: {
    color: 'inherit',
  },
});

const Spinner = () => {
  const classes = useStyles();
  return (
    <Box className={clsx(classes.wrapper)}>
      <Container align="center" fixed>
        <Typography variant="h6" gutterBottom>
          Loading...
        </Typography>
        <CircularProgress className={clsx(classes.spinner)} />
      </Container>
    </Box>
  );
};

export default Spinner;
