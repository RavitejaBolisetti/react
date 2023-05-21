import React, { Fragment, useReducer, useState, useEffect } from 'react';
import { Form } from 'antd';
import CardProductAttribute from './CardProductAttribute';
import FormProductAttribute from './FormProductAttribute';
import { FROM_ACTION_TYPE } from 'constants/formActionType';

const ProductAttributeMaster = (props) => {
    const { productHierarchyAttributeData, isVisible, setSKUAttributes, selectedTreeData, formActionType,setFormBtnActive } = props;
    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    const [attributeForm] = Form.useForm();

    const [finalFormdata, setFinalFormdata] = useState([]);
    const [formDecider, setFormDecider] = useState(false);
    const [ validationProp, setValidationProp ] = useState(false);
    let validation = false;

    const onAttributeFormFinish = (val) => {
        validation = false;
        setValidationProp(false);

        if (finalFormdata.length > 0) {
            for (let i = 0; i < finalFormdata.length; i++) {
                if (finalFormdata[i].attributeName.label === val.attributeName.label && finalFormdata[i].attributeValue === val.attributeValue) {
                    validation = true;
                    setValidationProp(true);
                    break;
                }
            }
        }

        if (!validation) {
            finalFormdata.push(val);
            attributeForm.resetFields();
            forceUpdate();
            const formatData = [];
            finalFormdata.map((item) => formatData.push({ code: item?.attributeName?.label, value: item?.attributeValue, adPhProductAttributeMstId: item?.attributeName?.key }));
            setSKUAttributes(formatData);
        }
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
        setFormBtnActive,
        productHierarchyAttributeData,

    };

    const formProductAttributeProps = {
        ...cardAttributeProps,
        
        validationProp,
    };

    useEffect(() => {
        if (formActionType === FROM_ACTION_TYPE.CHILD || formActionType === FROM_ACTION_TYPE.SIBLING) {
            setFinalFormdata([]);
        }
        if (formActionType === FROM_ACTION_TYPE.EDIT) {
            selectedTreeData?.skuAttributes &&
                selectedTreeData?.skuAttributes?.map((data) => {
                    setFinalFormdata([...finalFormdata, { attributeName: { label: data.code }, attributeValue: data.value, fromApi: true }]);
                });
            attributeForm.resetFields();
            forceUpdate();
        }
    }, []);

    console.log(finalFormdata,'checkDta')

    return (
        <Fragment>
            {/* <Divider /> */}
            <div>
                <FormProductAttribute {...formProductAttributeProps} />
            </div>

            {finalFormdata?.length > 0 &&
                finalFormdata?.map((action) => {
                    return <CardProductAttribute {...cardAttributeProps} attributeName={action?.attributeName?.label} attributeValue={action?.attributeValue} attributeId={action?.attributeName?.key} fromApi={action?.fromApi} />;
                })}
        </Fragment>
    );
};

export default ProductAttributeMaster;
