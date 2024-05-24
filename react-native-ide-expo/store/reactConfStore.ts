import AsyncStorage from "@react-native-async-storage/async-storage"
import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

import initialAllSessions from "@/data/allSessions.json"
import { ApiAllSessions, Session } from "@/types"
import { formatSessions } from "@/utils/sessions"

const doFetch = async (url: string) => {
	try {
		const result = await fetch(url)
		return await result.json()
	} catch {
		return null
	}
}

type ConfState = {
	schedule: {
		dayOne: Session[]
		dayTwo: Session[]
	}
	allSessions: ApiAllSessions
	isRefreshing?: boolean
	lastRefreshed: string | null
	refreshData: (options?: { ttlMs?: number }) => Promise<void>
	shouldUseLocalTz: boolean
	toggleLocalTz: () => void
}

const getInitialSchedule = () => {
	const [dayOne, dayTwo] = formatSessions(initialAllSessions)
	return {
		schedule: {
			dayOne,
			dayTwo,
		},
		allSessions: initialAllSessions as ApiAllSessions,
	}
}

export const useReactConfStore = create(
	persist<ConfState>(
		(set, get) => ({
			...getInitialSchedule(),
			isRefreshing: false,
			lastRefreshed: null,
			shouldUseLocalTz: false,
			refreshData: async (options) => {},
			toggleLocalTz: () => {
				set((state) => ({ shouldUseLocalTz: !state.shouldUseLocalTz }))
			},
		}),
		{
			name: "react-conf-2024-store",
			storage: createJSONStorage(() => AsyncStorage),
			partialize: (state) => {
				const { isRefreshing: _, ...dataToPersist } = state
				return dataToPersist
			},
		},
	),
)
