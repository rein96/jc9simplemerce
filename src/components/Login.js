import React from 'react';

import { Link } from 'react-router-dom';

class Login extends React.Component {

    render() {
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
}

export default Login;