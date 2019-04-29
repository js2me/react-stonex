// import * as PropTypes from 'prop-types'
import * as React from 'react'
import { StonexModules, Store } from 'stonex'
// import { $$subscribe } from '../SubscribeChanges'

import { DefaultReactContext } from '..'
import { shallowEqual, strictEqual } from '../utils/base'

declare interface Props<MP> {
  context: {
    Consumer: any
  },
  children: any,
  store: Store<MP>
}

export declare type ModulesToProps = <MP>(modules: StonexModules<MP>) => any

function connect <MP> (modulesToProps: ModulesToProps, mergeProps: any, {
  pure = true,
  areStatesEqual = strictEqual,
  areOwnPropsEqual = shallowEqual,
  areStatePropsEqual = shallowEqual,
  areMergedPropsEqual = shallowEqual,
  ...extraOptions
} = {}): any {

  return (WrappedComponent: any) => class WrapperComponent extends React.Component<Props<MP>, any, any> {

    public getData = (storeState: any, ownProps: any = {}) => {
      console.log('storeState', storeState)
      return {
        ...ownProps,
        ...modulesToProps(storeState)
      }
    }

    public render = (): any => {
      const { Consumer } = DefaultReactContext
      console.log('ConsumerConsumer', Consumer)
      return (
        <Consumer>
          {(storeState) => <WrappedComponent {...this.getData(storeState, this.props)}/>}
        </Consumer>
      )
    }
  }
}

export {
  connect
}
