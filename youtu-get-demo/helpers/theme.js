import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

// Create a theme instance.
const theme = responsiveFontSizes({
  ...createMuiTheme(),
  default: {
    color: '#00adb5',
    background: '#eeeeee'
  },
  primary: {
    background: '#222831'
  },
  secondary: {
    background: '#393e46'
  },
  error: 'red'
});

export default theme;
