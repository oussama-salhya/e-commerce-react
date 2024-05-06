const FormInput = ({ label, name, type, defaultValue, size, handleChange }) => {
  return (
    <div className="form-control">
      <label htmlFor={name} className="label">
        <span className="label-text capitalize">{label}</span>
      </label>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        className={`input input-bordered ${size}`}
        onChange={handleChange}
      />
    </div>
  );
};
export default FormInput;
