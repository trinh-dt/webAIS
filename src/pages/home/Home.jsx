import React from "react";
import { Container } from "reactstrap";
import BreadCrumb from "../../components/BreadCrumb";

const Home = () => {
  document.title = "Trang chủ";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Trang chủ" pageTitle="Pages" />
          
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Home;
