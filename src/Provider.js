import React from 'react'

import Context from './Context'
import {
  subscribeOnStateChanges,
  unsubscribeFromStateChanges,
} from './SubscriberHelpers'

const compareTwoValues = (nextValue, prevValue) => {
  const nextType = typeof nextValue
  const prevType = typeof prevValue

  if (nextType !== prevType) {
    return false
  }

  if (nextValue instanceof Array) {
    if (!(prevValue instanceof Array)) {
      return false
    }

    if (nextValue.length !== prevValue.length) {
      return false
    }

    for (let x = 0; x < nextValue.length; x++) {
      if (!compareTwoValues(nextValue[x], prevValue[x])) {
        return false
      }
    }

    return true
  }

  if (nextType === 'object') {
    const keys = Object.keys(nextValue)

    if (keys.length !== Object.keys(prevValue).length) {
      return false
    }

    for (let x = 0; x < keys.length; x++) {
      if (!compareTwoValues(nextValue[keys[x]], prevValue[keys[x]])) {
        return false
      }
    }

    return true
  }

  return nextValue === prevValue
}

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

  shouldComponentUpdate() {}

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
