import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'

import { connect } from 'react-redux'
import axios from 'axios';


class ProductItem extends Component {

    //const id itu dari id user dari redux, buat patokan table cart
   

    


    addToCart = () => {
        var quantity = Number.parseInt(this.quantity.value)
        const id = this.props.user.id
        // const nama =    this.props.item.nama
        // const deskripsi =  this.props.item.desc
        // const price = this.props.item.price
        // const picture = this.props.item.src
        const product_id = this.props.item.id
        // console.log(jumlah)
        
        // get cart untuk tau itu udah ada apa belum di cart
        // get cart ini hanya nampilin cart_product dengan id cart yang belom verified atau dibuang
        if(quantity > 0 && id !== ""){
                axios.get(
                    'http://localhost:2019/cart_product/' + product_id
                ).then( res => {
                    var newQuantity = res.data.quantity 
                    console.log(newQuantity)
                    //console.log(res.data.length)
                    if(res.data) 
                // kalau udah ada, jadinya nge get cart buat dapetin quantity lama buat di jumlahkan sama quantity baru
                // nanti di back end udah ada logicnya, menentukan jumlah quantity itu lebih besar ga dari product.quantity 
                    {
                        // axios.get('http://localhost:2019/cart_product/' + product_id).then(res => {
                            axios.patch('http://localhost:2019/cart_product/' + product_id, {
                                quantity: newQuantity + quantity
                            }).then(res => {
                                alert('QUANTITY DITAMBAHKAN')
                            }).catch(error => {
                                console.log(error)
                                alert('DILARANG INPUT MELEBIHI STOCK')
                            })
                                    
                            //})
                      
                     }
                        
                     else { 
                        axios.post('http://localhost:2019/cart_product',
                        {
                            id, product_id, quantity
                            //idBarang: idBarang,
                            
                        
                            //price: price,
                            // picture: picture,
                            // deskripsi: deskripsi
                        }).then(res=>{
                            alert('ADD NEW PRODUCT TO CART')
                            // document.location.reload(true)
                        }).catch(error => {
                            console.log(error)
                            alert('DILARANG INPUT MELEBIHI STOCK')
                        })
                    }
                })    
        } else {
            if(id === ""){ 
               
                alert('LOGIN PLEASE!!')
                //return <Redirect to='/login'/>
                
                // nanti disini render buat pindah halaman
            } else{ 
                alert('ISI DULU JUMLAHNYA')
            }
            
        }
        
    }


    render(){
        console.log(this.props)
        return (
            <div className="card col-3 m-5">
                <img className='list' alt='' style={{width: 150, height: 150}} src={`http://localhost:2019/products/avatar/${this.props.item.avatar}`}/>
                <div className='card-body'>
                    <h5 className='card-title'> {this.props.item.name_product}</h5>
                    <p className='card-text'> {this.props.item.category_product}</p>
                    <p className='card-text'> {this.props.item.description}</p>
                    <p className='card-text'>Rp {this.props.item.price}</p>
                    <p className='card-number'> {this.props.item.quantity}</p>
                    <input ref={input => this.quantity = input} className="form-control" defaultValue="0" type="number"/> 
                    <Link to={'/DetailProduct/' + this.props.item.id}>
                        <button className='btn btn-outline-primary btn-block'>Details</button>
                    </Link>
                    <button onClick={this.addToCart}>Add To Cart</button>
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


export default connect(mapStateToProps)(ProductItem)