import React, { useState } from "react";
import { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";
// import SidebarLayout from "./SidebarLayout";
// import LogoWhite from "../assets/logo-white.png";
// import LogoBlack from "../assets/logo.png";
import { useDispatch } from "react-redux";
// import { closeActionsButton } from "../Features/products/ProductsSlice";
import { showMe } from "../../features/user/userSlice";
import { getAllCategories } from "../../features/categories/categoriesSlice";
const SharedDashboardLayout = () => {
  const [isSidebaropen, setIsSidebarOpen] = useState(true);
  const dispatch = useDispatch();
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebaropen);
  };
  useEffect(() => {
    dispatch(showMe());
    // dispatch(getAllCategories());
  }, []);
  return (
    <Wrapper>
      <header className="header header-nav-menu header-nav-links">
        <div className="logo-container">
          <Link to="/dashboard" className="logo">
            <img
              //   src={LogoWhite}
              className="logo-image"
              width="150"
              height="24"
              alt="Meublux Admin"
            />
            <img
              //   src={LogoBlack}
              className="logo-image-mobile"
              width="150"
              height="41"
              alt="Meublux Admin"
            />
          </Link>
          <button
            className="btn header-btn-collapse-nav d-lg-none"
            data-bs-toggle="collapse"
            data-bs-target=".header-nav"
          >
            <div className="hamburger-menu">
              <div className="line-1"></div>
              <div className="line-2"></div>
            </div>
          </button>
        </div>
        {/* start: header nav menu  */}
        <div className="header-nav collapse">
          <div className="header-nav-main header-nav-main-effect-1 header-nav-main-sub-effect-1 header-nav-main-square">
            <nav>
              <ul className="nav nav-pills" id="mainNav">
                <li className="">
                  <a className="nav-link" href="layouts-default.html">
                    Dashboard
                  </a>
                </li>
                <li className="dropdown">
                  <a className="nav-link dropdown-toggle" href="#">
                    Layouts
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="nav-link" href="index.html">
                        Landing Page
                      </a>
                    </li>
                    <li>
                      <a className="nav-link" href="layouts-default.html">
                        Default
                      </a>
                    </li>
                    <li>
                      <a className="nav-link" href="layouts-modern.html">
                        Modern
                      </a>
                    </li>
                    <li className="dropdown-submenu">
                      <a className="nav-link">Boxed</a>
                      <ul className="dropdown-menu">
                        <li>
                          <a className="nav-link" href="layouts-boxed.html">
                            Static Header
                          </a>
                        </li>
                        <li>
                          <a
                            className="nav-link"
                            href="layouts-boxed-fixed-header.html"
                          >
                            Fixed Header
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li className="dropdown-submenu">
                      <a className="nav-link">Horizontal Menu Header</a>
                      <ul className="dropdown-menu">
                        <li>
                          <a
                            className="nav-link"
                            href="layouts-header-menu.html"
                          >
                            Pills
                          </a>
                        </li>
                        <li>
                          <a
                            className="nav-link"
                            href="layouts-header-menu-stripe.html"
                          >
                            Stripe
                          </a>
                        </li>
                        <li>
                          <a
                            className="nav-link"
                            href="layouts-header-menu-top-line.html"
                          >
                            Top Line
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a className="nav-link" href="layouts-dark.html">
                        Dark
                      </a>
                    </li>
                    <li>
                      <a className="nav-link" href="layouts-dark-header.html">
                        Dark Header
                      </a>
                    </li>
                    <li>
                      <a
                        className="nav-link"
                        href="layouts-two-navigations.html"
                      >
                        Two Navigations
                      </a>
                    </li>
                    <li className="dropdown-submenu">
                      <a className="nav-link">Tab Navigation</a>
                      <ul className="dropdown-menu">
                        <li>
                          <a
                            className="nav-link"
                            href="layouts-tab-navigation-dark.html"
                          >
                            Tab Navigation Dark
                          </a>
                        </li>
                        <li>
                          <a
                            className="nav-link"
                            href="layouts-tab-navigation.html"
                          >
                            Tab Navigation Light
                          </a>
                        </li>
                        <li>
                          <a
                            className="nav-link"
                            href="layouts-tab-navigation-boxed.html"
                          >
                            Tab Navigation Boxed
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a className="nav-link" href="layouts-light-sidebar.html">
                        Light Sidebar
                      </a>
                    </li>
                    <li>
                      <a
                        className="nav-link"
                        href="layouts-left-sidebar-collapsed.html"
                      >
                        Left Sidebar Collapsed
                      </a>
                    </li>
                    <li>
                      <a
                        className="nav-link"
                        href="layouts-left-sidebar-scroll.html"
                      >
                        Left Sidebar Scroll
                      </a>
                    </li>
                    <li className="dropdown-submenu">
                      <a className="nav-link">Left Sidebar Big Icons</a>
                      <ul className="dropdown-menu">
                        <li>
                          <a
                            className="nav-link"
                            href="layouts-left-sidebar-big-icons.html"
                          >
                            Left Sidebar Big Icons Dark
                          </a>
                        </li>
                        <li>
                          <a
                            className="nav-link"
                            href="layouts-left-sidebar-big-icons-light.html"
                          >
                            Left Sidebar Big Icons Light
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li className="dropdown-submenu">
                      <a className="nav-link">Left Sidebar Panel</a>
                      <ul className="dropdown-menu">
                        <li>
                          <a
                            className="nav-link"
                            href="layouts-left-sidebar-panel.html"
                          >
                            Left Sidebar Panel Dark
                          </a>
                        </li>
                        <li>
                          <a
                            className="nav-link"
                            href="layouts-left-sidebar-panel-light.html"
                          >
                            Left Sidebar Panel Light
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li className="dropdown-submenu">
                      <a className="nav-link">Left Sidebar Sizes</a>
                      <ul className="dropdown-menu">
                        <li>
                          <a
                            className="nav-link"
                            href="layouts-sidebar-sizes-xs.html"
                          >
                            Left Sidebar XS
                          </a>
                        </li>
                        <li>
                          <a
                            className="nav-link"
                            href="layouts-sidebar-sizes-sm.html"
                          >
                            Left Sidebar SM
                          </a>
                        </li>
                        <li>
                          <a
                            className="nav-link"
                            href="layouts-sidebar-sizes-md.html"
                          >
                            Left Sidebar MD
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a
                        className="nav-link"
                        href="layouts-square-borders.html"
                      >
                        Square Borders
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        {/* end: header nav menu  */}

        {/* start: search & user box  */}
        <div className="header-right">
          <div id="userbox" className="userbox">
            <button data-bs-toggle="dropdown">
              <span className="profile-picture profile-picture-as-text">
                JD
              </span>
              <div
                className="profile-info profile-info-no-role"
                data-lock-name="John Doe"
                data-lock-email="johndoe@okler.com"
              >
                <span className="name">
                  Hi, <strong className="font-weight-semibold">John Doe</strong>
                </span>
              </div>

              <i className="fas fa-chevron-down text-color-dark"></i>
            </button>

            <div className="dropdown-menu">
              <ul className="list-unstyled">
                <li>
                  <a
                    role="menuitem"
                    tabIndex="-1"
                    href="pages-user-profile.html"
                  >
                    <i className="bx bx-user"></i> My Profile
                  </a>
                </li>
                <li>
                  <a
                    role="menuitem"
                    tabIndex="-1"
                    href="#"
                    data-lock-screen="true"
                  >
                    <i className="bx bx-lock-open-alt"></i> Lock Screen
                  </a>
                </li>
                <li>
                  <a role="menuitem" tabIndex="-1" href="pages-signin.html">
                    <i className="bx bx-log-out"></i> Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* end: search & user box  */}
      </header>
      <div className="inner-wrapper">
        {/* <SidebarLayout /> */}
        <Outlet />
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  /* styling the header */
  .header {
    height: 70px;
    z-index: 1011;
    background: #fff;
    border-bottom: 1px solid #e9e9e6;
    border-top: 3px solid #ededed;
    left: 0;
    right: 0;
    top: 0;
    position: absolute;
  }

  @media only screen and (min-width: 768px) {
    .header {
      position: fixed;
      z-index: 1020;
    }
  }
  @media only screen and (max-width: 767px) {
    .header .logo-container {
      background-image: linear-gradient(#f6f6f6 0%, #ffffff 45%);
      border-bottom: 1px solid #e9e9e6;
      border-top: 3px solid #ededed;
      height: 60px;
      left: 0;
      position: fixed;
      right: 0;
      top: 0;
      z-index: 99;
    }
  }
  /* logo styling  */
  .header .logo {
    float: left;
    margin: 10px 0 0 15px;
  }
  @media only screen and (min-width: 768px) {
    .header.header-nav-menu .logo {
      position: absolute;
      left: 0;
      padding: 15px 20px 0 0px;
    }
    .header.header-nav-menu .logo:after {
      width: 300px;
      height: 70px;
      background: #1d2127;
      left: -15px;
      pointer-events: none;
      border: 0;
      z-index: -1;
      content: "";
      display: block;
      position: absolute;
      top: -13px;
      right: 0;
    }
  }
  @media only screen and (max-width: 767px) {
    .header .logo-container .logo {
      float: none;
      display: inline-block;
      line-height: 57px;
      margin-top: 7px;
    }
  }
  /* logo image */
  .logo-image-mobile {
    display: none;
  }
  @media only screen and (max-width: 767px) {
    .logo-image {
      display: none;
    }
    .logo-image-mobile {
      display: block;
    }
  }
  .logo-container .btn {
    --gold: transparent;
    float: right;
    margin-top: 10px;
    margin-right: 15px;
    box-shadow: none;
  }
  @media only screen and (min-width: 767px) {
    .logo-container .btn {
      display: none;
    }
  }
  /* styling the header nav */
  @media only screen and (min-width: 767px) {
    .header-nav {
      display: none;
    }
  }
  .header-nav {
    clear: both;
    float: none;
    display: none;
  }
  /* open the heder nav by adding show className */
  .header-nav.show {
    display: block;
    position: fixed;
    width: 100%;
    top: 58px;
    z-index: 2000;
  }
  .header-nav-main {
    display: flex !important;
    min-height: 70px;
    margin: 0;
    background: #fff;
    padding: 10px;
    max-height: 350px;
    overflow-x: hidden;
    overflow-y: auto;
  }
  .header-nav-main nav {
    width: 100%;
  }
  .header-nav-main nav > ul {
    display: flex;
    flex-wrap: wrap;
    padding-left: 0;
    margin-bottom: 0;
    list-style: none;
    flex-direction: column;
    margin-top: 0;
  }
  .header-nav-main nav > ul li {
    border-bottom: 1px solid #e8e8e8;
    clear: both;
    display: block;
    float: none;
    margin: 0;
    padding: 0;
    position: relative;
  }
  .nav-link {
    font-size: 13px;
    font-style: normal;
    line-height: 20px;
    padding: 7px 8px;
    margin: 1px 0;
    border-radius: 4px;
    white-space: initial;
    display: inline-block;
  }
  .header-nav-main nav > ul > li > a {
    color: #0088cc;
    text-transform: uppercase;
    font-weight: 700;
  }
  .header-nav-main nav > ul li.dropdown .dropdown-menu {
    background: transparent;
    padding: 0;
    margin: 0;
    font-size: 13px;
    box-shadow: none;
    border-radius: 0;
    border: 0;
    clear: both;
    display: none;
    float: none;
    position: static;
    border-top: 0 !important;
  }
  .header-nav-main nav > ul li.dropdown .dropdown-menu {
    background: transparent;
    padding: 0;
    margin: 0;
    font-size: 13px;
    box-shadow: none;
    border-radius: 0;
    border: 0;
    clear: both;
    display: none;
    float: none;
    position: static;
    border-top: 0 !important;
  }
  /* here we add showed className to open the dropdown */
  .header-nav-main nav > ul li.dropdown.showed > .dropdown-menu {
    display: block;
    margin-left: 20px;
  }
  /* styling the header right */

  .header-right {
    display: flex;
    align-items: center;
    height: 66px;
    float: right;
  }
  @media screen and (max-width: 767px) {
    .header-right {
      background: #fff;
      float: none !important;
      margin-top: 60px;
      width: 100%;
    }
  }
  .userbox {
    margin: 0 17px 0 1rem;
    display: inline-block;
    vertical-align: middle;
  }
  .userbox button {
    display: inline-block;
  }
  .userbox > button.show {
    position: relative;
    z-index: 993;
  }
  .profile-picture {
    background: #0088cc;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-weight: 600;
    width: 40px;
    height: 40px;
    border-radius: 100%;
    font-size: 17.6px;
    font-size: 1.1rem;
    padding-right: 1px;
  }
  .userbox .profile-info {
    margin: -3px 10px 0 9px;
  }
  @media screen and (min-width: 767px) {
    .userbox .profile-info {
      display: none;
    }
  }
  .userbox .name {
    max-width: 68px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 0.8rem;
    line-height: 1.1rem;
  }
  .userbox .dropdown-menu {
    border: none;
    box-shadow: 0 1px 2px 1px rgb(0 0 0 / 20%);
    box-sizing: content-box;
    padding: 0 10px;
    top: 70px;
    transform: none !important;
    width: 100%;
    min-width: 0;
    z-index: 992;
    position: absolute;
    display: none;
    margin: 0;
    font-size: 1rem;
    color: #212529;
    text-align: left;
    list-style: none;
    background-color: #fff;
  }
  .userbox .dropdown-menu.show {
    display: block;
  }

  /* styling the sidebar */
  .inner-wrapper {
    min-height: 100vh;
    table-layout: fixed;
    overflow: hidden;
    width: 100%;
    background: var(--grey-50);
  }
  @media only screen and (min-width: 768px) {
    .inner-wrapper {
      padding-top: 70px;
    }
  }

  .sidebar-left {
    padding-bottom: 0;
    z-index: 1011;
    background: var(--black);
    width: 300px;
    color: #777;
    position: fixed;
  }

  @media only screen and (max-width: 768px) {
    .sidebar-left {
      display: none;
    }
  }

  .sidebar-left .sidebar-header {
    height: 10px;
    position: relative;
  }
  .sidebar-left .sidebar-toggle {
    display: flex !important;
    align-items: center;
    justify-content: center;
    top: -70px;
    background-color: #1d2127;
    height: 75px;
    position: absolute;
    right: 0;
    width: 73px;
    z-index: 10000;
  }
  .sidebar-left .hamburger-menu {
    --black: #fff;
  }
  .hamburger-menu {
    display: grid;
    gap: 0.3rem;
    padding: 0.5rem 0;
  }
  .line-1,
  .line-2 {
    width: 30px;
    background-color: var(--black);
    height: 2px;
  }
  .line-2 {
    width: 20px;
  }
  .sidebar-left .nano {
    position: relative;
    height: calc(100vh - 80px);
    overflow: hidden;
    width: 100%;
  }
  ul.nav-main {
    margin-top: 10rem;
    margin-right: 5px;
  }
  ul.nav-main li {
    width: 100%;
  }
  ul.nav-main li > a {
    position: relative;
    display: flex;
    font-size: 1rem;
    color: #abb4be;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding: 12px 25px;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
      border-color 0.15s ease-in-out;
  }
  /* change later i with svg */
  ul.nav-main li > a > svg {
    fill: white;
    width: 22px;
    margin-right: 1em;
    text-align: center;
    vertical-align: middle;
    height: 22px;
    transition: 0.5s ease;
  }
  ul.nav-main li > a > span + svg {
    position: absolute;
    right: 0;
    fill: #57595b;
  }
  ul.nav-main li span {
    vertical-align: middle;
    font-size: 1rem;
    text-transform: capitalize;
  }
  ul.nav-main li.nav-parent {
    position: relative;
  }
  ul.nav-main > li.nav-active > a {
    box-shadow: none;
    background: #191c21;
  }
  ul.nav-main li.nav-expanded > a {
    color: #fff;
  }
  ul.nav-main li .nav-children {
    background: #191c21;
    box-shadow: 0px -3px 3px -3px rgb(0 0 0 / 70%) inset;
    overflow: hidden;
    transition: height 0.5s ease;
  }
  /* ul.nav-main li.nav-parent.nav-expanded > ul.nav-children {
        padding: 10px 0;
    } */
  ul.nav-main li .nav-children li a {
    color: #fff;
    padding: 6px 15px 6px 57px;
  }
  ul.nav-main li .nav-children li > a:active {
    color: #0088cc;
  }
  ul.nav-main li.nav-expanded > a > span + svg {
    fill: white;
    transform: rotate(90deg);
  }
`;

export default SharedDashboardLayout;
