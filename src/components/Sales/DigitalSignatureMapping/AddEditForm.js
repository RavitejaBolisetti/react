/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Col, Input, Form, Button, Collapse, Switch } from 'antd';
import { expandIcon } from 'utils/accordianExpandIcon';
import { withDrawer } from 'components/withDrawer';
import { DrawerFormButton } from 'components/common/Button';
import { DataTable } from 'utils/dataTable';
import { tableColumnAddEdit } from './tableColumnAddEdit';

import { preparePlaceholderText } from 'utils/preparePlaceholder';

import { ViewDetail } from './ViewDetail';

import styles from 'assets/sass/app.module.scss';

const { Panel } = Collapse;

const AddEditFormMain = (props) => {
    const { form, formData, buttonData, setButtonData, typeData, handleButtonClick, onCloseAction, formActionType, onFinish, onFinishFailed, handleSave } = props;
    const { isLoading } = props;
    // useEffect(() => {
    //     partyDetailForm.setFieldsValue({
    //         ...formData,
    //     });
    //     partyDetailForm.setFieldsValue({
    //         partyName: formData?.partyName ?? formData?.customerName,
    //         address: formData?.address,
    //         city: formData?.city,
    //         state: formData?.state,
    //         mobileNumber: formData?.mobileNumber,
    //         mitraType: formData?.mitraType,
    //     });
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [formData]);

    const tableData = [
        {
            branch: 'Baroda',
            accessible: 'Y',
        },
        {
            branch: 'Bodeli',
            accessible: 'N',
        },
    ];

    const handleFormValueChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const handleFormFieldChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const buttonProps = {
        formData,
        onCloseAction,
        buttonData,
        setButtonData,
        handleButtonClick,
    };

    const viewProps = {
        isVisible: formActionType?.viewMode,
        formData,
        styles,
        typeData,
        tableData,
        formActionType,
    };

    return (
        <>
            <Form layout="vertical" autoComplete="off" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <Row gutter={20} className={styles.drawerBody}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        {formActionType?.viewMode ? (
                            <ViewDetail {...viewProps} />
                        ) : (
                            <>
                                <Row gutter={20}>
                                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                        <Form.Item initialValue={formData?.dealerName} label="Dealer Name" name="dealerName">
                                            <Input placeholder={preparePlaceholderText('Dealer Name')} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                        <Form.Item initialValue={formData?.employeeName} label="Employee Name" name="employeeName">
                                            <Input placeholder={preparePlaceholderText('Employee Name')} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <div className={styles.innerCollapse}>
                                    <Collapse defaultActiveKey={['1']} expandIcon={expandIcon} expandIconPosition="end">
                                        <Panel key="1" header="Branches Accessible">
                                            <Row gutter={20}>
                                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                    {/* <Form.Item initialValue={formData?.areaOffice} label="Area Office" name="areaOffice"> */}
                                                    <DataTable tableColumn={tableColumnAddEdit({ handleButtonClick, typeData, formActionType })} tableData={tableData} pagination={false} />
                                                    {/* </Form.Item> */}
                                                </Col>
                                            </Row>
                                            <Row gutter={20}>
                                                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                                    <Button className={styles.marR20} onClick={() => handleSave()} type="primary">
                                                        Save
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Panel>
                                    </Collapse>
                                </div>
                            </>
                        )}
                    </Col>
                </Row>

                <DrawerFormButton {...buttonProps} />
            </Form>
        </>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, {});
