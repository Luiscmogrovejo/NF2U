// SPDX-License-Identifier: MIT

pragma solidity ^0.8.16;

import "./ERC721.sol";

contract NF2U {

    constructor() {

    }

    function _mintNewNFT(
        uint256 _cost,
        address _vault,
        string memory name,
        string memory symbol
    ) public {
        new MyToken(_cost, _vault, name, symbol);
    }
}
