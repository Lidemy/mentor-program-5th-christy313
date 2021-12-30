import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { clearCompletedTodo } from '../redux/actions';

const ClearCompleted = styled.button`
  height: 28px;
  width: 160px;
  margin-top: 10px;
`;

export default function TodoCleanDone() {
  const dispatch = useDispatch();

  return (
    <ClearCompleted onClick={(todo) => dispatch(clearCompletedTodo(todo.isDone))}>
      Clear Completed
    </ClearCompleted>
  );
}
