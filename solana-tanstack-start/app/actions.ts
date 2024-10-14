import { createServerFn } from "@tanstack/start"

export const testFetch = createServerFn("GET", async () => {
  return {
    test: "test",
    array: [1, 2, 3, 4, 5],
  }
})
