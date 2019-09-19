import React, { Component } from 'react'
import axios from 'axios'

class DetailProduct extends Component {

    state = {
        product: {
            id: '',
            name: '',
            price: '',
            avatar: ''
        }
    }

    componentDidMount() {

            let pro_id = this.props.match.params.id
    
            axios.get('http://localhost:2019/products/' + pro_id)
            .then(res => {
                console.log(res.data.length)
                this.setState({
                    product: res.data
                })
            })
        
        // axios.get(
        //     'http://localhost:2019/products',
        //     {
        //         params: {
        //             id: this.props.match.params.product_id
        //         }
        //     }
        // )
    }

    // renderList() {

        // let pro_id = this.props.match.params.product_id
    
        // axios.get('http://localhost:2019/products/' + pro_id)
        // .then(res => {
        //     this.setState(res.data)
        // })


    //}


    // addToCart = () => {
    //     const jumlah = this.name.value
    //     console.log(jumlah)


    // }



    render() {
        // this.props.match.params.product_id
        // return (
        //     <h1>Detail Product: {this.renderList()} </h1>
        // )

        var {name_product, description, price, avatar, quantity, category_id} = this.state.product
        // this.props.match.params.product_id
        // /detailproduct/:product_id -> definisi
        // /detailproduct/78 -> menggunakan
        return (
            <div className='card col-6 mt-5 mx-auto'>
                {/* <img className='card-img-top' src={avatar} /> */}
                <img className='list' alt='' style={{width: 150, height: 150}} src={`http://localhost:2019/products/avatar/${avatar}`}/>
                <div className='card-body'>
                    <h3 className ='card-title'>Product: {name_product}</h3>
                    <p className='card-text'>Quantity: {quantity}</p>
                    <p className='card-text'>Description: {description}</p>
                    <p className='card-text'>Price: Rp.{price}</p>
                    <p className='card-text'>Price: Rp.{quantity}</p>
                    {/* <form className="input-group my-3"><input ref={input => this.name = input} className="form-control" defaultValue="0" type="number"/></form>
                    <button className='btn btn-primary'  >Add To Cart</button> */}
                </div>
            </div>
        )
    }
    
}

export default DetailProduct