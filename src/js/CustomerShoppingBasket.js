import React, { useState, useEffect } from "react";
import axios from "axios";
import TopBar from "./TopBar.js";
import "../css/CustomerShoppingBasket.css";
import { useNavigate } from "react-router-dom";

function CustomerShoppingBasket() {
  let navigate = useNavigate();
  const [customerShoppingBasket, setCustomerShoppingBasket] = useState([]);
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/cart/purchaser", {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        const data = response.data;
        console.log(data.data);
        setCustomerShoppingBasket(
          data.data.map((product) => ({
            ...product,
            totalPrice: product.price,
            checked: false, // 기본적으로 모든 상품은 체크되지 않은 상태로 설정
          }))
        );
      } catch (error) {
        console.log("데이터 로드 실패", error);
      }
    };

    fetchProducts();
  }, []);

  const setProductCount = (productId, newCount) => {
    setCustomerShoppingBasket((prevBasket) =>
      prevBasket.map((product) => {
        if (product.id === productId) {
          const count = Math.max(newCount, 0);
          const totalPrice = count === 0 ? 0 : product.price * count;
          return { ...product, count, totalPrice };
        }
        return product;
      })
    );
  };

  const handleCheckboxChange = (productId) => {
    setCustomerShoppingBasket((prevBasket) =>
      prevBasket.map((product) => {
        if (product.id === productId) {
          return { ...product, checked: !product.checked };
        }
        return product;
      })
    );
    setOrderList((prevOrderList) => {
      const selectedProduct = prevOrderList.find(
        (product) => product.id === productId
      );
      if (!selectedProduct) {
        const addedProduct = customerShoppingBasket.find(
          (product) => product.id === productId
        );
        return [...prevOrderList, addedProduct];
      } else {
        return prevOrderList.filter((product) => product.id !== productId);
      }
    });
  };
  console.log(orderList);

  const totalPriceOfCheckedItems = customerShoppingBasket
    .filter((product) => product.checked)
    .reduce((total, product) => total + product.totalPrice, 0);

  const handleOrder = async () => {
    try {
      const selectedProducts = customerShoppingBasket.filter(
        (product) => product.checked
      );

      const orderDTO = {
        orderDetails: selectedProducts.map((product) => ({
          productId: product.id,
          quantity: product.count,
        })),
        postcode: "",
        address: "",
        detailAddress: "",
        phoneNumber: "",
        deliveryRequest: "",
      };

      await axios.post(`/cart/purchaser/order`, orderDTO, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      // 주문이 성공적으로 완료되면 선택된 상품을 장바구니에서 삭제
      for (const product of selectedProducts) {
        await handleDelete(product.id);
      }
      // 페이지 이동
      navigate("/PurchaserInfo");
    } catch (error) {
      console.log("주문 실패", error);
    }
  };
  
  const handleDelete = async (productId) => {
    try {
      await axios.delete(`/cart/purchaser/delete/${productId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      setCustomerShoppingBasket((prevBasket) =>
        prevBasket.filter((product) => product.id !== productId)
      );
    } catch (error) {
      console.log("상품 삭제 실패", error);
    }
  };

  return (
    <div customerShoppingBasketDivTag>
      <TopBar />
      <h1>장바구니</h1>
      <div className="customerBakset">
        <h4>주문하기</h4>
        {customerShoppingBasket.map((product) => (
          <div key={product.id}>
            <hr className="customerBasketFirstHr"></hr>
            <img src={product.image} alt={product.name} />
            <div className="customerBasketPTag">
              <p>{product.productName}</p>
              <p>{product.price}원</p>
              {
                <p>
                  갯수 :
                  {
                    <button
                      className="basketCountButton"
                      onClick={() =>
                        setProductCount(product.id, product.count - 1)
                      }
                      disabled={product.checked || product.count <= 0}
                    >
                      -
                    </button>
                  }
                  {product.count}
                  {
                    <button
                      className="basketCountButton"
                      onClick={() =>
                        setProductCount(product.id, product.count + 1)
                      }
                      disabled={product.checked}
                    >
                      +
                    </button>
                  }
                </p>
              }
              <p>배송비 : {product.deliveryPrice}</p>
              <p>주문금액 : {product.totalPrice}</p>
              <button onClick={() => handleDelete(product.id)}>
                장바구니에서 삭제하기
              </button>
            </div>
            <input
              className="checkBoxForBasket"
              type="checkbox"
              checked={product.checked}
              onChange={() => handleCheckboxChange(product.id)}
            />
            <hr className="customerBasketLastHr"></hr>
          </div>
        ))}
        <div>
          <h3>선택한 상품 총액: {totalPriceOfCheckedItems}</h3>
          <button className="basketOrderButton" onClick={handleOrder}>
            주문하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default CustomerShoppingBasket;
