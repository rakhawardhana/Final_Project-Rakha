import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import DetailProduct from './DetailProduct'
import {Redirect} from 'react-router-dom'
import axios from '../config/axios';



class Checkout extends Component {

    state = {
        id: null
    }

     componentDidMount() {
        // Get cart_id
        axios.get('/cart/user/' + this.props.user.id)
            .then(res => {
                this.setState({id: res.data});
                console.log(res.data)
            })
    }

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
            alert('Menunggu untuk di setujui, klik dashboard verified untuk melihat')
            // entar disini pindah halaman
        })
        
    }
    
    list = () => {
        const cart_id = this.state.id
        axios.get('/checkout/' + cart_id)
            .then(res => {
                console.log(res.data)
                if(res.data.verified == "yes")  {
                    alert("TRANSFER ANDA TELAH TERVERIFIKASI, TERIMA KASIH")
                }
                alert("MOHON MENUNGGU")
            })

    }
   

    render() {
        if(this.state.id){
            
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
                         <button className = 'btn btn-danger m-1' onClick={this.list}>LIHAT VERIFIKASI</button>
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
