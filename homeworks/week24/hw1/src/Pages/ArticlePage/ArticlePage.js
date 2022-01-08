import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { getPost, deletePost } from '../../redux/reducers/postReducer';
import { useDispatch, useSelector } from 'react-redux';

const ArticleWrapper = styled.div`
  padding: 20px;
  width: 60%;
  margin: 0 auto;
`;

const ArticleTitle = styled.div`
  font-size: 28px;
  font-weight: bold;
  padding: 20px;
`;

const ArticleContent = styled.div`
  padding: 18px;
  line-height: 32px;
  text-align: justify;
`;

const ButtonWrapper = styled.div`
  display: flex;
`;

const Button = styled.button`
  margin-left: 20px;
  padding: 5px;
  width: 60px;
`;

function Article({ article, handleDeleteClick, handleEdit }) {
  const user = useSelector((store) => store.users.user);
  return (
    <ArticleWrapper>
      {(article && article.userId) === (user && user.id) && (
        <ButtonWrapper>
          <Button onClick={handleDeleteClick}>Delete</Button>
          <Button onClick={handleEdit}>Edit</Button>
        </ButtonWrapper>
      )}
      <ArticleTitle>{article.title}</ArticleTitle>
      <ArticleContent>{article.body}</ArticleContent>
    </ArticleWrapper>
  );
}

export default function ArticlePage() {
  let { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const article = useSelector((store) => store.posts.post);

  useEffect(() => {
    dispatch(getPost(id));
  }, [id, dispatch]);
  
  const handleDeleteArticle = () => {
    dispatch(deletePost(id)).then(() => navigate('/'));
  }

  const handleEditArticle = () => {
    navigate('/edit/' + id);
  }

  return <Article
    article={article}
    handleDeleteClick={handleDeleteArticle}
    handleEdit={handleEditArticle}
  />;
}
