import React from "react";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { StyledFullPage } from "./Layout";

const FullPageLoader = () => {
  return (
    <StyledFullPage className="fullpage-loader">
      <Loader type="BallTriangle" color="#29AD44" height={100} width={100} />
    </StyledFullPage>
  );
};

export default FullPageLoader;
