function getToken() {
    const localStorageToken = localStorage.getItem('token');
    if (!localStorageToken) {
        return null;
    }
    return `Bearer ${localStorageToken}`;
}