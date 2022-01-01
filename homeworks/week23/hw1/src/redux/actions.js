import {
  ADD_TODO,
  DELETE_TODO,
  CHECK_TODO,
  CLEAR_COMPLETED_TODO,
  FILTER_ALL,
  FILTER_DONE,
  FILTER_UNDONE
} from './actionTypes';

export function addTodo(content) {
  return {
    type: ADD_TODO,
    payload: {
      content
    }
  };
}

export function deleteTodo(id) {
  return {
    type: DELETE_TODO,
    payload: {
      id
    }
  };
}

export function checkTodo(id) {
  return {
    type: CHECK_TODO,
    payload: {
      id
    }
  };
}

export function clearCompletedTodo(id) {
  return {
    type: CLEAR_COMPLETED_TODO,
    payload: {
      id
    }
  };
}

export function filterAll() {
  return {
    type: FILTER_ALL
  };
}

export function filterDone() {
  return {
    type: FILTER_DONE
  };
}

export function filterUndone() {
  return {
    type: FILTER_UNDONE
  };
}
