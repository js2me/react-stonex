/* tslint-disable tslint:disable */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ReactReduxContext } from './Context'

declare interface Props {
    context: any,
    children: any,
    store: any
}

declare interface State {
    store: any,
    storeState: any
}

class Provider extends Component<Props, State, any> {


    
    static public propTypes = {
        store: PropTypes.shape({
          subscribe: PropTypes.func.isRequired,
          dispatch: PropTypes.func.isRequired,
          getState: PropTypes.func.isRequired
        }),
        context: PropTypes.object,
        children: PropTypes.any
      }
      public unsubscribe: ()=>void

    private _isMounted = false



  constructor(props: Props) {
    super(props)

    const { store } = props

    this.state = {
        store,
      storeState: store.getState(),
    }
  }
  

  public componentDidUpdate(prevProps: Props): void {
    if (this.props.store !== prevProps.store) {
      if (this.unsubscribe) this.unsubscribe()

      this.subscribe()
    }
  }

  public subscribe(): void {
    const { store } = this.props

    this.unsubscribe = store.subscribe(() => {
      const newStoreState = store.getState()

      if (!this._isMounted) {
        return
      }

      this.setState((providerState:State) => {
        // If the value is the same, skip the unnecessary state update.
        if (providerState.storeState === newStoreState) {
          return null
        }

        return { storeState: newStoreState }
      })
    })

    // Actions might have been dispatched between render and mount - handle those
    const postMountStoreState = store.getState()
    if (postMountStoreState !== this.state.storeState) {
      this.setState({ storeState: postMountStoreState })
    }
  }

  public componentDidMount(): void {
    this._isMounted = true
    this.subscribe()
  }

  public componentWillUnmount(): void {
    if (this.unsubscribe) this.unsubscribe()

    this._isMounted = false
  }

  public render(): any {
    const { Provider } = this.props.context || ReactReduxContext

    return (
      <Provider value={this.state}>{this.props.children}</Provider>
    )
  }
}

export default Provider