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
import { Page, Proverb, Options, View } from "./types/types";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

interface State {
    id: number;
    list: Proverb[];
    loading: boolean;
    proverbList: Proverb[];
    currentPage: Page;
    lang: string;
    allFetched: boolean;
    user?: any;
    errorMessage?: string;
}

const root = css`
    font-family: "Roboto Condensed";
    height: 100%;
    display: flex;
    flex-direction: column;
`;

export class App extends React.Component<{}, State> {
    state: State = {
        id: DEFAULTS.id,
        list: [],
        proverbList: [],
        loading: true,
        currentPage: Page.LoadingPage,
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

    onGoogleResponse = async (tokenId: string) => {
        const user = await api.fetchUser(tokenId);
        console.log(user);
        this.setState({ user });
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

    async componentDidMount() {
        ((d, s, id, cb) => {
            const element = d.getElementsByTagName(s)[0] as HTMLScriptElement;
            const fjs = element;
            let js = element;
            js = d.createElement(s) as HTMLScriptElement;
            js.id = id;
            js.src = "https://apis.google.com/js/platform.js";
            if (fjs && fjs.parentNode) {
                fjs.parentNode.insertBefore(js, fjs);
            } else {
                d.head.appendChild(js);
            }
            js.onload = cb;
        })(document, "script", "google-login", () => {
            const params = {
                access_type: "online",
                client_id: GOOGLE_CLIENT_ID,
                ux_mode: "redirect",
                scope: "profile email",
                fetch_basic_profile: true
            };

            window.gapi.load("auth2", async () => {
                // get GoogleAuth object or initialize it
                const GoogleAuth =
                    (await window.gapi.auth2.getAuthInstance()) ||
                    (await window.gapi.auth2.init(params));

                if (!GoogleAuth.isSignedIn.get()) {
                    return;
                }

                const currentUser = GoogleAuth.currentUser.get();
                const authResponse = currentUser.getAuthResponse();
                this.onGoogleResponse(authResponse.id_token);
            });
        });
        try {
            const proverbList = await api.fetchList(this.state.lang);

            this.setState({
                currentPage: Page.ContentPage,
                proverbList,
                loading: false
            });
        } catch (errorMessage) {
            this.setState({
                currentPage: Page.ErrorPage,
                errorMessage,
                loading: false
            });
        }
    }

    render() {
        const { errorMessage, currentPage, proverbList } = this.state;

        return (
            <div className={root}>
                <Menu
                    id={this.state.id}
                    onNavigation={this.onNavigation}
                    onSearch={this.onSearch}
                    onGoogleResponse={this.onGoogleResponse}
                    user={this.state.user}
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
