import React, { useState, useEffect } from 'react';
import { Col, Input, Form, Row, Select, Button, Collapse, Avatar, Card, Timeline, Progress, Space } from 'antd';
import { validateRequiredInputField, validateRequiredSelectField, validationFieldLetterAndNumber } from 'utils/validation';
import { withDrawer } from 'components/withDrawer';

import { CaretRightOutlined } from '@ant-design/icons';
import { BsRecordCircleFill } from 'react-icons/bs';
import { FaCheckCircle, FaChevronDown } from 'react-icons/fa';

import { AiOutlinePlusSquare, AiOutlineMinusSquare, AiOutlineClose } from 'react-icons/ai';
import { CustomerDetailsMaster } from './CustomerDetails';

import styles from 'components/common/Common.module.css';

import { ViewCustomerMaster } from './ViewCustomerMaster';
import Address from './Address/Address';

const { Option } = Select;
const { TextArea } = Input;
const { Panel } = Collapse;
const { Meta } = Card;
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

    return <CustomerDetailsMaster />;
};

export const AddEditForm = withDrawer(AddEditFormMain, { width: '1200' });
