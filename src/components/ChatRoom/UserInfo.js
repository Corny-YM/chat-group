import React from 'react';

// antd
import { Avatar, Button, Typography } from 'antd';

import styled from 'styled-components';

const WrapperStyled = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 12px 16px;
    border-bottom: 1px solid rgba(82, 38, 82);

    .username {
        color: white;
        margin-left: 5px;
    }
`;

const UserInfo = () => {
    return (
        <WrapperStyled>
            <div>
                <Avatar src="" />
                <Typography.Text className="username">ABC</Typography.Text>
            </div>
            <Button ghost>Logout</Button>
        </WrapperStyled>
    );
};

export default UserInfo;
