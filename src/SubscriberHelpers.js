const LISTENER_EVENT_IDENTIFIER = '@@STONEX_CHANGE_LISTENER'

export const getChangesListenerName = store =>
  `${LISTENER_EVENT_IDENTIFIER}${store.storeId}`

export const createChangeListenerEvent = store =>
  new Event(getChangesListenerName(store))

export const subscribeOnStateChanges = (store, callback) => {
  document.addEventListener(getChangesListenerName(store), callback)
}

export const unsubscribeFromStateChanges = (store, callback) => {
  document.removeEventListener(getChangesListenerName(store), callback)
}
