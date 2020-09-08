import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faPlusCircle from '@fortawesome/fontawesome-free-solid/faPlusCircle';
import CiruclarProgress from '@material-ui/core/CircularProgress';

class FileUpload extends Component {
    state = { 
        uploadedFiles: [],
        uploading: false
    }
    static getDerivedStateFromProps(props, state){
        if(props.reset){
            return{
                uploadedFiles: []
            }
        }
        return null
    }
    onDrop = (e) => {
        this.setState({uploading: true})
        let formData = new FormData()
        const config = {
            header: {'content-type': 'multipart/form-data'}
        }
        formData.append("file", e[0])
        axios.post('/api/users/uploadImage', formData, config).then(response=> {
            this.setState({uploading: false, uploadedFiles: [...this.state.uploadedFiles, response.data]}, ()=>{
                this.props.imageHandler(this.state.uploadedFiles)
            })
        })
    }
    onRemove = (id) => {
        axios.get(`/api/users/removeImage?id=${id}`).then(response=>{
            let images = this.state.uploadedFiles.filter(item=>{
                return item.public_id !== id
            })
            this.setState({uploadedFiles: images}, ()=>{
                this.props.imageHandler(images)
            })
        })
    }
    showUploadImages = () => (
        this.state.uploadedFiles.map((item, i)=>(
            <div className = 'dropzone_box' key = {item.public_id} onClick = {()=> this.onRemove(item.public_id)}>
                <div className = 'wrap' style = {{background: `url(${item.url}) no-repeat`}}>

                </div>
            </div>
        ))
    )
    render() { 
        console.log(this.state.uploadedFiles)
        return ( 
            <div>
                <section>
                    <div className = 'dropzone clear'>
                        <Dropzone onDrop={(e)=> this.onDrop(e)} className = 'dropzone_box'>
                            <div className = 'wrap'>
                                    <FontAwesomeIcon icon = {faPlusCircle}/>
                            </div>
                        </Dropzone>
                        {this.showUploadImages()}
                        {
                            this.state.uploading ?
                            <div className = 'dropzone_box' style = {{textAlign: 'center', paddingTop: '60px'}}>
                                <CiruclarProgress style = {{color: '#00bcd4'}} thickness = {7}/>
                            </div> : null
                        }
                    </div>
                </section>
            </div>        
        );
    }
}
 
export default FileUpload;