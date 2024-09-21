import {
    Dictionary,
    Address,
    beginCell,
    Cell,
    Contract,
    contractAddress,
    ContractProvider,
    Sender,
    SendMode,
    Builder,
    Slice,
} from '@ton/core';

export type AirdropConfig = {
    // jettonWallet: Address;
    merkleRoot: bigint;
    helperCode: Cell;
    // begin: number;
    // end: number;
    admin: Address;
};

export function airdropConfigToCell(config: AirdropConfig): Cell {
    return beginCell()
        .storeUint(0, 2)
        .storeUint(config.merkleRoot, 256)
        .storeRef(config.helperCode)
        .storeUint(0, 64)
        .storeUint(0, 64)
        .storeAddress(config.admin)
        // .storeUint(Math.floor(Math.random() * 1e9), 64)
        .endCell();
}

export type AirdropEntry = {
    address: Address;
    amount: bigint;
};
export type AirdropData = {
    jettonWallet: Address;
    merkleRoot: bigint;
    helperCode: Cell;
    begin: number;
    end: number;
    admin: Address;
};

export const airdropEntryValue = {
    serialize: (src: AirdropEntry, buidler: Builder) => {
        buidler.storeAddress(src.address).storeCoins(src.amount);
    },
    parse: (src: Slice) => {
        return {
            address: src.loadAddress(),
            amount: src.loadCoins(),
        };
    },
};

export function generateEntriesDictionary(entries: AirdropEntry[]): Dictionary<bigint, AirdropEntry> {
    let dict: Dictionary<bigint, AirdropEntry> = Dictionary.empty(Dictionary.Keys.BigUint(256), airdropEntryValue);

    for (let i = 0; i < entries.length; i++) {
        dict.set(BigInt(i), entries[i]);
    }

    return dict;
}

export class Airdrop implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new Airdrop(address);
    }

    static createFromConfig(config: AirdropConfig, code: Cell, workchain = 0) {
        const data = airdropConfigToCell(config);
        const init = { code, data };
        return new Airdrop(contractAddress(workchain, init), init);
    }


    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint, jettonWallet: Address, begin: number, end: number) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell()
                .storeUint(0x610ca46c, 32)
                .storeUint(0, 64)
                .storeAddress(jettonWallet)
                .storeUint(begin, 64)
                .storeUint(end, 64)
                .endCell(),
        });
    }

    async sendWithdrawJettons(provider: ContractProvider, via: Sender, value: bigint, amount: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().storeUint(0x190592b2, 32).storeUint(0, 64).storeCoins(amount).endCell(),
        });
    }

    async getContractData(provider: ContractProvider): Promise<AirdropData> {
        const cell = await provider.get('get_contract_data', []);
        return {
            jettonWallet: cell.stack.readAddress(),
            merkleRoot: cell.stack.readBigNumber(),
            helperCode: cell.stack.readCell(),
            begin: cell.stack.readNumber(),
            end: cell.stack.readNumber(),
            admin: cell.stack.readAddress(),
        };
    }
}
