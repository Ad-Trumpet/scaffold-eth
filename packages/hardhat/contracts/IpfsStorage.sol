pragma solidity >=0.6.0 <0.7.3;
pragma experimental ABIEncoderV2;

import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract IpfsStorage {

    mapping(address => string) public userFiles;

    function setFile(string calldata _file) external {
        console.log('Setting user file to', _file);
        userFiles[msg.sender] = _file;
    }

    

}