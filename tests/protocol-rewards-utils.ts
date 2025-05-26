import { newMockEvent } from "matchstick-as"
import { ethereum, Address, Bytes, BigInt } from "@graphprotocol/graph-ts"
import {
  Deposit,
  EIP712DomainChanged,
  RewardsDeposit,
  Withdraw
} from "../generated/ProtocolRewards/ProtocolRewards"

export function createDepositEvent(
  from: Address,
  to: Address,
  reason: Bytes,
  amount: BigInt,
  comment: string
): Deposit {
  let depositEvent = changetype<Deposit>(newMockEvent())

  depositEvent.parameters = new Array()

  depositEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  depositEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  depositEvent.parameters.push(
    new ethereum.EventParam("reason", ethereum.Value.fromFixedBytes(reason))
  )
  depositEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  depositEvent.parameters.push(
    new ethereum.EventParam("comment", ethereum.Value.fromString(comment))
  )

  return depositEvent
}

export function createEIP712DomainChangedEvent(): EIP712DomainChanged {
  let eip712DomainChangedEvent = changetype<EIP712DomainChanged>(newMockEvent())

  eip712DomainChangedEvent.parameters = new Array()

  return eip712DomainChangedEvent
}

export function createRewardsDepositEvent(
  creator: Address,
  createReferral: Address,
  mintReferral: Address,
  firstMinter: Address,
  zora: Address,
  from: Address,
  creatorReward: BigInt,
  createReferralReward: BigInt,
  mintReferralReward: BigInt,
  firstMinterReward: BigInt,
  zoraReward: BigInt
): RewardsDeposit {
  let rewardsDepositEvent = changetype<RewardsDeposit>(newMockEvent())

  rewardsDepositEvent.parameters = new Array()

  rewardsDepositEvent.parameters.push(
    new ethereum.EventParam("creator", ethereum.Value.fromAddress(creator))
  )
  rewardsDepositEvent.parameters.push(
    new ethereum.EventParam(
      "createReferral",
      ethereum.Value.fromAddress(createReferral)
    )
  )
  rewardsDepositEvent.parameters.push(
    new ethereum.EventParam(
      "mintReferral",
      ethereum.Value.fromAddress(mintReferral)
    )
  )
  rewardsDepositEvent.parameters.push(
    new ethereum.EventParam(
      "firstMinter",
      ethereum.Value.fromAddress(firstMinter)
    )
  )
  rewardsDepositEvent.parameters.push(
    new ethereum.EventParam("zora", ethereum.Value.fromAddress(zora))
  )
  rewardsDepositEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  rewardsDepositEvent.parameters.push(
    new ethereum.EventParam(
      "creatorReward",
      ethereum.Value.fromUnsignedBigInt(creatorReward)
    )
  )
  rewardsDepositEvent.parameters.push(
    new ethereum.EventParam(
      "createReferralReward",
      ethereum.Value.fromUnsignedBigInt(createReferralReward)
    )
  )
  rewardsDepositEvent.parameters.push(
    new ethereum.EventParam(
      "mintReferralReward",
      ethereum.Value.fromUnsignedBigInt(mintReferralReward)
    )
  )
  rewardsDepositEvent.parameters.push(
    new ethereum.EventParam(
      "firstMinterReward",
      ethereum.Value.fromUnsignedBigInt(firstMinterReward)
    )
  )
  rewardsDepositEvent.parameters.push(
    new ethereum.EventParam(
      "zoraReward",
      ethereum.Value.fromUnsignedBigInt(zoraReward)
    )
  )

  return rewardsDepositEvent
}

export function createWithdrawEvent(
  from: Address,
  to: Address,
  amount: BigInt
): Withdraw {
  let withdrawEvent = changetype<Withdraw>(newMockEvent())

  withdrawEvent.parameters = new Array()

  withdrawEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  withdrawEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  withdrawEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return withdrawEvent
}
