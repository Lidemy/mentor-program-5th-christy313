import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { deleteTodo, checkTodo } from '../redux/actions';
import PropTypes from 'prop-types';

const TodoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  text-align: center;
  margin: 5px auto;
  padding: 8px;
  width: 100%;
  max-width: 400px;
  border: 1px solid #ccc;
  border-radius: 3px;
`;

const TodoContent = styled.div`
  width: 100%;
  max-width: 240px;
  word-wrap: break-word;
  line-height: 26px;
  text-align: left;

  ${(props) =>
    props.$isDone &&
    `
    text-decoration: line-through;
  `}
`;

const DeleteButton = styled.button`
  margin-left: 10px;
  font-size: 12px;
  padding: 5px;
  height: 28px;
  width: 60px;
`;

const CheckButton = styled.button`
  margin-left: 10px;
  font-size: 12px;
  padding: 5px;
  height: 28px;
  width: 60px;
`;

export default function TodoItem({ todo }) {
  const dispatch = useDispatch();

  const handleDeleteClick = () => {
    dispatch(deleteTodo(todo.id));
  };

  const handleCheckClick = () => {
    dispatch(checkTodo(todo.id));
  };

  return (
    <TodoContainer key={todo.id}>
      <TodoContent $isDone={todo.isDone}>{todo.content}</TodoContent>
      <DeleteButton onClick={handleDeleteClick}>delete</DeleteButton>
      <CheckButton onClick={handleCheckClick}>{todo.isDone ? 'Undone' : 'Done'}</CheckButton>
    </TodoContainer>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.object
};
