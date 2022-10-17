import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Row,
  Select,
} from "antd";
import React, { useEffect, useState } from "react";
import servicePath from "../../api/servicePath";
const { Option } = Select;
const { TextArea } = Input;

const AddArticle = () => {
  const [form] = Form.useForm();
  const [typeList, setTypeList] = useState([]); //类型
  const [loading, setLoading] = useState(false); //是否加载

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const articleTypes = await fetch(servicePath.getArticleTypes);
    const temp = await articleTypes.json();
    setTypeList(temp);
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    const addTime = form.getFieldsValue().add_time;
    try {
      const submitData = {
        ...form.getFieldsValue(),
        add_time: new Date(addTime ? addTime : new Date()).toLocaleDateString(),
        view_count: 0,
      };
      const r = await fetch(servicePath.addArticle, {
        method: "put",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(submitData),
      });
      const res = await r.json();

      if (res.state) {
        message.success("发布成功！");
        form.resetFields();
      } else {
        message.error("发布失败！");
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
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 24 }}
          autoComplete="off"
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Row justify="space-around">
            <Col span={14}>
              <Form.Item name="content">
                <TextArea
                  showCount
                  autoSize={{ minRows: 23, maxRows: 40 }}
                  placeholder="请输入正文"
                  maxLength={50000}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item>
                <Row wrap={false} justify="space-around">
                  <Col span={15}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{ width: "100%" }}
                      loading={loading}
                    >
                      发布文章
                    </Button>
                  </Col>
                  <Col offset={2} span={7}>
                    <Button
                      style={{ width: "100%" }}
                      onClick={() => {
                        form.resetFields();
                      }}
                    >
                      清空
                    </Button>
                  </Col>
                </Row>
              </Form.Item>

              <Form.Item
                label="标题"
                name="title"
                rules={[{ required: true, message: "请输入标题！" }]}
              >
                <Input maxLength={20} />
              </Form.Item>

              <Form.Item
                label="类别"
                name="type_id"
                rules={[{ required: true, message: "请选择类别！" }]}
              >
                <Select placeholder="选择类别" className="search_select">
                  {typeList.map(item => {
                    return (
                      <Option key={item.id} value={item.id}>
                        {item.type_name}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>

              <Form.Item label="添加时间" name="add_time">
                <DatePicker />
              </Form.Item>

              <Form.Item label="简介" name="introduce">
                <TextArea
                  showCount
                  autoSize={{ minRows: 7, maxRows: 24 }}
                  maxLength={10000}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </>
  );
};

export default AddArticle;
