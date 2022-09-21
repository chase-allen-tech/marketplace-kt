import React from 'react'
import { connect } from 'react-redux'
import { getRecipe, updateRecipe } from '../../../actions/recipe'
import { useHistory } from 'react-router-dom'
import { setAlert } from '../../../actions/alert'
import Spinner from '../../layout/Spinner'

const AdminRecipeEdit = ({ recipe, getRecipe, updateRecipe, match, setAlert }) => {
  const recipeID = match.params.id
  const history = useHistory()

  React.useEffect(() => {
    getRecipe(recipeID)
  }, [recipeID, getRecipe])

  const [isLoading, setIsLoading] = React.useState(false)

  const [name, setName] = React.useState('')
  const [calories, setCalories] = React.useState('')
  const [fats, setFats] = React.useState('')
  const [servings, setServings] = React.useState('')
  const [sugar, setSugar] = React.useState('')
  const [protein, setProtein] = React.useState('')
  const [preparationTime, setPreparationTime] = React.useState(0)
  const [netCarbs, setNetCarbs] = React.useState('')
  const [video, setVideo] = React.useState('')
  const [image, setImage] = React.useState(null)
  const [category, setCategory] = React.useState('Breakfast')
  const [type, setType] = React.useState('')
  const [description, setDescription] = React.useState('')

  const [ingredients, setIngredients] = React.useState([])
  const [ingredientName, setIngredientName] = React.useState('')
  const [ingredientQuantity, setIngredientQuantity] = React.useState('')
  const [ingredientType, setIngredientType] = React.useState('')
  const [ingredientEdit, setIngredientEdit] = React.useState(false)
  const [ingredientIndex, setIngredientIndex] = React.useState(0)

  const [instructions, setInstructions] = React.useState([])
  const [instruction, setInstruction] = React.useState('')
  const [instructionEdit, setInstructionEdit] = React.useState(false)
  const [instructionIndex, setInstructionIndex] = React.useState(0)

  const saveIngredient = () => {
    const _ingredient = {
      name: ingredientName,
      quantity: ingredientQuantity,
      type: ingredientType
    }
    if (_ingredient.name === '' || _ingredient.quantity === '') {
      setAlert('Invalid Inputs', 'warning')
    } else {
      let _ingredients = [...ingredients]
      _ingredients.push(_ingredient)
      setIngredients(_ingredients)
      setIngredientName('')
      setIngredientQuantity('')
      setIngredientType('')
    }
  }

  const editIngredient = (item, index) => {
    setIngredientIndex(index)
    setIngredientName(item.name)
    setIngredientQuantity(item.quantity)
    setIngredientType(item.type)
    setIngredientEdit(true)
  }

  const updateIngredient = () => {
    const _ingredient = {
      name: ingredientName,
      quantity: ingredientQuantity,
      type: ingredientType
    }
    if (_ingredient.name === '' || _ingredient.quantity === '') {
      setAlert('Invalid Inputs', 'warning')
    } else {
      let _ingredients = [...ingredients]
      _ingredients.splice(ingredientIndex, 1, _ingredient)
      setIngredients(_ingredients)
      setIngredientName('')
      setIngredientQuantity('')
      setIngredientType('')
      setIngredientEdit(false)
      setIngredientIndex(0)
    }
  }

  const deleteIngredient = index => {
    if (window.confirm('Are you sure?')) {
      let _ingredients = [...ingredients]
      _ingredients.splice(index, 1)
      setIngredients(_ingredients)
    }
  }

  const saveInstruction = () => {
    if (instruction === '') {
      setAlert('Invalid Input', 'warning')
    } else {
      let _instructions = [...instructions]
      _instructions.push(instruction)
      setInstructions(_instructions)
      setInstruction('')
    }
  }

  const editInstruction = (item, index) => {
    setInstructionIndex(index)
    setInstruction(item)
    setInstructionEdit(true)
  }

  const updateInstruction = () => {
    if (instruction === '') {
      setAlert('Invalid Input', 'warning')
    } else {
      let _instructions = [...instructions]
      _instructions.splice(instructionIndex, 1, instruction)
      setInstructions(_instructions)
      setInstruction('')
      setInstructionEdit(false)
      setInstructionIndex(0)
    }
  }

  const deleteInstruction = index => {
    if (window.confirm('Are you sure?')) {
      let _instructions = [...instructions]
      _instructions.splice(index, 1)
      setInstructions(_instructions)
    }
  }

  const onSubmit = e => {
    e.preventDefault()
    let formData = new FormData()
    formData.append('name', name)
    formData.append('calories', calories)
    formData.append('fats', fats)
    formData.append('servings', servings)
    formData.append('sugar', sugar)
    formData.append('protein', protein)
    formData.append('preparationTime', preparationTime)
    formData.append('netCarbs', netCarbs)
    if (image) formData.append('image', image)
    formData.append('video', video)
    formData.append('category', category)
    formData.append('type', type)
    formData.append('description', description)
    formData.append('ingredients', JSON.stringify(ingredients))
    formData.append('instructions', JSON.stringify(instructions))
    setIsLoading(true)
    updateRecipe(recipeID, formData, history)
  }

  React.useEffect(() => {
    if (recipe.ingredients) {
      setName(recipe.name)
      setCalories(recipe.calories)
      setFats(recipe.fats)
      setServings(recipe.servings)
      setSugar(recipe.sugar)
      setProtein(recipe.protein)
      setPreparationTime(recipe.preparationTime)
      setNetCarbs(recipe.netCarbs)
      setVideo(recipe.video)
      setCategory(recipe.category)
      setType(recipe.type)
      setDescription(recipe.description)
      setIngredients(recipe.ingredients)
      let tempInstructions = []
      for (var i = 0; i < recipe.instructions.length; i++) {
        tempInstructions.push(recipe.instructions[i].content)
      }
      setInstructions(tempInstructions)
    }
  }, [recipe])

  return (
    <div className='admin-recipe-create'>
      <div className='font-36 pt-3'>Edit Recipe</div>
      <div className='row my-3'>
        <div className='col-md-12'>
          <div className='p-3 bg-white keto-rounded-lg mt-3 keto-shadow'>
            {isLoading ?
              <Spinner />
              : <form className='form row' onSubmit={onSubmit}>
                <div className='col-md-6 form-group'>
                  <label>Name</label>
                  <input
                    type='text'
                    className='form-control'
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                  />
                </div>
                <div className='col-md-6 form-group'>
                  <label>Calories</label>
                  <input
                    type='text'
                    className='form-control'
                    value={calories}
                    onChange={e => setCalories(e.target.value)}
                  />
                </div>
                <div className='col-md-6 form-group'>
                  <label>Fats</label>
                  <input
                    type='text'
                    className='form-control'
                    value={fats}
                    onChange={e => setFats(e.target.value)}
                  />
                </div>
                <div className='col-md-6 form-group'>
                  <label>Servings</label>
                  <input
                    type='text'
                    className='form-control'
                    value={servings}
                    onChange={e => setServings(e.target.value)}
                  />
                </div>
                <div className='col-md-6 form-group'>
                  <label>Sugar</label>
                  <input
                    type='text'
                    className='form-control'
                    value={sugar}
                    onChange={e => setSugar(e.target.value)}
                  />
                </div>
                <div className='col-md-6 form-group'>
                  <label>Protein</label>
                  <input
                    type='text'
                    className='form-control'
                    value={protein}
                    onChange={e => setProtein(e.target.value)}
                  />
                </div>
                <div className='col-md-6 form-group'>
                  <label>Preparation Time</label>
                  <input
                    type='number'
                    className='form-control'
                    value={preparationTime}
                    onChange={e => setPreparationTime(e.target.value)}
                  />
                </div>
                <div className='col-md-6 form-group'>
                  <label>Net Carbs</label>
                  <input
                    type='text'
                    className='form-control'
                    value={netCarbs}
                    onChange={e => setNetCarbs(e.target.value)}
                  />
                </div>
                <div className='col-md-6 form-group'>
                  <label>Image</label>
                  <input
                    type='file'
                    accept='image/*'
                    className='form-control'
                    onChange={e => setImage(e.target.files[0])}
                  />
                </div>
                <div className='col-md-6 form-group'>
                  <label>Video</label>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Vimeo Link'
                    value={video}
                    onChange={e => setVideo(e.target.value)}
                  />
                </div>
                <div className='col-md-6 form-group'>
                  <label>Category</label>
                  <select
                    className='form-control'
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                  >
                    <option value='Breakfast'>Breakfast</option>
                    <option value='Lunch'>Lunch</option>
                    <option value='Dinner'>Dinner</option>
                    <option value='Snacks'>Snacks</option>
                  </select>
                </div>
                <div className='col-md-6 form-group'>
                  <label>Type</label>
                  <select
                    className='form-control'
                    value={type}
                    onChange={e => setType(e.target.value)}
                  >
                    <option value=''></option>
                    <option value='Meat-Chicken'>Meat-Chicken</option>
                    <option value='Meat-Pork'>Meat-Pork</option>
                    <option value='Meat-Beef'>Meat-Beef</option>
                    <option value='Meat-Fish'>Meat-Fish</option>
                    <option value='Meat-Bacon'>Meat-Bacon</option>
                    <option value='Meat-No Meat'>Meat-No Meat</option>
                    <option value='Veggies-Broccoli'>Veggies-Broccoli</option>
                    <option value='Veggies-Mushrooms'>Veggies-Mushrooms</option>
                    <option value='Veggies-Zucchini'>Veggies-Zucchini</option>
                    <option value='Veggies-Cauliflower'>Veggies-Cauliflower</option>
                    <option value='Veggies-Asparagas'>Veggies-Asparagas</option>
                    <option value='BreakfaVeggies-Avocadost'>Veggies-Avocado</option>
                    <option value='Products-Eggs'>Products-Eggs</option>
                    <option value='Products-Nuts'>Products-Nuts</option>
                    <option value='Products-Cheese'>Products-Cheese</option>
                    <option value='Products-Cottage Cheese'>Products-Cottage Cheese</option>
                    <option value='Products-Butter'>Products-Butter</option>
                    <option value='Products-Coconut'>Products-Coconut</option>
                    <option value='Products-No dairy'>Products-No dairy</option>
                  </select>
                </div>
                <div className='col-md-12 form-group'>
                  <label>Description</label>
                  <textarea
                    type='text'
                    name='description'
                    rows={3}
                    className='form-control'
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                  />

                  <h5 className='mt-3'>Add Ingredient</h5>
                  <div className='table-responsive'>
                    <table className='table table-borderless'>
                      <thead>
                        <tr>
                          <th>No</th>
                          <th>Name</th>
                          <th>Quantity</th>
                          <th>Type</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className='inline-form'>
                          <td></td>
                          <td>
                            <input
                              type='text'
                              className='form-control'
                              value={ingredientName}
                              onChange={e => setIngredientName(e.target.value)}
                            />
                          </td>
                          <td>
                            <input
                              type='text'
                              className='form-control'
                              value={ingredientQuantity}
                              onChange={e => setIngredientQuantity(e.target.value)}
                            />
                          </td>
                          <td>
                            <input
                              type='text'
                              className='form-control'
                              value={ingredientType}
                              onChange={e => setIngredientType(e.target.value)}
                            />
                          </td>
                          <td>
                            <input
                              type='button'
                              className='form-control btn bg-keto-primary'
                              onClick={() => {
                                if (ingredientEdit)
                                  updateIngredient()
                                else
                                  saveIngredient()
                              }}
                              value={ingredientEdit ? 'Update' : 'Save'}
                            />
                          </td>
                        </tr>
                        {ingredients.map((item, index) =>
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.quantity}</td>
                            <td>{item.type}</td>
                            <td>
                              <div className="btn-group btn-group-sm">
                                <button
                                  type="button"
                                  className="btn bg-keto-primary"
                                  onClick={() => editIngredient(item, index)}
                                >EDIT</button>
                                <button
                                  type="button"
                                  className="btn bg-keto-secondary"
                                  onClick={() => deleteIngredient(index)}
                                >DELETE</button>
                              </div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                  <h5 className='mt-3'>Add Instruction</h5>
                  <div className='table-responsive'>
                    <table className='table table-borderless'>
                      <thead>
                        <tr>
                          <th>No</th>
                          <th>Instruction</th>
                          <th style={{ width: '150px' }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className='inline-form'>
                          <td></td>
                          <td>
                            <input
                              type='text'
                              className='form-control'
                              value={instruction}
                              onChange={e => setInstruction(e.target.value)}
                            />
                          </td>
                          <td>
                            <input
                              type='button'
                              className='form-control btn bg-keto-primary'
                              onClick={() => {
                                if (instructionEdit)
                                  updateInstruction()
                                else
                                  saveInstruction()
                              }}
                              value={instructionEdit ? 'Update' : 'Save'}
                            />
                          </td>
                        </tr>
                        {instructions.map((item, index) =>
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item}</td>
                            <td>
                              <div className="btn-group btn-group-sm">
                                <button
                                  type="button"
                                  className="btn bg-keto-primary"
                                  onClick={() => editInstruction(item, index)}
                                >EDIT</button>
                                <button
                                  type="button"
                                  className="btn bg-keto-secondary"
                                  onClick={() => deleteInstruction(index)}
                                >DELETE</button>
                              </div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
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
  recipe: state.recipe.recipe
})

export default connect(mapStateToProps, { getRecipe, updateRecipe, setAlert })(AdminRecipeEdit)