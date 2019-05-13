# ReactJS + Stonex
ReactJS integration with Stonex


## How to use  
Before at all need to install `react-stonex` (`yarn add react-stonex` or `npm i -S react-stonex`)  
This library have dependencies (it should be installed in your project)  
```
    "react": "^16.4.2",
    "react-dom": "^16.4.2",
    "stonex": "^0.1.0-alpha"
```

In your React Stonex application:  

1. Add `ReactStonexModifier` to your stonex  

```
import { StonexStore } from 'stonex'
import { ReactStonexModifier } from 'react-stonex'

const store = new StonexStore(
  {
    // your modules
  },
  {
    modifiers: [ReactStonexModifier],
  }
)
```

2. Add to the root of the React render tree the `Provider` component and send `store` to him props  

```
import store from 'path-to-your-store'
import { Provider } from 'react-stonex'


const Root = () => {
  return (
    <Provider store={store}>
        // your react tree
    </Provider>
  )
}
```

3. Attach some components which you need to link with `Stonex` store using the `connect()` function  

```
import { connect } from 'react-stonex'


const mapStoreToProps = (state, modules, ownProps) => {

    return {
        fruit: state.fruits.actualFruit,
        createFruit: modules.fruits.createFruit,
        // ownProps is not required to return
        // because props of your cool component
        // already will contains in component's instance
    }
}

const WrappedCoolComponent = connect(mapStoreToProps)(YourCoolComponent)


// somewhere in react tree
<WrappedCoolComponent></WrappedCoolComponent>


```

That's all what you need to do to link your Stonex store with React :) Enjoy!