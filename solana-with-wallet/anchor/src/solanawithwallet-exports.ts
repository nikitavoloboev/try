// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor'
import { Cluster, PublicKey } from '@solana/web3.js'
import SolanawithwalletIDL from '../target/idl/solanawithwallet.json'
import type { Solanawithwallet } from '../target/types/solanawithwallet'

// Re-export the generated IDL and type
export { Solanawithwallet, SolanawithwalletIDL }

// The programId is imported from the program IDL.
export const SOLANAWITHWALLET_PROGRAM_ID = new PublicKey(SolanawithwalletIDL.address)

// This is a helper function to get the Solanawithwallet Anchor program.
export function getSolanawithwalletProgram(provider: AnchorProvider) {
  return new Program(SolanawithwalletIDL as Solanawithwallet, provider)
}

// This is a helper function to get the program ID for the Solanawithwallet program depending on the cluster.
export function getSolanawithwalletProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
      // This is the program ID for the Solanawithwallet program on devnet and testnet.
      return new PublicKey('CounNZdmsQmWh7uVngV9FXW2dZ6zAgbJyYsvBpqbykg')
    case 'mainnet-beta':
    default:
      return SOLANAWITHWALLET_PROGRAM_ID
  }
}
