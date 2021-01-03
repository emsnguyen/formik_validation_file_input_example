import React, { useState } from "react";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";
import { Icon } from "@material-ui/core";
import { getIn } from "formik";
export const CustomImageInput = ({
  field,
  form,
  label,
  setFieldValue,
  ...props
}) => {
  const [preview, setPreview] = useState("");
  const errorText =
    getIn(form.touched, field.name) && getIn(form.errors, field.name);

  const handleImageChange = (e) => {
    e.preventDefault();
    let file = e.target.files[0];
    if (file) {
      setFieldValue(field.name, file);
      let comp = null;
      if (errorText) {
        comp = <Icon style={{ fontSize: 36 }}>error_outline</Icon>;
      } else if (file) {
        comp = (
          <img
            style={{ maxWidth: "300px", maxHeight: "300px" }}
            src={URL.createObjectURL(file)}
            alt="avatar"
          />
        );
      } else {
        comp = <Icon style={{ fontSize: 36 }}>folder</Icon>;
      }
      setPreview(comp);
    }
  };

  return (
    <FormControl margin="normal">
      <input
        style={{ display: "none" }}
        id="image-upload"
        name={field.name}
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />
      <div className="mb-2">{preview}</div>

      <label htmlFor="image-upload">
        <Button
          variant="contained"
          color="primary"
          margin="normal"
          component="span"
        >
          {label}
        </Button>
      </label>

      <FormHelperText>{errorText}</FormHelperText>
    </FormControl>
  );
};
