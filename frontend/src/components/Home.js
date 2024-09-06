import React, { Fragment, useState, useEffect } from "react";
import Pagination from "react-js-pagination";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";

import Slider from "rc-slider";
import { createSliderWithTooltip } from "rc-slider";
import "rc-slider/assets/index.css";

import MetaData from "./layout/MetaData";
import { getProducts } from "../actions/productActions";
import Product from "./product/product";
import Loader from "./layout/loader";

const Range = createSliderWithTooltip(Slider.Range);

const Home = () => {
  const { keyword } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([1, 10000000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);

  const categories = [
    "Electronics",
    "Fashion",
    "Home and Kitchen",
    "Books",
    "Sports and Outdoors",
    "Toys",
    "Groceries",
    "Health and Beauty",
    "Other",
  ];
  const alert = useAlert();
  const dispatch = useDispatch();

  const {
    loading,
    products = [],
    error,
    productCount,
    resultsPerPage,
    filteredProductCount,
  } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getProducts(keyword, currentPage, price, category, ratings));
  }, [dispatch, alert, error, keyword, currentPage, price, category, ratings]);

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }

  let count = productCount;

  if (keyword) {
    count = filteredProductCount;
  }

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="container container-fluid">
            <MetaData title={"Where Every Click is a Deal"} />
            <h1 id="products_heading">Latest Products</h1>
            <section id="products" className="container mt-5">
              <div className="row">
                {keyword ? (
                  <Fragment>
                    <div className="col-6 col-md-3 mt-5 mb-5">
                      <div className="px-5">
                        <Range
                          marks={{
                            1: `$1`,
                            10000000: `$10000000`,
                          }}
                          min={1}
                          max={10000000}
                          default={[1, 10000000]}
                          tipFormatter={(value) => `$${value}`}
                          tipProps={{
                            placement: "top",
                            visible: true,
                          }}
                          value={price}
                          onChange={(price) => setPrice(price)}
                        />

                        <hr className="my-5" />

                        <div className="my-5">
                          <h4 className="mb-3">Categories</h4>
                          <ul className="pl-0">
                            {categories.map((category) => (
                              <li
                                key={category}
                                style={{
                                  cursor: "pointer",
                                  listStyleType: "none",
                                }}
                                onClick={() => setCategory(category)}
                              >
                                {category}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <hr className="my-3" />

                        <div className="my-5">
                          <h4 className="mb-3">Ratings</h4>
                          <ul className="pl-0">
                            {[5, 4, 3, 2, 1].map((star) => (
                              <li
                                key={star}
                                style={{
                                  cursor: "pointer",
                                  listStyleType: "none",
                                }}
                                onClick={() => setRatings(star)}
                              >
                                <div className="rating-outer">
                                  <div
                                    className="rating-inner"
                                    style={{
                                      width: `${star * 20}%`,
                                    }}
                                  ></div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="col-6 col-md-9">
                      <div className="row">
                        {products.map((product) => (
                          <Product
                            key={product._id}
                            product={product}
                            col={4}
                          />
                        ))}
                      </div>
                    </div>
                  </Fragment>
                ) : (
                  products.map((product) => (
                    <Product key={product._id} product={product} col={3} />
                  ))
                )}
              </div>
            </section>
            {resultsPerPage <= count && (
              <div className="d-flex justify-content-center mt-5">
                <Pagination
                  activePage={currentPage}
                  itemsCountPerPage={resultsPerPage}
                  totalItemsCount={productCount}
                  onChange={setCurrentPageNo}
                  nextPageText={"Next"}
                  prevPageText={"Previous"}
                  firstPageText={"First"}
                  lastPageText={"Last"}
                  itemClass="page-item"
                  linkClass="page-link"
                />
              </div>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
