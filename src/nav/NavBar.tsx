import React from "react";
import logo from "../images/ore-tech-logo.png";
import "./Nav.css";
import { NavLink } from "react-router-dom";
import AccountMenu from "./AccountMenu";
import AddAsset from "./AddAsset";


export default function NavBar() {
  return(
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <a className="navbar-brand ms-lg-5" href="/">
          <img src={logo} alt="ore-tech-logo" width="56" height="50" className="d-inline-block" />
          <span className="logo-text">Ore-Tech</span>
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-content">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-md-5 me-auto">
            <li className="nav-item">
              <NavLink
                to="/"
                className="nav-link"
              >
                Shop View
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/assets/"
                className="nav-link"
              >
                Asset View
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                  to="/shift-summary/"
                  className="nav-link"
                >
                  Shift Summary
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/history/"
                className="nav-link"
              >
                History
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                  to="/ahs-calibrations/"
                  className="nav-link"
                >
                  AHS Calibrations
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                  to="/reports/"
                  className="nav-link"
                >
                  Reports
              </NavLink>
            </li>
          </ul>
          <AddAsset />
          <AccountMenu />
        </div>
      </div>
    </nav>
  );
}
