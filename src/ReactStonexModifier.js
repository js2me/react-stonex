import { createChangeListenerEvent } from './SubscriberHelpers'

export default function ReactStonexModifier(store) {
  const cSetState = store.setState

  const changesListenerEvent = createChangeListenerEvent(store)

  store.setState = (moduleName, changes, callback) => {
    const result = cSetState(moduleName, changes, callback)
    document.dispatchEvent(changesListenerEvent)
    return result
  }
}
