export const saveUserData = (data) => {
    //console.log(`salvez ${data.firstName}`);
    localStorage.setItem("connectedUser", JSON.stringify(data));
}

export const getUserData = () => {
    const data = localStorage.getItem("connectedUser");
    if (data)
        return JSON.parse(data);
}

export const clearUser = () => {
    localStorage.removeItem("connectedUser");
}

export const isUserData = () => {
    const data = localStorage.getItem("connectedUser");
    if (data)
        return true;
    return false;
}