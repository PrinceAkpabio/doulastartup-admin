import React from "react";

export const Input = ({ handleChange, label, value, type, ...otherProps }) => (
  <div className="input-group">
    <input
      className="form-input"
      onChange={handleChange}
      value={value}
      type={type}
      {...otherProps}
    />
    {label ? (
      <label className={`label ${value && "shrink"}`}>{label}</label>
    ) : null}
    {/* { otherProps.errors.length > 0 && (
      <span className="error">{otherProps.errors}</span>
    )} */}
  </div>
);

export const FormInput = ({ handleChange, label, value, ...otherProps }) => (
  <div className="input-group">
    <textarea
      className="form-input"
      onChange={handleChange}
      value={value}
      type={otherProps.type}
      {...otherProps}
    />
    {label ? (
      <label className={`label ${value && "shrink"}`}>{label}</label>
    ) : null}
    {/* { otherProps.errors.length > 0 && (
      <span className="error">{otherProps.errors}</span>
    )} */}
  </div>
);
