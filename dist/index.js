"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Connector_1 = require("./components/Connector");
exports.connect = Connector_1.connect;
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
var DefaultReactContext = React.createContext(null);
exports.DefaultReactContext = DefaultReactContext;
console.log('DefaultReactContext', DefaultReactContext);
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