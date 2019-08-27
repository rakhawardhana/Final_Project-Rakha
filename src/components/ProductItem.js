import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios';


class ProductItem extends Component {


    addToCart = () => {
        const jumlah = Number.parseInt(this.name.value)
        const idUsername = this.props.user.id
        const nama =    this.props.item.nama
        const deskripsi =  this.props.item.desc
        const price = this.props.item.price
        const picture = this.props.item.src
        const idBarang = this.props.item.id
        console.log(jumlah)
        
     
        if(jumlah > 0 && idUsername !== ""){
                axios.get(
                    'http://localhost:2019/cart',
                    {
                        params: {
                        
                            idBarang: idBarang
                        } 
                    }
                ).then( res => {
                    if(res.data.length > 0) 
                
                    {
                        axios.get('http://localhost:2019/cart/' + idBarang).then(res => {
                            axios.patch('http://localhost:2019/cart/' + idBarang, {
                                jumlah: res.data.jumlah + jumlah
                            })
                                    return res.data.jumlah
                            })
                      
                        

                     }
                        
                     else { 
                        axios.post('http://localhost:2019/cart',
                        {
                            idUsername: idUsername,
                            idBarang: idBarang,
                            id: idBarang,
                            nama: nama,
                            jumlah: jumlah,
                            price: price,
                            picture: picture,
                            deskripsi: deskripsi
                        }).then(res=>{
                            alert('ADD NEW PRODUCT TO CART')
                            // document.location.reload(true)
                        })
                    }
                })    
        } else {
            if(idUsername === ""){ 
                alert('LOGIN PLEASE!!')
            } else{ 
                alert('ISI DULU JUMLAHNYA')
            }
            
        }
        
    }


    render(){
        return (
            <div className="card col-3 m-5">
                <img className='list' alt='' style={{width: 150, height: 150}} src={`http://localhost:2019/products/avatar/${this.props.item.avatar}`}/>
                <div className='card-body'>
                    <h5 className='card-title'> {this.props.item.name_product}</h5>
                    <p className='card-text'> {this.props.item.category_product}</p>
                    <p className='card-text'> {this.props.item.description}</p>
                    <p className='card-text'>Rp {this.props.item.price}</p>
                    <p className='card-number'> {this.props.item.quantity}</p>
                    <input ref={input => this.name = input} className="form-control" defaultValue="0" type="number"/> 
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