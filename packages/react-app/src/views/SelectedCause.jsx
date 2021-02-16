import React, { useState } from "react";
import { Modal, Divider, Input, DatePicker, Slider, Switch, Progress, Spin } from "antd";
import { SyncOutlined, PoweroffOutlined, DollarOutlined } from '@ant-design/icons';
import { List, Checkbox, Form, Card, Button, Image, Confirm, Item } from 'semantic-ui-react';
import { Address, Balance } from "../components";
import { parseEther, formatEther } from "@ethersproject/units";
import ReactPlayer from 'react-player/lazy'

const SelectedCause = ({ address, mainnetProvider, userProvider, localProvider, yourLocalBalance, price, tx, readContracts, writeContracts }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [amountOfDonation, setAmountOfDonation] = useState(0);

    const openModal = () => {
        setIsVisible(true);
    }

    const donate = (amountOfDonation) => {
        console.log(amountOfDonation);
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
          setIsVisible(false);
        }, 2000);
    };

    const handleCancel = () => {
        setIsVisible(false);
    };
    


    return (
        <div id='main-container' style={{ width: 600, margin: 'auto' }}>
            <div id='search-container'>

            </div>
            <div id='video-container'>
                <ReactPlayer url='https://www.youtube.com/watch?v=Qhx6AlkC-aI' />
            </div>
            <div id='controls'>

            </div>
            <div id='footer' style={{ padding: '10px' }}>
                <Button style={{ margin: '10px' }}
                    type="primary"
                    icon={<DollarOutlined />}
                    onClick={() => {openModal(10); setAmountOfDonation(10); }}
                    >
                    10
                </Button >
                <Button style={{ margin: '10px' }}
                    type="primary"
                    icon={<DollarOutlined />}
                    onClick={() => {openModal(25); setAmountOfDonation(25); }}
                    >
                    25
                </Button>
                <Button style={{ margin: '10px' }}
                    type="primary"
                    icon={<DollarOutlined />}
                    onClick={() => {openModal(50); setAmountOfDonation(50); }}
                    >
                    50
                </Button>
                <Button style={{ margin: '10px' }}
                    type="primary"
                    icon={<DollarOutlined />}
                    onClick={() => {openModal(100); setAmountOfDonation(100); }}
                    >
                    100
                </Button>
                <Button style={{ margin: '10px' }}
                    type="primary"
                    icon={<DollarOutlined />}
                    onClick={() => {openModal(250); setAmountOfDonation(250); }}
                    >
                    250
                </Button>
            </div>
            <div>
                Total Donations
            </div>
            <Modal
                visible={isVisible}
                title="Title"
                onOk={donate}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                    Cancel
                    </Button>,
                    <Button key="submit" type="primary" loading={isLoading} onClick={() => donate(amountOfDonation)}>
                    Donate
                    </Button>,
                ]}
                >
                <div>
                    <h2>How would you like to pay?</h2>
                    <List divided verticalAlign='middle'>
                        <List.Item>
                            <List.Content floated='right'>
                                <Button>Pay</Button>
                            </List.Content>
                            <Image avatar src='https://react.semantic-ui.com/images/avatar/small/lena.png' />
                            <List.Content>Credit Card</List.Content>
                        </List.Item>
                        <List.Item>
                            <List.Content floated='right'>
                                <Button>Pay</Button>
                            </List.Content>
                            <Image avatar src='https://react.semantic-ui.com/images/avatar/small/lindsay.png' />
                            <List.Content>PayPal</List.Content>
                        </List.Item>
                        <List.Item>
                            <List.Content floated='right'>
                                <Button>Pay</Button>
                            </List.Content>
                            <Image avatar src='https://react.semantic-ui.com/images/avatar/small/mark.png' />
                            <List.Content>Crypto</List.Content>
                        </List.Item>
                            
                    </List>
                </div>
            </Modal>
        </div>
    )
}

export default SelectedCause;