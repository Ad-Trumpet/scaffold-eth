pragma solidity >=0.6.0 <0.7.3;
pragma experimental ABIEncoderV2;

import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TrumpetToken is Ownable, ERC20 {

    mapping(address => uint256) public userBalances;
    

    constructor () 
        public
        ERC20("Trumpet Token", "TRUMPET")   
    {
        
    }
}