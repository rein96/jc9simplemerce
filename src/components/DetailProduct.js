import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { addToCart } from '../actions/index'

class DetailProduct extends React.Component {

    state = {
        product: {}
    }

    componentDidMount() {
        let productID = this.props.match.params.product_id

        // // Alternative using params
        // axios.get('http://localhost:2019/products/', {
        //     params: {
        //         id: productID
        //     }
        // }).then( res => {
        //     console.log(res.data);
        // } )
    
        // Without params
        axios.get('http://localhost:2019/products/' + productID)
        .then( res => {
            console.log(res.data);
            this.setState( { product : res.data } )

        })
    }

    handleClick = (id) => {
        const inputQuantity = parseInt(this.quantity.value);
        console.log(inputQuantity)

        if ( isNaN(inputQuantity) ) {
            alert('Hey please input the quantity');
        } else {
            this.props.addToCart(id, inputQuantity);
        }
        
    }

    renderProduct = () => {

        var { nama, price, desc, src, id } = this.state.product 
        return (
            <div className='card col-6 mt-5 mx-auto'>
                <img className='card-img-top' src={src} />
                <div className='card-body'>
                    <h3 className ='card-title'>Product: {nama}</h3>
                    <p className='card-text'>Description: {desc}</p>
                    <p className='card-text'>Price: $ {price}</p>
                    <input ref={input => this.quantity = input}  type='number' placeholder="Quantity" className="form-control mb-3"/>
                    <button className='btn btn-primary' onClick={ () => { this.handleClick(id) } }>Add To Cart</button>
                </div>
            </div>
        )
    }

    // this.props.match.params.product_id (misal product_id = 2)
    // /detailproduct/:product_id - >definisi

    render(){
        return (
            <div>
                <center> <h5> Detail produk for {this.props.match.params.product_id} </h5>  </center>
                {this.renderProduct()}
                
                
            </div>
        )
    }
}

export default connect( null, {addToCart} )(DetailProduct);   