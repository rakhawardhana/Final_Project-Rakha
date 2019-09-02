import React, { Component } from 'react'
import axios from '../config/axios'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';



class CheckoutAdmin extends Component {

    constructor(props) {
        super(props);
        this.state = {
          products: [],
          modal: false,
          id: null,
          categories: [], 
          selected_category: null, // berisi id category
          searchProducts: [],
          // buat edit
          avatar: null,
          nama: null, 
          desc: null, 
          price: null,
          quantity: null
        };
    
        this.toggle = this.toggle.bind(this);
    }

    
    toggle() {
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
    }

    componentDidMount(){
        

        // kan dia setState ke products, nah products itu isinya res.data yang merupakan array of object. 

        axios.get('/products')
            .then(res => {
               this.setState({products: res.data, searchProducts: res.data })
            })

        // di state ditambah array baru, array kategori buat nampilin kategori di rendernya. 
        axios.get('/categories/')
            .then((res) =>{
                this.setState({categories: res.data.map(c => <option value={c.id}>{c.category_product}</option>)})
            })
    }

    getProduct = () => {
        axios.get('/products')
            .then(res => {
               this.setState({products: res.data})
            })
    }
    
    onButtonClick = () => {

        const formData = new FormData()
        
        const avatar = this.avatar.files[0]
        const data_name = this.nama.value
        const data_category = this.state.selected_category
        const data_description = this.desc.value
        const data_price = this.price.value
        const data_quantity = this.quantity.value
    
        // field
        formData.append('avatar', avatar)
        formData.append('name_product', data_name)
        formData.append('category_id', data_category)
        formData.append('description', data_description)
        formData.append('price', data_price)
        formData.append('quantity', data_quantity)
    
        axios.post(
            '/products',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                
            }
        ).then (res => {
            console.log(res.data)
            // value category_id nya berupa id, bukan category_product
        })
        
    }
    

    

  
    renderList = () => {
       
        return this.state.products.map( item => { // {id, name, price, desc, src}
            return (
                
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name_product}</td>
                    <td>{item.category_product}</td>
                    <td>{item.description}</td>
                    <td>{item.price}</td>
                    <td>{item.quantity}</td>
                    <td><img className='list' alt='' style={{width: 150, height: 150}} src={`http://localhost:2019/products/avatar/${item.avatar}`}/></td>
                    {/* <td>
                        <img className='list' src={item.src}/>
                    </td> */}
                    <td>
                        <button className = 'btn btn-primary' onClick={() => {
                            this.toggle()
                            this.setState({id: item.id})
                            }}>Edit</button>
                        <button className = 'btn btn-warning' onClick={()=>{this.delete(item.id)}} >Delete </button>
                    </td>
                </tr>
                //onClick={() => {this.delete(item)}}
                
            )
        })
    }
    render () {
        if (this.props.admin.id) {
            return (
                <div className="container">
                    <h1 className="display-4 text-center">THIS TRANSACTION NEED TO BE VERIFIED</h1>
                    <table className="table table-hover mb-5">
                        <thead>
                            <tr>
                                {/* <th scope="col">ID</th>
                                <th scope="col">NAME</th>
                                <th scope="col">CATEGORY</th>
                                <th scope="col">DESC</th> */}
                                <th scope="col">PRICE_SUM</th>
                                <th scope="col">TRANSFER AVATAR</th>
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