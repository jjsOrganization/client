import React, { useState } from "react";
import axiosInstance from "../component/jwt.js";
import TopBar from "../component/TopBar.js";
import { PhotoIcon } from '@heroicons/react/24/solid'
import { useNavigate } from "react-router-dom";

const RegisterPortfolio = (props) => {
  const [thumbnailImage, setThumbnailImage] = useState();
  const [thumbnailImageFile, setThumbnailImageFile] = useState();
  const [designerName, setDesignerName] = useState();
  const [designerIntro, setDesignerIntro] = useState();
  const [priceImg, setPriceImg] = useState();
  const [priceThumbnailImageFile, setPriceThumbnailImageFile] = useState();
  let navigate = useNavigate();

  const saveName = (event) => {
    setDesignerName(event.target.value);
  };

  const saveIntro = (event) => {
    setDesignerIntro(event.target.value);
  };

  const encodeImageFile = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      setThumbnailImage(reader.result);
      setThumbnailImageFile(file);
    };
  };

  const encodePriceImageFile = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      setPriceImg(reader.result);
      setPriceThumbnailImageFile(file);
    };
  };

  const registerHandler = async () => {
    try {
      const formData = new FormData();
      formData.append("designerImage", thumbnailImageFile);
      formData.append("designerName", designerName);
      formData.append("explanation", designerIntro);
      formData.append("priceImage", priceThumbnailImageFile);
      const response = await axiosInstance.post(
        "/portfolio/designer",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      window.location.replace(`/DesignerMypage`);
      alert("디자이너 포트폴리오가 등록되었습니다.")
    } catch (error) {
      alert("디자이너 포트폴리오 등록에 실패하였습니다. 다시 확인해주세요.");
    }
  };

  const cancelHandler = () => {
    navigate("/DesignerMyPage");
  }

  return (
    <div>
      <TopBar />
      <form className="formWrapper mx-auto max-w-4xl px-4 my-5">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">포트폴리오 등록</h2>
            <h3 className="text-base font-semibold leading-7 text-gray-900">이미지는 jpg, png 파일만 가능합니다.</h3>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              등록한 디자이너 포트폴리오 정보가 구매자들에게 나타납니다. 
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              
              <div className="col-span-full">
                <label htmlFor="designer-image-upload" className="block text-sm font-medium leading-6 text-gray-900">
                  디자이너 사진
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    {thumbnailImage && (
                      <img src={thumbnailImage} alt="Thumbnail" className="mx-auto h-40 w-auto" />
                    )}
                    {!thumbnailImage && (
                      <PhotoIcon className="mx-auto h-15 w-15 text-gray-300" aria-hidden="true" />
                    )}
                    <div className="mt-4 flex text-sm leading-6 text-gray-600 text-center">
                      <label
                        htmlFor="designer-image-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input id="designer-image-upload" name="file-upload" type="file" className="sr-only" onChange={encodeImageFile} />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label htmlFor="price-image-upload" className="block text-sm font-medium leading-6 text-gray-900">
                  가격 사진
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    {priceImg && (
                      <img src={priceImg} alt="Price" className="mx-auto h-40 w-auto" />
                    )}
                    {!priceImg && (
                      <PhotoIcon className="mx-auto h-15 w-15 text-gray-300" aria-hidden="true" />
                    )}
                    <div className="mt-4 flex text-sm leading-6 text-gray-600 text-center">
                      <label
                        htmlFor="price-image-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input id="price-image-upload" name="file-upload" type="file" className="sr-only" onChange={encodePriceImageFile} />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="sm:col-span-4">
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                  디자이너 명
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      name="username"
                      id="username"
                      autoComplete="username"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="janesmith"
                      value={designerName}
                      onChange={saveName}
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                  소개
                </label>
                <div className="mt-2">
                  <textarea
                    id="about"
                    name="about"
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={''}
                    value={designerIntro}
                    onChange={saveIntro}
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">당신을 소개하는 글을 간단하게 작성해주세요.</p>
              </div>
              
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <div 
            type="button" 
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={cancelHandler}
          >
            취소
          </div>
          <div
            type="button"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={registerHandler}
          >
            등록
          </div>
        </div>
      </form>
    </div>
  )
};

export default RegisterPortfolio;