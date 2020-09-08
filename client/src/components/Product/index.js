import React, { Component } from 'react';
import {connect} from 'react-redux';
import { getProductDetail, clearProductDetail } from '../../actions/product_action';
import PageTop from '../utils/pageTop';
import ProductInfo from './productInfo';
import ProductImage from './prodImg';
import { addToCart } from '../../actions/user_action';

class Product extends Component {
    state = {  }
    componentDidMount() {
        const id = this.props.match.params.id
        this.props.dispatch(getProductDetail(id)).then(response=>{
            if(this.props.products.productDetail){

            }
            else{
                this.props.history.push('/')
            }
        })
    }
    componentWillUnmount() {
        this.props.dispatch(clearProductDetail())
    }
    addToCartHandler = (id) => {
        this.props.dispatch(addToCart(id))
    }
    render() { 
        return ( 
            <div>
                <PageTop title = 'Product Detail'/>
                <div className = 'container'>
                    {
                        this.props.products.productDetail ?
                        <div className = 'product_detail_wrapper'>
                            <div className = 'left'>
                                <div style = {{width: '500px'}}>
                                    <ProductImage detail = {this.props.products.productDetail}/>
                                </div>
                            </div>
                            <div className = 'right'>
                                <ProductInfo addToCart = {(id)=>this.addToCartHandler(id)} detail = {this.props.products.productDetail}/>
                            </div>
                        </div>
                        : null
                    }
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        products: state.products
    }
}
 
export default connect(mapStateToProps)(Product);