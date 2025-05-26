import {
  Deposit as DepositEvent,
  EIP712DomainChanged as EIP712DomainChangedEvent,
  RewardsDeposit as RewardsDepositEvent,
  Withdraw as WithdrawEvent
} from "../generated/ProtocolRewards/ProtocolRewards"
import {
  Deposit,
  EIP712DomainChanged,
  RewardsDeposit,
  Withdraw
} from "../generated/schema"

export function handleDeposit(event: DepositEvent): void {
  let entity = new Deposit(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.from = event.params.from
  entity.to = event.params.to
  entity.reason = event.params.reason
  entity.amount = event.params.amount
  entity.comment = event.params.comment

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleEIP712DomainChanged(
  event: EIP712DomainChangedEvent
): void {
  let entity = new EIP712DomainChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRewardsDeposit(event: RewardsDepositEvent): void {
  let entity = new RewardsDeposit(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.creator = event.params.creator
  entity.createReferral = event.params.createReferral
  entity.mintReferral = event.params.mintReferral
  entity.firstMinter = event.params.firstMinter
  entity.zora = event.params.zora
  entity.from = event.params.from
  entity.creatorReward = event.params.creatorReward
  entity.createReferralReward = event.params.createReferralReward
  entity.mintReferralReward = event.params.mintReferralReward
  entity.firstMinterReward = event.params.firstMinterReward
  entity.zoraReward = event.params.zoraReward

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleWithdraw(event: WithdrawEvent): void {
  let entity = new Withdraw(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.from = event.params.from
  entity.to = event.params.to
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
