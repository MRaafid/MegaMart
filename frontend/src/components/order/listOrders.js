import React, { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { MDBDataTable } from "mdbreact";

import Loader from "../layout/loader";
import MetaData from "../layout/MetaData";
import { myOrders, clearErrors } from "../../actions/orderActions";

const ListOrders = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, loading, orders } = useSelector((state) => state.myOrders);

  const setOrders = () => {
    const data = {
      columns: [
        {
          label: "SL NO",
          field: "slNo",
          sort: "asc",
        },
        {
          label: "Order ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Number of Items",
          field: "numOfItems",
          sort: "asc",
        },
        {
          label: "Total Amount",
          field: "amount",
          sort: "asc",
        },
        {
          label: "Status",
          field: "status",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
          sort: "asc",
        },
      ],
      rows: [],
    };

    orders.forEach((order) => {
      data.rows.push({
        slNo: orders.indexOf(order) + 1,
        id: order._id,
        numOfItems: order.orderItems.length,
        amount: `$${order.totalPrice}`,
        status:
          order.orderStatus && order.orderStatus.includes("Delivered") ? (
            <p style={{ color: "green" }}>{order.orderStatus}</p>
          ) : (
            <p style={{ color: "red" }}>{order.orderStatus}</p>
          ),
        actions: (
          <Link to={`/order/${order._id}`} className="btn btn-primary">
            <i className="fa fa-eye"></i>
          </Link>
        ),
      });
    });

    return data;
  };

  useEffect(() => {
    dispatch(myOrders());
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error]);

  return (
    <Fragment>
      <div className="container container-fluid">
        <MetaData title={`My Orders`} />
        <h1 className="my-5">My Orders</h1>
        {loading ? (
          <Loader />
        ) : (
          <MDBDataTable
            data={setOrders()}
            className="px-3"
            bordered
            striped
            hover
          />
        )}
      </div>
    </Fragment>
  );
};

export default ListOrders;
