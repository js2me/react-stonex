import { Modifier, Store } from 'stonex'

const $$subscribe = '$$STONEX_SUBSCRIBER'

const $$subscribeEvent = new Event($$subscribe)

const subscribeOnChanges: Modifier<any> = (store: Store<any>) => {
  const closuredSetState = store.setState.bind(store)

  store.setState = <State>(
    moduleName: string, changes: ((() => Partial<State>) | Partial<State>),
    callback: (state: State) => any
  ) => {
    closuredSetState(moduleName, changes, callback)
    window.dispatchEvent($$subscribeEvent)
  }

}

export {
  $$subscribe,
  $$subscribeEvent,
  subscribeOnChanges,
}
