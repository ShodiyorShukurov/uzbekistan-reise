import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import AdminHeader from "../AdminHeader";
import "./admin.scss";

const Admin = ({ children }) => {
  return (
    <>
      <AdminHeader />
      <div className="admin">
        <div className="admin-container">
          <div className="admin__wrapper">
            <div className="admin__start">
              <ul className="admin__start--nav-list">
                <NavLink to="/carousel" className="admin__start--nav-link">
                  <li className="admin__start--nav-item">Carousel</li>
                </NavLink>
                <NavLink to="/images" className="admin__start--nav-link">
                  <li className="admin__start--nav-item">Images</li>
                </NavLink>
                <NavLink to="/country" className="admin__start--nav-link">
                  <li className="admin__start--nav-item">Country</li>
                </NavLink>
                <NavLink to="/tour" className="admin__start--nav-link">
                  <li className="admin__start--nav-item">Tour</li>
                </NavLink>
                <NavLink to="/reviews" className="admin__start--nav-link">
                  <li className="admin__start--nav-item">Review</li>
                </NavLink>
              </ul>
            </div>
            <div className="admin__end p-3">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

Admin.propTypes = {
  children: PropTypes.object,
};

export default Admin;
