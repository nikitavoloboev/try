import { z } from "zod"

export function assertString(value: any, message?: string): asserts value is string {
	const schema = z.string().min(1, message || "Value must be a non-empty string")
	schema.parse(value)
}
