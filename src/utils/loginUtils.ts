
export const checkLogin : () => boolean = () => {
    return localStorage.getItem("authToken") ? true : false;
}

export const logout = () => {
    localStorage.removeItem("authToken");
}
