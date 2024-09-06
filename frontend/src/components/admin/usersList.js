import React, { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { MDBDataTable } from "mdbreact";

import Loader from "../layout/loader";
import MetaData from "../layout/MetaData";
import { allUsers, clearErrors, deleteUser } from "../../actions/userActions";
import Sidebar from "./sidebar";
import { DELETE_USER_RESET } from "../../constants/userConstants";

const UsersList = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { error, loading, users } = useSelector((state) => state.allUsers);
  const { isDeleted } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(allUsers());
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("The User has been deleted");
      navigate("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }
  }, [dispatch, alert, error, isDeleted, navigate]);

  const setUsers = () => {
    const data = {
      columns: [
        {
          label: "SL NO",
          field: "slNo",
          sort: "asc",
        },
        {
          label: "User ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "User Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Email",
          field: "email",
          sort: "asc",
        },
        {
          label: "Role",
          field: "role",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };

    users.forEach((user) => {
      data.rows.push({
        slNo: users.indexOf(user) + 1,
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        actions: (
          <div className="actions-center">
            <Link
              to={`/admin/users/${user._id}`}
              className="btn btn-primary py-1 px-2"
            >
              <i className="fa fa-pencil"></i>
            </Link>
            <button
              className="btn btn-danger py-1 px-2 ml-2"
              onClick={() => deleteUserHandler(user._id)}
            >
              <i className="fa fa-trash"></i>
            </button>
          </div>
        ),
      });
    });

    return data;
  };

  const deleteUserHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <Fragment>
      <MetaData title={`All Users`} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <Fragment>
            <h1 className="my-5">All Users</h1>
            {loading ? (
              <Loader />
            ) : (
              <MDBDataTable
                data={setUsers()}
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

export default UsersList;
