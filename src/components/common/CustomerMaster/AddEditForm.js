import React, { useState, useEffect } from 'react';
import { Col, Input, Form, Row, Select, Button, Collapse, Avatar, Card, Timeline, Progress, Space } from 'antd';
import { validateRequiredInputField, validateRequiredSelectField, validationFieldLetterAndNumber } from 'utils/validation';
import { withDrawer } from 'components/withDrawer';

import { FaChevronDown } from 'react-icons/fa';

import { AiOutlinePlusSquare, AiOutlineMinusSquare, AiOutlineClose } from 'react-icons/ai';
import styles from 'components/common/Common.module.css';

import { CustomerDetailsMaster, IndividualAddressMaster } from './IndividualCustomer';
import { IndividualAccountRelatedMaster } from './IndividualCustomer/AccountRelated';
import { ViewCustomerMaster } from './ViewCustomerMaster';

import FormProgressBar from './FormProgressBar';
import { IndividualProfileMaster } from './IndividualCustomer';

const { Option } = Select;
const { TextArea } = Input;
const { Panel } = Collapse;
const { Meta } = Card;
const attributeData = ['mh1', 'mh2', 'mh3', 'mh4'];
const AddEditFormMain = (props) => {
    const { saveclick, onCloseAction, productHierarchyData, DealerSearchvalue, handleEditData, showSaveBtn, setSaveAndAddNewBtnClicked, isDataAttributeLoaded, setsaveclick, setsaveandnewclick, saveandnewclick, isLoadingOnSave, formBtnDisable, saveAndSaveNew, saveBtn, setFormBtnDisable, onFinishFailed, onFinish, form, handleAdd, drawer, data, setDrawer, isChecked, formData, setIsChecked, formActionType, isReadOnly, setFormData, setForceFormReset, footerEdit, handleUpdate2, DealerData, tableDetailData } = props;
    const { isFormBtnActive, setFormBtnActive, isViewModeVisible, setClosePanels, AccessMacid, setAccessMacid, setShowSaveBtn, hanndleEditData } = props;
    const { finalFormdata, setfinalFormdata } = props;
    const [leftTimeline, setleftTimeline] = useState({
        AccountRelated: false,
        Address: false,
        Contacts: false,
        CustomerDetails: true,
        FamilyDetails: false,
        IndividualProfile: false,
        customerProfile:false,
    });
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
    const TimelineProps = {
        leftTimeline,
        setleftTimeline,
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
    const renderElement = () => {
        if (leftTimeline?.AccountRelated === true) {
            return <IndividualAccountRelatedMaster />;
        } else if (leftTimeline?.CustomerDetails === true) {
            return <CustomerDetailsMaster />;
        } else if (leftTimeline?.Address === true) {
            return <IndividualAddressMaster />;
        } else if (leftTimeline?.Contacts === true) {
        } else if (leftTimeline?.CustomerDetails === true) {
        } else if (leftTimeline.IndividualProfile === true) {
            return <IndividualProfileMaster />;
        }
        else if(leftTimeline?.FamilyDetails===true)
        {

        }
    };

    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className={styles.customerMasterDrawer}>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6} className={styles.timelineBg}>
                            <Row>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                    <Collapse bordered={true} defaultActiveKey={['1']} expandIcon={({ isActive }) => <FaChevronDown size={18} rotate={isActive ? -90 : 90} />}>
                                        <Panel
                                            header={
                                                <>
                                                    <Avatar size={40}>USER</Avatar>
                                                    <Space direction="vertical">
                                                        <span>John Michael</span>
                                                        <span>C200615396</span>
                                                    </Space>
                                                </>
                                            }
                                            key="1"
                                        >
                                            <p>
                                                Customer Type: <span>Corporate</span>
                                            </p>
                                            <p>
                                                Mobile No.: <span>9893473843</span>
                                            </p>
                                        </Panel>
                                    </Collapse>
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                    <FormProgressBar {...TimelineProps} />
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={24} sm={24} md={18} lg={18} xl={18} xxl={18}>

                            {!isViewModeVisible ? renderElement() : <ViewCustomerMaster {...viewProps} />}

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
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, { width: 1200 });
