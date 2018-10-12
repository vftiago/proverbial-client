declare global {
    interface Window {
        gapi: any;
    }
}

// vendor imports
import * as React from "react";
import { css } from "emotion";

// local imports
import { Content } from "./components/Content/Content";
import { Menu } from "./components/Menu/Menu";
import api from "./api/api";
import { DEFAULTS } from "./defaults";
import Alert from "./components/Alert/Alert";

// pages
import LoadingPage from "./components/LoadingPage";

// types
import { Proverb, Options, View } from "./types/types";

interface State {
    id: number;
    list: Proverb[];
    proverbList: Proverb[];
    lang: string;
    allFetched: boolean;
    user?: any;
    errorMessage?: string;
}

const root = css`
    font-family: Quando;
    min-height: 100%;
    min-width: 500px;
    display: flex;
    flex-direction: column;
`;

export class App extends React.Component<{}, State> {
    state: State = {
        id: DEFAULTS.id,
        list: [],
        proverbList: [],
        lang: DEFAULTS.lang,
        allFetched: false
    };

    async update(options: Options) {
        let filteredList = [];
        let id = options.id;

        switch (options.view) {
            case View.List:
                filteredList = await api.fetchList(this.state.lang);
                break;
            case View.Item:
                filteredList = await api.fetchItem(this.state.lang, id);
                break;
            default:
                return false;
        }

        this.setState({
            id,
            proverbList
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

    onGoogleResponse = async (response: any) => {
        const { tokenId } = response;
        const user = await api.fetchUser(tokenId);
        this.setState({ user });
    };

    filterList = (term: string) => {
        const filteredList = this.state.list.filter(
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
        try {
            const proverbList = await api.fetchList(this.state.lang);

            this.setState({
                proverbList
            });
        } catch (e) {
            console.error(e);
            this.setState({
                errorMessage: e
            });
        }
    }

    render() {
        const { errorMessage, proverbList } = this.state;

        console.log(this.state);

        return (
            <div className={root}>
                <Menu
                    id={this.state.id}
                    onNavigation={this.onNavigation}
                    onSearch={this.onSearch}
                    onGoogleResponse={this.onGoogleResponse}
                    user={this.state.user}
                />
                {errorMessage ? (
                    <Alert message={errorMessage} />
                ) : (
                    <Content
                        list={proverbList}
                        onNavigation={this.onNavigation}
                        onSearch={this.onSearch}
                    />
                )}
            </div>
        );
    }
}
