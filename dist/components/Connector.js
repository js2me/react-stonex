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
Object.defineProperty(exports, "__esModule", { value: true });
// import * as PropTypes from 'prop-types'
var React = require("react");
// import { $$subscribe } from '../SubscribeChanges'
var __1 = require("..");
var base_1 = require("../utils/base");
function connect(modulesToProps, mergeProps, _a) {
    if (_a === void 0) { _a = {}; }
    var _b = _a.pure, pure = _b === void 0 ? true : _b, _c = _a.areStatesEqual, areStatesEqual = _c === void 0 ? base_1.strictEqual : _c, _d = _a.areOwnPropsEqual, areOwnPropsEqual = _d === void 0 ? base_1.shallowEqual : _d, _e = _a.areStatePropsEqual, areStatePropsEqual = _e === void 0 ? base_1.shallowEqual : _e, _f = _a.areMergedPropsEqual, areMergedPropsEqual = _f === void 0 ? base_1.shallowEqual : _f, extraOptions = __rest(_a, ["pure", "areStatesEqual", "areOwnPropsEqual", "areStatePropsEqual", "areMergedPropsEqual"]);
    return function (WrappedComponent) { return /** @class */ (function (_super) {
        __extends(WrapperComponent, _super);
        function WrapperComponent() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.getData = function (storeState, ownProps) {
                if (ownProps === void 0) { ownProps = {}; }
                console.log('storeState', storeState);
                return __assign({}, ownProps, modulesToProps(storeState));
            };
            _this.render = function () {
                var Consumer = __1.DefaultReactContext.Consumer;
                console.log('ConsumerConsumer', Consumer);
                return (React.createElement(Consumer, null, function (storeState) { return React.createElement(WrappedComponent, __assign({}, _this.getData(storeState, _this.props))); }));
            };
            return _this;
        }
        return WrapperComponent;
    }(React.Component)); };
}
exports.connect = connect;
//# sourceMappingURL=Connector.js.map