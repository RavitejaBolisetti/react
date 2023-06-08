import React, { useState } from 'react';
import { Form, Collapse, Space, Row, Col, Select } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import styles from 'components/common/Common.module.css';
import { FaRegUserCircle } from 'react-icons/fa';
import { AddEditForm } from './AddEditForm';
const { Panel } = Collapse;
const { Option } = Select;

const FinananceDetailsMaster = (props) => {
    return (
        <div className={styles.drawerCustomerMaster}>
            <h2>Finance Details</h2>

            <AddEditForm />
        </div>
    );
};

export default FinananceDetailsMaster;
