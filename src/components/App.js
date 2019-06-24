import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom'

import Register from './Register';
import Home from './Home';
import Header from './Header';
import Login from './Login';
import ManageProduct from './ManageProduct';



class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Header/>
                    
                    <Route path="/" exact component={Home} />
                    <Route path="/register" component={Register} />
                    <Route path="/login" component={Login} />
                    <Route path="/manageproduct" component={ManageProduct} />
                </div> 
            </BrowserRouter>
                
        )
    }
}

export default App