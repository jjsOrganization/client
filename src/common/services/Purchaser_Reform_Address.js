import axiosInstance from "../../component/jwt";

export const fetchPrice = async (estimateNumber, setProductPrice, setReformPrice, setTotalPrice) => {
  try {
    const response = await axiosInstance.get(`/estimate/purchaser/acceptReformOrder/${estimateNumber}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    const data = response.data.data;
    setProductPrice(data.productPrice);
    setReformPrice(data.reformPrice);
    setTotalPrice(data.totalPrice);
  } catch (error) {
    console.error("Error fetching price", error);
  }
};

export const handleReform = async (estimateNumber, orderInfo, setStatus) => {
  try {
    await axiosInstance.patch(
      `/estimate/purchaser/acceptReformOrder/${estimateNumber}`,
      orderInfo,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    alert("견적서 승인이 완료되었습니다.");
    setStatus(true);
  } catch (error) {
    console.error("Error handling reform", error);
  }
};

export const handleReformFinal = async (estimateNumber, navigate) => {
  try {
    await axiosInstance.patch(
      `/estimate/purchaser/acceptReformOrder/${estimateNumber}/complete`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    alert("견적서가 최종 승인이 완료되었습니다.");
    navigate("/");
  } catch (error) {
    console.error("Error handling final reform", error);
  }
};
