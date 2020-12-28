import React from "react";
import config from "../config";

const Footer = props => {
    return (
        <div>
            <script src={`${config.baseurl}/static/js/jquery-3.5.1.slim.min.js`} />
            <script src={`${config.baseurl}/static/js/bootstrap.min.js`} />
        </div>
    );
};

export default Footer;
