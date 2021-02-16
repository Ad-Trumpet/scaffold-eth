import React, { useState, useEffect } from "react";
import { Space, Button, Modal, List, Divider, Input, Card, DatePicker, Slider, Switch, Progress, Spin } from "antd";
import { SyncOutlined, DollarOutlined, MessageOutlined, LikeOutlined, StarOutlined  } from '@ant-design/icons';

import { Address, Balance } from "../components";
import { parseEther, formatEther } from "@ethersproject/units";
import ReactPlayer from 'react-player/lazy'

import IPFS from 'ipfs';
let node;

async function initIpfs() {
    node = await IPFS.create();
    const version = await node.version();
    console.log(`IPFS Node Version ${version.version}`);
}






const AddCause = ({ address, mainnetProvider, userProvider, localProvider, yourLocalBalance, price, tx, readContracts, writeContracts }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [telephone, setTelephone] = useState('');
    const [physAddress, setAddress] = useState('');
    const [donors, setDonors] = useState([]);
    const [ipfsHash, setIpfsHash] = useState();

    useEffect(() => {
        initIpfs();        
    }, [])

    

    async function readCurrentDonorFile() {
        const result = await readContracts.IpfsStorage.userFiles(
            address
        );
        return result;
    }

    async function setFile(hash) {
        const ipfsWithSigner = readContracts.IpfsStorage.connect(address);
        await ipfsWithSigner.setFile(hash);
        setIpfsHash(hash);
    }

    async function uploadFile(file) {
        const files = [{ path: file.name + file.path, content: file }];

        for await (const result of node.add(files)) {
            await setFile(result.cid.string);
        }
    }



    useEffect(() => {
        const data = readContracts ? readContracts.Donator.getAllDonors()
            .then((res, err) => {
                setDonors(res);
            }) : {}
    }, [readContracts])

    const IconText = ({ icon, text }) => (
        <Space>
            {React.createElement(icon)}
            {text}
        </Space>
    );

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
                        //tx( writeContracts.IpfsStorage.setFile(firstName.concat(lastName).concat(email).concat(telephone).concat(physAddress)) );
                        readCurrentDonorFile().then((res, err) => console.log(res));
                        // tx({
                        //     to: writeContracts.Donator.address,
                        //     //value: parseEther("0.01"), // Always Free
                        //     data: writeContracts.Donator.interface.encodeFunctionData(
                        //         "addDonor(string, string, string, string, string)",
                        //         [firstName, lastName, email, telephone, physAddress]),
                        //     gasPrice: 53000000000,
                        //     gasLimit: 9500000
                        // });
                       
                    }}>
                   
                    Add Donor
                </Button>
            
            </div>
            
            <div>
                {/* List of Donors */}
            <List>
                {donors ? donors.map((item) => {
                    return (
                        <List.Item
                            actions={[
                                <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                                <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                                <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                            ]}
                            extra={
                                <img
                                    width={100}
                                    alt="logo"
                                    src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                                />
                            }>
                        <List.Item.Meta
                            title={'blah blah blah'}
                            description={'this is a description'}
                        />

                        <Address value={item.id} />
                            {item.fname} 
                            {item.lname} 
                            {item.email}
                            {item.telephone}
                            {item.physicalAddress}
                        </List.Item>
                       
                    )
                }) : 'Loading...'}
                </List>
           </div>
        </div>

    )
}

export default AddCause;