"use client"

import { useWallet } from "@solana/wallet-adapter-react"
import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js"

export default function RouteComponent() {
  const { publicKey, sendTransaction } = useWallet()
  return (
    <>
      <div>
        <div className="max-w-xl mx-auto py-6 sm:px-6 lg:px-8 text-center">
          <div className="space-y-2">
            <button
              className="btn btn-primary"
              disabled={!publicKey}
              onClick={async () => {
                if (!publicKey) return
                const amountInUsdt = 5 // not used currently, doing it with SOL for now
                const addresses = [
                  "6SEg4Exnk9fgaw8krTPGDBJt6gFRNnipPni2odh66bq8", // 1
                  "E57kivv4wcptYTas5aTKQb82sGvipBY5GUQZn4GPzgFT", // 2
                  "H2ANeJWUYUSkrLbhRq4VBf2nSmjCBk9tP7WNBFFN7J64", // 3
                  "9fyd39ENpTdF6fjJ3CBURsuKANFy2Yw7RvB2mihZkzbS", // 4
                  "76XTHj6puju8vkPjN3tZZHBHKMSSCJD2prvTTMUsCJY2", // 5
                ]
                // Solana devnet connection
                const connection = new Connection(
                  "https://api.devnet.solana.com"
                )
                // Create a new transaction
                const transaction = new Transaction()
                // Amount to send to each address (0.1 SOL)
                const amountPerAddress = LAMPORTS_PER_SOL * 0.1
                // Add transfer instructions for each address
                for (const address of addresses) {
                  transaction.add(
                    SystemProgram.transfer({
                      fromPubkey: publicKey,
                      toPubkey: new PublicKey(address),
                      lamports: amountPerAddress,
                    })
                  )
                }

                try {
                  const res = await sendTransaction(transaction, connection)
                  console.log(res, "res")
                } catch (error) {
                  console.error("Error:", error)
                }
              }}
            >
              {publicKey
                ? "Send 0.5 SOL to 5 addresses (0.1 SOL each)"
                : "Connect wallet to send"}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
