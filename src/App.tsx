import { default as ConfigProvider } from "antd/lib/config-provider"
import { Provider } from "react-redux"
import "./global.css"
import Router from "./Router"
import configureStore from "./configureStore"
import { PersistGate } from "redux-persist/integration/react"

const App = () => {
  const { persistor, store } = configureStore()
  return (
    <ConfigProvider>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Router />
        </PersistGate>
      </Provider>
    </ConfigProvider>
  )
}

export default App
