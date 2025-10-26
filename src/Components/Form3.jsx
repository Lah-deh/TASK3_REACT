import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Toast from "../Components/Toast.jsx";

// API instance
const api = axios.create({
  baseURL: "https://mockdata-93rw.onrender.com",
});

const TicketForm = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [toast, setToast] = useState({ message: "", type: "" });

  const initialValues = {
    title: "",
    description: "",
    priority: "",
    status: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required."),
    description: Yup.string().required("Description is required."),
    priority: Yup.string().required("Priority is required."),
    status: Yup.string().required("Status is required."),
  });

  const handleSubmit = async (values, { resetForm }) => {
    if (!user) {
      setToast({
        message: "You must be logged in to create a ticket.",
        type: "error",
      });
      return;
    }

    const newTicket = {
      id: Math.random().toString(36).slice(2, 6),
      ...values,
      createdAt: new Date().toISOString(),
    };

    try {
      // Get user data
      const res = await api.get(`/users/${user.id}`);

      // Add new ticket to user's ticket list
      const updatedUser = {
        ...res.data,
        tickets: [...(res.data.tickets || []), newTicket],
      };

      // Update user data
      await api.put(`/users/${user.id}`, updatedUser);

      setToast({ message: "Ticket created successfully!", type: "success" });
      resetForm();
    } catch (error) {
      console.error(error);
      setToast({ message: "Error saving ticket.", type: "error" });
    }
  };

  return (
    <section>
      {toast.message && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ message: "", type: "" })}
        />
      )}

      <h2>New Ticket</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnBlur={false}
        validateOnChange={false}
      >
        {({ isSubmitting }) => (
          <Form>
            <article>
              <label htmlFor="title">Title</label>
              <Field id="title" name="title" type="text" />
              <ErrorMessage name="title" component="small" />
            </article>

            <article>
              <label htmlFor="description">Description</label>
              <Field as="textarea" id="description" name="description" rows="3" />
              <ErrorMessage name="description" component="small" />
            </article>

            <article>
              <label htmlFor="priority">Priority</label>
              <Field as="select" id="priority" name="priority">
                <option value="">Select</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </Field>
              <ErrorMessage name="priority" component="small" />
            </article>

            <article>
              <label htmlFor="status">Status</label>
              <Field as="select" id="status" name="status">
                <option value="">Select</option>
                <option value="Open">Open</option>
                <option value="Resolved">Resolved</option>
              </Field>
              <ErrorMessage name="status" component="small" />
            </article>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Create Ticket"}
            </button>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default TicketForm;
