const TOKEN_FROM_LOCALSTORAGE = localStorage.getItem("token");

async function putVisit(id, body) {
    try {
        const response = await axios.put(`https://ajax.test-danit.com/api/v2/cards/${id}`, body, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${TOKEN_FROM_LOCALSTORAGE}`,
            }
        })
        return response;
    } catch (err) {
        console.warn(err);
    }
}

export default putVisit;