import React, { useContext, useState } from 'react';

import { Form, Input, Modal } from 'antd';

import { addDocument } from '../../firebase/services';
import { AppContext } from '../../Context/AppProvider';
import { AuthContext } from '../../Context/AuthProvider';

const AddRoomModal = () => {
    // const [visible, setVisible] = useState(false);
    const { isAddRoomVisible, setIsAddRoomVisible } = useContext(AppContext);
    const {
        user: { uid },
    } = useContext(AuthContext);
    const [form] = Form.useForm();

    const handleOk = () => {
        // add new room to firestore
        addDocument('rooms', { ...form.getFieldValue(), members: [uid] });

        form.resetFields();
        setIsAddRoomVisible(false);
    };

    const handleCancel = () => {
        form.resetFields();
        setIsAddRoomVisible(false);
    };

    return (
        <div>
            <Modal
                title="Tạo phòng"
                open={isAddRoomVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form} layout="vertical">
                    <Form.Item label="Tên phòng" name="name">
                        <Input placeholder="Nhập tên phòng" />
                    </Form.Item>
                    <Form.Item label="Mô tả" name="description">
                        <Input.TextArea placeholder="Nhập mô tả" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default AddRoomModal;
