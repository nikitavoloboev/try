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
import { useRef } from "react"
import { Fragment } from "react/jsx-runtime"
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
  todos: [],
})

const addTodo = (description: string) => {
  store.todos.push({
    description,
    status: "pending",
    id: Date.now(),
  })
}

const removeTodo = (id: number) => {
  const index = store.todos.findIndex((todo) => todo.id === id)
  if (index >= 0) {
    store.todos.splice(index, 1)
  }
}

const toggleDone = (id: number, currentStatus: Status) => {
  const nextStatus = currentStatus === "pending" ? "completed" : "pending"
  const todo = store.todos.find((todo) => todo.id === id)
  if (todo) {
    todo.status = nextStatus
  }
}

const setFilter = (filter: Filter) => {
  store.filter = filter
}

const filterValues: Filter[] = ["all", "pending", "completed"]

const Filters = () => {
  const snap = useSnapshot(store)
  return (
    <nav>
      {filterValues.map((filter) => (
        <Fragment key={filter}>
          <input
            name="filter"
            type="radio"
            value={filter}
            checked={snap.filter === filter}
            onChange={() => setFilter(filter)}
          />
          <label>{filter}</label>
        </Fragment>
      ))}
    </nav>
  )
}

const Todos = () => {
  const snap = useSnapshot(store)
  return (
    <ul>
      {snap.todos
        .filter(({ status }) => status === snap.filter || snap.filter === "all")
        .map(({ description, status, id }) => {
          return (
            <li key={id}>
              <span
                data-status={status}
                className="description"
                onClick={() => toggleDone(id, status)}
              >
                {description}
              </span>
              <button className="remove" onClick={() => removeTodo(id)}>
                x
              </button>
            </li>
          )
        })}
    </ul>
  )
}

const CreateTodo = () => {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <section>
      <input name="description" type="text" minLength={2} ref={inputRef} />
      <button
        className="add"
        onClick={() => addTodo(inputRef.current?.value ?? "")}
      >
        Add new
      </button>
    </section>
  )
}

export default function App() {
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
