/** Route parameters */
module.exports = {
    routesFields: {
        login: ["email", "password"],
        forgetPassword: ["email"],
        signup: ["email", "password", "firstName", "lastName"],
        getUser: ["id", "accessToken"],
        sendFriendRequest: ["id", "accessToken", "uid", "fid"],
        acceptFriendRequest: ["id", "accessToken", "status", "request_id", "uid", "fid"],
        getFriendsList: ["id", "accessToken"]
    }
}