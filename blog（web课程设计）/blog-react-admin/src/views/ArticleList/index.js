/* eslint-disable react-hooks/exhaustive-deps */
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Form,
  Input,
  message,
  Popconfirm,
  Select,
  Space,
  Table,
  Tag,
  Typography,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import servicePath from "../../api/servicePath";
import "./index.css";
import ArticleModal from "./modal";
const { Option } = Select;
const { Paragraph, Text } = Typography;

const ArticleList = () => {
  // 变量定义
  const [form] = Form.useForm();
  const [data, setData] = useState([]); //数据
  const [typeList, setTypeList] = useState([]); //类型
  const [loading, setLoading] = useState(false); //是否加载
  const modalRef = useRef(); //抽屉的引用
  const navigate = useNavigate();
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      width: 50,
      align: "center",
    },
    {
      title: "标题",
      dataIndex: "title",
      key: "title",
      width: 150,
      align: "center",
      render: text => (
        <div style={{ fontSize: "1.1rem", fontWeight: "bold" }}>{text}</div>
      ),
    },
    {
      title: "发布时间",
      dataIndex: "addTime",
      width: 100,
      key: "addTime",
      align: "center",
    },
    {
      title: "概括",
      width: 200,
      dataIndex: "introduce",
      key: "introduce",
      align: "center",

      render: text => (
        <Text style={{ width: 200 }} ellipsis={{ tooltip: text ? text : "" }}>
          {text}
        </Text>
      ),
    },
    // {
    //   title: "访问量",
    //   dataIndex: "viewCount",
    //   key: "viewCount",
    // },
    {
      title: "类型",
      key: "typeName",
      dataIndex: "typeName",
      width: 80,
      align: "center",

      render: tags => (
        <>
          <Tag key={Math.random()}>{tags}</Tag>
        </>
      ),
    },
    {
      title: "操作",
      key: "action",
      width: 80,
      align: "center",

      render: (text, record) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => modalRef.current.showDrawer(record, typeList)}
          >
            编辑
          </Button>
          <Popconfirm
            title="确认删除？"
            onConfirm={() => deleteConfirm(record.id)}
            okText="确认"
            cancelText="取消"
          >
            <Button type="primary">删除</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  // 数据请求
  useEffect(async () => {
    const articleList = await fetch(servicePath.getArticleList);
    const temp = await articleList.json();
    if (temp === "没有登陆") {
      navigate("/", { replace: true });
    }
    setData(temp);
  }, []);
  useEffect(async () => {
    const articleTypes = await fetch(servicePath.getArticleTypes);
    const temp = await articleTypes.json();
    setTypeList(temp);
  }, []);

  // 方法
  // 提交查询
  const onFinish = async value => {
    setLoading(true);
    try {
      const r = await fetch(servicePath.getArticleBySearch, {
        method: "post",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(value),
      });
      const res = await r.json();

      if (res.length) {
        res.forEach(item => {
          for (const type of typeList) {
            if (type.id == item.type_id) {
              item.typeName = type.type_name;
            }
          }
        });
      }
      setData(res);
    } catch (e) {
      message.warn("服务器错误！");
    } finally {
      setLoading(false);
    }
  };
  // 删除记录时的确认
  const deleteConfirm = async id => {
    setLoading(true);
    try {
      const temp = { id };
      const r = await fetch(servicePath.deleteArticleById, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(temp),
      });
      const res = await r.json();
      if (res.state) {
        message.success("删除成功!");
      } else {
        message.error("删除失败!");
      }
    } catch (e) {
      console.log(e.toString());
      message.warn("服务器错误，请稍后再试！");
    } finally {
      refresh();
      setLoading(false);
    }
  };
  // 刷新列表
  const refresh = async () => {
    // form.resetFields();
    try {
      const articleList = await fetch(servicePath.getArticleList);
      const temp = await articleList.json();
      setData(temp);
    } catch (e) {
      console.log(e.toString());
    }
  };

  return (
    <>
      <Card style={{ marginBottom: "5px" }}>
        <Form form={form} layout="inline" onFinish={onFinish}>
          <Form.Item name="title">
            <Input
              prefix={<UserOutlined className="search_icon" />}
              placeholder="查询标题"
              allowClear
            />
          </Form.Item>
          <Form.Item name="content">
            <Input
              prefix={<LockOutlined className="search_icon" />}
              placeholder="查询内容"
              allowClear
            />
          </Form.Item>
          <Form.Item name="type_id">
            <Select placeholder="选择类别" className="search_select" allowClear>
              {typeList.map(item => {
                return (
                  <Option key={item.type_name} value={item.id}>
                    {item.type_name}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Table
        loading={loading}
        pagination={false}
        columns={columns}
        dataSource={data}
      />
      <ArticleModal refresh={refresh} ref={modalRef}></ArticleModal>
    </>
  );
};
export default ArticleList;
