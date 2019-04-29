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
Object.defineProperty(exports, "__esModule", { value: true });
var PropTypes = require("prop-types");
var React = require("react");
var stonex_1 = require("stonex");
var __1 = require("..");
var SubscribeChanges_1 = require("../SubscribeChanges");
var Provider = /** @class */ (function (_super) {
    __extends(Provider, _super);
    function Provider(props) {
        var _this = _super.call(this, props) || this;
        _this._isMounted = false;
        _this.onStateChange = function () {
            var store = _this.props.store;
            var newStoreState = stonex_1.StonexStore.createStateSnapshot(store.modules);
            if (!_this._isMounted) {
                return;
            }
            console.log('DefaultReactContext', __1.DefaultReactContext);
            _this.setState(function (providerState) {
                if (providerState.storeState === newStoreState) {
                    return null;
                }
                return { storeState: newStoreState };
            });
        };
        var store = props.store;
        _this.state = {
            store: store,
            storeState: stonex_1.StonexStore.createStateSnapshot(store.modules),
        };
        return _this;
    }
    Provider.prototype.subscribe = function () {
        var store = this.props.store;
        window.addEventListener(SubscribeChanges_1.$$subscribe, this.onStateChange);
        // Actions might have been dispatched between render and mount - handle those
        var postMountStoreState = stonex_1.StonexStore.createStateSnapshot(store.modules);
        if (postMountStoreState !== this.state.storeState) {
            this.setState({ storeState: postMountStoreState });
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
        var Provider = __1.DefaultReactContext.Provider;
        return (React.createElement(Provider, { value: this.state.storeState }, this.props.children));
    };
    Provider.propTypes = {
        children: PropTypes.any,
        context: PropTypes.object,
        store: PropTypes.shape({
            getState: PropTypes.func.isRequired,
        }).isRequired,
    };
    return Provider;
}(React.Component));
exports.default = Provider;
//# sourceMappingURL=Provider.js.map