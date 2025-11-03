# Wallet Sweeper Bot (Educational Demo)

⚠️ **THIS IS FOR SECURITY RESEARCH AND EDUCATION ONLY**  
⚠️ **DO NOT USE ON MAINNET OR WITH REAL FUNDS**

This project demonstrates how malicious actors might use `approve()` + `transferFrom()` to drain tokens from users who have approved a contract.

## Features (Demo Only)
- Simulates balance checking on Sepolia
- Shows how `transferFrom` works after approval
- Fetches user addresses from a mock API

## How to Run (for testing on Sepolia)
```bash
npm install ethers
node bot.cjs sepolia
