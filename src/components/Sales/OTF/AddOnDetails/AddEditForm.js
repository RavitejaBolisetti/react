import React, { useState } from 'react';

import styles from 'components/common/Common.module.css';
import { ViewDetail } from './ViewDetail';

function AddEditForm(props) {
    const [activeKey, setActiveKey] = useState("");
    const { onCloseAction, isViewModeVisible, setIsViewModeVisible } = props;
  
    const handleEdit = () => {
        setIsViewModeVisible(false);
    };
    const onChange = (values) => {
        setActiveKey(prev => prev === values ? "" : values );
    };

    const viewProps = {
        activeKey,
        setActiveKey,
        onChange,
        styles,
        onCloseAction,
        handleEdit,
    };

    return (
        <>
            {!isViewModeVisible ? (
                
                <ViewDetail {...viewProps} />
            ) : (
                <ViewDetail {...viewProps} />
            )}
        </>
    );
}

export default AddEditForm;
