const FormRow = ({ type, name, value, handleChange, labelText }) => {
  return (
    <div className="form-control">
      <label htmlFor={name} className="label">
        <span className="label-text capitalize">{labelText || name}</span>
      </label>
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        className="input input-bordered"
      />
    </div>
  );
};
export default FormRow;
