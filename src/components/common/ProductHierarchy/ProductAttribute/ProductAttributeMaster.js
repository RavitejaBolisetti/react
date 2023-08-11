/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useReducer, useState } from 'react';
import { Form } from 'antd';
import CardProductAttribute from './CardProductAttribute';
import FormProductAttribute from './FormProductAttribute';

function ProductAttributeMaster(props) {
    const { productHierarchyAttributeData, isVisible, selectedTreeData, setFormBtnActive, showGlobalNotification, skuAttributes, setSKUAttributes, disabledEdit, setDisabledEdit } = props;
    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    const [attributeForm] = Form.useForm();
    const [disableSaveButton, setDisableSaveButton] = useState(false);

    const onAttributeFormFinish = (val) => {        
        let data = { ...val, code: val?.attributeName?.label, attributeId: val?.attributeName?.key };
        delete data.attributeName;
        setSKUAttributes((item) => [data, ...item]);
        attributeForm?.resetFields();
        forceUpdate();
        setFormBtnActive(true);
    };

    const cardAttributeProps = {
        attributeForm,
        onAttributeFormFinish,
        forceUpdate,
        isVisible,
        selectedTreeData,
        skuAttributes,
        setSKUAttributes,
        productHierarchyAttributeData,
        setFormBtnActive,
        disableSaveButton,
        setDisableSaveButton,
        showGlobalNotification,
        disabledEdit,
        setDisabledEdit,
    };

    const formProductAttributeProps = {
        ...cardAttributeProps,
    };

    return (
        <>
            <FormProductAttribute {...formProductAttributeProps} />

            {skuAttributes?.length > 0 &&
                skuAttributes?.map((action) => {
                    return <CardProductAttribute {...cardAttributeProps} code={action?.code} id={action?.id} value={action?.value} attributeId={action?.attributeId} disabledEdit={disabledEdit} />;
                })}
        </>
    );
};

export default ProductAttributeMaster;