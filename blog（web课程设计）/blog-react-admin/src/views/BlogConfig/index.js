import { Button, Card, Form, Input, message } from "antd";
import React, { useEffect, useState } from "react";
import servicePath from "../../api/servicePath";
const { TextArea } = Input;

const BlogConfig = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false); //是否加载

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    getConfig();
  }, []);

  const getConfig = async () => {
    const r = await fetch(servicePath.getBlogConfig);
    const res = await r.json();
    form.setFieldsValue(res);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const r = await fetch(servicePath.updateBlogConfig, {
        method: "post",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(form.getFieldsValue()),
      });
      const res = await r.json();

      if (res.state) {
        message.success("修改成功！");
        getConfig();
      } else {
        message.error("修改失败！");
      }
    } catch (e) {
      message.warn("服务器错误！");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Card>
        <Form
          form={form}
          labelCol={{ span: 3 }}
          wrapperCol={{ span: 13 }}
          autoComplete="off"
          onFinish={handleSubmit}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: "请输入标题！" }]}
          >
            <Input maxLength={20} />
          </Form.Item>

          <Form.Item
            label="子标题"
            name="sub_title"
            rules={[{ required: true, message: "请输入子标题！" }]}
          >
            <TextArea showCount maxLength={200} autoSize />
          </Form.Item>

          <Form.Item label="头像链接" name="img_url">
            <Input />
          </Form.Item>

          <Form.Item
            label="标语"
            name="slogan"
            rules={[{ required: true, message: "请输入标语！" }]}
          >
            <TextArea showCount maxLength={200} autoSize />
          </Form.Item>

          <Form.Item
            label="QQ号"
            name="qq"
            rules={[{ required: true, message: "请输入QQ号！" }]}
          >
            <Input maxLength={50} />
          </Form.Item>
          <Form.Item
            label="微信号"
            name="we_chat"
            rules={[{ required: true, message: "请输入微信号！" }]}
          >
            <Input maxLength={50} />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 3, span: 13 }}>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: "100%" }}
              loading={loading}
            >
              修改配置
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};

export default BlogConfig;
