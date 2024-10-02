import "../css/DesignerSearch.css";
import { Link, useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axiosInstance from "../component/jwt.js";
import TopBar from "../component/TopBar.js";
import Pagination from "../component/Pagination.js";

const DesignerSearch = () => {
  const [designers, setDesigners] = useState([]);
  const [filteredDesigners, setFilteredDesigners] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 8;

  const navigate = useNavigate();
  const { page } = useParams();
  const currentPage = page ? parseInt(page, 10) : 1;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/portfolio/all", {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        console.log(response.data.data);
        setDesigners(response.data.data);
        setFilteredDesigners(response.data.data);
      } catch (error) {}
    };

    fetchData();
  }, []);

  const totalPages = Math.ceil(filteredDesigners.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentDesigners = filteredDesigners.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    navigate(`/designers/${newPage}`);
  };

  const handleSearchChange = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    if (searchTerm.trim() === "") {
      setFilteredDesigners(designers);
    } else {
      const filteredDesigners = designers.filter((designer) =>
        designer.designerName.toLowerCase().includes(searchTerm)
      );
      setFilteredDesigners(filteredDesigners);
    }
  };

  const handleSortByLatest = () => {
    setFilteredDesigners(designers);
    setFilteredDesigners((prevDesigners) =>
      prevDesigners.slice().sort((a, b) => b.id - a.id)
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
      setFilteredDesigners(designers);
      setFilteredDesigners(resopnseLikeDesc.data.data);
    } catch (error) {}
  };

  return (
    <div>
      <TopBar />
      {/* <div className="sortButtons">
        <button onClick={handleSortByLatest}>최신순</button>
        <button onClick={handleSortByPopular}>인기순</button>
      </div> */}

      <div className="findDesigner">
        <input
          type="text"
          placeholder="디자이너명 검색"
          value={searchTerm}
          onChange={handleSearchChange}
          class="block w-full rounded-md border-1 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Designers</h2>

          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {currentDesigners.map((designer) => (
              <a
                key={designer.id}
                href={designer.href}
                className="group"
                style={{ textDecoration: "none" }}
              >
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                  <Link
                    to={`/designer/${designer.designerName}`}
                    style={{ textDecoration: "none" }}
                  >
                    {designer.designerImagePath && (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <img
                          src={`${designer.designerImagePath}`}
                          alt={designer.designerName}
                          style={{ width: "350px", height: "350px" }}
                        />
                      </div>
                    )}

                    <p style={{ color: "black" }}>
                      디자이너명 : {designer.designerName}
                    </p>
                    <p style={{ color: "black" }}>
                      소개 :{" "}
                      {designer.explanation.length > 15
                        ? designer.explanation.substring(0, 15) + "..."
                        : designer.explanation}
                    </p>
                  </Link>
                </div>
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

export default DesignerSearch;
