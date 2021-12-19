const isAuth = (data) => {
    return ({
        type: "IS_AUTH",
        payload: data,
    })
}
export default isAuth;