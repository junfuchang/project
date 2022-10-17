import {
  Button,
  DatePicker,
  Drawer,
  Form,
  Input,
  message,
  Select,
  Space,
} from "antd";
import moment from "moment";
import React, { useImperativeHandle, useState } from "react";
import servicePath from "../../api/servicePath";
const { TextArea } = Input;
const { Option } = Select;

const ArticleModal = (props, ref) => {
  const [visible, setVisible] = useState(false); //抽屉的显示
  const [theId, setTheId] = useState("0");
  const [typeList, setTypeList] = useState([]); //类型
  const [loading, setLoading] = useState(false); //是否加载

  const [form] = Form.useForm();

  useImperativeHandle(ref, () => {
    return {
      showDrawer,
      onClose,
    };
  });

  // 设置显示抽屉
  const showDrawer = async (record, typeLists) => {
    setTheId(record.id);
    setTypeList(typeLists);
    record.addTime = moment(record.addTime ? record.addTime : new Date());
    if (form) {
      form.setFieldsValue({
        ...record,
      });
      console.log(form.getFieldsValue());
    }
    setVisible(true);
  };
  const onClose = async () => {
    setLoading(true);
    props.refresh();
    setVisible(false);
    setLoading(false);
  };
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const type = typeList.filter(
        item => item.type_name === form.getFieldValue("typeName")
      );
      console.log(type);
      const submitData = {
        ...form.getFieldsValue(),
        id: theId,
        typeName: type[0]["id"],
        addTime: new Date(form.getFieldsValue().addTime).toLocaleDateString(),
      };

      console.log("submitData", submitData);

      const r = await fetch(servicePath.updateArticle, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(submitData),
      });
      const res = await r.json();

      if (res.state) {
        message.success("修改成功！");
        onClose();
      } else {
        message.error("修改失败！");
      }
    } catch (e) {
      console.log(e);
      message.warn("服务器错误！");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Drawer
        title="编辑文章"
        placement="right"
        width={640}
        onClose={onClose}
        visible={visible}
        footerStyle={{ textAlign: "right" }}
        footer={
          <Space>
            <Button loading={loading} onClick={onClose} type="danger">
              取消
            </Button>
            <Button loading={loading} onClick={handleSubmit} type="primary">
              更新
            </Button>
          </Space>
        }
      >
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 18 }}
          autoComplete="off"
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: "请输入标题！" }]}
          >
            <Input maxLength={20} />
          </Form.Item>

          <Form.Item
            label="类别"
            name="typeName"
            rules={[{ required: true, message: "请选择类别！" }]}
          >
            <Select placeholder="选择类别" className="search_select">
              {typeList.map(item => {
                return (
                  <Option key={item.id} value={item.type_name}>
                    {item.type_name}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>

          <Form.Item label="简介" name="introduce">
            <TextArea
              showCount
              maxLength={10000}
              autoSize={{ minRows: 3, maxRows: 10 }}
            />
          </Form.Item>

          <Form.Item label="内容" name="content">
            <TextArea
              maxLength={50000}
              showCount
              rows={6}
              autoSize={{ minRows: 5, maxRows: 20 }}
            />
          </Form.Item>

          <Form.Item label="添加时间" name="addTime">
            <DatePicker />
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};

export default React.forwardRef(ArticleModal);
