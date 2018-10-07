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
