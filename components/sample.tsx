"use client"

import { useState } from "react"
import { useAccount } from "wagmi"
import { isAddress } from "viem"
import { useLotteryContract } from "@/hooks/useContract"

const SampleIntegration = () => {
  const { isConnected, address } = useAccount()
  const [amount, setAmount] = useState("")

  const { data, actions, state } = useLotteryContract()

  const handleEnter = async () => {
    if (!amount) return
    try {
      await actions.enterLottery(amount)
      setAmount("")
    } catch (err) {
      console.error(err)
    }
  }

  const handlePickWinner = async () => {
    try {
      await actions.pickWinner()
    } catch (err) {
      console.error(err)
    }
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Please connect wallet</p>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Lottery Contract</h1>

      <div className="border p-4 rounded-lg">
        <p className="text-sm text-muted-foreground">Contract Owner</p>
        <p className="font-mono">{data.owner}</p>
      </div>

      <div>
        <label className="block mb-2 font-medium">Enter Lottery (Send FLR)</label>
        <input
          type="number"
          placeholder="0.1"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
        <button
          onClick={handleEnter}
          disabled={state.isLoading || !amount}
          className="mt-3 w-full bg-primary text-primary-foreground py-2 rounded"
        >
          {state.isLoading ? "Processing..." : "Enter Lottery"}
        </button>
      </div>

      <div>
        <button
          onClick={handlePickWinner}
          disabled={state.isLoading}
          className="w-full bg-destructive text-destructive-foreground py-2 rounded"
        >
          {state.isLoading ? "Processing..." : "Pick Winner"}
        </button>
      </div>

      {state.hash && (
        <div className="border p-4 rounded">
          <p className="text-xs text-muted-foreground">Transaction Hash</p>
          <p className="font-mono break-all">{state.hash}</p>
          {state.isConfirming && <p className="text-primary text-sm">Confirming...</p>}
          {state.isConfirmed && <p className="text-green-500 text-sm">Confirmed!</p>}
        </div>
      )}

      {state.error && (
        <div className="border border-destructive p-4 rounded">
          <p className="text-destructive">{state.error.message}</p>
        </div>
      )}
    </div>
  )
}

export default SampleIntegration
