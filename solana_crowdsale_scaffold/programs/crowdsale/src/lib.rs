use anchor_lang::prelude::*;

mod state;
mod constants;
mod instructions;

declare_id!("HciPz9qoNEBBWga6KWomnDovANbQWnTAT5iFSNW7Ji3K");

#[program]
pub mod crowdsale {
    pub use super::instructions::*;
    use super::*;

    // constructor
    pub fn initialize(ctx: Context<CreateCrowdsale>,id: Pubkey, cost: u32) -> Result<()> {
        instructions::create_crowdsale(ctx, id, cost)
    }

    // where a user will buy a token

    // where the owner can withdraw Sol


}

#[derive(Accounts)]
pub struct Initialize {}
