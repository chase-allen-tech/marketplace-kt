import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getPlanInDetail } from '../../../actions/plan'

const AdminMealPlanView = ({ plan, getPlanInDetail, match, baseURL }) => {

  const planID = match.params.id

  React.useEffect(() => {
    getPlanInDetail(planID)
  }, [getPlanInDetail, planID])

  return (
    <div className='admin-meal-plan-view'>
      <div className='font-36 pt-3'>Meal Plan</div>
      <div className='row my-3'>
        <div className='col-md-12'>
          <div className='table-responsive bg-white keto-rounded-lg keto-shadow'>
            <table className='table'>
              <thead className='thead-light'>
                <th></th>
                <th className='text-center'>Breakfast</th>
                <th className='text-center'>Lunch</th>
                <th className='text-center'>Dinner</th>
                <th className='text-center'>Snacks</th>
              </thead>
              <tbody>
                {plan.days.map((item, index) =>
                  <tr key={index}>
                    <td className='width-60'>Day {index + 1}</td>
                    <td>
                      <Link to={`/recipe/${item.breakfast._id}`}>
                        <img alt='SETIMAGE' src={baseURL + item.breakfast.image} style={{ minWidth: '240px', minHeight: '180px' }} className='img-fluid' />
                      </Link>
                      <div className='font-18'>{item.breakfast.name}</div>
                      <div className='color-keto-primary font-18'>{item.breakfast.calories}</div>
                    </td>
                    <td>
                      <Link to={`/recipe/${item.lunch._id}`}>
                        <img alt='SETIMAGE' src={baseURL + item.lunch.image} style={{ minWidth: '240px', minHeight: '180px' }} className='img-fluid' />
                      </Link>
                      <div className='font-18'>{item.lunch.name}</div>
                      <div className='color-keto-primary font-18'>{item.lunch.calories}</div>
                    </td>
                    <td>
                      <Link to={`/recipe/${item.dinner._id}`}>
                        <img alt='SETIMAGE' src={baseURL + item.dinner.image} style={{ minWidth: '240px', minHeight: '180px' }} className='img-fluid' />
                      </Link>
                      <div className='font-18'>{item.dinner.name}</div>
                      <div className='color-keto-primary font-18'>{item.dinner.calories}</div>
                    </td>
                    <td>
                      <Link to={`/recipe/${item.snack._id}`}>
                        <img alt='SETIMAGE' src={baseURL + item.snack.image} style={{ minWidth: '240px', minHeight: '180px' }} className='img-fluid' />
                      </Link>
                      <div className='font-18'>{item.snack.name}</div>
                      <div className='color-keto-primary font-18'>{item.snack.calories}</div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  plan: state.plan.plan,
  baseURL: state.admin.baseURL
})

export default connect(mapStateToProps, { getPlanInDetail })(AdminMealPlanView)