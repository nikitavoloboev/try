import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.css"
import { createJazzReactContext, DemoAuth } from "jazz-react"

const Jazz = createJazzReactContext({
	auth: DemoAuth({ appName: "Circular" }),
	peer: "wss://mesh.jazz.tools/?key=nikita@nikiv.dev", // <- put your email here to get a proper API key later
})
export const { useAccount, useCoState } = Jazz
ReactDOM.createRoot(document.getElementById("root")!).render(
	<Jazz.Provider>
		<React.StrictMode>
			{" "}
			<App />
		</React.StrictMode>{" "}
	</Jazz.Provider>,
)
