import React from 'react';

import { Link } from 'react-router-dom';
import axios from 'axios';

class Login extends React.Component {
    // Make a function
    onClickButton = () => {    
        // get value text input
        const inputUsername = this.username.value.toLowerCase().trim();
        const inputPassword = this.password.value;

        // get from database
        axios.get('http://localhost:2019/users', {
            params: {
                username: inputUsername,
                password: inputPassword
            }
        }).then( (res) => {
            console.log(res);
            if (res.data.length > 0 ) {
                alert(res.data[0].username + ' berhasil login');
            }
            else if (res.data.length == 0) {
                alert(' Oops, username atau password anda salah :( ')
            }
        }).catch( err => {
            console.log(err);
            alert('Server error')
        })


    }


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