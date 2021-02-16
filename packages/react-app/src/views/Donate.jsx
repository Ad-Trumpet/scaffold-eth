import React, { useState, useEffect, useMemo } from "react";
import { Link } from 'react-router-dom';
import { Divider, DatePicker, Slider, Switch, Progress, Spin, Space, Avatar } from "antd";
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import { List, Checkbox, Form, Card, Button, Image, Confirm, Item } from 'semantic-ui-react';
import { Address, Balance } from "../components";
import { useExchangePrice, useGasPrice, useUserProvider, useContractLoader, useContractReader, useEventListener, useBalance, useExternalContractLoader, usePoller } from "../hooks";
import { parseEther, formatEther } from "@ethersproject/units";
import ReactPlayer from 'react-player/lazy';
import ReactPlayerYT from 'react-player/youtube';

const Donate = ({ address, tx }) => {

    return (
        <>

        </>
    )
}

export default Donate;