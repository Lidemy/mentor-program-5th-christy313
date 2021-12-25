import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getAllArticles, getLimitArticles } from "../../WebAPI";

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
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    getLimitArticles(currentPage).then((posts) => {
      setPosts(posts);
    });

    getAllArticles().then((data) => {
      setTotalPages((totalPages) => Math.ceil((data.length - 1) / 5));
    });
  }, [currentPage, totalPages]);

  const handlePrevPageClick = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage((currentPage) => currentPage - 1);
    }
  }, [currentPage]);

  const handleNextPageClick = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }, [currentPage, totalPages]);

  return (
    <Root>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
      <Pagination>
        {!(currentPage === 1) && (
          <Page onClick={handlePrevPageClick}>Prev</Page>
        )}
        <CurrentPage>{currentPage}</CurrentPage>
        {!(currentPage === totalPages) && (
          <Page onClick={handleNextPageClick}>Next</Page>
        )}
      </Pagination>
      <PageInfo>
        {currentPage} / {totalPages}
      </PageInfo>
    </Root>
  );
}
