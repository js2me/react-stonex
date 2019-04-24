import { Modifier, Store } from 'stonex'

export const $$subscribe = '$$STONEX_SUBSCRIBER'

export const $$subscribeEvent = new Event($$subscribe)

const SubscribeChanges: Modifier<any> = (store: Store<any>) => {
  const closuredSetState = store.setState.bind(store)

  store.setState = <State>(
    moduleName: string, changes: ((() => Partial<State>) | Partial<State>),
    callback: (state: State) => any
  ) => {
    closuredSetState(moduleName, changes, callback)
    window.dispatchEvent($$subscribeEvent)
  }

}

export default SubscribeChanges
