/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { CKEditor } from 'ckeditor4-react';

const CustomEditor = (props) => {
    const { onChange = undefined, onBlur = undefined, data = undefined, readOnly = false } = props;
    return (
        <CKEditor
            initData={data}
            readOnly={readOnly}
            onChange={(e) => {
                onChange && onChange(e);
            }}
            onBlur={(e) => {
                onBlur && onBlur(e);
            }}
            config={{
                toolbar: [['Source'], ['Styles', 'Format', 'Font', 'FontSize'], ['Bold', 'Italic'], ['Undo', 'Redo'], ['EasyImageUpload']],
                removePlugins: 'image',
                extraAllowedContent: '*(*);*{*}',
                allowedContent: true,
                isCompatible: true,
                disableAutoInLine: true,
                extraPlugins: 'autogrow',
                autoGrow_bottomSpace: 50,
            }}
        />
    );
};

export default CustomEditor;
