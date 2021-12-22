import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { getArticle } from "../../WebAPI";
import { useParams } from "react-router-dom";

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

function Article({ article }) {
  return (
    <ArticleWrapper>
      <ArticleTitle>{article.title}</ArticleTitle>
      <ArticleContent>{article.body}</ArticleContent>
    </ArticleWrapper>
  );
}

export default function ArticlePage() {
  let { id } = useParams();
  const [article, setArticle] = useState([]);

  useEffect(() => {
    getArticle(id).then((article) => setArticle(article));
  }, [id, article]);

  return <Article article={article} />;
}
