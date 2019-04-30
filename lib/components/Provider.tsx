import * as PropTypes from 'prop-types'
import * as React from 'react'
import { StonexStore, Store } from 'stonex'
import StonexContext from './StonexContext'
import { $$subscribe } from './SubscribeChanges'

declare interface Props<MP> {
  context: {
    Provider: any
  },
  children: any,
  store: Store<MP>
}

declare interface State {
  store: any,
  state: any
}

class Provider<MP> extends React.Component<Props<MP>, State, any> {

  public static propTypes = {
    children: PropTypes.any
  }

  private _isMounted = false

  constructor (props: Props<MP>) {
    super(props)

    const { store } = props

    this.state = {
      state: StonexStore.createStateSnapshot(store.modules),
      store,
    }
  }

  public onStateChange = () => {
    const { store } = this.props
    if (!this._isMounted) {
      return
    }

    console.log('Provider -> onStateChange StonexContext', StonexContext)

    this.setState({ state: StonexStore.createStateSnapshot(store.modules) })
  }

  public subscribe (): void {
    const { store } = this.props

    window.addEventListener($$subscribe, this.onStateChange)

    // Actions might have been dispatched between render and mount - handle those
    const postMountStoreState = StonexStore.createStateSnapshot(store.modules)
    if (postMountStoreState !== this.state.state) {
      this.setState({ state: postMountStoreState })
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
    console.log('Provider -> render this.state.state', this.state.state)

    const { state, store: { modules } } = this.state

    return (
      <StonexContext.Provider value={{ state, modules }}>{this.props.children}</StonexContext.Provider>
    )
  }
}

export default Provider
