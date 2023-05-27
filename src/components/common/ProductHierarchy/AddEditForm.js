import React, { useEffect, useState } from 'react';
import { Form, Collapse } from 'antd';
import { withDrawer } from 'components/withDrawer';
import style from '../../common/DrawerAndTable.module.css';
import { PlusBorderedIcon, MinusBorderedIcon } from 'Icons';
import { FROM_ACTION_TYPE } from 'constants/formActionType';
import ProductAttributeMaster from './ProductAttribute/ProductAttributeMaster';
import ProductDetail from './ProductDetail';

const { Panel } = Collapse;

const AddEditFormMain = (props) => {
    const { onCloseAction, handleAttributeChange, formActionType, isReadOnly = false, formData, isDataAttributeLoaded, attributeData, productHierarchyAttributeData, showProductAttribute, selectedTreeData, setShowProductAttribute, skuAttributes, treeSelectProps, treeCodeId } = props;
    const { isFormBtnActive, setFormBtnActive } = props;
    const { form, setSKUAttributes, fetchListHierarchyAttributeName, listShowLoading, userId, isVisible } = props;

    const [actionForm] = Form.useForm();
    const [openAccordian, setOpenAccordian] = useState(1);
    const [isAddBtnDisabled, setAddBtnDisabled] = useState(false);

    const { onFinish, onFinishFailed } = props;

    const disabledProps = { disabled: isReadOnly };

    const productSKUKey = '63ec10a2-520d-44a4-85f6-f55a1d6911f3';

    console.log('selectedTreeData', selectedTreeData);
    useEffect(() => {
        if (userId) {
            fetchListHierarchyAttributeName({ userId, setIsLoading: listShowLoading });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    useEffect(() => {
        if (formActionType === FROM_ACTION_TYPE.CHILD || formActionType === FROM_ACTION_TYPE.SIBLING) {
            setShowProductAttribute(false);
        }
        if (formActionType === FROM_ACTION_TYPE.EDIT) {
            setShowProductAttribute(selectedTreeData?.attributeKey === productSKUKey);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formActionType, selectedTreeData]);

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
    };

    const onActionFormFinish = (val) => {
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
        selectedTreeData,
        formActionType,
    };

    const productDetailsProps = {
        mainForm: form,
        handleFormValueChange,
        handleFormFieldChange,
        onMainFormFinish: onFinish,
        onFinishFailed,
        formData,
        treeCodeId,
        handleAttributeChange,
        handleProductchange,
        isDataAttributeLoaded,
        disabledProps,
        attributeData,
        treeSelectProps,
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
