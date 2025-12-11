"use client";

import { Layout, Typography } from 'antd';

const { Footer: AntdFooter } = Layout;
const { Text } = Typography;

const Footer = () => {
  return (
    <AntdFooter style={{ 
      textAlign: 'center',
      padding: '16px 50px',
      backgroundColor: '#f0f2f5'
    }}>
      <Text type="secondary">
        © {new Date().getFullYear()} CarFinder. All rights reserved.
      </Text>
    </AntdFooter>
  );
};

export default Footer;