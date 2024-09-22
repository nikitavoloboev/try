import { useForm } from "@tanstack/react-form"
import { Trash2 } from "lucide-react"
import { useState } from "react"

export function AirdropsFormRoute() {
	const [inputPairs, setInputPairs] = useState([{ id: 0 }])
	const [airdropWalletEntries, setAirdropWalletEntries] = useState<{ userWallet: string; tokenAmount: string }[]>([])

	const form = useForm({
		defaultValues: {
			pairs: [{ userWallet: "", tokenAmount: "" }]
		},
		onSubmit: async ({ value }) => {
			console.log(value, "submitted values")
		}
	})

	const addInputPair = () => {
		form.pushFieldValue("pairs", { userWallet: "", tokenAmount: "" })
		setInputPairs([...inputPairs, { id: inputPairs.length }])
	}

	const removeInputPair = (index: number) => {
		if (inputPairs.length > 1) {
			setInputPairs(inputPairs.filter((_, i) => i !== index))
		}
	}

	return (
		<div className="flex flex-col items-center w-full max-w-2xl mx-auto p-6 rounded-lg shadow-md">
			<div className="flex justify-between items-center w-full mb-6">
				<h2 className="text-2xl font-bold ">New Airdrop for Claim</h2>
			</div>
			<form
				onSubmit={e => {
					e.preventDefault()
					e.stopPropagation()
					form.handleSubmit()
				}}
				className="flex flex-col gap-6 w-full"
			>
				{inputPairs.map((pair, index) => (
					<div key={pair.id} className="flex items-end gap-2 w-full">
						<form.Field name={`pairs[${index}].userWallet`}>
							{field => (
								<label className="flex flex-col flex-grow">
									<span className="mb-1 text-sm font-medium text-gray-700 dark:text-white">User Wallet</span>
									<input
										type="text"
										value={field.state.value}
										onChange={e => field.handleChange(e.target.value)}
										className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
									/>
								</label>
							)}
						</form.Field>
						<form.Field name={`pairs[${index}].tokenAmount`}>
							{field => (
								<label className="flex flex-col w-32">
									<span className="mb-1 text-sm font-medium text-gray-700 dark:text-white">Token Amount</span>
									<input
										type="number"
										value={field.state.value}
										onChange={e => field.handleChange(e.target.value)}
										className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
									/>
								</label>
							)}
						</form.Field>

						{index !== 0 && (
							<button
								type="button"
								onClick={() => removeInputPair(index)}
								className="p-2 text-gray-500 hover:text-red-500"
							>
								<Trash2 size={20} />
							</button>
						)}
					</div>
				))}

				<div className="flex justify-between items-center">
					<button
						type="button"
						onClick={addInputPair}
						className="px-4 py-2 bg-neutral-500 hover:opacity-45 transition-opacity text-white text-sm rounded"
					>
						Add More
					</button>
				</div>

				<button
					type="submit"
					className="w-full px-4 py-2 bg-blue-500 text-white rounded transition-colors hover:bg-blue-600"
				>
					Create Airdrop for Claim
				</button>
			</form>

			<div className="mt-8 flex flex-row gap-5">
				<button
					className="bg-blue-500 text-white rounded transition-colors hover:bg-blue-600 p-2"
					onClick={() => {
						console.log(airdropWalletEntries, "airdropWalletEntries")
					}}
				>
					Send Jettons to Airdrop
				</button>
			</div>
		</div>
	)
}
