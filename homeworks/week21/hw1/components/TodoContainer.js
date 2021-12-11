import React, { useState, useRef, useCallback } from "react";
import TodoItem from "./TodoItem";
import styled from "styled-components";

const TodoWrapper = styled.div`
  font-family: "ubuntu";
  margin: 30px auto;
  width: 480px;
  border: 3px solid #f5f5f5;
  border-radius: 5px;
  padding: 30px;
  text-align: center;
  box-shadow: 3px 3px 5px #ccc;
`;

const Title = styled.h1`
  color: #28262c;
  font-size: 48px;
`;

const CreateTodo = styled.div`
  margin: 20px auto;
`;

const TodoInput = styled.input`
  margin-right: 10px;
  width: 300px;
  height: 24px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 1px 1px 3px #ccc;
`;

const AddButton = styled.button`
  font-family: "ubuntu";
  width: 80px;
  background: black;
  color: white;
  border-radius: 3px;
  box-shadow: 1px 1px 3px #666;
  border: none;
  padding: 5px;
`;

const SelectTodo = styled.div``;

const AllButton = styled.button`
  font-family: "ubuntu";
  width: 80px;
  background: #39393a;
  color: white;
  border-radius: 3px;
  box-shadow: 1px 1px 3px #666;
  border: none;
  padding: 5px;
`;

const ActiveButton = styled.button`
  font-family: "ubuntu";
  width: 80px;
  background: #ffe74c;
  color: #333;
  border-radius: 3px;
  box-shadow: 1px 1px 3px #666;
  border: none;
  padding: 5px;
  margin: 0 10px;
`;

const CompletedButton = styled.button`
  font-family: "ubuntu";
  width: 80px;
  background: #666;
  color: white;
  border-radius: 3px;
  box-shadow: 1px 1px 3px #666;
  border: none;
  padding: 5px;
`;

const TodoList = styled.div`
  margin-top: 10px;
`;

const ClearTodo = styled.button`
  font-family: "ubuntu";
  width: 120px;
  background: #c8553d;
  color: white;
  border-radius: 3px;
  box-shadow: 1px 1px 3px #666;
  border: none;
  padding: 5px;
  margin: 10px;
`;

export default function TodoContainer() {
  const id = useRef(1);
  const [todos, setTodos] = useState([]);
  const [value, setValue] = useState("");
  const [filter, setFilter] = useState("all");

  const handleAddTodo = useCallback(() => {
    if (!value) return alert("wanna type something?");
    setTodos((todo) => [{ id: id.current, content: value }, ...todos]);
    setValue("");
    id.current++;
  }, [todos, value]);

  const handleInputChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  const handleDeleteTodo = useCallback(
    (id) => {
      setTodos(todos.filter((todo) => todo.id !== id));
    },
    [todos]
  );

  const handleTodoIsDone = useCallback(
    (id) => {
      setTodos(
        todos.map((todo) => {
          if (todo.id !== id) return todo;
          return {
            ...todo,
            isDone: !todo.isDone,
          };
        })
      );
    },
    [todos]
  );

  const handleTodoClear = useCallback(() => {
    setTodos(todos.filter((todo) => todo.isDone !== true));
  }, [todos]);

  const filterAll = useCallback(() => {
    setFilter("all");
  }, []);

  const filterDone = useCallback(() => {
    setFilter("done");
  }, []);

  const filterUndone = useCallback(() => {
    setFilter("undone");
  }, []);

  return (
    <TodoWrapper>
      <Title>Todo List</Title>
      <CreateTodo>
        <TodoInput value={value} onChange={handleInputChange}></TodoInput>
        <AddButton onClick={handleAddTodo}>Add Todo</AddButton>
      </CreateTodo>
      <SelectTodo>
        <AllButton onClick={filterAll}>All</AllButton>
        <ActiveButton onClick={filterUndone}>Active</ActiveButton>
        <CompletedButton onClick={filterDone}>Completed</CompletedButton>
      </SelectTodo>
      <TodoList>
        {todos
          .filter((todo) => {
            if (filter === "all") return todo;
            return filter === "done" ? todo.isDone : !todo.isDone;
          })
          .map((todo) => (
            <TodoItem
              key={todo.id}
              handleDeleteTodo={handleDeleteTodo}
              handleTodoIsDone={handleTodoIsDone}
              todo={todo}
            />
          ))}
      </TodoList>
      <ClearTodo onClick={handleTodoClear}>Clear Completed</ClearTodo>
    </TodoWrapper>
  );
}
