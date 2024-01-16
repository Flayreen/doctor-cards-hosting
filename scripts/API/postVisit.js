const TOKEN_FROM_LOCALSTORAGE = localStorage.getItem("token");

async function postVisit(body) {
    try {
        const response = await axios.post('https://ajax.test-danit.com/api/v2/cards', body, {
            headers: {
                'Authorization': `Bearer ${TOKEN_FROM_LOCALSTORAGE}`,
            }
        })
        return response;
    } catch (err) {
        console.warn(err);
    }
}

export default postVisit;