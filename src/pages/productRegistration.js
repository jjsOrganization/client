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
  const [priceValue, setPriceValue] = useState(0);
  const [amountValue, setAmountValue] = useState(0);
  const [thumbnailImage, setThumbnailImage] = useState();
  const [thumbnailImageFile, setThumbnailImageFile] = useState();
  const [imgFiles, setImgFiles] = useState([]);
  const [img, setImg] = useState([]);
  const [categoryId, setCategoryId] = useState();
  const [selectedCategory, setSelectedCategory] = useState("카테고리");
  const dropdownMenu = ["상의","아우터","바지","스커트","원피스","모자",];
  let navigate = useNavigate();
  const dropdownRef = useRef(null);

  const savecontent = (event) => {
    setContentValue(event.target.value);
  };

  const saveAmount = (event) => {
    const numericValue = parseFloat(event.target.value);
    setAmountValue(numericValue);
  };

  const savePrice = (event) => {
    const numericValue = parseFloat(event.target.value);
    setPriceValue(numericValue);
  };

  const saveTitle = (event) => {
    setTitleValue(event.target.value);
  };

  const handleCategoryChange = ((selectedCategory) => {
    setSelectedCategory(selectedCategory);
    if(selectedCategory === '상의'){setCategoryId(1);}
    else if(selectedCategory === '아우터'){setCategoryId(2)}
    else if(selectedCategory === '바지'){setCategoryId(3)}
    else if(selectedCategory === '스커트'){setCategoryId(4)}
    else if(selectedCategory === '원피스'){setCategoryId(5)}
    else if(selectedCategory === '모자'){setCategoryId(6)}
    else setCategoryId(undefined);
  })

  const thumbnailImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setThumbnailImage(reader.result);
      setThumbnailImageFile(file);
    };
  };

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
    console.log(newImgFiles)
  }
  
  const handleDropdownToggle = (open) => {
    if (open && dropdownRef.current) {
      // 드롭다운이 열릴 때 스크롤 조정
      dropdownRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  };

  const productRegisterHandler = async () => {
    if(typeof priceValue !== 'number' ){
      return alert('가격에는 숫자만 입력이 가능합니다.')
    }
    if(typeof amountValue !== 'number' ){
      return alert('수량에는 숫자만 입력이 가능합니다.')
    }
    if(amountValue === 0 || priceValue === 0 || !titleValue || !priceValue  || !amountValue || !categoryId || !selectedCategory || !thumbnailImageFile){
      return alert('모든 상품 정보를 입력해주세요')
    }

    try {
      const formData = new FormData();
      setContentValue('test');
      formData.append("productName", titleValue);
      formData.append("price", priceValue);
      formData.append("itemDetail", contentValue);
      formData.append("productStock", amountValue);
      formData.append("categoryId.id", categoryId)
      formData.append("categoryId.categoryName", selectedCategory)
      formData.append('itemImgFile', thumbnailImageFile)
      for(let i = 0 ; i < imgFiles.length; i++){
        formData.append("itemImgFile", imgFiles[i]);
      }
      await postAxios("/product/seller/register",formData)
      alert("상품이 등록되었습니다.");
      window.location.replace('/mypage')
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
                isMultiple = {true}
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
                        {dropdownMenu.map((category, index) => (
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
                cancelHandler();
              }}
            >
              취소
            </div>
            <div
              type="button"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={() => {
                productRegisterHandler();
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