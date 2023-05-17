import React, { useState, useEffect } from 'react';
import { Col, Input, Form, Row, Select, Button, InputNumber, DatePicker, Space, Card, Collapse, Timeline, Progress } from 'antd';
import { validateRequiredInputField, validateRequiredSelectField, validationFieldLetterAndNumber } from 'utils/validation';
import { withDrawer } from 'components/withDrawer';

import { PARAM_MASTER } from 'constants/paramMaster';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import { FaRegPlusSquare, FaPlus } from 'react-icons/fa';
import { IoTrashOutline } from 'react-icons/io5';
<<<<<<< HEAD
import { AiOutlinePlusSquare, AiOutlineMinusSquare, AiOutlineClose, AiFillCheckCircle } from 'react-icons/ai';
import { FaCheckCircle } from 'react-icons/fa';

=======
import { AiOutlinePlusSquare, AiOutlineMinusSquare, AiOutlineClose } from 'react-icons/ai';
import { CustomerProfile } from './CustomerProfile/CustomerProfile';
import { FamilyDetails } from './FamilyDetails/FamilyDetails'
>>>>>>> 1ac51dde0ecb76b0115e4ca085e64452b76a7a80
import styles from 'components/common/Common.module.css';

import { ViewCustomerMaster } from './ViewCustomerMaster';
import { MinusBorderedIcon, PlusBorderedIcon } from 'Icons';
import Address from './Address/Address';

const { Option } = Select;
const { TextArea } = Input;
const { Panel } = Collapse;
const attributeData = ['mh1', 'mh2', 'mh3', 'mh4'];
const AddEditFormMain = (props) => {
    const { saveclick, onCloseAction, productHierarchyData, DealerSearchvalue, handleEditData, showSaveBtn, setSaveAndAddNewBtnClicked, isDataAttributeLoaded, setsaveclick, setsaveandnewclick, saveandnewclick, isLoadingOnSave, formBtnDisable, saveAndSaveNew, saveBtn, setFormBtnDisable, onFinishFailed, onFinish, form, handleAdd, drawer, data, setDrawer, isChecked, formData, setIsChecked, formActionType, isReadOnly, setFormData, setForceFormReset, footerEdit, handleUpdate2, DealerData, tableDetailData } = props;
    const { isFormBtnActive, setFormBtnActive, isViewModeVisible, setClosePanels, AccessMacid, setAccessMacid, setShowSaveBtn, hanndleEditData } = props;
    const { finalFormdata, setfinalFormdata } = props;
    const [Macid, setMacid] = useState();

    const [openAccordian, setOpenAccordian] = useState(1);
    const [disableadd, setdisableadd] = useState(false);

    const handleFormValueChange = () => {
        setFormBtnActive(true);
    };
    useEffect(() => {
        console.log('This is the Access Macid : ', AccessMacid);
        setfinalFormdata({ ...finalFormdata, Macid: AccessMacid });
    }, [AccessMacid]);

    const handleFormFieldChange = () => {
        setFormBtnActive(true);
    };

    const handleDelete = (event, key) => {
        console.log('key', key);
        const newAccessid = AccessMacid.filter((el) => {
            return el?.key != key;
        });
        setAccessMacid(newAccessid);
    };
    const handleAddMacid = (event, key) => {
        form.validateFields();
        form.resetFields();
        const CardData = {
            macid: Macid,
            key: AccessMacid?.length,
        };
        setAccessMacid([...AccessMacid, CardData]);
        console.log('This is the macID : ', CardData);
    };
    const onChangeCollapse = (collapse) => {
        console.log('collapse: :', collapse);
    };
    const Checkduplicate = (value) => {
        const index = AccessMacid?.findIndex((el) => el?.macid === value);

        if (index !== -1) {
            setdisableadd(true);
            return Promise.reject('Their are duplicate Macid');
        } else {
            setdisableadd(false);

            return Promise.resolve('');
        }
    };
    useEffect(() => {
        console.log('We are getting dealer data: :', DealerData);
    }, [DealerData]);

    const handleCollapse = (key) => {
        setOpenAccordian((prev) => (prev === key ? '' : key));
    };

    const viewProps = {
        isVisible: isViewModeVisible,
        handleCollapse,
        openAccordian,
        setClosePanels,
        finalFormdata,
        DealerData,
        setfinalFormdata,
        styles,
        isViewModeVisible,
        AccessMacid,
        DealerSearchvalue,
        productHierarchyData,
    };

    return (
<<<<<<< HEAD
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className={styles.customerMasterDrawer}>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6} className={styles.timelineBg}>
                            <Timeline
                                items={[
                                    {
                                        dot: (
                                            <FaCheckCircle />
                                        ),
                                        children: (
                                            <>
                                                <p>Customer Details</p>
                                                <Progress percent={100} size="small" />
                                            </>
                                        ),
                                    },
                                    {
                                        dot: (
                                            <FaCheckCircle />
                                        ),
                                        children: (
                                            <>
                                                <p>Customer Profile</p>
                                                <Progress percent={100} size="small" />
                                            </>
                                        ),
                                    },
                                    {
                                        dot: (
                                            <FaCheckCircle />
                                        ),
                                        children: (
                                            <>
                                                <p>Address</p>
                                                <Progress percent={100} size="small" />
                                            </>
                                        ),
                                    },
                                    {
                                        dot: (
                                            <FaCheckCircle />
                                        ),
                                        children: (
                                            <>
                                                <p>Contact</p>
                                                <Progress percent={100} size="small" />
                                            </>
                                        ),
                                    },
                                    {
                                        dot: (
                                            <FaCheckCircle />
                                        ),
                                        children: (
                                            <>
                                                <p>Account Related</p>
                                                <Progress percent={100} size="small" />
                                            </>
                                        ),
                                    },
                                    {
                                        dot: (
                                            <FaCheckCircle />
                                        ),
                                        children: 'Thank You',
                                    },
                                ]}
                            />
                        </Col>
                        <Col xs={24} sm={24} md={18} lg={18} xl={18} xxl={18}>
                            <Form autoComplete="off" layout="vertical" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                                {!isViewModeVisible ? (
                                    <Space
                                        direction="vertical"
                                        size="middle"
                                        style={{
                                            display: 'flex',
                                            marginBottom: '30px',
                                        }}
                                    >




                                    </Space>
                                ) : (
                                    <ViewCustomerMaster {...viewProps} />
                                )}


                                <Row gutter={20} className={styles.formFooter}>
                                    <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.footerBtnLeft}>
                                        <Button danger onClick={onCloseAction}>
                                            {footerEdit ? 'Close' : 'Cancel'}
                                        </Button>
                                    </Col>

                                    <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.footerBtnRight}>
                                        {!footerEdit && showSaveBtn && (
                                            <Button disabled={!isFormBtnActive} onClick={() => setSaveAndAddNewBtnClicked(false)} htmlType="submit" type="primary">
                                                Save
                                            </Button>
                                        )}

                                        {footerEdit && (
                                            <Button onClick={hanndleEditData} form="configForm" key="submitAndNew" htmlType="submit" type="primary">
                                                Edit
                                            </Button>
                                        )}
                                    </Col>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
=======
        <Form autoComplete="off" layout="vertical" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            {!isViewModeVisible ? (
                <CustomerProfile/>
            ) : (
                <ViewCustomerMaster {...viewProps} />
            )}

            <Row gutter={20} className={styles.formFooter}>
                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.footerBtnLeft}>
                    <Button danger onClick={onCloseAction}>
                        {footerEdit ? 'Close' : 'Cancel'}
                    </Button>
                </Col>

                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.footerBtnRight}>
                    {!footerEdit && showSaveBtn && (
                        <Button disabled={!isFormBtnActive} onClick={() => setSaveAndAddNewBtnClicked(false)} htmlType="submit" type="primary">
                            Save
                        </Button>
                    )}

                    {footerEdit && (
                        <Button onClick={hanndleEditData} form="configForm" key="submitAndNew" htmlType="submit" type="primary">
                            Edit
                        </Button>
                    )}
>>>>>>> 1ac51dde0ecb76b0115e4ca085e64452b76a7a80
                </Col>
            </Row>

        </>
    );
};

<<<<<<< HEAD
export const AddEditForm = withDrawer(AddEditFormMain, { width: '1200' });
=======
export const AddEditForm = withDrawer(AddEditFormMain, { width: 1200 });
>>>>>>> 1ac51dde0ecb76b0115e4ca085e64452b76a7a80
