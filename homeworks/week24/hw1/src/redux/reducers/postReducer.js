import { createSlice } from '@reduxjs/toolkit';
import {
  getArticle,
  getLimitArticles,
  getAllArticles,
  newArticle,
  deleteArticle,
  editArticle,
} from '../../WebAPI';

export const postReducer = createSlice({
  name: 'posts',
  initialState: {
    isLoadingPost: false,
    isLoadingPosts: false,
    post: [],
    limitPosts: [],
    allPosts: [],
    newPostResponse: null,
  },
  reducers: {
    setIsLoadingPost: (state, action) => {
      state.isLoadingPost = action.payload;
    },

    setIsLoadingPosts: (state, action) => {
      state.isLoadingPosts = action.payload;
    },

    setPost: (state, action) => {
      state.post = action.payload;
    },

    setLimitPosts: (state, action) => {
      state.limitPosts = action.payload;
    },

    setAllPosts: (state, action) => {
      state.allPosts = action.payload;
    },

    setNewPostResponse: (state, action) => {
      state.newPostResponse = action.payload;
    },
  },
});

export const {
  setIsLoadingPost,
  setIsLoadingPosts,
  setPost,
  setLimitPosts,
  setAllPosts,
  setNewPostResponse
} = postReducer.actions;

export const getPost = (id) => (dispatch) => {
  dispatch(setIsLoadingPost(true));
  getArticle(id)
    .then((res) => {
      dispatch(setIsLoadingPost(false));
      dispatch(setPost(res));
    });
};

export const getLimitPosts = (page) => (dispatch) => {
  dispatch(setIsLoadingPosts(true));
  getLimitArticles(page).then((res) => {
    dispatch(setIsLoadingPosts(false));
    dispatch(setLimitPosts(res));
  });
};

export const getAllPosts = () => (dispatch) => {
  dispatch(setIsLoadingPosts(true));
  getAllArticles().then((res) => {
    dispatch(setAllPosts(res));
    dispatch(setIsLoadingPosts(false));
    return res;
  });
};

export const newPost = (data) => (dispatch) => {
  return newArticle(data).then((res) => {
    dispatch(setNewPostResponse(res));
    return res;
  });
};

export const deletePost = (id) => () => {
  return deleteArticle(id).then((res) => {
    return res;
  });
};

export const editPost = (id, title, body) => (dispatch) => {
  dispatch(setIsLoadingPost(true));
  editArticle(id, title, body).then(res => {
    dispatch(setPost(res));
    dispatch(setIsLoadingPost(false));
  });
};

export default postReducer.reducer;
