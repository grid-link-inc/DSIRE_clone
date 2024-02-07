// ==============================|| OVERRIDES - LINK ||============================== //

export default function Link(theme) {
  return {
    MuiLink: {
      defaultProps: {
        // color: theme.palette.info.main,
        color: '#5789ff',
        cursor: 'pointer',
        underline: 'hover'
      }
    }
  };
}
