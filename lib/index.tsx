import * as React from 'react'
export * from './components/SubscribeChanges'
import * as PropTypes from 'prop-types'
import { StonexModules, StonexStore, Store } from 'stonex'
import { $$subscribe } from './components/SubscribeChanges'
import { shallowEqual, strictEqual } from './utils/base'

// @ts-ignore
const StonexContext = React.createContext()

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

export declare type ModulesToProps = <MP>(state: StonexModules<MP>, modules: any) => any

function connect <MP> (modulesToProps: ModulesToProps, mergeProps: any, {
  pure = true,
  areStatesEqual = strictEqual,
  areOwnPropsEqual = shallowEqual,
  areStatePropsEqual = shallowEqual,
  areMergedPropsEqual = shallowEqual,
  ...extraOptions
} = {}): any {

  const getData = (store: any, ownProps: any = {}) => {
    console.log('WrapperComponent -> getData store', store)
    return {
      ...ownProps,
      ...modulesToProps(store.state, store.modules)
    }
  }

  return (WrappedComponent: any) => (props: any) => (
    <StonexContext.Consumer>
      {(store: any) => <WrappedComponent {...getData(store, props)}/>}
    </StonexContext.Consumer>
  )
}

// function match (arg: any, factories: any, name: any) {
//   for (let i = factories.length - 1; i >= 0; i--) {
//     const result = factories[i](arg)
//     if (result) return result
//   }

//   return (dispatch: any, options: any) => {
//     throw new Error(
//         `Invalid value of type ${typeof arg} for ${name} argument when connecting component ${
//           options.wrappedComponentName
//         }.`
//       )
//   }
// }

export {
    connect,
    Provider,
    StonexContext,
}
// export { connect }
/// connect(modulesToProps)(SomeComponent)
// const modulesToProps = ({ books, items } = {}, ownProps = {}) => {

// return {
//     getBooks: books.getBooks,
//     books: books.state,
//     ...ownProps
// }
// }
