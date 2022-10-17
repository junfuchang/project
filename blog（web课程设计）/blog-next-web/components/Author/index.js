import { QqCircleFilled, WechatFilled } from "@ant-design/icons";
import { Avatar, Divider, message, Popover } from "antd";
import React, { useEffect, useState } from "react";
import servicePath from "../../pages/api/servicePath";
import styles from "./index.module.css";

const Author = () => {
  const [configs, setConfigs] = useState({});

  useEffect(async () => {
    try {
      const res = await fetch(servicePath.getBlogConfig);
      let config = await res.json();
      setConfigs(config);
    } catch (e) {
      message.error(e.toString());
    }
  }, []);
  return (
    <div className={styles["author-div"]}>
      <div>
        <Avatar
          size={100}
          style={{ color: "#1e90ff", backgroundColor: "#d9edff" }}
          src={configs.img_url}
        ></Avatar>
      </div>

      <div className={styles["author-introduction"]}>
        {configs.slogan}
        <Divider>社交账号</Divider>
        {/* <Avatar size={28} icon="github" className={styles["account"]} /> */}
        <Popover content={<div>{configs.qq}</div>} title="QQ">
          <Avatar
            size={28}
            icon={
              <QqCircleFilled style={{ fontSize: "28px", color: "#08c" }} />
            }
            className={styles["account"]}
          />
        </Popover>

        <Popover content={<div>{configs.we_chat}</div>} title="微信">
          <Avatar
            size={28}
            icon={<WechatFilled style={{ fontSize: "28px", color: "#08c" }} />}
            className={styles["account"]}
          />
        </Popover>
      </div>
    </div>
  );
};

export default Author;
