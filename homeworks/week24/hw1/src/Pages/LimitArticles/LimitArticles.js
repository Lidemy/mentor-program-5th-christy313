import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getAllPosts, getLimitPosts } from '../../redux/reducers/postReducer';
import { useDispatch, useSelector } from 'react-redux';

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

const Pagination = styled.div`
  margin: 0 auto;
  text-align: center;
  color: #666;
`;

const Page = styled.div`
  display: inline-block;
  padding: 10px;
  background: #zzz;
  cursor: pointer;
`;

const CurrentPage = styled.div`
  display: inline-block;
  padding: 10px;
  background: #zzz;
`;

const PageInfo = styled.div`
  text-align: center;
  margin-top: 20px;
  font-size: 18px;
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

export default function LimitArticles() {
  const dispatch = useDispatch();
  const allPosts = useSelector((store) => store.posts.allPosts);
  const limitPosts = useSelector((store) => store.posts.limitPosts);

  const [page, setPage] = useState(1);
  const totalPages = Math.ceil((allPosts.length) / 5);

  useEffect(() => {
    dispatch(getLimitPosts(page));
    dispatch(getAllPosts());
  }, [page, dispatch]);

  const handlePrevPageClick = useCallback(() => {
    if (page > 1) setPage(page - 1);
  }, [page]);

  const handleNextPageClick = useCallback(() => {
    if (page < totalPages) setPage(page + 1);
  }, [page, totalPages]);

  return (
    <Root>
      {limitPosts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
      <Pagination>
        {!(page === 1) && (
          <Page onClick={handlePrevPageClick}>Prev</Page>
        )}
        <CurrentPage>{page}</CurrentPage>
        {!(page === totalPages) && (
          <Page onClick={handleNextPageClick}>Next</Page>
        )}
      </Pagination>
      <PageInfo>
        {page} / {totalPages}
      </PageInfo>
    </Root>
  );
}
