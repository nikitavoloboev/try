import { cssBundleHref } from "@remix-run/css-bundle"
import type { LinksFunction } from "@remix-run/node"
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react"
import { proxy, useSnapshot } from "valtio"

type Status = "pending" | "completed"
type Filter = Status | "all"
type Todo = {
  description: string
  status: Status
  id: number
}

export const store = proxy<{ filter: Filter; todos: Todo[] }>({
  filter: "all",
  todos: [{}],
})

export default function App() {
  const snap = useSnapshot(store)
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <>
          <h1>
            To-do List{" "}
            <span role="img" aria-label="pen">
              ✏️
            </span>
          </h1>
          <Filters />
          <Todos />
          <CreateTodo />
        </>
        {/* <Outlet /> */}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
]
