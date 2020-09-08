import React from 'react';
import Button from '../utils/button';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faTruck from '@fortawesome/fontawesome-free-solid/faTruck';
import faCheck from '@fortawesome/fontawesome-free-solid/faCheck';
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes';


const ProductInfo = (props) => {
    const showProdTags = () => {
        return(
            <div className = 'product_tags'>
                {
                    props.detail.shipping ?
                    <div className = 'tag'>
                        <div>
                            <FontAwesomeIcon icon = {faTruck}/>
                        </div>
                        <div className = 'tag_text'>
                            <div>Free Shipping</div>
                            <div>And Return</div>
                        </div>
                    </div>
                    : null
                }
                {
                    props.detail.available ?
                    <div className = 'tag'>
                        <div>
                            <FontAwesomeIcon icon = {faCheck}/>
                        </div>
                        <div className = 'tag_text'>
                            <div>Available</div>
                            <div>in store</div>
                        </div>
                    </div>  
                    :
                    <div className = 'tag'>
                        <div>
                            <FontAwesomeIcon icon = {faTimes}/>
                        </div>
                        <div className = 'tag_text'>
                            <div>Not Available</div>
                            <div>Preorder Only</div>
                        </div>
                    </div>
                }
            </div>
        )
    }
    const showProdActions = () => {
        return(
            <div className = 'product_actions'>
                <div className = 'price'>$ {props.detail.price}</div>
                <div className = 'cart'>
                    <Button type = 'add_to_cart_link' runAction = {()=>props.addToCart(props.detail._id)}/>
                </div>
            </div>
        )
    }
    const showProdSpecification = () => {
        return(
            <div className = 'product_specification'>
                <h2>Specs</h2>
                <div className = 'item'>
                    <strong>Frets: </strong>{props.detail.frets}
                </div>
                <div className = 'item'>
                    <strong>Wood: </strong>{props.detail.wood.name}
                </div>
            </div>
        )
    }
    return ( 
        <div>
            <h1>{props.detail.brand.name} {props.detail.name}</h1>
            <p>{props.detail.description}</p>
            {showProdTags()}
            {showProdActions()}
            {showProdSpecification()}
        </div>
    );
}
 
export default ProductInfo;