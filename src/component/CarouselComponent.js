import React, { useState, Component } from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

class MyComponent extends Component {

    render() {
        

        return (
            <>
            
            </>
        );
    }
}

function SlickCarousel(props) {
    return(
        <div>
                <Slider {...props.settings}>
                    <div>
                        <h3>1</h3>
                    </div>
                    <div>
                        <h3>2</h3>
                    </div>
                </Slider>
            </div>
    )
}

export default SlickCarousel