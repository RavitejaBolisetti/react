import React, { useState } from 'react';
import { Form, Collapse, Space, Row, Col, Select } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import styles from 'components/common/Common.module.css';
import { FaRegUserCircle } from 'react-icons/fa';
import  AddEditForm  from './AddEditForm';
const { Panel } = Collapse;
const { Option } = Select;

export const CustomerDetailsMaster = (props) => {
    return (
        <div className={styles.drawerCustomerMaster}>
            <h2>Booking Customer</h2>
            <AddEditForm {...props} />
        </div>
    );
};

