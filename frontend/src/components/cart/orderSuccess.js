import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import MetaData from "../layout/MetaData";

const OrderSuccess = () => {
  return (
    <Fragment>
      <MetaData title={`Order Successful`} />
      <div className="container container-fluid">
        <div className="row justify-content-center">
          <div className="col-6 mt-5 text-center">
            <img
              className="my-5 img-fluid d-block mx-auto"
              src="/images/success.png"
              alt="Order Success"
              width="200"
              height="200"
            />

            <h2>Your Order has been placed successfully.</h2>

            <Link to="/orders/profile">Go to Orders</Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default OrderSuccess;
