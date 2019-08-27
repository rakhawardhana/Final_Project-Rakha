import React, { Component } from 'react'
import axios from '../config/axios';
import { connect } from 'react-redux'

class EditProfile extends Component {
// const formData = 'objek'

// const avatar = 'ambil foto'

// masukan avatar ke dalam form data


// const this. = properti

//new FormData() class formdata

// data.file[0]

// 
state = {
    data:null
}

onButtonClick = () => {

    const formData = new FormData()

    const avatar = this.avatar.files[0]
    const first_name = this.first_name.value
    const last_name = this.last_name.value
    const email = this.email.value
    

    // field
    formData.append('avatar', avatar)
    formData.append('first_name', first_name)
    formData.append('last_name', last_name)
    formData.append('email', email)
    // formData.append('password', data_password)

    axios.patch(
        '/users/' + this.props.userid,
        formData
    ).then (res => {
        console.log(res.data)
    })
    
}

componentDidMount() {
    // Get Profile
    axios.get('/users/' + this.props.userid)
        .then(res => {
            this.setState({data: res.data});
            
        })
}

render() {
    if(this.state.data){
        var {name, email, age} = this.state.data

        return (
                <div className='container'>
                    <form>
                        <h1>Edit Profile</h1>
                        <div className="form-group">
                            <label htmlFor="name">First Name</label>
                            <input ref={input => this.first_name = input} type="text" className="form-control" id="first_name" defaultValue={name}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="age">Last Name</label>
                            <input ref={input => this.last_name = input} type="text" className="form-control" id="last_name" defaultValue={age}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email address</label>
                            <input ref={input => this.email = input} type="email" className="form-control" id="email" defaultValue={email}/>
                            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        {/* <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input ref={input => this.password = input} type="password" className="form-control" id="password"/>
                        </div> */}
                        <div className='custom-file'>
                            <input type='file' ref={input => {this.avatar = input}}/>
                        </div>
                    </form>
                    
                    <button
                        className='btn btn-primary'
                        onClick={this.onButtonClick}
                    >Update Photo</button>
                </div>
        )
    }
    return <h1>Loading</h1>
    
}

}


const mps = state => {
    return {
        userid: state.auth.id
    }
}
export default connect(mps)(EditProfile)