// @ts-check
// @ts-nocheck

import {
	Cell,
	Slice,
	Address,
	Builder,
	beginCell,
	ComputeError,
	TupleItem,
	TupleReader,
	Dictionary,
	contractAddress,
	ContractProvider,
	Sender,
	Contract,
	ContractABI,
	ABIType,
	ABIGetter,
	ABIReceiver,
	TupleBuilder,
	DictionaryValue,
} from "@ton/core"

export type StateInit = {
	$$type: "StateInit"
	code: Cell
	data: Cell
}

export function storeStateInit(src: StateInit) {
	return (builder: Builder) => {
		let b_0 = builder
		b_0.storeRef(src.code)
		b_0.storeRef(src.data)
	}
}

export function loadStateInit(slice: Slice) {
	let sc_0 = slice
	let _code = sc_0.loadRef()
	let _data = sc_0.loadRef()
	return { $$type: "StateInit" as const, code: _code, data: _data }
}

function loadTupleStateInit(source: TupleReader) {
	let _code = source.readCell()
	let _data = source.readCell()
	return { $$type: "StateInit" as const, code: _code, data: _data }
}

function storeTupleStateInit(source: StateInit) {
	let builder = new TupleBuilder()
	builder.writeCell(source.code)
	builder.writeCell(source.data)
	return builder.build()
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
	return {
		serialize: (src, builder) => {
			builder.storeRef(beginCell().store(storeStateInit(src)).endCell())
		},
		parse: (src) => {
			return loadStateInit(src.loadRef().beginParse())
		},
	}
}

export type Context = {
	$$type: "Context"
	bounced: boolean
	sender: Address
	value: bigint
	raw: Cell
}

export function storeContext(src: Context) {
	return (builder: Builder) => {
		let b_0 = builder
		b_0.storeBit(src.bounced)
		b_0.storeAddress(src.sender)
		b_0.storeInt(src.value, 257)
		b_0.storeRef(src.raw)
	}
}

export function loadContext(slice: Slice) {
	let sc_0 = slice
	let _bounced = sc_0.loadBit()
	let _sender = sc_0.loadAddress()
	let _value = sc_0.loadIntBig(257)
	let _raw = sc_0.loadRef()
	return {
		$$type: "Context" as const,
		bounced: _bounced,
		sender: _sender,
		value: _value,
		raw: _raw,
	}
}

function loadTupleContext(source: TupleReader) {
	let _bounced = source.readBoolean()
	let _sender = source.readAddress()
	let _value = source.readBigNumber()
	let _raw = source.readCell()
	return {
		$$type: "Context" as const,
		bounced: _bounced,
		sender: _sender,
		value: _value,
		raw: _raw,
	}
}

function storeTupleContext(source: Context) {
	let builder = new TupleBuilder()
	builder.writeBoolean(source.bounced)
	builder.writeAddress(source.sender)
	builder.writeNumber(source.value)
	builder.writeSlice(source.raw)
	return builder.build()
}

function dictValueParserContext(): DictionaryValue<Context> {
	return {
		serialize: (src, builder) => {
			builder.storeRef(beginCell().store(storeContext(src)).endCell())
		},
		parse: (src) => {
			return loadContext(src.loadRef().beginParse())
		},
	}
}

export type SendParameters = {
	$$type: "SendParameters"
	bounce: boolean
	to: Address
	value: bigint
	mode: bigint
	body: Cell | null
	code: Cell | null
	data: Cell | null
}

export function storeSendParameters(src: SendParameters) {
	return (builder: Builder) => {
		let b_0 = builder
		b_0.storeBit(src.bounce)
		b_0.storeAddress(src.to)
		b_0.storeInt(src.value, 257)
		b_0.storeInt(src.mode, 257)
		if (src.body !== null && src.body !== undefined) {
			b_0.storeBit(true).storeRef(src.body)
		} else {
			b_0.storeBit(false)
		}
		if (src.code !== null && src.code !== undefined) {
			b_0.storeBit(true).storeRef(src.code)
		} else {
			b_0.storeBit(false)
		}
		if (src.data !== null && src.data !== undefined) {
			b_0.storeBit(true).storeRef(src.data)
		} else {
			b_0.storeBit(false)
		}
	}
}

export function loadSendParameters(slice: Slice) {
	let sc_0 = slice
	let _bounce = sc_0.loadBit()
	let _to = sc_0.loadAddress()
	let _value = sc_0.loadIntBig(257)
	let _mode = sc_0.loadIntBig(257)
	let _body = sc_0.loadBit() ? sc_0.loadRef() : null
	let _code = sc_0.loadBit() ? sc_0.loadRef() : null
	let _data = sc_0.loadBit() ? sc_0.loadRef() : null
	return {
		$$type: "SendParameters" as const,
		bounce: _bounce,
		to: _to,
		value: _value,
		mode: _mode,
		body: _body,
		code: _code,
		data: _data,
	}
}

function loadTupleSendParameters(source: TupleReader) {
	let _bounce = source.readBoolean()
	let _to = source.readAddress()
	let _value = source.readBigNumber()
	let _mode = source.readBigNumber()
	let _body = source.readCellOpt()
	let _code = source.readCellOpt()
	let _data = source.readCellOpt()
	return {
		$$type: "SendParameters" as const,
		bounce: _bounce,
		to: _to,
		value: _value,
		mode: _mode,
		body: _body,
		code: _code,
		data: _data,
	}
}

function storeTupleSendParameters(source: SendParameters) {
	let builder = new TupleBuilder()
	builder.writeBoolean(source.bounce)
	builder.writeAddress(source.to)
	builder.writeNumber(source.value)
	builder.writeNumber(source.mode)
	builder.writeCell(source.body)
	builder.writeCell(source.code)
	builder.writeCell(source.data)
	return builder.build()
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
	return {
		serialize: (src, builder) => {
			builder.storeRef(beginCell().store(storeSendParameters(src)).endCell())
		},
		parse: (src) => {
			return loadSendParameters(src.loadRef().beginParse())
		},
	}
}

export type ChangeOwner = {
	$$type: "ChangeOwner"
	queryId: bigint
	newOwner: Address
}

export function storeChangeOwner(src: ChangeOwner) {
	return (builder: Builder) => {
		let b_0 = builder
		b_0.storeUint(2174598809, 32)
		b_0.storeUint(src.queryId, 64)
		b_0.storeAddress(src.newOwner)
	}
}

export function loadChangeOwner(slice: Slice) {
	let sc_0 = slice
	if (sc_0.loadUint(32) !== 2174598809) {
		throw Error("Invalid prefix")
	}
	let _queryId = sc_0.loadUintBig(64)
	let _newOwner = sc_0.loadAddress()
	return {
		$$type: "ChangeOwner" as const,
		queryId: _queryId,
		newOwner: _newOwner,
	}
}

function loadTupleChangeOwner(source: TupleReader) {
	let _queryId = source.readBigNumber()
	let _newOwner = source.readAddress()
	return {
		$$type: "ChangeOwner" as const,
		queryId: _queryId,
		newOwner: _newOwner,
	}
}

function storeTupleChangeOwner(source: ChangeOwner) {
	let builder = new TupleBuilder()
	builder.writeNumber(source.queryId)
	builder.writeAddress(source.newOwner)
	return builder.build()
}

function dictValueParserChangeOwner(): DictionaryValue<ChangeOwner> {
	return {
		serialize: (src, builder) => {
			builder.storeRef(beginCell().store(storeChangeOwner(src)).endCell())
		},
		parse: (src) => {
			return loadChangeOwner(src.loadRef().beginParse())
		},
	}
}

export type ChangeOwnerOk = {
	$$type: "ChangeOwnerOk"
	queryId: bigint
	newOwner: Address
}

export function storeChangeOwnerOk(src: ChangeOwnerOk) {
	return (builder: Builder) => {
		let b_0 = builder
		b_0.storeUint(846932810, 32)
		b_0.storeUint(src.queryId, 64)
		b_0.storeAddress(src.newOwner)
	}
}

export function loadChangeOwnerOk(slice: Slice) {
	let sc_0 = slice
	if (sc_0.loadUint(32) !== 846932810) {
		throw Error("Invalid prefix")
	}
	let _queryId = sc_0.loadUintBig(64)
	let _newOwner = sc_0.loadAddress()
	return {
		$$type: "ChangeOwnerOk" as const,
		queryId: _queryId,
		newOwner: _newOwner,
	}
}

function loadTupleChangeOwnerOk(source: TupleReader) {
	let _queryId = source.readBigNumber()
	let _newOwner = source.readAddress()
	return {
		$$type: "ChangeOwnerOk" as const,
		queryId: _queryId,
		newOwner: _newOwner,
	}
}

function storeTupleChangeOwnerOk(source: ChangeOwnerOk) {
	let builder = new TupleBuilder()
	builder.writeNumber(source.queryId)
	builder.writeAddress(source.newOwner)
	return builder.build()
}

function dictValueParserChangeOwnerOk(): DictionaryValue<ChangeOwnerOk> {
	return {
		serialize: (src, builder) => {
			builder.storeRef(beginCell().store(storeChangeOwnerOk(src)).endCell())
		},
		parse: (src) => {
			return loadChangeOwnerOk(src.loadRef().beginParse())
		},
	}
}

export type Loan = {
	$$type: "Loan"
	wantAmount: bigint
	days: bigint
	dayInterest: bigint
	jetton: Address | null
}

export function storeLoan(src: Loan) {
	return (builder: Builder) => {
		let b_0 = builder
		b_0.storeUint(src.wantAmount, 64)
		b_0.storeUint(src.days, 8)
		b_0.storeUint(src.dayInterest, 64)
		b_0.storeAddress(src.jetton)
	}
}

export function loadLoan(slice: Slice) {
	let sc_0 = slice
	let _wantAmount = sc_0.loadUintBig(64)
	let _days = sc_0.loadUintBig(8)
	let _dayInterest = sc_0.loadUintBig(64)
	let _jetton = sc_0.loadMaybeAddress()
	return {
		$$type: "Loan" as const,
		wantAmount: _wantAmount,
		days: _days,
		dayInterest: _dayInterest,
		jetton: _jetton,
	}
}

function loadTupleLoan(source: TupleReader) {
	let _wantAmount = source.readBigNumber()
	let _days = source.readBigNumber()
	let _dayInterest = source.readBigNumber()
	let _jetton = source.readAddressOpt()
	return {
		$$type: "Loan" as const,
		wantAmount: _wantAmount,
		days: _days,
		dayInterest: _dayInterest,
		jetton: _jetton,
	}
}

function storeTupleLoan(source: Loan) {
	let builder = new TupleBuilder()
	builder.writeNumber(source.wantAmount)
	builder.writeNumber(source.days)
	builder.writeNumber(source.dayInterest)
	builder.writeAddress(source.jetton)
	return builder.build()
}

function dictValueParserLoan(): DictionaryValue<Loan> {
	return {
		serialize: (src, builder) => {
			builder.storeRef(beginCell().store(storeLoan(src)).endCell())
		},
		parse: (src) => {
			return loadLoan(src.loadRef().beginParse())
		},
	}
}

export type InitLoan = {
	$$type: "InitLoan"
	loan: Loan
	nftAddress: Address
	owner: Address
}

export function storeInitLoan(src: InitLoan) {
	return (builder: Builder) => {
		let b_0 = builder
		b_0.storeUint(19415667, 32)
		b_0.store(storeLoan(src.loan))
		b_0.storeAddress(src.nftAddress)
		b_0.storeAddress(src.owner)
	}
}

export function loadInitLoan(slice: Slice) {
	let sc_0 = slice
	if (sc_0.loadUint(32) !== 19415667) {
		throw Error("Invalid prefix")
	}
	let _loan = loadLoan(sc_0)
	let _nftAddress = sc_0.loadAddress()
	let _owner = sc_0.loadAddress()
	return {
		$$type: "InitLoan" as const,
		loan: _loan,
		nftAddress: _nftAddress,
		owner: _owner,
	}
}

function loadTupleInitLoan(source: TupleReader) {
	const _loan = loadTupleLoan(source.readTuple())
	let _nftAddress = source.readAddress()
	let _owner = source.readAddress()
	return {
		$$type: "InitLoan" as const,
		loan: _loan,
		nftAddress: _nftAddress,
		owner: _owner,
	}
}

function storeTupleInitLoan(source: InitLoan) {
	let builder = new TupleBuilder()
	builder.writeTuple(storeTupleLoan(source.loan))
	builder.writeAddress(source.nftAddress)
	builder.writeAddress(source.owner)
	return builder.build()
}

function dictValueParserInitLoan(): DictionaryValue<InitLoan> {
	return {
		serialize: (src, builder) => {
			builder.storeRef(beginCell().store(storeInitLoan(src)).endCell())
		},
		parse: (src) => {
			return loadInitLoan(src.loadRef().beginParse())
		},
	}
}

export type StartMsg = {
	$$type: "StartMsg"
}

export function storeStartMsg(src: StartMsg) {
	return (builder: Builder) => {
		let b_0 = builder
		b_0.storeUint(135406920, 32)
	}
}

export function loadStartMsg(slice: Slice) {
	let sc_0 = slice
	if (sc_0.loadUint(32) !== 135406920) {
		throw Error("Invalid prefix")
	}
	return { $$type: "StartMsg" as const }
}

function loadTupleStartMsg(source: TupleReader) {
	return { $$type: "StartMsg" as const }
}

function storeTupleStartMsg(source: StartMsg) {
	let builder = new TupleBuilder()
	return builder.build()
}

function dictValueParserStartMsg(): DictionaryValue<StartMsg> {
	return {
		serialize: (src, builder) => {
			builder.storeRef(beginCell().store(storeStartMsg(src)).endCell())
		},
		parse: (src) => {
			return loadStartMsg(src.loadRef().beginParse())
		},
	}
}

export type Offer = {
	$$type: "Offer"
	offerLoan: Loan
}

export function storeOffer(src: Offer) {
	return (builder: Builder) => {
		let b_0 = builder
		b_0.storeUint(2645385394, 32)
		b_0.store(storeLoan(src.offerLoan))
	}
}

export function loadOffer(slice: Slice) {
	let sc_0 = slice
	if (sc_0.loadUint(32) !== 2645385394) {
		throw Error("Invalid prefix")
	}
	let _offerLoan = loadLoan(sc_0)
	return { $$type: "Offer" as const, offerLoan: _offerLoan }
}

function loadTupleOffer(source: TupleReader) {
	const _offerLoan = loadTupleLoan(source.readTuple())
	return { $$type: "Offer" as const, offerLoan: _offerLoan }
}

function storeTupleOffer(source: Offer) {
	let builder = new TupleBuilder()
	builder.writeTuple(storeTupleLoan(source.offerLoan))
	return builder.build()
}

function dictValueParserOffer(): DictionaryValue<Offer> {
	return {
		serialize: (src, builder) => {
			builder.storeRef(beginCell().store(storeOffer(src)).endCell())
		},
		parse: (src) => {
			return loadOffer(src.loadRef().beginParse())
		},
	}
}

export type OfferLoan = {
	$$type: "OfferLoan"
	offer: Loan
	owner: Address
}

export function storeOfferLoan(src: OfferLoan) {
	return (builder: Builder) => {
		let b_0 = builder
		b_0.store(storeLoan(src.offer))
		b_0.storeAddress(src.owner)
	}
}

export function loadOfferLoan(slice: Slice) {
	let sc_0 = slice
	let _offer = loadLoan(sc_0)
	let _owner = sc_0.loadAddress()
	return { $$type: "OfferLoan" as const, offer: _offer, owner: _owner }
}

function loadTupleOfferLoan(source: TupleReader) {
	const _offer = loadTupleLoan(source.readTuple())
	let _owner = source.readAddress()
	return { $$type: "OfferLoan" as const, offer: _offer, owner: _owner }
}

function storeTupleOfferLoan(source: OfferLoan) {
	let builder = new TupleBuilder()
	builder.writeTuple(storeTupleLoan(source.offer))
	builder.writeAddress(source.owner)
	return builder.build()
}

function dictValueParserOfferLoan(): DictionaryValue<OfferLoan> {
	return {
		serialize: (src, builder) => {
			builder.storeRef(beginCell().store(storeOfferLoan(src)).endCell())
		},
		parse: (src) => {
			return loadOfferLoan(src.loadRef().beginParse())
		},
	}
}

export type WithdrawNFTNotRepayed = {
	$$type: "WithdrawNFTNotRepayed"
}

export function storeWithdrawNFTNotRepayed(src: WithdrawNFTNotRepayed) {
	return (builder: Builder) => {
		let b_0 = builder
		b_0.storeUint(311579522, 32)
	}
}

export function loadWithdrawNFTNotRepayed(slice: Slice) {
	let sc_0 = slice
	if (sc_0.loadUint(32) !== 311579522) {
		throw Error("Invalid prefix")
	}
	return { $$type: "WithdrawNFTNotRepayed" as const }
}

function loadTupleWithdrawNFTNotRepayed(source: TupleReader) {
	return { $$type: "WithdrawNFTNotRepayed" as const }
}

function storeTupleWithdrawNFTNotRepayed(source: WithdrawNFTNotRepayed) {
	let builder = new TupleBuilder()
	return builder.build()
}

function dictValueParserWithdrawNFTNotRepayed(): DictionaryValue<WithdrawNFTNotRepayed> {
	return {
		serialize: (src, builder) => {
			builder.storeRef(
				beginCell().store(storeWithdrawNFTNotRepayed(src)).endCell()
			)
		},
		parse: (src) => {
			return loadWithdrawNFTNotRepayed(src.loadRef().beginParse())
		},
	}
}

export type CancelLoan = {
	$$type: "CancelLoan"
}

export function storeCancelLoan(src: CancelLoan) {
	return (builder: Builder) => {
		let b_0 = builder
		b_0.storeUint(311514246, 32)
	}
}

export function loadCancelLoan(slice: Slice) {
	let sc_0 = slice
	if (sc_0.loadUint(32) !== 311514246) {
		throw Error("Invalid prefix")
	}
	return { $$type: "CancelLoan" as const }
}

function loadTupleCancelLoan(source: TupleReader) {
	return { $$type: "CancelLoan" as const }
}

function storeTupleCancelLoan(source: CancelLoan) {
	let builder = new TupleBuilder()
	return builder.build()
}

function dictValueParserCancelLoan(): DictionaryValue<CancelLoan> {
	return {
		serialize: (src, builder) => {
			builder.storeRef(beginCell().store(storeCancelLoan(src)).endCell())
		},
		parse: (src) => {
			return loadCancelLoan(src.loadRef().beginParse())
		},
	}
}

export type RedeemMessage = {
	$$type: "RedeemMessage"
}

export function storeRedeemMessage(src: RedeemMessage) {
	return (builder: Builder) => {
		let b_0 = builder
		b_0.storeUint(558310259, 32)
	}
}

export function loadRedeemMessage(slice: Slice) {
	let sc_0 = slice
	if (sc_0.loadUint(32) !== 558310259) {
		throw Error("Invalid prefix")
	}
	return { $$type: "RedeemMessage" as const }
}

function loadTupleRedeemMessage(source: TupleReader) {
	return { $$type: "RedeemMessage" as const }
}

function storeTupleRedeemMessage(source: RedeemMessage) {
	let builder = new TupleBuilder()
	return builder.build()
}

function dictValueParserRedeemMessage(): DictionaryValue<RedeemMessage> {
	return {
		serialize: (src, builder) => {
			builder.storeRef(beginCell().store(storeRedeemMessage(src)).endCell())
		},
		parse: (src) => {
			return loadRedeemMessage(src.loadRef().beginParse())
		},
	}
}

export type CancelOffer = {
	$$type: "CancelOffer"
	offerIndex: bigint
}

export function storeCancelOffer(src: CancelOffer) {
	return (builder: Builder) => {
		let b_0 = builder
		b_0.storeUint(1012362342, 32)
		b_0.storeInt(src.offerIndex, 257)
	}
}

export function loadCancelOffer(slice: Slice) {
	let sc_0 = slice
	if (sc_0.loadUint(32) !== 1012362342) {
		throw Error("Invalid prefix")
	}
	let _offerIndex = sc_0.loadIntBig(257)
	return { $$type: "CancelOffer" as const, offerIndex: _offerIndex }
}

function loadTupleCancelOffer(source: TupleReader) {
	let _offerIndex = source.readBigNumber()
	return { $$type: "CancelOffer" as const, offerIndex: _offerIndex }
}

function storeTupleCancelOffer(source: CancelOffer) {
	let builder = new TupleBuilder()
	builder.writeNumber(source.offerIndex)
	return builder.build()
}

function dictValueParserCancelOffer(): DictionaryValue<CancelOffer> {
	return {
		serialize: (src, builder) => {
			builder.storeRef(beginCell().store(storeCancelOffer(src)).endCell())
		},
		parse: (src) => {
			return loadCancelOffer(src.loadRef().beginParse())
		},
	}
}

export type StartOfferIndex = {
	$$type: "StartOfferIndex"
	offerIndex: bigint
}

export function storeStartOfferIndex(src: StartOfferIndex) {
	return (builder: Builder) => {
		let b_0 = builder
		b_0.storeUint(1825726764, 32)
		b_0.storeInt(src.offerIndex, 257)
	}
}

export function loadStartOfferIndex(slice: Slice) {
	let sc_0 = slice
	if (sc_0.loadUint(32) !== 1825726764) {
		throw Error("Invalid prefix")
	}
	let _offerIndex = sc_0.loadIntBig(257)
	return { $$type: "StartOfferIndex" as const, offerIndex: _offerIndex }
}

function loadTupleStartOfferIndex(source: TupleReader) {
	let _offerIndex = source.readBigNumber()
	return { $$type: "StartOfferIndex" as const, offerIndex: _offerIndex }
}

function storeTupleStartOfferIndex(source: StartOfferIndex) {
	let builder = new TupleBuilder()
	builder.writeNumber(source.offerIndex)
	return builder.build()
}

function dictValueParserStartOfferIndex(): DictionaryValue<StartOfferIndex> {
	return {
		serialize: (src, builder) => {
			builder.storeRef(beginCell().store(storeStartOfferIndex(src)).endCell())
		},
		parse: (src) => {
			return loadStartOfferIndex(src.loadRef().beginParse())
		},
	}
}

export type ForwardNftPayload = {
	$$type: "ForwardNftPayload"
	loan: Loan
}

export function storeForwardNftPayload(src: ForwardNftPayload) {
	return (builder: Builder) => {
		let b_0 = builder
		b_0.store(storeLoan(src.loan))
	}
}

export function loadForwardNftPayload(slice: Slice) {
	let sc_0 = slice
	let _loan = loadLoan(sc_0)
	return { $$type: "ForwardNftPayload" as const, loan: _loan }
}

function loadTupleForwardNftPayload(source: TupleReader) {
	const _loan = loadTupleLoan(source.readTuple())
	return { $$type: "ForwardNftPayload" as const, loan: _loan }
}

function storeTupleForwardNftPayload(source: ForwardNftPayload) {
	let builder = new TupleBuilder()
	builder.writeTuple(storeTupleLoan(source.loan))
	return builder.build()
}

function dictValueParserForwardNftPayload(): DictionaryValue<ForwardNftPayload> {
	return {
		serialize: (src, builder) => {
			builder.storeRef(beginCell().store(storeForwardNftPayload(src)).endCell())
		},
		parse: (src) => {
			return loadForwardNftPayload(src.loadRef().beginParse())
		},
	}
}

export type SetAcceptableJettons = {
	$$type: "SetAcceptableJettons"
	jettons: Dictionary<Address, Address>
}

export function storeSetAcceptableJettons(src: SetAcceptableJettons) {
	return (builder: Builder) => {
		let b_0 = builder
		b_0.storeUint(674633801, 32)
		b_0.storeDict(
			src.jettons,
			Dictionary.Keys.Address(),
			Dictionary.Values.Address()
		)
	}
}

export function loadSetAcceptableJettons(slice: Slice) {
	let sc_0 = slice
	if (sc_0.loadUint(32) !== 674633801) {
		throw Error("Invalid prefix")
	}
	let _jettons = Dictionary.load(
		Dictionary.Keys.Address(),
		Dictionary.Values.Address(),
		sc_0
	)
	return { $$type: "SetAcceptableJettons" as const, jettons: _jettons }
}

function loadTupleSetAcceptableJettons(source: TupleReader) {
	let _jettons = Dictionary.loadDirect(
		Dictionary.Keys.Address(),
		Dictionary.Values.Address(),
		source.readCellOpt()
	)
	return { $$type: "SetAcceptableJettons" as const, jettons: _jettons }
}

function storeTupleSetAcceptableJettons(source: SetAcceptableJettons) {
	let builder = new TupleBuilder()
	builder.writeCell(
		source.jettons.size > 0
			? beginCell()
					.storeDictDirect(
						source.jettons,
						Dictionary.Keys.Address(),
						Dictionary.Values.Address()
					)
					.endCell()
			: null
	)
	return builder.build()
}

function dictValueParserSetAcceptableJettons(): DictionaryValue<SetAcceptableJettons> {
	return {
		serialize: (src, builder) => {
			builder.storeRef(
				beginCell().store(storeSetAcceptableJettons(src)).endCell()
			)
		},
		parse: (src) => {
			return loadSetAcceptableJettons(src.loadRef().beginParse())
		},
	}
}

export type OwnershipAssignedMaster = {
	$$type: "OwnershipAssignedMaster"
	queryId: bigint
	prevOwner: Address
	bite: boolean
	payload: Cell
}

export function storeOwnershipAssignedMaster(src: OwnershipAssignedMaster) {
	return (builder: Builder) => {
		let b_0 = builder
		b_0.storeUint(85167505, 32)
		b_0.storeUint(src.queryId, 64)
		b_0.storeAddress(src.prevOwner)
		b_0.storeBit(src.bite)
		b_0.storeBuilder(src.payload.asBuilder())
	}
}

export function loadOwnershipAssignedMaster(slice: Slice) {
	let sc_0 = slice
	if (sc_0.loadUint(32) !== 85167505) {
		throw Error("Invalid prefix")
	}
	let _queryId = sc_0.loadUintBig(64)
	let _prevOwner = sc_0.loadAddress()
	let _bite = sc_0.loadBit()
	let _payload = sc_0.asCell()
	return {
		$$type: "OwnershipAssignedMaster" as const,
		queryId: _queryId,
		prevOwner: _prevOwner,
		bite: _bite,
		payload: _payload,
	}
}

function loadTupleOwnershipAssignedMaster(source: TupleReader) {
	let _queryId = source.readBigNumber()
	let _prevOwner = source.readAddress()
	let _bite = source.readBoolean()
	let _payload = source.readCell()
	return {
		$$type: "OwnershipAssignedMaster" as const,
		queryId: _queryId,
		prevOwner: _prevOwner,
		bite: _bite,
		payload: _payload,
	}
}

function storeTupleOwnershipAssignedMaster(source: OwnershipAssignedMaster) {
	let builder = new TupleBuilder()
	builder.writeNumber(source.queryId)
	builder.writeAddress(source.prevOwner)
	builder.writeBoolean(source.bite)
	builder.writeSlice(source.payload)
	return builder.build()
}

function dictValueParserOwnershipAssignedMaster(): DictionaryValue<OwnershipAssignedMaster> {
	return {
		serialize: (src, builder) => {
			builder.storeRef(
				beginCell().store(storeOwnershipAssignedMaster(src)).endCell()
			)
		},
		parse: (src) => {
			return loadOwnershipAssignedMaster(src.loadRef().beginParse())
		},
	}
}

export type TransferNftToLoan = {
	$$type: "TransferNftToLoan"
	nft: Address
	excessTo: Address
	myId: bigint
}

export function storeTransferNftToLoan(src: TransferNftToLoan) {
	return (builder: Builder) => {
		let b_0 = builder
		b_0.storeUint(422004262, 32)
		b_0.storeAddress(src.nft)
		b_0.storeAddress(src.excessTo)
		b_0.storeUint(src.myId, 64)
	}
}

export function loadTransferNftToLoan(slice: Slice) {
	let sc_0 = slice
	if (sc_0.loadUint(32) !== 422004262) {
		throw Error("Invalid prefix")
	}
	let _nft = sc_0.loadAddress()
	let _excessTo = sc_0.loadAddress()
	let _myId = sc_0.loadUintBig(64)
	return {
		$$type: "TransferNftToLoan" as const,
		nft: _nft,
		excessTo: _excessTo,
		myId: _myId,
	}
}

function loadTupleTransferNftToLoan(source: TupleReader) {
	let _nft = source.readAddress()
	let _excessTo = source.readAddress()
	let _myId = source.readBigNumber()
	return {
		$$type: "TransferNftToLoan" as const,
		nft: _nft,
		excessTo: _excessTo,
		myId: _myId,
	}
}

function storeTupleTransferNftToLoan(source: TransferNftToLoan) {
	let builder = new TupleBuilder()
	builder.writeAddress(source.nft)
	builder.writeAddress(source.excessTo)
	builder.writeNumber(source.myId)
	return builder.build()
}

function dictValueParserTransferNftToLoan(): DictionaryValue<TransferNftToLoan> {
	return {
		serialize: (src, builder) => {
			builder.storeRef(beginCell().store(storeTransferNftToLoan(src)).endCell())
		},
		parse: (src) => {
			return loadTransferNftToLoan(src.loadRef().beginParse())
		},
	}
}

export type OwnershipAssigned = {
	$$type: "OwnershipAssigned"
	queryId: bigint
	prevOwner: Address
	forwardPayload: Cell
}

export function storeOwnershipAssigned(src: OwnershipAssigned) {
	return (builder: Builder) => {
		let b_0 = builder
		b_0.storeUint(85167505, 32)
		b_0.storeUint(src.queryId, 64)
		b_0.storeAddress(src.prevOwner)
		b_0.storeBuilder(src.forwardPayload.asBuilder())
	}
}

export function loadOwnershipAssigned(slice: Slice) {
	let sc_0 = slice
	if (sc_0.loadUint(32) !== 85167505) {
		throw Error("Invalid prefix")
	}
	let _queryId = sc_0.loadUintBig(64)
	let _prevOwner = sc_0.loadAddress()
	let _forwardPayload = sc_0.asCell()
	return {
		$$type: "OwnershipAssigned" as const,
		queryId: _queryId,
		prevOwner: _prevOwner,
		forwardPayload: _forwardPayload,
	}
}

function loadTupleOwnershipAssigned(source: TupleReader) {
	let _queryId = source.readBigNumber()
	let _prevOwner = source.readAddress()
	let _forwardPayload = source.readCell()
	return {
		$$type: "OwnershipAssigned" as const,
		queryId: _queryId,
		prevOwner: _prevOwner,
		forwardPayload: _forwardPayload,
	}
}

function storeTupleOwnershipAssigned(source: OwnershipAssigned) {
	let builder = new TupleBuilder()
	builder.writeNumber(source.queryId)
	builder.writeAddress(source.prevOwner)
	builder.writeSlice(source.forwardPayload)
	return builder.build()
}

function dictValueParserOwnershipAssigned(): DictionaryValue<OwnershipAssigned> {
	return {
		serialize: (src, builder) => {
			builder.storeRef(beginCell().store(storeOwnershipAssigned(src)).endCell())
		},
		parse: (src) => {
			return loadOwnershipAssigned(src.loadRef().beginParse())
		},
	}
}

export type WithdrawlToken = {
	$$type: "WithdrawlToken"
	amount: bigint
	myJetton: Address | null
}

export function storeWithdrawlToken(src: WithdrawlToken) {
	return (builder: Builder) => {
		let b_0 = builder
		b_0.storeUint(424178228, 32)
		b_0.storeCoins(src.amount)
		b_0.storeAddress(src.myJetton)
	}
}

export function loadWithdrawlToken(slice: Slice) {
	let sc_0 = slice
	if (sc_0.loadUint(32) !== 424178228) {
		throw Error("Invalid prefix")
	}
	let _amount = sc_0.loadCoins()
	let _myJetton = sc_0.loadMaybeAddress()
	return {
		$$type: "WithdrawlToken" as const,
		amount: _amount,
		myJetton: _myJetton,
	}
}

function loadTupleWithdrawlToken(source: TupleReader) {
	let _amount = source.readBigNumber()
	let _myJetton = source.readAddressOpt()
	return {
		$$type: "WithdrawlToken" as const,
		amount: _amount,
		myJetton: _myJetton,
	}
}

function storeTupleWithdrawlToken(source: WithdrawlToken) {
	let builder = new TupleBuilder()
	builder.writeNumber(source.amount)
	builder.writeAddress(source.myJetton)
	return builder.build()
}

function dictValueParserWithdrawlToken(): DictionaryValue<WithdrawlToken> {
	return {
		serialize: (src, builder) => {
			builder.storeRef(beginCell().store(storeWithdrawlToken(src)).endCell())
		},
		parse: (src) => {
			return loadWithdrawlToken(src.loadRef().beginParse())
		},
	}
}

export type TransferNFT = {
	$$type: "TransferNFT"
	queryId: bigint
	newOwner: Address
	responseDestination: Address
	customPayload: boolean
	forwardAmount: bigint
	hasPayload: boolean
	forwardPayload: Cell
}

export function storeTransferNFT(src: TransferNFT) {
	return (builder: Builder) => {
		let b_0 = builder
		b_0.storeUint(1607220500, 32)
		b_0.storeUint(src.queryId, 64)
		b_0.storeAddress(src.newOwner)
		b_0.storeAddress(src.responseDestination)
		b_0.storeBit(src.customPayload)
		b_0.storeCoins(src.forwardAmount)
		b_0.storeBit(src.hasPayload)
		b_0.storeBuilder(src.forwardPayload.asBuilder())
	}
}

export function loadTransferNFT(slice: Slice) {
	let sc_0 = slice
	if (sc_0.loadUint(32) !== 1607220500) {
		throw Error("Invalid prefix")
	}
	let _queryId = sc_0.loadUintBig(64)
	let _newOwner = sc_0.loadAddress()
	let _responseDestination = sc_0.loadAddress()
	let _customPayload = sc_0.loadBit()
	let _forwardAmount = sc_0.loadCoins()
	let _hasPayload = sc_0.loadBit()
	let _forwardPayload = sc_0.asCell()
	return {
		$$type: "TransferNFT" as const,
		queryId: _queryId,
		newOwner: _newOwner,
		responseDestination: _responseDestination,
		customPayload: _customPayload,
		forwardAmount: _forwardAmount,
		hasPayload: _hasPayload,
		forwardPayload: _forwardPayload,
	}
}

function loadTupleTransferNFT(source: TupleReader) {
	let _queryId = source.readBigNumber()
	let _newOwner = source.readAddress()
	let _responseDestination = source.readAddress()
	let _customPayload = source.readBoolean()
	let _forwardAmount = source.readBigNumber()
	let _hasPayload = source.readBoolean()
	let _forwardPayload = source.readCell()
	return {
		$$type: "TransferNFT" as const,
		queryId: _queryId,
		newOwner: _newOwner,
		responseDestination: _responseDestination,
		customPayload: _customPayload,
		forwardAmount: _forwardAmount,
		hasPayload: _hasPayload,
		forwardPayload: _forwardPayload,
	}
}

function storeTupleTransferNFT(source: TransferNFT) {
	let builder = new TupleBuilder()
	builder.writeNumber(source.queryId)
	builder.writeAddress(source.newOwner)
	builder.writeAddress(source.responseDestination)
	builder.writeBoolean(source.customPayload)
	builder.writeNumber(source.forwardAmount)
	builder.writeBoolean(source.hasPayload)
	builder.writeSlice(source.forwardPayload)
	return builder.build()
}

function dictValueParserTransferNFT(): DictionaryValue<TransferNFT> {
	return {
		serialize: (src, builder) => {
			builder.storeRef(beginCell().store(storeTransferNFT(src)).endCell())
		},
		parse: (src) => {
			return loadTransferNFT(src.loadRef().beginParse())
		},
	}
}

export type ExcessMsg = {
	$$type: "ExcessMsg"
}

export function storeExcessMsg(src: ExcessMsg) {
	return (builder: Builder) => {
		let b_0 = builder
		b_0.storeUint(3576854235, 32)
	}
}

export function loadExcessMsg(slice: Slice) {
	let sc_0 = slice
	if (sc_0.loadUint(32) !== 3576854235) {
		throw Error("Invalid prefix")
	}
	return { $$type: "ExcessMsg" as const }
}

function loadTupleExcessMsg(source: TupleReader) {
	return { $$type: "ExcessMsg" as const }
}

function storeTupleExcessMsg(source: ExcessMsg) {
	let builder = new TupleBuilder()
	return builder.build()
}

function dictValueParserExcessMsg(): DictionaryValue<ExcessMsg> {
	return {
		serialize: (src, builder) => {
			builder.storeRef(beginCell().store(storeExcessMsg(src)).endCell())
		},
		parse: (src) => {
			return loadExcessMsg(src.loadRef().beginParse())
		},
	}
}

export type TokenTransfer = {
	$$type: "TokenTransfer"
	queryId: bigint
	amount: bigint
	destination: Address
	response_destination: Address
	custom_payload: Cell | null
	forward_ton_amount: bigint
	forward_payload: Cell
}

export function storeTokenTransfer(src: TokenTransfer) {
	return (builder: Builder) => {
		let b_0 = builder
		b_0.storeUint(260734629, 32)
		b_0.storeUint(src.queryId, 64)
		b_0.storeCoins(src.amount)
		b_0.storeAddress(src.destination)
		b_0.storeAddress(src.response_destination)
		if (src.custom_payload !== null && src.custom_payload !== undefined) {
			b_0.storeBit(true).storeRef(src.custom_payload)
		} else {
			b_0.storeBit(false)
		}
		b_0.storeCoins(src.forward_ton_amount)
		b_0.storeBuilder(src.forward_payload.asBuilder())
	}
}

export function loadTokenTransfer(slice: Slice) {
	let sc_0 = slice
	if (sc_0.loadUint(32) !== 260734629) {
		throw Error("Invalid prefix")
	}
	let _queryId = sc_0.loadUintBig(64)
	let _amount = sc_0.loadCoins()
	let _destination = sc_0.loadAddress()
	let _response_destination = sc_0.loadAddress()
	let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null
	let _forward_ton_amount = sc_0.loadCoins()
	let _forward_payload = sc_0.asCell()
	return {
		$$type: "TokenTransfer" as const,
		queryId: _queryId,
		amount: _amount,
		destination: _destination,
		response_destination: _response_destination,
		custom_payload: _custom_payload,
		forward_ton_amount: _forward_ton_amount,
		forward_payload: _forward_payload,
	}
}

function loadTupleTokenTransfer(source: TupleReader) {
	let _queryId = source.readBigNumber()
	let _amount = source.readBigNumber()
	let _destination = source.readAddress()
	let _response_destination = source.readAddress()
	let _custom_payload = source.readCellOpt()
	let _forward_ton_amount = source.readBigNumber()
	let _forward_payload = source.readCell()
	return {
		$$type: "TokenTransfer" as const,
		queryId: _queryId,
		amount: _amount,
		destination: _destination,
		response_destination: _response_destination,
		custom_payload: _custom_payload,
		forward_ton_amount: _forward_ton_amount,
		forward_payload: _forward_payload,
	}
}

function storeTupleTokenTransfer(source: TokenTransfer) {
	let builder = new TupleBuilder()
	builder.writeNumber(source.queryId)
	builder.writeNumber(source.amount)
	builder.writeAddress(source.destination)
	builder.writeAddress(source.response_destination)
	builder.writeCell(source.custom_payload)
	builder.writeNumber(source.forward_ton_amount)
	builder.writeSlice(source.forward_payload)
	return builder.build()
}

function dictValueParserTokenTransfer(): DictionaryValue<TokenTransfer> {
	return {
		serialize: (src, builder) => {
			builder.storeRef(beginCell().store(storeTokenTransfer(src)).endCell())
		},
		parse: (src) => {
			return loadTokenTransfer(src.loadRef().beginParse())
		},
	}
}

export type LoanData = {
	$$type: "LoanData"
	nft: Address | null
	owner: Address
	stopped: boolean
	parent: Address
	started: boolean
	loanIssuer: Address | null
	activeLoan: Loan
	masterIndex: bigint
	startTime: bigint
	accuredInterest: bigint
	merchantInterest: bigint
	acceptJettons: Dictionary<Address, Address>
}

export function storeLoanData(src: LoanData) {
	return (builder: Builder) => {
		let b_0 = builder
		b_0.storeAddress(src.nft)
		b_0.storeAddress(src.owner)
		b_0.storeBit(src.stopped)
		b_0.storeAddress(src.parent)
		b_0.storeBit(src.started)
		let b_1 = new Builder()
		b_1.storeAddress(src.loanIssuer)
		b_1.store(storeLoan(src.activeLoan))
		b_1.storeUint(src.masterIndex, 64)
		b_1.storeUint(src.startTime, 64)
		b_1.storeUint(src.accuredInterest, 64)
		b_1.storeUint(src.merchantInterest, 64)
		b_1.storeDict(
			src.acceptJettons,
			Dictionary.Keys.Address(),
			Dictionary.Values.Address()
		)
		b_0.storeRef(b_1.endCell())
	}
}

export function loadLoanData(slice: Slice) {
	let sc_0 = slice
	let _nft = sc_0.loadMaybeAddress()
	let _owner = sc_0.loadAddress()
	let _stopped = sc_0.loadBit()
	let _parent = sc_0.loadAddress()
	let _started = sc_0.loadBit()
	let sc_1 = sc_0.loadRef().beginParse()
	let _loanIssuer = sc_1.loadMaybeAddress()
	let _activeLoan = loadLoan(sc_1)
	let _masterIndex = sc_1.loadUintBig(64)
	let _startTime = sc_1.loadUintBig(64)
	let _accuredInterest = sc_1.loadUintBig(64)
	let _merchantInterest = sc_1.loadUintBig(64)
	let _acceptJettons = Dictionary.load(
		Dictionary.Keys.Address(),
		Dictionary.Values.Address(),
		sc_1
	)
	return {
		$$type: "LoanData" as const,
		nft: _nft,
		owner: _owner,
		stopped: _stopped,
		parent: _parent,
		started: _started,
		loanIssuer: _loanIssuer,
		activeLoan: _activeLoan,
		masterIndex: _masterIndex,
		startTime: _startTime,
		accuredInterest: _accuredInterest,
		merchantInterest: _merchantInterest,
		acceptJettons: _acceptJettons,
	}
}

function loadTupleLoanData(source: TupleReader) {
	let _nft = source.readAddressOpt()
	let _owner = source.readAddress()
	let _stopped = source.readBoolean()
	let _parent = source.readAddress()
	let _started = source.readBoolean()
	let _loanIssuer = source.readAddressOpt()
	const _activeLoan = loadTupleLoan(source.readTuple())
	let _masterIndex = source.readBigNumber()
	let _startTime = source.readBigNumber()
	let _accuredInterest = source.readBigNumber()
	let _merchantInterest = source.readBigNumber()
	let _acceptJettons = Dictionary.loadDirect(
		Dictionary.Keys.Address(),
		Dictionary.Values.Address(),
		source.readCellOpt()
	)
	return {
		$$type: "LoanData" as const,
		nft: _nft,
		owner: _owner,
		stopped: _stopped,
		parent: _parent,
		started: _started,
		loanIssuer: _loanIssuer,
		activeLoan: _activeLoan,
		masterIndex: _masterIndex,
		startTime: _startTime,
		accuredInterest: _accuredInterest,
		merchantInterest: _merchantInterest,
		acceptJettons: _acceptJettons,
	}
}

function storeTupleLoanData(source: LoanData) {
	let builder = new TupleBuilder()
	builder.writeAddress(source.nft)
	builder.writeAddress(source.owner)
	builder.writeBoolean(source.stopped)
	builder.writeAddress(source.parent)
	builder.writeBoolean(source.started)
	builder.writeAddress(source.loanIssuer)
	builder.writeTuple(storeTupleLoan(source.activeLoan))
	builder.writeNumber(source.masterIndex)
	builder.writeNumber(source.startTime)
	builder.writeNumber(source.accuredInterest)
	builder.writeNumber(source.merchantInterest)
	builder.writeCell(
		source.acceptJettons.size > 0
			? beginCell()
					.storeDictDirect(
						source.acceptJettons,
						Dictionary.Keys.Address(),
						Dictionary.Values.Address()
					)
					.endCell()
			: null
	)
	return builder.build()
}

function dictValueParserLoanData(): DictionaryValue<LoanData> {
	return {
		serialize: (src, builder) => {
			builder.storeRef(beginCell().store(storeLoanData(src)).endCell())
		},
		parse: (src) => {
			return loadLoanData(src.loadRef().beginParse())
		},
	}
}

export type TokenRecievedMessage = {
	$$type: "TokenRecievedMessage"
	queryId: bigint
	amount: bigint
	from: Address
	type: bigint
	data: Cell
}

export function storeTokenRecievedMessage(src: TokenRecievedMessage) {
	return (builder: Builder) => {
		let b_0 = builder
		b_0.storeUint(1935855772, 32)
		b_0.storeUint(src.queryId, 64)
		b_0.storeCoins(src.amount)
		b_0.storeAddress(src.from)
		b_0.storeUint(src.type, 8)
		b_0.storeBuilder(src.data.asBuilder())
	}
}

export function loadTokenRecievedMessage(slice: Slice) {
	let sc_0 = slice
	if (sc_0.loadUint(32) !== 1935855772) {
		throw Error("Invalid prefix")
	}
	let _queryId = sc_0.loadUintBig(64)
	let _amount = sc_0.loadCoins()
	let _from = sc_0.loadAddress()
	let _type = sc_0.loadUintBig(8)
	let _data = sc_0.asCell()
	return {
		$$type: "TokenRecievedMessage" as const,
		queryId: _queryId,
		amount: _amount,
		from: _from,
		type: _type,
		data: _data,
	}
}

function loadTupleTokenRecievedMessage(source: TupleReader) {
	let _queryId = source.readBigNumber()
	let _amount = source.readBigNumber()
	let _from = source.readAddress()
	let _type = source.readBigNumber()
	let _data = source.readCell()
	return {
		$$type: "TokenRecievedMessage" as const,
		queryId: _queryId,
		amount: _amount,
		from: _from,
		type: _type,
		data: _data,
	}
}

function storeTupleTokenRecievedMessage(source: TokenRecievedMessage) {
	let builder = new TupleBuilder()
	builder.writeNumber(source.queryId)
	builder.writeNumber(source.amount)
	builder.writeAddress(source.from)
	builder.writeNumber(source.type)
	builder.writeSlice(source.data)
	return builder.build()
}

function dictValueParserTokenRecievedMessage(): DictionaryValue<TokenRecievedMessage> {
	return {
		serialize: (src, builder) => {
			builder.storeRef(
				beginCell().store(storeTokenRecievedMessage(src)).endCell()
			)
		},
		parse: (src) => {
			return loadTokenRecievedMessage(src.loadRef().beginParse())
		},
	}
}

export type Mint = {
	$$type: "Mint"
	amount: bigint
	receiver: Address
}

export function storeMint(src: Mint) {
	return (builder: Builder) => {
		let b_0 = builder
		b_0.storeUint(4235234258, 32)
		b_0.storeInt(src.amount, 257)
		b_0.storeAddress(src.receiver)
	}
}

export function loadMint(slice: Slice) {
	let sc_0 = slice
	if (sc_0.loadUint(32) !== 4235234258) {
		throw Error("Invalid prefix")
	}
	let _amount = sc_0.loadIntBig(257)
	let _receiver = sc_0.loadAddress()
	return { $$type: "Mint" as const, amount: _amount, receiver: _receiver }
}

function loadTupleMint(source: TupleReader) {
	let _amount = source.readBigNumber()
	let _receiver = source.readAddress()
	return { $$type: "Mint" as const, amount: _amount, receiver: _receiver }
}

function storeTupleMint(source: Mint) {
	let builder = new TupleBuilder()
	builder.writeNumber(source.amount)
	builder.writeAddress(source.receiver)
	return builder.build()
}

function dictValueParserMint(): DictionaryValue<Mint> {
	return {
		serialize: (src, builder) => {
			builder.storeRef(beginCell().store(storeMint(src)).endCell())
		},
		parse: (src) => {
			return loadMint(src.loadRef().beginParse())
		},
	}
}

export type JettonData = {
	$$type: "JettonData"
	totalSupply: bigint
	mintable: boolean
	owner: Address
	content: Cell
	walletCode: Cell
}

export function storeJettonData(src: JettonData) {
	return (builder: Builder) => {
		let b_0 = builder
		b_0.storeInt(src.totalSupply, 257)
		b_0.storeBit(src.mintable)
		b_0.storeAddress(src.owner)
		b_0.storeRef(src.content)
		b_0.storeRef(src.walletCode)
	}
}

export function loadJettonData(slice: Slice) {
	let sc_0 = slice
	let _totalSupply = sc_0.loadIntBig(257)
	let _mintable = sc_0.loadBit()
	let _owner = sc_0.loadAddress()
	let _content = sc_0.loadRef()
	let _walletCode = sc_0.loadRef()
	return {
		$$type: "JettonData" as const,
		totalSupply: _totalSupply,
		mintable: _mintable,
		owner: _owner,
		content: _content,
		walletCode: _walletCode,
	}
}

function loadTupleJettonData(source: TupleReader) {
	let _totalSupply = source.readBigNumber()
	let _mintable = source.readBoolean()
	let _owner = source.readAddress()
	let _content = source.readCell()
	let _walletCode = source.readCell()
	return {
		$$type: "JettonData" as const,
		totalSupply: _totalSupply,
		mintable: _mintable,
		owner: _owner,
		content: _content,
		walletCode: _walletCode,
	}
}

function storeTupleJettonData(source: JettonData) {
	let builder = new TupleBuilder()
	builder.writeNumber(source.totalSupply)
	builder.writeBoolean(source.mintable)
	builder.writeAddress(source.owner)
	builder.writeCell(source.content)
	builder.writeCell(source.walletCode)
	return builder.build()
}

function dictValueParserJettonData(): DictionaryValue<JettonData> {
	return {
		serialize: (src, builder) => {
			builder.storeRef(beginCell().store(storeJettonData(src)).endCell())
		},
		parse: (src) => {
			return loadJettonData(src.loadRef().beginParse())
		},
	}
}

export type JettonWalletData = {
	$$type: "JettonWalletData"
	balance: bigint
	owner: Address
	master: Address
	walletCode: Cell
}

export function storeJettonWalletData(src: JettonWalletData) {
	return (builder: Builder) => {
		let b_0 = builder
		b_0.storeInt(src.balance, 257)
		b_0.storeAddress(src.owner)
		b_0.storeAddress(src.master)
		b_0.storeRef(src.walletCode)
	}
}

export function loadJettonWalletData(slice: Slice) {
	let sc_0 = slice
	let _balance = sc_0.loadIntBig(257)
	let _owner = sc_0.loadAddress()
	let _master = sc_0.loadAddress()
	let _walletCode = sc_0.loadRef()
	return {
		$$type: "JettonWalletData" as const,
		balance: _balance,
		owner: _owner,
		master: _master,
		walletCode: _walletCode,
	}
}

function loadTupleJettonWalletData(source: TupleReader) {
	let _balance = source.readBigNumber()
	let _owner = source.readAddress()
	let _master = source.readAddress()
	let _walletCode = source.readCell()
	return {
		$$type: "JettonWalletData" as const,
		balance: _balance,
		owner: _owner,
		master: _master,
		walletCode: _walletCode,
	}
}

function storeTupleJettonWalletData(source: JettonWalletData) {
	let builder = new TupleBuilder()
	builder.writeNumber(source.balance)
	builder.writeAddress(source.owner)
	builder.writeAddress(source.master)
	builder.writeCell(source.walletCode)
	return builder.build()
}

function dictValueParserJettonWalletData(): DictionaryValue<JettonWalletData> {
	return {
		serialize: (src, builder) => {
			builder.storeRef(beginCell().store(storeJettonWalletData(src)).endCell())
		},
		parse: (src) => {
			return loadJettonWalletData(src.loadRef().beginParse())
		},
	}
}

export type TokenTransferInternal = {
	$$type: "TokenTransferInternal"
	queryId: bigint
	amount: bigint
	from: Address
	response_destination: Address | null
	forward_ton_amount: bigint
	forward_payload: Cell
}

export function storeTokenTransferInternal(src: TokenTransferInternal) {
	return (builder: Builder) => {
		let b_0 = builder
		b_0.storeUint(395134233, 32)
		b_0.storeUint(src.queryId, 64)
		b_0.storeCoins(src.amount)
		b_0.storeAddress(src.from)
		b_0.storeAddress(src.response_destination)
		b_0.storeCoins(src.forward_ton_amount)
		b_0.storeBuilder(src.forward_payload.asBuilder())
	}
}

export function loadTokenTransferInternal(slice: Slice) {
	let sc_0 = slice
	if (sc_0.loadUint(32) !== 395134233) {
		throw Error("Invalid prefix")
	}
	let _queryId = sc_0.loadUintBig(64)
	let _amount = sc_0.loadCoins()
	let _from = sc_0.loadAddress()
	let _response_destination = sc_0.loadMaybeAddress()
	let _forward_ton_amount = sc_0.loadCoins()
	let _forward_payload = sc_0.asCell()
	return {
		$$type: "TokenTransferInternal" as const,
		queryId: _queryId,
		amount: _amount,
		from: _from,
		response_destination: _response_destination,
		forward_ton_amount: _forward_ton_amount,
		forward_payload: _forward_payload,
	}
}

function loadTupleTokenTransferInternal(source: TupleReader) {
	let _queryId = source.readBigNumber()
	let _amount = source.readBigNumber()
	let _from = source.readAddress()
	let _response_destination = source.readAddressOpt()
	let _forward_ton_amount = source.readBigNumber()
	let _forward_payload = source.readCell()
	return {
		$$type: "TokenTransferInternal" as const,
		queryId: _queryId,
		amount: _amount,
		from: _from,
		response_destination: _response_destination,
		forward_ton_amount: _forward_ton_amount,
		forward_payload: _forward_payload,
	}
}

function storeTupleTokenTransferInternal(source: TokenTransferInternal) {
	let builder = new TupleBuilder()
	builder.writeNumber(source.queryId)
	builder.writeNumber(source.amount)
	builder.writeAddress(source.from)
	builder.writeAddress(source.response_destination)
	builder.writeNumber(source.forward_ton_amount)
	builder.writeSlice(source.forward_payload)
	return builder.build()
}

function dictValueParserTokenTransferInternal(): DictionaryValue<TokenTransferInternal> {
	return {
		serialize: (src, builder) => {
			builder.storeRef(
				beginCell().store(storeTokenTransferInternal(src)).endCell()
			)
		},
		parse: (src) => {
			return loadTokenTransferInternal(src.loadRef().beginParse())
		},
	}
}

export type TokenNotification = {
	$$type: "TokenNotification"
	queryId: bigint
	amount: bigint
	from: Address
	forward_payload: Cell
}

export function storeTokenNotification(src: TokenNotification) {
	return (builder: Builder) => {
		let b_0 = builder
		b_0.storeUint(1935855772, 32)
		b_0.storeUint(src.queryId, 64)
		b_0.storeCoins(src.amount)
		b_0.storeAddress(src.from)
		b_0.storeBuilder(src.forward_payload.asBuilder())
	}
}

export function loadTokenNotification(slice: Slice) {
	let sc_0 = slice
	if (sc_0.loadUint(32) !== 1935855772) {
		throw Error("Invalid prefix")
	}
	let _queryId = sc_0.loadUintBig(64)
	let _amount = sc_0.loadCoins()
	let _from = sc_0.loadAddress()
	let _forward_payload = sc_0.asCell()
	return {
		$$type: "TokenNotification" as const,
		queryId: _queryId,
		amount: _amount,
		from: _from,
		forward_payload: _forward_payload,
	}
}

function loadTupleTokenNotification(source: TupleReader) {
	let _queryId = source.readBigNumber()
	let _amount = source.readBigNumber()
	let _from = source.readAddress()
	let _forward_payload = source.readCell()
	return {
		$$type: "TokenNotification" as const,
		queryId: _queryId,
		amount: _amount,
		from: _from,
		forward_payload: _forward_payload,
	}
}

function storeTupleTokenNotification(source: TokenNotification) {
	let builder = new TupleBuilder()
	builder.writeNumber(source.queryId)
	builder.writeNumber(source.amount)
	builder.writeAddress(source.from)
	builder.writeSlice(source.forward_payload)
	return builder.build()
}

function dictValueParserTokenNotification(): DictionaryValue<TokenNotification> {
	return {
		serialize: (src, builder) => {
			builder.storeRef(beginCell().store(storeTokenNotification(src)).endCell())
		},
		parse: (src) => {
			return loadTokenNotification(src.loadRef().beginParse())
		},
	}
}

export type TokenBurn = {
	$$type: "TokenBurn"
	queryId: bigint
	amount: bigint
	owner: Address
	response_destination: Address
}

export function storeTokenBurn(src: TokenBurn) {
	return (builder: Builder) => {
		let b_0 = builder
		b_0.storeUint(1499400124, 32)
		b_0.storeUint(src.queryId, 64)
		b_0.storeCoins(src.amount)
		b_0.storeAddress(src.owner)
		b_0.storeAddress(src.response_destination)
	}
}

export function loadTokenBurn(slice: Slice) {
	let sc_0 = slice
	if (sc_0.loadUint(32) !== 1499400124) {
		throw Error("Invalid prefix")
	}
	let _queryId = sc_0.loadUintBig(64)
	let _amount = sc_0.loadCoins()
	let _owner = sc_0.loadAddress()
	let _response_destination = sc_0.loadAddress()
	return {
		$$type: "TokenBurn" as const,
		queryId: _queryId,
		amount: _amount,
		owner: _owner,
		response_destination: _response_destination,
	}
}

function loadTupleTokenBurn(source: TupleReader) {
	let _queryId = source.readBigNumber()
	let _amount = source.readBigNumber()
	let _owner = source.readAddress()
	let _response_destination = source.readAddress()
	return {
		$$type: "TokenBurn" as const,
		queryId: _queryId,
		amount: _amount,
		owner: _owner,
		response_destination: _response_destination,
	}
}

function storeTupleTokenBurn(source: TokenBurn) {
	let builder = new TupleBuilder()
	builder.writeNumber(source.queryId)
	builder.writeNumber(source.amount)
	builder.writeAddress(source.owner)
	builder.writeAddress(source.response_destination)
	return builder.build()
}

function dictValueParserTokenBurn(): DictionaryValue<TokenBurn> {
	return {
		serialize: (src, builder) => {
			builder.storeRef(beginCell().store(storeTokenBurn(src)).endCell())
		},
		parse: (src) => {
			return loadTokenBurn(src.loadRef().beginParse())
		},
	}
}

export type TokenBurnNotification = {
	$$type: "TokenBurnNotification"
	queryId: bigint
	amount: bigint
	owner: Address
	response_destination: Address | null
}

export function storeTokenBurnNotification(src: TokenBurnNotification) {
	return (builder: Builder) => {
		let b_0 = builder
		b_0.storeUint(2078119902, 32)
		b_0.storeUint(src.queryId, 64)
		b_0.storeCoins(src.amount)
		b_0.storeAddress(src.owner)
		b_0.storeAddress(src.response_destination)
	}
}

export function loadTokenBurnNotification(slice: Slice) {
	let sc_0 = slice
	if (sc_0.loadUint(32) !== 2078119902) {
		throw Error("Invalid prefix")
	}
	let _queryId = sc_0.loadUintBig(64)
	let _amount = sc_0.loadCoins()
	let _owner = sc_0.loadAddress()
	let _response_destination = sc_0.loadMaybeAddress()
	return {
		$$type: "TokenBurnNotification" as const,
		queryId: _queryId,
		amount: _amount,
		owner: _owner,
		response_destination: _response_destination,
	}
}

function loadTupleTokenBurnNotification(source: TupleReader) {
	let _queryId = source.readBigNumber()
	let _amount = source.readBigNumber()
	let _owner = source.readAddress()
	let _response_destination = source.readAddressOpt()
	return {
		$$type: "TokenBurnNotification" as const,
		queryId: _queryId,
		amount: _amount,
		owner: _owner,
		response_destination: _response_destination,
	}
}

function storeTupleTokenBurnNotification(source: TokenBurnNotification) {
	let builder = new TupleBuilder()
	builder.writeNumber(source.queryId)
	builder.writeNumber(source.amount)
	builder.writeAddress(source.owner)
	builder.writeAddress(source.response_destination)
	return builder.build()
}

function dictValueParserTokenBurnNotification(): DictionaryValue<TokenBurnNotification> {
	return {
		serialize: (src, builder) => {
			builder.storeRef(
				beginCell().store(storeTokenBurnNotification(src)).endCell()
			)
		},
		parse: (src) => {
			return loadTokenBurnNotification(src.loadRef().beginParse())
		},
	}
}

export type TokenExcesses = {
	$$type: "TokenExcesses"
	queryId: bigint
}

export function storeTokenExcesses(src: TokenExcesses) {
	return (builder: Builder) => {
		let b_0 = builder
		b_0.storeUint(3576854235, 32)
		b_0.storeUint(src.queryId, 64)
	}
}

export function loadTokenExcesses(slice: Slice) {
	let sc_0 = slice
	if (sc_0.loadUint(32) !== 3576854235) {
		throw Error("Invalid prefix")
	}
	let _queryId = sc_0.loadUintBig(64)
	return { $$type: "TokenExcesses" as const, queryId: _queryId }
}

function loadTupleTokenExcesses(source: TupleReader) {
	let _queryId = source.readBigNumber()
	return { $$type: "TokenExcesses" as const, queryId: _queryId }
}

function storeTupleTokenExcesses(source: TokenExcesses) {
	let builder = new TupleBuilder()
	builder.writeNumber(source.queryId)
	return builder.build()
}

function dictValueParserTokenExcesses(): DictionaryValue<TokenExcesses> {
	return {
		serialize: (src, builder) => {
			builder.storeRef(beginCell().store(storeTokenExcesses(src)).endCell())
		},
		parse: (src) => {
			return loadTokenExcesses(src.loadRef().beginParse())
		},
	}
}

export type TokenUpdateContent = {
	$$type: "TokenUpdateContent"
	content: Cell
}

export function storeTokenUpdateContent(src: TokenUpdateContent) {
	return (builder: Builder) => {
		let b_0 = builder
		b_0.storeUint(2937889386, 32)
		b_0.storeRef(src.content)
	}
}

export function loadTokenUpdateContent(slice: Slice) {
	let sc_0 = slice
	if (sc_0.loadUint(32) !== 2937889386) {
		throw Error("Invalid prefix")
	}
	let _content = sc_0.loadRef()
	return { $$type: "TokenUpdateContent" as const, content: _content }
}

function loadTupleTokenUpdateContent(source: TupleReader) {
	let _content = source.readCell()
	return { $$type: "TokenUpdateContent" as const, content: _content }
}

function storeTupleTokenUpdateContent(source: TokenUpdateContent) {
	let builder = new TupleBuilder()
	builder.writeCell(source.content)
	return builder.build()
}

function dictValueParserTokenUpdateContent(): DictionaryValue<TokenUpdateContent> {
	return {
		serialize: (src, builder) => {
			builder.storeRef(
				beginCell().store(storeTokenUpdateContent(src)).endCell()
			)
		},
		parse: (src) => {
			return loadTokenUpdateContent(src.loadRef().beginParse())
		},
	}
}

type JettonDefaultWallet_init_args = {
	$$type: "JettonDefaultWallet_init_args"
	master: Address
	owner: Address
}

function initJettonDefaultWallet_init_args(src: JettonDefaultWallet_init_args) {
	return (builder: Builder) => {
		let b_0 = builder
		b_0.storeAddress(src.master)
		b_0.storeAddress(src.owner)
	}
}

async function JettonDefaultWallet_init(master: Address, owner: Address) {
	const __code = Cell.fromBase64(
		"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"
	)
	const __system = Cell.fromBase64(
		"te6cckECJQEACGEAAQHAAQEFobFfAgEU/wD0pBP0vPLICwMCAWIEFgN60AHQ0wMBcbCjAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhUUFMDbwT4YQL4Yts8VRLbPPLggh8FFQLuAY5bgCDXIXAh10nCH5UwINcLH94gghAXjUUZuo4aMNMfAYIQF41FGbry4IHTP/oAWWwSMROgAn/gghB73Zfeuo4Z0x8BghB73ZfeuvLggdM/+gBZbBIxE6ACf+Awf+BwIddJwh+VMCDXCx/eIIIQD4p+pbrjAiAGCwIQMNs8bBfbPH8HCADG0x8BghAPin6luvLggdM/+gD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0gABkdSSbQHi+gBRZhYVFEMwBIoy+EFvJIERTVPDxwXy9FRzISPbPEQwUkTbPKCCCcnDgAGggRA/AYIImJaAtggSvPL0UYShggD1/CHC//L0+ENUIHXbPFwRERkJAsJwWchwAcsBcwHLAXABywASzMzJ+QDIcgHLAXABywASygfL/8nQINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFB2cIBAcCxIE1DnyFVQ2zzJEFZeIhA5AhA2EDUQNNs8ChMAwIIQF41FGVAHyx8Vyz9QA/oCASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgEgbpUwcAHLAY4eINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8W4gH6AgHPFgPsghAXjUUZuo8IMNs8bBbbPH/gghBZXwe8uo7Y0x8BghBZXwe8uvLggdM/+gD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgUQzBsFNs8f+AwcAwNEADO0x8BghAXjUUZuvLggdM/+gD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIASDXCwHDAI4f+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiJRy1yFt4gH6AFFVFRRDMAT2+EFvJFOixwWzjtP4Q1O42zwBggCm1AJwWchwAcsBcwHLAXABywASzMzJ+QDIcgHLAXABywASygfL/8nQINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFJAxwXy9N5RyKCCAPX8IcL/8vRAuivbPBA0S83bPFGjoVAKGSIRDgP+oSLCAI7Kc3AoSBNQdMhVMIIQc2LQnFAFyx8Tyz8B+gIBINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WAc8WySdGFFBVFEMwbW3bPAGUEDVsQeIhbrOOoAEgbvLQgHADyAGCENUydttYyx/LP8kTchAkQwBtbds8kl8D4hMTDwACAQJ6W/hBbySBEU1Tg8cF8vRRhKGCAPX8IcL/8vRDMFI52zyCAKmeAYIJMS0AoIIImJaAoBK88vRwgEADf1QzZhESAGRsMfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4Igw+gAxcdch+gAx+gAwpwOrAAHSyFUwghB73ZfeUAXLHxPLPwH6AgEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYBIG6VMHABywGOHiDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFuLJJEQUUDMUQzBtbds8EwHKyHEBygFQBwHKAHABygJQBSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlAD+gJwAcpoI26zkX+TJG6z4pczMwFwAcoA4w0hbrOcfwHKAAEgbvLQgAHMlTFwAcoA4skB+wAUAJh/AcoAyHABygBwAcoAJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4iRus51/AcoABCBu8tCAUATMljQDcAHKAOJwAcoAAn8BygACyVjMAKbI+EMBzH8BygBVIFAjgQEBzwABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFsntVAIBIBcaAhG/2BbZ5tnjYaQfGAEY+ENTEts8MFRjMFIwGQDaAtD0BDBtAYIA2K8BgBD0D2+h8uCHAYIA2K8iAoAQ9BfIAcj0AMkBzHABygBAA1kg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYBINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WyQIBIBscAN27vRgnBc7D1dLK57HoTsOdZKhRtmgnCd1jUtK2R8syLTry398WI5gnAgVcAbgGdjlM5YOq5HJbLDgnAb1J3vlUWW8cdT094FWcMmgnCdl05as07LczoOlm2UZuikgnCd0eAD5bNgPJ/IOrJZrKITgCAUgdJAIDeKAeIwITuS2zxVAts8bDGB8iAcDtRNDUAfhj0gABjkiBAQHXAPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiEMwbBPg+CjXCwqDCbry4IkgAYr6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgSAtEB2zwhAARwAgAs+CdvECGhggiYloBmtgihggiYloCgoQAPu+7UTQ0gABgAdbJu40NWlwZnM6Ly9RbVJyOHUyNENFUkg2dHpXU2tqV1l6VDQ3VUxqcEhiRlg2R1NZUUVMNWgxakpFgguX4MKA=="
	)
	let builder = beginCell()
	builder.storeRef(__system)
	builder.storeUint(0, 1)
	initJettonDefaultWallet_init_args({
		$$type: "JettonDefaultWallet_init_args",
		master,
		owner,
	})(builder)
	const __data = builder.endCell()
	return { code: __code, data: __data }
}

const JettonDefaultWallet_errors: { [key: number]: { message: string } } = {
	2: { message: `Stack underflow` },
	3: { message: `Stack overflow` },
	4: { message: `Integer overflow` },
	5: { message: `Integer out of expected range` },
	6: { message: `Invalid opcode` },
	7: { message: `Type check error` },
	8: { message: `Cell overflow` },
	9: { message: `Cell underflow` },
	10: { message: `Dictionary error` },
	13: { message: `Out of gas error` },
	32: { message: `Method ID not found` },
	34: { message: `Action is invalid or not supported` },
	37: { message: `Not enough TON` },
	38: { message: `Not enough extra-currencies` },
	128: { message: `Null reference exception` },
	129: { message: `Invalid serialization prefix` },
	130: { message: `Invalid incoming message` },
	131: { message: `Constraints error` },
	132: { message: `Access denied` },
	133: { message: `Contract stopped` },
	134: { message: `Invalid argument` },
	135: { message: `Code of a contract was not found` },
	136: { message: `Invalid address` },
	137: { message: `Masterchain support is not enabled for this contract` },
	3734: { message: `Not Owner` },
	4159: { message: `Invalid value!!` },
	4429: { message: `Invalid sender` },
	6898: { message: `The total supply will be overlapping.` },
	18668: { message: `Can't Mint Anymore` },
	42708: { message: `Invalid sender!` },
	43422: { message: `Invalid value - Burn` },
	62972: { message: `Invalid balance` },
}

const JettonDefaultWallet_types: ABIType[] = [
	{
		name: "StateInit",
		header: null,
		fields: [
			{ name: "code", type: { kind: "simple", type: "cell", optional: false } },
			{ name: "data", type: { kind: "simple", type: "cell", optional: false } },
		],
	},
	{
		name: "Context",
		header: null,
		fields: [
			{
				name: "bounced",
				type: { kind: "simple", type: "bool", optional: false },
			},
			{
				name: "sender",
				type: { kind: "simple", type: "address", optional: false },
			},
			{
				name: "value",
				type: { kind: "simple", type: "int", optional: false, format: 257 },
			},
			{ name: "raw", type: { kind: "simple", type: "slice", optional: false } },
		],
	},
	{
		name: "SendParameters",
		header: null,
		fields: [
			{
				name: "bounce",
				type: { kind: "simple", type: "bool", optional: false },
			},
			{
				name: "to",
				type: { kind: "simple", type: "address", optional: false },
			},
			{
				name: "value",
				type: { kind: "simple", type: "int", optional: false, format: 257 },
			},
			{
				name: "mode",
				type: { kind: "simple", type: "int", optional: false, format: 257 },
			},
			{ name: "body", type: { kind: "simple", type: "cell", optional: true } },
			{ name: "code", type: { kind: "simple", type: "cell", optional: true } },
			{ name: "data", type: { kind: "simple", type: "cell", optional: true } },
		],
	},
	{
		name: "ChangeOwner",
		header: 2174598809,
		fields: [
			{
				name: "queryId",
				type: { kind: "simple", type: "uint", optional: false, format: 64 },
			},
			{
				name: "newOwner",
				type: { kind: "simple", type: "address", optional: false },
			},
		],
	},
	{
		name: "ChangeOwnerOk",
		header: 846932810,
		fields: [
			{
				name: "queryId",
				type: { kind: "simple", type: "uint", optional: false, format: 64 },
			},
			{
				name: "newOwner",
				type: { kind: "simple", type: "address", optional: false },
			},
		],
	},
	{
		name: "Loan",
		header: null,
		fields: [
			{
				name: "wantAmount",
				type: { kind: "simple", type: "uint", optional: false, format: 64 },
			},
			{
				name: "days",
				type: { kind: "simple", type: "uint", optional: false, format: 8 },
			},
			{
				name: "dayInterest",
				type: { kind: "simple", type: "uint", optional: false, format: 64 },
			},
			{
				name: "jetton",
				type: { kind: "simple", type: "address", optional: true },
			},
		],
	},
	{
		name: "InitLoan",
		header: 19415667,
		fields: [
			{ name: "loan", type: { kind: "simple", type: "Loan", optional: false } },
			{
				name: "nftAddress",
				type: { kind: "simple", type: "address", optional: false },
			},
			{
				name: "owner",
				type: { kind: "simple", type: "address", optional: false },
			},
		],
	},
	{ name: "StartMsg", header: 135406920, fields: [] },
	{
		name: "Offer",
		header: 2645385394,
		fields: [
			{
				name: "offerLoan",
				type: { kind: "simple", type: "Loan", optional: false },
			},
		],
	},
	{
		name: "OfferLoan",
		header: null,
		fields: [
			{
				name: "offer",
				type: { kind: "simple", type: "Loan", optional: false },
			},
			{
				name: "owner",
				type: { kind: "simple", type: "address", optional: false },
			},
		],
	},
	{ name: "WithdrawNFTNotRepayed", header: 311579522, fields: [] },
	{ name: "CancelLoan", header: 311514246, fields: [] },
	{ name: "RedeemMessage", header: 558310259, fields: [] },
	{
		name: "CancelOffer",
		header: 1012362342,
		fields: [
			{
				name: "offerIndex",
				type: { kind: "simple", type: "int", optional: false, format: 257 },
			},
		],
	},
	{
		name: "StartOfferIndex",
		header: 1825726764,
		fields: [
			{
				name: "offerIndex",
				type: { kind: "simple", type: "int", optional: false, format: 257 },
			},
		],
	},
	{
		name: "ForwardNftPayload",
		header: null,
		fields: [
			{ name: "loan", type: { kind: "simple", type: "Loan", optional: false } },
		],
	},
	{
		name: "SetAcceptableJettons",
		header: 674633801,
		fields: [
			{
				name: "jettons",
				type: { kind: "dict", key: "address", value: "address" },
			},
		],
	},
	{
		name: "OwnershipAssignedMaster",
		header: 85167505,
		fields: [
			{
				name: "queryId",
				type: { kind: "simple", type: "uint", optional: false, format: 64 },
			},
			{
				name: "prevOwner",
				type: { kind: "simple", type: "address", optional: false },
			},
			{ name: "bite", type: { kind: "simple", type: "bool", optional: false } },
			{
				name: "payload",
				type: {
					kind: "simple",
					type: "slice",
					optional: false,
					format: "remainder",
				},
			},
		],
	},
	{
		name: "TransferNftToLoan",
		header: 422004262,
		fields: [
			{
				name: "nft",
				type: { kind: "simple", type: "address", optional: false },
			},
			{
				name: "excessTo",
				type: { kind: "simple", type: "address", optional: false },
			},
			{
				name: "myId",
				type: { kind: "simple", type: "uint", optional: false, format: 64 },
			},
		],
	},
	{
		name: "OwnershipAssigned",
		header: 85167505,
		fields: [
			{
				name: "queryId",
				type: { kind: "simple", type: "uint", optional: false, format: 64 },
			},
			{
				name: "prevOwner",
				type: { kind: "simple", type: "address", optional: false },
			},
			{
				name: "forwardPayload",
				type: {
					kind: "simple",
					type: "slice",
					optional: false,
					format: "remainder",
				},
			},
		],
	},
	{
		name: "WithdrawlToken",
		header: 424178228,
		fields: [
			{
				name: "amount",
				type: {
					kind: "simple",
					type: "uint",
					optional: false,
					format: "coins",
				},
			},
			{
				name: "myJetton",
				type: { kind: "simple", type: "address", optional: true },
			},
		],
	},
	{
		name: "TransferNFT",
		header: 1607220500,
		fields: [
			{
				name: "queryId",
				type: { kind: "simple", type: "uint", optional: false, format: 64 },
			},
			{
				name: "newOwner",
				type: { kind: "simple", type: "address", optional: false },
			},
			{
				name: "responseDestination",
				type: { kind: "simple", type: "address", optional: false },
			},
			{
				name: "customPayload",
				type: { kind: "simple", type: "bool", optional: false },
			},
			{
				name: "forwardAmount",
				type: {
					kind: "simple",
					type: "uint",
					optional: false,
					format: "coins",
				},
			},
			{
				name: "hasPayload",
				type: { kind: "simple", type: "bool", optional: false },
			},
			{
				name: "forwardPayload",
				type: {
					kind: "simple",
					type: "slice",
					optional: false,
					format: "remainder",
				},
			},
		],
	},
	{ name: "ExcessMsg", header: 3576854235, fields: [] },
	{
		name: "TokenTransfer",
		header: 260734629,
		fields: [
			{
				name: "queryId",
				type: { kind: "simple", type: "uint", optional: false, format: 64 },
			},
			{
				name: "amount",
				type: {
					kind: "simple",
					type: "uint",
					optional: false,
					format: "coins",
				},
			},
			{
				name: "destination",
				type: { kind: "simple", type: "address", optional: false },
			},
			{
				name: "response_destination",
				type: { kind: "simple", type: "address", optional: false },
			},
			{
				name: "custom_payload",
				type: { kind: "simple", type: "cell", optional: true },
			},
			{
				name: "forward_ton_amount",
				type: {
					kind: "simple",
					type: "uint",
					optional: false,
					format: "coins",
				},
			},
			{
				name: "forward_payload",
				type: {
					kind: "simple",
					type: "slice",
					optional: false,
					format: "remainder",
				},
			},
		],
	},
	{
		name: "LoanData",
		header: null,
		fields: [
			{
				name: "nft",
				type: { kind: "simple", type: "address", optional: true },
			},
			{
				name: "owner",
				type: { kind: "simple", type: "address", optional: false },
			},
			{
				name: "stopped",
				type: { kind: "simple", type: "bool", optional: false },
			},
			{
				name: "parent",
				type: { kind: "simple", type: "address", optional: false },
			},
			{
				name: "started",
				type: { kind: "simple", type: "bool", optional: false },
			},
			{
				name: "loanIssuer",
				type: { kind: "simple", type: "address", optional: true },
			},
			{
				name: "activeLoan",
				type: { kind: "simple", type: "Loan", optional: false },
			},
			{
				name: "masterIndex",
				type: { kind: "simple", type: "uint", optional: false, format: 64 },
			},
			{
				name: "startTime",
				type: { kind: "simple", type: "uint", optional: false, format: 64 },
			},
			{
				name: "accuredInterest",
				type: { kind: "simple", type: "uint", optional: false, format: 64 },
			},
			{
				name: "merchantInterest",
				type: { kind: "simple", type: "uint", optional: false, format: 64 },
			},
			{
				name: "acceptJettons",
				type: { kind: "dict", key: "address", value: "address" },
			},
		],
	},
	{
		name: "TokenRecievedMessage",
		header: 1935855772,
		fields: [
			{
				name: "queryId",
				type: { kind: "simple", type: "uint", optional: false, format: 64 },
			},
			{
				name: "amount",
				type: {
					kind: "simple",
					type: "uint",
					optional: false,
					format: "coins",
				},
			},
			{
				name: "from",
				type: { kind: "simple", type: "address", optional: false },
			},
			{
				name: "type",
				type: { kind: "simple", type: "uint", optional: false, format: 8 },
			},
			{
				name: "data",
				type: {
					kind: "simple",
					type: "slice",
					optional: false,
					format: "remainder",
				},
			},
		],
	},
	{
		name: "Mint",
		header: 4235234258,
		fields: [
			{
				name: "amount",
				type: { kind: "simple", type: "int", optional: false, format: 257 },
			},
			{
				name: "receiver",
				type: { kind: "simple", type: "address", optional: false },
			},
		],
	},
	{
		name: "JettonData",
		header: null,
		fields: [
			{
				name: "totalSupply",
				type: { kind: "simple", type: "int", optional: false, format: 257 },
			},
			{
				name: "mintable",
				type: { kind: "simple", type: "bool", optional: false },
			},
			{
				name: "owner",
				type: { kind: "simple", type: "address", optional: false },
			},
			{
				name: "content",
				type: { kind: "simple", type: "cell", optional: false },
			},
			{
				name: "walletCode",
				type: { kind: "simple", type: "cell", optional: false },
			},
		],
	},
	{
		name: "JettonWalletData",
		header: null,
		fields: [
			{
				name: "balance",
				type: { kind: "simple", type: "int", optional: false, format: 257 },
			},
			{
				name: "owner",
				type: { kind: "simple", type: "address", optional: false },
			},
			{
				name: "master",
				type: { kind: "simple", type: "address", optional: false },
			},
			{
				name: "walletCode",
				type: { kind: "simple", type: "cell", optional: false },
			},
		],
	},
	{
		name: "TokenTransferInternal",
		header: 395134233,
		fields: [
			{
				name: "queryId",
				type: { kind: "simple", type: "uint", optional: false, format: 64 },
			},
			{
				name: "amount",
				type: {
					kind: "simple",
					type: "uint",
					optional: false,
					format: "coins",
				},
			},
			{
				name: "from",
				type: { kind: "simple", type: "address", optional: false },
			},
			{
				name: "response_destination",
				type: { kind: "simple", type: "address", optional: true },
			},
			{
				name: "forward_ton_amount",
				type: {
					kind: "simple",
					type: "uint",
					optional: false,
					format: "coins",
				},
			},
			{
				name: "forward_payload",
				type: {
					kind: "simple",
					type: "slice",
					optional: false,
					format: "remainder",
				},
			},
		],
	},
	{
		name: "TokenNotification",
		header: 1935855772,
		fields: [
			{
				name: "queryId",
				type: { kind: "simple", type: "uint", optional: false, format: 64 },
			},
			{
				name: "amount",
				type: {
					kind: "simple",
					type: "uint",
					optional: false,
					format: "coins",
				},
			},
			{
				name: "from",
				type: { kind: "simple", type: "address", optional: false },
			},
			{
				name: "forward_payload",
				type: {
					kind: "simple",
					type: "slice",
					optional: false,
					format: "remainder",
				},
			},
		],
	},
	{
		name: "TokenBurn",
		header: 1499400124,
		fields: [
			{
				name: "queryId",
				type: { kind: "simple", type: "uint", optional: false, format: 64 },
			},
			{
				name: "amount",
				type: {
					kind: "simple",
					type: "uint",
					optional: false,
					format: "coins",
				},
			},
			{
				name: "owner",
				type: { kind: "simple", type: "address", optional: false },
			},
			{
				name: "response_destination",
				type: { kind: "simple", type: "address", optional: false },
			},
		],
	},
	{
		name: "TokenBurnNotification",
		header: 2078119902,
		fields: [
			{
				name: "queryId",
				type: { kind: "simple", type: "uint", optional: false, format: 64 },
			},
			{
				name: "amount",
				type: {
					kind: "simple",
					type: "uint",
					optional: false,
					format: "coins",
				},
			},
			{
				name: "owner",
				type: { kind: "simple", type: "address", optional: false },
			},
			{
				name: "response_destination",
				type: { kind: "simple", type: "address", optional: true },
			},
		],
	},
	{
		name: "TokenExcesses",
		header: 3576854235,
		fields: [
			{
				name: "queryId",
				type: { kind: "simple", type: "uint", optional: false, format: 64 },
			},
		],
	},
	{
		name: "TokenUpdateContent",
		header: 2937889386,
		fields: [
			{
				name: "content",
				type: { kind: "simple", type: "cell", optional: false },
			},
		],
	},
]

const JettonDefaultWallet_getters: ABIGetter[] = [
	{
		name: "msgValue",
		arguments: [
			{
				name: "value",
				type: { kind: "simple", type: "int", optional: false, format: 257 },
			},
		],
		returnType: { kind: "simple", type: "int", optional: false, format: 257 },
	},
	{
		name: "get_wallet_data",
		arguments: [],
		returnType: { kind: "simple", type: "JettonWalletData", optional: false },
	},
]

const JettonDefaultWallet_receivers: ABIReceiver[] = [
	{ receiver: "internal", message: { kind: "typed", type: "TokenTransfer" } },
	{
		receiver: "internal",
		message: { kind: "typed", type: "TokenTransferInternal" },
	},
	{ receiver: "internal", message: { kind: "typed", type: "TokenBurn" } },
]

export class JettonDefaultWallet implements Contract {
	static async init(master: Address, owner: Address) {
		return await JettonDefaultWallet_init(master, owner)
	}

	static async fromInit(master: Address, owner: Address) {
		const init = await JettonDefaultWallet_init(master, owner)
		const address = contractAddress(0, init)
		return new JettonDefaultWallet(address, init)
	}

	static fromAddress(address: Address) {
		return new JettonDefaultWallet(address)
	}

	readonly address: Address
	readonly init?: { code: Cell; data: Cell }
	readonly abi: ContractABI = {
		types: JettonDefaultWallet_types,
		getters: JettonDefaultWallet_getters,
		receivers: JettonDefaultWallet_receivers,
		errors: JettonDefaultWallet_errors,
	}

	private constructor(address: Address, init?: { code: Cell; data: Cell }) {
		this.address = address
		this.init = init
	}

	async send(
		provider: ContractProvider,
		via: Sender,
		args: { value: bigint; bounce?: boolean | null | undefined },
		message: TokenTransfer | TokenTransferInternal | TokenBurn
	) {
		let body: Cell | null = null
		if (
			message &&
			typeof message === "object" &&
			!(message instanceof Slice) &&
			message.$$type === "TokenTransfer"
		) {
			body = beginCell().store(storeTokenTransfer(message)).endCell()
		}
		if (
			message &&
			typeof message === "object" &&
			!(message instanceof Slice) &&
			message.$$type === "TokenTransferInternal"
		) {
			body = beginCell().store(storeTokenTransferInternal(message)).endCell()
		}
		if (
			message &&
			typeof message === "object" &&
			!(message instanceof Slice) &&
			message.$$type === "TokenBurn"
		) {
			body = beginCell().store(storeTokenBurn(message)).endCell()
		}
		if (body === null) {
			throw new Error("Invalid message type")
		}

		await provider.internal(via, { ...args, body: body })
	}

	async getMsgValue(provider: ContractProvider, value: bigint) {
		let builder = new TupleBuilder()
		builder.writeNumber(value)
		let source = (await provider.get("msgValue", builder.build())).stack
		let result = source.readBigNumber()
		return result
	}

	async getGetWalletData(provider: ContractProvider) {
		let builder = new TupleBuilder()
		let source = (await provider.get("get_wallet_data", builder.build())).stack
		const result = loadTupleJettonWalletData(source)
		return result
	}
}
