"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var $$subscribe = '$$STONEX_SUBSCRIBER';
exports.$$subscribe = $$subscribe;
var $$subscribeEvent = new Event($$subscribe);
exports.$$subscribeEvent = $$subscribeEvent;
var subscribeOnChanges = function (store) {
    var closuredSetState = store.setState.bind(store);
    store.setState = function (moduleName, changes, callback) {
        closuredSetState(moduleName, changes, callback);
        window.dispatchEvent($$subscribeEvent);
    };
};
exports.subscribeOnChanges = subscribeOnChanges;
//# sourceMappingURL=SubscribeChanges.js.map