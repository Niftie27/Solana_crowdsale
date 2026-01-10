import * as anchor from "@coral-xyz/anchor"
import { PublicKey, VOTE_PROGRAM_ID } from '@solana/web3.js'
import { getAssociatedTokenAddressSync } from '@solana/spl-token'
import { expect } from 'chai'
import { Crowdsale } from "../target/types/crowdsale"

describe("Crowdsale", () => {
  // Configure the client to use the local cluster.
  // Setting up our test environment (normally we use metamask for that)
  const provider = anchor.AnchorProvider.env() // method from Anchor to create local environment for testing
  const connection = provider.connection // connection coming from provider
  anchor.setProvider(provider)

  // Our overall program
  // let us call upon all methods that we coded in lib.rs
  // load idl (interface) for crowdsale program
  const program = anchor.workspace.Crowdsale as anchor.Program<Crowdsale>

  // Our main account. This is who will create 
  // the token mint, crowdsale, and fund the buyer account with SOL
  const creator = (program.provider as anchor.AnchorProvider).wallet

  /* --- GENERATE KEYPAIRS --- */
  // Create Crowdsale keypair
  const crowdsaleKeypair = anchor.web3.Keypair.generate()

  // Create the buyer keypair
  const buyerKeypair = anchor.web3.Keypair.generate()

  // Console log our keys
  console.log(`Creator Public Key: ${creator.publicKey}`)
  console.log(`Crowdsale Public Key: ${crowdsaleKeypair.publicKey}`)
  console.log(`Buyer Public Key: ${buyerKeypair.publicKey}\n`)

  const ID = crowdsaleKeypair.publicKey
  const COST = 1

  /* --- SETUP CROWDSALE AUTHORITY --- */
  // In order to transfer tokens, we need to create the authority for the crowdsale. 
  // This will be based of the ID of the crowdsale.
  // This account stores data for crowdsale.
  // Can sign token transfers on behalf of crowdsale
  // We pull crowdsalePDA (the state of the crowdsale)
  // There also has to be account that signs off on tranfers for crowdsale
  const crowdsalePDA = PublicKey.findProgramAddressSync(
    [ID.toBuffer()],
    anchor.workspace.Crowdsale.programId
  )[0]

  const crowdsaleAuthorityPDA = PublicKey.findProgramAddressSync(
    [ID.toBuffer()], 'authority',
    anchor.workspace.Crowdsale.programId
  )[0]

    
  console.log(`Crowdsale Key: ${crowdsalePDA}`)

  console.log(`Crowdsale Authority: ${crowdsaleAuthorityPDA}`)

  // crowdsaleTokenAccount holds tokens for buyers

  let mintKeypair, crowdsaleTokenAccount

  before(async () => {
    
  })

});
