import axios from '../config/axios'
import cookies from 'universal-cookie'

const cookie = new cookies()

export const onLogin = (da_email, da_password) => {

    return (dispatch) => {
        axios.post(
            '/users/auth',
            {
                email: da_email,
                password: da_password
            }
        ).then(res => {
            console.log(res.data)
            // Jika data salah, res.data berisi string
            if(typeof(res.data) == 'string'){
                // Print errornya
                console.log('Eror: ' + res.data)
                alert('email atau password salah')
            } else {

                // Simpan id dan name di cookie
                cookie.set(
                    'dataUser',
                    {
                        id: res.data.id,
                        username: res.data.username
                    }
                )

                // Kirim id dan name ke redux
                dispatch({
                    type: 'LOGIN_SUCCESS',
                    payload: {
                        id: res.data.id,
                        username: res.data.username // payload berisi data yang akan di state
                    }
                })
            }
        }).catch(err => {
            console.log(err)
            alert("email atau password salah")
        })
    }

}

/// coba dipahami lagi 
//// 
export const keepLogin = (user) => {
    return {
        type: 'LOGIN_SUCCESS',
        payload: {
            id: user.id,
            name: user.username
        }
    }
}

export const logoutUser = () => {
    cookie.remove(`dataUser`)
    return { type: `LOGOUT_SUCCESS` }
 }

 export const onLoginAdmin = (email,password) =>{
    return(dispatch)=>{
        if(email === '' || password === ''){
            alert('ISI EMAIL DAN PASSWORDNYA BROK!')
        }else{
            axios.post('/admin/login',
                {
                    email,
                    password
                }
            ).then(res=>{
                if(typeof(res.data) === 'string'){
                    console.log('Eror: ' + res.data)
                }else{
                    console.log(res)
                    
                    dispatch({
                        type:'ADMIN_LOGIN_SUCCESS',
                        payload:{
                            id: res.data.id,
                            username: res.data.username,
                            email: res.data.email
                        }
                    })

                    cookie.set('admin',{id : res.data.id, username: res.data.username, email: res.data.email})

                   
                }
            })
        }
    }
}

export const onAdminLogout = () =>{
   
    cookie.remove('admin')
    return{
        type:'ADMIN_LOGOUT_SUCCESS'
    }
}

export const keepLogin_admin = (admin) =>{
    return{
        type:'ADMIN_LOGIN_SUCCESS',
        payload:{
            id: admin.id,
            username: admin.username,
            email: admin.email
        }
    }
}