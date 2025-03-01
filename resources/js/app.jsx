
import "../css/app.css"

import { createRoot } from "react-dom/client"
import { createInertiaApp } from "@inertiajs/react"
import { InertiaProgress } from "@inertiajs/progress"
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers"

const appName = window.document.getElementsByTagName("title")[0]?.innerText || "RideShare"

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) => resolvePageComponent(`./pages/${name}.jsx`, import.meta.glob("./pages/**/*.jsx")),
  setup({ el, App, props }) {
    const root = createRoot(el)
    root.render(<App {...props} />)
  },
})

InertiaProgress.init({
  color: "#B5E61D",
  showSpinner: true,
})

