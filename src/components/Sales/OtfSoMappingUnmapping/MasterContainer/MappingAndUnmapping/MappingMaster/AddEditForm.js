/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { withDrawer } from 'components/withDrawer';
import styles from 'assets/sass/app.module.scss';
//import SoStyles from 'components/Sales/OtfSoMappingUnmapping/Somapping.module.css';
import SoStyles from 'components/Sales/OtfSoMappingUnmapping/Somapping.module.scss';


import { preparePlaceholderText } from 'utils/preparePlaceholder';
import { converDateDayjs } from 'utils/formatDateTime';
import { Row, Col, Form, Input, Divider, Card } from 'antd';
import { ListDataTable } from 'utils/ListDataTable';
import { DrawerFormButton } from 'components/common/Button';

const { Search } = Input;

const AddEditFormMain = (props) => {
    const { isReadOnly = true, formData, form, handleOtfSearch, SearchTableProps, buttonData, setButtonData } = props;
    const disableProps = { disabled: isReadOnly };
    useEffect(() => {
        if (formData) {
            form.setFieldsValue({ ...formData, soDate: converDateDayjs(formData?.soDate) });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData]);

    return (
        <>
            <div className={styles.drawerBodyNew}>
                <Form form={form} autoComplete="off" layout="vertical" colon={false}>
                    <Row gutter={20}>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item name="soNumber" label="SO Number">
                                <Input {...disableProps} placeholder={preparePlaceholderText('soNumber')} />
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item name="poNumber" label="PO Number">
                                <Input {...disableProps} placeholder={preparePlaceholderText('poNumber')} />
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item name="soDate" label="Date">
                                <Input {...disableProps} placeholder={preparePlaceholderText('date')} />
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item name="modelDescription" label="Model Description">
                                <Input {...disableProps} placeholder={preparePlaceholderText('modelDescription')} />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
                <Divider />
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <Card>
                            <Row gutter={20}>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    {/* <Search placeholder="Search Booking Number" onSearch={handleOtfSearch} className={`${styles.searchField} ${SoStyles.marginBottom}`} /> */}
                                    <Form.Item label="Search OTF">
                                        <Search placeholder="Search Booking Number" onSearch={handleOtfSearch} type="text" allowClear />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <ListDataTable {...SearchTableProps} className={styles.marT20} />
                        </Card>
                    </Col>
                </Row>
               
            </div>
            <DrawerFormButton {...props} />
        </>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, { width: '90%' });
