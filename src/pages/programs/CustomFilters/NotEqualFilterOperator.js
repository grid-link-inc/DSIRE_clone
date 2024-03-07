import FilterTextInput from './FilterTextInput';

export const notEqualOperator = {
  label: 'is not',
  value: 'notEqual',
  getApplyFilterFn: (filterItem) => {
    if (!filterItem.field || !filterItem.value || !filterItem.operator || filterItem.value.length === 0 || filterItem.value[0] === '') {
      return null;
    }

    return (params) => {
      return params.value !== filterItem.value[0];
    };
  },
  InputComponent: FilterTextInput
};
