import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  //a hook that lets you navigate to different routes
  let navigate = useNavigate();
  // Define initial values for form fields
  const initialValues = {
    title: "",
    postText: "",
    username: "",
  };

  // Define validation schema using Yup to ensure correct form input
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("You must input a Title!"),
    postText: Yup.string().required(),
    username: Yup.string().min(3).max(15).required(),
  });

  // Function to handle form submission
  //EXPLANATION:
  //creating object with data. The object is sent to the server with a POST request to the endpoint
  //(the url). The server gets the objet and check if the validations are met. The data is being
  //stored in the database. After sending the request the server will give back a respose, like status code
  const onSubmit = (data) => {
    //send a POST request to the server with the form data
    axios.post("http://localhost:3001/posts", data).then((response) => {
      //After successfully  creating the post, navigate  back ti the homepage
      navigate("/");
    });
  };

  return (
    <div className="createPostPage">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Title: </label>
          <ErrorMessage name="title" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="title"
            placeholder="(Ex. Title...)"
          />
          <label>Post: </label>
          <ErrorMessage name="postText" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="postText"
            placeholder="(Ex. Post...)"
          />
          <label>Username: </label>
          <ErrorMessage name="username" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="username"
            placeholder="(Ex. John123...)"
          />

          <button type="submit"> Create Post</button>
        </Form>
      </Formik>
    </div>
  );
}
export default CreatePost;
