import * as types from '../constants/ActionTypes';

export function addTask(data) {
  return { type: types.ADD_TASK, data };
}

export function deleteTask() {
  return { type: types.DELETE_TASK };
}

export function editTodo(id, text) {
  return { type: types.EDIT_TODO, id, text };
}

export function completeTodo(id) {
  return { type: types.COMPLETE_TODO, id };
}

export function completeAll() {
  return { type: types.COMPLETE_ALL };
}

export function clearCompleted() {
  return { type: types.CLEAR_COMPLETED };
}
