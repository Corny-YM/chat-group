import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// antd
import { Row, Col, Button, Typography } from 'antd';

// firebase
import { FacebookAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase/config';

const { Title } = Typography;
const provider = new FacebookAuthProvider();
const Login = () => {
    const navigate = useNavigate();

    const handleFbLogin = () => {
        signInWithPopup(auth, provider);
    };

    return (
        <div>
            <Row justify="center" style={{ height: 800 }}>
                <Col span={8}>
                    <Title style={{ textAlign: 'center' }} level={3}>
                        Fun Chat
                    </Title>
                    <Button style={{ width: '100%', marginBottom: 5 }}>
                        Đăng nhập bằng Google
                    </Button>
                    <Button onClick={handleFbLogin} style={{ width: '100%' }}>
                        Đăng nhập bằng Facebook
                    </Button>
                </Col>
            </Row>
        </div>
    );
};

export default Login;
