import React from 'react';
import {Link} from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faShoppingBag from '@fortawesome/fontawesome-free-solid/faShoppingBag';

const Button = (props) => {

    const buttons = () => {
        let template = ''
        switch(props.type){
            case 'default':
                return template = <Link className = {!props.altClass ? 'link_default' : props.altClass} to = {props.linkTo} {...props.addStyles}>{props.title}</Link>
            case 'bag_link': 
                return template = (
                    <div className= 'bag_link' onClick = {()=> props.runAction()}>
                        <FontAwesomeIcon icon = {faShoppingBag}/>
                    </div>
                )
            case 'add_to_cart_link':
                return template = (
                    <div className= 'add_to_cart_link' onClick = {()=> props.runAction()}>
                        <FontAwesomeIcon icon = {faShoppingBag}/> Add To Cart
                    </div>
                )
            default: 
                return template
        }
    }

    return ( 
        <div className = 'my_link'>
            {buttons()}
        </div>
    );
}
 
export default Button;