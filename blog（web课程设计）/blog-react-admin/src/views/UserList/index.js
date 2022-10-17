import {
  Button,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Popconfirm,
  Space,
  Table,
  Typography,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import servicePath from "../../api/servicePath";
import "./index.css";

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `请输入 ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const UserList = () => {
  const [form] = Form.useForm();
  const [modalForm] = Form.useForm();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingKey, setEditingKey] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const buttonRef = useRef();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    refresh();
  }, []);

  const refresh = async () => {
    setLoading(true);
    try {
      const r = await fetch(servicePath.getUsers);
      const res = await r.json();
      setData(res);
    } catch (e) {
      message.warn("服务器错误！");
    } finally {
      setLoading(false);
    }
  };

  const isEditing = record => record.id === editingKey;

  const edit = record => {
    form.setFieldsValue({
      username: "",
      password: "",
      ...record,
    });
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async id => {
    setLoading(true);
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex(item => id === item.id);

      if (index > -1) {
        //发送修改请求
        const r = await fetch(servicePath.updateUser, {
          method: "post",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify({ ...row, id }),
        });
        const res = await r.json();

        if (res.state) {
          message.success("修改成功！");

          const item = newData[index];
          newData.splice(index, 1, { ...item, ...row });
          setData(newData);

          setEditingKey("");
        } else {
          message.error("修改失败！");
        }
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "id",
      dataIndex: "id",
      editable: false,
      align: "center",
      width: 50,
    },
    {
      title: "用户名",
      dataIndex: "username",
      editable: true,
      align: "center",
      width: 100,
    },
    {
      title: "密码",
      dataIndex: "password",
      editable: true,
      align: "center",
      width: 100,
    },
    {
      title: "操作",
      dataIndex: "action",
      align: "center",
      width: 100,
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.id)}
              style={{
                marginRight: 8,
              }}
            >
              保存
            </Typography.Link>
            <Popconfirm
              title="确定取消修改?"
              okText="确认"
              cancelText="取消"
              onConfirm={cancel}
            >
              <a>取消</a>
            </Popconfirm>
          </span>
        ) : (
          <Space>
            <Typography.Link
              disabled={editingKey !== ""}
              onClick={() => edit(record)}
            >
              编辑
            </Typography.Link>

            <Popconfirm
              title="确定删除?"
              okText="确认"
              cancelText="取消"
              onConfirm={() => deleteUser(record.id)}
            >
              <Typography.Link>删除</Typography.Link>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];
  const mergedColumns = columns.map(col => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: record => ({
        record,
        inputType: "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const addUser = async () => {
    console.log(modalForm.getFieldsValue());
    setLoading(true);
    try {
      const r = await fetch(servicePath.addUser, {
        method: "put",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(modalForm.getFieldsValue()),
      });
      const res = await r.json();

      if (res.state) {
        message.success("添加成功！");
        handleModalCancel();
        refresh();
      } else {
        message.error("添加失败！");
      }
    } catch (e) {
      message.warn("服务器错误！");
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async id => {
    setLoading(true);
    try {
      const r = await fetch(servicePath.deleteUser, {
        method: "delete",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({ id }),
      });
      const res = await r.json();

      if (res.state) {
        message.success("删除成功！");
        refresh();
      } else {
        message.error("删除失败！");
      }
    } catch (e) {
      message.warn("服务器错误！");
    } finally {
      setLoading(false);
    }
  };

  const handleModalCancel = () => {
    modalForm.resetFields();
    setIsModalVisible(false);
  };

  return (
    <>
      <Button
        type="primary"
        onClick={() => setIsModalVisible(true)}
        style={{ marginBottom: "5px" }}
      >
        添加用户
      </Button>

      <Modal
        title="新增用户"
        visible={isModalVisible}
        onCancel={handleModalCancel}
        okText="添加"
        cancelText="取消"
        onOk={() => buttonRef.current.click()}
      >
        <Form
          form={modalForm}
          onFinish={addUser}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 19 }}
          autoComplete="off"
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: "请输入用户名！" }]}
          >
            <Input maxLength={20} />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: "请输入密码！" }]}
          >
            <Input maxLength={20} />
          </Form.Item>
          <Button ref={buttonRef} style={{ display: "none" }} htmlType="submit">
            提交
          </Button>
        </Form>
      </Modal>

      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          loading={loading}
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={false}
        />
      </Form>
    </>
  );
};

export default UserList;
