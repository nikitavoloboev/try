"use client"

import {
  createAssociatedTokenAccountInstruction,
  createTransferInstruction,
  getAssociatedTokenAddress,
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
  const { publicKey, sendTransaction, wallet } = useWallet()
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
                setLoadingTransaction(true)
                if (!publicKey) return
                if (!wallet) return
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
                const amountPerAddress = 1 * 10 ** 6 // 5 USDC in lamports (since USDC has 6 decimal places)
                try {
                  // Add transfer instructions for each address
                  for (const address of addresses) {
                    const recipientPubkey = new PublicKey(address)

                    // Get the associated token account for the recipient
                    const recipientTokenAccount =
                      await getAssociatedTokenAddress(usdcMint, recipientPubkey)

                    // Check if the recipient's associated token account exists
                    const recipientAccountInfo =
                      await connection.getAccountInfo(recipientTokenAccount)

                    if (!recipientAccountInfo) {
                      // If the account doesn't exist, create it
                      transaction.add(
                        createAssociatedTokenAccountInstruction(
                          publicKey, // Payer
                          recipientTokenAccount, // Associated token account address
                          recipientPubkey, // Owner of the new account
                          usdcMint // Token mint
                        )
                      )
                    }

                    // Get the USDC token account for the connected wallet
                    const senderTokenAccount = await getAssociatedTokenAddress(
                      usdcMint,
                      publicKey
                    )

                    // Check if the sender's associated token account exists
                    const senderAccountInfo = await connection.getAccountInfo(
                      senderTokenAccount
                    )

                    if (!senderAccountInfo) {
                      // If the account doesn't exist, create it
                      transaction.add(
                        createAssociatedTokenAccountInstruction(
                          publicKey, // Payer
                          senderTokenAccount, // Associated token account address
                          publicKey, // Owner of the new account
                          usdcMint // Token mint
                        )
                      )
                    }

                    // Add transfer instruction
                    transaction.add(
                      createTransferInstruction(
                        senderTokenAccount, // Sender's token account
                        recipientTokenAccount, // Recipient's token account
                        publicKey, // Sender's public key (authority)
                        amountPerAddress, // Amount to send (1 USDC each)
                        [] // No additional signers required
                      )
                    )
                  }

                  // Sign and send the transaction
                  const tx = await sendTransaction(transaction, connection)
                  console.log("Transaction confirmed:", tx)
                } catch (err) {
                  console.log(err, "err")
                }
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
