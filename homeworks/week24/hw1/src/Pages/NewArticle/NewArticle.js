import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { newPost } from '../../redux/reducers/postReducer';

const ArticleWrapper = styled.form`
  margin: 0 auto;
  width: 800px;
  padding: 20px;
`;

const ArticleTitle = styled.input`
  width: 360px;
  margin: 20px;
`;

const ArticleTextArea = styled.textarea`
  width: 600px;
  height: 300px;
  border-radius: 3px;
`;

const ArticleSubmit = styled.button`
  color: #666;
  display: block;
  margin-top: 20px;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 20px;
  margin-bottom: 20px;
`;

export default function NewArticle() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();

  const handleNewArticle = () => {
    setErrorMessage(null);
    if (!title || !body) {
      const errorMessage = 'Please input missing field';
      setErrorMessage(errorMessage);
    } else {
      dispatch(newPost({
        title,
        body
      })).then((newPostResponse) => {
        if (newPostResponse && newPostResponse.id) {
          navigate('/posts/' + newPostResponse.id);
        }
      });
    };
  };
  
  return (
    <ArticleWrapper onSubmit={handleNewArticle}>
      Title:
      <ArticleTitle
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        type='text'
      />
      <ArticleTextArea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        type='text'
      />
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      <ArticleSubmit>New Post</ArticleSubmit>
    </ArticleWrapper>
  );
}
