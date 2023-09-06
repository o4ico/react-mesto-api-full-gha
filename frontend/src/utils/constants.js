const getToken = function () {
    const token = localStorage.getItem('jwt');
    return token;
}
export default getToken;
