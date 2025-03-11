
const BASE_URL = `http://localhost:6900`;

export const getAppUrl = (url) => {
    return BASE_URL + '/api/' + url;
};