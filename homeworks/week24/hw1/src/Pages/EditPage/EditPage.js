import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { editPost } from '../../redux/reducers/postReducer';
import { useDispatch, useSelector } from 'react-redux';

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

export default function EditPage() {
  let { id } = useParams();
  const navigate = useNavigate();
  const article = useSelector((store) => store.posts.post);
  const dispatch = useDispatch();
  const [title, setTitle] = useState(article.title);
  const [body, setBody] = useState(article.body);
  const [errorMessage, setErrorMessage] = useState('');

  const handleEditArticle = () => {
    setErrorMessage(null);
    if (!title || !body) {
      const errorMessage = 'Please input missing field';
      setErrorMessage(errorMessage);
    } else {
      dispatch(editPost(id, title, body));
      navigate(`/posts/${id}`);
    }
  };

  return (
    <ArticleWrapper onSubmit={handleEditArticle}>
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
      <ArticleSubmit>Save</ArticleSubmit>
    </ArticleWrapper>
  );
}
