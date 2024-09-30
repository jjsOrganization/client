

function ProductGrid(props){
    return(
    <div className = 'row'>
    {
        props.product.slice(0,6).map(function(a, i){ 
        return(
            <div className="col-6 col-md-4 rounded-lg" key={i} style = {{ height : '300px'}}>     
    {   
        props.product[i].imgUrl ?
        (<img width = '100%' height = '70%' src = {props.Endpoint + props.product[i].imgUrl} style = {{marginRight : '5%'}} onClick={() => { props.navigate(`detail/${props.product[i].id}`) }}/>) : 
        (<p onClick={() => { props.navigate(`detail/${props.product[i].id}`) }} > 이미지 준비중 </p>)}
        <h4 style = {{marginTop: '10px'}}>{props.product[i].productName}</h4>
        </div>
        )})
    }
    </div>
    )
}

export default ProductGrid;