import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { newArticle } from "../../WebAPI";

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
  const [title, setTitle] = useState("");
  const [articleContent, setArticleContent] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleNewArticle = useCallback(() => {
    setErrorMessage(null);
    if (!title || !articleContent) {
      const errorMessage = "Please input missing field";
      setErrorMessage(errorMessage);
    } else {
      newArticle(title, articleContent).then((res) => {
        navigate("/");
      });
    }
  }, [title, articleContent]);

  return (
    <ArticleWrapper onSubmit={handleNewArticle}>
      Title:
      <ArticleTitle
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        type="text"
      />
      <ArticleTextArea
        value={articleContent}
        onChange={(e) => setArticleContent(e.target.value)}
        type="text"
      />
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      <ArticleSubmit>New Post</ArticleSubmit>
    </ArticleWrapper>
  );
}
