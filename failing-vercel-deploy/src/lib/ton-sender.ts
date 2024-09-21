// TODO: all ton related functions should be shared in global lib/ useable by both api and web
// @ts-check
// @ts-nocheck
import { TonClient } from "@ton/ton"
import {
	Address,
	beginCell,
	Cell,
	Sender,
	SendMode,
	StateInit,
	storeStateInit,
} from "@ton/core"
import { TonConnectUI } from "@tonconnect/ui-react"

export const tonDeepLink = (
	address: Address,
	amount: bigint,
	body?: Cell,
	stateInit?: Cell
) =>
	`ton://transfer/${address.toString({
		urlSafe: true,
		bounceable: true,
	})}?amount=${amount.toString()}${
		body ? "&bin=" + body.toBoc().toString("base64url") : ""
	}${stateInit ? "&init=" + stateInit.toBoc().toString("base64url") : ""}`

export class SendProviderSender implements Sender {
	#provider: SendProviderIT
	readonly address?: Address

	constructor(provider: SendProviderIT) {
		this.#provider = provider
		this.address = provider.address()
	}

	//@ts-ignore
	async send(args: SenderArguments): Promise<void> {
		if (args.bounce !== undefined) {
			console.warn(
				"Warning: blueprint's Sender does not support `bounce` flag, because it is ignored by all used Sender APIs"
			)
			console.warn(
				"To silence this warning, change your `bounce` flags passed to Senders to unset or undefined"
			)
		}

		if (
			!(
				args.sendMode === undefined ||
				args.sendMode === SendMode.PAY_GAS_SEPARATELY
			)
		) {
			throw new Error(
				"Deployer sender does not support `sendMode` other than `PAY_GAS_SEPARATELY`"
			)
		}
		//@ts-ignore
		await this.#provider.sendTransaction(
			args.to,
			args.value,
			args.body ?? undefined,
			args.init ?? undefined
		)
	}
}

export class SendProviderIT {
	constructor(private readonly connector: TonConnectUI) {}

	async connect(): Promise<void> {
		throw new Error("Method not implemented.")
	}

	address(): Address | undefined {
		if (!this.connector.wallet) return undefined

		return Address.parse(this.connector.wallet.account.address)
	}

	async sendTransaction(
		address: Address,
		amount: bigint,
		payload?: Cell,
		stateInit?: StateInit
	) {
		try {
			const ans = await this.connector.sendTransaction({
				validUntil: Date.now() + 5 * 60 * 1000,
				messages: [
					{
						address: address.toString(),
						amount: amount.toString(),
						payload: payload?.toBoc().toString("base64"),
						stateInit: stateInit
							? beginCell()
									.storeWritable(storeStateInit(stateInit))
									.endCell()
									.toBoc()
									.toString("base64")
							: undefined,
					},
				],
			})
			console.info("Received answer from the bridge:", ans.boc)
		} catch (e) {
			console.error(
				`Couldn't send the transaction through the bridge: ${e}. Trying to send the deep link...`
			)
			const link = tonDeepLink(
				address,
				amount,
				payload,
				stateInit
					? beginCell().storeWritable(storeStateInit(stateInit)).endCell()
					: undefined
			)
			alert(
				`Couldn't send the transaction through the bridge. Trying to send the deep link... ${link}`
			)
			// await sendDeployLink(this.userId, link);
			await new Promise((resolve) => setTimeout(resolve, 10000))
		}
	}
}

export function getProviderSender(tonConnect: TonConnectUI): Sender {
	// const tonConnect: ITonConnect = (window as any).tonConnect as ITonConnect;
	const sendProvider = new SendProviderIT(tonConnect)
	return new SendProviderSender(sendProvider) as Sender
}

export const tonClient = new TonClient({
	endpoint: import.meta.env.VITE_ENDPOINT!,
	apiKey: import.meta.env.VITE_ENDPOINT_API_KEY!,
})
