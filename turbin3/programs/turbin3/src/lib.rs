use anchor_lang::prelude::*;

declare_id!("HwFQzMt8DNuG7pRSXvFvKtddpT4joyazaYFZWbecqd4s");

#[program]
pub mod turbin3 {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
