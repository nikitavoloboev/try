import * as anchor from '@coral-xyz/anchor'
import {Program} from '@coral-xyz/anchor'
import {Keypair} from '@solana/web3.js'
import {Solanaappvite} from '../target/types/solanaappvite'
import '@types/jest';

describe('solanaappvite', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)
  const payer = provider.wallet as anchor.Wallet

  const program = anchor.workspace.Solanaappvite as Program<Solanaappvite>

  const solanaappviteKeypair = Keypair.generate()

  it('Initialize Solanaappvite', async () => {
    await program.methods
      .initialize()
      .accounts({
        solanaappvite: solanaappviteKeypair.publicKey,
        payer: payer.publicKey,
      })
      .signers([solanaappviteKeypair])
      .rpc()

    const currentCount = await program.account.solanaappvite.fetch(solanaappviteKeypair.publicKey)

    expect(currentCount.count).toEqual(0)
  })

  it('Increment Solanaappvite', async () => {
    await program.methods.increment().accounts({ solanaappvite: solanaappviteKeypair.publicKey }).rpc()

    const currentCount = await program.account.solanaappvite.fetch(solanaappviteKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Increment Solanaappvite Again', async () => {
    await program.methods.increment().accounts({ solanaappvite: solanaappviteKeypair.publicKey }).rpc()

    const currentCount = await program.account.solanaappvite.fetch(solanaappviteKeypair.publicKey)

    expect(currentCount.count).toEqual(2)
  })

  it('Decrement Solanaappvite', async () => {
    await program.methods.decrement().accounts({ solanaappvite: solanaappviteKeypair.publicKey }).rpc()

    const currentCount = await program.account.solanaappvite.fetch(solanaappviteKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Set solanaappvite value', async () => {
    await program.methods.set(42).accounts({ solanaappvite: solanaappviteKeypair.publicKey }).rpc()

    const currentCount = await program.account.solanaappvite.fetch(solanaappviteKeypair.publicKey)

    expect(currentCount.count).toEqual(42)
  })

  it('Set close the solanaappvite account', async () => {
    await program.methods
      .close()
      .accounts({
        payer: payer.publicKey,
        solanaappvite: solanaappviteKeypair.publicKey,
      })
      .rpc()

    // The account should no longer exist, returning null.
    const userAccount = await program.account.solanaappvite.fetchNullable(solanaappviteKeypair.publicKey)
    expect(userAccount).toBeNull()
  })
})
