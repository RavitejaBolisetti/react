/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import { LANGUAGE_EN } from 'language/en';
import { ConfirmationModal } from './ConfirmationModal';
import { translateContent } from './translateContent';

export const handleUnSavedChange = ({ buttonData, setButtonData, unSavedDataModalProps, setUnSavedModelVisible, successFn = undefined, formActionType = undefined }) => {
    const onCloseAction = () => setUnSavedModelVisible(false);
    const onSubmitAction = () => {
        successFn && successFn();
        setUnSavedModelVisible({ ...unSavedDataModalProps, isVisible: false });
        setButtonData({ ...buttonData, formBtnActive: false });
    };

    if (buttonData?.formBtnActive && !formActionType?.addMode) {
        setUnSavedModelVisible({
            ...unSavedDataModalProps,
            isVisible: true,
            onSubmitAction,
            onCloseAction,
        });
    } else {
        successFn();
    }
};

export const UnSaveDataConfirmation = ({ isVisible = false, onCloseAction, onSubmitAction }) => {
    const unsavedDataModalProps = {
        isVisible,
        titleOverride: LANGUAGE_EN.GENERAL.UNSAVE_DATA_WARNING.TITLE,
        closable: false,
        onCloseAction,
        onSubmitAction,
        submitText: translateContent('global.buttons.leave'),
        showField: false,
        text: LANGUAGE_EN.GENERAL.UNSAVE_DATA_WARNING.MESSAGE,
    };
    return <ConfirmationModal {...unsavedDataModalProps} />;
};
