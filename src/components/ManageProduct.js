import React, { Component } from 'react'
import axios from '../config/axios'
// import {redirect} from 'react-router-dom'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';



class ManageProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {
          products: [],
          modal: false,
          id: null,
          categories: [],
          selected_category: null,
        };
    
        this.toggle = this.toggle.bind(this);
    }

    
    toggle() {
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
    }

    componentDidMount(){
        // Akses database // pengen ke load dulu, baru datanya.....
        // axios.get('/products/:id')
        //     .then(res => {
        //        this.setState({products: res.data})
        //     })
        axios.get('/products')
            .then(res => {
               this.setState({products: res.data})
            })
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
        })
        
    }
    

    delete = (i) => {

        axios.delete('/products/' + i)
        .then(res =>  {this.getProduct()})
        
    }

    edit = () => {
        
        const formData = new FormData()
        
        const avatar = this.avatar.files[0]
        const data_name = this.nama.value
        const data_category = this.state.selected_category
        const data_description = this.desc.value
        const data_price = this.price.value
        const data_quantity = this.quantity.value
    
        
        formData.append('avatar', avatar)
        formData.append('name_product', data_name)
        formData.append('category_id', data_category)
        formData.append('description', data_description)
        formData.append('price', data_price)
        formData.append('quantity', data_quantity)
        console.log(avatar)
        console.log(data_category)
        
        
        axios.patch(
            '/products/' + this.id.value,
            formData
        ).then (res => {
            console.log(res.data)
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
        return (
        <div className="container">
            <div>
              {/* <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button> */}
              <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
                <ModalBody>
                    <input className='form-control' type='hidden' value = {this.state.id}
                            ref={(input) => {this.id = input}}/>
                    <input className='form-control' type='text' 
                            ref={(input) => {this.nama = input}}/>
                    <select onChange={event => {
                                //console.log(event.target.value)
                                this.setState({selected_category: event.target.value})
                            }} className="form-control">
                                {this.state.categories}
                    </select>
                    <input className='form-control' type='text' 
                            ref={(input) => {this.desc = input}}/>
                    <input className='form-control' type='number' 
                            ref={(input) => {this.price = input}}/>
                    <input className='form-control' type='number'
                            ref={(input) => {this.quantity = input}}/>
                    <input type='file' ref={input => {this.avatar = input}}/>    
                </ModalBody>
                 <ModalFooter>
                   <Button color="primary"  onClick={() => {
                        this.toggle()
                        this.edit()}} >Do Something</Button>
                   {/* {' '} */}
                   <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                </ModalFooter>
              </Modal>
            </div>
            <h1 className="display-4 text-center">List Product</h1>
            <table className="table table-hover mb-5">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">NAME</th>
                        <th scope="col">CATEGORY</th>
                        <th scope="col">DESC</th>
                        <th scope="col">PRICE</th>
                        <th scope="col">QUANTITY</th>
                        <th scope="col">PICTURE</th>

                        <th scope="col">ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderList()}
                </tbody>
            </table>
            <h1 className="display-4 text-center">Input Product</h1>
            <table className="table text-center">
                <thead>
                    <tr>
                    {/* <th scope="col">ID</th> */}
                        <th scope="col">NAME</th>
                        <th scope="col">CATEGORY</th>
                        <th scope="col">DESC</th>
                        <th scope="col">PRICE</th>
                        <th scope="col">QUANTITY</th>
                        <th scope="col">PICTURE</th>
                        <th scope="col">ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="col"><input ref={input => this.nama = input} className="form-control" type="text" /></th>
                        <th scope="col">
                            {/* <input ref={input => this.category = input} className="form-control" type="text" /> */}
                            <select onChange={event => {
                                //console.log(event.target.value)
                                this.setState({selected_category: event.target.value})
                            }} className="form-control">
                                {this.state.categories}
                            </select>
                        </th>
                        {/* <th scope="col"><input ref={input => this.category = input} className="form-control" type="number" /></th> */}
                        <th scope="col"><input ref={input => this.desc = input} className="form-control" type="text" /></th>
                        <th scope="col"><input ref={input => this.price = input} className="form-control" type="number" /></th>
                        <th scope="col"><input ref={input => this.quantity = input} className="form-control" type="number" /></th>
                        {/* <th scope="col"><input ref={input => this.pict = input} className="form-control" type="text" /></th> */}
                        <th className='custom-file'>
                            <input type='file' ref={input => {this.avatar = input}}/>
                        </th>
    
                        <th scope="col"><button className="btn btn-outline-warning" onClick={this.onButtonClick}>Add</button></th>
                    </tr>
                </tbody>
            </table>
        </div>
    )
    }
}

export default ManageProduct