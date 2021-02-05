import React, { useState } from "react";
import { Button, Modal, List, Divider, Input, Card, DatePicker, Slider, Switch, Progress, Spin } from "antd";
import { SyncOutlined, PoweroffOutlined, DollarOutlined } from '@ant-design/icons';
import { Address, Balance } from "../components";
import { parseEther, formatEther } from "@ethersproject/units";
import ReactPlayer from 'react-player/lazy'

const SelectedCause = ({ address, mainnetProvider, userProvider, localProvider, yourLocalBalance, price, tx, readContracts, writeContracts }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    

    const openModal = () => {
        setIsVisible(true);
    }

    const handleOk = () => {
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
                    onClick={() => {openModal(10)}}
                    >
                    10
                </Button >
                <Button style={{ margin: '10px' }}
                    type="primary"
                    icon={<DollarOutlined />}
                    onClick={() => {openModal(25)}}
                    >
                    25
                </Button>
                <Button style={{ margin: '10px' }}
                    type="primary"
                    icon={<DollarOutlined />}
                    onClick={() => {openModal(50)}}
                    >
                    50
                </Button>
                <Button style={{ margin: '10px' }}
                    type="primary"
                    icon={<DollarOutlined />}
                    onClick={() => {openModal(100)}}
                    >
                    100
                </Button>
                <Button style={{ margin: '10px' }}
                    type="primary"
                    icon={<DollarOutlined />}
                    onClick={() => {openModal(250)}}
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
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                    Cancel
                    </Button>,
                    <Button key="submit" type="primary" loading={isLoading} onClick={handleOk}>
                    Donate
                    </Button>,
                ]}
                >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </div>
    )
}

export default SelectedCause;