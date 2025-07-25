import { BigInt, log } from "@graphprotocol/graph-ts";
import {
  RewardsDeposit as RewardsDepositEvent,
} from "../generated/ProtocolRewards/ProtocolRewards"
import {
  User,
} from "../generated/schema"

const PODS_ADDRESS = "0x1c0e93f01b65fbc938b67a96f1c26bc27fd356a9".toLowerCase();

export function handleRewardsDeposit(event: RewardsDepositEvent): void {
  let zoraAddress = event.params.zora.toHexString().toLowerCase();
  let podsAddress = PODS_ADDRESS.toLowerCase();
  let origin = zoraAddress == podsAddress ? "pods" : "zora";
  
  // Debug logging - you can remove this later
  log.info("Zora address: {}, Pods address: {}, Origin: {}", [zoraAddress, podsAddress, origin]);

  let creatorUser = User.load(event.params.creator.toHexString().toLowerCase() + origin);
  if (!creatorUser) {
    creatorUser = createUser(event.params.creator.toHexString().toLowerCase(), event.block.timestamp, event.address.toHexString(), origin);
  }
  creatorUser.creatorRewardsTotal = creatorUser.creatorRewardsTotal.plus(event.params.creatorReward);
  creatorUser.rewardsTotal = creatorUser.rewardsTotal.plus(event.params.creatorReward);
  creatorUser.updatedAt = event.block.timestamp;
  creatorUser.save();

  const createReferralAddress = event.params.createReferral.toHexString().toLowerCase();
  let createReferralUser = User.load(createReferralAddress + origin);
  if (!createReferralUser) {
    createReferralUser = createUser(createReferralAddress, event.block.timestamp, event.address.toHexString(), origin);
  }
  createReferralUser.createReferralRewardsTotal = createReferralUser.createReferralRewardsTotal.plus(event.params.createReferralReward);
  createReferralUser.rewardsTotal = createReferralUser.rewardsTotal.plus(event.params.createReferralReward);
  createReferralUser.updatedAt = event.block.timestamp;
  createReferralUser.save();

  const mintReferralAddress = event.params.mintReferral.toHexString().toLowerCase();
  let mintReferralUser = User.load(mintReferralAddress + origin);
  if (!mintReferralUser) {
    mintReferralUser = createUser(mintReferralAddress, event.block.timestamp, event.address.toHexString(), origin);
  }
  mintReferralUser.mintReferralRewardsTotal = mintReferralUser.mintReferralRewardsTotal.plus(event.params.mintReferralReward);
  mintReferralUser.rewardsTotal = mintReferralUser.rewardsTotal.plus(event.params.mintReferralReward);
  mintReferralUser.updatedAt = event.block.timestamp;
  mintReferralUser.save();

  const firstMinterAddress = event.params.firstMinter.toHexString().toLowerCase();
  let firstMinterUser = User.load(firstMinterAddress + origin);
  if (!firstMinterUser) {
    firstMinterUser = createUser(firstMinterAddress, event.block.timestamp, event.address.toHexString(), origin);
  }
  firstMinterUser.firstMinterRewardsTotal = firstMinterUser.firstMinterRewardsTotal.plus(event.params.firstMinterReward);
  firstMinterUser.rewardsTotal = firstMinterUser.rewardsTotal.plus(event.params.firstMinterReward);
  firstMinterUser.updatedAt = event.block.timestamp;
  firstMinterUser.save();

  const fromAddress = event.params.from.toHexString().toLowerCase();
  let fromUser = User.load(fromAddress + origin);
  if (!fromUser) {
    fromUser = createUser(fromAddress, event.block.timestamp, event.address.toHexString(), origin);
  }
}

function createUser(address: string, createdAt: BigInt, source: string, origin: string): User {
  let user = new User(address + origin);
  user.address = address;
  user.createdAt = createdAt;
  user.updatedAt = createdAt;
  user.rewardsTotal = BigInt.fromI32(0);
  user.creatorRewardsTotal = BigInt.fromI32(0);
  user.createReferralRewardsTotal = BigInt.fromI32(0);
  user.mintReferralRewardsTotal = BigInt.fromI32(0);
  user.firstMinterRewardsTotal = BigInt.fromI32(0);
  user.zoraRewardsTotal = BigInt.fromI32(0);
  user.source = source;
  user.origin = origin;
  user.save();
  return user;
}
