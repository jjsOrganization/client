import React from 'react'
import { PhotoIcon } from '@heroicons/react/24/solid'


export const ImgUpload = ({title, image,imageUpload,multiple, ...props}) => {

    const inputId = `${title}Input`;

    return(
            <div className="col-span-full">
                <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                  {`${title}`}
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10" >
                  <div className="text-center">
                    {!Array.isArray(image)?
                   (image?
                    <img src={image} alt= {`${title}`} className="mx-auto h-40 w-auto" />:
                    <PhotoIcon className="mx-auto h-15 w-15 text-gray-300" aria-hidden="true" />
                   ):
                   (image[0] ? 
                    image.map(function(imgUrl,index){
                    return <img style = {{margin : '30px'}} src={imgUrl} alt="사진을 등록해주세요" className="mx-auto" height = '200px' width = 'auto'/>}):
                    <PhotoIcon className="mx-auto h-15 w-15 text-gray-300" aria-hidden="true" />
                   )}
                    <div className="mt-4 flex text-sm leading-6 text-gray-600 text-center">
                      <label
                        htmlFor = {`${inputId}`}
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input id={inputId} name={inputId} type="file" className="sr-only" onChange={(event) => imageUpload(event)} style={{display: "none"}} />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                  </div>
                </div>
            </div>
    )
}


/*<label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                  상품 사진
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10" >
                  <div className="text-center">
                    {
                    img[0] ? 
                    img.map(function(imgUrl,index){
                    return <img style = {{margin : '30px'}} src={imgUrl} alt="사진을 등록해주세요" className="mx-auto" height = '200px' width = 'auto'/>}):
                    <PhotoIcon className="mx-auto h-15 w-15 text-gray-300" aria-hidden="true" />
                    }
                    <div className="mt-4 flex text-sm leading-6 text-gray-600 text-center">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple onChange={(event) => imageUpload(event)} style={{display: "none"}} />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                  </div>
                </div>
                */