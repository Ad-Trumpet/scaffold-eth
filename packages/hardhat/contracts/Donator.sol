pragma solidity >=0.6.0 <0.7.3;
pragma experimental ABIEncoderV2;

//import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol"; 
//https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol

contract Donator {
    uint256 totalDonatedAllCauses;
    uint256 totalDonated;
    uint256 causeRegistrationFee = .1 ether;
    address payable owner;

    struct Donor {
        address payable id;
        string fname;
        string lname;
        string email;
        string telephone;
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
    event DonorAdded(address id, string fname, string lname, string email, string telephone);
    event CauseAdded(uint256 id, string title, string videoUrl, uint256 value, address owner);
    event DonationMade(uint256 amount, uint256 causeId, uint256 date);
    //event Donation()

    constructor () public {
        //owner = _owner;
    }

    function addDonor(string memory _fname, string memory _lname, string memory _email, string memory _telephone, string memory _address)
        public
        returns (bool )
    {
        Donor memory donor = Donor(msg.sender, _fname, _lname, _email, _telephone);
        donorCount = donorCount + 1;
        donors[msg.sender] = donor;

        //donorArray[donorCount] memory da = Donor(msg.sender, _fname, _lname, _email, _telephone);
        donorArray.push(Donor(msg.sender, _fname, _lname, _email, _telephone));

        emit DonorAdded(msg.sender, _fname, _lname, _email, _telephone);
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

    function getDonor(uint256 _donorId)
        public
        view
        returns(Donor memory)
    {
        return donorArray[_donorId];
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
        require(msg.value >= causeRegistrationFee, "addCause::Need to send more ether");
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
        return causesArray[_causeId];
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

        totalDonatedAllCauses= totalDonatedAllCauses + cause.totalCollected;
        
        Donation memory donation = Donation(id, msg.value, _causeId);
        donations[id] = donation;
        
        emit DonationMade(msg.value, _causeId, block.timestamp);
        return true;
    }


    function withdraw(uint amount)
        public onlyOwner 
    {
        require(amount <= address(this).balance);
        msg.sender.transfer(amount);
    }

}

