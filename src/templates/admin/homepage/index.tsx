import { useState, useEffect } from "react";
import { Input, Form, Select, Table, Button, Tooltip } from "antd";
import styles from "./user-management.module.scss";
// import { convertLongString } from "src/utils/common-function";
import { UserManagementModal } from "./user-modal";
import AdminAPI from "src/api/admin";
import { GetUserInfo } from "src/api/common";
import { PageNavigation } from "@components/pagination";

const { Search } = Input;
const { Option } = Select;

export const UserManagementTemplate = () => {
  const [form] = Form.useForm();
  const [search, setSearch] = useState({
    username: "",
    email: "",
    status: "all",
  });
  const [userList, setUserList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [userModalId, setUserModalId] = useState("");
  const [userStatus, setUserStatus] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [firstLoadPage, setFirstLoadPage] = useState(true);
  const onSearchUsername = (e) => {
    setSearch({ ...search, username: e, email: "" });
  };
  const onSearchEmail = (e) => {
    setSearch({ ...search, email: e, username: "" });
  };
  const handleChange = (e) => {
    setSearch({ ...search, status: e });
  };

  useEffect(() => {
    fetchData(null, page);
    setFirstLoadPage(false);
  }, []);

  useEffect(() => {
    !firstLoadPage && fetchData(search, page);
  }, [page]);

  useEffect(() => {
    if (!firstLoadPage) {
      fetchData(search, 1);
      setPage(1);
    }
  }, [search]);

  const fetchData = (data, page) => {
    AdminAPI.getUserManage({
      userInfo: GetUserInfo(),
      body: { search: data, page: page, limit: 10 },
    })
      .then((data) => {
        setUserList(data?.listUser);
        setTotalPage(data?.totalResult > 0 ? data?.totalResult : 1);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const dateConvert = (value) => {
    return (
      value.getFullYear() + "-" + (value.getMonth() + 1) + "-" + value.getDate()
    );
  };



  const columns = [
    {
      title: "User name",
      dataIndex: "username",
    },
    {
      title: "Join date",
      dataIndex: "joinDate",
      render: (date) => <div>{dateConvert(new Date(date))}</div>,
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Wallet address",
      dataIndex: "walletAddress",
      render: (address) => (
        <div>
          <Tooltip title={address}>{address}</Tooltip>
        </div>
      ),
    },
    {
      title: "Detail",
      dataIndex: "",
      render: (record) => (
        <a>CSV</a>
      ),
    },
    {
      title: "Action",
      dataIndex: "",
      render: (record) => (
        <Button
          onClick={() => {
            setModalVisible(true);
            setUserModalId(record.userId);
            setUserStatus(record.status);
          }}
        >
          Update
        </Button>
      ),
    },
  ];

  return (
    <div className={`${styles["container"]}`}>
      <div className={`${styles["title"]}`}>USER MANAGEMENT</div>
      <Form form={form} layout={`inline`} className={`${styles["search-bar"]}`}>
        <Form.Item>
          <Search
            placeholder="Search by username"
            name="text"
            allowClear
            enterButton
            size="large"
            onSearch={onSearchUsername}
            style={{ width: 200 }}
          />
        </Form.Item>
        <Form.Item>
          <Search
            placeholder="Search by email"
            size="large"
            enterButton
            name="text"
            allowClear
            onSearch={onSearchEmail}
            style={{ width: 200 }}
          />
        </Form.Item>
        <Form.Item>
          <Select
            defaultValue="all"
            style={{ width: 200 }}
            onChange={handleChange}
          >
            <Option value="all">All users</Option>
            <Option value="active">Active users</Option>
            <Option value="inactive">Inactive users</Option>
          </Select>
        </Form.Item>
      </Form>
      {(search.username || search.email) && (
        <div>
          {userList.length} {userList.length > 1 ? `results` : `result`}
        </div>
      )}

      <div>
        <Table columns={columns} dataSource={userList} pagination={false} />

        {totalPage > 10 && (
          <PageNavigation
            totalItem={totalPage}
            itemsPerPage={10}
            page={page}
            setPage={setPage}
          />
        )}
      </div>
      {modalVisible && (
        <UserManagementModal
          visble={modalVisible}
          userId={userModalId}
          setModalVisible={setModalVisible}
          userStatus={userStatus}
          setUserStatus={setUserStatus}
          refetchData={() => fetchData(search, page)}
        />
      )}
    </div>
  );
};
