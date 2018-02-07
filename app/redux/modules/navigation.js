import * as types from 'redux/actionTypes'

export function toggleMenu () {
  return {
    type: types.TOGGLE_MENU
  }
}

export default function listeners (state = { isExpanded: false }, action) {
  switch (action.type) {
    case types.TOGGLE_MENU :
      return {
        ...state,
        isExpanded: !state.isExpanded
      }
    default :
      return state
  }
}
