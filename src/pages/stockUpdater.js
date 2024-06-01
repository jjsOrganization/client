import React from "react";
import { useState } from "react";
import styled from "styled-components";
import axiosInstance from "../component/jwt.js";
import { useParams } from "react-router-dom";
import "../component/TopBar.js";
import TopBar from "../component/TopBar.js";
import Dropdown from "../component/dropdown.js";
import { Fragment, useRef, useEffect } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { PhotoIcon } from '@heroicons/react/24/solid'
import { useNavigate } from "react-router-dom";

function StockUpdater() {
  let { productid } = useParams();
  let navigate = useNavigate();
  const [titleValue, setTitleValue] = useState();
  const [contentValue, setContentValue] = useState();
  const [priceValue, setPriceValue] = useState();
  const [amountValue, setAmountValue] = useState();
  const [thumbnailImage, setThumbnailImage] = useState();
  const [thumbnailImageFile, setThumbnailImageFile] = useState();
  const categoryDropDown = ["상의","아우터","바지","스커트","원피스","모자",];
  const [categoryId, setCategoryId] = useState();
  const [selectedCategory, setSelectedCategory] = useState('카테고리');
  const categoryText = "카테고리";
  const [imgFiles, setImgFiles] = useState([]);
  const [img, setImg] = useState([]);
  const [files, setFiles] = useState();
  const dropdownRef = useRef(null);


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

  const handleDropdownToggle = (open) => {
    if (open && dropdownRef.current) {
      // 드롭다운이 열릴 때 스크롤 조정
      dropdownRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
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
      const response = await axiosInstance.put(
        `product/seller/register/${productid}`,
        formData,
      );
      console.log("상품 수정 성공:", response.data);
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
              
              <div className="col-span-full">
                <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                  썸네일 사진
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10" >
                  <div className="text-center">
                    {thumbnailImage && (
                      <img src={thumbnailImage} alt="Thumbnail" className="mx-auto h-40 w-auto" />
                    )}
                    {!thumbnailImage && (
                      <PhotoIcon className="mx-auto h-15 w-15 text-gray-300" aria-hidden="true" />
                    )}
                    <div className="mt-4 flex text-sm leading-6 text-gray-600 text-center">
                      <label
                        htmlFor="thumbnailFile-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input id="thumbnailFile-upload" name="thumbnailFile-upload" type="file" className="sr-only" onChange={(event) => thumbnailImageUpload(event)} style={{display: "none"}} />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
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
              </div>

              <div className="sm:col-span-4">
                <label htmlFor="productname" className="block text-sm font-medium leading-6 text-gray-900">
                  상품명
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      name="productname"
                      id="productname"
                      autoComplete="productname"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder=""
                      value={titleValue}
                      onChange={saveTitle}
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-4">
                <label htmlFor="productprice" className="block text-sm font-medium leading-6 text-gray-900">
                  상품 가격
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      name="productprice"
                      id="productprice"
                      autoComplete="productprice"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder=""
                      value={priceValue}
                      onChange={savePrice}
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-4">
                <label htmlFor="productstock" className="block text-sm font-medium leading-6 text-gray-900">
                  재고수
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      name="productstock"
                      id="productstock"
                      autoComplete="productstock"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder=""
                      value={amountValue}
                      onChange={saveAmount}
                    />
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-between items-center">
          <div>
            <Listbox value={selectedCategory} onChange={handleCategoryChange}>
              {({ open }) => (
                <>
                  <div className="relative mt-2">
                    <Listbox.Button className="relative cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6" style={{ width: '120px' }}>
                      <span className="block truncate">{selectedCategory}</span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                        <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      </span>
                    </Listbox.Button>
                    <Transition
                      show={open}
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                      afterEnter={() => handleDropdownToggle(open)}
                    >
                      <Listbox.Options className="list-none absolute z-10 mt-1 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm pl-2 " style={{ width: '120px' }} ref={dropdownRef}>
                        {categoryDropDown.map((category, index) => (
                          <Listbox.Option
                            key={index}
                            className={({ active }) =>
                              classNames(
                                active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                                'relative cursor-default select-none py-2 pl-2 pr-9'
                              )
                            }
                            value={category}
                          >
                            {({ selected, active }) => (
                              <>
                                <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                  {category}
                                </span>
                                {selected ? (
                                  <span
                                    className={classNames(
                                      active ? 'text-white' : 'text-indigo-600',
                                      'absolute inset-y-0 right-0 flex items-center pr-4'
                                    )}
                                  >
                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </>
              )}
            </Listbox> 
          </div>

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

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default StockUpdater;
