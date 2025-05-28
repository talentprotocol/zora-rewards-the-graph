import { BigInt } from "@graphprotocol/graph-ts";
import {
  Deposit as DepositEvent,
  RewardsDeposit as RewardsDepositEvent,
  Withdraw as WithdrawEvent
} from "../generated/ProtocolRewards/ProtocolRewards"
import {
  User,
} from "../generated/schema"

export function handleDeposit(event: DepositEvent): void {
  let fromUser = User.load(event.params.from.toHexString());
  if (!fromUser) {
    fromUser = createUser(event.params.from.toHexString(), event.block.timestamp, event.address.toHexString());
  }
  let toUser = User.load(event.params.to.toHexString());
  if (!toUser) {
    toUser = createUser(event.params.to.toHexString(), event.block.timestamp, event.address.toHexString());
  }

  toUser.rewardsTotal = toUser.rewardsTotal.plus(event.params.amount);
  toUser.updatedAt = event.block.timestamp;
  toUser.save();
}

export function handleRewardsDeposit(event: RewardsDepositEvent): void {
  let creatorUser = User.load(event.params.creator.toHexString());
  if (!creatorUser) {
    creatorUser = createUser(event.params.creator.toHexString(), event.block.timestamp, event.address.toHexString());
  }
  creatorUser.creatorRewardsTotal = creatorUser.creatorRewardsTotal.plus(event.params.creatorReward);
  creatorUser.rewardsTotal = creatorUser.rewardsTotal.plus(event.params.creatorReward);
  creatorUser.updatedAt = event.block.timestamp;
  creatorUser.save();

  let createReferralUser = User.load(event.params.createReferral.toHexString());
  if (!createReferralUser) {
    createReferralUser = createUser(event.params.createReferral.toHexString(), event.block.timestamp, event.address.toHexString());
  }
  createReferralUser.createReferralRewardsTotal = createReferralUser.createReferralRewardsTotal.plus(event.params.createReferralReward);
  createReferralUser.rewardsTotal = createReferralUser.rewardsTotal.plus(event.params.createReferralReward);
  createReferralUser.updatedAt = event.block.timestamp;
  createReferralUser.save();

  let mintReferralUser = User.load(event.params.mintReferral.toHexString());
  if (!mintReferralUser) {
    mintReferralUser = createUser(event.params.mintReferral.toHexString(), event.block.timestamp, event.address.toHexString());
  }
  mintReferralUser.mintReferralRewardsTotal = mintReferralUser.mintReferralRewardsTotal.plus(event.params.mintReferralReward);
  mintReferralUser.rewardsTotal = mintReferralUser.rewardsTotal.plus(event.params.mintReferralReward);
  mintReferralUser.updatedAt = event.block.timestamp;
  mintReferralUser.save();

  let firstMinterUser = User.load(event.params.firstMinter.toHexString());
  if (!firstMinterUser) {
    firstMinterUser = createUser(event.params.firstMinter.toHexString(), event.block.timestamp, event.address.toHexString());
  }
  firstMinterUser.firstMinterRewardsTotal = firstMinterUser.firstMinterRewardsTotal.plus(event.params.firstMinterReward);
  firstMinterUser.rewardsTotal = firstMinterUser.rewardsTotal.plus(event.params.firstMinterReward);
  firstMinterUser.updatedAt = event.block.timestamp;
  firstMinterUser.save();

  let zoraUser = User.load(event.params.zora.toHexString());
  if (!zoraUser) {
    zoraUser = createUser(event.params.zora.toHexString(), event.block.timestamp, event.address.toHexString());
  }
  zoraUser.zoraRewardsTotal = zoraUser.zoraRewardsTotal.plus(event.params.zoraReward);
  zoraUser.rewardsTotal = zoraUser.rewardsTotal.plus(event.params.zoraReward);
  zoraUser.updatedAt = event.block.timestamp;
  zoraUser.save();

  let fromUser = User.load(event.params.from.toHexString());
  if (!fromUser) {
    fromUser = createUser(event.params.from.toHexString(), event.block.timestamp, event.address.toHexString());
  }
}

export function handleWithdraw(event: WithdrawEvent): void {
  let fromUser = User.load(event.params.from.toHexString());
  if (!fromUser) {
    fromUser = createUser(event.params.from.toHexString(), event.block.timestamp, event.address.toHexString());
  }
  let toUser = User.load(event.params.to.toHexString());
  if (!toUser) {
    toUser = createUser(event.params.to.toHexString(), event.block.timestamp, event.address.toHexString());
  }

  toUser.rewardsClaimed = toUser.rewardsClaimed.plus(event.params.amount);
  toUser.updatedAt = event.block.timestamp;
  toUser.save();
}

function createUser(address: string, createdAt: BigInt, source: string): User {
  let user = new User(address);
  user.createdAt = createdAt;
  user.updatedAt = createdAt;
  user.rewardsTotal = BigInt.fromI32(0);
  user.rewardsClaimed = BigInt.fromI32(0);
  user.creatorRewardsTotal = BigInt.fromI32(0);
  user.createReferralRewardsTotal = BigInt.fromI32(0);
  user.mintReferralRewardsTotal = BigInt.fromI32(0);
  user.firstMinterRewardsTotal = BigInt.fromI32(0);
  user.zoraRewardsTotal = BigInt.fromI32(0);
  user.source = source;
  user.save();
  return user;
}
