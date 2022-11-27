import React, { Component } from "react";
import { Spinner } from "react-bootstrap";
import http from "../../services/httpService";
import Input from "./input";
import Select from "./select";

import { imageApi, imageApiKey } from '../../config.json';

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = this.schema.validate(this.state.data, options);

    if (!error) return null;

    const newErrors = {};

    for (let item of error.details) newErrors[item.path[0]] = item.message;

    return newErrors;
  };

  validateProperty = ({ name, value }) => {
    const singleSchema = this.schema.extract([name]);
    const { error } = singleSchema.validate(value);

    return error ? error.details[0].message : null;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();

    this.setState({ errors: errors || {} });

    if (errors) return;

    this.doSubmit();
  };

  handleChange = (e) => {
    const errors = { ...this.state.errors };

    //single property validation
    const errorMessage = this.validateProperty(e.currentTarget);
    if (errorMessage) {
      errors[e.currentTarget.name] = errorMessage;
    } else delete errors[e.currentTarget.name];

    const data = { ...this.state.data };
    data[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ data, errors });
  };

  handleImageUpload = async (e) => {
    const imageApiEndPoint = imageApi;
    const imageData = new FormData();
    imageData.set("key", imageApiKey);
    imageData.append("image", e.target.files[0]);


    const modifiedData = this.state.data;
    modifiedData.deleteImage = "startUploading";
    this.setState({ data: modifiedData });

    const res = await http.post(imageApiEndPoint, imageData);
    // console.log(res);
    const { success, data } = res.data;

    if (success) {
      modifiedData.image = data.display_url;
      modifiedData.deleteImage = data.delete_url;
      // console.log(this.state.data);
    } else {
      console.log("Image Uploading failed");
    }

    this.setState({ data: modifiedData });
  };

  renderButton(label) {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  }

  renderSelect(name, label, options) {
    const { data, errors } = this.state;

    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;
    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderImageInput(name) {
    return (
      <div>
        <label className="form-group">Select a Image </label>
        <div className="form-group my-2">
          <input name={name} type="file" onChange={this.handleImageUpload} />
          {!this.state.data.image && <span>📷</span>}
          {this.state.data.deleteImage === "startUploading" && (
            <span>Image Uploading...<Spinner animation="border" variant="success" /></span>
          )}
          {this.state.data.image && <span>✔️</span>}
        </div>
      </div>
    );
  }
}

export default Form;
