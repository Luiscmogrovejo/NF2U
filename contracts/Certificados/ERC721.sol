// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract MyToken is
    ERC721,
    ERC721Enumerable,
    Pausable,
    ERC721Burnable,
    ERC721URIStorage
{
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;
    address admin;
    uint256 cost;
    address vault;

    AggregatorV3Interface internal priceFeed;
    event Minted (address _owner, string _type);
    event Metadata (address _owner, uint _id);
    constructor(
        uint256 _cost,
        address _vault,
        string memory name,
        string memory symbol,
        address _admin
    ) ERC721(name, symbol) {
        priceFeed = AggregatorV3Interface(
            0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e
        );
        admin = _admin;
        cost = _cost;
        vault = _vault;
    }

    modifier isAdmin() {
        require(admin == msg.sender, "Not Owner");
        _;
    }

    function pause() public isAdmin {
        _pause();
    }

    function unpause() public isAdmin {
        _unpause();
    }

    function safeMint() public isAdmin returns(uint _id) {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        emit Minted(msg.sender,"Certificado");
        _safeMint(msg.sender, tokenId);
        return tokenId;
    }

    function metadata(uint _id,string memory _data) public isAdmin {
        _setTokenURI(_id,_data);
        emit Metadata(msg.sender, _id);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override(ERC721, ERC721Enumerable) whenNotPaused {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    // The following functions are overrides required by Solidity.

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function getLatestPrice() public view returns (int256) {
        (
            ,
            /*uint80 roundID*/
            int256 price, /*uint startedAt*/
            ,
            ,

        ) = /*uint timeStamp*/
            /*uint80 answeredInRound*/
            priceFeed.latestRoundData();
        return price;
    }

    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
        isAdmin
    {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        isAdmin
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
}
