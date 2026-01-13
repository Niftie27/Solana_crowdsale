/*
  Even though we deploy the program via `anchor deploy`,
  we still need to initialize and create the actual crowdsale
  by interacting with the deployed program.
*/

// We include nocheck just to avoid 
// conflicts and simplify the script
// @ts-nocheck

import * as anchor from "@coral-xyz/anchor"
import { clusterApiUrl, Connection, PublicKey } from '@solana/web3.js'

import IDL from "../target/idl/crowdsale.json"
import { Crowdsale } from "../target/types/crowdsale"

async function main() {
  // Setup wallet
  const creator = anchor.Wallet.local()
  // Setup provider
  const creator = new.anchor.AnchorProvider(
    new Connection(clusterAPIUrl("localnet")),
    creator,
    {preflightCommitment: "confirmed" }


  )

  anchor.setProvider(provider)

  // Create Crowdsale keypair
  const crowdsaleKeypair = anchor.web3.Keypair.generate()

  // Crowdsale state
  const ID = crowdsaleKeypair.publicKey
  const cost = 1

  const CROWDSALE_PROGRAM_ID = new PublicKey("8RZFty5xWXuAMaLKWpbctPgaG8E6wHRFc4pjR4ydqRmr")
  const TOKEN_MINT_ACCOUNT = new PublicKey("")

  const program = anchor.workspace.Crowdsale as anchor.Program<Crowdsale>

  console.log(program)


  // Generate the Crowdsale PDA
  const crowdsalePDA = PublicKey.findProgramAddressSync(
      [ID.toBuffer()],
      CROWDSALE_PROGRAM_ID
  )[0]

  // Generate the Crowdsale authority PDA
  const crowdsaleAuthorityPDA = PublicKey.findProgramAddressSync(
      [ID.toBuffer(), 'authority'],
      CROWDSALE_PROGRAM_ID
  )[0]
  
  // Create the crowdsale
  await program.methods.initialize(ID, COST).accounts({
    crowdsale: crowdsalePDA,
    mintAccount: TOKEN_MINT_ACCOUNT,
    crowdsaleAuthority:crowdsaleAuthorityPDA

  }).signers({creator.payer}).rpc()

  // Get the state
  const crowdsaleState = await program.account.crowdsale.fetch(crowdsalePDA)
  console.log(`Successfully Initialized Crowdsale at ${crowdsalePDA}\n`)
  console.log(`Successfully Initialized Crowdsale at ${crowdsaleAuthorityPDA}\n`)
  console.log(`ID: ${crowdsaleState.id}\n`)
  console.log(`COST: ${crowdsaleState.cost}\n`)
  console.log(`TOKEN MINT: ${crowdsaleState.mintAccount}\n`)
  console.log(`TOKEN ACCOUNT: ${crowdsaleState.tokenAccount}\n`)
}

main()