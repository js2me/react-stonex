"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var Provider_1 = require("./components/Provider");
exports.Provider = Provider_1.default;
var StonexContext_1 = require("./components/StonexContext");
exports.Context = StonexContext_1.default;
var Wrapper_1 = require("./components/Wrapper");
exports.connect = Wrapper_1.connect;
__export(require("./components/SubscribeChanges"));
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