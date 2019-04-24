import * as PropTypes from 'prop-types'
import * as React from 'react'
import { StonexStore, Store } from 'stonex'
import { $$subscribe } from '../SubscribeChanges'

declare interface Props<MP> {
  context: {
    Provider: any
  },
  children: any,
  store: Store<MP>
}

declare interface State {
  store: any,
  storeState: any
}

class Provider<MP> extends React.Component<Props<MP>, State, any> {

  public static propTypes = {
    children: PropTypes.any,
    context: PropTypes.object,
    store: PropTypes.shape({
      getState: PropTypes.func.isRequired,
    }),
  }

  private _isMounted = false

  constructor (props: Props<MP>) {
    super(props)

    const { store } = props

    this.state = {
      store,
      storeState: StonexStore.createStateSnapshot(store.modules),
    }
  }

  public onStateChange = () => {
    const { store } = this.props
    const newStoreState = StonexStore.createStateSnapshot(store.modules)

    if (!this._isMounted) {
      return
    }

    this.setState((providerState: State) => {
      // If the value is the same, skip the unnecessary state update.
      if (providerState.storeState === newStoreState) {
        return null
      }

      return { storeState: newStoreState }
    })
  }

  public subscribe (): void {
    const { store } = this.props

    window.addEventListener($$subscribe, this.onStateChange)
    // Actions might have been dispatched between render and mount - handle those
    const postMountStoreState = StonexStore.createStateSnapshot(store.modules)
    if (postMountStoreState !== this.state.storeState) {
      this.setState({ storeState: postMountStoreState })
    }
  }

  public componentDidMount (): void {
    this._isMounted = true
    this.subscribe()
  }

  public componentWillUnmount (): void {
    window.removeEventListener($$subscribe, this.onStateChange)

    this._isMounted = false
  }

  public render (): any {
    const { Provider } = this.props.context || React.createContext(null)

    return (
      <Provider value={this.state}>{this.props.children}</Provider>
    )
  }
}

export default Provider
