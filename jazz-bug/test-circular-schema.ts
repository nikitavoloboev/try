import { co, z } from "jazz-tools";

console.log("=== Testing Circular Schema Issues ===\n");

// Test Case 1: Using getter with forward reference
console.log("Test 1: Forward reference with getter");
try {
    const FileItem1 = co.map({
        type: z.literal("file"),
        name: z.string(),
        content: co.fileStream(),
    });

    const UrlItem1 = co.map({
        type: z.literal("url"),
        content: z.string(),
        refreshing: z.boolean(),
        url: z.url(),
        name: z.string(),
        get children() {
            return ItemList1;
        },
    });

    const Item1 = co.discriminatedUnion("type", [FileItem1, UrlItem1]);
    const ItemList1 = co.list(Item1);
    
    console.log("❌ FAIL: Expected ReferenceError but none thrown");
} catch (error) {
    console.log("✅ PASS: Got expected error:", error.message);
}

// Test Case 2: Inline circular definition
console.log("\nTest 2: Inline circular definition");
try {
    const FileItem2 = co.map({
        type: z.literal("file"),
        name: z.string(),
        content: co.fileStream(),
    });

    const UrlItem2: any = co.map({
        type: z.literal("url"),
        content: z.string(),
        refreshing: z.boolean(),
        url: z.url(),
        name: z.string(),
        get children() {
            return co.list(co.discriminatedUnion("type", [FileItem2, UrlItem2]));
        },
    });
    
    console.log("❌ FAIL: Expected RangeError but none thrown");
} catch (error) {
    console.log("✅ PASS: Got expected error:", error.message);
}

// Test Case 3: Working approach with z.discriminatedUnion (if it worked before)
console.log("\nTest 3: Previous working approach with z.discriminatedUnion");
try {
    const FileItem3 = co.map({
        type: z.literal("file"),
        name: z.string(),
        content: co.fileStream(),
    });

    const UrlItem3 = co.map({
        type: z.literal("url"),
        content: z.string(),
        refreshing: z.boolean(),
        url: z.url(),
        name: z.string(),
        get children() {
            return ItemList3;
        },
    });

    // Using z.discriminatedUnion instead of co.discriminatedUnion
    const Item3 = z.discriminatedUnion("type", [FileItem3, UrlItem3]);
    const ItemList3 = co.list(Item3);
    
    console.log("✅ PASS: z.discriminatedUnion allows circular references");
} catch (error) {
    console.log("❌ FAIL: z.discriminatedUnion also fails:", error.message);
}

// Test Case 4: Potential workaround using lazy evaluation
console.log("\nTest 4: Workaround with lazy evaluation");
try {
    const FileItem4 = co.map({
        type: z.literal("file"),
        name: z.string(),
        content: co.fileStream(),
    });

    let ItemList4: any;
    
    const UrlItem4 = co.map({
        type: z.literal("url"),
        content: z.string(),
        refreshing: z.boolean(),
        url: z.url(),
        name: z.string(),
        get children() {
            // Lazy initialization
            if (!ItemList4) {
                const Item4 = co.discriminatedUnion("type", [FileItem4, UrlItem4]);
                ItemList4 = co.list(Item4);
            }
            return ItemList4;
        },
    });

    const Item4 = co.discriminatedUnion("type", [FileItem4, UrlItem4]);
    ItemList4 = co.list(Item4);
    
    console.log("✅ PASS: Lazy evaluation workaround successful");
} catch (error) {
    console.log("❌ FAIL: Lazy evaluation failed:", error.message);
}

console.log("\n=== Test Complete ===");