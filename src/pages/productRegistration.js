import React from "react";
import axiosInstance from "../component/jwt.js";
import { postAxios } from "../component/Axios.js";
import TopBar from "../component/TopBar.js";
import { PhotoIcon } from '@heroicons/react/24/solid'
import { useNavigate } from "react-router-dom";
import { Fragment , useState, useRef, useEffect } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { ImgUpload } from "../component/molecules/imgUpload.js";
import { TailWindDropdown } from "../component/organism/DropDown.js";
import { Input_Label } from "../component/molecules/Input_Label.js";

function ProductUpdate(props) {
  const [titleValue, setTitleValue] = useState();
  const [contentValue, setContentValue] = useState();
  const [priceValue, setPriceValue] = useState();
  const [amountValue, setAmountValue] = useState();
  const [thumbnailImage, setThumbnailImage] = useState();
  const [thumbnailImageFile, setThumbnailImageFile] = useState();
  const [imgFiles, setImgFiles] = useState([]);
  const [img, setImg] = useState([]);
  const [categoryId, setCategoryId] = useState();
  const [selectedCategory, setSelectedCategory] = useState("카테고리");
  let navigate = useNavigate();

  const handleCategoryChange = ((selectedCategory) => {
    setSelectedCategory(selectedCategory);
    if(selectedCategory === '상의'){setCategoryId(1);}
    else if(selectedCategory === '아우터'){setCategoryId(2)}
    else if(selectedCategory === '바지'){setCategoryId(3)}
    else if(selectedCategory === '스커트'){setCategoryId(4)}
    else if(selectedCategory === '원피스'){setCategoryId(5)}
    else if(selectedCategory === '모자'){setCategoryId(6)}
    else setCategoryId(undefined); // 초기 상태 또는 카테고리가 선택되지 않은 경우
  })

  const savecontent = (event) => {
    setContentValue(event.target.value);
  };

  const saveAmount = (event) => {
    setAmountValue(event.target.value);
  };

  const savePrice = (event) => {
    setPriceValue(event.target.value);
  };

  const saveTitle = (event) => {
    setTitleValue(event.target.value);
  };

  const thumbnailImageUpload = (event) => {
    console.log('작동중2')
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setThumbnailImage(reader.result);
      setThumbnailImageFile(file);
    };
  };

  const imageUpload = (event) => {
    console.log('작동중')
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

  const dropdownRef = useRef(null); // 드롭다운 리스트를 참조할 ref 생성

  const handleDropdownToggle = (open) => {
    if (open && dropdownRef.current) {
      // 드롭다운이 열릴 때 스크롤 조정
      dropdownRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  };

  const registerHandler = async () => {
    try {
      const formData = new FormData();
      setContentValue('test');
      formData.append("productName", titleValue);
      formData.append("price", priceValue);
      formData.append("itemDetail", contentValue);
      formData.append("productStock", amountValue);
      formData.append("categoryId.id", categoryId)
      formData.append("categoryId.categoryName", selectedCategory)
      for(let i = 0 ; i < imgFiles.length; i++){
        formData.append("itemImgFile", imgFiles[i]);
      }
      postAxios("/product/seller/register",formData)
      navigate(`/mypage`);
      alert("상품이 등록되었습니다.");
    } catch (error) {
      alert("상품 등록에 실패했습니다.");
    }
  };

  const cancelHandler = () => {
    navigate("/productupdate");
  }

  return (
    <div>
      <TopBar />
      <form className="formWrapper mx-auto max-w-4xl px-4 my-5 ">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">상품 등록</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              판매할 상품을 등록해주세요.
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
                cancelHandler();
              }}
            >
              취소
            </div>
            <div
              type="button"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={() => {
                registerHandler();
              }}
            >
              등록
            </div>
          </div>
        </div>
      </form>
    </div>
    
    
  );
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default ProductUpdate;