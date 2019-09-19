import React, { Component } from 'react'
import axios from '../config/axios'

import ProductItem from './ProductItem'

class Item extends Component {

    state = {
        products: [],
        searchProducts: []
        //searchCategory: []
    }

    componentDidMount() {
        this.getProduct()

        // axios.get('/categories/')
        //     .then((res) =>{
        //         this.setState({categories: res.data.map(c => <option value={c.id}>{c.category_product}</option>)})
        //     })
    
    }

    onBtnSearch = () => {
        const name = this.name.value
        const min = parseInt(this.min.value)
        const max = parseInt(this.max.value)
        const category_product = this.category_product.value
        console.log(this.state.searchProducts)
        console.log(min)
        console.log(max)
        console.log(category_product)
        //console.log(!name)
        let result = this.state.searchProducts
        if (name.length > 0) {
            console.log("name " + name)
            result = result.filter(item => item.name_product.toLowerCase().includes(name.toLowerCase()))
        }
        if (category_product.length > 0) {
            result = result.filter(item => item.category_id == category_product)
        }
        if (!isNaN(min)) {
            result = result.filter(item => item.price >= min)
        }
        if (!isNaN(max)) {
            result = result.filter(item => item.price <= max)
        }
        // var arrSearch = this.state.searchProducts.filter(item => {
        //     // tinggal ditambahin name min and max tanpa kategori
        //     // tinggal ditambahin kategori sama min
        //     //tinggal ditambahin kategori sama max
        //     // tinggal ditambahin min dan max
        //     if(isNaN(min) && isNaN(max)){ // Search by Name 
        //         return (
        //             item.name_product.toLowerCase().includes(name.toLowerCase()) &&  item.category_product == category_product
        //         )
        //     //  if(item.name_product.toLowerCase().includes(name)) {
        //     //     item.name_product.toLowerCase().includes(name)
        //     // } else if (name === '') {
        //     //     return true
        //      } else if (item.category_product) { //search by category
        //         return (
        //             item.category_product == category_product)
        //      } else if (isNaN(min)) { // search by name and max and category
        //         return (item.name_product.toLowerCase().includes(name.toLowerCase())
        //             &&
        //             item.price <= max)
        //             &&
        //             item.category_product == category_product
        //      } 
        //      else if(isNaN(max)){ // search by Name and Min & category
        //         return (
        //             item.name_product.toLowerCase().includes(name.toLowerCase())
        //             &&
        //             item.price >= min
        //             &&
        //             item.category_product == category_product
        //         )
        //     } else {            // Name & Min & Max & category
        //         return (
        //             // Semua string itu mengandung string kosong (true)
        //             item.name_product.toLowerCase().includes(name.toLowerCase())
        //             &&
        //             item.price >= min
        //             &&
        //             item.price <= max
        //             &&
        //             item.category_product == category_product
        //         )
        //     }
        // })

        this.setState({products: result})

    }

    getProduct = () => {
        axios.get('/products')
            .then(res => {
                console.log(res.data)
               this.setState({products: res.data, searchProducts: res.data})
            })
    }

    renderList = () => {
        return this.state.products.map(item => {
            console.log(item);
            
            return (
                <ProductItem item={item}/> 
            ) 
        })
    }

    render () {
        return (
            <div className="row">
                <div className="col">
                    <div className="mt-5">
                        <div className="mx-auto card">
                            <div className="card-body">
                                <div className="border-bottom border-secondary card-title">
                                    <h1>Search</h1>
                                </div>
                                <div className="card-title mt-1">
                                    <h4>NAME</h4>
                                </div>
                                <form className="input-group"><input ref={input => this.name = input} className="form-control" type="text"/></form>
                                <div className="card-title mt-1">
                                    <h4>PRICE</h4>
                                </div>
                                <form className="input-group"><input placeholder="Minimum" ref={input => this.min = input} className="form-control mb-2" type="text" /></form>
                                <form className="input-group"><input placeholder="Maximum" ref={input => this.max = input} className="form-control" type="text" /></form>
                                <div className="card-title mt-1">
                                    <h4>CATEGORY</h4>
                                </div>
                                <select ref={input => this.category_product = input} className="custom-select" id="inputGroupSelect01">
                                    <option value=""></option>
                                    <option value="Automatic">Automatic</option>
                                    <option value="Manual">Manual</option>
                                    <option value="Grinder">Grinder</option>
                                </select>
                                <button onClick={this.onBtnSearch} className="btn btn-outline-secondary btn-block mt-5">Search</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row col-10">
                    {this.renderList()}
                </div>
            </div>
        )
    }
}

export default Item