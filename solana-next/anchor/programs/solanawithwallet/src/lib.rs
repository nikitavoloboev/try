#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("AsjZ3kWAUSQRNt2pZVeJkywhZ6gpLpHZmJjduPmKZDZZ");

#[program]
pub mod solanawithwallet {
    use super::*;

  pub fn close(_ctx: Context<CloseSolanawithwallet>) -> Result<()> {
    Ok(())
  }

  pub fn decrement(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.solanawithwallet.count = ctx.accounts.solanawithwallet.count.checked_sub(1).unwrap();
    Ok(())
  }

  pub fn increment(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.solanawithwallet.count = ctx.accounts.solanawithwallet.count.checked_add(1).unwrap();
    Ok(())
  }

  pub fn initialize(_ctx: Context<InitializeSolanawithwallet>) -> Result<()> {
    Ok(())
  }

  pub fn set(ctx: Context<Update>, value: u8) -> Result<()> {
    ctx.accounts.solanawithwallet.count = value.clone();
    Ok(())
  }
}

#[derive(Accounts)]
pub struct InitializeSolanawithwallet<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  init,
  space = 8 + Solanawithwallet::INIT_SPACE,
  payer = payer
  )]
  pub solanawithwallet: Account<'info, Solanawithwallet>,
  pub system_program: Program<'info, System>,
}
#[derive(Accounts)]
pub struct CloseSolanawithwallet<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  mut,
  close = payer, // close account and return lamports to payer
  )]
  pub solanawithwallet: Account<'info, Solanawithwallet>,
}

#[derive(Accounts)]
pub struct Update<'info> {
  #[account(mut)]
  pub solanawithwallet: Account<'info, Solanawithwallet>,
}

#[account]
#[derive(InitSpace)]
pub struct Solanawithwallet {
  count: u8,
}
