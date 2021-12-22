const { assert } = require('chai')
const MemoryToken = artifacts.require('./contracts/MemoryToken.sol')

require('chai').use(require('chai-as-promised')).should()

contract('MemoryToken', (accounts) => {
    let token

    //testando deploy do contrato
    //Cenario 1
    describe('deployment', async ()=>{
        it('deploys successfully', async ()=> {
            token = await MemoryToken.deployed()

            const address = token.address

            assert.notEqual(address, '0x0')
            assert.notEqual(address, '')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
        })

        it('has a name', async ()=>{
            const name = await token.name()

            assert.equal(name, 'Memory token')
        })

        it('has a symbol', async ()=>{
            const symbol = await token.symbol()

            assert.equal(symbol, 'MTK')
        })
    })

    //testando se NFT esta sendo mintada e distribuida na rede
    //Cenario 2
    describe('token distribution', async ()=>{
        let result

        it('mints tokens', async ()=>{
            //Testa se a NFT foi mintada
            await token.mint(accounts[0], 'http://ww.token-uri.com/nft')

            result = await token.totalSupply()
            assert.equal(result.toString(), '1', 'total supply is correct')

            //Testa se o balanço da NFT foi alterado
            result = await token.balanceOf(accounts[0])
            assert.equal(result.toString(), '1', 'balanceOf is correct')

            //Testa se o NFT esta sendo atribuido a sua respectiva carteira
            result = await token.ownerOf('0') //retorna a carteira de indice 0
            assert.equal(result.toString(), accounts[0].toString(), 'ownerOf is correct')
            result = await token.tokenOfOwnerByIndex(accounts[0], 0)
        
            //Testa se dono pode ver todos os NFT da sua carteira
            let balanceOf = await token.balanceOf(accounts[0])
            let tokenIds = []
            for(let i = 0; i < balanceOf; i++){
                let id = await token.tokenOfOwnerByIndex(accounts[0], i) //retorna id de cada token da carteira
                tokenIds.push(id.toString())
            }

            let expected = ['0']
            assert.equal(tokenIds.toString(), expected.toString(), 'tokenIds are correct')
        
            //Testa se o token esta armazeno a URL correta da imagem
            let tokenURI = await token.tokenURI('0')
            assert.equal(tokenURI, 'https://www.token-uri.com/nft')
        })
    })
})