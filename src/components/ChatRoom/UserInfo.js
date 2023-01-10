import React, { useContext, useEffect } from 'react';

// antd
import { Avatar, Button, Typography } from 'antd';

// firebase
import { signOut } from 'firebase/auth';
import { collection, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../../firebase/config';

import styled from 'styled-components';

import { AuthContext } from '../../Context/AuthProvider';

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
    const {
        user: { displayName, photoURL },
    } = useContext(AuthContext);

    return (
        <WrapperStyled>
            <div>
                <Avatar src={photoURL}>
                    {photoURL ? '' : displayName?.charAt(0)?.toUpperCase()}
                </Avatar>
                <Typography.Text className="username">{displayName}</Typography.Text>
            </div>
            <Button ghost onClick={() => signOut(auth)}>
                Logout
            </Button>
        </WrapperStyled>
    );
};

export default UserInfo;
