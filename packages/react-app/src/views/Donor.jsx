import React, { useState } from "react";
import { Button, Modal, List, Divider, Input, Card, DatePicker, Slider, Switch, Progress, Spin } from "antd";
import { SyncOutlined, DollarOutlined } from '@ant-design/icons';
import { Address, Balance } from "../components";
import { parseEther, formatEther } from "@ethersproject/units";
import ReactPlayer from 'react-player/lazy'


const AddCause = ({ address, mainnetProvider, userProvider, localProvider, yourLocalBalance, price, tx, readContracts, writeContracts }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [telephone, setTelephone] = useState('');
    const [physAddress, setAddress] = useState('');

    return (
        <div id='main-container' style={{ width: 600, margin: 'auto' }}>           
            <div>
                <h3>Add a new Donor </h3>
                First Name:
                <Input placeholder='First Name'
                    onChange={(e) => {
                        setFirstName(e.target.value);
                    }}
                />
                Last Name:
                 <Input placeholder='Last Name'
                    onChange={(e) => {
                        setLastName(e.target.value);
                    }}
                />
                 Email:
                 <Input placeholder='Email'
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                />
                 Telephone:
                 <Input placeholder='Telephone'
                    onChange={(e) => {
                        setTelephone(e.target.value);
                    }}
                />
                 Address:
                 <Input placeholder='Address'
                    onChange={(e) => {
                        setAddress(e.target.value);
                    }}
                />
               
                <br/><br />
                <Button 
                    block
                    type='primary'
                    onClick={(e) => {
                        tx({
                            to: writeContracts.Donator.address,
                            //value: parseEther("0.01"), // Always Free
                            data: writeContracts.Donator.interface.encodeFunctionData(
                                "addDonor(string, string, string, string, string)",
                                [firstName, lastName, email, telephone, physAddress]),
                            gasPrice: 53000000000,
                            gasLimit: 9500000
                        });
                       
                    }}>
                   
                    Add Donor
                </Button>
            
            </div>
            {/* List of Donors */}
            <div>

           </div>
        </div>

    )
}

export default AddCause;