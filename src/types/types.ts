export type Language = {
  _id: string;
  label: string;
};

export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  imageURL: string;
  settings: {
    selectedLanguages: Language[];
  };
};

export interface Proverb {
  _id: string;
  text: string;
  lang: string;
}

export enum Page {
  ContentPage = 'ContentPage',
  ErrorPage = 'ErrorPage',
  LoadingPage = 'LoadingPage',
  SettingsPage = 'SettingsPage',
}
