import {
  RECIPES_LOADED,
  RECIPE_LOADED,
} from '../actions/types'

const initialState = {
  recipes: [],
  recipe: {}
}

const recipeReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case RECIPES_LOADED:
      return {
        ...state,
        recipes: payload
      }
    case RECIPE_LOADED:
      return {
        ...state,
        recipe: payload
      }
    default:
      return state
  }
}

export default recipeReducer