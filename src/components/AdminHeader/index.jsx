import { Fragment } from "react";
import { NavLink } from "react-router-dom";
import "./header.scss";
import logo from "../../assets/logo.png";

const AdminHeader = () => {
  return (
    <Fragment>
      <header className="admin-header">
        <div className="admin-container">
          <div className="admin-header__wrapper">
            <div className="admin-header__start">
              <NavLink className="admin-header__logo" to="/">
                <img src={logo} alt="" width={90} />
              </NavLink>
            </div>
          </div>
        </div>
      </header>
    </Fragment>
  );
};

export default AdminHeader;
