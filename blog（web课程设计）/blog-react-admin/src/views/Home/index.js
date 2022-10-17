import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "./index.css";

const { Header, Sider, Content } = Layout;

const Home = props => {
  const [collapsed, setCollapsed] = useState(false);
  const [nowMenu, setNowMenu] = useState("ArticleList");
  const navigate = useNavigate();
  const toggle = () => {
    setCollapsed(!collapsed);
  };
  const localUrl = useLocation();

  useEffect(() => {
    setNowMenu(localUrl.pathname.substring(6));
  }, [localUrl]);

  return (
    <>
      <Layout className="layout">
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["ArticleList"]}
            selectedKeys={[nowMenu]}
          >
            <Menu.Item
              key="ArticleList"
              icon={<UserOutlined />}
              onClick={() => {
                navigate("/home/ArticleList");
              }}
            >
              文章管理
            </Menu.Item>
            <Menu.Item
              key="AddArticle"
              icon={<UserOutlined />}
              onClick={() => {
                navigate("/home/AddArticle");
              }}
            >
              发布文章
            </Menu.Item>
            <Menu.Item
              key="BlogConfig"
              icon={<UploadOutlined />}
              onClick={() => {
                navigate("/home/BlogConfig");
              }}
            >
              博客配置
            </Menu.Item>
            <Menu.Item
              key="UserList"
              icon={<UserOutlined />}
              onClick={() => {
                navigate("/home/UserList");
              }}
            >
              用户管理
            </Menu.Item>
          </Menu>
        </Sider>

        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: toggle,
              }
            )}
          </Header>

          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              overflow: "auto",
            }}
          >
            <Outlet></Outlet>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};
export default Home;
