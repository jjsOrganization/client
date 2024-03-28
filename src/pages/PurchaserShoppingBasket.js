import React, { Fragment, useState, useEffect } from "react";
import axiosInstance from "./jwt.js";
import TopBar from "../component/TopBar.js";
import "../css/PurchaserShoppingBasket.css";
import { useNavigate } from "react-router-dom";

import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

function CustomerShoppingBasket() {
  const [open, setOpen] = useState(true);
  let navigate = useNavigate();
  const [customerShoppingBasket, setCustomerShoppingBasket] = useState([]);
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get("/cart/purchaser", {
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

      await axiosInstance.post(`/cart/purchaser/order`, orderDTO, {
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
      await axiosInstance.delete(`/cart/purchaser/delete/${productId}`, {
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
    <div>
      <TopBar />

      <div className="customerShoppingBasketDivTag">
        <h1>장바구니</h1>
        <div className="customerBasket">
          <h4>주문하기</h4>
          {/* 장바구니 상품들 */}
          {customerShoppingBasket.map((product) => (
            <Fragment key={product.id}>
              <hr className="customerBasketFirstHr" />
              <img src={product.imageSrc} alt={product.imageAlt} />
              <div className="customerBasketPTag">
                <p>{product.name}</p>
                <p>{product.price}원</p>
                {/* 갯수 조절 버튼 */}
                <p>
                  갯수 :
                  <button
                    className="basketCountButton"
                    onClick={() =>
                      setProductCount(product.id, product.quantity - 1)
                    }
                    disabled={product.checked || product.quantity <= 0}
                  >
                    -
                  </button>
                  {product.quantity}
                  <button
                    className="basketCountButton"
                    onClick={() =>
                      setProductCount(product.id, product.quantity + 1)
                    }
                    disabled={product.checked}
                  >
                    +
                  </button>
                </p>
                <p>색상: {product.color}</p>
                <p>주문금액: {product.price * product.quantity}</p>
                {/* 장바구니에서 삭제 버튼 */}
                <button onClick={() => handleDelete(product.id)}>
                  장바구니에서 삭제하기
                </button>
              </div>
              {/* 상품 체크박스 */}
              <input
                className="checkBoxForBasket"
                type="checkbox"
                checked={product.checked}
                onChange={() => handleCheckboxChange(product.id)}
              />
              <hr className="customerBasketLastHr" />
            </Fragment>
          ))}
          {/* 총 주문 금액 */}
          <div>
            <h3>선택한 상품 총액: {totalPriceOfCheckedItems}</h3>
            <button className="basketOrderButton" onClick={handleOrder}>
              주문하기
            </button>
          </div>
        </div>
        {/* 다이얼로그 */}
        <Transition.Root show={open} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={setOpen}>
            {/* 다이얼로그 내부 */}
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-hidden">
              <div className="absolute inset-0 overflow-hidden">
                <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                  <Transition.Child
                    as={Fragment}
                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                    enterFrom="translate-x-full"
                    enterTo="translate-x-0"
                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                    leaveFrom="translate-x-0"
                    leaveTo="translate-x-full"
                  >
                    <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                      {/* 다이얼로그 내용 */}
                      <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                        {/* 다이얼로그 헤더 */}
                        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                          <div className="flex items-start justify-between">
                            <Dialog.Title className="text-lg font-medium text-gray-900">
                              Shopping cart
                            </Dialog.Title>
                            <div className="ml-3 flex h-7 items-center">
                              <button
                                type="button"
                                className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                                onClick={() => setOpen(false)}
                              >
                                <span className="absolute -inset-0.5" />
                                <span className="sr-only">Close panel</span>
                                {/* 아이콘 */}
                                <svg
                                  className="h-6 w-6"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                          {/* 장바구니 내용 */}
                          <div className="mt-8">
                            <div className="flow-root">
                              <ul
                                role="list"
                                className="-my-6 divide-y divide-gray-200"
                              >
                                {/* 상품 목록 */}
                                {customerShoppingBasket.map((product) => (
                                  <li key={product.id} className="flex py-6">
                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                      <img
                                        src={product.imageSrc}
                                        alt={product.imageAlt}
                                        className="h-full w-full object-cover object-center"
                                      />
                                    </div>

                                    <div className="ml-4 flex flex-1 flex-col">
                                      <div>
                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                          <h3>
                                            <a href={product.href}>
                                              {product.name}
                                            </a>
                                          </h3>
                                          <p className="ml-4">
                                            {product.price}
                                          </p>
                                        </div>
                                        <p className="mt-1 text-sm text-gray-500">
                                          {product.color}
                                        </p>
                                      </div>
                                      <div className="flex flex-1 items-end justify-between text-sm">
                                        <p className="text-gray-500">
                                          Qty {product.quantity}
                                        </p>

                                        <div className="flex">
                                          <button
                                            type="button"
                                            className="font-medium text-indigo-600 hover:text-indigo-500"
                                          >
                                            Remove
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>

                        {/* 다이얼로그 푸터 */}
                        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <p>Subtotal</p>
                            <p>$262.00</p>
                          </div>
                          <p className="mt-0.5 text-sm text-gray-500">
                            Shipping and taxes calculated at checkout.
                          </p>
                          <div className="mt-6">
                            <a
                              href="#"
                              className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                            >
                              Checkout
                            </a>
                          </div>
                          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                            <p>
                              or{" "}
                              <button
                                type="button"
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                                onClick={() => setOpen(false)}
                              >
                                Continue Shopping
                                <span aria-hidden="true"> &rarr;</span>
                              </button>
                            </p>
                          </div>
                        </div>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      </div>
    </div>
  );
}

export default CustomerShoppingBasket;
