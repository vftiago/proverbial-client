import axios from "axios";
import { DEFAULTS } from "./../defaults";

const BASEURL = process.env.BASEURL;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const REDIRECT_URI = process.env.REDIRECT_URI;

const instance = axios.create({
    baseURL: `${BASEURL}`,
    timeout: 5000
});

const api = {
    fetchUser: async () => {
        try {
            const response = await instance.get(
                "https://accounts.google.com/o/oauth2/v2/auth",
                {
                    params: {
                        client_id: GOOGLE_CLIENT_ID,
                        redirect_uri: REDIRECT_URI,
                        response_type: "token",
                        scope: ["profile", "email"]
                    }
                }
            );
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    },

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
