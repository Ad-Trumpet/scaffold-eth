pragma solidity >=0.6.0 <0.7.3;
pragma experimental ABIEncoderV2;

import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Donator {
    uint256 totalDonatedAllCauses;
    //uint256 public totalDonated;
    uint256 public causeRegistrationFee = .1 ether;
    address payable public owner;

    struct Donor {
        address payable id;
        string donorHash;
    }    

    struct Donation {
        uint256 id;
        uint256 amount;
        uint256 causeId;
    }

    struct Cause {
        uint256 id;
        address payable owner;
        uint256 totalCollected;
        string title;
        string videoUrl;
    }

    Donor[] public donorArray;
    Cause[] public causesArray;
    Donation[] public donationsArray;

    mapping(address => Donor) public donors;
    mapping(uint256 => Donation) public donations;
    mapping(uint256 => Cause) public causes;

    uint256 public donorCount = 0;
    uint256 public donationCount = 0;
    uint256 public causeCount = 0;


    modifier onlyOwner() {
        require (msg.sender != owner);
        _;
    }

    // Ability for anonymous donations
    event DonorAdded(address id, string donorHash);
    event CauseAdded(uint256 id, string title, string videoUrl, uint256 value, address owner);
    event DonationMade(address donor, uint256 amount, uint256 causeId, uint256 date);
    event WithdrawMade(uint256 date, uint256 amount);

    constructor () public {
        //owner = _owner;
    }

    /**
    * @dev addDonor
    *
    */
    // ToDo: make a reference to ipfs to store the donor info, too expensive to store onchain
    function addDonor(string memory _donorHash)
        public
        returns (bool)
    {
        // Make sure the donor does not already exist
        require(msg.sender != donors[msg.sender].id, "The Donor already exists");
        
        // ** Haven't decided which one to use yet **
        // Add to mapping
        donorCount = donorCount + 1;
        donors[msg.sender] = Donor(msg.sender, _donorHash);

        // Add to array
        donorArray.push(Donor(msg.sender, _donorHash));

        emit DonorAdded(msg.sender, _donorHash);
        return true;
    }

    function totalDonationsForCause(uint256 _id) 
        public view returns(uint256) 
    {
        Cause memory cause = causes[_id];
        uint256 donated = cause.totalCollected;

        return donated;
    }

    // may not want this for privacy concerns... leave it up to the 
    // donor to keep track of their donations.
    //  function totalDonationsForDonor(address _donor) 
    //     public view returns(uint256 total) 
    // {
    //     Donor memory donor = donors[_donor];

    //     return 0;
    // }

    function getDonorCount()
        public 
        view
        returns (uint256)
    {
        return donorCount;
    }

    function getDonor(address payable _address)
        public
        view
        returns(Donor memory)
    {
        return donors[_address];
    }

    function getAllDonors()
        public
        view
        returns(Donor[] memory)
    {
        Donor[] memory ret = new Donor[](donorCount);
        for(uint i = 0; i < donorCount; i++) {
            ret[i] = donorArray[i];
        }

        return ret;
    }


    function totalDonationsAllCauses() 
        public view returns(uint256) 
    {
        return totalDonatedAllCauses;
    }

    function addCause(string memory _title, string memory _videoUrl)
        public payable
        returns (uint256) 
    {
        require(msg.value >= causeRegistrationFee, "addCause::Need to send more ether for registration (0.1 ETH)");
        causeCount = causeCount + 1;

        Cause memory cause = Cause(causeCount, msg.sender, msg.value, _title, _videoUrl);
        causes[causeCount] = cause;

        causesArray.push(Cause(causeCount, msg.sender, msg.value, _title, _videoUrl));

        emit CauseAdded(causeCount, _title, _videoUrl, msg.value, msg.sender);

        return causeCount;
    }

    function getCauseCount()
        public 
        view
        returns (uint256)
    {
        return causeCount;
    }

    function getCause(uint256 _causeId)
        public
        view
        returns(Cause memory)
    {
        return causes[_causeId];
    }

    function getAllCauses()
        public
        view
        returns(Cause[] memory)
    {
        Cause[] memory ret = new Cause[](causeCount);
        for(uint i = 0; i < causeCount; i++) {
            ret[i] = causesArray[i];
        }

        return ret;
    }

    function donate(uint256 _causeId)
        public payable 
        returns (bool) 
    {
        uint256 id = donationCount ++;
        
        Cause memory cause = causes[_causeId];
        cause.totalCollected = cause.totalCollected + msg.value;

        causesArray[_causeId - 1].totalCollected = causesArray[_causeId - 1].totalCollected + msg.value;

        totalDonatedAllCauses= totalDonatedAllCauses + cause.totalCollected;
        
        Donation memory donation = Donation(id, msg.value, _causeId);
        donations[_causeId - 1] = donation;
        
        emit DonationMade(msg.sender, msg.value, _causeId, block.timestamp);
        return true;
    }

    function getDonationsForCause(uint256 _causeId)
        public
        returns (Donation[] memory)
    {
        return donationsArray;
    }

    function withdraw(uint amount)
        public onlyOwner 
    {
        require(amount <= address(this).balance);
        msg.sender.transfer(amount);

        emit WithdrawMade(block.timestamp, amount);
    }

}

