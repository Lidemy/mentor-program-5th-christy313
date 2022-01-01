import styled from 'styled-components';
import { useSelector } from 'react-redux';

import TodoItem from './components/TodoItem';
import TodoInput from './components/TodoInput';
import TodoFilter from './components/TodoFilter';
import TodoCleanDone from './components/TodoCleanDone';

import { selectTodos, selectFilters } from './redux/selectors';

const TodoWrapper = styled.div`
  margin: 30px auto;
  text-align: center;
  padding: 30px;
  border: 1px solid #ccc;
  border-radius: 3px;
  max-width: 560px;
  width: 100%;
`;

const TodoList = styled.div`
  text-align: center;
  margin: 0 auto;
`;

export default function App() {
  const todos = useSelector(selectTodos);
  const filters = useSelector(selectFilters);

  return (
    <TodoWrapper>
      <TodoInput />
      <TodoFilter />
      <TodoList>
        {todos
          .filter((todo) => {
            if (filters === 'all') return todo;
            return filters === 'done' ? todo.isDone : !todo.isDone;
          })
          .map((todo) => (
            <TodoItem todo={todo} key={todo.id} />
          ))}
      </TodoList>
      <TodoCleanDone />
    </TodoWrapper>
  );
}
