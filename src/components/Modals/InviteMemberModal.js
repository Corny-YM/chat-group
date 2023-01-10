import React, { useContext, useEffect, useMemo, useState } from 'react';

import { Form, Select, Modal, Spin, Avatar } from 'antd';

import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';

import { debounce } from 'lodash';

import { db } from '../../firebase/config';
import { addDocument } from '../../firebase/services';
import { AppContext } from '../../Context/AppProvider';
import { AuthContext } from '../../Context/AuthProvider';

function DebounceSelect({
  fetchOptions,
  debounceTimeout = 300,
  curMembers,
  ...props
}) {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value) => {
      setOptions([]);
      setFetching(true);

      fetchOptions(value, curMembers).then((newOptions) => {
        setOptions(newOptions);
        setFetching(false);
      });
    };

    return debounce(loadOptions, debounceTimeout);
  }, [debounceTimeout, fetchOptions, curMembers]);

  useEffect(() => {
    return () => {
      // clear when unmount
      setOptions([]);
    };
  }, []);

  return (
    <Select
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
    >
      {options.map((opt) => {
        return (
          <Select.Option key={opt.value} value={opt.value} title={opt.label}>
            <Avatar src={opt.photoURL} size="small">
              {opt.photoURL ? '' : opt.label?.charAt(0)?.toUpperCase()}
            </Avatar>
            {` ${opt.label}`}
          </Select.Option>
        );
      })}
    </Select>
  );
}

async function fetchUserList(search, curMembers) {
  let collectionRef = collection(db, 'users');
  const q = query(
    collectionRef,
    where('keywords', 'array-contains', search),
    orderBy('displayName'),
    limit(20),
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs
    .map((doc) => ({
      label: doc.data().displayName,
      value: doc.data().uid,
      photoURL: doc.data().photoURL,
    }))
    .filter((opt) => !curMembers.includes(opt.value));
}

const InviteMemberModal = () => {
  const [value, setValue] = useState([]);
  const {
    isInviteMemberVisible,
    setIsInviteMemberVisible,
    selectedRoomId,
    selectedRoom,
  } = useContext(AppContext);
  const {
    user: { uid },
  } = useContext(AuthContext);
  const [form] = Form.useForm();

  const handleOk = async () => {
    // add new room to firestore
    addDocument('rooms', { ...form.getFieldValue(), members: [uid] });

    // update
    const roomRef = doc(db, 'rooms', selectedRoomId);
    const roomSnap = await getDoc(roomRef);

    updateDoc(roomRef, {
      members: [...selectedRoom.members, ...value.map((val) => val.value)],
    });

    form.resetFields();
    setIsInviteMemberVisible(false);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsInviteMemberVisible(false);
  };

  console.log({ value });

  return (
    <div>
      <Modal
        title="Mời thêm thành viên"
        open={isInviteMemberVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <DebounceSelect
            mode="multiple"
            label="Tên các thành viên"
            value={value}
            placeholder="Nhập tên thành viên"
            fetchOptions={fetchUserList}
            onChange={(newValue) => setValue(newValue)}
            style={{ width: '100%' }}
            curMembers={selectedRoom.members}
          />
        </Form>
      </Modal>
    </div>
  );
};

export default InviteMemberModal;
