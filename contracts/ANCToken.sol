//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ANCToken is Ownable, ERC20 {

  constructor(uint256 _initialSupply) ERC20('ANC Token', 'ANC') {
    _mint(msg.sender, _initialSupply);
  }
}
