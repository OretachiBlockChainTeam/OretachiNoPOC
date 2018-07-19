pragma solidity ^0.4.24;

import "https://github.com/OretachiBlockChainTeam/OretachiNoPOC/PersonContractIF.sol" ;

contract HellowWorld{

    address[] public tmpAdList;
    address[] public adList;
    uint public listLength = 0;
    
    constructor() public {
        
    }
    
    function addAddress(address toAdded) public payable{
        uint len = adList.length;
        uint i = 0;
        
        tmpAdList = new address[](len);
        for(i = 0; i < len ;i++){
            tmpAdList[i] = adList[i];
        }
        
        adList = new address[](len + 1);
        
        for(i = 0; i < len ;i++){
            adList[i] = tmpAdList[i];
        }
        adList[len] = toAdded;
        listLength = adList.length;
    }
    
    function callBonjuors() public payable{
        uint i = 0;
        for(i = 0; i < adList.length ;i++){
            callBonjuor(adList[i]);
        }
    }
    
    function callBonjuor(address bonjourAddress){
        ContractIF con = ContractIF(bonjourAddress);
        con.notifyCall();
        
    }
}
