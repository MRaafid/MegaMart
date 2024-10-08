import React, { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useAlert } from "react-alert";

import Loader from "../layout/loader";
import MetaData from "../layout/MetaData";
import { getOrderDetails, clearErrors } from "../../actions/orderActions";

const OrderDetails = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();

  const { error, loading, order } = useSelector((state) => state.orderDetails);

  const {
    shippingInfo = {},
    paymentInfo = {},
    user = {},
    orderItems = [],
    totalPrice = 0,
    orderStatus = "",
  } = order || {};

  useEffect(() => {
    dispatch(getOrderDetails(id));
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error, id]);

  const shippingAddress =
    shippingInfo &&
    `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`;

  const isPaid =
    paymentInfo && paymentInfo.status === "succeeded" ? true : false;

  return (
    <Fragment>
      <MetaData title={`Order Details`} />
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="container container-fluid">
            <div className="row d-flex justify-content-between">
              <div className="col-12 col-lg-8 mt-5 order-details">
                <h1 className="my-5">Order #{order._id}</h1>

                <h4 className="mb-4">Shipping Info</h4>
                <p>
                  <b>Name:</b> {user && user.name}
                </p>
                <p>
                  <b>Phone:</b> {shippingInfo && shippingInfo.phoneNo}
                </p>
                <p className="mb-4">
                  <b>Address:</b> {shippingAddress}
                </p>
                <p>
                  <b>Amount:</b> ${totalPrice}
                </p>

                <hr />

                <h4 className="my-4">Payment</h4>
                <p className={isPaid ? "greenColor" : "redColor"}>
                  <b>{isPaid ? "PAID" : "PAYMENT PENDING"}</b>
                </p>

                <h4 className="my-4">Order Status:</h4>
                <p
                  className={
                    order.orderStatus && order.orderStatus.includes("Delivered")
                      ? "greenColor"
                      : "redColor"
                  }
                >
                  <b>{orderStatus}</b>
                </p>

                <h4 className="my-4">Order Items:</h4>
                {orderItems &&
                  orderItems.map((item) => (
                    <Fragment key={item.product}>
                      <hr />
                      <div className="cart-item my-1">
                        <div className="row my-5">
                          <div className="col-4 col-lg-2">
                            <img
                              src={item.image}
                              alt={item.name}
                              height="45"
                              width="65"
                            />
                          </div>

                          <div className="col-5 col-lg-5">
                            <Link to={`/products/${item.product}`}>
                              {item.product}
                            </Link>
                          </div>

                          <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                            <p>${item.price}</p>
                          </div>

                          <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                            <p>{item.quantity} Piece(s)</p>
                          </div>
                        </div>
                      </div>
                    </Fragment>
                  ))}

                <hr />
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default OrderDetails;
