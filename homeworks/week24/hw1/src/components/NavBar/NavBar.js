import styled from 'styled-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../redux/reducers/userReducer';
import { setAuthToken } from '../../utils';

const HeaderContainer = styled.div`
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  padding: 0px 32px;
  box-sizing: border-box;
  background-color: #333;
  color: #c5c5c5;
`;

const Logo = styled.div`
  font-size: 32px;
  font-weight: bold;
`;

const NavbarList = styled.div`
  display: flex;
  align-items: center;
  height: 64px;
`;

const Nav = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  box-sizing: border-box;
  width: 100px;
  cursor: pointer;
  text-decoration: none;
  color: #c5c5c5;

  ${(props) =>
    props.$active &&
    `
    background: rgba(0, 0, 0, 0.2);
  `}
`;

const LeftContainer = styled.div`
  display: flex;
  align-items: center;

  ${NavbarList} {
    margin-left: 64px;
  }
`;

export default function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.users.user);

  const handleLogout = () => {
    setAuthToken(null);
    dispatch(setUser(null));
    if (location.pathname !== '/') {
      navigate('/');
    }
  };

  return (
    <HeaderContainer>
      <LeftContainer>
        <Logo>My Blog</Logo>
        <NavbarList>
          <Nav to='/' $active={location.pathname === '/'}>
            Home
          </Nav>
          <Nav to='/articles' $active={location.pathname === '/articles'}>
            Articles
          </Nav>
          {user && (
            <Nav to='/new-post' $active={location.pathname === '/new-post'}>
              New Post
            </Nav>
          )}
          <Nav to='/about' $active={location.pathname === '/about'}>
            About
          </Nav>
        </NavbarList>
      </LeftContainer>
      <NavbarList>
        {!user && (
          <Nav to='/signup' $active={location.pathname === '/signup'}>
            Sign Up
          </Nav>
        )}
        {!user && (
          <Nav to='/login' $active={location.pathname === '/login'}>
            Login
          </Nav>
        )}
        {user && (
          <Nav onClick={handleLogout} to='/'>
            Logout
          </Nav>
        )}
      </NavbarList>
    </HeaderContainer>
  );
}
