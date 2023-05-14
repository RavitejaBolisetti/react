import React, { useEffect, useState } from 'react';
import { Col, Input, Form, Row, Collapse, Select, Switch, Button, Space, Spin } from 'antd';
import { withDrawer } from 'components/withDrawer';
import style from '../../common/DrawerAndTable.module.css';
import { PlusBorderedIcon, MinusBorderedIcon } from 'Icons';
import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import ProductAttributeMaster from './ProductAttribute/ProductAttributeMaster';
import ProductDetail from './ProductDetail';
import styles from 'components/common/Common.module.css';

const { Panel } = Collapse;

const AddEditFormMain = (props) => {
    const { onCloseAction, handleAttributeChange, formActionType, fieldNames, isReadOnly = false, formData, isDataAttributeLoaded, attributeData, productHierarchyData, productHierarchyAttributeData,showProductAttribute } = props;
    const { selectedTreeKey, setSelectedTreeKey, selectedTreeSelectKey, setSelectedTreeSelectKey, handleSelectTreeClick, flatternData } = props;
    const { isFormBtnActive, setFormBtnActive } = props;
    const { form, skuAttributes, setSKUAttributes, fetchListHierarchyAttributeName, listShowLoading, userId, isVisible } = props;

    const [actionForm] = Form.useForm();
    const [openAccordian, setOpenAccordian] = useState(1);
    const [isAddBtnDisabled, setAddBtnDisabled] = useState(false);

    const { onFinish, onFinishFailed } = props;

    const treeFieldNames = { ...fieldNames, label: fieldNames?.title, value: fieldNames?.key };

    const disabledProps = { disabled: isReadOnly };

    let treeCodeId = '';
    let treeCodeReadOnly = false;

    if (formActionType === FROM_ACTION_TYPE.EDIT) {
        treeCodeId = formData?.parntProdctId;
    } else if (formActionType === FROM_ACTION_TYPE.CHILD) {
        //console.log(selectedTreeKey,'parent')
        treeCodeId = selectedTreeKey && selectedTreeKey[0];
        treeCodeReadOnly = true;
    } else if (formActionType === FROM_ACTION_TYPE.SIBLING) {
        treeCodeReadOnly = true;
        const treeCodeData = flatternData.find((i) => selectedTreeKey[0] === i.key);
        treeCodeId = treeCodeData && treeCodeData?.data?.parntProdctId;
    }

    useEffect(() => {
        setSelectedTreeSelectKey(treeCodeId);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [treeCodeId]);

    useEffect(() => {
        if (userId) {
            fetchListHierarchyAttributeName({ userId, setIsLoading: listShowLoading });
            //setIsLoading: listShowLoading,
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    const treeSelectFieldProps = {
        treeFieldNames,
        treeData: productHierarchyData,
        treeDisabled: treeCodeReadOnly || isReadOnly,
        selectedTreeSelectKey,
        handleSelectTreeClick,
        defaultValue: treeCodeId,
        placeholder: preparePlaceholderSelect('parent'),
    };

    const handleFormValueChange = () => {
        setFormBtnActive(true);
    };

    const handleFormFieldChange = () => {
        setFormBtnActive(true);
    };
    const handleCollapse = (key) => {
        setOpenAccordian((prev) => (prev === key ? '' : key));
    };

    const handleProductchange = (e) => {
        const value = e.target.textContent;
        // setShowProductAttribute(value);
    };

    const onActionFormFinish = (val) => {
        console.log('val', val);
        const { value, label } = val?.attributeName;
        setSKUAttributes((prev) => [...prev, { attributeName: label, id: value, attributeValue: val.attributeValue }]);
        actionForm.resetFields();
    };

    const attributeFormProps = {
        form,
        skuAttributes: formData?.skuAttributes,
        setSKUAttributes,
        isAddBtnDisabled,
        setAddBtnDisabled,
        onFinish: onActionFormFinish,
        setFormBtnActive,
        productHierarchyAttributeData,
        isVisible,
    };

    const productDetailsProps = {
        mainForm: form,
        handleFormValueChange,
        handleFormFieldChange,
        onMainFormFinish: onFinish,
        onFinishFailed,
        formData,
        handleAttributeChange,
        handleProductchange,
        isDataAttributeLoaded,
        disabledProps,
        attributeData,
        treeCodeId,
        treeSelectFieldProps,
        formActionType,
        onCloseAction,
        isFormBtnActive,
        isReadOnly,
    };

    return (
        <>
            <ProductDetail {...productDetailsProps} />
            {showProductAttribute && (
                <Collapse className={openAccordian === 1 ? style.accordianHeader : ''} onChange={() => handleCollapse(1)} expandIcon={({ isActive }) => (isActive ? <MinusBorderedIcon /> : <PlusBorderedIcon />)}>
                    <Panel header={<span className={openAccordian === 1 ? style.accordianHeader : ''}>Product Atrribute Details</span>} key="1">
                        <ProductAttributeMaster {...attributeFormProps} />
                    </Panel>
                </Collapse>
            )}
             
        </>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, {});
