import axios from "axios";
import { DEFAULTS } from "./../defaults";

const BASEURL = process.env.BASEURL;
const REDIRECT_URI = process.env.REDIRECT_URI;

const instance = axios.create({
    baseURL: `${BASEURL}`,
    timeout: 5000
});

const api = {
    fetchUser: async () => {},

    fetchCount: async (lang: string = DEFAULTS.lang) => {
        try {
            const response = await instance.get("api/counts", {
                params: { lang }
            });
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },

    fetchItem: async (lang: string = DEFAULTS.lang, id?: number | string) => {
        id = id || "random";

        const route = `api/proverbs/${id}`;

        try {
            const response = await instance.get(route, {
                params: { lang }
            });
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },

    fetchList: async (
        lang: string = DEFAULTS.lang,
        _limit: number = DEFAULTS.pageSize
    ) => {
        try {
            const response = await instance.get("api/proverbs", {
                params: { lang, _limit }
            });
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
};

export default api;
