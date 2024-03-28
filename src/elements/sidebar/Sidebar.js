import { Link } from "react-router-dom";
import { Fragment, useState } from "react";
import { Offcanvas } from "react-bootstrap";
import "./Sidebar.css";

export default function Sidebar(props) {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="sidebar">
      <div className="d-flex flex-column flex-shrink-0 p-3 bg-light" style={{ width: "280px" }}>
      <Link to="/" className="d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none w-100">
        NutriTrack Application
        </Link>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <Fragment>
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/add">
                Add New Nutrition
              </Link>
            </li>
          </Fragment>
        </ul>
      </div>
      <Offcanvas show={showSidebar} onHide={() => setShowSidebar(false)}>
        <Offcanvas.Sidebar closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Sidebar>
        <Offcanvas.Body>
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Main
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/add">
                Add
              </Link>
            </li>
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}
