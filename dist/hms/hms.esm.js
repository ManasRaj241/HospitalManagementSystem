import { B as BUILD, c as consoleDevInfo, H, d as doc, N as NAMESPACE, p as promiseResolve, b as bootstrapLazy } from './index-d6626b81.js';
export { s as setNonce } from './index-d6626b81.js';
import { g as globalScripts } from './app-globals-0f993ce5.js';

/*
 Stencil Client Patch Browser v4.2.0 | MIT Licensed | https://stenciljs.com
 */
const patchBrowser = () => {
    // NOTE!! This fn cannot use async/await!
    if (BUILD.isDev && !BUILD.isTesting) {
        consoleDevInfo('Running in development mode.');
    }
    if (BUILD.cloneNodeFix) {
        // opted-in to polyfill cloneNode() for slot polyfilled components
        patchCloneNodeFix(H.prototype);
    }
    if (BUILD.profile && !performance.mark) {
        // not all browsers support performance.mark/measure (Safari 10)
        // because the mark/measure APIs are designed to write entries to a buffer in the browser that does not exist,
        // simply stub the implementations out.
        // TODO(STENCIL-323): Remove this patch when support for older browsers is removed (breaking)
        // @ts-ignore
        performance.mark = performance.measure = () => {
            /*noop*/
        };
        performance.getEntriesByName = () => [];
    }
    // @ts-ignore
    const scriptElm = BUILD.scriptDataOpts
        ? Array.from(doc.querySelectorAll('script')).find((s) => new RegExp(`\/${NAMESPACE}(\\.esm)?\\.js($|\\?|#)`).test(s.src) ||
            s.getAttribute('data-stencil-namespace') === NAMESPACE)
        : null;
    const importMeta = import.meta.url;
    const opts = BUILD.scriptDataOpts ? (scriptElm || {})['data-opts'] || {} : {};
    if (importMeta !== '') {
        opts.resourcesUrl = new URL('.', importMeta).href;
    }
    return promiseResolve(opts);
};
const patchCloneNodeFix = (HTMLElementPrototype) => {
    const nativeCloneNodeFn = HTMLElementPrototype.cloneNode;
    HTMLElementPrototype.cloneNode = function (deep) {
        if (this.nodeName === 'TEMPLATE') {
            return nativeCloneNodeFn.call(this, deep);
        }
        const clonedNode = nativeCloneNodeFn.call(this, false);
        const srcChildNodes = this.childNodes;
        if (deep) {
            for (let i = 0; i < srcChildNodes.length; i++) {
                // Node.ATTRIBUTE_NODE === 2, and checking because IE11
                if (srcChildNodes[i].nodeType !== 2) {
                    clonedNode.appendChild(srcChildNodes[i].cloneNode(true));
                }
            }
        }
        return clonedNode;
    };
};

patchBrowser().then(options => {
  globalScripts();
  return bootstrapLazy([["home-page",[[1,"home-page"]]],["my-component",[[1,"my-component",{"first":[1],"middle":[1],"last":[1]}]]],["admin-booking",[[1,"admin-booking",{"bookings":[32]}]]],["admin-comp",[[1,"admin-comp"]]],["admin-doctors",[[1,"admin-doctors",{"doctors":[32],"searchCriteria":[32],"searchOption":[32],"editedHospitalName":[32],"sortOption":[32],"filteredDoctors":[32],"isAddDoctorPopupVisible":[32],"newDoctor":[32],"specializationOptions":[32],"hospitalOptions":[32]}]]],["admin-feedback",[[1,"admin-feedback",{"feedbackData":[32],"selectedFeedback":[32]}]]],["admin-form",[[1,"admin-form",{"name":[32],"password":[32],"email":[32],"phoneNumber":[32]}]]],["admin-hospital",[[1,"admin-hospital",{"data":[32],"editingItemIndex":[32],"editedDescription":[32],"isAddHospitalPopupVisible":[32],"newHospitalName":[32],"newHospitalDescription":[32]}]]],["admin-navbar",[[1,"admin-navbar"]]],["appointment-booking",[[1,"appointment-booking",{"formData":[32],"showSuccessPopup":[32],"selectedDoctor":[32],"selectedHospital":[32],"selectedReason":[32],"diseaseCategories":[32],"reasons":[32],"hospitals":[32],"doctors":[32]}]]],["feedback-component",[[1,"feedback-component",{"name":[32],"email":[32],"phoneNumber":[32],"review":[32],"doctorName":[32]}]]],["hospital-footer",[[1,"hospital-footer"]]],["landing-page",[[1,"landing-page"]]],["login-comp",[[1,"login-comp",{"isRegistering":[32],"username":[32],"password":[32],"email":[32],"phoneNumber":[32]}]]],["nav-bar",[[1,"nav-bar"]]],["summary-comp",[[1,"summary-comp",{"data":[32],"searchName":[32],"filteredData":[32],"doctorMap":[32],"doctorNamesSet":[32]}]]]], options);
});

//# sourceMappingURL=hms.esm.js.map