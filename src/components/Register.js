import React, { Component } from 'react';
import axios from 'axios';


class Register extends Component {

    onClickButton = () => {
        // harus arrow function untuk bisa mengacu "this" accurately
        const inputUsername = this.username.value
        const inputEmail = this.email.value.toLowerCase()
        const PASSWORD = this.password.value

        // kalo value nya kosong
        if (inputUsername == '' || inputEmail == '' || PASSWORD == '') {
            alert('You must input your username, email, and password')

        // kalo value nya 3 3 nya keisi
        } else {
             // GET axios.get -> request data
                axios.get('http://localhost:2019/users', {
                    params: {
                        username: inputUsername,
                    }
                }).then( res => {
                    console.log('%c res', 'color:orange; font-weight:bold;');
                    console.log(res)

                    if (res.data.length > 0) {
                        alert( 'The username had been registered, please use different username :) ' )
                    } else if (res.data.length == 0) {
                        axios.get('http://localhost:2019/users', {
                            params: {
                                email : inputEmail
                            }
                        }).then( res2 => {
                            console.log('%c res2', 'color:orange; font-weight:bold;');
                            console.log(res2)

                            if (res2.data.length > 0) {
                                    alert( 'The email had been registered, please use different email') 
                            } else {
                                // POST axios.post  -> post / menaruh data
                                axios.post('http://localhost:2019/users', {
                                    // .trim() -> remove whitespaces (ilangain spasi yang gak kepake)
                                    username: inputUsername.trim(),
                                    email:inputEmail.trim(),
                                    password:PASSWORD.trim()
                                }).then( (res3) => {
                                    console.log('%c res3', 'color:orange; font-weight:bold;');
                                    console.log(res3);
                                    alert('Registration success! Thankyou for your participation :)')
                                }).catch( (err) => {
                                    console.log(err);
                                } )

                            }
                        })
                    }
                }).catch( err => {
                    console.log(err)
                })
        }
    } 

    render() {
        return (
            <div>

                <div className="mt-5 row">
                    <div className="card col-sm-4 mx-auto">
                        <div className="card-body">
                            <div className="border-bottom border-secondary card-title">
                                <h2>Register</h2>
                            </div>
                            
                            <div className="card-title">
                                <h4>Username</h4>
                            </div>

                            <form className="input-group">
                                <input className="form-control" type="text"
                                    ref= { (inputUsername) => {this.username = inputUsername} }
                                />
                            </form>

                            <div className="card-title">
                                <h4>Email</h4>
                            </div>

                            <form className="input-group">
                                <input className="form-control"
                                    ref= { (inputEmail) => {this.email = inputEmail } }
                                />
                            </form>

                            <div className="card-title">
                                <h4>Password</h4>
                            </div>

                            <form className="input-group">
                                <input className="form-control" type="password" 
                                    ref= { (inputPassword) => {this.password = inputPassword } }
                                />
                            </form>

                            <button className="btn btn-success mt-3" onClick={this.onClickButton} >Click for Register</button>
                            
                        </div>
                    </div>
                </div>  

            </div>
        )
        // mx-auto = margin horizontal ketengah
        // kalo mau pake "col", harus dibungkus "row"
    }
}

export default Register