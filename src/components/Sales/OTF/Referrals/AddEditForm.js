import React, { useState } from 'react';

import styles from 'components/common/Common.module.css';
import { ViewDetail } from './ViewDetail';

const AddEditFormMain = (props) => {
    const { setIsViewModeVisible, formActionType } = props;

    const viewProps = {
        styles,
    };

    return !formActionType?.viewMode ? <></> : <ViewDetail {...viewProps} />;
};

export const AddEditForm = AddEditFormMain;
