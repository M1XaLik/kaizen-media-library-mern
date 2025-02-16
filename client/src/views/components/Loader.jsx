import React from "react";
import { ClipLoader } from "react-spinners";

const Loader = ({ loading }) => {
    return (
        <div className="loader-container">
            <ClipLoader size={50} color={"#123abc"} loading={loading} />
        </div>
    );
};

export default Loader;
