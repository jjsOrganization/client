import { useProductDetail } from "./Detail"

function ProductPhotoList({productid, ...props}) {

    const { data: productDetailInfo, isLoading, isError } = useProductDetail(productid);
    const Endpoint = "https://jjs-stock-bucket.s3.ap-northeast-2.amazonaws.com/";  

    return(
        <div className="productField">
            {productDetailInfo.productImg.slice(1).map((image, index) => (
              <img key={index} src={Endpoint + image.imgUrl} width="75%" height="100%" style = {{margin : '0 0 3% 12%'}}/>
            ))}
        </div>
    )
}

export default ProductPhotoList;