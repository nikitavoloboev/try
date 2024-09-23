import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/try-use-ton')({
  component: () => <div>Hello /try-use-ton!</div>,
})
