"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var base_1 = require("../utils/base");
var StonexContext_1 = require("./StonexContext");
function connect(modulesToProps, mergeProps, _a) {
    if (_a === void 0) { _a = {}; }
    var _b = _a.pure, pure = _b === void 0 ? true : _b, _c = _a.areStatesEqual, areStatesEqual = _c === void 0 ? base_1.strictEqual : _c, _d = _a.areOwnPropsEqual, areOwnPropsEqual = _d === void 0 ? base_1.shallowEqual : _d, _e = _a.areStatePropsEqual, areStatePropsEqual = _e === void 0 ? base_1.shallowEqual : _e, _f = _a.areMergedPropsEqual, areMergedPropsEqual = _f === void 0 ? base_1.shallowEqual : _f, extraOptions = __rest(_a, ["pure", "areStatesEqual", "areOwnPropsEqual", "areStatePropsEqual", "areMergedPropsEqual"]);
    var getData = function (store, ownProps) {
        if (ownProps === void 0) { ownProps = {}; }
        console.log('WrapperComponent -> getData store', store);
        return __assign({}, ownProps, modulesToProps(store.state, store.modules));
    };
    return function (WrappedComponent) { return function (props) { return (React.createElement(StonexContext_1.default.Consumer, null, function (store) { return React.createElement(WrappedComponent, __assign({}, getData(store, props))); })); }; };
}
exports.connect = connect;
//# sourceMappingURL=Wrapper.js.map