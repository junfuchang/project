import { Button, Card, Form, Input, message } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import servicePath from "../../api/servicePath";

export default function Login() {
  const navigate = useNavigate();
  const onFinish = async values => {
    const res = await fetch(servicePath.judgeUser, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(values),
    });
    const data = await res.json();
    if (data.state) {
      message.success(data.message);
      localStorage.setItem("openId", data.openId);
      navigate("/home");
    } else {
      message.error(data.message);
    }
  };

  return (
    <>
      <Card
        title="登录"
        style={{ width: "30vw", minWidth: "300px", margin: "0 auto" }}
      >
        <Form
          name="Login"
          labelCol={{ span: 5 }}
          labelAlign="left"
          wrapperCol={{ span: 20 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="用户名:"
            name="username"
            labelAlign="left"
            rules={[{ required: true, message: "请输入你的用户名!" }]}
          >
            <Input maxLength={20} />
          </Form.Item>

          <Form.Item
            label="密码:"
            name="password"
            rules={[{ required: true, message: "请输入你的密码!" }]}
          >
            <Input.Password maxLength={20} />
          </Form.Item>

          {/* <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 5, span: 20 }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item> */}

          <Form.Item wrapperCol={{ span: 24 }}>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              提交
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
}
