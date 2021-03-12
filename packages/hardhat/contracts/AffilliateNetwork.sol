pragma solidity >=0.6.0 <0.7.3;
pragma experimental ABIEncoderV2;

import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AffilliateNetwork is Ownable {

    uint256 public maxLevel = 25;


    mapping(address => uint256) public affilliateLevel;
    mapping(address => uint256) public affilliateBalance;

    struct Affilliate {
        address payable addr;

    }

    constructor () public {

    }
}