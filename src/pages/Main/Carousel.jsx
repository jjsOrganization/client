import { Carousel } from 'antd';


function CarouselComponent(props)
{

    let carouselImage = ([
    "https://i.postimg.cc/jd4cY735/3.png",
    "https://i.postimg.cc/zv1C9znK/1.png",
    "https://i.postimg.cc/JnX36DBR/2.png",
    "https://i.postimg.cc/66dLCZX0/4.png",])

    return(
    <Carousel autoplay speed = {2500}>
        {carouselImage.map((image, index) => (
        <div key={index}>
            <h3 style={carouselStyle}>
            <img src={image} style={{ width: '100%', height: '100%' }} />
            </h3>
        </div>
        ))}
    </Carousel>
    )
}

const carouselStyle = {
    height: '400px', 
    width: '100%', 
    color: '#fff',
    background: 'white',
};

export default CarouselComponent;