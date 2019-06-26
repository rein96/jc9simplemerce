import axios from 'axios';

// Action creator

export const onLoginUser = (inputUsername, inputPassword) => {

    return (dispatch) => {  // dispatch adalah function

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

                dispatch({      //dispatch parameternya {obj} => function( {obj} )
                    type: 'LOGIN_SUCCESS',
                    payload : {
                        id: res.data[0].id,
                        username: res.data[0].username
                    }
                })
            }
            else if (res.data.length == 0) {
                alert(' Oops, username atau password anda salah :( ')
            }
        }).catch( err => {
            console.log(err);
            alert('Server error')
        })
    }  
}

export const onLogoutUser = () => {
    // tidak butuh payload, karena log out gak bawa apapun ke state
    return {
        type: 'LOGOUT_SUCCESS'
    }
}