pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MemoryToken is ERC721URIStorage{
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    //Construtor do contrato (Nome, simbolo do token)
    constructor() ERC721("Memory token", "MTK"){}



    function mint(address _wallet, string memory _tokenURI) public returns(uint256){
        uint256 tokenId = _tokenIdCounter.current();

        
        _safeMint(_wallet, tokenId);//minta a nft
        _setTokenURI(tokenId, _tokenURI); //Cria um ponteiro para a url da nft

        ///Incrementa o contador de tokens gerado
        _tokenIdCounter.increment();

        return tokenId;
    }
}