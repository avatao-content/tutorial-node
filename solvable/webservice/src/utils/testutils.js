import config from "../config";

export const logIn = async agent => {
    const url = config.generateUrl("/login")
    await agent
        .post(url)
        .field("email", "john@doe.com")
        .field("password", "test");
};

export const obtainUser = async agent => {
    const users = await agent.get(config.generateUrl("/api/users"));
    return users.body[0];
};
