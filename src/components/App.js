import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom'
import cookies from 'universal-cookie';
import { connect } from 'react-redux' 

import Register from './Register';
import Home from './Home';
import Header from './Header';
import Login from './Login';
import ManageProduct from './ManageProduct';
import Cart from './Cart'
import DetailProduct from './DetailProduct'

import { keepLogin } from '../actions/index'

// New Object cookies()
const cookie = new cookies()

class App extends Component {

    // Untuk akses cookie
    componentDidMount() {
        // check cookie
        const objCookie =  cookie.get('USERNAMECOOKIE')  // {id, username} kalo tidak ditemukan -> undefined

        // kalo cookie ada isinya
        if (objCookie !== undefined ) {
            // login ulang
            this.props.keepLogin(objCookie)
        }
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Header/>
                    <Route path="/" exact component={Home} />
                    <Route path="/cart" component={Cart} />

                    <Route path="/register" component={Register} />
                    <Route path="/login" component={Login} />
                    <Route path="/manageproduct" component={ManageProduct} />
                    <Route path='/detailproduct/:product_id' component={DetailProduct} />
                </div> 
            </BrowserRouter>
                
        )
    }
}

export default connect ( null, {keepLogin} ) (App);     // null = mapStateToProps gak dipake