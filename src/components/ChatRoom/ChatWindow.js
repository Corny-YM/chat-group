import React from 'react';

// antd
import { Row, Col, Button, Avatar, Tooltip, Input, Form } from 'antd';
import styled from 'styled-components';

// ant icons
import { UserAddOutlined } from '@ant-design/icons';

// css
const HeaderStyled = styled.div`
    display: flex;
    justify-content: space-between;
    height: 56px;
    padding: 0;
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
const ContentStyled = styled.div``;
const MessagedListStyled = styled.div``;

const ChatWindow = () => {
    return (
        <div>
            <HeaderStyled>
                <div className="header__info">
                    <p className="header__title">Room 1</p>
                    <span className="header__description">Day la Room 1</span>
                </div>
                <ButtonGroupStyled>
                    <Button icon={<UserAddOutlined />} type="text">
                        Add
                    </Button>
                    <Avatar.Group size="small" maxCount={2}>
                        <Tooltip title="A">
                            <Avatar>A</Avatar>
                        </Tooltip>
                        <Tooltip title="B">
                            <Avatar>B</Avatar>
                        </Tooltip>
                        <Tooltip title="C">
                            <Avatar>C</Avatar>
                        </Tooltip>
                        <Tooltip title="D">
                            <Avatar>D</Avatar>
                        </Tooltip>
                    </Avatar.Group>
                </ButtonGroupStyled>
            </HeaderStyled>
            <ContentStyled>
                <MessagedListStyled></MessagedListStyled>
                <Form>
                    <Form.Item>
                        <Input />
                    </Form.Item>
                    <Button>Gửi</Button>
                </Form>
            </ContentStyled>
        </div>
    );
};

export default ChatWindow;
