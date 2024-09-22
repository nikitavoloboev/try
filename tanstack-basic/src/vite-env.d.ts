/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_MASTER_ADDRESS: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}
