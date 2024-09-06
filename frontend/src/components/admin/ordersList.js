import React, { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { MDBDataTable } from "mdbreact";

import Loader from "../layout/loader";
import MetaData from "../layout/MetaData";
import {
  clearErrors,
  allOrders,
  deleteOrder,
} from "../../actions/orderActions";
import Sidebar from "./sidebar";
import { DELETE_ORDER_RESET } from "../../constants/orderConstants";

const OrdersList = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { error, loading, orders } = useSelector((state) => state.allOrders);
  const { isDeleted } = useSelector((state) => state.order);

  const deleteOrderHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteOrder(id));
    }
  };

  useEffect(() => {
    dispatch(allOrders());
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("The Order has been deleted");
      navigate("/admin/orders");
      dispatch({ type: DELETE_ORDER_RESET });
    }
  }, [dispatch, alert, error, isDeleted, navigate]);

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
          label: "No of Items",
          field: "numOfItems",
          sort: "asc",
        },
        {
          label: "Amount",
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
          <div className="actions-center">
            <Link
              to={`/admin/orders/${order._id}`}
              className="btn btn-primary py-1 px-2"
            >
              <i className="fa fa-eye"></i>
            </Link>
            <button
              className="btn btn-danger py-1 px-2 ml-2"
              onClick={() => deleteOrderHandler(order._id)}
            >
              <i className="fa fa-trash"></i>
            </button>
          </div>
        ),
      });
    });

    return data;
  };

  return (
    <Fragment>
      <MetaData title={`All Orders`} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <Fragment>
            <h1 className="my-5">All Orders</h1>
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
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default OrdersList;
