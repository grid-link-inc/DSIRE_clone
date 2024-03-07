import { Box, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

export default function FilterTextInput(props) {
  const { item, applyValue, focusElementRef = null } = props;
  const [filterValueState, setFilterValueState] = React.useState(item.value ?? '');

  React.useEffect(() => {
    const itemValue = item.value ?? [''];
    setFilterValueState(itemValue);
  }, [item.value]);

  const updateFilterValue = (newVal) => {
    setFilterValueState([newVal]);
    applyValue({ ...item, value: [newVal] });
  };

  return (
    <Box
      sx={{
        display: 'inline-flex',
        flexDirection: 'row',
        alignItems: 'end'
      }}
    >
      <TextField
        name="filter-input"
        placeholder="Filter value"
        label="Value"
        variant="standard"
        value={filterValueState[0]}
        onChange={(event) => updateFilterValue(event.target.value)}
        type="string"
        inputRef={focusElementRef}
        sx={{ mr: 2 }}
      />
    </Box>
  );
}

FilterTextInput.propTypes = {
  item: PropTypes.shape({
    value: PropTypes.array
  }).isRequired,
  applyValue: PropTypes.func.isRequired,
  focusElementRef: PropTypes.any
};
