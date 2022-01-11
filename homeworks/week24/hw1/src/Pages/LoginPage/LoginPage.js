import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginBlog } from '../../redux/reducers/userReducer';
import { useDispatch, useSelector } from 'react-redux';

const Login = styled.form`
  border: 1px solid rgba(0, 0, 0, 0.8);
  border-radius: 5px;
  margin: 100px auto;
  text-align: center;
  width: 25%;
  padding: 50px;
  color: #666;
  font-size: 24px;
`;

const LoginTitle = styled.div`
  font-size: 30px;
  display: block;
`;

const InputWrapper = styled.div`
  padding: 10px;
  & + & {
    margin-top: 10px;
  }
`;

const Username = styled.input`
  padding: 4px;
  margin-top: 20px;
`;

const Password = styled.input`
  padding: 4px;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 8px;
  margin-top: 18px;
  border-radius: 3px;
  font-size: 16px;
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 30px;
`;

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errorMessage = useSelector((store) => store.users.errorMessage);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginBlog(navigate, username, password))
  };

  return (
    <Login onSubmit={handleSubmit}>
      <LoginTitle>LOGIN</LoginTitle>
      <InputWrapper>
        Username:&nbsp;
        <Username
          value={username}
          type='text'
          onChange={(e) => setUsername(e.target.value)}
        />
      </InputWrapper>
      <InputWrapper>
        Password:&nbsp;&nbsp;
        <Password
          value={password}
          type='password'
          onChange={(e) => setPassword(e.target.value)}
        />
      </InputWrapper>
      <Button>Login</Button>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Login>
  );
}
