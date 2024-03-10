import {HeartOutlined, HeartFilled} from '@ant-design/icons';
import { useEffect, useState } from "react";

function LikeComponent(props){
    const [likeButton, setLikeButton] = useState(false);


    return(
        <div>
            { likeButton ? 
            <HeartFilled onClick = {() => {setLikeButton(prevState => !prevState); props.likecanceleHandler() }} style={{ color: 'red', fontSize: '40px', border : '3px solid black', marginTop : '4%'}} /> :
            <HeartOutlined onClick = {() => {setLikeButton(prevState => !prevState); props.likeHandler() }} style={{ color: 'black', fontSize: '40px', border : '3px solid black', marginTop : '4%'}}/>}
        </div>
    )
}
export default LikeComponent;


