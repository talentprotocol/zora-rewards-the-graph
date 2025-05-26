import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, Bytes, BigInt } from "@graphprotocol/graph-ts"
import { Deposit } from "../generated/schema"
import { Deposit as DepositEvent } from "../generated/ProtocolRewards/ProtocolRewards"
import { handleDeposit } from "../src/protocol-rewards"
import { createDepositEvent } from "./protocol-rewards-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let from = Address.fromString("0x0000000000000000000000000000000000000001")
    let to = Address.fromString("0x0000000000000000000000000000000000000001")
    let reason = Bytes.fromI32(1234567890)
    let amount = BigInt.fromI32(234)
    let comment = "Example string value"
    let newDepositEvent = createDepositEvent(from, to, reason, amount, comment)
    handleDeposit(newDepositEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("Deposit created and stored", () => {
    assert.entityCount("Deposit", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "Deposit",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "from",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "Deposit",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "to",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "Deposit",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "reason",
      "1234567890"
    )
    assert.fieldEquals(
      "Deposit",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "amount",
      "234"
    )
    assert.fieldEquals(
      "Deposit",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "comment",
      "Example string value"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
