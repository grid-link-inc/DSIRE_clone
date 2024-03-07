import FilterTextInput from './FilterTextInput';

export const doesNotContainOperator = {
  label: 'does not contain',
  value: 'doesNotContain',
  getApplyFilterFn: (filterItem) => {
    if (!filterItem.field || !filterItem.value || !filterItem.operator || filterItem.value.length === 0 || filterItem.value[0] === '') {
      return null;
    }

    return (params) => {
      return !params.value.includes(filterItem.value[0]);
    };
  },
  InputComponent: FilterTextInput
};
