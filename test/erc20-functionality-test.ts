
import { ethers } from "hardhat"
import { expect } from "chai"
import { Contract, Signer } from 'ethers'

const DECIMALS = 9
const INITIAL_SUPPLY = ethers.utils.parseUnits('50', 6 + DECIMALS)

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

  it('owner', async () => {
    expect(await anctoken.owner()).to.eq(await owner.getAddress())
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
      it.skip('should emit a Transfer event', async () => {

      })

      it.skip('should transfer the requested amount', async () => {
        
      })
    })
  })
})
