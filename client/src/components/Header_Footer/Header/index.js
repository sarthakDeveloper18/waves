import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../../actions/user_action';
import {withRouter} from 'react-router-dom';

class Header extends Component {
    state = { 
        page: [
            {
                link: 'Home',
                linkTo:'/',
                public: true
            },
            {
                link: 'Guitars',
                linkTo:'/shop',
                public: true
            }
        ],
        user: [
            {
                link: 'My Cart',
                linkTo:'/user/cart',
                public: false
            },
            {
                link: 'my Account',
                linkTo:'/user/dashboard',
                public: false
            },
            {
                link: 'Login',
                linkTo:'/registerLogin',
                public: true
            },
            {
                link: 'Logout',
                linkTo:'/user/logout',
                public: false
            },

        ]
    }
    showLinks = (type) => {
        let list = []
        if(this.props.user.userData){
            type.forEach(element => {
                if(!this.props.user.userData.isAuth){
                    if(element.public === true){
                        list.push(element)
                    }
                }
                else{
                    if(element.name !== 'Login'){
                        list.push(element)
                    }
                }
            });
        }
        return list.map((item, i)=>{
            if(item.link !== 'My Cart'){
                return this.defaultLink(item, i)
            }
            else{
                return this.cartLink(item, i)
            }
            
        })
    }
    defaultLink = (item, i) => {
        if(item.link === 'Logout'){
            return(
                <div className = 'log_out_link' key = {i} onClick = {()=> this.logoutHandler()}>
                    {item.link}
                </div>
            )
        }
        else{
            return(
                <Link to = {item.linkTo} key = {i}>
                    {item.link}
                </Link>
            )
        }
    }
    cartLink = (item, i) => {
        const user = this.props.user.userData
        return(
            <div className = 'cart_link' key = {i}>
                <span>{user.cart ? user.cart.length : 0}</span>
                <Link to = {item.linkTo}>
                    {item.link}
                </Link>
            </div>
        )
    }
    logoutHandler = () => {
        this.props.dispatch(logout()).then(response=>{
            if(response.payload.success){
                this.props.history.push('/registerLogin')
            }
        })
    }
    render() { 
        return ( 
            <header className = 'bck_b_light'>
                <div className = 'container'>
                    <div className = 'left'>
                        <div className = 'logo'>
                            WAVES
                        </div>
                    </div>
                    <div className = 'right'>
                        <div className = 'top'>
                            {
                                this.showLinks(this.state.user)
                            }
                        </div>
                        <div className = 'bottom'>
                            {
                                this.showLinks(this.state.page)
                            }
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

function mapStateToProps(state){
    return {
        user: state.user
    }
}
 
export default connect(mapStateToProps)(withRouter(Header));