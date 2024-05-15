import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from "../component/jwt.js";
import TopBar from '../component/TopBar.js';
import { Carousel } from 'antd';
import { PhotoIcon } from '@heroicons/react/24/solid'
import { CiCirclePlus } from "react-icons/ci";

function ConfigurationManagement(){
    let {estimateId} = useParams();
    const [beforeImage, setBeforeImage] = useState();
    const [firstImage, setFirstImage] = useState();
    const [secondImage, setSecondImage] = useState();
    const [lastImage, setLastImage] = useState();
    const [imagePostStatus, setImagePostStatus] = useState(0);
    const Endpoint = 'https://jjs-stock-bucket.s3.ap-northeast-2.amazonaws.com/'

    const contentStyle = {
        height: '200px', 
        width: '100%', 
        color: '#fff',
        background: 'white',
    };

    let carouselImage = ([
        "https://i.postimg.cc/jd4cY735/3.png",
        "https://i.postimg.cc/zv1C9znK/1.png",
        "https://i.postimg.cc/JnX36DBR/2.png",
        "https://i.postimg.cc/66dLCZX0/4.png",])


        useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await axiosInstance.get(`/progress/img/${estimateId}`, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                        },
                    });
                    console.log('Fetched data:', response.data);
                    setBeforeImage(response.data.data.productImgUrl);
                    setFirstImage(response.data.data.firstImgUrl);
                    setSecondImage(response.data.data.secondImgUrl);
                    setLastImage(response.data.data.completeImgUrl);
                } catch (err) {
                    console.error('Error fetching data:', err);
                }
            };
            fetchData();
        }, [estimateId, imagePostStatus]);
    
        const handleImageUpload = async (url, formdata) => {
            try {
                await axiosInstance.patch(url, formdata, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                });
                setImagePostStatus(prevStatus => prevStatus + 1);
            } catch (err) {
                console.error('Error uploading image:', err);
            }
        };
    
        const firstImageHandler = (e) => {
            const formdata = new FormData();
            const files = e.target.files;
            formdata.append('estimateId', estimateId);
            formdata.append('imgUrl', files[0]);
            handleImageUpload(`/progress/designer/setImg/first`, formdata);
        };
    
        const secondImageHandler = (e) => {
            const formdata = new FormData();
            const files = e.target.files;
            formdata.append('estimateId', estimateId);
            formdata.append('imgUrl', files[0]);
            handleImageUpload(`/progress/designer/setImg/second`, formdata);
        };
    
        const reformCompletedHandler = (e) => {
            const formdata = new FormData();
            const files = e.target.files;
            formdata.append('estimateId', estimateId);
            formdata.append('imgUrl', files[0]);
            handleImageUpload(`/progress/designer/setImg/complete`, formdata);
        };

    return (
        <>
            <TopBar />
            <div className='ConfigurationManagementContainer' style = {{margin : '0 10% 0 20%'}}>
                <div className = 'beforeImage' style = {{marginLeft : '15%'}}>
                    <h4>리폼 전 이미지</h4>
                    <img src = {Endpoint + beforeImage} height = '300px' width = '77%'></img>
                </div>

                <div className = 'beforeImage' style = {{margin : '10% 20% 0 15%'}}>
                    {localStorage.getItem('role') == 'ROLE_DESIGNER' ? 
                    <div style = {{display : 'flex', marginBottom : '1%'}}>
                        <h4>첫번째 리폼</h4>
                        <label
                        style = {{marginLeft : 'auto'}}
                        htmlFor="beforeReformImage-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                        >
                        <span>Upload a file</span>
                        <input type="file" id="beforeReformImage-upload" multiple className="sr-only" onChange={(event) => firstImageHandler(event)} style={{display: "none", marginLeft : 'auto'}} />
                        </label>
                    </div>:
                    <div style = {{display : 'flex', marginBottom : '1%'}}>
                        <h4>첫번째 리폼</h4>
                    </div>}
                        {firstImage ?
                        <div><img src={firstImage} style={{ width: '100%', height: '300px', textAlign: 'center' }} /></div>:
                        <div>
                            <PhotoIcon className="mx-auto h-15 w-15 text-gray-300" aria-hidden="true" />
                        </div>
                        }
                </div>
               
                <div className = 'secondImage' style = {{margin : '10% 20% 0 15%'}}>
                    {localStorage.getItem('role') == 'ROLE_DESIGNER' ? 
                    <div style = {{display : 'flex', marginBottom : '1%'}}>
                        <h4>두번째 리폼</h4>
                        <label
                        style = {{marginLeft : 'auto'}}
                        htmlFor="secondReformImage-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                        >
                        <span>Upload a file</span>
                        <input type="file" id="secondReformImage-upload" 
                        multiple 
                        className="sr-only" 
                        onClick={(event) => {
                        if(!firstImage){
                        alert('첫번째 사진을 먼저 업로드 해주세요'); 
                        event.preventDefault(); }}} 
                        onChange={(event) => secondImageHandler(event)} 
                        style={{display: "none", marginLeft : 'auto'}} />
                        </label>
                    </div>:
                    <div style = {{display : 'flex', marginBottom : '1%'}}>
                        <h4>두번째 리폼</h4>
                    </div>}
                        {secondImage ?
                        <div><img src={secondImage} style={{ width: '100%', height: '300px', textAlign: 'center' }} /></div>:
                        <div>
                            <PhotoIcon className="mx-auto h-15 w-15 text-gray-300" aria-hidden="true" />
                        </div>
                        }
                </div>
                    
                <div className = 'reformCompletedContainer' style = {{margin : '10% 20% 0 15%'}}>
                    {localStorage.getItem('role') == 'ROLE_DESIGNER' ? 
                        <div style = {{display : 'flex', marginBottom : '1%'}}>
                            <h4>리폼 완료</h4>
                            <label
                            style = {{marginLeft : 'auto'}}
                            htmlFor="reformCompletedImage"
                            className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                            >
                            <span>Upload a file</span>
                            <input type="file" id="reformCompletedImage" multiple 
                                onClick={(event) => {
                                if(!secondImage || !firstImage){
                                alert('중간 사진을 먼저 업로드 해주세요'); 
                                event.preventDefault();}}} 
                                onChange={(event) => {
                                    reformCompletedHandler(event);
                                }}
                                className="sr-only" 
                                style={{display: "none", marginLeft : 'auto'}} />
                            </label>
                        </div>:
                        <div style = {{display : 'flex', marginBottom : '1%'}}>
                            <h4>리폼 완료</h4>
                        </div>}
                    {lastImage !== null ?
                        <div>
                            <img src={lastImage} style={{ width: '100%', height: '300px', textAlign: 'center' }}  />
                        </div>:
                        <div>
                            <PhotoIcon className="mx-auto h-15 w-15 text-gray-300" aria-hidden="true" />
                        </div>
                    }
                </div>         
            </div>
        </>
    )
}

export default ConfigurationManagement;