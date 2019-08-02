import React, { Component } from "react";
import {Carousel} from 'react-bootstrap'
// import Sidebar from "./sidebar";
// import Products from "./products";

// class Home extends Component {
// 	render() {
// 		return (
// 			<div className="row home">
// 				<Sidebar />
// 				<Products />
// 			</div>
// 		);
// 	}
// }

// export default Home;
class Home extends Component {
    render () { 
      return (
      <Carousel>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={require('../imagehome/espresso.jpg')}
                style={{width: '500px', height: '500px'}}
                alt="First slide"
              />
                  <Carousel.Caption>
                      <h3>First slide label</h3>
                      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                  </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                   className="d-block w-100"
                   src={require('../imagehome/manual.jpg')}
                   style={{width: '500px', height: '500px'}}
                    alt="Third slide"
                />
                 <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                 </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src={require('../imagehome/grinder.jpg')}
                    style={{width: '300px', height: '500px'}}
                    alt="Third slide"
                    />

                <Carousel.Caption>
                  <h3>Third slide label</h3>
                  <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                </Carousel.Caption>
              </Carousel.Item>
        </Carousel> 
      )
    }
    // render() {
    //     return (
    //     <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
    //         <div className="carousel-inner">
    //             <div className="carousel-item active">
    //                         <img className="d-block w-100" src={require('../imagehome/espresso.jpg')} style={{width: '800px', height: '200px'}} alt="First slide"/>
    //             </div>
    //             <div className="carousel-item">
    //                         <img className="d-block w-100" src={require('../imagehome/manual.jpg')} style={{width: '800px', height: '200px'}} alt="Second slide"/>
    //             </div>
    //             <div className="carousel-item">
    //                 <img className="d-block w-100" src={require('../imagehome/grinder.jpg')} style={{width: '800px', height: '200px'}} alt="Third slide"/>
    //             </div>
    //         </div>
    //             <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
    //                 <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    //                 <span className="sr-only">Previous</span>
    //             </a>
    //             <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
    //                 <span className="carousel-control-next-icon" aria-hidden="true"></span>
    //                 <span className="sr-only">Next</span>
    //             </a>
    //             {/* <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
    //                 <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    //                 <span class="sr-only">Previous</span>
    //             </a> */}
    //   </div>
    //   )
    // }
    //  ControlledCarousel()  {
    //     const [index, setIndex] = useState(0);
    //     const [direction, setDirection] = useState(null);
      
    //     const handleSelect = (selectedIndex, e) => {
    //       setIndex(selectedIndex);
    //       setDirection(e.direction);
    //     };
      
    //     return (
    //       <Carousel activeIndex={index} direction={direction} onSelect={handleSelect}>
    //         <Carousel.Item>
    //           <img
    //             className="d-block w-100"
    //             src="holder.js/800x400?text=First slide&bg=373940"
    //             alt="First slide"
    //           />
    //           <Carousel.Caption>
    //             <h3>First slide label</h3>
    //             <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
    //           </Carousel.Caption>
    //         </Carousel.Item>
    //         <Carousel.Item>
    //           <img
    //             className="d-block w-100"
    //             src="holder.js/800x400?text=Second slide&bg=282c34"
    //             alt="Third slide"
    //           />
      
    //           <Carousel.Caption>
    //             <h3>Second slide label</h3>
    //             <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    //           </Carousel.Caption>
    //         </Carousel.Item>
    //         <Carousel.Item>
    //           <img
    //             className="d-block w-100"
    //             src="holder.js/800x400?text=Third slide&bg=20232a"
    //             alt="Third slide"
    //           />
      
    //           <Carousel.Caption>
    //             <h3>Third slide label</h3>
    //             <p>
    //               Praesent commodo cursus magna, vel scelerisque nisl consectetur.
    //             </p>
    //           </Carousel.Caption>
    //         </Carousel.Item>
    //       </Carousel>
    //     );
    //   }
      
    //   // render(<ControlledCarousel />);

    //   render () { return (
    //     {ControlledCarousel})

    // }
}

export default Home