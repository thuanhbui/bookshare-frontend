import { useState, useEffect } from "react";
import { Input, Form, Select, Table, Button } from "antd";
import styles from "./user-management.module.scss";
import AdminAPI from "src/api/admin";
import { GetUserInfo } from "src/api/common";
import { PageNavigation } from "@components/pagination";

const { Search } = Input;

export const UserManagementTemplate = () => {
  const [form] = Form.useForm();
  const [search, setSearch] = useState({
    username: "",
    email: "",
  });
  const [userList, setUserList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [firstLoadPage, setFirstLoadPage] = useState(true);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const onSearchUsername = (e) => {
    setSearch({ ...search, username: e});
  };
  const onSearchEmail = (e) => {
    setSearch({ ...search, email: e });
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

  const handleDeleteUser = (id) => {
    AdminAPI.deleteUser({ userId: id }).then((res) => {
      window.alert("Successfully deleted user!");
      fetchData(1, 1);
    });
  };

  const fetchData = (data, page) => {
    AdminAPI.getAllUser()
      .then((res) => {
        const filteredData = res?.data.filter(
          (user) =>
            user.username
              .toLowerCase()
              .indexOf(search.username.toLowerCase()) >= 0 
              && user.email.toLowerCase().indexOf(search.email.toLowerCase()) >= 0
        );
        setUserList(
          filteredData.slice((page - 1) * itemsPerPage, page * itemsPerPage)
        );
        setTotalPage(filteredData.length);
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
      title: "UserID",
      dataIndex: "userid",
    },
    {
      title: "User name",
      dataIndex: "username",
    },
    {
      title: "Join date",
      dataIndex: "registeredDate",
      render: (date) => <div>{dateConvert(new Date(date))}</div>,
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
    },
    {
      title: "Action",
      dataIndex: "",
      render: (record) => (
        <Button onClick={() => handleDeleteUser(record.userid)}>
          Delete User
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
            style={{ width: 400 }}
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
            style={{ width: 400 }}
          />
        </Form.Item>
      </Form>
      {(search.username || search.email) && (
        <div>
          {userList.length} {userList.length > 1 ? `results` : `result`}
        </div>
      )}

      <div>
        <Table columns={columns} dataSource={userList} pagination={false} />

        {totalPage > itemsPerPage && (
          <PageNavigation
            totalItem={totalPage}
            itemsPerPage={itemsPerPage}
            page={page}
            setPage={setPage}
          />
        )}
      </div>
    </div>
  );
};
