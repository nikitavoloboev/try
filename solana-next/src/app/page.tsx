"use client"

import {
  createAssociatedTokenAccountInstruction,
  createTransferInstruction,
  getAssociatedTokenAddress,
  getAssociatedTokenAddressSync,
} from "@solana/spl-token"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { Connection, PublicKey, Transaction } from "@solana/web3.js"
import { useState } from "react"

export default function RouteComponent() {
  const { publicKey, sendTransaction, wallet } = useWallet()
  const [loadingTransaction, setLoadingTransaction] = useState(false)
  const [selectedTokenValue, setSelectedTokenValue] = useState<number>(5)
  const [selectedTokenAmount, setSelectedTokenAmount] = useState<number>(1)
  const { connection } = useConnection()

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
                  "bad", // 1
                  "bad", // 2
                  "bad", // 3
                  "bad", // 4
                  "bad", // 5
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
            <button
              className="btn btn-primary ml-4"
              disabled={!publicKey}
              onClick={async () => {
                if (!publicKey) return
                setLoadingTransaction(true)

                const addresses = [
                  "6SEg4Exnk9fgaw8krTPGDBJt6gFRNnipPni2odh66bq8",
                  "E57kivv4wcptYTas5aTKQb82sGvipBY5GUQZn4GPzgFT",
                  "H2ANeJWUYUSkrLbhRq4VBf2nSmjCBk9tP7WNBFFN7J64",
                  "9fyd39ENpTdF6fjJ3CBURsuKANFy2Yw7RvB2mihZkzbS",
                  "76XTHj6puju8vkPjN3tZZHBHKMSSCJD2prvTTMUsCJY2",
                ]

                const usdcMint = new PublicKey(
                  "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU"
                )
                const transaction = new Transaction()
                const amountPerAddress = 1 * 10 ** 6 // 1 USDC in lamports

                try {
                  const senderTokenAccount =
                    await getAssociatedTokenAddressSync(usdcMint, publicKey)

                  for (const address of addresses) {
                    const recipientPublicKey = new PublicKey(address)
                    const recipientTokenAccount =
                      await getAssociatedTokenAddressSync(
                        usdcMint,
                        recipientPublicKey
                      )

                    // Check if recipient token account exists, if not, create it
                    const accountInfo = await connection.getAccountInfo(
                      recipientTokenAccount
                    )
                    if (!accountInfo) {
                      console.log(
                        `Creating token account for recipient: ${address}`
                      )
                      const createAccountInstruction =
                        createAssociatedTokenAccountInstruction(
                          publicKey, // payer
                          recipientTokenAccount, // associatedToken
                          recipientPublicKey, // owner
                          usdcMint // mint
                        )
                      transaction.add(createAccountInstruction)
                    }

                    // Add transfer instruction
                    const transferInstruction = createTransferInstruction(
                      senderTokenAccount,
                      recipientTokenAccount,
                      publicKey,
                      amountPerAddress,
                      []
                    )
                    transaction.add(transferInstruction)
                  }

                  const latestBlockhash = await connection.getLatestBlockhash()
                  transaction.recentBlockhash = latestBlockhash.blockhash
                  transaction.feePayer = publicKey

                  const txSignature = await sendTransaction(
                    transaction,
                    connection
                  )
                  const confirmation = await connection.confirmTransaction({
                    signature: txSignature,
                    blockhash: latestBlockhash.blockhash,
                    lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
                  })
                  console.log("tx confirmed..")

                  if (confirmation.value.err) {
                    throw new Error(
                      `Transaction failed: ${confirmation.value.err.toString()}`
                    )
                  }

                  // ...
                  // fetch(".../transaction-completed")

                  console.log("Transaction confirmed:", txSignature)
                } catch (err) {
                  console.error("Transaction failed:", err)
                } finally {
                  setLoadingTransaction(false)
                }
              }}
            >
              {!loadingTransaction &&
                `Buy for ${
                  selectedTokenValue * selectedTokenAmount
                }$ USDT (version 2)`}
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
