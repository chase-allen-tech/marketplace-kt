import api from '../utils/api'
import {
  RECIPES_LOADED,
  RECIPE_LOADED,
} from './types'

export const createRecipe = (formData, history) => async dispatch => {
  const res = await api.post('/recipe/createRecipe', formData)

  if (res.data.success) {
    dispatch(getRecipes())
    history.push('/recipes')
  }
}

export const getRecipes = () => async dispatch => {
  const res = await api.get('/recipe/getRecipes')

  if (res.data.success) {
    dispatch({
      type: RECIPES_LOADED,
      payload: res.data.recipes
    })
  }
}

export const getRecipe = recipeID => async dispatch => {
  const res = await api.get(`/recipe/getRecipe/${recipeID}`)

  if (res.data.success) {
    dispatch({
      type: RECIPE_LOADED,
      payload: res.data.recipe
    })
  }
}

export const updateRecipe = (recipeID, formData, history) => async dispatch => {
  const res = await api.post(`/recipe/updateRecipe/${recipeID}`, formData)

  if (res.data.success) {
    dispatch(getRecipes())
    history.push('/recipes')
  }
}

export const deleteRecipe = recipeID => async dispatch => {
  const res = await api.delete(`/recipe/deleteRecipe/${recipeID}`)

  if (res.data.success) {
    dispatch(getRecipes())
  }
}