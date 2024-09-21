import { twMerge } from "tailwind-merge"
import { type ClassValue, clsx } from "clsx"

export const onClickWithoutBubblingToTheParentOnClicks = (
	event: React.MouseEvent<HTMLDivElement>
) => {
	event.stopPropagation()
}

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}
