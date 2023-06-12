import React, { useReducer, useState, useEffect } from 'react';
import { Form } from 'antd';
import CardProductAttribute from './CardProductAttribute';
import FormProductAttribute from './FormProductAttribute';
import { FROM_ACTION_TYPE } from 'constants/formActionType';

const ProductAttributeMaster = (props) => {
    const { productHierarchyAttributeData, isVisible, setSKUAttributes, selectedTreeData, formActionType, skuAttributes, setFormBtnActive } = props;
    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    const [attributeForm] = Form.useForm();
    const [finalFormdata, setFinalFormdata] = useState([]);
    const [formDecider, setFormDecider] = useState(false);

    const onAttributeFormFinish = (val) => {
        finalFormdata.push(val);
        attributeForm.resetFields();
        forceUpdate();
        const formatData = [];

        finalFormdata.forEach((item) => {
            formatData.push({ code: item?.attributeName?.label, value: item?.attributeValue, adPhProductAttributeMstId: item?.attributeName?.key });
        });

        setSKUAttributes(formatData);
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
                    setFinalFormdata([...finalFormdata, { attributeName: { label: data.code }, attributeValue: data.value, fromApi: true }]);
                });
            attributeForm.resetFields();
            forceUpdate();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div>
                <FormProductAttribute {...formProductAttributeProps} />
            </div>

            {finalFormdata?.length > 0 &&
                finalFormdata?.map((action) => {
                    return <CardProductAttribute {...cardAttributeProps} attributeName={action?.attributeName?.label} attributeValue={action?.attributeValue} attributeId={action?.attributeName?.key} fromApi={action?.fromApi} />;
                })}
        </>
    );
};

export default ProductAttributeMaster;
