import * as types from 'redux/actionTypes'

export function addListener (listenerId) {
  return {
    type: types.ADD_LISTENER,
    listenerId
  }
}

export default function listeners (state = {}, action) {
  switch (action.type) {
    case types.ADD_LISTENER :
      return {
        ...state,
        [action.listenerId]: true
      }
    default :
      return state
  }
}
