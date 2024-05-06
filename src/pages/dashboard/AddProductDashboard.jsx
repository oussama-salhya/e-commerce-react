import styled from "styled-components";
import { HiOutlineArchive, HiOutlineCamera } from "react-icons/hi";
// import //   FormRow,
//   HeaderDashboardPage,
//   DropZone,
//   FormRowSelect,
//   Loading,
// "../../components";
import { Form, redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  clearSingleProductValues,
  createProduct,
  //   displayError,
  editProduct,
  handleChange,
} from "../../features/product/productSlice";
import { FormInput, SubmitBtn, FormSelect } from "../../components";
// import FormSelect from "../../components/FormSelect";
// import { useEffect } from "react";
import { getAllCategories } from "../../features/categories/categoriesSlice";
import { errorMsg } from "../../utils/msgService";
import { getAllCompanies } from "../../features/company/companiesSlice";
const AddProductDashboard = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const dispatch = useDispatch();
  const { categories } = useSelector((store) => store.categoriesState);
  const { companies } = useSelector((store) => store.companiesState);
  const product = useSelector((store) => store.productState);
  let { name, description, price, category, company, stock, image, isLoading } =
    product;
  //   const test = useSelector((store) => store.productState);

  const OnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChange({ name, value, changeProduct: true }));
  };
  //   const clearProduct = () => {
  //     dispatch(clearSingleProductValues());
  //     if (showError) {
  //       dispatch(hideError());
  //     }
  //   };
  const onSubmit = (e) => {
    e.preventDefault();
    // if (!product.category) {
    //   product.category = categories[0].name;
    // }
    if (!product.category) {
      dispatch(handleChange({ name: "category", value: categories[0].name }));
    }
    if (!product.company) {
      dispatch(handleChange({ name: "company", value: companies[0].name }));
    }
    console.log("product", product);
    // if (
    //   // !name ||
    //   // !description ||
    //   // !Number(price) ||
    //   // !category ||
    //   // !company ||
    //   // images.length === 0
    // ) {
    //   // dispatch(displayError());
    //   errorMsg({ message: "All fields are required" });
    //   return;
    // }
    // if (isEditing) {
    //   dispatch(editProduct());
    //   if (showError) {
    //     dispatch(hideError());
    //   }
    //   return;
    // }
    // if (showError) {
    //   dispatch(hideError());
    // }
    dispatch(createProduct());
  };

  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(getAllCompanies());
  }, []);
  // useEffect(() => {
  //   if (!isEditing) {
  //     dispatch(clearSingleProductValues());
  //   }
  // }, []);
  return (
    <Wrapper>
      {/* <HeaderDashboardPage
        title={isEditing ? "Edit product" : "add product"}
        pathList={[
          "dashboard",
          "Products",
          isEditing ? "Edit product" : "add product",
        ]}
      /> */}
      <form onSubmit={handleSubmit}>
        <div className="general-info">
          <div className="row">
            <div className="card-header">
              <HiOutlineArchive />
              <h2 className="title">General Info</h2>
              <p className="desc">
                Add here the product description with all details and necessary
                information. All fields are required, so be sure to complete
                each one before submitting the form.{" "}
              </p>
            </div>
            <div className="card-content">
              {/* product name */}
              <FormInput
                type="text"
                label="product name"
                name="name"
                value={name}
                handleChange={OnChange}
                // showError={showError}
              />
              {/* category */}
              <FormSelect
                name="category"
                id="category"
                handleChange={OnChange}
                label={"categories"}
                list={categories}
                // showError={showError}
              />
              {/* company */}
              <FormSelect
                name="company"
                id="company"
                handleChange={OnChange}
                label={"companies"}
                list={companies}
                // showError={showError}
              />
              {/* stock */}
              <FormInput
                name="stock"
                handleChange={OnChange}
                type="text"
                value={stock}
                label={"stock"}
                // showError={false}
              />
              {/* price */}
              <FormInput
                name="price"
                label={"price"}
                handleChange={OnChange}
                type="text"
                value={price}
                // showError={showError}
              />
              {/* description */}
              <FormInput
                type="textarea"
                label="product description"
                name="description"
                value={description}
                handleChange={OnChange}
                // showError={showError}
              />
            </div>
          </div>
        </div>
        <div className="general-info">
          <div className="row">
            <div className="card-header">
              <HiOutlineCamera />
              <h2 className="title">Product Image</h2>
              <p className="desc">
                Upload your product images. Once the images appears , click on
                the image that will appear to the user as a main image
              </p>
            </div>
            <input type="file" name="image" />
            {/* <div className="card-content">
              <DropZone />
              {showError && !images.length && (
                <span className="form-alert">
                  product should contain images
                </span>
              )}
            </div> */}
          </div>
        </div>
        <div className="container-btns">
          <button type="submit" className="btn btn-save" onClick={onSubmit}>
            {isLoading ? "Loading ..." : "Save changes"}
          </button>
          <button
            type="button"
            className="btn btn-clear"
            // onClick={clearProduct}
          >
            clear
          </button>
        </div>
      </form>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  padding: 40px;
  position: relative;
  vertical-align: top;
  margin-top: 10px;
  @media only screen and (min-width: 768px) {
    margin-left: 300px;
  }
  @media only screen and (max-width: 767px) {
    padding: 0 15px 15px;
  }
  form {
    margin-top: 2rem;
  }
  .form-input {
    border-radius: 0.3rem;
    border-width: 1px;
  }
  .general-info {
    background: var(--white);
    border-radius: 0.35rem;
    margin-top: 1rem;
    overflow: hidden;
  }

  .row,
  .container-input {
    display: flex;
    flex-wrap: wrap;
  }
  .container-input {
    padding-bottom: 1rem !important;
  }
  .row > div {
    padding: 2.5rem 2rem;
  }
  .card-header {
    background: var(--black);
    color: var(--white);
  }
  .card-header svg {
    font-size: 5.2rem;
    position: relative;
    left: -9px;
    margin-bottom: 10px;
  }
  .card-header .title {
    color: var(--white);
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 1.2;
    margin: 0 0 10px;
  }
  .card-header .desc {
    font-size: 1rem;
  }
  .container-btns {
    margin-top: 1.5rem;
  }
  .btn {
    background: #0088cc;
    margin-right: 1.5rem;
  }

  @media (min-width: 992px) {
    .card-header {
      flex: 0 0 40%;
      max-width: 40%;
    }
    .card-content {
      flex: 0 0 60%;
      max-width: 60%;
    }
    .form-label {
      text-align: right !important;
      flex: 0 0 auto;
      width: 41.66666667%;
      padding-right: 1.5rem;
      padding-top: 0.35rem;
    }
    .container-input > div {
      flex: 0 0 auto;
      width: 58.33333333%;
    }
  }
  @media (min-width: 1200px) {
    .card-header {
      flex: 0 0 20%;
      max-width: 20%;
    }
    .card-content {
      flex: 0 0 80%;
      max-width: 80%;
    }
    .form-label {
      flex: 0 0 auto;
      width: 25%;
    }
    .container-input > div {
      flex: 0 0 auto;
      width: 50%;
    }
  }
`;
export default AddProductDashboard;
