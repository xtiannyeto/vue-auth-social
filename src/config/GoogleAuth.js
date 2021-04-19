const googleAuth = (() => {
    const installClient = () => {
        const apiUrl = 'https://apis.google.com/js/api.js';
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = apiUrl;
            script.onreadystatechange = script.onload = () => {
                if (!script.readyState || /loaded|complete/.test(script.readyState)) {
                    setTimeout(() => {
                        resolve();
                    }, 500);
                }
            };
            document.getElementsByTagName('head')[0].appendChild(script);
        });
    };
    const initClient = (config) => {
        return new Promise((resolve, reject) => {
            window.gapi.load('auth2', () => {
                window.gapi.auth2
                    .init(config)
                    .then(() => {
                    resolve(window.gapi);
                })
                    .catch((error) => {
                    reject(error);
                });
            });
        });
    };
    const Auth = function () {
        this.GoogleAuth = null; /* window.gapi.auth2.getAuthInstance() */
        this.isAuthorized = false;
        this.isInit = false;
        this.prompt = null;
        this.isLoaded = () => {
            // tslint:disable-next-line
            console.warn('isLoaded() will be deprecated. You can use "this.$gAuth.isInit"');
            return !!this.GoogleAuth;
        };
        this.load = (config, prompt) => {
            installClient()
                .then(() => {
                return initClient(config);
            })
                .then((gapi) => {
                this.GoogleAuth = gapi.auth2.getAuthInstance();
                this.isInit = true;
                this.prompt = prompt;
                this.isAuthorized = this.GoogleAuth.isSignedIn.get();
            })
                .catch((error) => {
                console.error(error);
            });
        };
        this.signIn = (successCallback, errorCallback) => {
            return new Promise((resolve, reject) => {
                if (!this.GoogleAuth) {
                    if (typeof errorCallback === 'function') {
                        errorCallback(false);
                    }
                    reject(false);
                    return;
                }
                this.GoogleAuth.signIn()
                    .then((googleUser) => {
                    if (typeof successCallback === 'function') {
                        successCallback(googleUser);
                    }
                    this.isAuthorized = this.GoogleAuth.isSignedIn.get();
                    resolve(googleUser);
                })
                    .catch((error) => {
                    if (typeof errorCallback === 'function') {
                        errorCallback(error);
                    }
                    reject(error);
                });
            });
        };
        this.getAuthCode = (successCallback, errorCallback) => {
            return new Promise((resolve, reject) => {
                if (!this.GoogleAuth) {
                    if (typeof errorCallback === 'function') {
                        errorCallback(false);
                    }
                    reject(false);
                    return;
                }
                this.GoogleAuth.grantOfflineAccess({ prompt: this.prompt })
                    .then((resp) => {
                    if (typeof successCallback === 'function') {
                        successCallback(resp.code);
                    }
                    resolve(resp.code);
                })
                    .catch((error) => {
                    if (typeof errorCallback === 'function') {
                        errorCallback(error);
                    }
                    reject(error);
                });
            });
        };
        this.signOut = (successCallback, errorCallback) => {
            return new Promise((resolve, reject) => {
                if (!this.GoogleAuth) {
                    if (typeof errorCallback === 'function') {
                        errorCallback(false);
                    }
                    reject(false);
                    return;
                }
                this.GoogleAuth.signOut()
                    .then(() => {
                    if (typeof successCallback === 'function') {
                        successCallback();
                    }
                    this.isAuthorized = false;
                    resolve(true);
                })
                    .catch((error) => {
                    if (typeof errorCallback === 'function') {
                        errorCallback(error);
                    }
                    reject(error);
                });
            });
        };
    };
    return new Auth();
})();
export async function installGoogleAuth(options) {
    // set config
    let GoogleAuthConfig = null;
    const GoogleAuthDefaultConfig = {
        scope: 'profile email'
    };
    let prompt = 'select_account';
    if (typeof options === 'object') {
        GoogleAuthConfig = Object.assign(GoogleAuthDefaultConfig, options);
        if (options.scope) {
            GoogleAuthConfig.scope = options.scope;
        }
        if (options.prompt) {
            prompt = options.prompt;
        }
        if (!options.clientId) {
            // tslint:disable-next-line
            console.warn('clientId is required');
        }
    }
    else {
        // tslint:disable-next-line
        console.warn('invalid option type. Object type accepted only');
    }
    await googleAuth.load(GoogleAuthConfig, prompt);
    return googleAuth;
}
//# sourceMappingURL=GoogleAuth.js.map