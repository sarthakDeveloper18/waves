import React from 'react';
import {Switch, Route} from 'react-router-dom'
import Home from './components/Home';
import Layout from './hoc/layout';
import RegisterLogin from './components/Register_Login';
import Register from './components/Register_Login/register';
import UserDashboard from './components/User';
import Auth from './hoc/auth';
import Shop from './components/Shop';
import AddProduct from './components/User/addProduct';
import ManageCategories from './components/User/manageCategories';
import Product from './components/Product';
import Cart from './components/User/cart';
import UpdateProfile from './components/User/updateProfile';
import ManageSite from './components/User/manageSite';

const Routes = (props) => {
  return ( 
    <Layout>
      <Switch>
        {/* For public null
        For private true
        B|W false */}
        <Route path = '/' exact component = {Auth(Home, null)}/>
        <Route path = '/shop' exact component = {Auth(Shop, null)}/>
        <Route path = '/product_detail/:id' exact component = {Auth(Product, null)} />

        <Route path = '/registerLogin' exact component = {Auth(RegisterLogin, false)}/>
        <Route path = '/register' exact component = {Auth(Register, false)}/>

        <Route path = '/user/dashboard' exact component = {Auth(UserDashboard, true)}/>
        <Route path = '/admin/add_products' exact component = {Auth(AddProduct, true)} />
        <Route path = '/admin/manage_categories' exact component = {Auth(ManageCategories, true)}/>
        <Route path = '/user/cart' exact component = {Auth(Cart, true)} />
        <Route path = '/user/user_profile' exact component = {Auth(UpdateProfile, true)} />
        <Route path = '/admin/site/info' exact component = {Auth(ManageSite, true)}/>
      </Switch>
    </Layout>
  );
}
 
export default Routes;