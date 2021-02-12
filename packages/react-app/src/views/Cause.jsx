import React, { useState } from "react";
//import { Button, Modal, List, Divider, Input, Card, DatePicker, Slider, Switch, Progress, Spin } from "antd";
import { SyncOutlined, DollarOutlined } from '@ant-design/icons';
import { Grid, Image, Card, Icon, Label, Button, Form } from 'semantic-ui-react';
import { Address, Balance } from "../components";
import { parseEther, formatEther } from "@ethersproject/units";
import ReactPlayer from 'react-player/lazy'

const Cause = ({ address, mainnetProvider, userProvider, localProvider, yourLocalBalance, price, tx, readContracts, writeContracts }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    // show the featured video at top of window...
    const [causeName, setCauseName] = useState('');
    const [causeVideoUri, setCauseVideoUri] = useState('');

    return (
        <div id='main-container' style={{ width: 600, margin: 'auto' }}>
             <h3>Add a new Cause </h3>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={12}>
                        <Form>
                            <Form.Field>
                                <Form.Label>Name</Form.Label>
                                <Form.Input 
                                    placeholder='Name of Cause'
                                    onChange={(e) => {
                                        setCauseName(e.target.value);
                                }}/>
                                <Form.Label>Video Url</Form.Label>
                                <Form.Input
                                    placeholder='Url to your video ad'
                                    onChange={(e) => {
                                        setCauseVideoUri(e.target.value);
                                    }}
                                />
                            </Form.Field>
                        </Form>
                    </Grid.Column>
                </Grid.Row>
            </Grid>     
            <div>
                <br /><br />
                {/* Video load preview */}
                <div id='video-preview'>
                    <ReactPlayer url={causeVideoUri} />
                </div>
                <br/><br />
                <Button 
                    block
                    type='primary'
                    onClick={(e) => {
                        tx({
                            to: writeContracts.Donator.address,
                            value: parseEther("0.1"), // Always .1 Ether to add a cause
                            data: writeContracts.Donator.interface.encodeFunctionData(
                                "addCause(string, string)",
                                [causeName, causeVideoUri]),
                            gasPrice: 8500000,
                            gasLimit: 9500000
                        });
                       
                    }}>
                   
                    Add Cause
                </Button>
            
            </div>
            <div id='video-container'>
                {/* <ReactPlayer url='https://www.youtube.com/watch?v=ysz5S6PUM-U' /> */}

            </div>
            <div id='controls'>

            </div>
           
        </div>

    )
}

export default Cause;