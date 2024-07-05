import React from "react";
import { useParams } from "react-router-dom";
import "../component/TopBar.js";
import TopBar from "../component/TopBar.js";
import Dropdown from "../component/dropdown.js";
import { Fragment, useRef, useEffect,useState } from 'react'
import { useNavigate } from "react-router-dom";
import { putAxios } from "../component/Axios.js";
import { ImgUpload } from "../component/molecules/imgUpload.js";
import { Input_Label } from "../component/molecules/Input_Label.js";
import { TailWindDropdown } from "../component/organism/DropDown.js";

function StockUpdater() {
  let { productid } = useParams();
  let navigate = useNavigate();
  const [titleValue, setTitleValue] = useState();
  const [contentValue, setContentValue] = useState();
  const [priceValue, setPriceValue] = useState();
  const [amountValue, setAmountValue] = useState();
  const [thumbnailImage, setThumbnailImage] = useState();
  const [thumbnailImageFile, setThumbnailImageFile] = useState();
  const [categoryId, setCategoryId] = useState();
  const [selectedCategory, setSelectedCategory] = useState('카테고리');
  const [imgFiles, setImgFiles] = useState([]);
  const [img, setImg] = useState([]);

  const saveAmount = (event) => {
    setAmountValue(event.target.value);
  };

  const savePrice = (event) => {
    setPriceValue(event.target.value);
  };

  const saveTitle = (event) => {
    setTitleValue(event.target.value);
  };

  const cancelHandler = () => {
    navigate("/mypage");
  }

  const imageUpload = (event) => {
    const files = event.target.files;
    const newImgFiles = [...imgFiles];
    const newImg = [...img];
    for (let i = 0; i < files.length; i++) {
      newImgFiles.push(files[i]);
      newImg.push(URL.createObjectURL(files[i]));
    }
    setImgFiles(newImgFiles);
    setImg(newImg);
  }

  const thumbnailImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setThumbnailImage(reader.result);
      setThumbnailImageFile(file);
    };
  };

  const stockHandler = async () => {
    try {
      const formData = new FormData();
      formData.append("productName", titleValue);
      formData.append("price", priceValue);
      formData.append("itemDetail", contentValue);
      formData.append("productStock", amountValue);
      formData.append("categoryId.id", categoryId)
      formData.append("categoryId.categoryName", selectedCategory)
      for(let i = 0 ; i < imgFiles.length; i++){
        formData.append("itemImgFile", imgFiles[i]);
      }
      await putAxios(`/product/seller/register/${productid}`,formData,);
      alert('수정되었습니다.')
      navigate('/')
    } catch (error) {
      console.error("상품 수정 실패:", error);
    }
  };

  return (
    <div>
      <TopBar />
      <form className="formWrapper mx-auto max-w-4xl px-4 my-5 ">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">상품 수정</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              원하는 정보를 수정하세요
            </p>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <ImgUpload
                title = {'썸네일 이미지'}
                image = {thumbnailImage}
                imageUpload = {thumbnailImageUpload}
              />
              
              <ImgUpload
                title = '상품사진'
                image = {img}
                imageUpload={imageUpload}
                multiple = {true}
              />

              <Input_Label
                title = '상품명'
                labelName = 'productname'
                value={titleValue}
                save={saveTitle}
              />

              <Input_Label
                title = '상품 가격'
                labelName = 'productprice'
                value={priceValue}
                save={savePrice}
              />

              <Input_Label
                title = '재고수'
                labelName = 'productstock'
                value={amountValue}
                save={saveAmount}
              />
              
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-between items-center">
          <TailWindDropdown
          categoryId = {categoryId}
          selectedCategory = {selectedCategory}
          setSelectedCategory = {setSelectedCategory}
          setCategoryId = {setCategoryId}
          />

          <div className="flex gap-x-6">
            <div 
              type="button" 
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={() => {
                
              }}
            >
              취소
            </div>
            <div
              type="button"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={() => {
                stockHandler()
              }}
            >
              수정
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}



export default StockUpdater;
