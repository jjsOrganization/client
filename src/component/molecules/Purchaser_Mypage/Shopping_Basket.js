import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

const Shopping_Basket = ({
  open = true,
  setOpen,
  customerShoppingBasket = [],
  setProductCount,
  handleCheckboxChange,
  handleDelete,
  totalPriceOfCheckedItems,
  handleOrder,
}) => {
  return (
    <div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
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
                            장바구니
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                              onClick={() => setOpen(false)}
                            >
                              <span className="absolute -inset-0.5" />
                              <span className="sr-only">Close panel</span>
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
                                      src={`https://jjs-stock-bucket.s3.ap-northeast-2.amazonaws.com/${product.productImgs[0].imgUrl}`}
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
                                        <p className="ml-4">{product.price}</p>
                                      </div>
                                      <p className="mt-1 text-sm text-gray-500">
                                        {product.color}
                                      </p>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <p className="text-gray-500">
                                        갯수 :
                                        <button
                                          className="basketCountButton"
                                          style={{
                                            padding: "0.25rem 0.5rem",
                                            fontSize: "0.75rem",
                                          }}
                                          onClick={() =>
                                            setProductCount(
                                              product.id,
                                              product.count - 1
                                            )
                                          }
                                          disabled={
                                            product.checked ||
                                            product.count <= 0
                                          }
                                        >
                                          -
                                        </button>
                                        {product.count}
                                        <button
                                          className="basketCountButton"
                                          onClick={() =>
                                            setProductCount(
                                              product.id,
                                              product.count + 1
                                            )
                                          }
                                          disabled={product.checked}
                                        >
                                          +
                                        </button>
                                      </p>

                                      <div className="flex">
                                        {/* 상품 체크박스 */}
                                        <label className="customCheckbox">
                                          <input
                                            type="checkbox"
                                            checked={product.checked}
                                            onChange={() =>
                                              handleCheckboxChange(product.id)
                                            }
                                            style={{
                                              transform: "scale(1.5)",
                                              marginRight: "10px",
                                              marginTop: "10px",
                                            }}
                                          />
                                        </label>

                                        <button
                                          type="button"
                                          className="font-medium text-indigo-600 hover:text-indigo-500"
                                          onClick={() =>
                                            handleDelete(product.id)
                                          }
                                        >
                                          삭제하기
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
                          <h3>선택한 상품 총액: {totalPriceOfCheckedItems}</h3>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">
                          체크박스 선택시 가격이 자동으로 계산됩니다.
                        </p>
                        <div className="mt-6">
                          <a
                            href="#"
                            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                            onClick={handleOrder}
                          >
                            주문하기
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
                              장바구니 닫기
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
  );
};

export default Shopping_Basket;
