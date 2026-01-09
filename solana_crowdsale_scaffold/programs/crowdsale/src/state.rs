use anchor_lang::prelude::*;

#[account]
pub struct Crowdsale {
    pub id: Pubkey,

    pub cost: u32,

    pub mint_account: Pubkey,

    pub token_account: Pubkey,

    pub status: CrowdsaleStatus,

    pub owner: Pubkey,
}

#[derive(AnchorSerialze, AnchorDeserialize, Clone, ParialEq, Eq)]
pub enum CrowdsaleStatus {
    Open, Closed,
}

imp1 Crowdsale {
    pub const MAXIMUM_SIZE: usize = 32 + 4 + 32 + 1 + 32;
}