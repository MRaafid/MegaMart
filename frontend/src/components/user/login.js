import React, { useEffect, Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useNavigate, useLocation, Link } from "react-router-dom";

import Loader from "../layout/loader";
import MetaData from "../layout/MetaData";
import { login, clearErrors } from "../../actions/userActions";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const redirect = queryParams.get("redirect")
    ? `/${queryParams.get("redirect")}`
    : "/";

  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirect);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, isAuthenticated, error, navigate, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="container container-fluid">
            <MetaData title="Login" />
            <div className="row wrapper">
              <div className="col-10 col-lg-5">
                <form className="shadow-lg" onSubmit={submitHandler}>
                  <h1 className="mb-3">Login</h1>
                  <div className="form-group">
                    <label htmlFor="email_field">Email</label>
                    <input
                      type="email"
                      id="email_field"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="password_field">Password</label>
                    <input
                      type="password"
                      id="password_field"
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <Link to="/password/forgot" className="float-right mb-4">
                    Forgot Password?
                  </Link>

                  <button
                    id="login_button"
                    type="submit"
                    className="btn btn-block py-3"
                  >
                    LOGIN
                  </button>

                  <Link to="/register" className="float-right mt-3">
                    New customer?
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Login;
