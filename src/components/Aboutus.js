import React, { Component } from "react";

class About extends Component {
	render() {
		return (
		
		//<div className="row home">About
		//</div>
		<div>
			<div className = 'mt-5 row'>
			 <div className = 'col-sm-4 mx-auto card'>
				 <div className = 'card-body'>
					 <div className = ' border-bottom border-secondary card-title'>
						 <h1>COFFEE EX MACHINE</h1>
					 </div>

					 <div className='card-title'>
						 <h4>COFFEE EX MACHINE didirikan dengan semangat untuk memudahkan masyarakat dalam mengkonsumsi kopi secara sehat sejak dini. 
							 Kami menyediakan berbagai alat seduh kopi untuk keperluan wirausaha maupun konsumsi rumahan. CHECK IT OUT!

						 </h4>
					 </div>
					 {/* <form className='input-group'>
						 <input className='form-control' type='text'
							 ref={(input) => {this.username = input}}  // membuat variabel baru namanya username, yang berisi inputan
						 />
					 </form> */}

					 {/* <div className='card-title'>
						 <h4>Email</h4>
					 </div> */}
					 {/* <form className='input-group'>
						 <input className='form-control'
							 ref={(input) => {this.email= input}} // membuat variabel baru namanya email, yang berisi inputan email
						 />
					 </form> */}

					 {/* <div className='card-title'>
						 <h4>Password</h4>
					 </div> */}
					 {/* <form className='input-group'>
						 <input className='form-control' type='password'
							 ref={(input) => {this.password= input}}/>
					 </form> */}

				 </div>
				 <button onClick={this.onButtonClick} className='btn btn-success'>AYO BERBELANJA</button>
				 {/* <p>Sudah memiliki akun ? <Link to="/login" >Login disini</Link></p> */}
			 </div>
		 </div>

	 </div>
		)
	}
}

export default About