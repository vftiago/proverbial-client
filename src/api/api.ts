import axios, { AxiosError } from "axios";
import { DEFAULTS } from "./../defaults";

const BASE_URL = process.env.BASE_URL;

const instance = axios.create({
    baseURL: `${BASE_URL}`,
    timeout: 5000
});

const api = {
    fetchUser: async (code: string) => {
        try {
            const response = await instance.post("api/auth/user", {
                headers: {
                    "X-Requested-With": "XMLHttpRequest"
                },
                data: code
            });
            return response.data;
        } catch (e) {
            const axiosError = e as AxiosError;
            throw axiosError.message;
        }
    },

    fetchCount: async (lang: string = DEFAULTS.lang) => {
        try {
            const response = await instance.get("api/counts", {
                params: { lang }
            });
            return response.data;
        } catch (e) {
            const axiosError = e as AxiosError;
            throw axiosError.message;
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
        } catch (e) {
            const axiosError = e as AxiosError;
            throw axiosError.message;
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
        } catch (e) {
            const axiosError = e as AxiosError;
            throw axiosError.message;
        }
    }
};

export default api;
