import { HomeOutlined } from "@ant-design/icons";
import { Col, Menu, message, Row, Space } from "antd";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import servicePath from "../../pages/api/servicePath.js";
import styles from "./index.module.css";

export default function Header() {
  const [typeList, setTypeList] = useState([]);
  const [configs, setConfigs] = useState({});
  useEffect(async () => {
    try {
      const articleTypes = await fetch(servicePath.getArticleTypes);
      let temp = await articleTypes.json();
      setTypeList(temp);
    } catch (e) {
      message.error(e.toString());
    }
  }, []);
  useEffect(async () => {
    try {
      const res = await fetch(servicePath.getBlogConfig);
      let config = await res.json();
      console.log("setConfigs", config);
      setConfigs(config);
    } catch (e) {
      message.error(e.toString());
    }
  }, []);

  return (
    <div className={styles["header"]}>
      <Row type="flex" justify="center">
        <Col xs={24} sm={24} md={14} lg={10} xl={10}>
          <Link href="/">
            <a>
              <span className={styles["header-logo"]}>{configs.title}</span>
              <span className={styles["header-txt"]}>{configs.sub_title}</span>
            </a>
          </Link>
        </Col>
        <Col className={styles["memu-div"]} xs={0} sm={0} md={8} lg={8} xl={6}>
          <Menu mode="horizontal" className={styles["menu"]}>
            <Menu.Item key="home" className={styles["menu-item"]}>
              <Link href="/">
                <Space>
                  <HomeOutlined />
                  首页
                </Space>
              </Link>
            </Menu.Item>
            {typeList.map(item => {
              return (
                <Menu.Item key={item.id} className={styles["menu-item"]}>
                  <Link href={{ pathname: "/list", query: { id: item.id } }}>
                    <Space>
                      <HomeOutlined />
                      {item.type_name}
                    </Space>
                  </Link>
                </Menu.Item>
              );
            })}
          </Menu>
        </Col>
      </Row>
    </div>
  );
}
