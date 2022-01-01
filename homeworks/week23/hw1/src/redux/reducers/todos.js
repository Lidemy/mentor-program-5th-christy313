import {
  ADD_TODO,
  DELETE_TODO,
  CHECK_TODO,
  CLEAR_COMPLETED_TODO,
  FILTER_ALL,
  FILTER_DONE,
  FILTER_UNDONE
} from '../actionTypes';

let todoId = 4;

const initialState = {
  todos: [
    {
      id: 1,
      content: 'doing homeworks',
      isDone: false
    },
    {
      id: 2,
      content: 'cook',
      isDone: true
    },
    {
      id: 3,
      content: 'study W24',
      isDone: false
    }
  ],
  filters: 'all'
};

export default function todosReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO: {
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: todoId++,
            content: action.payload.content,
            isDone: false
          }
        ]
      };
    }

    case DELETE_TODO: {
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload.id)
      };
    }

    case CHECK_TODO: {
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id !== action.payload.id) return todo;
          return {
            ...todo,
            isDone: !todo.isDone
          };
        })
      };
    }

    case CLEAR_COMPLETED_TODO: {
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.isDone !== true)
      };
    }

    case FILTER_ALL: {
      return {
        ...state,
        filters: 'all'
      };
    }

    case FILTER_DONE: {
      return {
        ...state,
        filters: 'done'
      };
    }

    case FILTER_UNDONE: {
      return {
        ...state,
        filters: 'undone'
      };
    }

    default: {
      return state;
    }
  }
}
