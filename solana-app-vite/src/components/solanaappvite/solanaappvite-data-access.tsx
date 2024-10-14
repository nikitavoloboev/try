import { getSolanaappviteProgram, getSolanaappviteProgramId } from '@project/anchor'
import { useConnection } from '@solana/wallet-adapter-react'
import { Cluster, Keypair, PublicKey } from '@solana/web3.js'
import { useMutation, useQuery } from '@tanstack/react-query'

import { useMemo } from 'react'
import toast from 'react-hot-toast'
import { useCluster } from '../cluster/cluster-data-access'
import { useAnchorProvider } from '../solana/solana-provider'
import { useTransactionToast } from '../ui/ui-layout'

export function useSolanaappviteProgram() {
  const { connection } = useConnection()
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const provider = useAnchorProvider()
  const programId = useMemo(() => getSolanaappviteProgramId(cluster.network as Cluster), [cluster])
  const program = getSolanaappviteProgram(provider)

  const accounts = useQuery({
    queryKey: ['solanaappvite', 'all', { cluster }],
    queryFn: () => program.account.solanaappvite.all(),
  })

  const getProgramAccount = useQuery({
    queryKey: ['get-program-account', { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  })

  const initialize = useMutation({
    mutationKey: ['solanaappvite', 'initialize', { cluster }],
    mutationFn: (keypair: Keypair) =>
      program.methods.initialize().accounts({ solanaappvite: keypair.publicKey }).signers([keypair]).rpc(),
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

export function useSolanaappviteProgramAccount({ account }: { account: PublicKey }) {
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const { program, accounts } = useSolanaappviteProgram()

  const accountQuery = useQuery({
    queryKey: ['solanaappvite', 'fetch', { cluster, account }],
    queryFn: () => program.account.solanaappvite.fetch(account),
  })

  const closeMutation = useMutation({
    mutationKey: ['solanaappvite', 'close', { cluster, account }],
    mutationFn: () => program.methods.close().accounts({ solanaappvite: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accounts.refetch()
    },
  })

  const decrementMutation = useMutation({
    mutationKey: ['solanaappvite', 'decrement', { cluster, account }],
    mutationFn: () => program.methods.decrement().accounts({ solanaappvite: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  const incrementMutation = useMutation({
    mutationKey: ['solanaappvite', 'increment', { cluster, account }],
    mutationFn: () => program.methods.increment().accounts({ solanaappvite: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  const setMutation = useMutation({
    mutationKey: ['solanaappvite', 'set', { cluster, account }],
    mutationFn: (value: number) => program.methods.set(value).accounts({ solanaappvite: account }).rpc(),
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
