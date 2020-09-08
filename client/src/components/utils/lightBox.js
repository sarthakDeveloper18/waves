import React, { Component } from 'react';
//import Lightbox from 'react-images';
import Carousel, { Modal, ModalGateway } from 'react-images';

class LightBox extends Component {
    state = { 
        lightBoxIsOpen: this.props.open,
        currentImage: this.props.pos,
        images: []
    }
    static getDerivedStateFromProps(props, state){
        if(props.images){
            const images = []
            props.images.forEach(item=>{
                images.push({src: `${item}`})
            })
            return{
                images:images
            }
        }   
        else{
            return false
        }
    }
    handleClose = () => {
        this.props.onClose()
    }
    render() { 
        return ( 
            <ModalGateway>
                {
                    this.state.lightBoxIsOpen ? 
                    (
                        <Modal onClose={this.handleClose}>
                            <Carousel currentIndex = {this.state.currentImage} views={this.state.images} />
                        </Modal>
                    ) 
                    : null
                }
            </ModalGateway>
        );
    }
}
 
export default LightBox;