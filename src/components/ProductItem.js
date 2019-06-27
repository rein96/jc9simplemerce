import React, { Component } from 'react'


// <ProductItem products={this.state.products}  />

class ProductItem extends Component {
    render(){
        return (
            <div className="card col-3 m-5" key={this.props.key}>
                <img src={this.props.product.src} className="card-img-top"/>
                <div className='card-body'>
                    <h5 className='card-title'> {this.props.product.nama} </h5>
                    <p className='card-text'> {this.props.product.desc} </p>
                    <p className='card-text'> $ {this.props.product.price} </p>
                    <input type='text' className="form-control mb-3"/>
                    <button className="btn btn-outline-primary btn-block">Details</button>
                    <button className="btn btn-primary btn-block">Add To Cart</button>
                </div>
            </div>
        )
    }
}

export default ProductItem