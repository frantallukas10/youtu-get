import React from 'react';
import styled from 'styled-components';
import {
  makeStyles,
  Typography,
  Container,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton
} from '@material-ui/core';
import { Delete, AddCircleOutline } from '@material-ui/icons';
import clsx from 'clsx';
import { getYoutubeInfo, isValidId } from 'youtu-get';
import Results from '../../components/Results';

const WrapperInput = styled.div`
  background: ${({ theme }) => theme.secondary.background};
`;

const useStyles = makeStyles(theme => ({
  subTitle: {
    color: 'inherit',
    padding: theme.spacing(2, 3)
  },
  formControl: {
    '& label.Mui-focused': {
      color: 'inherit'
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'inherit'
      },
      '&:hover fieldset': {
        borderColor: 'inherit'
      },
      '&.Mui-focused fieldset': {
        borderColor: 'inherit'
      }
    },
    '& .MuiSvgIcon-root': {
      color: theme.default.color
    },
    margin: theme.spacing(0, 0, 3),
    maxWidth: '400px',
    width: '100%'
  },
  notValid: {
    color: 'red',

    '& label.Mui-focused': {
      color: 'inherit'
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'inherit'
      },
      '&:hover fieldset': {
        borderColor: 'inherit'
      },
      '&.Mui-focused fieldset': {
        borderColor: 'inherit'
      }
    },
    '& .MuiInputAdornment-positionEnd:nth-child(3) .MuiSvgIcon-root': {
      color: 'red'
    }
  },
  outlinedInput: {
    color: 'inherit'
  },
  inputLabel: {
    color: 'inherit'
  }
}));

const Body = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState('');
  const [isValid, setIsValid] = React.useState(false);
  const [results, setResults] = React.useState(false);

  const handleChange = event => {
    setValue(event.target.value);
    setIsValid(false);
  };

  const handleRemoveValue = () => {
    setValue('');
    setResults(false);
    setIsValid(false);
  };

  const handleMouseDown = event => {
    event.preventDefault();
  };

  const getInfo = value => setResults(getYoutubeInfo(value));

  const handleSubmit = () => {
    setIsValid(isValidId(value));
    if (!isValid) {
      getInfo(value);
    }
  };

  return (
    <>
      <WrapperInput>
        <Container align="center">
          <Typography variant="h5" className={clsx(classes.subTitle)}>
            Example youtube playlist id: PLxQ30nUCB0uNCCKBD_JW1udM7iYH27cu2
          </Typography>
          <FormControl
            className={clsx(classes.formControl, isValid && classes.notValid)}
            variant="outlined"
            align="left"
          >
            <InputLabel
              htmlFor="input-time"
              className={clsx(classes.inputLabel)}
            >
              <Typography variant="body2" gutterBottom>
                Type your youtube playlist id
              </Typography>
            </InputLabel>
            <OutlinedInput
              onKeyPress={event => event.key === 'Enter' && handleSubmit()}
              className={clsx(classes.outlinedInput)}
              id="input-time"
              type="text"
              error={isValid}
              value={value}
              onChange={handleChange}
              endAdornment={
                value.length > 0 && (
                  <>
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle"
                        onClick={handleRemoveValue}
                        onMouseDown={handleMouseDown}
                        edge="end"
                      >
                        <Delete className={clsx(classes.icon)} />
                      </IconButton>
                    </InputAdornment>
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle"
                        onClick={handleSubmit}
                        onMouseDown={handleMouseDown}
                        edge="end"
                      >
                        <AddCircleOutline className={clsx(classes.icon)} />
                      </IconButton>
                    </InputAdornment>
                  </>
                )
              }
              labelWidth={183}
            />
            {isValid && (
              <Typography variant="body1">
                This input: "{value}" is wrong
                <br />
                please define correct your youtube playlist id!
              </Typography>
            )}
          </FormControl>
        </Container>
      </WrapperInput>
      <Container align="center">
        <Results results={results} />
      </Container>
    </>
  );
};

export default Body;
