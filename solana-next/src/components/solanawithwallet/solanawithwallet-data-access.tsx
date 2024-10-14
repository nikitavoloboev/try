'use client'

import {getSolanawithwalletProgram, getSolanawithwalletProgramId} from '@project/anchor'
import {useConnection} from '@solana/wallet-adapter-react'
import {Cluster, Keypair, PublicKey} from '@solana/web3.js'
import {useMutation, useQuery} from '@tanstack/react-query'
import {useMemo} from 'react'
import toast from 'react-hot-toast'
import {useCluster} from '../cluster/cluster-data-access'
import {useAnchorProvider} from '../solana/solana-provider'
import {useTransactionToast} from '../ui/ui-layout'

export function useSolanawithwalletProgram() {
  const { connection } = useConnection()
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const provider = useAnchorProvider()
  const programId = useMemo(() => getSolanawithwalletProgramId(cluster.network as Cluster), [cluster])
  const program = getSolanawithwalletProgram(provider)

  const accounts = useQuery({
    queryKey: ['solanawithwallet', 'all', { cluster }],
    queryFn: () => program.account.solanawithwallet.all(),
  })

  const getProgramAccount = useQuery({
    queryKey: ['get-program-account', { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  })

  const initialize = useMutation({
    mutationKey: ['solanawithwallet', 'initialize', { cluster }],
    mutationFn: (keypair: Keypair) =>
      program.methods.initialize().accounts({ solanawithwallet: keypair.publicKey }).signers([keypair]).rpc(),
    onSuccess: (signature) => {
      transactionToast(signature)
      return accounts.refetch()
    },
    onError: () => toast.error('Failed to initialize account'),
  })

  return {
    program,
    programId,
    accounts,
    getProgramAccount,
    initialize,
  }
}

export function useSolanawithwalletProgramAccount({ account }: { account: PublicKey }) {
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const { program, accounts } = useSolanawithwalletProgram()

  const accountQuery = useQuery({
    queryKey: ['solanawithwallet', 'fetch', { cluster, account }],
    queryFn: () => program.account.solanawithwallet.fetch(account),
  })

  const closeMutation = useMutation({
    mutationKey: ['solanawithwallet', 'close', { cluster, account }],
    mutationFn: () => program.methods.close().accounts({ solanawithwallet: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accounts.refetch()
    },
  })

  const decrementMutation = useMutation({
    mutationKey: ['solanawithwallet', 'decrement', { cluster, account }],
    mutationFn: () => program.methods.decrement().accounts({ solanawithwallet: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  const incrementMutation = useMutation({
    mutationKey: ['solanawithwallet', 'increment', { cluster, account }],
    mutationFn: () => program.methods.increment().accounts({ solanawithwallet: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  const setMutation = useMutation({
    mutationKey: ['solanawithwallet', 'set', { cluster, account }],
    mutationFn: (value: number) => program.methods.set(value).accounts({ solanawithwallet: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  return {
    accountQuery,
    closeMutation,
    decrementMutation,
    incrementMutation,
    setMutation,
  }
}
