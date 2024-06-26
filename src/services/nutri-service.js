import axios from "axios";

export const globalAPI = {
    API_URL: 'http://localhost:4005/',
}

const apiUrl = globalAPI.API_URL + "nutritions";

export async function getAll() {
	let nutritions = (await axios.get(apiUrl)).data;
	return nutritions;
}

export async function getById(id) {
	return axios.get(`${apiUrl}?id=${id}`);
}

export function createNutrition(nutrition) {
	if (!nutrition.description) {
		throw new Error("Invalid description");
	}

	if (!nutrition.protein || !nutrition.fat|| !nutrition.carbs|| nutrition.protein < 0|| nutrition.fat < 0|| nutrition.carbs < 0|| isNaN(nutrition.protein) || isNaN(nutrition.fat)|| isNaN(nutrition.carbs)) {
			throw new Error("Invalid value");
	}

	if (!nutrition.kcal) {nutrition.kcal = nutrition.protein * 6 +nutrition.fat * 3 +nutrition.carbs * 7;}

  return axios.post(apiUrl, nutrition);
}