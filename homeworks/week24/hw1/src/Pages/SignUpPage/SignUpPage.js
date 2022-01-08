import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signUpBlog } from '../../redux/reducers/userReducer';

const SignUp = styled.form`
  border: 1px solid rgba(0, 0, 0, 0.8);
  border-radius: 5px;
  text-align: center;
  margin: 100px auto;
  width: 25%;
  padding: 50px;
  color: #666;
  font-size: 24px;
`;

const SignUpTitle = styled.div`
  padding: 5px;
  margin-bottom: 10px;
  font-size: 30px;
`;

const InputWrapper = styled.div`
  padding: 10px;
  & + & {
    margin-top: 10px;
  }
`;

const Username = styled.input`
  padding: 4px;
`;

const Nickname = styled.input`
  padding: 4px;
`;

const Password = styled.input`
  padding: 4px;
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

export default function SignUpPage() {
  const [nickname, setNickname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const errorMessage = useSelector((store) => store.users.errorMessage);

  const handleSignUp = (e) => {
    e.preventDefault();
    dispatch(signUpBlog(navigate, nickname, username, password))
  };

  return (
    <SignUp onSubmit={handleSignUp}>
      <SignUpTitle>SIGN UP</SignUpTitle>
      <InputWrapper>
        Nickname:&nbsp;
        <Nickname
          value={nickname}
          type='text'
          onChange={(e) => setNickname(e.target.value)}
        />
      </InputWrapper>
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
      <Button>Sign Up</Button>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </SignUp>
  );
}
