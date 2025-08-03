import { co, z } from "jazz-tools";

console.log("=== Workaround Examples for Circular Schemas ===\n");

// Workaround 1: Use z.discriminatedUnion instead of co.discriminatedUnion
console.log("Workaround 1: Using z.discriminatedUnion");
{
    const FileItem = co.map({
        type: z.literal("file"),
        name: z.string(),
        content: co.fileStream(),
    });

    const UrlItem = co.map({
        type: z.literal("url"),
        content: z.string(),
        refreshing: z.boolean(),
        url: z.url(),
        name: z.string(),
        get children() {
            return ItemList;
        },
    });

    // Use z.discriminatedUnion which doesn't have eager evaluation
    const Item = z.discriminatedUnion("type", [FileItem, UrlItem]);
    const ItemList = co.list(Item);
    
    console.log("✅ Success: z.discriminatedUnion works with circular references\n");
}

// Workaround 2: Lazy initialization pattern
console.log("Workaround 2: Lazy initialization");
{
    const FileItem = co.map({
        type: z.literal("file"),
        name: z.string(),
        content: co.fileStream(),
    });

    let ItemList: any;
    
    const UrlItem = co.map({
        type: z.literal("url"),
        content: z.string(),
        refreshing: z.boolean(),
        url: z.url(),
        name: z.string(),
        get children() {
            // Initialize on first access
            if (!ItemList) {
                const Item = co.discriminatedUnion("type", [FileItem, UrlItem]);
                ItemList = co.list(Item);
            }
            return ItemList;
        },
    });

    const Item = co.discriminatedUnion("type", [FileItem, UrlItem]);
    ItemList = co.list(Item);
    
    console.log("✅ Success: Lazy initialization avoids initialization errors\n");
}

// Workaround 3: Using a factory function
console.log("Workaround 3: Factory function pattern");
{
    const createSchemas = () => {
        const FileItem = co.map({
            type: z.literal("file"),
            name: z.string(),
            content: co.fileStream(),
        });

        const schemas: any = {};
        
        const UrlItem = co.map({
            type: z.literal("url"),
            content: z.string(),
            refreshing: z.boolean(),
            url: z.url(),
            name: z.string(),
            get children() {
                return schemas.ItemList;
            },
        });

        schemas.Item = co.discriminatedUnion("type", [FileItem, UrlItem]);
        schemas.ItemList = co.list(schemas.Item);
        
        return schemas;
    };
    
    const { Item, ItemList } = createSchemas();
    console.log("✅ Success: Factory function encapsulates circular dependencies\n");
}

console.log("=== All workarounds completed successfully ===");