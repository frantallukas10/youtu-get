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
  IconButton,
} from '@material-ui/core';
import { Delete, GetApp } from '@material-ui/icons';
import clsx from 'clsx';
import Results from '../../components/Results';
import Spinner from '../../components/Spinner';
import axios from 'axios';

const WrapperInput = styled.div`
  background: ${({ theme }) => theme.secondary.background};
`;

const useStyles = makeStyles((theme) => ({
  subTitle: {
    wordBreak: 'break-all',
    color: 'inherit',
    padding: theme.spacing(2, 3),
  },
  formControl: {
    '& label.Mui-focused': {
      color: 'inherit',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'inherit',
      },
      '&:hover fieldset': {
        borderColor: 'inherit',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'inherit',
      },
    },
    '& .MuiSvgIcon-root': {
      color: theme.default.color,
    },
    margin: theme.spacing(0, 0, 3),
    maxWidth: '800px',
    width: '100%',
  },
  notValid: {
    color: 'red',

    '& label.Mui-focused': {
      color: 'inherit',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'inherit',
      },
      '&:hover fieldset': {
        borderColor: 'inherit',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'inherit',
      },
    },
    '& .MuiInputAdornment-positionEnd:nth-child(3) .MuiSvgIcon-root': {
      color: 'red',
    },
  },
  outlinedInput: {
    color: 'inherit',
    '& input:-webkit-autofill, & input:-webkit-autofill:hover, & input:-webkit-autofill:focus': {
      '-webkit-text-fill-color': theme.default.color,
      '-webkit-box-shadow': '0 0 0px 1000px inherit inset',
      transition: 'background-color 5000s ease-in-out 0s',
    },
    '& Mui-focused': {
      borderWidth: 1,
      backgroundColor: '#393e46',
    },
  },
  inputLabel: {
    color: 'inherit',
  },
}));

const Body = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState('');
  const [isValid, setIsValid] = React.useState(true);
  const [results, setResults] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const handleChange = (event) => {
    setValue(event.target.value);
    setIsValid(true);
  };

  const handleRemoveValue = () => {
    setValue('');
    setResults([]);
    setIsValid(true);
  };

  const handleMouseDown = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async () => {
    setLoading(true);
    await axios
      .post(`/api/getData?youtubeId=${value}`)
      .then((res) => {
        setResults(res.data);
        setTimeout(() => {
          setIsValid(true);
          setLoading(false);
        }, 500);
      })
      .catch(() => {
        setTimeout(() => {
          setIsValid(false);
          setLoading(false);
        }, 500);
      });
  };

  return (
    <>
      <WrapperInput>
        <Container align="center">
          <Typography variant="h5" className={clsx(classes.subTitle)}>
            Example youtube playlist id: PLxQ30nUCB0uNCCKBD_JW1udM7iYH27cu2
          </Typography>
          <FormControl
            className={clsx(classes.formControl, !isValid && classes.notValid)}
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
              onKeyPress={(event) => event.key === 'Enter' && handleSubmit()}
              className={clsx(classes.outlinedInput)}
              id="input-time"
              type="text"
              error={!isValid}
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
                        <GetApp className={clsx(classes.icon)} />
                      </IconButton>
                    </InputAdornment>
                  </>
                )
              }
              labelWidth={183}
            />
            {!isValid && (
              <Typography variant="body1">
                This input: "{value}" is wrong
                <br />
                Please define correct your youtube playlist id!
              </Typography>
            )}
          </FormControl>
        </Container>
      </WrapperInput>
      {loading && <Spinner />}
      {results.length > 0 && <Results results={results} />}
    </>
  );
};

export default Body;
