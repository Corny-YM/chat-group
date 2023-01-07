import React from 'react';

// antd
import { Row, Col } from 'antd';

import ChatWindow from './ChatWindow';
import Sidebar from './Sidebar';

const ChatRoom = () => {
    return (
        <Row>
            <Col span={6}>
                <Sidebar />
            </Col>
            <Col span={18}>
                <ChatWindow />
            </Col>
        </Row>
    );
};

export default ChatRoom;
