import React, { useEffect, useState } from "react";
import Select from "react-select";
import styled from "styled-components";
import TopBar from "../component/TopBar.js";
import { useLocation,useNavigate } from "react-router-dom";
import { ImgUpload } from "../component/molecules/imgUpload.js";
import { Input_Label } from "../component/molecules/Input_Label.js";
import axiosInstance from "../component/jwt.js";


function Reform() {
  const [requestPart, setRequestPart] = useState("");
  const [requestInfo, setRequestInfo] = useState("");
  const [requestPrice, setRequestPrice] = useState("");
  const [designers, setDesigners] = useState([]);
  const [reformImage, setReformImage] = useState();
  const [reformImageFile, setReformImageFile] = useState();
  const [selectedDesigner, setSelectedDesigner] = useState(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const productId = searchParams.get("productId");
  let navigate = useNavigate();
  
  const encodeImageFile = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      setReformImage(reader.result);
      setReformImageFile(file);
    };
  };

  const handleReformSectionChange = (e) => {
    setRequestPart(e.target.value)
  }

  const handleRequestChange = (e) => {
    setRequestInfo(e.target.value)
  }

  const handleHopedPriceChange = (e) => {
    setRequestPrice(e.target.value)
  }

  const cancelHandler = () => {
    navigate(`/detail/${productId}`);
  }

  const registerHandler = async () => {
    try {
      const formData = new FormData();
      formData.append("requestPart", requestPart);
      formData.append("requestInfo", requestInfo);
      formData.append("requestImg", reformImageFile);
      formData.append("requestPrice", requestPrice);
      formData.append("designerEmail", selectedDesigner.value);
      const response = await axiosInstance.post(
        `/reform-request/purchaser/creation/${productId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      alert("리폼요청이 성공적으로 등록되었습니다.");
      navigate(`/`);
    } catch (error) {
      alert("리폼요청 등록에 실패했습니다.");
    }
  };

  useEffect(() => {
    const fetchDesigners = async () => {
      try {
        const response = await axiosInstance.get("/portfolio/all",);
        setDesigners(response.data.data);
      } catch (error) {
        alert("디자이너 조회 실패함.");
      }
    };
    fetchDesigners();
  }, []);

  const handleDesignerSelect = (selectedOption) => {
    setSelectedDesigner(selectedOption);
  };

  const designerOptions = designers.map((designer) => ({
    value: designer.designerEmail,
    label: designer.designerName,
  }));

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
            <div className="mt-10 ">

              <ImgUpload
                title = '리폼 의뢰 이미지'
                image = {reformImage}
                imageUpload={encodeImageFile}
                isMultiple = {true}
              />

              <div className = 'mt-10 mb-2'>
                <p className="block text-sm font-medium leading-6 text-gray-900" style = {{marginBottom : '0%'}}>디자이너</p>
                  <Select
                    options={designerOptions}
                    placeholder="디자이너 검색"
                    onChange={handleDesignerSelect}
                  />
              </div>
              
              <Input_Label
                title = '리폼부위'
                labelName = 'reformSection'
                value={requestPart}
                save={handleReformSectionChange}
              />

              <Input_Label
                title = '리폼요청 사항'
                labelName = 'productprice'
                value={requestInfo}
                save={handleRequestChange}
              />

              <Input_Label
                title = '희망가격'
                labelName = 'productstock'
                value={requestPrice}
                save={handleHopedPriceChange}
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-between items-center">

          <div className="flex gap-x-6">
            <div
              type="button"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={() => {
                registerHandler();
              }}
            >
              등록
            </div>
            <div 
              type="button" 
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={() => {
                cancelHandler();
              }}
            >
              취소
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Reform;
