import { useEffect } from 'react';
import styled from 'styled-components';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { getAuthToken } from '../../utils';
import { getUser } from '../../redux/reducers/userReducer';
import { useDispatch, useSelector } from 'react-redux';

import NavBar from '../NavBar';
import HomePage from '../../Pages/HomePage';
import LoginPage from '../../Pages/LoginPage';
import ArticlePage from '../../Pages/ArticlePage';
import LimitArticles from '../../Pages/LimitArticles';
import NewArticle from '../../Pages/NewArticle';
import AboutPage from '../../Pages/AboutPage';
import SignUpPage from '../../Pages/SignUpPage';
import EditPage from '../../Pages/EditPage';

const Root = styled.div`
  padding-top: 64px;
`;

export default function App() {
  const user = useSelector(store => store.users.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (getAuthToken()) {
      dispatch(getUser());
    }
  }, [dispatch]);

  return (
    <Root>
      <Router>
        <NavBar />
        <Routes>
          <Route exact path='/' element={<HomePage />} />
          <Route path='/posts/:id' element={<ArticlePage />} />
          <Route path='/articles' element={<LimitArticles />} />
          {user && <Route path='/new-post' element={<NewArticle />} />}
          {user && <Route path='/edit/:id' element={<EditPage />} />}
          <Route path='/signup' element={<SignUpPage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/login' element={<LoginPage />} />
        </Routes>
      </Router>
    </Root>
  );
}
