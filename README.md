# Lottery Smart Contract dApp

## Contract Address
**0x79254Ad000422167eb060f1c6032E8eAfFDb90e9**  
Explorer: https://coston2-explorer.flare.network/address/0x79254Ad000422167eb060f1c6032E8eAfFDb90e9
## ScreeShot
<img width="1918" height="963" alt="image" src="https://github.com/user-attachments/assets/b9248c3a-e405-462c-b627-16d585226f9e" />


---

## Project Description

This project is a decentralized lottery application built on the **Flare Coston2 Testnet**.  
Users can participate in a transparent and verifiable lottery, secured by smart contract logic.  
Once participants enter by paying a specified amount of FLR, the contract owner can randomly select a winner from the pool of players.

This project includes:
- Complete smart contract integration using **wagmi** + **viem**
- React-based UI for end-user interaction
- Wallet-based authentication and transaction signing

---

## Features

### 🎫 Lottery Participation
- Users can enter the lottery by depositing FLR.
- Deposit amount is user-defined.

### 👑 Owner Controls
- The contract owner has the exclusive permission to trigger the `pickWinner()` function.
- The selected winner receives the accumulated FLR.

### 🔒 Wallet Gating
- Only connected wallets can interact with the lottery.
- Owner-only actions are protected on-chain and in the UI.

### 🔗 Live Transaction Feedback
- Pending, confirming, and completed status indicators.
- Displays transaction hash for easy explorer lookup.

### 🧩 Fully Typed Contract Integration
- Uses strongly typed TypeScript ABI with viem/wagmi.
- Automatically handles contract calls, state, and transaction receipts.

---

## How It Solves the Problem

Traditional online lotteries often lack:
- Transparency  
- Fairness  
- Verifiability  
- Trustless automation  

This decentralized lottery solves all of these issues using blockchain technology:

### ✅ **Transparency**
All transactions, participants, and winner selections are on-chain and publicly viewable.

### ✅ **Fair Execution**
The smart contract governs the process; no individual can manipulate entries or winnings.

### ✅ **Security**
Wallet signatures ensure only valid users enter and only the owner triggers winner selection.

### ✅ **User-Level Simplicity**
The UI enables:
- Entering the lottery with one click
- Viewing contract owner
- Monitoring transaction state (pending → confirming → confirmed)

### Use Cases
- Community giveaways  
- Transparent prize selection
- Hackathon or campaign-based random draws
- Educational projects to learn smart contract integrations  

---

## Summary

This project demonstrates a complete, production-ready pattern for connecting a frontend application to a deployed smart contract on the Flare network. With a clean UI, secure wallet gating, and type-safe contract calls, it provides a solid foundation for blockchain-enabled lottery systems or similar random-selection mechanisms.
