import { Options, Proverb, View } from "./types";

const DEFAULTS: Options = {
    view: View.Item,
    id: null,
    lang: "en",
    pageSize: 120,
    random: true
};

const COLORS = {
    iconFill: "#333"
};

const CREDENTIALS = {
    GOOGLE_CLIENT_ID:
        "130599439121-7hmvog2onl63mak3nbdr7f9qj3m9vo7s.apps.googleusercontent.com",
    GOOGLE_CLIENT_SECRET: "5sADx6fZvGar6VWFoFo5Yf9G"
};

export { DEFAULTS, COLORS, CREDENTIALS };
