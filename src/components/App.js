import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
//import { BrowserRouter, Route } from 'react-router-dom'
import cookies from 'universal-cookie'
import {connect} from 'react-redux'
import {keepLogin} from '../actions'
import {keepLogin_admin} from '../actions'
import LoginAdmin from './LoginAdmin'
import Home from './Home'
import Header from './Header'
import Footer from './Footer'
import About from "./Aboutus";
import Register from './Register'
import Login from './Login'
import Item from './Item'
import ManageProduct from './ManageProduct'
import DetailProduct from './DetailProduct'
import Profile from './Profile'
import EditProfile from './EditProfile'
import Cart from './Cart'

//const cookie = new cookies()
const cookie = new cookies()
class App extends Component {

    componentWillMount(){
        var user = cookie.get('dataUser')
        var admin = cookie.get('admin')
        // User pada cookie di temukan
        if(user){
            // Kirim id dan name ke redux
            this.props.keepLogin(user)
        }
        if(admin) {
            this.props.keepLogin_admin(admin)
        }
    }

    render() {
        return (
            // <h1>App Component</h1>

            <BrowserRouter>
                <div>
                  <Header/>
                     <Route path="/" exact component={Home}/> {/* equal, ===  */}
                     <Route path='/register' component={Register}/>
                     <Route path='/login' component={Login}/>
                     <Route path='/loginadmin' component={LoginAdmin}/>
                     <Route path="/manageproduct" component={ManageProduct}/> {/* include() */}
                     <Route path='/detailproduct/:id' component={DetailProduct}/>
                     <Route path="/Aboutus" component={About}/>
                     <Route path='/Item' component={Item}/>
                     <Route path='/profile' component={Profile}/>
                     <Route path='/editprofile' component={EditProfile}/>
                     <Route path='/cart' component={Cart}/>
                  {/* <Footer/> */}
                </div>


            </BrowserRouter>
        )
    }
}


// export default App 

export default connect(null, {keepLogin, keepLogin_admin})(App)
