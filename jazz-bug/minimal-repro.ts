// Minimal reproduction of circular schema issue with co.discriminatedUnion
import { co, z } from "jazz-tools";

// This is the exact code from the issue report
export const FileItem = co.map({
    type: z.literal("file"),
    name: z.string(),
    content: co.fileStream(),
})

export const UrlItem = co.map({
    type: z.literal("url"),
    content: z.string(),
    refreshing: z.boolean(),
    url: z.url(),
    name: z.string(),
    get children() {
        return ItemList
    },
})

export const Item = co.discriminatedUnion("type", [FileItem, UrlItem])

export const ItemList = co.list(Item)

// This will throw: Uncaught ReferenceError: Cannot access 'ItemList' before initialization