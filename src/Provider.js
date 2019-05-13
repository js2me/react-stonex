import React from 'react'

import Context from './Context'
import {
  subscribeOnStateChanges,
  unsubscribeFromStateChanges,
} from './SubscriberHelpers'

export default class Provider extends React.Component {
  constructor(props) {
    super(props)
    this.whenStateChanged = this.whenStateChanged.bind(this)

    this.state = {
      snapshot: this.props.store.createStateSnapshot(),
    }

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
