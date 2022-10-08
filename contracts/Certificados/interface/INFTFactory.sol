//SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.14;

interface IStrainFactory {


    function pause() external;

    function unpause() external;

    function safeMint(address to, uint256 tokenId) external;

    // The following functions are overrides required by Solidity.

    function supportsInterface(bytes4 interfaceId)
        external
        view 
        returns (bool);
}