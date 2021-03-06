import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { onLoginUser } from '../actions/index'

class Login extends React.Component {
    // Make a function
    onClickButton = () => {    
        // get value text input
        const inputUsername = this.username.value.toLowerCase().trim();
        const inputPassword = this.password.value;

        // get from database
        this.props.onLoginUser(inputUsername, inputPassword);
    }


    render() {

        // Belom login -> Login page
        if( this.props.STATEUSER.username === '' ) {
            return (
                <div>
    
                    <div className="mt-5 row">
                        <div className="card col-sm-4 mx-auto">
                            <div className="card-body">
                                <div className="border-bottom border-secondary card-title">
                                    <h2>Login</h2>
                                </div>
                                
                                <div className="card-title">
                                    <h4>Username</h4>
                                </div>
    
                                <form className="input-group">
                                    <input className="form-control" type="text"
                                        ref= { (inputUsername) => {this.username = inputUsername} }
                                    />
                                </form>
    
                                {/* <div className="card-title">
                                    <h4>Email</h4>
                                </div>
    
                                <form className="input-group">
                                    <input className="form-control"
                                        ref= { (inputEmail) => {this.email = inputEmail } }
                                    />
                                </form> */}
    
                                <div className="card-title">
                                    <h4>Password</h4>
                                </div>
    
                                <form className="input-group">
                                    <input className="form-control" type="password" 
                                        ref= { (inputPassword) => {this.password = inputPassword } }
                                    />
                                </form>
    
                                <button className="btn btn-success mt-3" onClick={this.onClickButton} >Click for Login</button>
                                
                                {/*  */}
                                <p>Belum memiliki akun ? <Link to="/register"> Daftar disini  </Link> </p>
                            </div>
                        </div>
                    </div>  
    
                </div>
            )
        }

        // kalo udah login -> redirect
        return <Redirect to='/' />

    }
}


const mapStateToProps = (state) => {
    return {
        STATEUSER: state.auth
    }
}

export default connect(mapStateToProps, {onLoginUser} )(Login);