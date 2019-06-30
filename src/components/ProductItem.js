import React, { Component } from 'react'
import { addToCart } from '../actions/index'
import { connect } from 'react-redux';

// <ProductItem product={this.state.products}  />

class ProductItem extends Component {


    handleClick = (id) => {
        this.props.addToCart(id);
    }

    render(){
        return (
            <div className="card col-3 m-5" key={this.props.key}>
                <img src={this.props.product.src} className="card-img-top" alt="Gambar"/>
                <div className='card-body'>
                    <h5 className='card-title'> {this.props.product.nama} </h5>
                    <p className='card-text'> {this.props.product.desc} </p>
                    <p className='card-text'> $ {this.props.product.price} </p>
                    <input type='text' className="form-control mb-3"/>
                    <button className="btn btn-outline-primary btn-block">Details</button>
                    <button className="btn btn-primary btn-block" onClick={ () => {this.handleClick(this.props.product.id)} }>Add To Cart</button>
                </div>
            </div>
        )
    }
}

// const mapDispatchToProps= (dispatch)=>{
    
//     return{
//         addToCart: (id)=>{dispatch(addToCart(id))}
//     }
// }

export default connect(null, { addToCart })(ProductItem);