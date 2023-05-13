import React, { Fragment, useReducer, useState } from 'react';
import { Form } from 'antd';
import CardProductAttribute from './CardProductAttribute';
import FormProductAttribute from './FormProductAttribute';

const ProductAttributeMaster = ({ setIsBtnDisabled, isBtnDisabled, onFinish = () => {}, onFinishFailed = () => {}, isReadOnly = false, setFormBtnDisable, productHierarchyAttributeData,isVisible }) => {
    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    const [attributeForm] = Form.useForm();

    const [finalFormdata, setFinalFormdata] = useState([]);

    const onAttributeFormFinish = (val) => {
        setFinalFormdata([...finalFormdata, val]);
        attributeForm.resetFields();
        forceUpdate();
    };

    const formProductAttributeProps = {
        setIsBtnDisabled,
        isBtnDisabled,
        productHierarchyAttributeData,
        finalFormdata,
        attributeForm,
        onAttributeFormFinish,
        isVisible
    };

    const cardAttributeProps = {
        attributeForm,
        onAttributeFormFinish,
        finalFormdata,
        //setfinalFormdata,
        forceUpdate,
        setIsBtnDisabled,
        isBtnDisabled,
        isVisible,
    };

    return (
        <Fragment>
            {/* <Divider /> */}
            <div>
                <FormProductAttribute {...formProductAttributeProps} />
            </div>

            {finalFormdata?.length > 0 &&
                finalFormdata?.map((action) => {
                    return (
                        <CardProductAttribute {...cardAttributeProps} 
                            attributeName={action.attributeName.label}
                            attributeValue={action.attributeValue}
                            attributeId={action.attributeName.key}
                        />
                    )
                })
            }
        </Fragment>
    );
};

export default ProductAttributeMaster;
