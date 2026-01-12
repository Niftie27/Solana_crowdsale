use anchor_lang::prelude::*;

mod state;
mod constants;
mod instructions;

declare_id!("8RZFty5xWXuAMaLKWpbctPgaG8E6wHRFc4pjR4ydqRmr");

#[program]
pub mod crowdsale {
    pub use super::instructions::*;
    use super::*;

    // constructor
    pub fn initialize(ctx: Context<CreateCrowdsale>,id: Pubkey, cost: u32) -> Result<()> {
        instructions::create_crowdsale(ctx, id, cost)
    }

    // where a user will buy a token

    pub fn buy_tokens(ctx: Context<BuyTokens>, amount: u32) -> Result<()> {
        instructions::buy_tokens(ctx, amount)

    }

    // where the owner can withdraw Sol
    pub fn withdraw(ctx: Context<Withdraw>) -> Result<()> {
        instructions::withdraw(ctx)
    }

}

#[derive(Accounts)]
pub struct Initialize {}
