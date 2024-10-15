"use client"

import {
  createTransferInstruction,
  getOrCreateAssociatedTokenAccount,
} from "@solana/spl-token"
import { useWallet } from "@solana/wallet-adapter-react"
import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js"
import { useState } from "react"

export default function RouteComponent() {
  const { publicKey, sendTransaction } = useWallet()
  const [loadingTransaction, setLoadingTransaction] = useState(false)
  const [selectedTokenValue, setSelectedTokenValue] = useState<number>(5)
  const [selectedTokenAmount, setSelectedTokenAmount] = useState<number>(1)

  return (
    <>
      <div>
        <div className="max-w-xl mx-auto py-6 sm:px-6 lg:px-8 text-center">
          <div className="space-y-2">
            <button
              className="btn btn-primary"
              disabled={!publicKey}
              onClick={async () => {
                //  TODO: not used, but use it after below works..
                const dollars = 5
                setLoadingTransaction(true)
                if (!publicKey) return
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
                // USDC token mint address (devnet)
                const usdcMint = new PublicKey(
                  "EwRtt8scMkA3EyP6ffHULm3GbEXySsn5bVMvPscwX7vq"
                )
                // Create a new transaction
                const transaction = new Transaction()
                // Amount to send to each address
                const amountPerAddress = 5 * 10 ** 6 // 5 USDC in lamports (since USDC has 6 decimal places)
                try {
                  // Get the associated token account of the sender (assuming the sender has USDC already)
                  const senderTokenAccount =
                    await getOrCreateAssociatedTokenAccount(
                      connection,
                      publicKey, // Payer's public key
                      usdcMint, // USDC mint address
                      publicKey // Sender's public key
                    )
                  // Add transfer instructions for each address
                  for (const address of addresses) {
                    const recipientTokenAccount =
                      await getOrCreateAssociatedTokenAccount(
                        connection,
                        publicKey, // Payer's public key
                        usdcMint, // USDC mint address
                        new PublicKey(address) // Recipient's public key
                      )
                    // Create transfer instruction for each address
                    transaction.add(
                      createTransferInstruction(
                        senderTokenAccount.address, // Sender's token account
                        recipientTokenAccount.address, // Recipient's token account
                        publicKey, // Sender's public key
                        amountPerAddress, // Amount to send (5 USDC)
                        [] // No additional signers required
                      )
                    )
                  }
                } catch (err) {
                  console.log(err, "err")
                }
                setLoadingTransaction(false)
                return
                // Wait for 3 seconds
                await new Promise((resolve) => setTimeout(resolve, 3000))
                return

                // if (!publicKey) return
                // // TODO: get addresses from the token that was fetched
                // const addresses = [
                //   "6SEg4Exnk9fgaw8krTPGDBJt6gFRNnipPni2odh66bq8", // 1
                //   "E57kivv4wcptYTas5aTKQb82sGvipBY5GUQZn4GPzgFT", // 2
                //   "H2ANeJWUYUSkrLbhRq4VBf2nSmjCBk9tP7WNBFFN7J64", // 3
                //   "9fyd39ENpTdF6fjJ3CBURsuKANFy2Yw7RvB2mihZkzbS", // 4
                //   "76XTHj6puju8vkPjN3tZZHBHKMSSCJD2prvTTMUsCJY2", // 5
                // ]
                // // Solana devnet connection
                // const connection = new Connection(
                //   "https://api.devnet.solana.com"
                // )
                // // Create a new transaction
                // const transaction = new Transaction()
                // // Amount to send to each address (1 SOL)
                // const amountPerAddress = LAMPORTS_PER_SOL
                // // Add transfer instructions for each address
                // for (const address of addresses) {
                //   transaction.add(
                //     SystemProgram.transfer({
                //       fromPubkey: publicKey,
                //       toPubkey: new PublicKey(address),
                //       lamports: amountPerAddress,
                //     })
                //   )
                // }
                // try {
                //   // TODO: do proper check that tx was successful
                //   // https://discord.com/channels/1123669370208538744/1123671432757514280/1295700752253190145
                //   const res = await sendTransaction(transaction, connection)
                //   console.log(res, "res")
                // } catch (error) {
                //   console.error("Error:", error)
                // }
              }}
            >
              {!loadingTransaction &&
                `Buy for ${selectedTokenValue * selectedTokenAmount}$ USDT`}
              {loadingTransaction && (
                <>
                  <div>loading...</div>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
