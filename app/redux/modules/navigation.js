const TOGGLE_MENU = 'TOGGLE_MENU'

export function toggleMenu () {
  return {
    type: TOGGLE_MENU
  }
}

export default function listeners (state = { isExpanded: false }, action) {
  switch (action.type) {
    case TOGGLE_MENU :
      return {
        ...state,
        isExpanded: !state.isExpanded
      }
    default :
      return state
  }
}
