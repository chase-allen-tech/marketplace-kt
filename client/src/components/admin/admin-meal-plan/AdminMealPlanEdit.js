import React from 'react'
import { connect } from 'react-redux'
import Spinner from '../../layout/Spinner'
import { getRecipes } from '../../../actions/recipe'
import { getPlan, updatePlan } from '../../../actions/plan'
import { useHistory } from 'react-router-dom'

const AdminMealPlanEdit = ({ match, getRecipes, recipes, getPlan, updatePlan, plan }) => {

  const history = useHistory()
  const planID = match.params.id

  React.useEffect(() => {
    getPlan(planID)
    getRecipes()
  }, [getRecipes, getPlan, planID])

  const [days, setDays] = React.useState([])

  React.useEffect(() => {
    setName(plan.name)
    if (plan.days.length > 0) {
      let _days = [...plan.days]
      setDays(_days)
    }
  }, [plan, plan.days])

  const [breakfastRecipes, setBreakfastRecipes] = React.useState([])
  const [lunchRecipes, setLunchRecipes] = React.useState([])
  const [dinnerRecipes, setDinnerRecipes] = React.useState([])
  const [snackRecipes, setSnackRecipes] = React.useState([])

  React.useEffect(() => {
    if (recipes.length > 0) {
      const _breakfastRecipes = recipes.filter(element => element.category === 'Breakfast')
      const _lunchRecipes = recipes.filter(element => element.category === 'Lunch')
      const _dinnerRecipes = recipes.filter(element => element.category === 'Dinner')
      const _snackRecipes = recipes.filter(element => element.category === 'Snacks')
      setBreakfastRecipes(_breakfastRecipes)
      setLunchRecipes(_lunchRecipes)
      setDinnerRecipes(_dinnerRecipes)
      setSnackRecipes(_snackRecipes)
    }
  }, [recipes])

  const [isLoading, setIsLoading] = React.useState(false)
  const [name, setName] = React.useState('')

  const setDayRecipe = (dayIndex, key, value) => {
    let _days = [...days]
    _days[dayIndex][key] = value
    setDays(_days)
  }

  const onSubmit = e => {
    e.preventDefault()
    updatePlan(planID, {
      name, days
    }, history)
    setIsLoading(true)
  }

  return (
    <div className='admin-meal-plan-create'>
      <div className='font-36 pt-3'>Edit Meal Plan</div>
      <div className='row my-3'>
        <div className='col-md-12'>
          <div className='p-3 bg-white keto-rounded-lg mt-3 keto-shadow'>
            {isLoading
              ?
              <Spinner />
              :
              <form className='form' onSubmit={onSubmit}>
                <div className='row'>
                  <div className='col-md-12 form-group'>
                    <label>Name</label>
                    <input
                      type='text'
                      className='form-control'
                      value={name}
                      onChange={e => setName(e.target.value)}
                      required
                    />
                  </div>
                </div>
                {days.map((day, dayIndex) =>
                  <div key={dayIndex} className='row mb-3'>
                    <div className='col-md-12 font-18 font-bold'>Day {dayIndex + 1}</div>
                    <div className='col-md-6'>
                      <label>Breakfast</label>
                      <select
                        className='form-control'
                        value={day.breakfast}
                        onChange={e => setDayRecipe(dayIndex, 'breakfast', e.target.value)}
                        required
                      >
                        <option value=''></option>
                        {breakfastRecipes.map((item, index) =>
                          <option key={index} value={item._id}>{item.name}</option>
                        )}
                      </select>
                    </div>
                    <div className='col-md-6'>
                      <label>Lunch</label>
                      <select
                        className='form-control'
                        value={day.lunch}
                        onChange={e => setDayRecipe(dayIndex, 'lunch', e.target.value)}
                        required
                      >
                        <option value=''></option>
                        {lunchRecipes.map((item, index) =>
                          <option key={index} value={item._id}>{item.name}</option>
                        )}
                      </select>
                    </div>
                    <div className='col-md-6'>
                      <label>Dinner</label>
                      <select
                        className='form-control'
                        value={day.dinner}
                        onChange={e => setDayRecipe(dayIndex, 'dinner', e.target.value)}
                        required
                      >
                        <option value=''></option>
                        {dinnerRecipes.map((item, index) =>
                          <option key={index} value={item._id}>{item.name}</option>
                        )}
                      </select>
                    </div>
                    <div className='col-md-6'>
                      <label>Snack</label>
                      <select
                        className='form-control'
                        value={day.snack}
                        onChange={e => setDayRecipe(dayIndex, 'snack', e.target.value)}
                        required
                      >
                        <option value=''></option>
                        {snackRecipes.map((item, index) =>
                          <option key={index} value={item._id}>{item.name}</option>
                        )}
                      </select>
                    </div>
                  </div>
                )}
                <div className='col-md-12 d-flex justify-content-end'>
                  <button className='btn bg-keto-primary'>
                    Submit
                  </button>
                </div>
              </form>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  recipes: state.recipe.recipes,
  plan: state.plan.plan
})

export default connect(mapStateToProps, { getRecipes, getPlan, updatePlan })(AdminMealPlanEdit)