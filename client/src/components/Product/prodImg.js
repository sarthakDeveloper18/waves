import React, { Component } from 'react';
import LightBox from '../utils/lightBox';

class ProductImage extends Component {
    state = { 
        lightbox: false,
        imagePos: 0,
        lightBoxImages: [],
    }
    componentDidMount() {
        if(this.props.detail.images.length > 0){
            let lightBoxImages = []
            this.props.detail.images.forEach(img=>{
                lightBoxImages.push(img.url)
            })
            this.setState({lightBoxImages})
        }
    }
    renderImages = (images) => {
        if(images.length >1){
            return images[0].url
        }
        else{
            return '/images/image_not_availble.png'
        }
    }
    showThumbs = () => (
        this.state.lightBoxImages.map((item, i)=>(
            i > 0 ?
            <div className = 'thumb' style = {{background: `url(${item}) no-repeat`}} key = {i} onClick = {()=>this.handleLightBox(i)}></div>
            : null
        ))
    )
    handleLightBox = (pos) => {
        if(this.state.lightBoxImages.length > 1){
            this.setState({lightbox: true, imagePos: pos})
        }
    }
    handleLightBoxClose = () => {
        this.setState({lightbox: false})
    }
    render() {
        return ( 
            <div className = 'product_image_container'>
                <div className = 'main_pic'>
                    <div onClick = {()=>this.handleLightBox(0)} style = {{background: `url(${this.renderImages(this.props.detail.images)}) no-repeat`}}></div>
                </div>
                <div className = 'main_thumbs'>
                    {this.showThumbs()}
                </div>
                {
                    this.state.lightbox ?
                        <LightBox pos = {this.state.imagePos} onClose = {()=> this.handleLightBoxClose()} images = {this.state.lightBoxImages} open = {this.state.lightbox}/>
                    : null
                }
            </div>
        );
    }
}
 
export default ProductImage;