import React, { Component } from 'react';
import {connect} from 'react-redux';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faFrown from '@fortawesome/fontawesome-free-solid/faFrown';
import faSmile from '@fortawesome/fontawesome-free-solid/faSmile';
import UserLayout from '../../hoc/user';
import { getCardItems, removeFromCart, onSuccessBuy } from '../../actions/user_action';
import CartBlock from '../utils/cartBlock';
import Paypal from '../utils/paypal';

class Cart extends Component {
    state = { 
        loading: true, 
        total: 0,
        showSuccess: false,
        showTotal: false
    }
    componentDidMount() {
        let cardItem = []
        let user = this.props.user
        if(user.userData.cart){
            if(user.userData.cart.length > 0){
                user.userData.cart.forEach(item => {
                    cardItem.push(item.id)
                });
                this.props.dispatch(getCardItems(cardItem, this.props.user.userData.cart))
                .then(()=> {
                    if(this.props.user.cartDetail.length > 0){
                        this.calculateTotalPrice(this.props.user.cartDetail)
                    }
                })
            }
        }
    }
    calculateTotalPrice = (detail) => {
        let total = 0
        detail.forEach(item=>{
            total += parseInt(item.price, 10) * item.quantity
            this.setState({total, showTotal: true})
        })
    }
    removeFromCart = (id) => {
        console.log(id)
        this.props.dispatch(removeFromCart(id)).then(()=>{
            if(this.props.user.cartDetail.length <= 0){
                this.setState({showTotal: false})
            }
            else{
                this.calculateTotalPrice(this.props.user.cartDetail)
            }
        })
    }
    transactionError = (data) => {

    }

    transactionCancel = (data) => {
        this.props.dispatch(onSuccessBuy({cartDetail: this.props.user.cartDetail})).then(()=>{
            if(this.props.user.onSuccess){
                this.setState({showSuccess:true, showTotal: false})
            }
        })
    }
    transactionSuccess = (data) => {
        
    }
    render() { 
        return ( 
            <UserLayout>
                <div>
                    <h1>My Cart</h1>
                    <div className = 'user_cart'>
                        <CartBlock products = {this.props.user} type = 'cart' removeItem = { id => this.removeFromCart(id)}/>
                        {
                            this.state.showTotal ?
                            <div className = 'user_cart_sum'>
                                <div>Total Amount ${this.state.total}</div>
                            </div>
                            :
                            this.state.showSuccess ?
                            <div className = 'cart_success'>
                                <FontAwesomeIcon icon = {faSmile}/>
                                <div>Thank You </div>
                                <div>Your order is now complete</div>
                            </div>
                            :
                            <div className = 'cart_no_items'>
                                <FontAwesomeIcon icon = {faFrown}/>
                                <div>You have no items</div>
                            </div>
                        }
                    </div>
                    {
                        this.state.showTotal ?
                        <div className = 'paypal_button_container'>
                            <Paypal onSuccess = {(data)=> this.transactionSuccess(data)} pay = {this.state.total} transactionCancel = {(data)=> this.transactionCancel(data)} transactionError = {(data)=> this.transactionError(data)}/>
                        </div>
                        : null
                    }
                </div>
            </UserLayout>
        );
    }
}

function mapStateToProps(state){
    return{
        user: state.user
    }
}
 
export default connect(mapStateToProps)(Cart);