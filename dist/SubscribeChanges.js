"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$$subscribe = '$$STONEX_SUBSCRIBER';
exports.$$subscribeEvent = new Event(exports.$$subscribe);
var SubscribeChanges = function (store) {
    var closuredSetState = store.setState.bind(store);
    store.setState = function (moduleName, changes, callback) {
        closuredSetState(moduleName, changes, callback);
        window.dispatchEvent(exports.$$subscribeEvent);
    };
};
exports.default = SubscribeChanges;
//# sourceMappingURL=SubscribeChanges.js.map