import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';

const links = [
    {link: 'My Account',linkTo: '/user/dashboard'},
    {link: 'User Information', linkTo:'/user/user_profile'},
    {link: 'My Cart', linkTo:'/user/cart'},
]
const admin = [
    {link: 'Site Info',linkTo: '/admin/site/info'},
    {link: 'Add Products', linkTo:'/admin/add_products'},
    {link: 'Manage Categories', linkTo:'/admin/manage_categories'},
]
const UserLayout = (props) => {
    return ( 
        <div className = 'container'>
            <div className = 'user_container'>
                <div className = 'user_left_nav'>
                    <h2>My Account</h2>
                    <div className = 'links'>
                        {
                            links.map((link, i)=>{
                                return(
                                    <Link key = {i} to = {link.linkTo}>{link.link}</Link>
                                )
                            })
                        }
                    </div>
                    { 
                        props.user.userData.isAdmin ?
                        <div>
                            <h2>Admin</h2>
                            <div className = 'links'>
                                {
                                    admin.map((link, i)=>{
                                        return(
                                            <Link key = {i} to = {link.linkTo}>{link.link}</Link>
                                        )
                                    })
                                }
                            </div>
                        </div> : null
                    }
                </div>
                <div className = 'user_right'>
                    {props.children}
                </div>
            </div>
        </div>
    );
}

function mapStateToProps(state){
    return{
        user: state.user
    }
}

export default connect(mapStateToProps)(UserLayout);