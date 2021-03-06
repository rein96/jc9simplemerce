import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import Checkout from './Checkout';
import { removeItemSingleCart } from '../actions/index'

class Cart extends React.Component {

    removeItemCart = (id) => {
        this.props.removeItemSingleCart(id)
    }

    // render items (myCart) on tables
    renderCart = () => {
        if ( this.props.STATEauth.myCart.length > 0 ) {
            return(
                this.props.STATEauth.myCart.map( el => {
                    return (
                        <tr key={this.props.STATEauth.id}>
                            <td>
					        	<div className="row">
									<div className="col-lg-2 Product-img">
										<img src={el.src} alt="A Car" className="img-responsive" style={ { width: '300px' } } />
									</div>
								</div>
					        </td>

                            <td> 
                                <div className="col-lg-10">
                                    <b>{el.nama}</b>
                                </div> 
                            </td>
                            <td> <p>{el.desc}</p> </td>
					        <td> $ {el.price} </td>
					        <td>
								 {el.quantity} Units
							</td>
							<td> $ {el.quantity*el.price} </td>
                            <td> <button type="button" className="btn btn-danger" onClick={ () => {this.removeItemCart(el.id)} } > Remove </button> </td>
					        
                        </tr>
                    )
                } )
            )
        }
    }


    render() {
        return (
            <div className="container">
                <div className="col-lg-12 pl-3 pt-3">
                    {this.props.STATEauth.myCart.length === 0 ? (
                    <center>

                        <h3> No item available on your cart. </h3>
                        <h3> <Link to='/'> Buy products here  </Link></h3>
                        
                    </center>
                    ) : (
                        <div>
                            <center>
                                <h4> Here is your cart {this.props.STATEauth.username} </h4> 
                            </center>
                        </div>
                    ) }

                <table className="table table-hover border bg-white">
				    <thead>
				      	<tr>
					        <th><center> Image </center></th>
					        <th><center> Car </center></th>
                            <th>Desc</th>
					        <th>Price</th>
					        <th>Quantity</th>
					        <th>Subtotal</th>
                            <th> Action </th>
				      	</tr>
				    </thead>
				    <tbody>
                        {this.renderCart()}
				    </tbody>

        
				</table>

                { this.props.STATEauth.myCart.length > 0 ? (
                    <center>
                        <Checkout total={this.props.STATEauth.totalPrice} />
                    </center>
                    ) : '' }


                </div>


                
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        STATEauth : state.auth
    }
}


export default connect(mapStateToProps, { removeItemSingleCart })(Cart);