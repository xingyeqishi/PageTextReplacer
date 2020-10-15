import * as ActionTypes from '../constants/ActionTypes';

const initialState = {
  replace: [],
  match: []
};

const actionsMap = {
  [ActionTypes.ADD_TASK](state, action) {
    console.log(action.data);
    return {
        replace: action.data.replace.split(','),
        match: action.data.match.split(','),
        interval: action.data.interval < 300 ? 300: action.data.interval
    };
  },
  [ActionTypes.DELETE_TASK](state, action) {
    return initialState;
  }
};

export default function tasks(state = initialState, action) {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
}
