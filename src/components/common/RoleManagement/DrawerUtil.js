import React from 'react';

import { TimePicker, Drawer, Input, Form, Col, Row, Switch, Button, Space, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { LinearTrash } from 'Icons';

import { validateRequiredInputField } from 'utils/validation';
import { preparePlaceholderText } from 'utils/preparePlaceholder';

import styles from 'pages/common/Common.module.css';

const { confirm } = Modal;
const onClose = () => {
    return;
};
const DrawerUtil = ({ onClose, open }) => {
    return <Drawer title={'Rolemanagement'} width="540" maskClosable={false} placement="right" onClose={onClose} open={open}></Drawer>;
};

export default DrawerUtil;
