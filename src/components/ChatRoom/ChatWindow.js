import React, { useContext, useMemo, useState } from 'react';

// antd
import { Button, Avatar, Tooltip, Input, Form, Alert } from 'antd';
import styled from 'styled-components';

// ant icons
import { UserAddOutlined } from '@ant-design/icons';
import Message from './Message';
import { AppContext } from '../../Context/AppProvider';
import { addDocument } from '../../firebase/services';
import { AuthContext } from '../../Context/AuthProvider';
import useFireStore from '../../hooks/useFireStore';

// css
const HeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  height: 56px;
  padding: 0 16px;
  align-items: center;
  border-bottom: 1px solid rgb(230, 230, 230);

  .header {
    &__info {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    &__title {
      margin: 0;
      font-weight: bold;
    }

    &__description {
      font-size: 12px;
    }
  }
`;
const ButtonGroupStyled = styled.div`
  display: flex;
  align-items: center;
`;
const WrapperStyled = styled.div`
  height: 100vh;
`;
const ContentStyled = styled.div`
  height: calc(100% - 57px - 22px);
  display: flex;
  flex-direction: column;
  padding: 11px;
  justify-content: flex-end;
`;
const FormStyled = styled(Form)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 2px 2px 0;
  border: 1px solid rgb(230, 230, 230);
  border-radius: 2px;

  .ant-form-item {
    flex: 1;
    margin-bottom: 0;
  }
`;
const MessageListStyled = styled.div`
  max-height: 100%;
  overflow-y: auto;
`;

const ChatWindow = () => {
  const { selectedRoom, members, setIsInviteMemberVisible } =
    useContext(AppContext);
  const {
    user: { uid, photoURL, displayName },
  } = useContext(AuthContext);
  const [inputValue, setInputValue] = useState('');
  const [form] = Form.useForm();

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleSubmit = () => {
    addDocument('messages', {
      text: inputValue,
      uid,
      photoURL,
      roomId: selectedRoom.id,
      displayName,
    });

    form.resetFields(['message']);
  };

  const condition = useMemo(() => {
    return {
      fieldName: 'roomId',
      operator: '==',
      compareValue: selectedRoom.id,
    };
  }, [selectedRoom.id]);
  const messages = useFireStore('messages', condition);

  return (
    <WrapperStyled>
      {selectedRoom.id ? (
        <>
          <HeaderStyled>
            <div className="header__info">
              <p className="header__title">{selectedRoom?.name}</p>
              <span className="header__description">
                {selectedRoom?.description}
              </span>
            </div>
            <ButtonGroupStyled>
              <Button
                onClick={() => setIsInviteMemberVisible(true)}
                icon={<UserAddOutlined />}
                type="text"
              >
                Add
              </Button>
              <Avatar.Group size="small" maxCount={2}>
                {members.map((member) => {
                  return (
                    <Tooltip
                      placement="bottomLeft"
                      arrowPointAtCenter
                      title={member.displayName}
                      key={member.id}
                    >
                      <Avatar src={member.photoURL}>
                        {member.photoURL
                          ? ''
                          : member.displayName?.charAt(0)?.toUpperCase()}
                      </Avatar>
                    </Tooltip>
                  );
                })}
              </Avatar.Group>
            </ButtonGroupStyled>
          </HeaderStyled>
          <ContentStyled>
            <MessageListStyled>
              {messages.map((mes) => (
                <Message
                  key={mes.id}
                  text={mes.text}
                  photoURL={mes.photoURL}
                  displayName={mes.displayName}
                  createdAt={mes.createdAt}
                />
              ))}
            </MessageListStyled>
            <FormStyled form={form}>
              <Form.Item name="message">
                <Input
                  onChange={handleChange}
                  onPressEnter={handleSubmit}
                  bordered={false}
                  autoComplete="off"
                  placeholder="Nhập tin nhắn"
                />
              </Form.Item>
              <Button type="primary" onClick={handleSubmit}>
                Gửi
              </Button>
            </FormStyled>
          </ContentStyled>
        </>
      ) : (
        <Alert
          message="Hãy lựa chọn phòng"
          type="info"
          showIcon
          closeText="❌"
        />
      )}
    </WrapperStyled>
  );
};

export default ChatWindow;
