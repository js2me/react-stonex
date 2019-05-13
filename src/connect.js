import React from 'react'
import Context from './Context'

export const connect = mapStoreToProps => WrappedComponent => props => (
  <Context.Consumer>
    {({ state, modules }) => (
      <WrappedComponent {...props} {...mapStoreToProps(state, modules, props)}>
        {props.children}
      </WrappedComponent>
    )}
  </Context.Consumer>
)
