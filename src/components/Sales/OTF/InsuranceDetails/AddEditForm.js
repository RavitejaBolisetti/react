import React, { useState } from 'react';
import { Col, Input, Form, Row, DatePicker, Space, Card } from 'antd';
import { validateRequiredInputField } from 'utils/validation';
import { preparePlaceholderText } from 'utils/preparePlaceholder';
import styles from 'components/common/Common.module.css';
import { ViewDetail } from './ViewDetail';

const AddEditFormMain = (props) => {
    const { onCloseAction, setIsViewModeVisible, insuranceData, formActionType } = props;
    const [customerForm] = Form.useForm();

    const viewProps = {
        styles,
        onCloseAction,
        insuranceData,
    };

    return <>{!formActionType?.viewMode ? <ViewDetail {...viewProps} /> : <ViewDetail {...viewProps} />}</>;
};

export const AddEditForm = AddEditFormMain;
