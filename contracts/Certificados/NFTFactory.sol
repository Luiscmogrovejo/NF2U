// SPDX-License-Identifier: MIT

pragma solidity ^0.8.16;

import "./ERC721.sol";
import { 
    IConstantFlowAgreementV1 
} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/agreements/IConstantFlowAgreementV1.sol";

import {
    CFAv1Library, ISuperfluid
} from "@superfluid-finance/ethereum-contracts/contracts/apps/CFAv1Library.sol";

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
