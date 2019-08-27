import React, { Component } from 'react'
import axios from '../config/axios'


class Register extends Component {



    
    onButtonClick = () => {
        const first_name = this.first_name.value
        const last_name = this.last_name.value
        const username = this.username.value
        const email = this.email.value
        const gender = this.gender.value
        const password = this.password.value

        axios.post(
            '/users',
            {
                first_name, last_name, username, email, gender, password
            }
        ).then(res => {
            console.log(res)
            alert("DATA BERHASIL DI INPUT")
        }).catch(error => {
            console.log(error)
        })
        

    }

    render () {
        // var name = this.name.value
        // var email = this.email.value
        // var age = this.age.value
        
        return (
            <div className='container' style={{paddingBottom: "100px"}}>
                    <form>
                        <h1>REGISTER</h1>
                        <div className="form-group">
                            <label htmlFor="name">First Name</label>
                            <input ref={input => this.first_name = input} type="text" className="form-control"  />
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Last Name</label>
                            <input ref={input => this.last_name = input} type="text" className="form-control"  />
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Username</label>
                            <input ref={input => this.username = input} type="text" className="form-control"  />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email address</label>
                            <input ref={input => this.email = input} type="email" className="form-control"  />
                            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        {/* <div className="form-group">
                            <label htmlFor="age">gender</label>
                            <input ref={input => this.gender = input} type="number" className="form-control"  />
                        </div> */}
                         <div className="form-group mt-2">
                         <label htmlFor="gender">Gender</label>
                                <select ref={input => this.gender = input} className="custom-select" id="inputGroupSelect01">
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input ref={input => this.password = input} type="password" className="form-control" />
                        </div>
                        <div>
                             <button
                                className='btn btn-primary'
                                 onClick={this.onButtonClick}
                                    >CLICK FOR REGISTER
                                </button>
                        </div>     
                    </form>
                    
                    {/* <button
                        className='btn btn-primary'
                        onClick={this.onButtonClick}
                    >CLICK FOR REGISTER
                    </button> */}


                </div>
        )

    }



}

export default Register