//SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.16;

interface IStrainFactory {

    function safeMint(uint _times) external;

    // The following functions are overrides required by Solidity.

    function supportsInterface(bytes4 interfaceId)
        external
        view 
        returns (bool);
}