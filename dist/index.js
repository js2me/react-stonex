"use strict";
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
var Provider_1 = require("./components/Provider");
exports.Provider = Provider_1.default;
var SubscribeChanges_1 = require("./SubscribeChanges");
exports.SubscribeChanges = SubscribeChanges_1.default;
// function match (arg: any, factories: any, name: any) {
//   for (let i = factories.length - 1; i >= 0; i--) {
//     const result = factories[i](arg)
//     if (result) return result
//   }
//   return (dispatch: any, options: any) => {
//     throw new Error(
//         `Invalid value of type ${typeof arg} for ${name} argument when connecting component ${
//           options.wrappedComponentName
//         }.`
//       )
//   }
// }
var strictEqual = function (a1, a2) { return a1 === a2; };
var shallowEqual = function (objA, objB) {
    if (strictEqual(objA, objB))
        return true;
    if (typeof objA !== 'object' ||
        objA === null ||
        typeof objB !== 'object' ||
        objB === null) {
        return false;
    }
    var keysA = Object.keys(objA);
    var keysB = Object.keys(objB);
    if (keysA.length !== keysB.length)
        return false;
    for (var _i = 0, keysA_1 = keysA; _i < keysA_1.length; _i++) {
        var key = keysA_1[_i];
        if (!Object.prototype.hasOwnProperty.call(objB, key) || !strictEqual(objA[key], objB[key])) {
            return false;
        }
    }
    return true;
};
function connect(modulesToProps, mergeProps, _a) {
    if (_a === void 0) { _a = {}; }
    var _b = _a.pure, pure = _b === void 0 ? true : _b, _c = _a.areStatesEqual, areStatesEqual = _c === void 0 ? strictEqual : _c, _d = _a.areOwnPropsEqual, areOwnPropsEqual = _d === void 0 ? shallowEqual : _d, _e = _a.areStatePropsEqual, areStatePropsEqual = _e === void 0 ? shallowEqual : _e, _f = _a.areMergedPropsEqual, areMergedPropsEqual = _f === void 0 ? shallowEqual : _f, extraOptions = __rest(_a, ["pure", "areStatesEqual", "areOwnPropsEqual", "areStatePropsEqual", "areMergedPropsEqual"]);
    return function (WrappedComponent) {
        console.log('WrappedComponent', WrappedComponent);
        return WrappedComponent;
    };
}
exports.connect = connect;
// export { connect }
/// connect(modulesToProps)(SomeComponent)
// const modulesToProps = ({ books, items } = {}, ownProps = {}) => {
// return {
//     getBooks: books.getBooks,
//     books: books.state,
//     ...ownProps
// }
// }
//# sourceMappingURL=index.js.map