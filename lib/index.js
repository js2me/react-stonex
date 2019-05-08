import React from 'react'

const getChangesListenerName = store =>
  `$$subscribe_changes_for_${store.storeId}`

const StoreChangesListener = store => {
  const cSetState = store.setState

  const changesListenerEvent = new Event(getChangesListenerName(store))

  store.setState = (moduleName, changes, callback) => {
    const result = cSetState(moduleName, changes, callback)
    document.dispatchEvent(changesListenerEvent)
    return result
  }
}

// @ts-ignore
const Context = React.createContext()

class StonexProvider extends React.Component {
  state = {
    snapshot: this.props.store.createStateSnapshot(),
  }

  constructor(props) {
    super(props)
    this.whenStateChanged = this.whenStateChanged.bind(this)

    document.addEventListener(
      getChangesListenerName(props.store),
      this.whenStateChanged
    )
  }

  whenStateChanged() {
    this.setState({
      snapshot: this.props.store.createStateSnapshot(),
    })
  }

  componentWillUnmount() {
    document.removeEventListener(
      getChangesListenerName(this.props.store),
      this.whenStateChanged
    )
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

const connectToStonex = changesCallback => WrappedComponent => props => (
  <Context.Consumer>
    {({ state, modules }) => (
      <WrappedComponent {...props} {...changesCallback(state, modules, props)}>
        {props.children}
      </WrappedComponent>
    )}
  </Context.Consumer>
)

export { connectToStonex, StonexProvider, Context, StoreChangesListener }
