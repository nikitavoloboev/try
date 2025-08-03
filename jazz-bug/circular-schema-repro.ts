import { co, z } from "jazz-tools";

console.log("Jazz-tools version:", require("jazz-tools/package.json").version);

// Define the FileItem schema
export const FileItem = co.map({
    type: z.literal("file"),
    name: z.string(),
    content: co.fileStream(),
});

// Define the UrlItem schema with circular reference
export const UrlItem = co.map({
    type: z.literal("url"),
    content: z.string(),
    refreshing: z.boolean(),
    url: z.url(),
    name: z.string(),
    // This getter will cause the circular reference issue
    get children() {
        return ItemList; // ReferenceError: Cannot access 'ItemList' before initialization
    },
});

// This discriminated union causes eager evaluation
export const Item = co.discriminatedUnion("type", [FileItem, UrlItem]);

// ItemList references Item, creating the circular dependency
export const ItemList = co.list(Item);

// Test the schemas
console.log("Testing circular schema definition...");

// This alternative approach causes stack overflow
export const UrlItemWithInlineChildren = co.map({
    type: z.literal("url"),
    content: z.string(),
    refreshing: z.boolean(),
    url: z.url(),
    name: z.string(),
    get children() {
        // RangeError: Maximum call stack size exceeded
        return co.list(co.discriminatedUnion("type", [FileItem, UrlItemWithInlineChildren]));
    },
});

console.log("Schemas defined successfully (this won't be reached due to errors)");