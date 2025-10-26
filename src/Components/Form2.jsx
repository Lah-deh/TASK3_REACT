import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Toast from "../Components/Toast.jsx";


const api = axios.create({
  baseURL: "https://mockdata-93rw.onrender.com",
});


const ToastErrors = ({ setToast }) => {
  const { errors, submitCount } = useFormikContext();

  React.useEffect(() => {
    if (submitCount > 0 && Object.keys(errors).length > 0) {
      const firstError = Object.values(errors)[0];
      setToast({ message: firstError, type: "error" });
    }
  }, [errors, submitCount, setToast]);

  return null;
};

const Form2 = () => {
  const navigate = useNavigate();
  const [toast, setToast] = useState({ message: "", type: "" });

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required."),
    password: Yup.string()
      .min(6, "Minimum 6 characters")
      .required("Password is required."),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await api.get(
        `/users?email=${values.email}&password=${values.password}`
      );

      if (response.data.length > 0) {
        const user = response.data[0];
        localStorage.setItem("user", JSON.stringify(user));
        setToast({ message: "Login successful!", type: "success" });
        setTimeout(() => navigate("/dashboard"), 1500);
      } else {
        setToast({
          message: "Invalid credentials. Please try again.",
          type: "error",
        });
      }
    } catch (error) {
      console.error(error);
      setToast({ message: "Login failed. Server error.", type: "error" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login-page">
      {toast.message && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ message: "", type: "" })}
        />
      )}

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({ isSubmitting }) => (
          <>
            <ToastErrors setToast={setToast} />
            <Form className="login-form">
              <Field type="email" name="email" placeholder="Email" />
              <ErrorMessage name="email" component="div" className="error" />

              <Field type="password" name="password" placeholder="Password" />
              <ErrorMessage name="password" component="div" className="error" />

              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Logging in..." : "Login"}
              </button>
            </Form>
          </>
        )}
      </Formik>

      <p>
        Don’t have an account? <a href="/register">Register</a>
      </p>
    </div>
  );
};

export default Form2;
