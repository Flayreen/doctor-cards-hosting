async function getVisits(token) {
	try {
		const response = await axios.get('https://ajax.test-danit.com/api/v2/cards', {
			headers: {
				'Authorization': `Bearer ${token}`,
			}
		})
		return response.data;
	} catch (err) {
		console.log(err);
	}
}

export default getVisits;