// ==============================|| OVERRIDES - BUTTON ||============================== //

export default function Button(theme) {
  const disabledStyle = {
    '&.Mui-disabled': {
      backgroundColor: theme.palette.grey[200]
    }
  };

  return {
    MuiButton: {
      defaultProps: {
        disableElevation: true
      },
      styleOverrides: {
        root: {
          fontWeight: 400,
          color: theme.palette.primary.dark // TODO figure out why Button text color is defaulting to primary.main and not text.primary
        },
        contained: {
          ...disabledStyle
        },
        outlined: {
          ...disabledStyle
        }
      }
    }
  };
}
