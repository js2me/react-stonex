import * as React from 'react'
import { StonexModules } from 'stonex'
import { shallowEqual, strictEqual } from '../utils/base'
import StonexContext from './StonexContext'

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

export {
  connect
}
