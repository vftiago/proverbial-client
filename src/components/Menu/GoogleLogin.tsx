import * as React from "react";

interface GoogleLoginProps {
    clientId: string;
    cookiePolicy: string;
    loginHint: string;
    hostedDomain: string;
    autoLoad: string;
    isSignedIn: boolean;
    fetchBasicProfile: boolean;
    redirectUri: string;
    discoveryDocs: string;
    onFailure: (err: any) => void;
    onSuccess: (res: any) => void;
    onRequest: () => void;
    prompt: any;
    uxMode: string;
    scope: string;
    accessType: string;
    responseType: string;
    jsSrc: string;
    disabled: boolean;
    tag: string;
    type: string;
    style: any;
    className: string;
    disabledStyle: any;
    buttonText: string;
    children: any;
    render: (options: any) => React.ReactNode;
}

interface GoogleLoginState {
    disabled: boolean;
}

class GoogleLogin extends React.Component<GoogleLoginProps, GoogleLoginState> {
    constructor(props: GoogleLoginProps) {
        super(props);
        this.signIn = this.signIn.bind(this);
        this.enableButton = this.enableButton.bind(this);
        this.state = {
            disabled: true
        };
    }

    public static defaultProps: Partial<GoogleLoginProps> = {
        tag: "button",
        buttonText: "Login with Google",
        scope: "profile email",
        accessType: "online",
        prompt: "",
        cookiePolicy: "single_host_origin",
        fetchBasicProfile: true,
        isSignedIn: false,
        uxMode: "popup",
        disabledStyle: {
            opacity: 0.6
        },
        jsSrc: "https://apis.google.com/js/platform.js"
    };

    componentDidMount() {
        const {
            clientId,
            cookiePolicy,
            loginHint,
            hostedDomain,
            autoLoad,
            isSignedIn,
            fetchBasicProfile,
            redirectUri,
            discoveryDocs,
            onFailure,
            uxMode,
            scope,
            accessType,
            responseType,
            jsSrc
        } = this.props;
        ((d, s, id, cb) => {
            const element = d.getElementsByTagName(s)[0] as HTMLScriptElement;
            const fjs = element;
            let js = element;
            js = d.createElement(s) as HTMLScriptElement;
            js.id = id;
            js.src = jsSrc;
            if (fjs && fjs.parentNode) {
                fjs.parentNode.insertBefore(js, fjs);
            } else {
                d.head.appendChild(js);
            }
            js.onload = cb;
        })(document, "script", "google-login", () => {
            const params = {
                client_id: clientId,
                cookie_policy: cookiePolicy,
                login_hint: loginHint,
                hosted_domain: hostedDomain,
                fetch_basic_profile: fetchBasicProfile,
                discoveryDocs,
                ux_mode: uxMode,
                redirect_uri: redirectUri,
                scope,
                access_type: accessType
            };

            if (responseType === "code") {
                params.access_type = "offline";
            }

            window.gapi.load("auth2", () => {
                this.enableButton();
                if (!window.gapi.auth2.getAuthInstance()) {
                    window.gapi.auth2.init(params).then(
                        (res: any) => {
                            if (isSignedIn && res.isSignedIn.get()) {
                                this.handleSigninSuccess(res.currentUser.get());
                            }
                        },
                        (err: any) => onFailure(err)
                    );
                }
                if (autoLoad) {
                    this.signIn(null);
                }
            });
        });
    }
    componentWillUnmount() {
        this.enableButton = () => {};
    }
    enableButton() {
        this.setState({
            disabled: false
        });
    }
    async signIn(event: Event | null) {
        if (event) {
            event.preventDefault();
        }
        if (this.state.disabled) {
            return;
        }
        const auth2 = window.gapi.auth2.getAuthInstance();
        const {
            onSuccess,
            onRequest,
            onFailure,
            prompt,
            responseType
        } = this.props;
        const options = {
            prompt
        };
        if (onRequest) {
            onRequest();
        }
        if (responseType === "code") {
            try {
                const res = await auth2.grantOfflineAccess(options);
                onSuccess(res);
            } catch (err) {
                console.error(err);
                onFailure(err);
            }
        } else {
            try {
                const res = await auth2.signIn(options);
                this.handleSigninSuccess(res);
            } catch (err) {
                console.error(err);
                onFailure(err);
            }
        }
    }
    handleSigninSuccess(res: any) {
        const basicProfile = res.getBasicProfile();
        const authResponse = res.getAuthResponse();
        res.googleId = basicProfile.getId();
        res.tokenObj = authResponse;
        res.tokenId = authResponse.id_token;
        res.accessToken = authResponse.access_token;
        res.profileObj = {
            googleId: basicProfile.getId(),
            imageUrl: basicProfile.getImageUrl(),
            email: basicProfile.getEmail(),
            name: basicProfile.getName(),
            givenName: basicProfile.getGivenName(),
            familyName: basicProfile.getFamilyName()
        };
        this.props.onSuccess(res);
    }

    render() {
        const {
            tag,
            type,
            style,
            className,
            disabledStyle,
            buttonText,
            children,
            render
        } = this.props;
        const disabled = this.state.disabled || this.props.disabled;

        if (render) {
            return render({ onClick: this.signIn });
        }

        const initialStyle = {
            display: "flex",
            alignItems: "center",
            borderRadius: 2,
            fontSize: "13px",
            fontWeight: 100,
            fontFamily: "Roboto",
            paddingRight: "12px",
            border: "none",
            cursor: "pointer"
        };
        const styleProp = (() => {
            if (style) {
                return style;
            } else if (className && !style) {
                return {};
            }

            return initialStyle;
        })();
        const defaultStyle = (() => {
            if (disabled) {
                return Object.assign({}, styleProp, disabledStyle);
            }

            return styleProp;
        })();
        const googleLoginButton = React.createElement(
            tag,
            {
                onClick: this.signIn,
                style: defaultStyle,
                type,
                disabled,
                className
            },
            children || buttonText
        );

        return googleLoginButton;
    }
}

export default GoogleLogin;
