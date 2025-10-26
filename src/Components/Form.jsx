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

const Register = () => {
  const navigate = useNavigate();
  const [toast, setToast] = useState({ message: "", type: "" });

  const initialValues = {
    email: "",
    password: "",
    fullName: "",
    phone: "",
    address: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required."),
    password: Yup.string().min(6, "Minimum 6 characters").required("Password is required."),
    fullName: Yup.string().required("Full name is required."),
    phone: Yup.string().required("Phone number is required."),
    address: Yup.string().required("Address is required."),
  });

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      
      const res = await api.get("/users");
      const userExists = res.data.find((user) => user.email === values.email);

      if (userExists) {
        setToast({ message: "User already exists with this email.", type: "error" });
        return;
      }

      
      const response = await api.post("/users", {
        ...values,
        tickets: [],
      });

      localStorage.setItem("user", JSON.stringify(response.data));
      setToast({ message: "Registration successful!", type: "success" });

      setTimeout(() => navigate("/dashboard"), 1000);
      resetForm();
    } catch (error) {
      console.error(error);
      setToast({ message: "Error submitting form. Please try again.", type: "error" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="register-page">
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
            <Form className="register-form">
              <Field type="email" name="email" placeholder="Email" />
              <ErrorMessage name="email" component="div" className="error" />

              <Field type="password" name="password" placeholder="Password" />
              <ErrorMessage name="password" component="div" className="error" />

              <Field type="text" name="fullName" placeholder="Full Name" />
              <ErrorMessage name="fullName" component="div" className="error" />

              <Field type="text" name="phone" placeholder="Phone Number" />
              <ErrorMessage name="phone" component="div" className="error" />

              <Field type="text" name="address" placeholder="Address" />
              <ErrorMessage name="address" component="div" className="error" />

              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Register"}
              </button>
            </Form>
          </>
        )}
      </Formik>

      <p>
        Already have an account? <a href="/Login">Login</a>
      </p>
    </div>
  );
};

export default Register;
