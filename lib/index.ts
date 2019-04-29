import * as React from 'react'
import { connect } from './components/Connector'
import Provider from './components/Provider'
import SubscribeChanges from './SubscribeChanges'

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

const DefaultReactContext = React.createContext(null)

console.log('DefaultReactContext', DefaultReactContext)
export {
    connect,
    Provider,
    DefaultReactContext,
    SubscribeChanges,
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
