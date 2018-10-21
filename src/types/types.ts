export type User = {
    googleID: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    imageURL: string;
};

export interface Proverb {
    _id: string;
    text: string;
    lang: string;
}

export enum Page {
    ContentPage = "ContentPage",
    ErrorPage = "ErrorPage",
    LoadingPage = "LoadingPage",
    SettingsPage = "SettingsPage"
}
