import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import DetailProduct from './DetailProduct'
import {Redirect} from 'react-router-dom'
import axios from '../config/axios';



class Checkout extends Component {

    // state = {
    //     product: {
    //         id: '',
    //         name: '',
    //         price: '',
    //         avatar: ''
    //     }
    // }


    onButtonClick = () => {
        //let cart_id = this.props.match.params.id
        const formData = new FormData()
    
        const transfer_avatar = this.transfer_avatar.files[0]
        const price_sum = this.price_sum.value
        const cart_id = this.props.match.params.id
        const users_id = this.props.user.id
        
    
        // field
        formData.append('transfer_avatar', transfer_avatar)
        formData.append('price_sum', price_sum)
        formData.append('cart_id', cart_id)
        formData.append('users_id', users_id)
        // formData.append('password', data_password)
    
        axios.post(
            '/checkout',
            formData
        ).then (res => {
            console.log(res.data)
        })
        
    }
    
    // componentDidMount() {
    //     // Get Profile
    //     axios.get('/users/' + this.props.userid)
    //         .then(res => {
    //             this.setState({data: res.data});
                
    //         })
    // }




    render() {
        if(this.props.match.params.id){
            
            return (
                    <div className='container'>
                        <form>
                            <h1>UPLOAD TRANSAKSI</h1>
                            <div className="form-group">
                                <label htmlFor="price_sum">JUMLAH YANG TELAH DITRANSFER</label>
                                <input ref={input => this.price_sum = input} type="number" className="form-control" id="price_sum" />
                            </div>
                            
                            <div className='custom-file'>
                                <label htmlFor="transfer_avatar">BUKTI TRANSFER</label>
                                <input type='file' ref={input => {this.transfer_avatar = input}}/>
                            </div>
                        </form>
                        
                        <button
                            className='btn btn-primary'
                            onClick={this.onButtonClick}
                        >UPLOAD UNTUK VERIFIKASI</button>
                    </div>
            )
        }
        return <h1>Loading</h1>
        
    }
    
    






}





const mapStateToProps = state => {
    return {
        user: state.auth // {id, username}
    }
}

export default connect(mapStateToProps) (Checkout)
