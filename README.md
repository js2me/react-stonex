<div align="center">

  [![react-stonex](./logo.png)](https://www.npmjs.com/package/react-stonex) 

  [![](https://img.shields.io/badge/license-MIT-red.svg)](./LICENSE)
  [![](https://img.shields.io/npm/v/react-stonex.svg)](https://www.npmjs.com/package/react-stonex)
  [![](https://img.shields.io/travis/acacode/react-stonex.svg)](https://travis-ci.org/acacode/react-stonex)
  [![](https://www.codefactor.io/repository/github/acacode/react-stonex/badge/master)](https://www.codefactor.io/repository/github/acacode/react-stonex/overview/master)
  [![](https://img.shields.io/npm/dm/react-stonex.svg)](http://npm-stat.com/charts.html?package=react-stonex)
  [![](https://badgen.net/bundlephobia/min/react-stonex)](https://bundlephobia.com/result?p=react-stonex)
  [![](https://badgen.net/bundlephobia/minzip/react-stonex)](https://bundlephobia.com/result?p=react-stonex)

  <p>
    🌀 ReactJS integration with Stonex 🌀️
  </p>
</div>


## 💡 How to use  

Before at all need to install `react-stonex` (`yarn add react-stonex` or `npm i -S react-stonex`)  
This library have dependencies (**it should be installed** in your project too)  

```
    "react": "^16.4.2",
    "react-dom": "^16.4.2",
    "stonex": "^0.1.0-alpha"
```

In your React Stonex application:  

**1.** Add `ReactStonexModifier` to list of modifiers of your stonex store:  

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

**2.** Add to the root of the React render tree the `Provider` component and send `store` to him props:  

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

**3.** Attach some components which you need to link with `Stonex` store using the `connect()` function:  

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




## 📝 License

Licensed under the [MIT License](./LICENSE).
