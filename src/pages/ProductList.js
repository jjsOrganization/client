import "../css/ProductList.css";
import { Link, useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axiosInstance from "../component/jwt.js";
import TopBar from "../component/TopBar.js";
import Pagination from "../component/Pagination.js"

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 8;

  const navigate = useNavigate();
  const { page } = useParams();
  const currentPage = page ? parseInt(page, 10) : 1;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/product/all", {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
      }
    };

    fetchData();
  }, []);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    navigate(`/products/${newPage}`);
  };

  const handleSearchChange = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    if (searchTerm.trim() === "") {
      setFilteredProducts(products);
    } else {
      const filteredProducts = products.filter((product) =>
        product.productName.toLowerCase().includes(searchTerm)
      );
      setFilteredProducts(filteredProducts);
    }
  };

  const handleSortByLatest = () => {
    setFilteredProducts(products);
    setFilteredProducts((prevProducts) =>
      prevProducts.slice().sort((a, b) => b.id - a.id)
    );
  };

  const handleSortByPopular = async () => {
    try {
      const resopnseLikeDesc = await axiosInstance.get(
        `/product/all/like/desc`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setFilteredProducts(products);
      setFilteredProducts(resopnseLikeDesc.data.data);
    } catch (error) {
    }
  };

  return (
    <div>
      <TopBar />
      <div className="sortButtons" style={{ height: '35px',display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <button className="bg-transparent h-100 text-black-700 font-semibold  py-2 px-4 border1 border-black-500  rounded" onClick={handleSortByLatest}>최신순</button>
        <button className="bg-transparent h-100 text-black-700 font-semibold  py-2 px-4 border1 border-black-500  rounded" onClick={handleSortByPopular}>인기순</button>
      </div>

      <div className="findProduct">
        <input
          type="text"
          placeholder="상품명 검색"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products</h2>

          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {currentProducts.map((product) => (
              <a
                key={product.id}
                href={product.href}
                className="group"
                style={{ textDecoration: "none" }}
              >
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                  <Link
                    to={`/detail/${product.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    {product.imgUrl && (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <img
                          src={`https://jjs-stock-bucket.s3.ap-northeast-2.amazonaws.com/${product.imgUrl}`}
                          alt={product.productName}
                          style={{ width: "350px", height: "350px" }}
                        />
                      </div>
                    )}

                    <p style={{ color: "black" }}>
                      상품명 : {product.productName}
                    </p>
                    <p style={{ color: "black" }}>가격 : {parseInt(product.price).toLocaleString()}</p>
                  </Link>
                </div>
                <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
              </a>
            ))}
          </div>
        </div>
      </div>
      <div>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default ProductList ;
