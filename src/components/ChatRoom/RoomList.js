import React from 'react';

// antd
import { Button, Collapse, Typography } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';

import styled from 'styled-components';

const { Panel } = Collapse;

// css
const PanelStyled = styled(Panel)`
    &&& {
        .ant-collapse-header,
        p {
            color: white;
        }

        .ant-collapse-content-box {
            padding: 0 40px;
        }

        .add-room {
            color: white;
            padding: 0;
        }
    }
`;
const LinkStyled = styled(Typography.Link)`
    display: block;
    margin-bottom: 15px;
    color: white;
`;

const RoomList = () => {
    return (
        <Collapse ghost defaultActiveKey={['1']}>
            <PanelStyled header="Danh sách các phòng" key="1">
                <LinkStyled>Room 1</LinkStyled>
                <LinkStyled>Room 2</LinkStyled>
                <LinkStyled>Room 3</LinkStyled>
                <Button type="text" icon={<PlusCircleOutlined />} className="add-room">
                    Thêm phòng
                </Button>
            </PanelStyled>
        </Collapse>
    );
};

export default RoomList;
