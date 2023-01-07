import React from 'react';

// antd
import { Row, Col } from 'antd';

// style-components
import styled from 'styled-components';

import UserInfo from './UserInfo';
import RoomList from './RoomList';

const SidebarStyled = styled.div`
    background: #3f0e40;
    color: white;
    height: 100vh;
`;

const Sidebar = () => {
    return (
        <SidebarStyled>
            <Row>
                <Col span={24}>
                    <UserInfo />
                </Col>
                <Col span={24}>
                    <RoomList />
                </Col>
            </Row>
        </SidebarStyled>
    );
};

export default Sidebar;
