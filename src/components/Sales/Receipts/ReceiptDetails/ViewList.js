/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Collapse, Typography, Row, Col } from 'antd';
import { HiOutlineCurrencyRupee } from 'react-icons/hi';

import styles from 'assets/sass/app.module.scss';
//import styles from 'components/common/Common.module.css';

import { expandIcon } from 'utils/accordianExpandIcon';
import { getCodeValue } from 'utils/getCodeValue';
import { ViewPaymentDetail } from './ViewPaymentDetail';

const { Panel } = Collapse;
const { Text } = Typography;

const ViewList = (props) => {
    const { paymentDataList, deleteContactHandeler, setPaymentDataList, onFinish, typeData, paymentModeType } = props;
    const { isAdding, setShowAddEditForm, setIsListEditing, isListEditing, showAddEditForm, paymentForm, receiptForm } = props;

    const [openListAccordian, setOpenListAccordian] = useState('');

    const handleListCollapse = (key) => {
        if (isListEditing) return;
        setOpenListAccordian((prev) => (prev === key ? '' : key));
    };

    const detailProps = {
        ...props,
        setShowAddEditForm,
        showAddEditForm,
        setPaymentDataList,
        onFinish,
        receiptForm,
        paymentForm,
        isListEditing,
        setIsListEditing,
        deleteContactHandeler,
        typeData,
    };

    return (
        <div>
            {paymentDataList?.length > 0 &&
                paymentDataList?.map((data, i) => {
                    return (
                        <Collapse key={data?.paymentMode} onChange={() => handleListCollapse(i)} expandIconPosition="end" expandIcon={expandIcon} activeKey={openListAccordian} collapsible="icon">
                            <Panel
                                key={i}
                                header={
                                    <Row justify="space-between">
                                        <Col xs={14} sm={14} md={14} lg={14} xl={14}>
                                            <Text strong> {getCodeValue(paymentModeType, data?.paymentMode)}</Text>{' '}
                                        </Col>
                                        {!(isListEditing || isAdding) && (
                                            <Col xs={10} sm={10} md={10} lg={10} xl={10}>
                                                <div className={styles.floatRight}>
                                                    <HiOutlineCurrencyRupee style={{ color: '#ff3e5b', fontSize: '20px', marginBottom: '-4px' }} />
                                                    <h style={{ color: '#8e8585' }}> : </h>
                                                    <Text type="secondary">{data?.receivedAmount}</Text>
                                                </div>
                                            </Col>
                                        )}
                                    </Row>
                                }
                            >
                                <ViewPaymentDetail styles={styles} formData={data} index={i} {...detailProps} />
                            </Panel>
                        </Collapse>
                    );
                })}
        </div>
    );
};

export default ViewList;
