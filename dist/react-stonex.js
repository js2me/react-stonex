'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

var getChangesListenerName = function getChangesListenerName(store) {
  return "@@STONEX_CHANGE_LISTENER_FOR_" + store.storeId;
};

var ReactStonexModifier = function ReactStonexModifier(store) {
  var cSetState = store.setState;
  var changesListenerEvent = new Event(getChangesListenerName(store));

  store.setState = function (moduleName, changes, callback) {
    var result = cSetState(moduleName, changes, callback);
    document.dispatchEvent(changesListenerEvent);
    return result;
  };
};

var subscribeOnStateChanges = function subscribeOnStateChanges(store, callback) {
  document.addEventListener(getChangesListenerName(store), callback);
};

var unsubscribeFromStateChanges = function unsubscribeFromStateChanges(store, callback) {
  document.removeEventListener(getChangesListenerName(store), callback);
}; // @ts-ignore


var Context = React.createContext();

var Provider =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Provider, _React$Component);

  function Provider(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {
      snapshot: _this.props.store.createStateSnapshot()
    });

    _this.whenStateChanged = _this.whenStateChanged.bind(_assertThisInitialized(_this));
    subscribeOnStateChanges(props.store, _this.whenStateChanged);
    return _this;
  }

  var _proto = Provider.prototype;

  _proto.whenStateChanged = function whenStateChanged() {
    this.setState({
      snapshot: this.props.store.createStateSnapshot()
    });
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    unsubscribeFromStateChanges(this.props.store, this.whenStateChanged);
  };

  _proto.render = function render() {
    var _this$props = this.props,
        children = _this$props.children,
        store = _this$props.store;
    return React.createElement(Context.Provider, {
      value: {
        modules: store.modules,
        state: this.state.snapshot
      }
    }, children);
  };

  return Provider;
}(React.Component);

var connect = function connect(changesCallback) {
  return function (WrappedComponent) {
    return function (props) {
      return React.createElement(Context.Consumer, null, function (_ref) {
        var state = _ref.state,
            modules = _ref.modules;
        return React.createElement(WrappedComponent, _extends({}, props, changesCallback(state, modules, props)), props.children);
      });
    };
  };
};

exports.Context = Context;
exports.Provider = Provider;
exports.ReactStonexModifier = ReactStonexModifier;
exports.connect = connect;
exports.default = ReactStonexModifier;
exports.subscribeOnStateChanges = subscribeOnStateChanges;
exports.unsubscribeFromStateChanges = unsubscribeFromStateChanges;
