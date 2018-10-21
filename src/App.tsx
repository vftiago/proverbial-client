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
import Menu from "./components/Menu/Menu";
import api from "./api/api";
import { DEFAULTS } from "./defaults";

// types
import { Page, Proverb, User } from "./types/types";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

const gapiInitParams = {
    access_type: "online",
    client_id: GOOGLE_CLIENT_ID,
    ux_mode: "redirect",
    scope: "profile email",
    fetch_basic_profile: true
};

const gapiSignInParams = {
    scope: "profile email",
    prompt: "select_account"
};

interface State {
    AuthInstance?: any;
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
        list: [],
        proverbList: [],
        loading: true,
        currentPage: Page.LoadingPage,
        initialLoading: true,
        lang: DEFAULTS.lang,
        allFetched: false
    };

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

    onClickProverb = async (id: string) => {
        const { loading } = this.state;
        if (!loading) {
            this.setState({
                loading: true
            });
        }
        const proverbList = await api.fetchItem(this.state.lang, id);
        this.setState({
            currentPage: Page.ContentPage,
            proverbList,
            loading: false
        });
    };

    onClickRandomProverb = async () => {
        const { loading } = this.state;
        if (!loading) {
            this.setState({
                loading: true
            });
        }
        const proverbList = await api.fetchItem(this.state.lang, "random");
        this.setState({
            currentPage: Page.ContentPage,
            proverbList,
            loading: false
        });
    };

    onClickListProverbs = async () => {
        const { loading } = this.state;
        if (!loading) {
            this.setState({
                loading: true
            });
        }
        const proverbList = await api.fetchList(this.state.lang);
        this.setState({
            currentPage: Page.ContentPage,
            proverbList,
            loading: false
        });
    };

    onClickSettingsPage = () => {
        this.setState({
            currentPage: Page.SettingsPage
        });
    };

    onGoogleSignIn = async () => {
        const AuthInstance = window.gapi.auth2.getAuthInstance();

        try {
            await AuthInstance.signIn(gapiSignInParams);
            this.fetchApplicationContent();
        } catch (err) {
            console.error(err);
        }
    };

    onGoogleSignOut = async () => {
        const AuthInstance = window.gapi.auth2.getAuthInstance();

        try {
            await AuthInstance.signOut();
            this.fetchApplicationContent();
        } catch (err) {
            console.error(err);
        }
    };

    onGapiLoaded = async () => {
        const AuthInstance =
            window.gapi.auth2.getAuthInstance() ||
            (await window.gapi.auth2.init(gapiInitParams));

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
            <div className={rootStlye}>
                <Menu
                    onGoogleSignIn={this.onGoogleSignIn}
                    onGoogleSignOut={this.onGoogleSignOut}
                    onClickSettingsPage={this.onClickSettingsPage}
                    onClickListProverbs={this.onClickListProverbs}
                    onClickRandomProverb={this.onClickRandomProverb}
                    onSearch={this.onSearch}
                    initialLoading={initialLoading}
                    user={proverbialUser}
                />
                <Content
                    currentPage={currentPage}
                    errorMessage={errorMessage}
                    list={proverbList}
                    onSearch={this.onSearch}
                    onClickProverb={this.onClickProverb}
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

// #region styles
const rootStlye = css`
    font-family: "Roboto Condensed";
    height: 100%;
    display: flex;
    flex-direction: column;
`;
// #endregion styles
