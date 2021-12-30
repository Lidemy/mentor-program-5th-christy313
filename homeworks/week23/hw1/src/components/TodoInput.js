import styled from 'styled-components';
import { useState, useCallback } from 'react';
import { addTodo } from '../redux/actions';
import { useDispatch } from 'react-redux';

const Title = styled.div`
  color: #666;
  font-size: 30px;
  padding: 10px;
`;

const Input = styled.input`
  width: 300px;
  height: 24px;
`;

const AddButton = styled.button`
  font-size: 12px;
  margin-left: 10px;
  padding: 5px;
  width: 60px;
`;

export default function TodoInput() {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');

  const handleInputTodo = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  const handleKeyPress = (e) => {
    if (!value.trim()) return;
    if (e.key === 'Enter') {
      dispatch(addTodo(value));
      setValue('');
    }
  };

  const handleAddTodo = () => {
    if (!value.trim()) return;
    dispatch(addTodo(value));
    setValue('');
  };

  return (
    <>
      <Title>Todo List</Title>
      <>
        <Input value={value} onChange={handleInputTodo} onKeyPress={handleKeyPress} />
        <AddButton onClick={handleAddTodo}>Add</AddButton>
      </>
    </>
  );
}
