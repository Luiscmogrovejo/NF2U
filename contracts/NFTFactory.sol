// SPDX-License-Identifier: MIT

pragma solidity ^0.8.14;

import "./ERC721.sol";

contract NF2U {
    uint256 public tokenCounter;

    constructor() {
        tokenCounter = 1;
    }

    function _mintNewNFT(
        ISuperfluid host,
        string memory name,
        string memory symbol,
        string memory tokenUri
    ) public {
        uint256 newTokenId = tokenCounter;
        new MyToken(host, name, symbol, tokenUri, newTokenId);
        tokenCounter += 1;
    }
}
