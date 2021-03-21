import { AppProps } from "next/app"
import Router from "next/router"
import NProgress from "nprogress"
import "../styles/index.scss"
import { AppHeader } from "../components"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { store, persistor } from "../redux"

Router.events.on("routeChangeStart", () => NProgress.start())
Router.events.on("routeChangeComplete", () => NProgress.done())
Router.events.on("routeChangeError", () => NProgress.done())

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <header>
          <AppHeader />
        </header>

        <main>
          <Component {...pageProps} />
        </main>
      </PersistGate>
    </Provider>
  )
}

export default MyApp
