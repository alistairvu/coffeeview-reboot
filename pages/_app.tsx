import { AppProps } from "next/app"
import Router from "next/router"
import NProgress from "nprogress"
import "../styles/index.scss"
import { AppHeader } from "../components"

Router.events.on("routeChangeStart", () => NProgress.start())
Router.events.on("routeChangeComplete", () => NProgress.done())
Router.events.on("routeChangeError", () => NProgress.done())

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <header>
        <AppHeader />
      </header>

      <main>
        <Component {...pageProps} />
      </main>
    </>
  )
}

export default MyApp
