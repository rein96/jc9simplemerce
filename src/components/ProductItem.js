import React, { Component } from 'react'
import { addToCart } from '../actions/index'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import DetailProduct from './DetailProduct';

// <ProductItem product={this.state.products}  />

class ProductItem extends Component {


    handleClick = (id) => {
        const inputQuantity = parseInt(this.quantity.value);
        console.log(inputQuantity)

        if ( isNaN(inputQuantity) ) {
            alert('Hey please input the quantity');
        } else {
            this.props.addToCart(id, inputQuantity);
        }
        
    }

    render(){

        var {id,nama,price,src} = this.props.product    //from Home renderList

        return (
            <div className="card col-3 m-5" key={this.props.key}>
                <img src={src} className="card-img-top" alt="Gambar"/>
                <div className='card-body'>
                    <h5 className='card-title'> {nama} </h5>
                    {/* <p className='card-text'> {this.props.product.desc} </p> */}
                    <p className='card-text'> $ {price} </p>
                    <input ref={input => this.quantity = input}  type='number' placeholder="Quantity" className="form-control mb-3"/>
                    <Link to={ `/detailproduct/${id} ` } >

                       
                        <button className="btn btn-outline-primary btn-block">Details</button>
                        
                    </Link>
                    
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