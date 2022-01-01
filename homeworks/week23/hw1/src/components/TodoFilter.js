import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { filterAll, filterDone, filterUndone } from '../redux/actions';

const FilterTodoWrapper = styled.div`
  padding: 20px;
`;

const TodoAllButton = styled.button`
  margin-left: 10px;
  width: 80px;
  padding: 3px;
`;

const TodoActiveButton = styled.button`
  margin-left: 10px;
  width: 80px;
  padding: 3px;
`;

const TodoCompletedButton = styled.button`
  margin-left: 10px;
  width: 80px;
  padding: 3px;
`;

export default function TodoFilter() {
  const dispatch = useDispatch();

  const handleFilterAll = () => {
    dispatch(filterAll('all'));
  };

  const handleFilterUndone = () => {
    dispatch(filterUndone('undone'));
  };

  const handleFilterDone = () => {
    dispatch(filterDone('done'));
  };

  return (
    <FilterTodoWrapper>
      <TodoAllButton onClick={handleFilterAll}>All</TodoAllButton>
      <TodoActiveButton onClick={handleFilterUndone}>Active</TodoActiveButton>
      <TodoCompletedButton onClick={handleFilterDone}>Completed</TodoCompletedButton>
    </FilterTodoWrapper>
  );
}
