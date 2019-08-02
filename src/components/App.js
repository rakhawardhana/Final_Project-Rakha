import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
//import { BrowserRouter, Route } from 'react-router-dom'
//import cookies from 'universal-cookie'
//import {connect} from 'react-redux'
//import {keepLogin} from '../actions'
import Home from './Home'
import Header from './Header'
import Footer from './Footer'
import About from "./Aboutus";
import Register from './Register'
import Login from './Login'
//import Profile from './Profile'
//import EditProfile from './EditProfile'

//const cookie = new cookies()

class App extends Component {

    // componentWillMount(){
    //     var user = cookie.get('dataUser')

    //     // User pada cookie di temukan
    //     if(user){
    //         // Kirim id dan name ke redux
    //         this.props.keepLogin(user)
    //     }
    // }

    render() {
        return (
            // <h1>App Component</h1>

            <BrowserRouter>
                <div>
                  <Header/>
                     <Route path="/" exact component={Home}/> {/* equal, ===  */}
                     <Route path='/register' component={Register}/>
                     <Route path='/login' component={Login}/>
                     <Route path="/Aboutus" component={About}/>
                  <Footer/>
                </div>


            </BrowserRouter>
        )
    }
}


// export default App 

//export default connect(null, {keepLogin})(App)
export default App