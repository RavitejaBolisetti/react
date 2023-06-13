import React, { useReducer, useState, useEffect } from 'react';
import { Form } from 'antd';
import CardProductAttribute from './CardProductAttribute';
import FormProductAttribute from './FormProductAttribute';
import { FROM_ACTION_TYPE } from 'constants/formActionType';

const ProductAttributeMaster = (props) => {
    const { productHierarchyAttributeData, isVisible, setSKUAttributes, selectedTreeData, formActionType, skuAttributes, setFormBtnActive, showGlobalNotification } = props;
    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    const [attributeForm] = Form.useForm();
    const [finalFormdata, setFinalFormdata] = useState([]);
    const [formDecider, setFormDecider] = useState(false);
    const [disableSaveButton, setDisableSaveButton] = useState(false);

    const onAttributeFormFinish = (val) => {
        finalFormdata.push(val);
        attributeForm.resetFields();
        forceUpdate();
        const formatData = [];
        finalFormdata.map((item) => formatData.push({ code: item?.attributeName?.label, value: item?.attributeValue, id: item?.attributeName?.key, fromApi: item?.fromApi === true ? true : false }));
        setSKUAttributes(formatData);
        setFormBtnActive(true);
    };

    const cardAttributeProps = {
        attributeForm,
        onAttributeFormFinish,
        forceUpdate,
        isVisible,
        finalFormdata,
        setFinalFormdata,
        formDecider,
        setFormDecider,
        selectedTreeData,
        setSKUAttributes,
        productHierarchyAttributeData,
        skuAttributes,
        setFormBtnActive,
        disableSaveButton,
        setDisableSaveButton,
        showGlobalNotification,
    };

    const formProductAttributeProps = {
        ...cardAttributeProps,
    };

    useEffect(() => {
        if (formActionType === FROM_ACTION_TYPE.CHILD || formActionType === FROM_ACTION_TYPE.SIBLING) {
            setFinalFormdata([]);
        }
        if (formActionType === FROM_ACTION_TYPE.EDIT) {
            selectedTreeData?.skuAttributes &&
                // eslint-disable-next-line array-callback-return
                selectedTreeData?.skuAttributes?.map((data) => {
                    setFinalFormdata((result) => [...result, { attributeName: { label: data?.code, id: data?.id }, attributeValue: data?.value, fromApi: true, adPhProductAttributeMstId: data?.adPhProductAttributeMstId, id: data?.id }]);
                });
            //attributeForm.resetFields();
            forceUpdate();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    console.log(finalFormdata, 'console');

    return (
        <>
            <div>
                <FormProductAttribute {...formProductAttributeProps} />
            </div>

            {finalFormdata?.length > 0 &&
                finalFormdata?.map((action) => {
                    return <CardProductAttribute {...cardAttributeProps} attributeName={action?.attributeName?.label} attributeValue={action?.attributeValue} fromApi={action?.fromApi === true ? true : false} adPhProductAttributeMstId={action?.adPhProductAttributeMstId} id={action?.id} />;
                })}
        </>
    );
};

export default ProductAttributeMaster;
