#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("DLw5fJNrrBCWoy75aukoDApBZm4MEvaWCvPJoqtLSg1p");

#[program]
pub mod solanaappvite {
    use super::*;

  pub fn close(_ctx: Context<CloseSolanaappvite>) -> Result<()> {
    Ok(())
  }

  pub fn decrement(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.solanaappvite.count = ctx.accounts.solanaappvite.count.checked_sub(1).unwrap();
    Ok(())
  }

  pub fn increment(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.solanaappvite.count = ctx.accounts.solanaappvite.count.checked_add(1).unwrap();
    Ok(())
  }

  pub fn initialize(_ctx: Context<InitializeSolanaappvite>) -> Result<()> {
    Ok(())
  }

  pub fn set(ctx: Context<Update>, value: u8) -> Result<()> {
    ctx.accounts.solanaappvite.count = value.clone();
    Ok(())
  }
}

#[derive(Accounts)]
pub struct InitializeSolanaappvite<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  init,
  space = 8 + Solanaappvite::INIT_SPACE,
  payer = payer
  )]
  pub solanaappvite: Account<'info, Solanaappvite>,
  pub system_program: Program<'info, System>,
}
#[derive(Accounts)]
pub struct CloseSolanaappvite<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  mut,
  close = payer, // close account and return lamports to payer
  )]
  pub solanaappvite: Account<'info, Solanaappvite>,
}

#[derive(Accounts)]
pub struct Update<'info> {
  #[account(mut)]
  pub solanaappvite: Account<'info, Solanaappvite>,
}

#[account]
#[derive(InitSpace)]
pub struct Solanaappvite {
  count: u8,
}
