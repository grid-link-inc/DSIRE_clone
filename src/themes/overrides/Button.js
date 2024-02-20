// ==============================|| OVERRIDES - BUTTON ||============================== //

export default function Button(theme) {
  const disabledStyle = {
    '&.Mui-disabled': {
      backgroundColor: theme.palette.grey[200]
    }
  };

  const defaultStyle = {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.text.primary,
    '&:hover': {
      backgroundColor: theme.palette.primary.main
    }
  };

  return {
    MuiButton: {
      defaultProps: {
        disableElevation: true
      },
      styleOverrides: {
        root: {
          fontWeight: 400
          // color: theme.palette.primary.dark // TODO figure out why Button text color is defaulting to primary.main and not text.primary
          // color: 'red' // TODO figure out why Button text color is defaulting to primary.main and not text.primary
        },
        contained: {
          ...disabledStyle
        },
        outlined: {
          ...defaultStyle
        }
      }
    }
  };
}
