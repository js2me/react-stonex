"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
__export(require("./components/SubscribeChanges"));
var PropTypes = require("prop-types");
var stonex_1 = require("stonex");
var SubscribeChanges_1 = require("./components/SubscribeChanges");
var base_1 = require("./utils/base");
// @ts-ignore
var StonexContext = React.createContext();
exports.StonexContext = StonexContext;
var Provider = /** @class */ (function (_super) {
    __extends(Provider, _super);
    function Provider(props) {
        var _this = _super.call(this, props) || this;
        _this._isMounted = false;
        _this.onStateChange = function () {
            var store = _this.props.store;
            if (!_this._isMounted) {
                return;
            }
            console.log('Provider -> onStateChange StonexContext', StonexContext);
            _this.setState({ state: stonex_1.StonexStore.createStateSnapshot(store.modules) });
        };
        var store = props.store;
        _this.state = {
            state: stonex_1.StonexStore.createStateSnapshot(store.modules),
            store: store,
        };
        return _this;
    }
    Provider.prototype.subscribe = function () {
        var store = this.props.store;
        window.addEventListener(SubscribeChanges_1.$$subscribe, this.onStateChange);
        // Actions might have been dispatched between render and mount - handle those
        var postMountStoreState = stonex_1.StonexStore.createStateSnapshot(store.modules);
        if (postMountStoreState !== this.state.state) {
            this.setState({ state: postMountStoreState });
        }
    };
    Provider.prototype.componentDidMount = function () {
        this._isMounted = true;
        this.subscribe();
    };
    Provider.prototype.componentWillUnmount = function () {
        window.removeEventListener(SubscribeChanges_1.$$subscribe, this.onStateChange);
        this._isMounted = false;
    };
    Provider.prototype.render = function () {
        console.log('Provider -> render this.state.state', this.state.state);
        var _a = this.state, state = _a.state, modules = _a.store.modules;
        return (React.createElement(StonexContext.Provider, { value: { state: state, modules: modules } }, this.props.children));
    };
    Provider.propTypes = {
        children: PropTypes.any
    };
    return Provider;
}(React.Component));
exports.Provider = Provider;
function connect(modulesToProps, mergeProps, _a) {
    if (_a === void 0) { _a = {}; }
    var _b = _a.pure, pure = _b === void 0 ? true : _b, _c = _a.areStatesEqual, areStatesEqual = _c === void 0 ? base_1.strictEqual : _c, _d = _a.areOwnPropsEqual, areOwnPropsEqual = _d === void 0 ? base_1.shallowEqual : _d, _e = _a.areStatePropsEqual, areStatePropsEqual = _e === void 0 ? base_1.shallowEqual : _e, _f = _a.areMergedPropsEqual, areMergedPropsEqual = _f === void 0 ? base_1.shallowEqual : _f, extraOptions = __rest(_a, ["pure", "areStatesEqual", "areOwnPropsEqual", "areStatePropsEqual", "areMergedPropsEqual"]);
    var getData = function (store, ownProps) {
        if (ownProps === void 0) { ownProps = {}; }
        console.log('WrapperComponent -> getData store', store);
        return __assign({}, ownProps, modulesToProps(store.state, store.modules));
    };
    return function (WrappedComponent) { return function (props) { return (React.createElement(StonexContext.Consumer, null, function (store) { return React.createElement(WrappedComponent, __assign({}, getData(store, props))); })); }; };
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