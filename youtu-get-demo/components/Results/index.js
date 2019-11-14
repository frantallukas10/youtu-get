import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  results: {
    margin: theme.spacing(2, 0),
    maxWidth: '400px',
    width: '100%',
    display: 'inline-block',
    textAlign: 'left',
    color: theme.secondary
  }
}));

const Results = props => {
  const classes = useStyles();
  const { results } = props;

  return (
    results !== false && (
      <Typography variant="h6" className={clsx(classes.results)}>
        {JSON.stringify(results)}
      </Typography>
    )
  );
};

export default Results;
