import React from 'react'
import { connect } from 'react-redux'
import { getRecipes } from '../../../actions/recipe'
import { useHistory } from 'react-router-dom'

const ClientRecipes = ({ recipes, getRecipes, baseURL }) => {
  const history = useHistory()

  React.useEffect(() => {
    getRecipes()
  }, [getRecipes])

  const [pageRecipes, setPageRecipes] = React.useState([])
  const [pageNumber, setPageNumber] = React.useState(1)
  const [maxPageNumber, setMaxPageNumber] = React.useState(1)
  const [category, setCategory] = React.useState('')
  const [searchKey, setSearchKey] = React.useState('')

  React.useEffect(() => {
    setPageRecipes(recipes.sort((element1, element2) => { return new Date(element1.date) - new Date(element2.date) }).slice((pageNumber - 1) * 5, pageNumber * 5))
    setMaxPageNumber(Math.ceil(recipes.length / 10))
  }, [recipes, pageNumber])

  React.useEffect(() => {
    setPageRecipes(recipes.filter(element => element.category.includes(category)).filter(element => element.name.toLowerCase().includes(searchKey.toLowerCase())))
  }, [category, searchKey, recipes])

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
    <div className='client-recipes'>
      <div className='row'>
        <div className='col-lg-6'>
          <div className='d-flex align-items-center pt-3'>
            <div className='font-36 mr-2'>Recipes</div>
          </div>
        </div>
        <div className='col-lg-6'>
          <div className='text-right pt-4'>
            <select
              type='text'
              className='search-filter'
              value={category}
              onChange={e => setCategory(e.target.value)}
            >
              <option value=''>All</option>
              <option value='Breakfast'>Breakfast</option>
              <option value='Lunch'>Lunch</option>
              <option value='Dinner'>Dinner</option>
              <option value='Snacks'>Snacks</option>
            </select>
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
          {recipes.length === 0 ? <div className='text-center my-5 py-5'>There are no Recipes yet.</div>
            :
            <div className='table-responsive bg-white keto-rounded-lg keto-shadow'>
              <table className='table'>
                <thead className='thead-light'>
                  <tr>
                    <th>No</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Calories</th>
                    <th>Proteins</th>
                    <th>Fats</th>
                    <th>Sugar</th>
                  </tr>
                </thead>
                <tbody>
                  {pageRecipes.map((item, index) =>
                    <tr key={index} className='cursor-pointer' onClick={() => history.push(`/recipe/${item._id}`)}>
                      <td>{index + 1}</td>
                      <td><img alt='SETIMAGE' src={baseURL + item.image} width="80px" height="60px" /></td>
                      <td>{item.name}</td>
                      <td>{item.category}</td>
                      <td>{item.calories}</td>
                      <td>{item.protein}</td>
                      <td>{item.fats}</td>
                      <td>{item.sugar}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          }
          {recipes.length <= 10 ? null
            :
            <>
              <div className='text-center pt-3'>
                {(pageNumber - 1) * 5 + 1} - {(pageNumber - 1) * 5 + pageRecipes.length} of {recipes.length}
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
  recipes: state.recipe.recipes,
  baseURL: state.admin.baseURL
})

export default connect(mapStateToProps, { getRecipes })(ClientRecipes)