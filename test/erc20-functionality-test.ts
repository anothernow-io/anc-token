import { ethers } from "hardhat"
import { expect } from "chai"
import { Contract, Signer, BigNumber } from 'ethers'

const DECIMALS = 9
const INITIAL_SUPPLY = ethers.utils.parseUnits('50', 6 + DECIMALS)
const TRANSFER_AMOUNT = 100

describe("ANCToken:ERC20", () => {
  
  let anctoken: Contract, owner: Signer, addr1: Signer, addr2: Signer

  before(async () => {
    [owner, addr1, addr2] = await ethers.getSigners()
    const ANCToken = await ethers.getContractFactory("ANCToken")
    anctoken = await ANCToken.deploy(INITIAL_SUPPLY)
  })

  it("totalSuppy", async () => {
    expect(await anctoken.totalSupply()).to.eq(INITIAL_SUPPLY)
  })

  describe('balanceOf', () => {
    it('when sender account has no tokens', async () => {
      expect(await anctoken.balanceOf(addr1.getAddress())).to.eq(0)
    })

    it('when sender account has some tokens', async () => {
      expect(await anctoken.balanceOf(owner.getAddress())).to.eq(INITIAL_SUPPLY)
    })
  })

  describe('ANCToken:ERC20:transfer', () => {
    describe('when the sender does not have enough balance', () => {
      it('reverts', async () =>{
        await expect(
          anctoken
            .connect(owner)
            .transfer(await addr1.getAddress(), INITIAL_SUPPLY.add(1)),
        ).to.be.reverted
      })
    })

    describe('when the sender do have enough balance', () => {
      it('should emit a Transfer event with proper arguments', async () => {
        await expect(anctoken.connect(owner).transfer(await addr1.getAddress(), TRANSFER_AMOUNT))
          .to.emit(anctoken, 'Transfer')
          .withArgs(
            await owner.getAddress(),
            await addr1.getAddress(),
            TRANSFER_AMOUNT
          )
      })

      it('should transfer the requested amount', async () => {
        const from_balance = await anctoken.balanceOf(await owner.getAddress())
        const to_balance = await anctoken.balanceOf(await addr1.getAddress())
        const supply = await anctoken.totalSupply()
        expect(supply.sub(TRANSFER_AMOUNT)).to.eq(from_balance)
        expect(to_balance).to.eq(TRANSFER_AMOUNT)
      })
    })
  })
})
