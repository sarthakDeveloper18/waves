import React, { Component } from 'react';
import PageTop from '../utils/pageTop';
import {connect} from 'react-redux';
import {getBrands, getWoods, getProductsToShop} from '../../actions/product_action';
import CollpaseCheckBox from '../utils/collapseCheckBox';
import {frets, price} from '../utils/fixed_category'
import CollapseRadio from '../utils/collapseRadio';
import LoadMoreCards from './loadMoreCards';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faBars from '@fortawesome/fontawesome-free-solid/faBars';
import faTh from '@fortawesome/fontawesome-free-solid/faTh';

class Shop extends Component {
    state = { 
        grid: '',
        limit: 6,
        skip: 0,
        filters: {
            brand: [],
            frets: [],
            wood: [],
            price: []
        }
    }
    componentDidMount() {
        this.props.dispatch(getBrands())
        this.props.dispatch(getWoods())
        this.props.dispatch(getProductsToShop(this.state.skip, this.state.limit, this.state.filters))
    }
    handleFilters = (filters, category) => {
        const newFilters = {...this.state.filters}
        newFilters[category] = filters
        if(category === 'price'){
            let priceValues = this.handlePrice(filters)
            newFilters[category] = priceValues
        }
        this.showFilteredResult(newFilters)
        this.setState({filters: newFilters})
    }
    showFilteredResult = (newFilters) => {
        this.props.dispatch(getProductsToShop(0, this.state.limit, newFilters)).then(()=>{
            this.setState({skip: 0})
        })
    }
    handlePrice = (value) => {
        const data = price
        let array = []
        for(let key in data){
            if(data[key]._id === parseInt(value, 10)){
                array = data[key].array
            }
        }
        return array
    }
    handleLoadMore = () => {
        let skip = this.state.skip + this.state.limit
        this.props.dispatch(getProductsToShop(skip, this.state.limit, this.state.filters, this.props.products.toShop)).then(()=>{
            this.setState({skip: skip})
        })
    }
    handleGrid = () => {
        this.setState({
            grid: !this.state.grid ? 'grid_bars' : ''
        })
    }
    render() {
        return ( 
            <div>
                <PageTop title = 'Browse Products'/>
                <div className = 'container'>
                    <div className = 'shop_wrapper'>
                        <div className = 'left'>
                            <CollpaseCheckBox initState = {true} title = 'Brands' handleFilters = {(filters)=> this.handleFilters(filters, 'brand')} list = {this.props.products.brands}/>
                            <CollpaseCheckBox initState = {false} title = 'Frets' handleFilters = {(filters)=> this.handleFilters(filters, 'frets')} list = {frets}/>
                            <CollpaseCheckBox initState = {false} title = 'Woods' handleFilters = {(filters)=> this.handleFilters(filters, 'wood')} list = {this.props.products.woods}/>
                            <CollapseRadio initState = {true} title = 'Pirce' handleFilters = {(filters)=> this.handleFilters(filters, 'price')} list = {price}/>
                        </div>
                        <div className = 'right'>
                            <div className = 'shop_options'>
                                <div className = 'shop_grids clear'>
                                    <div className = {`grid_btn ${this.state.grid ? '' : 'active'}`} onClick = {()=> this.handleGrid()}>
                                        <FontAwesomeIcon icon = {faTh}/>
                                    </div>
                                    <div className = {`grid_btn ${!this.state.grid ? '' : 'active'}`} onClick = {()=> this.handleGrid()}>
                                        <FontAwesomeIcon icon = {faBars}/>
                                    </div>
                                </div>
                            </div> 
                            <div>
                                <LoadMoreCards grid = {this.state.grid} limit = {this.state.limit} size = {this.props.products.toShopSize} products = {this.props.products.toShop} loadMore = {()=> this.handleLoadMore()} />
                            </div>
                        </div>
                    </div>
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
 
export default connect(mapStateToProps)(Shop);