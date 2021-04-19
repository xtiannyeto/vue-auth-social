// import * as Facebook from 'fb-sdk-wrapper';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Facebook = require('fb-sdk-wrapper');
export async function initFacebook(appId) {
    if (!appId)
        return;
    await Facebook.load();
    return await Facebook.init({
        appId: appId
    });
}
export async function login() {
    const response = await Facebook.login({
        scope: 'public_profile , email',
        return_scopes: true
    });
    if (response.status !== 'connected') {
        return null;
    }
    const profile = await Facebook.api(`/${response.authResponse.userID}`, 'get', {
        fields: ['email', 'name', 'picture']
    });
    const facebookResponse = {
        name: profile.name,
        email: profile.email,
        picture: profile.picture.data.url,
        authResponse: response.authResponse
    };
    return facebookResponse;
}
export async function logout() {
    return await Facebook.logout();
}
//# sourceMappingURL=FaceBookAuth.js.map