import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { getAllArticles } from "../../WebAPI";
import { Link } from "react-router-dom";

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
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getAllArticles().then((posts) => {
      setPosts(posts);
    });
  }, []);

  return (
    <Root>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </Root>
  );
}
