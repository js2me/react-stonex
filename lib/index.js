/**
 * Copyright (c) acacode, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import React from 'react'

const getChangesListenerName = store =>
  `@@STONEX_CHANGE_LISTENER_FOR_${store.storeId}`

const ReactStonexModifier = store => {
  const cSetState = store.setState

  const changesListenerEvent = new Event(getChangesListenerName(store))

  store.setState = (moduleName, changes, callback) => {
    const result = cSetState(moduleName, changes, callback)
    document.dispatchEvent(changesListenerEvent)
    return result
  }
}

const subscribeOnStateChanges = (store, callback) => {
  document.addEventListener(getChangesListenerName(store), callback)
}

const unsubscribeFromStateChanges = (store, callback) => {
  document.removeEventListener(getChangesListenerName(store), callback)
}

// @ts-ignore
const Context = React.createContext()

class Provider extends React.Component {
  state = {
    snapshot: this.props.store.createStateSnapshot(),
  }

  constructor(props) {
    super(props)
    this.whenStateChanged = this.whenStateChanged.bind(this)

    subscribeOnStateChanges(props.store, this.whenStateChanged)
  }

  whenStateChanged() {
    this.setState({
      snapshot: this.props.store.createStateSnapshot(),
    })
  }

  componentWillUnmount() {
    unsubscribeFromStateChanges(this.props.store, this.whenStateChanged)
  }

  render() {
    const { children, store } = this.props

    return (
      <Context.Provider
        value={{
          modules: store.modules,
          state: this.state.snapshot,
        }}
      >
        {children}
      </Context.Provider>
    )
  }
}

const connect = changesCallback => WrappedComponent => props => (
  <Context.Consumer>
    {({ state, modules }) => (
      <WrappedComponent {...props} {...changesCallback(state, modules, props)}>
        {props.children}
      </WrappedComponent>
    )}
  </Context.Consumer>
)

export default ReactStonexModifier

export {
  connect,
  Provider,
  Context,
  ReactStonexModifier,
  subscribeOnStateChanges,
  unsubscribeFromStateChanges,
}
