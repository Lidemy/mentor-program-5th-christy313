import { useState, useEffect } from "react";
import styled from "styled-components";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { AuthContext } from "../../contexts";
import { getMe } from "../../WebAPI";
import { getAuthToken } from "../../utils";

import NavBar from "../NavBar";
import HomePage from "../../Pages/HomePage";
import LoginPage from "../../Pages/LoginPage";
import ArticlePage from "../../Pages/ArticlePage";
import LimitArticles from "../../Pages/LimitArticles";
import NewArticle from "../../Pages/NewArticle";
import AboutPage from "../../Pages/AboutPage";
import SignUpPage from "../../Pages/SignUpPage";

const Root = styled.div`
  padding-top: 64px;
`;

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (getAuthToken()) {
      getMe().then((response) => {
        if (response.ok) {
          setUser(response.data);
        }
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Root>
        <Router>
          <NavBar />
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/posts/:id" element={<ArticlePage />} />
            <Route path="/articles" element={<LimitArticles />} />
            <Route path="/new-post" element={<NewArticle />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </Router>
      </Root>
    </AuthContext.Provider>
  );
}
