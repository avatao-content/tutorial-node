import React from "react";
import Layout from "./Layout";
import Alert from "./Alert";
import config from "../config";

const Index = ({ alert, user }) => {
    return (
        <Layout user={user} isHomepage={true}>
            <div>
                {alert ? <Alert {...alert} /> : ""}
                <h1 className={user.isAnon ? "header-welcome" : "text-white pb-3"}>Welcome to Nodify!</h1>
                {user.isAnon ? "" : (
                    <div>
                        <div className="card-deck mb-3">
                            <div className="card">
                                <img
                                    src={`${config.baseurl}/static/images/nodify_0.jpg`}
                                    width="100%"
                                />
                                <div className="card-body">
                                    <h5 className="card-title">Indie Pop</h5>
                                    <p className="card-text">2400 followers</p>
                                </div>
                            </div>
                            <div className="card">
                                <img
                                    src={`${config.baseurl}/static/images/nodify_1.jpg`}
                                    width="100%"
                                />
                                <div className="card-body">
                                    <h5 className="card-title">Alternative 90s</h5>
                                    <p className="card-text">1380 followers</p>
                                </div>
                            </div>
                            <div className="card">
                                <img
                                    src={`${config.baseurl}/static/images/nodify_2.jpg`}
                                    width="100%"
                                />
                                <div className="card-body">
                                    <h5 className="card-title">Chill Dinner</h5>
                                    <p className="card-text">174 followers</p>
                                </div>
                            </div>
                            <div className="card">
                                <img
                                    src={`${config.baseurl}/static/images/nodify_3.jpg`}
                                    width="100%"
                                />
                                <div className="card-body">
                                    <h5 className="card-title">Feel Good Piano</h5>
                                    <p className="card-text">1120 followers</p>
                                </div>
                            </div>
                        </div>
                        <div className="card-deck">
                            <div className="card">
                                <img
                                    src={`${config.baseurl}/static/images/nodify_4.jpg`}
                                    width="100%"
                                />
                                <div className="card-body">
                                    <h5 className="card-title">Happy Hits!</h5>
                                    <p className="card-text">6350 followers</p>
                                </div>
                            </div>
                            <div className="card">
                                <img
                                    src={`${config.baseurl}/static/images/nodify_5.jpg`}
                                    width="100%"
                                />
                                <div className="card-body">
                                    <h5 className="card-title">Guilty Pleasures</h5>
                                    <p className="card-text">2541 followers</p>
                                </div>
                            </div>
                            <div className="card">
                                <img
                                    src={`${config.baseurl}/static/images/nodify_6.jpg`}
                                    width="100%"
                                />
                                <div className="card-body">
                                    <h5 className="card-title">Today's Top Hits</h5>
                                    <p className="card-text">1789 followers</p>
                                </div>
                            </div>
                            <div className="card">
                                <img
                                    src={`${config.baseurl}/static/images/nodify_7.jpg`}
                                    width="100%"
                                />
                                <div className="card-body">
                                    <h5 className="card-title">Work from Home</h5>
                                    <p className="card-text">3410 followers</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default Index;
