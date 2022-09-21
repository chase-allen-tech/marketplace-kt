import React from 'react'
import { connect } from 'react-redux'
import { getRecipe } from '../../../actions/recipe'
import Vimeo from '@u-wave/react-vimeo'

const AdminRecipeView = ({ recipe, getRecipe, match, baseURL }) => {
  const recipeID = match.params.id

  React.useEffect(() => {
    getRecipe(recipeID)
  }, [getRecipe, recipeID])

  return (
    <div className='client-recipe'>
      <div className='font-36 pt-3'>{recipe.name}</div>
      <div className='row mx-1 px-2 my-3 bg-white keto-rounded-lg keto-shadow'>
        <div className='col-lg-4 p-3 border-right border-bottom'>
          <img alt='SETIMAGE' src={baseURL + recipe.image} className='img-fluid rounded-lg' />
        </div>
        <div className='col-lg-8 py-3 border-bottom'>
          <div className='font-24 color-keto-primary my-4'>{recipe.category}</div>
          <div>
            <div className='d-inline-block font-18 width-150'>
              <div className='color-keto-primary'>Calories</div>
              <div>{recipe.calories}</div>
            </div>
            <div className='d-inline-block font-18 width-150'>
              <div className='color-keto-primary'>Fats</div>
              <div>{recipe.fats}</div>
            </div>
            <div className='d-inline-block font-18 width-150'>
              <div className='color-keto-primary'>Servings</div>
              <div>{recipe.servings}</div>
            </div>
            <div className='d-inline-block font-18 width-150'>
              <div className='color-keto-primary'>Sugar</div>
              <div>{recipe.sugar}</div>
            </div>
            <div className='d-inline-block font-18 width-150'>
              <div className='color-keto-primary'>Protein</div>
              <div>{recipe.protein}</div>
            </div>
            <div className='d-inline-block font-18 width-150'>
              <div className='color-keto-primary'>Type</div>
              <div>{recipe.type}</div>
            </div>
            <div className='d-inline-block font-18 width-150'>
              <div className='color-keto-primary'>Time</div>
              <div>{recipe.preparationTime}</div>
            </div>
            <div className='d-inline-block font-18 width-150'>
              <div className='color-keto-primary'>Net Carbs</div>
              <div>{recipe.netCarbs}</div>
            </div>
          </div>
          <div>
            <div className='color-keto-primary font-18'>Description</div>
            <div className='text-justify font-18'>{recipe.description}</div>
          </div>
        </div>
        <div className='col-lg-4 p-3 border-right table-responsive border-bottom'>
          <div className='font-24 color-keto-primary'>Ingredients</div>
          <table className='table table-borderless'>
            <tbody>
              {recipe.ingredients ? recipe.ingredients.map((item, index) =>
                <tr key={index} className='font-18'>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>{item.type}</td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
        <div className='col-lg-8 p-3 table-responsive border-bottom'>
          <div className='font-24 color-keto-primary'>Instructions</div>
          <table className='table table-borderless'>
            <tbody>
              {recipe.instructions ? recipe.instructions.map((item, index) =>
                <tr key={index} className='font-18'>
                  <td className='width-90'>Step {index + 1}: </td>
                  <td>{item.content}</td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>

        <div className='col-md-2'></div>
        {recipe.video ?
          <div className='col-md-8 p-3'>
            <div className='font-24 color-keto-primary text-center mb-3'>Video</div>

            <Vimeo
              video={recipe.video}
              responsive={true}
            />
          </div> : null
        }
        <div className='col-md-2'></div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  recipe: state.recipe.recipe,
  baseURL: state.admin.baseURL
})

export default connect(mapStateToProps, { getRecipe })(AdminRecipeView)