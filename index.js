/* globals chrome */

/**
 * Information about an installed extension, app, or theme.
 * https://developer.chrome.com/extensions/management#type-ExtensionInfo
 * @typedef {object} ExtensionInfo
 */

let {management: {getSelf, getAll, setEnabled}, webNavigation} = chrome;

webNavigation.onBeforeNavigate.addListener((details) =>
    details.frameId === 0 &&
    getSelf(self => getAll(extensions => reloadDevelopment(self, extensions)))
);

/**
 * Reload all enabled extensions under development
 * @param {ExtensionInfo} self - This installed extension.
 * @param {ExtensionInfo[]} extensions - An array all of the user's extension.
*/

function reloadDevelopment (self, extensions) {
    for (let {id, installType, enabled} of extensions) {
        if (id !== self.id && installType === 'development' && enabled) {
            reload(id);
        }
    }
}

/**
 * Reload an extension
 * @param {string} id - ExtensionInfo's id of the extension to reload
 */

let reload = (id) => setEnabled(id, false, () => setEnabled(id, true));
