import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getPlans, deletePlan } from '../../../actions/plan'

const AdminMealPlans = ({ plans, getPlans, deletePlan }) => {

  React.useEffect(() => {
    getPlans()
  }, [getPlans])

  const [pagePlans, setPagePlans] = React.useState([])
  const [pageNumber, setPageNumber] = React.useState(1)
  const [maxPageNumber, setMaxPageNumber] = React.useState(1)
  const [searchKey, setSearchKey] = React.useState('')

  React.useEffect(() => {
    setPagePlans(plans.sort((element1, element2) => { return new Date(element1.date) - new Date(element2.date) }).slice((pageNumber - 1) * 5, pageNumber * 5))
    setMaxPageNumber(Math.ceil(plans.length / 10))
  }, [plans, pageNumber])

  React.useEffect(() => {
    setPagePlans(plans.filter(element => element.name.toLowerCase().includes(searchKey.toLowerCase())))
  }, [searchKey, plans])

  const nextPage = () => {
    if (pageNumber + 1 > maxPageNumber) {
      lastPage()
      return
    }
    setPageNumber(pageNumber + 1)
  }

  const prevPage = () => {
    if (pageNumber - 1 < 1) {
      firstPage()
      return
    }
    setPageNumber(pageNumber - 1)
  }

  const firstPage = () => {
    setPageNumber(1)
  }

  const lastPage = () => {
    setPageNumber(maxPageNumber)
  }

  return (
    <div className='admin-plans'>
      <div className='row'>
        <div className='col-lg-6'>
          <div className='d-flex align-items-center pt-3'>
            <div className='font-36 mr-2'>Meal Plan</div>
            <Link to='plan-create'><i className='fa fa-plus-circle font-24 cursor-pointer pt-2'></i></Link>
          </div>
        </div>
        <div className='col-lg-6'>
          <div className='text-right pt-4'>
            <input
              type='text'
              className='search-filter'
              placeholder='Search'
              value={searchKey}
              onChange={e => setSearchKey(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className='row my-3'>
        <div className='col-md-12'>
          {plans.length === 0 ? <div className='text-center my-5 py-5'>There are no Plans yet.</div>
            :
            <div className='table-responsive bg-white keto-rounded-lg keto-shadow'>
              <table className='table'>
                <thead className='thead-light'>
                  <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pagePlans.map((item, index) =>
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>
                        <Link
                          className='btn btn-sm border mx-1 width-40'
                          to={`plan/${item._id}`}
                        >
                          <i className="fa fa-eye font-18"></i>
                        </Link>
                        <Link
                          className='btn btn-sm border mx-1 width-40'
                          to={`plan-edit/${item._id}`}
                        >
                          <i className="fa fa-pencil font-18"></i>
                        </Link>
                        <button
                          className='btn btn-sm border mx-1 width-40'
                          onClick={() => {
                            if (window.confirm('Are you sure?')) deletePlan(item._id)
                          }}
                        >
                          <i className="fa fa-trash-o font-18"></i>
                        </button>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          }
          {plans.length <= 10 ? null
            :
            <>
              <div className='text-center pt-3'>
                {(pageNumber - 1) * 5 + 1} - {(pageNumber - 1) * 5 + pagePlans.length} of {plans.length}
              </div>
              <div className='text-center pt-1'>
                <i onClick={() => firstPage()} className="material-icons">first_page</i>
                <i onClick={() => prevPage()} className="material-icons">navigate_before</i>
                <i onClick={() => nextPage()} className="material-icons">navigate_next</i>
                <i onClick={() => lastPage()} className="material-icons">last_page</i>
              </div>
            </>
          }
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  plans: state.plan.plans,
})

export default connect(mapStateToProps, { getPlans, deletePlan })(AdminMealPlans)