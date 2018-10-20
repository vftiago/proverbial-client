declare global {
    interface Window {
        gapi: any;
    }
}

// vendor imports
import * as React from "react";
import { css } from "emotion";
import Snackbar from "@material-ui/core/Snackbar";

// local imports
import { Content } from "./components/Content/Content";
import { Menu } from "./components/Menu/Menu";
import api from "./api/api";
import { DEFAULTS } from "./defaults";

// types
import { Page, Proverb, Options, User, View } from "./types/types";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

const gapiParams = {
    access_type: "online",
    client_id: GOOGLE_CLIENT_ID,
    ux_mode: "redirect",
    scope: "profile email",
    fetch_basic_profile: true
};

interface State {
    AuthInstance?: any;
    id: number;
    list: Proverb[];
    loading: boolean;
    proverbList: Proverb[];
    currentPage: Page;
    lang: string;
    initialLoading: boolean;
    allFetched: boolean;
    proverbialUser?: User;
    errorMessage?: string;
}

export class App extends React.Component<{}, State> {
    state: State = {
        id: DEFAULTS.id,
        list: [],
        proverbList: [],
        loading: true,
        currentPage: Page.LoadingPage,
        initialLoading: true,
        lang: DEFAULTS.lang,
        allFetched: false
    };

    async update(options: Options) {
        let proverbList = [];
        let id = options.id;
        const { loading } = this.state;

        if (!loading) {
            this.setState({
                loading: true
            });
        }
        switch (options.view) {
            case View.List:
                proverbList = await api.fetchList(this.state.lang);
                break;
            case View.Item:
                proverbList = await api.fetchItem(this.state.lang, id);
                break;
            default:
                return false;
        }

        this.setState({
            id,
            proverbList,
            loading: false
        });
    }

    onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value.toLowerCase();
        if (!this.state.allFetched) {
            this.fetchAll(term);
        } else {
            this.filterList(term);
        }
    };

    filterList = (term: string) => {
        const proverbList = this.state.list.filter(
            item => item.text.toLowerCase().search(term) !== -1
        );
        this.setState({ proverbList });
    };

    fetchAll = async (term: string) => {
        const list = await api.fetchList(this.state.lang);
        this.setState({ list, allFetched: true });
        this.filterList(term);
    };

    onNavigation = (options: Options) => {
        if (options.id && this.state.id === options.id) {
            return false;
        }
        this.update(options);
    };

    onGoogleSignIn = async () => {
        const GoogleAuth = window.gapi.auth2.getAuthInstance();

        try {
            await GoogleAuth.signIn();
            this.fetchApplicationContent();
        } catch (err) {
            console.error(err);
        }
    };

    onGoogleSignOut = async () => {
        const GoogleAuth = window.gapi.auth2.getAuthInstance();

        try {
            await GoogleAuth.signOut();
            this.fetchApplicationContent();
        } catch (err) {
            console.error(err);
        }
    };

    onGapiLoaded = async () => {
        const AuthInstance =
            window.gapi.auth2.getAuthInstance() ||
            (await window.gapi.auth2.init(gapiParams));

        this.setState({
            AuthInstance
        });

        this.fetchApplicationContent();
    };

    fetchApplicationContent = async () => {
        let googleUser, proverbialUser;

        const { AuthInstance } = this.state;

        if (AuthInstance.isSignedIn.get()) {
            googleUser = AuthInstance.currentUser.get();
        }

        if (googleUser) {
            const authResponse = googleUser.getAuthResponse();
            proverbialUser = await api.fetchUser(authResponse.id_token);
        }

        try {
            const proverbList = await api.fetchList(this.state.lang);

            this.setState({
                proverbialUser,
                currentPage: Page.ContentPage,
                proverbList,
                loading: false,
                initialLoading: false
            });
        } catch (errorMessage) {
            this.setState({
                proverbialUser,
                currentPage: Page.ErrorPage,
                errorMessage,
                loading: false,
                initialLoading: false
            });
        }
    };

    async componentDidMount() {
        try {
            window.gapi.load("auth2", this.onGapiLoaded);
        } catch (errorMessage) {
            this.setState({
                currentPage: Page.ErrorPage,
                errorMessage,
                loading: false,
                initialLoading: false
            });
        }
    }

    render() {
        const {
            currentPage,
            errorMessage,
            initialLoading,
            proverbList,
            proverbialUser
        } = this.state;

        return (
            <div className={root}>
                <Menu
                    onGoogleSignIn={this.onGoogleSignIn}
                    onGoogleSignOut={this.onGoogleSignOut}
                    onNavigation={this.onNavigation}
                    onSearch={this.onSearch}
                    initialLoading={initialLoading}
                    user={proverbialUser}
                />
                <Content
                    currentPage={currentPage}
                    errorMessage={errorMessage}
                    list={proverbList}
                    onNavigation={this.onNavigation}
                    onSearch={this.onSearch}
                />
                <Snackbar
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left"
                    }}
                    open={this.state.loading}
                    message={<span id="message-id">Loading...</span>}
                />
            </div>
        );
    }
}

const root = css`
    font-family: "Roboto Condensed";
    height: 100%;
    display: flex;
    flex-direction: column;
`;
