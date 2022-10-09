// SPDX-License-Identifier: MIT

pragma solidity ^0.8.16;

import "./ERC721.sol";

contract NF2U {
    event RoundCreated(MyToken contractAddress);
    constructor() {

    }

    function _mintNewNFT(
        uint256 _cost,
        address _vault,
        string memory name,
        string memory symbol,
        address _admin
    ) public returns (MyToken _contract) {
         MyToken newRound = new MyToken(_cost, _vault, name, symbol, _admin);
         emit RoundCreated(newRound);
         return newRound;
    }
}
