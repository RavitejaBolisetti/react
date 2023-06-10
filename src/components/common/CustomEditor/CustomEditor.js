import React from 'react';
import { CKEditor } from 'ckeditor4-react';

const CustomEditor = (props) => {
    const { onChange = undefined, onBlur = undefined, data = undefined, readOnly = false } = props;
    return (
        <CKEditor
            data={data}
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
                // autoGrow_minHeight: 500,
                // autoGrow_maxHeight: 500,
                autoGrow_bottomSpace: 50,
            }}
        />
    );
};

export default CustomEditor;
