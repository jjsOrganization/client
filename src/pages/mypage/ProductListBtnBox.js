import { TailWindButton } from "../../component/atoms/Button.js";
import { borderSkyBlue } from "../../styles/buttonStyle.js";


function ProductListBtnBox(props){

    return(
      <div>
        <TailWindButton
          className = {`${borderSkyBlue} mr-3 mt-3`}
          onClick={() => {props.navigate(`/stockupdater/${props.productList[props.i].id}`);}}
        >
          상품 수정
        </TailWindButton>
        <TailWindButton
          className = {`${borderSkyBlue} mr-3 mt-3`}
          onClick={() => {props.productDeleteHandler(props.i);}}
        >
          상품 삭제
        </TailWindButton>
      </div>
    )
  }

  export default ProductListBtnBox