import React, { useState, useEffect } from "react";
import { List, Space, Input, DatePicker, Slider, Switch, Progress, Spin } from "antd";
import { SyncOutlined, DollarOutlined, MessageOutlined, LikeOutlined, StarOutlined  } from '@ant-design/icons';
import { Checkbox, Form, Card, Divider, Image,  Button, Confirm, Item, Segment, Modal, Header, Icon } from 'semantic-ui-react';

import { Address, Balance } from "../components";
import { parseEther, formatEther } from "@ethersproject/units";
import ReactPlayer from 'react-player/lazy'

// IPFS
import IPFS from 'ipfs';
let node;

async function initIpfs() {
    node = await IPFS.create();
    const version = await node.version();
    console.log(`IPFS Node Version ${version.version}`);
}

// Sia Skynet
// const { SkynetClient } = require('@nebulous/skynet');
// const skynetClient = new SkynetClient();

// async function uploadFileToSia(file) {
//     const skylink = await skynetClient.uploadFile(file);
//     console.log(`Upload Successful, Skylink:: ${skylink}`)
// }

// async function downloadFileFromSia(file, skylink) {
//     await skynetClient.downloadFile(file, skylink);
//     console.log(`Download Successful`);
// }


const AddCause = ({ address, mainnetProvider, userProvider, localProvider, yourLocalBalance, price, tx, readContracts, writeContracts }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [telephone, setTelephone] = useState('');
    const [physAddress, setAddress] = useState('');
    const [donors, setDonors] = useState([]);
    const [ipfsHash, setIpfsHash] = useState();
    const [donorData, setDonorData] = useState([]);
    const [donorHash, setDonorHash] = useState('')

    useEffect(() => {
        initIpfs();        
    }, [])

    

    async function readCurrentDonorFiles() {
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

    // async function uploadFile(file) {
    //     const files = [{ path: file.name + file.path, content: file }];
    //     for await (const result of node.add(files)) {
    //         await setFile(result.cid.string);
    //     }
    // }



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
               
                <br/>
                {/* <Button onClick={() => uploadFileToSia('./test.json')}>Upload to Skynet</Button> */}
                <br />
                <Button 
                    block
                    type='primary'
                    onClick={(e) => {
                        // todo: get the ipfs hash for the data



                        // tx( writeContracts.IpfsStorage.setFile(
                        //             firstName + '_'
                        //             .concat(lastName + '_')
                        //             .concat(email + '_')
                        //             .concat(telephone + '_')
                        //             .concat(physAddress)
                        //         ) 
                        //     );
                        readCurrentDonorFiles().then((res, err) => {
                            const data = res.split('_');
                            console.log(data)
                            setDonorData(data);
                            console.log(`Donor data: ${data}`);

                        });
                        // tx({
                        //     to: writeContracts.Donator.address,
                        //     //value: parseEther("0.01"), // Always Free
                        //     data: writeContracts.Donator.interface.encodeFunctionData(
                        //         "addDonor(string)",
                        //         []),
                        //     gasPrice: 5300000,
                        //     gasLimit: 9500000
                        // });
                       
                    }}>
                   
                    Add Donor
                </Button>
            
            </div>
            <Divider horizontal>
                <Header as='h4'>
                    <Icon name='cloud' />
                    Current Donor Info                    
                </Header>
            </Divider>
            <div>
                <Card>
                    <Card.Content>
                        <Image
                            floated='right'
                            size='mini'
                            src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
                        />
                        <Card.Header>{firstName} {lastName}</Card.Header>
                        <Card.Meta>the meta</Card.Meta>
                        <Card.Description>

                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <div className='ui two buttons'>
                        <Button basic color='green'>
                            Donate
                        </Button>
                        <Button basic color='red'>
                            Profile
                        </Button>
                        </div>
                    </Card.Content>
                </Card>
            </div>
            <Divider horizontal>
                <Header as='h4'>
                    <Icon name='database' />
                    Donors
                </Header>
            </Divider>
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
                            title={donorData.firstName}
                            description={'this is a description'}
                        />

                        <Address value={item.id} />
                            {item.donorHash}
                        </List.Item>
                       
                    )
                }) : 'Loading...'}
                </List>
           </div>
        </div>

    )
}

export default AddCause;