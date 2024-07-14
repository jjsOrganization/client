

function UserDivision({
    title,
    imageHandler,
    imageUploadId,
    estimateId,
    firstImage, 
    secondImage, 
    completedImage, 
    ...props}){

    return(
        <>
            {localStorage.getItem('role') == 'ROLE_DESIGNER' ?
                <div style = {{display : 'flex', marginBottom : '1%'}}>
                    <h4>{title}</h4>
                    <label
                    style = {{marginLeft : 'auto'}}
                    htmlFor = {`${imageUploadId}`}
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                    <span>Upload a file</span>
                    <input 
                    type="file" 
                    id={`${imageUploadId}`} 
                    multiple 
                    className="sr-only" 
                    onClick={(event) => {
                    if(title === `두번째 리폼` && !firstImage){
                    alert('리폼 사진을 순서대로 업로드 해주세요'); 
                    event.preventDefault();}
                    if (title === '리폼 완료' && (!firstImage || !secondImage)){
                    alert('리폼 사진을 순서대로 업로드 해주세요'); 
                    event.preventDefault();}}}
                    onChange={(event) => imageHandler(event)} 
                    style={{display: "none", marginLeft : 'auto'}} />
                    </label>
                </div>:
                <div style = {{display : 'flex', marginBottom : '1%'}}>
                    <h4>{title}</h4>
                </div>}
        </>
    )
}

export default UserDivision;