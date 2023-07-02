import PropTypes from 'prop-types';
import { FilterBlock, Input, Text } from './Filter.styled';
import { useDispatch, useSelector } from 'react-redux';
import { changeFilter, getFilter } from 'redux/contactsSlice.js';

const Filter = () => {
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const handleFilterChange = e => dispatch(changeFilter(e.target.value));

  return (
    <FilterBlock>
      <Text>Find contacts by name</Text>
      <Input
        type="text"
        name="filter"
        value={filter}
        onChange={handleFilterChange}
        placeholder="Name"
      />
    </FilterBlock>
  );
};

Filter.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default Filter;
