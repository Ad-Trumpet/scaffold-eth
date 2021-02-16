/* eslint-disable jsx-a11y/accessible-emoji */

import React, { useState } from "react";
import { Button, List, Divider, Input, Card, DatePicker, Slider, Switch, Progress, Spin } from "antd";
import { SyncOutlined } from '@ant-design/icons';
import { Address, Balance } from "../components";
import { parseEther, formatEther } from "@ethersproject/units";

export default function ExampleUI({
  donationEvents, 
  causeEvents, 
  donorEvents, 
  address, 
  mainnetProvider, 
  userProvider, 
  localProvider, 
  yourLocalBalance, 
  price, 
  tx, 
  readContracts, 
  writeContracts 
}) {

  const [newPurpose, setNewPurpose] = useState("loading...");

  return (
    <div>
       <div style={{ width:600, margin: "auto", marginTop:32, paddingBottom:32 }}>
        <h2>Causes:</h2>
        <List
          bordered
          dataSource={causeEvents}
          renderItem={(item) => {
            return (              
              <List.Item key={item.blocknumber}>
                <Address
                    value={item.owner}
                    ensProvider={mainnetProvider}
                    fontSize={16}
                  />
                {item.id.toNumber()} -- {item.title} -- {item.videoUrl} -- {formatEther(item.value)} --                
              </List.Item>
            )
          }}
        />
      </div>

      <div style={{ width:600, margin: "auto", marginTop:32, paddingBottom:32 }}>
        <h2>Donors:</h2>
        <List
          bordered
          dataSource={donorEvents}
          renderItem={(item) => {
            return (              
              <List.Item key={item.blocknumber}>
                  {item.id} -- {item.fname} -- {item.lname} -- {item.email} -- {item.telephone} -- {item.physicalAddress}
                
              </List.Item>
            )
          }}
        />
      </div>



      {/*
        ⚙️ Here is an example UI that displays and sets the purpose in your smart contract:
      */}
      <div style={{border:"1px solid #cccccc", padding:16, width:400, margin:"auto",marginTop:64}}>
      
      <h2>Donations:</h2>
        <List
          bordered
          dataSource={donationEvents}
          renderItem={(item) => {
            return (              
              <List.Item key={item.blocknumber}>
                Donor: {item.donor}  Date: {item.date.toString()}  Id: {item.causeId.toNumber()} Amount: {formatEther(item.amount.toString())} Ξ              
              </List.Item>
            )
          }}
        />
      </div>
      {/*
        ⚙️ Here is an example UI that displays and sets the purpose in your smart contract:
      */}
      <div style={{border:"1px solid #cccccc", padding:16, width:400, margin:"auto",marginTop:64}}>
      
       
        <Divider />

        <div style={{margin:8}}>
          <Button onClick={()=>{
            /*
              you can also just craft a transaction and send it to the tx() transactor
              here we are sending value straight to the contract's address:
            */
            tx({
              to: writeContracts.YourContract.address,
              value: parseEther("0.001")
            });
            /* this should throw an error about "no fallback nor receive function" until you add it */
          }}>Send Value</Button>
        </div>        

        <div style={{margin:8}}>
          <Button onClick={()=>{
            /* you can also just craft a transaction and send it to the tx() transactor */
            tx({
              to: writeContracts.YourContract.address,
              value: parseEther("0.001"),
              data: writeContracts.YourContract.interface.encodeFunctionData("setPurpose(string)",["🤓 Whoa so 1337!"])
            });
            /* this should throw an error about "no fallback nor receive function" until you add it */
          }}>Another Example</Button>
        </div>
      </div>   
    </div>
  );
}
