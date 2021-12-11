import styled from "styled-components";
import { memo } from "react";

const Todo = styled.div`
  border: 1px solid #ccc;
  & + & {
    margin-top: 10px;
  }
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 1px 1px 3px #ccc;
`;

const TodoContent = styled.div`
  ${(props) =>
    props.$isDone &&
    `
    text-decoration: line-through;
  `}
`;

const DeleteButton = styled.button`
  font-family: "ubuntu";
  margin-right: 10px;
  width: 80px;
  background: #c8553d;
  color: white;
  border-radius: 3px;
  border: none;
  box-shadow: 1px 1px 3px #666;
  padding: 5px;
`;

const CheckButton = styled.button`
  font-family: "ubuntu";
  width: 80px;
  background: #73a6ad;
  color: white;
  border-radius: 3px;
  border: none;
  box-shadow: 1px 1px 3px #666;
  padding: 5px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

function TodoItem({ todo, handleDeleteTodo, handleTodoIsDone }) {
  const handleDeleteClick = () => {
    handleDeleteTodo(todo.id);
  };

  const handleIsDoneClick = () => {
    handleTodoIsDone(todo.id);
  };

  return (
    <Todo data-todo-id={todo.id}>
      <TodoContent $isDone={todo.isDone}>{todo.content}</TodoContent>
      <ButtonWrapper>
        <DeleteButton onClick={handleDeleteClick}>Delete</DeleteButton>
        <CheckButton onClick={handleIsDoneClick}>
          {todo.isDone ? "Undone" : "Done"}
        </CheckButton>
      </ButtonWrapper>
    </Todo>
  );
}

export default memo(TodoItem);
