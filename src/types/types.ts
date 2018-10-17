export type User = {
    googleID: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    imageURL: string;
};

export interface Options {
    view: View;
    lang: string;
    id: number;
    pageSize: number;
    random?: boolean;
}

export interface Proverb {
    _id: number;
    text: string;
    lang: string;
}

export enum View {
    Item = "Item",
    List = "List"
}

export enum Page {
    LoadingPage = "LoadingPage",
    ContentPage = "ContentPage",
    ErrorPage = "ErrorPage"
}
