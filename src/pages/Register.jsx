import { FormInput, SubmitBtn, FormRow } from "../components";
import { Form, Link, redirect, useNavigate } from "react-router-dom";
import { customFetch } from "../utils";
import { loginUser, registerUser } from "../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { errorMsg } from "../utils/msgService";
import { useEffect, useState } from "react";

export const action =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData();
    const { name, email, password } = Object.fromEntries(formData);
    if (!email || !password || !name) {
      errorMsg("Please fill out all fields");
      return null;
    }
    store.dispatch(registerUser({ name, email, password }));
    redirect("/login");
    return null;
  };

const initialState = {
  name: "",
  email: "",
  password: "",
};
const Register = () => {
  const [values, setValues] = useState(initialState);
  const { user, isLoading } = useSelector((store) => store.userState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  }, [user]);
  return (
    <section className="h-screen grid place-items-center">
      <Form
        method="post"
        className="card w-96  p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
      >
        <h3>Register</h3>
        {/* name field */}
        {!values.isMember && (
          <FormRow
            type="text"
            name="name"
            value={values.name}
            handleChange={handleChange}
          />
        )}
        {/* email field */}
        <FormRow
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
        />
        {/* password field */}
        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
        />
        <button type="submit" className="btn btn-block" disabled={isLoading}>
          {isLoading ? "loading..." : "submit"}
        </button>
        <p>
          Already a member : &nbsp;
          <Link to="/login">
            <button type="button">Login</button>
          </Link>
        </p>
      </Form>
    </section>
  );
};
export default Register;
