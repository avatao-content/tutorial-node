import React from "react";

import Navigation from "./Navigation";
import Footer from "./Footer";
import config from "../config";

const Layout = ({ user, children, isHomepage }) => {
    return (
        <html>
            <head>
                <title>Nodify</title>
                <link
                    rel="stylesheet"
                    href={`${config.baseurl}/static/css/bootstrap.min.css`}
                />
                <link
                    rel="stylesheet"
                    href={`${config.baseurl}/static/css/font-awesome.min.css`}
                />

                <link
                    rel="stylesheet"
                    href={`${config.baseurl}/static/css/style.css`}
                />
            </head>
            <body className={
                user.isAnon ? (isHomepage ? "no-login-bg" : "") : ""
            }>
                <Navigation user={user} />
                <div className="container mt-3">
                    {children}
                    <Footer />
                </div>
            </body>
        </html>
    );
};

export default Layout;
