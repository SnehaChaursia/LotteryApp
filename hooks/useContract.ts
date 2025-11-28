"use client"

import { useState, useEffect } from "react"
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi"
import { parseEther, formatEther } from "viem"
import { contractABI, contractAddress } from "@/lib/contract"

export const useLotteryContract = () => {
  const { address } = useAccount()
  const [isLoading, setIsLoading] = useState(false)

  // READ: owner
  const { data: owner, refetch: refetchOwner } = useReadContract({
    address: contractAddress,
    abi: contractABI,
    functionName: "owner",
  })

  // WRITE: enter lottery
  const { writeContractAsync, data: hash, error, isPending } = useWriteContract()

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    })

  useEffect(() => {
    if (isConfirmed) {
      refetchOwner()
    }
  }, [isConfirmed, refetchOwner])

  // ENTER function
  const enterLottery = async (amount: string) => {
    if (!amount) return
    try {
      setIsLoading(true)
      await writeContractAsync({
        address: contractAddress,
        abi: contractABI,
        functionName: "enter",
        value: parseEther(amount),
      })
    } catch (err) {
      console.error("Error:", err)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  // PICK WINNER
  const pickWinner = async () => {
    try {
      setIsLoading(true)
      await writeContractAsync({
        address: contractAddress,
        abi: contractABI,
        functionName: "pickWinner",
      })
    } catch (err) {
      console.error("Error:", err)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return {
    data: {
      owner,
    },
    actions: {
      enterLottery,
      pickWinner,
    },
    state: {
      isLoading: isLoading || isPending || isConfirming,
      isPending,
      isConfirming,
      isConfirmed,
      hash,
      error,
    },
  }
}
