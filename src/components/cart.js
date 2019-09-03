import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import DetailProduct from './DetailProduct'
import {Redirect} from 'react-router-dom'
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class Cart extends Component {

    constructor(props){
        super(props)
        this.state = { 
            products: [],
            modal: false,
            pay: false
        }

        this.toggle = this.toggle.bind(this);
        this.togglePay = this.togglePay.bind(this);
    }

    getCart() {  //renderlist

        axios.get('http://localhost:2019/cart_product').then(res => this.setState({products: res.data}))
        // return (
        // )
                        
    }
    

    componentDidMount() {
        axios.get('http://localhost:2019/cart_product').then(res => this.setState({products: res.data}))
    }

    
    toggle() { 
    this.setState(prevState => ({
      modal: !prevState.modal 
    }));
    }

    togglePay() { 
    this.setState(prevState => ({
      pay: !prevState.pay
    }));
    }

    totalJumlah = () => { 
        var totalJumlah = 0 
        
        for (let i = 0; i < this.state.products.length; i++) {
            if (this.props.user.id === this.state.products[i].users_id) {    
                totalJumlah += parseInt(this.state.products[i].quantity);
            }  
        }
        return (
            <td>{totalJumlah}</td>
        )
    }

    totalHarga = () => { 
        var hargaSementara = this.state.products.map(val=>{
            return {
                price: val.quantity*val.price, 
                users_id: val.users_id
            }
        })
        var hargaTotal = 0 

        for (let i = 0; i < this.state.products.length; i++) {
            if (this.props.user.id === hargaSementara[i].users_id) {
            hargaTotal += parseInt(hargaSementara[i].price);
            }
        }
        return (
            <td>Rp. {hargaTotal}</td>
        )
    }

    // saveProduct = (item) => { 
        
    //     const jumlahBaru = parseInt(this.editQty.value) 
    //     axios.patch('http://localhost:2019/cart/'+this.state.products.idBarang,
    //     {
    //         jumlah:jumlahBaru
    //     }).then(res=>{
    //         this.getCart()
    //     })
    // }

    deleteProduct = (item) => { 
        axios.delete('http://localhost:2019/cart_product/'+item).then(res=>{
            this.getCart()
        })
    }

    pembayaran = () => { 
        return this.state.products.map( item => { 
            if(this.props.user.id === item.users_id){
                return (
                    <tr>
                        <td>
                        <img className='list' alt='' style={{width: 150, height: 130}} src={`http://localhost:2019/products/avatar/${item.avatar}`}/>
                        </td>
                        <td>{item.name_product}</td>
                        <td>{item.price}</td>
                        <td>{item.quantity}</td>
                    </tr>
                )
            }
        })
    }


    bayar = () => { 
        
        // return this.state.products.map( item => { 

        //     if(this.props.user.id === item.users_id){
        //         axios.delete('http://localhost:2019/cart_product/'+item.product_id)
        //     }

        //     this.togglePay() 
        // })
            return <Redirect to= {'/checkout'}/>
            
           
            //     <button className='btn btn-outline-primary btn-block'>Details</button>
            // </Link> 
            
            //this.togglePay()
        
         

    }

    


    renderList = () => {
        if(this.props.user.username !== ''){ 
            return this.state.products.map( item => 
                // {if(item.idBarang !== this.state.selectedID)
                { 
                    if(this.props.user.id === item.users_id){
                        return (
                            <tr key={item.product_id}>
                                <td scope="col">{item.product_id}</td>
                                <td scope="col">{item.name_product}</td>
                                <td scope="col">{item.description}</td>
                                <td scope="col">{item.price}</td>                                
                                <td scope="col">{item.quantity}</td>
                                <td><img className='list' alt='' style={{width: 150, height: 130}} src={`http://localhost:2019/products/avatar/${item.avatar}`}/></td>
                                <td> 
                                    {/* <button className = 'btn btn-danger m-1' onClick={()=>{this.setState({selectedID : item.idBarang, item: item})}} >Edit</button> */}
                                    <button className = 'btn btn-warning m-1' onClick={()=>{this.deleteProduct(item.product_id)}}>Delete</button>
                                </td>
                                {/* <button className = 'btn btn-danger m-1' onClick={()=>{this.toggle()}}>CheckOut</button> */}
                            </tr>

                            
                        )
                    
                }
            })
        }
        
        }


    render () {
        
        return (
            <div>
                <div>
                <h1 className = 'justify'> LIST CART </h1>
                <table className="table table-hover mb-5">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">NAME</th>
                        <th scope="col">DESC</th>
                        <th scope="col">PRICE</th>
                        <th scope="col">PICTURE</th>
                        <th scope="col">JUMLAH</th>
                        <th scope="col">ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderList()}
                </tbody>
                </table>
                <button className = 'btn btn-danger m-1' onClick={()=>{this.toggle()}}>CheckOut</button>
                </div>
                
                <div>
                    <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader className="mx-auto">BAYAR</ModalHeader>
                    <ModalBody>
                        <table className="table table-hover mb-5">
                        <thead>
                            <tr>
                                <th scope="col">GAMBAR BARANG</th>
                                <th scope="col">NAMA BARANG</th>
                                <th scope="col">HARGA</th>
                                <th scope="col">JUMLAH</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.pembayaran()}
                            <tr>
                                <td><b>TOTAL BARANG = </b></td>
                                {this.totalJumlah()}
                            </tr>
                            <tr>
                                <td><b>TOTAL HARGA = </b></td>
                                {this.totalHarga()}
                            </tr>
                        </tbody>
                        </table>
                    </ModalBody>
                    <ModalFooter>
                        <Link   to={'/checkout'} >
                                <Button color="primary" 
                                        // onClick={()=>{this.bayar()}}
                                    >Bayar
                                </Button>
                        </Link>
                        
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                    </Modal>
                    <Modal isOpen={this.state.pay} toggle={this.togglePay} className={this.props.className}>
                    <ModalHeader className="mx-auto">SILAHKAN DATANG LAGI</ModalHeader>
                    <ModalBody>
                        THANK YOU FOR BUYING OUR PRODUCTS!
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" href='/'>CANCEL</Button>
                    </ModalFooter>
                    </Modal>
                </div>    
            </div>
            
        )



    }

}

const mapStateToProps = state => {
    return {
        user: state.auth // {id, username}
    }
}

export default connect(mapStateToProps) (Cart)

