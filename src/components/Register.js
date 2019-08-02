import React, { Component } from 'react'
import axios from '../config/axios'


class Register extends Component {

    
    onButtonClick = () => {
        const name = this.name.value
        const age = this.age.value
        const email = this.email.value
        const password = this.password.value

        axios.post(
            '/users/input',
            {
                name, age, email, password
            }
        ).then(res => {
            console.log(res)
        }).catch(error => {
            console.log(error)
        })
        

    }

    render () {
        // var name = this.name.value
        // var email = this.email.value
        // var age = this.age.value
        
        return (
            <div className='container'>
                    <form>
                        <h1>REGISTER</h1>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input ref={input => this.name = input} type="text" className="form-control"  />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email address</label>
                            <input ref={input => this.email = input} type="email" className="form-control"  />
                            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="age">Age</label>
                            <input ref={input => this.age = input} type="number" className="form-control"  />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input ref={input => this.password = input} type="password" className="form-control" />
                        </div>
        
                    </form>
                    
                    <button
                        className='btn btn-primary'
                        onClick={this.onButtonClick}
                    >CLICK FOR REGISTER</button>
                </div>
        )

    }



}

export default Register