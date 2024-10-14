// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor'
import { Cluster, PublicKey } from '@solana/web3.js'
import SolanaappviteIDL from '../target/idl/solanaappvite.json'
import type { Solanaappvite } from '../target/types/solanaappvite'

// Re-export the generated IDL and type
export { Solanaappvite, SolanaappviteIDL }

// The programId is imported from the program IDL.
export const SOLANAAPPVITE_PROGRAM_ID = new PublicKey(SolanaappviteIDL.address)

// This is a helper function to get the Solanaappvite Anchor program.
export function getSolanaappviteProgram(provider: AnchorProvider) {
  return new Program(SolanaappviteIDL as Solanaappvite, provider)
}

// This is a helper function to get the program ID for the Solanaappvite program depending on the cluster.
export function getSolanaappviteProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
      // This is the program ID for the Solanaappvite program on devnet and testnet.
      return new PublicKey('CounNZdmsQmWh7uVngV9FXW2dZ6zAgbJyYsvBpqbykg')
    case 'mainnet-beta':
    default:
      return SOLANAAPPVITE_PROGRAM_ID
  }
}
