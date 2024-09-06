import React, { useEffect, Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";

import MetaData from "../layout/MetaData";
import { forgotPassword, clearErrors } from "../../actions/userActions";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const alert = useAlert();

  // Extracting from Redux state
  const { error, loading, message } = useSelector(
    (state) => state.forgotPassword
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (message) {
      alert.success(message);
    }
  }, [dispatch, alert, error, message]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("email", email);

    dispatch(forgotPassword(formData));
  };

  return (
    <Fragment>
      <div className="container container-fluid">
        <MetaData title={"Forgot Password"} />
        <div className="row wrapper">
          <div className="col-10 col-lg-5">
            <form className="shadow-lg" onSubmit={submitHandler}>
              <h1 className="mb-3">Forgot Password</h1>
              <div className="form-group">
                <label htmlFor="email_field">Enter Email</label>
                <input
                  type="email"
                  id="email_field"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <button
                id="forgot_password_button"
                type="submit"
                className="btn btn-block py-3"
                disabled={loading ? true : false}
              >
                Send Email
              </button>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ForgotPassword;
