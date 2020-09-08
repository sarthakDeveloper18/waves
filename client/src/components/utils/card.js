import React, { Component } from 'react';
import Button from '../utils/button';
import {connect} from 'react-redux';
import { addToCart } from '../../actions/user_action';

class Card extends Component {
    state = {  }
    renderCard = (images) => {
        if(images.length > 0){
            return images[0].url
        }
        else{
            return '/images/image_not_availble.png'
        }
    }
    render() {
        return (
            <div className = {`card_item_wrapper ${this.props.grid}`}>
                <div className = 'image' style = {{background: `url(${this.renderCard(this.props.images)}) no-repeat`}}></div>
                <div className = 'action_container'>
                    <div className = 'tags'>
                        <div className = 'brand'>{this.props.brand.name}</div>
                        <div className = 'name'>{this.props.name}</div>
                        <div className = 'price'>${this.props.price}</div>
                    </div>
                    {
                        this.props.grid ?
                        <div className = 'description'>
                            <p>{this.props.description}</p>
                        </div>
                        : null
                    }
                    <div className = 'actions'>
                        <div className = 'button_wrapp'>
                            <Button type = 'default' altClass = 'card_link' title = 'View Product' linkTo = {`/product_detail/${this.props._id}`} addStyles = {{margin: '10px 0 0 0'}}/>
                        </div>
                        <div className = 'button_wrapp'>
                            <Button type = 'bag_link' runAction = {()=> this.props.user.userData.isAuth ? this.props.dispatch(addToCart(this.props._id)) : console.log("")} altClass = 'card_link' title = 'View Product' linkTo = {`/product_detail/${this.props._id}`} addStyles = {{margin: '10px 0 0 0'}}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        user: state.user
    }
}
 
export default connect(mapStateToProps)(Card);