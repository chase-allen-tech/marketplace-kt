import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import PrivateRoute from '../routing/PrivateRoute'
import AdminSidebar from './AdminSidebar'
import AdminDashboard from './AdminDashboard'
import AdminAffiliates from './AdminAffiliates'
import AdminAnalytics from './AdminAnalytics'
import AdminSettings from './AdminSettings'
import AdminOrderDetail from './admin-orders/AdminOrderDetail'
import AdminClosedOrders from './admin-orders/AdminClosedOrders'
import AdminOpenedOrders from './admin-orders/AdminOpenedOrders'
import AdminInfulfillmentOrders from './admin-orders/AdminInfulfillmentOrders'
import AdminProducts from './admin-products/AdminProducts'
import AdminProductCreate from './admin-products/AdminProductCreate'
import AdminProductEdit from './admin-products/AdminProductEdit'
import AdminAcademy from './admin-academy/AdminAcademy'
import AdminAcademyCreate from './admin-academy/AdminAcademyCreate'
import AdminAcademyEdit from './admin-academy/AdminAcademyEdit'
import AdminAcademyView from './admin-academy/AdminAcademyView'
import AdminCategories from './admin-category/AdminCategories'
import AdminCategoryCreate from './admin-category/AdminCategoryCreate'
import AdminCategoryEdit from './admin-category/AdminCategoryEdit'
import AdminVAs from './admin-virtual-assiatants/AdminVAs'
import AdminVACreate from './admin-virtual-assiatants/AdminVA-Create'
import AdminVAEdit from './admin-virtual-assiatants/AdminVA-Edit'
import AdminRecipes from './admin-recipes/AdminRecipes'
import AdminRecipeCreate from './admin-recipes/AdminRecipeCreate'
import AdminRecipeEdit from './admin-recipes/AdminRecipeEdit'
import AdminMealPlans from './admin-meal-plan/AdminMealPlans'
import AdminMealPlanCreate from './admin-meal-plan/AdminMealPlanCreate'
import AdminMealPlanEdit from './admin-meal-plan/AdminMealPlanEdit'
import AdminMealPlanView from './admin-meal-plan/AdminMealPlanView'
import AdminRecipeView from './admin-recipes/AdminRecipeView'

const Admin = () => {

  return (
    <div className='container-fluid bg-admin'>
      <div className='row'>
        <AdminSidebar />
        <div className='col-lg-10 col-md-9'>
          <Router basename="/dashboard">
            <PrivateRoute exact path="/" component={AdminDashboard} />
            <PrivateRoute exact path="/affiliates" component={AdminAffiliates} />
            <PrivateRoute exact path="/recipes" component={AdminRecipes} />
            <PrivateRoute exact path="/recipe/:id" component={AdminRecipeView} />
            <PrivateRoute exact path="/recipe-create" component={AdminRecipeCreate} />
            <PrivateRoute exact path="/recipe-edit/:id" component={AdminRecipeEdit} />
            <PrivateRoute exact path="/plans" component={AdminMealPlans} />
            <PrivateRoute exact path="/plan/:id" component={AdminMealPlanView} />
            <PrivateRoute exact path="/plan-create" component={AdminMealPlanCreate} />
            <PrivateRoute exact path="/plan-edit/:id" component={AdminMealPlanEdit} />
            <PrivateRoute exact path="/categories" component={AdminCategories} />
            <PrivateRoute exact path="/category-create" component={AdminCategoryCreate} />
            <PrivateRoute exact path="/category-edit/:id" component={AdminCategoryEdit} />
            <PrivateRoute exact path="/products" component={AdminProducts} />
            <PrivateRoute exact path="/product-create" component={AdminProductCreate} />
            <PrivateRoute exact path="/product-edit/:id" component={AdminProductEdit} />
            <PrivateRoute exact path="/analytics" component={AdminAnalytics} />
            <PrivateRoute exact path="/openedOrders" component={AdminOpenedOrders} />
            <PrivateRoute exact path="/infulfillmentOrders" component={AdminInfulfillmentOrders} />
            <PrivateRoute exact path="/closedOrders" component={AdminClosedOrders} />
            <PrivateRoute exact path="/order/:id" component={AdminOrderDetail} />
            <PrivateRoute exact path="/academy" component={AdminAcademy} />
            <PrivateRoute exact path="/academy/:id" component={AdminAcademyView} />
            <PrivateRoute exact path="/academy-create" component={AdminAcademyCreate} />
            <PrivateRoute exact path="/academy-edit/:id" component={AdminAcademyEdit} />
            <PrivateRoute exact path="/assistants" component={AdminVAs} />
            <PrivateRoute exact path="/assistant-create" component={AdminVACreate} />
            <PrivateRoute exact path="/assistant-edit/:id" component={AdminVAEdit} />
            <PrivateRoute exact path="/settings" component={AdminSettings} />
          </Router>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, {})(Admin)