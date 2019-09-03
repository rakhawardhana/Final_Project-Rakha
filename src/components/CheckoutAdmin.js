import React, { Component } from 'react'
import axios from '../config/axios'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'
//import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


// get checkout and products, 
// patch 

class CheckoutAdmin extends Component {

    constructor(props) {
        super(props);
        this.state = {
          checkout: []
        };
    
        
    }

    

    componentDidMount(){
        // kan dia setState ke products, nah products itu isinya res.data yang merupakan array of object. 

        axios.get('/checkout')
            .then(res => {
               this.setState({checkout: res.data})
            })

    }

    getCheckout = () => {
        axios.get('/checkout')
            .then(res => {
               this.setState({checkout: res.data})
            })
    }
    
    
    
    onButtonClick = (id) => {

        const admin_id = this.props.admin.id
        const verified = 'yes'
        axios.patch(
            '/checkout/' + id, {
                admin_id,
                verified
            }

        ).then (res => {
            console.log(res.data)
            // value category_id nya berupa id, bukan category_product
            axios.get('/checkout')
            .then(res => {
               this.setState({checkout: res.data})
            })
        })
        
    }

    // onDecline = (id) => {

    //     const admin_id = this.props.admin.id
    //     const verified = 'no'
    //     axios.patch(
    //         '/checkout/decline/' + id, {
    //             admin_id,
    //             verified
    //         }

    //     ).then (res => {
    //         console.log(res.data)
    //         // value category_id nya berupa id, bukan category_product
    //         axios.get('/checkout')
    //         .then(res => {
    //            this.setState({checkout: res.data})
    //         })
    //     })
        
    // }
    
    // dibikin fungsi edit patch false untuk decline
    onDecline = (id) => {

        const admin_id = this.props.admin.id
        const verified = 'no'
        axios.patch(
            '/checkout/' + id, {
                admin_id,
                verified
            }

        ).then (res => {
            console.log(res.data)
            axios.get('/checkout')
            .then(res => {
               this.setState({checkout: res.data})
            })
        })
        
    }
    
    renderList = () => {
       
        return this.state.checkout.map( item => { // {id, name, price, desc, src}
            if (item.verified == null) {
                return (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name_product}{item.quantity}</td>
                        <td>{item.price_sum}</td>
                        <td>{item.quantity}</td>
                        <td><img className='list' alt='' style={{width: 100, height: 100}} src={`http://localhost:2019/checkout/transfer_avatar/${item.transfer_avatar}`}/></td>
                        <td>{item.created_at}</td>
                        <td>{item.updated_at}</td>
                        <td>
                            <button className = 'btn btn-primary' onClick={() => {
                                this.onButtonClick(item.id)
                                }}>VERIFY</button>
                            {/* <button className = 'btn btn-warning' onClick={()=>{this.delete(item.id)}} >Delete </button> */}
                        </td>
                        <td>
                        <button className = 'btn btn-primary' onClick={() => {
                                this.onDecline(item.id)
                                }}>DECLINE</button>
                            {/* <button className = 'btn btn-warning' onClick={()=>{this.delete(item.id)}} >Delete </button> */}
                        </td>
                    </tr>
                    //onClick={() => {this.delete(item)}}
                    
                )
            } else if (item.verified == "yes") {
                return (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name_product}{item.quantity}</td>
                        <td>{item.price_sum}</td>
                        <td>{item.quantity}</td>
                        <td><img className='list' alt='' style={{width: 100, height: 100}} src={`http://localhost:2019/checkout/transfer_avatar/${item.transfer_avatar}`}/></td>
                        <td>{item.created_at}</td>
                        <td>{item.updated_at}</td>
                        <td>Verified</td>
                    </tr>
                )
    
            } else {
                return (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name_product}{item.quantity}</td>
                        <td>{item.price_sum}</td>
                        <td>{item.quantity}</td>
                        <td><img className='list' alt='' style={{width: 100, height: 100}} src={`http://localhost:2019/checkout/transfer_avatar/${item.transfer_avatar}`}/></td>
                        <td>{item.created_at}</td>
                        <td>{item.updated_at}</td>
                        <td>Declined</td>
                    </tr>
                )
            }
            
            
        })
    }

    // id, name_product, quantity, price sum, avatar, tanggal transaksi, tanggal verified
    render () {
        if (this.props.admin.id) {
            return (
                <div className="container">
                    <h1 className="display-4 text-center">ALL TRANSACTION</h1>
                    <table className="table table-hover mb-5">
                        <thead>
                            <tr>
                                <th scope="col">ID</th> 
                                <th scope="col">NAME</th>
                                <th scope="col">PRICE_SUM</th>
                                <th scope="col">QUANTITY</th>
                                <th scope="col">TRANSFER AVATAR</th>
                                <th scope="col">TANGGAL TRANSAKSI</th>
                                <th scope="col">DIUPDATE TANGGAL</th>
                                {/* <th scope="col">PICTURE</th> */}
        
                                <th scope="col">ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderList()}
                        </tbody>
                    </table>
                   
                   
                </div>
            )
            }
            return <Redirect to='/loginadmin'/>
        }
        
}


const mapStateToProps = state => {
    return {
        admin: state.admin // {id, username}
    }
}

export default connect(mapStateToProps)(CheckoutAdmin)