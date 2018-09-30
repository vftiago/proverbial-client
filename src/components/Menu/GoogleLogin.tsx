import * as React from "react";
import * as PropTypes from "prop-types";

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
        onRequest: () => {},
        jsSrc: "https://apis.google.com/js/client:platform.js"
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
    signIn(e: Event | null) {
        if (e) {
            e.preventDefault(); // to prevent submit if used within form
        }
        if (!this.state.disabled) {
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
            onRequest();
            if (responseType === "code") {
                auth2
                    .grantOfflineAccess(options)
                    .then(
                        (res: any) => onSuccess(res),
                        (err: any) => onFailure(err)
                    );
            } else {
                auth2
                    .signIn(options)
                    .then(
                        (res: any) => this.handleSigninSuccess(res),
                        (err: any) => onFailure(err)
                    );
            }
        }
    }
    handleSigninSuccess(res: any) {
        /*
      offer renamed response keys to names that match use
    */
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
            display: "inline-block",
            background: "#d14836",
            color: "#fff",
            width: 190,
            paddingTop: 10,
            paddingBottom: 10,
            borderRadius: 2,
            border: "1px solid transparent",
            fontSize: 16,
            fontWeight: "bold",
            fontFamily: "Roboto"
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
