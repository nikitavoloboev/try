import * as anchor from '@coral-xyz/anchor'
import {Program} from '@coral-xyz/anchor'
import {Keypair} from '@solana/web3.js'
import {Solanawithwallet} from '../target/types/solanawithwallet'
import '@types/jest';

describe('solanawithwallet', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)
  const payer = provider.wallet as anchor.Wallet

  const program = anchor.workspace.Solanawithwallet as Program<Solanawithwallet>

  const solanawithwalletKeypair = Keypair.generate()

  it('Initialize Solanawithwallet', async () => {
    await program.methods
      .initialize()
      .accounts({
        solanawithwallet: solanawithwalletKeypair.publicKey,
        payer: payer.publicKey,
      })
      .signers([solanawithwalletKeypair])
      .rpc()

    const currentCount = await program.account.solanawithwallet.fetch(solanawithwalletKeypair.publicKey)

    expect(currentCount.count).toEqual(0)
  })

  it('Increment Solanawithwallet', async () => {
    await program.methods.increment().accounts({ solanawithwallet: solanawithwalletKeypair.publicKey }).rpc()

    const currentCount = await program.account.solanawithwallet.fetch(solanawithwalletKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Increment Solanawithwallet Again', async () => {
    await program.methods.increment().accounts({ solanawithwallet: solanawithwalletKeypair.publicKey }).rpc()

    const currentCount = await program.account.solanawithwallet.fetch(solanawithwalletKeypair.publicKey)

    expect(currentCount.count).toEqual(2)
  })

  it('Decrement Solanawithwallet', async () => {
    await program.methods.decrement().accounts({ solanawithwallet: solanawithwalletKeypair.publicKey }).rpc()

    const currentCount = await program.account.solanawithwallet.fetch(solanawithwalletKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Set solanawithwallet value', async () => {
    await program.methods.set(42).accounts({ solanawithwallet: solanawithwalletKeypair.publicKey }).rpc()

    const currentCount = await program.account.solanawithwallet.fetch(solanawithwalletKeypair.publicKey)

    expect(currentCount.count).toEqual(42)
  })

  it('Set close the solanawithwallet account', async () => {
    await program.methods
      .close()
      .accounts({
        payer: payer.publicKey,
        solanawithwallet: solanawithwalletKeypair.publicKey,
      })
      .rpc()

    // The account should no longer exist, returning null.
    const userAccount = await program.account.solanawithwallet.fetchNullable(solanawithwalletKeypair.publicKey)
    expect(userAccount).toBeNull()
  })
})
