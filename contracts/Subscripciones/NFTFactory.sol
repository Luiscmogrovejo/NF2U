// SPDX-License-Identifier: MIT

pragma solidity ^0.8.14;

import "./ERC721.sol";
import { 
    IConstantFlowAgreementV1 
} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/agreements/IConstantFlowAgreementV1.sol";

import {
    CFAv1Library, ISuperfluid
} from "@superfluid-finance/ethereum-contracts/contracts/apps/CFAv1Library.sol";

contract NF2U {
    uint256 public tokenCounter;


    constructor() {
        tokenCounter = 1;
    }

    function _mintNewNFT(
        uint price,
        address vault,
        string memory name,
        string memory symbol,
        string memory tokenUri
    ) public {
        uint256 newTokenId = tokenCounter;
        new MyToken(price, vault, name, symbol, tokenUri, newTokenId);
        tokenCounter += 1;
    }
}
