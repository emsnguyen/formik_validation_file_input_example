import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import { CustomImageInput } from "./components/CustomImageInput";
import { TextFormField } from "./components/TextFormField";
import { SelectFormField } from "./components/SelectFormField";
import * as yup from "yup";
import { Button } from "@material-ui/core";
class App extends Component {
  render() {
    const FILE_SIZE = 160 * 1024;
    const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];
    const PASSWORD_FORMAT = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    const validationSchema = yup.object().shape({
      email: yup
        .string()
        .required("Email is required")
        .email("Email is invalid"),
      password: yup
        .string()
        .required("Password is required")
        .matches(
          PASSWORD_FORMAT,
          "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special case character."
        ),
      sex: yup.string().required("Sex is required"),
      file: yup
        .mixed()
        .required("Avatar is required")
        .test(
          "fileSize",
          "File size cannot be larger than 160MB",
          (value) => value && value.size <= FILE_SIZE
        )
        .test(
          "fileFormat",
          "File can only be in jpg, png, jpeg format",
          (value) => value && SUPPORTED_FORMATS.includes(value.type)
        )
    });
    return (
      <div
        className="container mt-5"
        style={{ textAlign: "center", width: 400, margin: "auto" }}
      >
        <h4>Register Form</h4>
        <hr />
        <Formik
          initialValues={{
            email: "",
            password: "",
            sex: "",
            avatar: ""
          }}
          validationSchema={validationSchema}
          validateOnBlur={true}
          render={({ values, setFieldValue }) => {
            return (
              <Form>
                <div>
                  <Field name="email" component={TextFormField} label="Email" />
                </div>
                <div>
                  <Field
                    name="password"
                    component={TextFormField}
                    label="Password"
                  />
                </div>
                <div>
                  <Field
                    name="sex"
                    component={SelectFormField}
                    label="Sex"
                    options={[
                      { id: 1, name: "Male" },
                      { id: 2, name: "Female" }
                    ]}
                  />
                </div>
                <div>
                  <Field
                    name="avatar"
                    component={CustomImageInput}
                    label="Upload Avatar"
                    setFieldValue={setFieldValue}
                  />
                </div>
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
                <pre>Values: {JSON.stringify(values, null, 2)}</pre>
              </Form>
            );
          }}
        />
      </div>
    );
  }
}
export default App;
