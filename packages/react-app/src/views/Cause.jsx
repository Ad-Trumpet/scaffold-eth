import React, { useState, useEffect, useMemo, useReducer } from "react";
import { Link } from 'react-router-dom';
import { Divider, DatePicker, Slider, Switch, Progress, Spin, Space, Avatar } from "antd";
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import { List, Checkbox, Form, Card, Button, Image, Confirm, Item, Segment, Modal } from 'semantic-ui-react';
import { Address, Balance } from "../components";
import { useExchangePrice, useGasPrice, useUserProvider, useContractLoader, useContractReader, useEventListener, useBalance, useExternalContractLoader, usePoller } from "../hooks";
import { parseEther, formatEther } from "@ethersproject/units";
import ReactPlayer from 'react-player/lazy';
import ReactPlayerYT from 'react-player/youtube';

import Donate from './Donate';

const Cause = ({ address, mainnetProvider, userProvider, localProvider, yourLocalBalance, price, tx, readContracts, writeContracts }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    // show the featured video at top of window...
    const [causeName, setCauseName] = useState('');
    const [causeVideoUri, setCauseVideoUri] = useState('');
    const [causes, setCauses] = useState([]);
    const [confirmAddCause, setConfirmAddCause] = useState(false);

    const [open, setOpen] = useState(false);
    
    useEffect(() => {
        const data = readContracts ? readContracts.Donator.getAllCauses().then((res, err) => {
                setCauses(res);
            }) : {};
    }, [readContracts]);

    // function getAllCauses () {
    //    return readContracts ? readContracts.Donator.getAllCauses().then((res, err) => {
    //             setCauses(res);
    //             console.table(causes);
    //         }) : {};
    // }

    const addCause = (causeName, causeVideoUri) => {
        tx({
            to: writeContracts.Donator.address,
            value: parseEther("0.1"), // Always .1 Ether to add a cause
            data: writeContracts.Donator.interface.encodeFunctionData(
                "addCause(string, string)",
                [causeName, causeVideoUri]),
            gasPrice: 8500000,
            gasLimit: 9500000
        });
    }

    const donate = (causeId, donationAmount) => {
        tx( writeContracts.Donator.donate(causeId, {
            value: parseEther(donationAmount)
        }));
    }

    const IconText = ({ icon, text }) => (
        <Space>
            {React.createElement(icon)}
            {text}
        </Space>
    );

    return (
        <div id='main-container' style={{ width: 800, margin: 'auto' }}>
            <Card.Group>
                <Card fluid>
                <Card.Content>
                    <Card.Header>Add New Cause</Card.Header>
                    <Card.Meta>{new Date().now}</Card.Meta>
                    <Card.Description>
                        <Form>
                            <Form.Group widths='equal'>
                                <Form.Input style={{ paddingBottom: 20}}
                                    fluid
                                    id='name-of-cause-input'
                                    label='Name of Cause'
                                    placeholder='Name of Cause'
                                    onChange={(e) => {
                                        setCauseName(e.target.value);
                                }}/>

                                <Form.Input style={{ paddingBottom: 20}}
                                    fluid
                                    id='video-url-input'
                                    label='Video Url'
                                    placeholder='Url to your video ad'
                                    onChange={(e) => {
                                        setCauseVideoUri(e.target.value);
                                    }}
                                />                                
                            </Form.Group>
                            <Form.Group>
                                <Checkbox position='left' label='I agree to the Terms and Conditions' />
                            </Form.Group>
                        </Form>
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    
                    <Button
                        position='right'
                        color='violet'
                        type='primary'
                        onClick={(e) => {
                            setConfirmAddCause(true)
                    }}>
                        
                        Add Cause
                    </Button>
                    <Confirm
                        open={confirmAddCause}
                        onCancel={() => {setConfirmAddCause(false)}}
                        onConfirm={() => { addCause(causeName, causeVideoUri); setConfirmAddCause(false); }}
                    />
                </Card.Content>             
            </Card>
            </Card.Group>
            <br/><br />  
            {causeVideoUri && (
                <div className='video-preview center'>
                    <ReactPlayer className='react-player' url={causeVideoUri} />
                </div>
            )}
            <Divider/>
            <div id='list-of-causes'>
                <Item.Group>
                    {causes ? causes.map((item) => {
                    return (
                        <Item key={item.id}>
                            <Item.Image><ReactPlayer className='react-player' width={225} height={150} url={item.videoUrl} /></Item.Image>
                            <Item.Content>
                                <Item.Header>{item.owner}</Item.Header>
                                <Item.Header>{item.title}</Item.Header>
                                <Item.Meta>Total Collected: {formatEther(item.totalCollected.toString())}Ξ</Item.Meta>
                                <Item.Description></Item.Description>
                            </Item.Content>
                            <Modal
                                onOpen={(e) => setOpen(true) }
                                onClose={(e) => setOpen(false)}
                                open={open}
                                trigger={<Button color='teal'>Donate</Button>}
                            >
                                <Modal.Header>Boost an Ad</Modal.Header>
                                <Modal.Content>
                                    <p>Please select the level of boost below.</p>
                                </Modal.Content>
                                <Modal.Actions>
                                    <Button
                                        onClick={(e) => {
                                            console.log('cancel');
                                            setOpen(false);
                                        }}
                                        negative
                                    >
                                    Cancel
                                    </Button>
                                    <Button
                                        color='teal'
                                        onClick={(e) => {
                                            console.log('boost');
                                            donate(item.id, '.1');
                                            setOpen(false);
                                        }}
                                        positive
                                    >
                                    Boost
                                    </Button>
                                </Modal.Actions>
                                </Modal>
                        </Item>                       
                    )
                }) : 'Loading...'}
                </Item.Group>
                
            </div>
        </div>

    )
}

export default Cause;