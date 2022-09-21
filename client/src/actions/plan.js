import api from '../utils/api'
import {
  PLANS_LOADED,
  PLAN_LOADED,
} from './types'

export const createPlan = (formData, history) => async dispatch => {
  const res = await api.post('/plan/createPlan', formData)

  if (res.data.success) {
    dispatch(getPlans())
    history.push('/plans')
  }
}

export const getPlans = () => async dispatch => {
  const res = await api.get('/plan/getPlans')

  if (res.data.success) {
    dispatch({
      type: PLANS_LOADED,
      payload: res.data.plans
    })
  }
}

export const getPlan = planID => async dispatch => {
  const res = await api.get(`/plan/getPlan/${planID}`)

  if (res.data.success) {
    dispatch({
      type: PLAN_LOADED,
      payload: res.data.plan
    })
  }
}

export const getPlanInDetail = planID => async dispatch => {
  const res = await api.get(`/plan/getPlanInDetail/${planID}`)

  if (res.data.success) {
    dispatch({
      type: PLAN_LOADED,
      payload: res.data.plan
    })
  }
}

export const updatePlan = (planID, formData, history) => async dispatch => {
  const res = await api.post(`/plan/updatePlan/${planID}`, formData)

  if (res.data.success) {
    dispatch(getPlans())
    history.push('/plans')
  }
}

export const deletePlan = planID => async dispatch => {
  const res = await api.delete(`/plan/deletePlan/${planID}`)

  if (res.data.success) {
    dispatch(getPlans())
  }
}