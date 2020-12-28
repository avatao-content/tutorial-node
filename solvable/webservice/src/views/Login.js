import React from "react";
import Layout from "./Layout";
import Alert from "./Alert";
import config from "../config";

const Login = ({ alert, email, password, user }) => {
    return (
        <Layout user={user}>
            {alert ? <Alert {...alert} /> : ""}
            <div className="card mt-4 login-card">
                <h3 className="nodify-login-header">Log in</h3>
                <form action={`${config.baseurl}/login`} method="post">
                    <div className="form-row">
                        <div className="form-group col-md-12">
                            <label htmlFor="email" className="nodify-login-label">E-mail</label>
                            <input
                                type="email"
                                className="form-control nodify-login-inputbox"
                                id="email"
                                name="email"
                                value={email}
                                defaultValue="john@doe.com"
                            />
                        </div>
                        <div className="form-group col-md-12">
                            <label htmlFor="password" className="nodify-login-label">Password</label>
                            <input
                                type="password"
                                className="form-control nodify-login-inputbox"
                                id="password"
                                name="password"
                                value={password}
                                defaultValue="CSa42q2#5@#$Sd"
                            />
                        </div>
                    </div>
                    <button type="submit" className="nodify-submit-button">
                        Log in
                    </button>
                </form>
            </div>
        </Layout>
    );
};

export default Login;
