import axios from "axios";

export const globalAPI = {
    API_URL: 'http://localhost:3005/',
}

const apiUrl = globalAPI.API_URL + "nutritions";

export async function getById(id) {
	return axios.get(`${apiUrl}?id=${id}`);
}

export async function getAll() {
	let nutritions = (await axios.get(apiUrl)).data;
	return nutritions;
}

export function createNutrition(nutrition) {
	if (!nutrition.description) {
		throw new Error("Invalid description");
	}

	if (!nutrition.protein 
		|| !nutrition.fat
		|| !nutrition.carbs
		|| nutrition.protein < 0
		|| nutrition.fat < 0
		|| nutrition.carbs < 0
		|| isNaN(nutrition.protein) 
		|| isNaN(nutrition.fat)
		|| isNaN(nutrition.carbs)
		) {
			throw new Error("Invalid value");
	}

	if (!nutrition.kcal) {
		nutrition.kcal = 
            nutrition.protein * 6 +
			nutrition.fat * 3 +
			nutrition.carbs * 7;
	}

  return axios.post(apiUrl, nutrition);
}
export async function getWikipediaInfo(searchTerm) {
	const response = await axios.get('http://en.wikipedia.org/w/api.php', {
		params: {
		  format: 'json',
		  action: 'query',
		  generator: 'search',
		  gsrsearch: searchTerm,
		  gsrlimit: 10,
		  prop: 'pageimages|extracts',
		  pilimit: 'max',
		  exintro: '',
		  explaintext: searchTerm,
		  exsentences: 1,
		  exlimit: 'max',
		  origin: '*'
		}
	  });

	let combinedExtracts = '';
	for (const pageId in response.data.query.pages) {
		const page = response.data.query.pages[+pageId];
		combinedExtracts += page.extract + ' '; 
	}

    return combinedExtracts; 
};