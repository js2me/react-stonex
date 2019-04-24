"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Provider_1 = require("./components/Provider");
exports.Provider = Provider_1.default;
var SubscribeChanges_1 = require("./SubscribeChanges");
exports.SubscribeChanges = SubscribeChanges_1.default;
// function match (arg, factories, name) {
//   for (let i = factories.length - 1; i >= 0; i--) {
//     const result = factories[i](arg)
//     if (result) return result
//   }
//   return (dispatch, options) => {
//     throw new Error(
//         `Invalid value of type ${typeof arg} for ${name} argument when connecting component ${
//           options.wrappedComponentName
//         }.`
//       )
//   }
// }
// const strictEqual = (a1: any,a2: any) => a1 === a2
// const shallowEqual = (objA: any, objB: any) => {
//   if (strictEqual(objA, objB)) return true
//   if (
//     typeof objA !== 'object' ||
//     objA === null ||
//     typeof objB !== 'object' ||
//     objB === null
//   ) {
//     return false
//   }
//   const keysA = Object.keys(objA)
//   const keysB = Object.keys(objB)
//   if (keysA.length !== keysB.length) return false
//   for (const key of keysA) {
//     if (!Object.prototype.hasOwnProperty.call(objB, key) || !strictEqual(objA[key], objB[key])) {
//       return false
//     }
//   }
//   return true
// }
// function connect (modulesToProps, mergeProps, {
//       pure = true,
//       areStatesEqual = strictEqual,
//       areOwnPropsEqual = shallowEqual,
//       areStatePropsEqual = shallowEqual,
//       areMergedPropsEqual = shallowEqual,
//       ...extraOptions
//     } = {}): any {
//   return (WrappedComponent) => {
//   }
// }
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