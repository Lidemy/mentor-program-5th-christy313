import PropTypes from 'prop-types';
import styled from 'styled-components';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '../../redux/reducers/postReducer';

const Root = styled.div`
  width: 80%;
  margin: 30px auto;
`;

const PostContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 16px;
`;

const PostTitle = styled(Link)`
  font-size: 16px;
  color: #666;
  text-decoration: none;
  width: 80%;
`;

const PostDate = styled.div`
  color: #666;
`;

function Post({ post }) {
  return (
    <PostContainer>
      <PostTitle to={`/posts/${post.id}`}>{post.title}</PostTitle>
      <PostDate>{new Date(post.createdAt).toLocaleString()}</PostDate>
    </PostContainer>
  );
}

Post.propTypes = {
  post: PropTypes.object,
};

export default function HomePage() {
  const dispatch = useDispatch();
  const posts = useSelector((store) => store.posts.allPosts);

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  return (
    <Root>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </Root>
  );
}
