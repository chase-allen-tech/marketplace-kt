import {
  PLANS_LOADED,
  PLAN_LOADED,
} from '../actions/types'

const initialState = {
  plans: [],
  plan: {
    name: '',
    days: []
  }
}

const planReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case PLANS_LOADED:
      return {
        ...state,
        plans: payload
      }
    case PLAN_LOADED:
      return {
        ...state,
        plan: payload
      }
    default:
      return state
  }
}

export default planReducer