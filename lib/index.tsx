import * as PropTypes from 'prop-types'
import React, { Component, createContext } from 'react'
import { StonexStore, Store } from 'stonex'

const getChangesListenerName = (store: Store<any>) =>
  `$$subscribe_changes_for_${store.storeId}`

const StoreChangesListener = (store: Store<any>) => {
  const cSetState = store.setState

  const changesListenerEvent = new Event(getChangesListenerName(store))

  store.setState = (moduleName: string,
                    changes: ((() => Partial<any>) | Partial<any>), callback: (state: any) => any) => {
    const result = cSetState(moduleName, changes, callback)
    document.dispatchEvent(changesListenerEvent)
    return result
  }
}

// @ts-ignore
const Context = createContext()

interface ProviderProps<MP> {
  store: Store<MP>
}

interface ProviderState{
  stateSnapshot: State
}

class StonexProvider<MP> extends Component<ProviderProps<MP>> {

  public static propTypes = {
    store: PropTypes.instanceOf(StonexStore)
  }

  public state = {
    stateSnapshot: {},
  }

  constructor (props: any) {
    super(props)

    document.addEventListener(
      getChangesListenerName(props.store),
      this.whenStateChanged,
      false
    )
  }

  public whenStateChanged = () => {
    this.setState({
      stateSnapshot: StonexStore.createStateSnapshot(this.props.store.modules),
    })
  }

  public componentWillUnmount (): void {
    document.removeEventListener(
      getChangesListenerName(this.props.store),
      this.whenStateChanged
    )
  }

  public render (): any {
    return (
      <Context.Provider
        value={{
          state: this.state.stateSnapshot,
          modules: this.props.store.modules,
        }}
      >
        {this.props.children}
      </Context.Provider>
    )
  }
}

function connectToStonex (changesCallback) {
  return WrappedComponent => {
    return class extends Component {
      public render () {
        return (
          <Context.Consumer>
            {({ state, modules }) => (
              <WrappedComponent
                {...this.props}
                {...changesCallback(state, modules, this.props)}
              >
                {this.props.children}
              </WrappedComponent>
            )}
          </Context.Consumer>
        )
      }
    }
  }
}

export {
  connectToStonex,
  StonexProvider,
  Context,
  StoreChangesListener,
}
