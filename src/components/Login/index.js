import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// antd
import { Row, Col, Button, Typography } from 'antd';

// firebase
import {
  FacebookAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  getAdditionalUserInfo,
} from 'firebase/auth';
import { auth, db } from '../../firebase/config';
import { addDoc, collection } from 'firebase/firestore';

import { addDocument, generateKeywords } from '../../firebase/services';

const { Title } = Typography;
const provider = new FacebookAuthProvider();
const Login = () => {
  const navigate = useNavigate();

  const handleFbLogin = async () => {
    const data = await signInWithPopup(auth, provider);
    const additional = getAdditionalUserInfo(data);
    if (additional?.isNewUser) {
      await addDocument('users', {
        displayName: data.user.displayName,
        email: data.user.email,
        photoURL: data.user.photoURL,
        uid: data.user.uid,
        providerId: additional.providerId,
        keywords: generateKeywords(data.user.displayName),
      });
    }
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
