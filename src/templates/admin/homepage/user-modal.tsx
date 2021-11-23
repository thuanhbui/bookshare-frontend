import { useState } from "react";
import { Radio, Modal, Space } from "antd";
import AdminAPI from "src/api/admin";
import { GetUserInfo } from "src/api/common";

export const UserManagementModal = ({
  visble,
  userId,
  setModalVisible,
  userStatus,
  setUserStatus,
  refetchData,
}) => {
  const updateModal = (e) => {
    setValue(e.target.value);
  };

  const [value, setValue] = useState(userStatus);

  const handleUpdate = () => {
    AdminAPI.toggleBanUser({
      userInfo: GetUserInfo(),
      body: { userIdBan: userId, status: value },
    })
      .then((data) => {
        if (data.status) {
          refetchData();
          setModalVisible(false);
          setUserStatus(value);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Modal
      visible={visble}
      okText={`Update`}
      closable={true}
      onCancel={() => setModalVisible(false)}
      cancelButtonProps={{ style: { display: "none" } }}
      onOk={handleUpdate}
      width={300}
    >
      <Radio.Group onChange={updateModal} value={value}>
        <Space direction="vertical">
          <Radio value={"Active"}>Active</Radio>
          <Radio value={"Inactive"}>Inactive</Radio>
        </Space>
      </Radio.Group>
    </Modal>
  );
};
