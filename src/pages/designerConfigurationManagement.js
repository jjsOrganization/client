import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from "../component/jwt.js";
import TopBar from '../component/TopBar.js';
import { useNavigate } from "react-router-dom";
import UserDivision from '../component/molecules/UserDivision.js';
import ImageForm from '../component/molecules/ImgForm.js';
import { useQuery } from 'react-query'  
import { getAxios } from '../component/Axios.js';
import useProgressStore from '../store.js';

function ConfigurationManagement(){
    let {estimateId} = useParams();
    const [beforeImage, setBeforeImage] = useState();
    const [firstImage, setFirstImage] = useState();
    const [secondImage, setSecondImage] = useState();
    const [lastImage, setLastImage] = useState();
    const [imagePostStatus, setImagePostStatus] = useState(0);
    const [title, setTitle] = useState();
    const [explanation, setExplanation] = useState();
    const Endpoint = 'https://jjs-stock-bucket.s3.ap-northeast-2.amazonaws.com/'
    const progressNumber = useProgressStore((state) => state.progressNumber);
    const setProgressNumber = useProgressStore((state) => state.setProgressNumber);
    const [check, setCheck] = useState();
    let navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

        useEffect(() => {
            if (progressNumber) {
            reformCheck();
            }},[progressNumber]
        );

        let test = useQuery([`imageGet`],async ()=>{
            const getImg = await getAxios(`/progress/img/${estimateId}`)
            return getImg
        })

        useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await axiosInstance.get(`/progress/img/${estimateId}`,);
                    setProgressNumber(response.data.data.progressId);
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

        const imageUploadHandler = async (url, formdata) => {
            try {
                await axiosInstance.patch(url, formdata, );
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
            imageUploadHandler(`/progress/designer/setImg/first`, formdata);
        };
    
        const secondImageHandler = (e) => {
            const formdata = new FormData();
            const files = e.target.files;
            formdata.append('estimateId', estimateId);
            formdata.append('imgUrl', files[0]);
            imageUploadHandler(`/progress/designer/setImg/second`, formdata);
        };
    
        const lastImageHandler = (e) => {
            const formdata = new FormData();
            const files = e.target.files;
            formdata.append('estimateId', estimateId);
            formdata.append('imgUrl', files[0]);
            imageUploadHandler(`/progress/designer/setImg/complete`, formdata);
        };
        
        const reformCompletedHandler = async () => {
            try{
                const response = await axiosInstance.post(`/portfolio/reformOutput/upload/${progressNumber}`,{
                    title : title,
                    explanation : explanation 
                })
                reformCheck()
            }finally{
                closeModal()
            }
        }

        //현재 progressNumber을 얻어올 수 있는 방법이 형상관리 api를 사용하는것 외에는 존재하지 않아서
        //형상관리 페이지가 아닌 다른곳에서 디자이너가 자신이 작업한 작업물들만 모아서 조회하는것이 불가능함(로그인한 디자이너의 작업물 조회 api에도 타이틀하고 imgurl밖에없음)
        //해서 부득이하게 형상관리 페이지에서 디자이너 작업물 열람으로 넘어가는 방식으로 구현을 할 수 밖에 없게됐고 
        //형상관리 최종 사진을 등록하고 작업물 등록을 했는지 안했는지 확인할 수 있는 함수가 필요해서 만든게 reformCheck함수
        //해당 함수를 통해 얻어오는 값에 따라서 리폼 등록 버튼 or 작업물 보러가기 버튼이 보임
        const reformCheck = async() => {
            try{
                const response = await axiosInstance.get(`/portfolio/reformOutput/detail/${progressNumber}`,)
                setCheck(response.data.data)
            }
            catch(error){
                console.log(error)
            }
        }

        const titleUpdateHandler = (event) => {
            setTitle(event.target.value)
        }

        const explanationUpdateHandler = (event) => {
            setExplanation(event.target.value)
        }
        
        if(!beforeImage){
            return(<div>
                데이터 로드중...
            </div>)
        }

    return (
        <>
            <TopBar />
            <div className='ConfigurationManagementContainer' style = {{margin : '0 10% 0 20%'}}>
                <div className = 'beforeImage' style = {{margin : '0% 20% 0 15%'}}>
                    <h4>리폼 전 이미지</h4>
                    <div style={{ border: '2px solid #ccc', borderRadius: '10px', padding: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', textAlign: 'center' }}>
                        <img src = {Endpoint + beforeImage} height = '300px' width = '100%'></img>
                    </div>
                </div>
                
                <div className = 'beforeImage' style = {{margin : '10% 20% 0 15%'}}>
                    <UserDivision
                    title = {'첫번째 리폼'}
                    imageHandler={firstImageHandler}
                    imageUploadId={`firstImage`}
                    />

                    <ImageForm
                    estimateId = {estimateId}
                    image = {firstImage}
                    />
                </div>
               
                <div className = 'secondImage' style = {{margin : '10% 20% 0 15%'}}>
                    <UserDivision
                    title = {'두번째 리폼'}
                    imageHandler={secondImageHandler}
                    imageUploadId={`secondImage`}
                    firstImage={firstImage}
                    />

                    <ImageForm
                    estimateId = {estimateId}
                    image={secondImage}
                    />
                </div>
                    
                <div className = 'reformCompletedContainer' style = {{margin : '10% 20% 0 15%'}}>
                    <UserDivision
                    title = {`리폼 완료`}
                    imageHandler={lastImageHandler}
                    imageUploadId={`lastImage`}
                    firstImage={firstImage}
                    secondImage={secondImage}
                    />

                    <ImageForm
                    estimateId = {estimateId}
                    image={lastImage}
                    firstImage = {firstImage}
                    secondImage = {secondImage}
                    />
                </div>       

                <div className = 'reformCompleted-btn' style = {{margin : '5% 15% 3% 0',textAlign : 'right'}}>
                    {check && check.length === 0 ? 
                    <button
                    className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border-1 border-blue-500 rounded-full"
                    style={{ marginRight: "5%" }}
                    onClick={openModal}
                    >
                    리폼 완료{" "}
                    </button> : 
                    <button
                    className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border-1 border-blue-500 rounded-full"
                    style={{ marginRight: "5%" }}
                    onClick = {()=>{
                        navigate(`/reformCompleted/${progressNumber}`)
                    }}>
                    작업물 보기
                    </button>}
                </div>
                <Modal isOpen = {isOpen} closeModal = {closeModal} reformCompletedHandler = {reformCompletedHandler} titleUpdateHandler = {titleUpdateHandler} explanationUpdateHandler = {explanationUpdateHandler}/>
            </div>
        </>
    )
}

function Modal(props){
    return(
        <>
            {props.isOpen && (
                <div id="default-modal" tabIndex="-1" aria-hidden="true" className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className="relative p-4 w-full max-w-2xl max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        작업물 등록
                        </h3>
                        <button
                        type="button"
                        onClick={props.closeModal}
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        </button>
                    </div>
                    <div className="p-4 md:p-5 space-y-4">
                        <p className="text-xl leading-relaxed text-gray-900 dark:text-gray-600">
                        한번 등록한 작업물은 제목과 설명을 제외하고는 수정이 불가합니다.
                        </p>
                        <div> 
                            <input 
                            type="text" 
                            name="title" 
                            id="title" 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                            placeholder="제목을 입력해주세요"
                            onChange = {(event) => {props.titleUpdateHandler(event)}}
                            required /> 
                        </div>
                        <div> 
                            <input 
                            type="text" 
                            name="explanation" 
                            id="explanation" 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                            placeholder="리폼에 대한 설명을 입력해주세요"
                            onChange = {(event) => {props.explanationUpdateHandler(event)}} 
                            required /> 
                        </div>
                    </div>
                    <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                        <button
                        onClick = {() => {props.reformCompletedHandler()}}
                        type="button"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                        I accept
                        </button>
                        <button
                        onClick={props.closeModal}
                        type="button"
                        className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                        >
                        Decline
                        </button>
                    </div>
                    </div>
                </div>
                </div>
            )}
        </>
    )
}

export default ConfigurationManagement;