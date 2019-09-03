import React, { Component } from 'react'
import axios from '../config/axios'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';



class ManageProduct extends Component {

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
    

    delete = (i) => {

        axios.delete('/products/' + i)
        .then(res =>  
            this.getProduct(),
            console.log(i)
            )
        
    }

    edit = () => {
        
        const formData = new FormData()
        
        //const avatar = this.avatar.files[0]
        const name_product = this.state.nama
        const data_category = this.state.selected_category
        const description = this.state.desc
        const price = this.state.price
        const quantity = this.state.quantity
    
        
        formData.append('avatar', this.state.avatar)
        formData.append('name_product', name_product)
        formData.append('category_id', data_category)
        formData.append('description', description)
        formData.append('price', price)
        formData.append('quantity', quantity)
        console.log(this.state.avatar)
        console.log(data_category)
        console.log(name_product)
        console.log(description)
        console.log(price)
        console.log(quantity)
        
        axios.patch(
            '/products/' + this.id.value,
            formData
        ).then (res => {
            console.log(res.data)
        })
    }

    onBtnSearch = () => {
        const name = this.name.value
        const min = parseInt(this.min.value)
        const max = parseInt(this.max.value)
        const category_product = this.state.selected_category
        // const category = this.state.categories
        console.log(this.state.searchProducts)
        console.log(name)
        console.log(min)
        console.log(max)
        console.log(category_product)
        console.log(this.state.searchProducts)
        var arrSearch = this.state.searchProducts.filter(item => {
            // console.log(item.category_product)
            // tinggal ditambahin name min and max tanpa kategori
            // tinggal ditambahin kategori sama min
            //tinggal ditambahin kategori sama max
            // tinggal ditambahin min dan max
            if(isNaN(min) && isNaN(max) && category_product == null) { // search by name
                return (item.name_product.toLowerCase().includes(name.toLowerCase()))
            }
            else if(isNaN(min) && isNaN(max)){ // Search by Name and category
                return (
                    item.name_product.toLowerCase().includes(name.toLowerCase()) &&  item.category_id == category_product
                )
             } else if (!name && isNaN(min) && isNaN(max)) { //search by category
                return (
                    item.category_id == category_product)
             } else if (isNaN(min)) { // search by name and max and category
                return (item.name_product.toLowerCase().includes(name.toLowerCase())
                    &&
                    item.price <= max)
                    &&
                    item.category_id == category_product
             } 
             else if(isNaN(max)){ // search by Name and Min & category
                return (
                    item.name_product.toLowerCase().includes(name.toLowerCase())
                    &&
                    item.price >= min
                    &&
                    item.category_id == category_product
                )
            } else if (!name && isNaN(max) && category_product == null) { // search by min
                return (
                    item.price >= min
                )
            } else if (!name && isNaN(min) && category_product == null) { // search by max
                return (
                    item.price <= max
                )
            }
                else {            // Name & Min & Max & category
                return (
                    // Semua string itu mengandung string kosong (true)
                    item.name_product.toLowerCase().includes(name.toLowerCase())
                    &&
                    item.price >= min
                    &&
                    item.price <= max
                    &&
                    item.category_product == category_product
                )
            }
        })
        console.log(arrSearch)
        this.setState({products: arrSearch})
        //console.log(category)
    }

    renderList = () => {
       
        return this.state.products.map( item => { // {id, name, price, desc, src}
            return (
                
                <tr key={item.id}>
                    {/* <td>{item.id}</td> */}
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
                            // untuk nembak ke value id untuk toggle id tertentu
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
                    <div>
                      {/* <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button> */}
                      <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                        <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
                        <ModalBody>
                            <div>
                            <input className='form-control' type='hidden' value = {this.state.id}
                                    ref={input => {this.id = input}}/>
                            {/* <label htmlFor="name">Name</label> */}
                            NAME_PRODUCT
                            <input className='form-control' type='text'  
                                    
                                    ref={input => {this.nama = input}}
                                    onChange={event => {
                                        this.setState({nama: event.target.value})
                                                // console.log(e.target.files)
                                            }}
                                    
                                    /> 
                            KATEGORI
                            <select onChange={event => {
                                        //console.log(event.target.value)
                                        this.setState({selected_category: event.target.value})
                                    }} className="form-control">
                                        {this.state.categories}
                            </select>
                            DESCRIPTION
                            <input className='form-control' type='text' 
                                    ref={input => {this.desc = input}}
                                    onChange={event => {
                                        this.setState({desc: event.target.value})
                                                // console.log(e.target.files)
                                            }}
                                    />
                            PRICE
                            <input className='form-control' type='number' 
                                    ref={input => {this.price = input}}
                                    onChange={event => {
                                        this.setState({price: event.target.value})
                                                // console.log(e.target.files)
                                            }}
                                    />
                            QUANTITY
                            <input className='form-control' type='number'
                                    ref={input => {this.quantity = input}}
                                    onChange={event => {
                                        this.setState({quantity: event.target.value})
                                                // console.log(e.target.files)
                                            }}
                                    />
                            PHOTO
                            <input type='file' ref={input => {this.avatar = input}}  onChange={event => {
                                this.setState({avatar: event.target.files[0]})
                                        // console.log(e.target.files)
                                    }}/>    
                            </div>
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
                            {this.renderList()}
                        </tbody>
                    </table>
                    <h1 className="display-4 text-center">Search Product</h1>
                    <table className="table text-center">
                        <thead>
                            <tr>
                            {/* <th scope="col">ID</th> */}
                                <th scope="col">NAME</th>
                                <th scope="col">CATEGORY</th>
                                <th scope="col">MIN</th>
                                <th scope="col">MAX</th>
                                <th scope="col">ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="col"><input ref={input => this.name = input} className="form-control" type="text" /></th>
                                <th scope="col">
                                    {/* <input ref={input => this.category = input} className="form-control" type="text" /> */}
                                    <select onChange={event => { 
                                        //console.log(event.target.value)
                                        this.setState({selected_category: event.target.value})
                                    }} className="form-control">
                                        {this.state.categories}
                                    </select>
                                </th>
                                <th scope="col"><input ref={input => this.min = input} className="form-control" type="number" /></th>
                                <th scope="col"><input ref={input => this.max = input} className="form-control" type="number" /></th>
            
                                <th scope="col"><button className="btn btn-outline-warning" onClick={this.onBtnSearch}>Search</button></th>
                            </tr>
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
            return <Redirect to='/loginadmin'/>
        }
        
}


const mapStateToProps = state => {
    return {
        admin: state.admin // {id, username}
    }
}

export default connect(mapStateToProps)(ManageProduct)
//export default ManageProduct