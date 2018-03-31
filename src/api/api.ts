import axios from "axios";
import DEFAULTS from "./../defaults";

const instance = axios.create({
	baseURL: "http://localhost:4000",
	timeout: 5000
});

const api = {
	fetchCount: async (lang: string) => {
		try {
			const response = await instance.get("counts", {
				params: { lang }
			});
			return response.data[0].count;
		} catch (error) {
			console.error(error);
		}
	},

	fetchItem: async (lang: string, id: number) => {
		try {
			const response = await instance.get("proverbs", {
				params: { lang, id }
			});
			return response.data[0].text;
		} catch (error) {
			console.error(error);
		}
	},

	fetchList: async (lang: string, _limit: number = DEFAULTS.pageSize) => {
		try {
			const response = await instance.get("proverbs", {
				params: { lang, _limit }
			});
			return response.data;
		} catch (error) {
			console.error(error);
		}
	}
};

export default api;
