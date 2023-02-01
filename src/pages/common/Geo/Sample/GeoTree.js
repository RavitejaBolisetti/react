import { CarryOutOutlined, CheckOutlined, FormOutlined } from '@ant-design/icons';
import { Select, Switch, Tree } from 'antd';
import { useState } from 'react';

import treeData2 from './geoData2.json';
let formContent = [{}];

export const GeoTree = (props) => {
    const [showLine, setShowLine] = useState(true);
    const [showIcon, setShowIcon] = useState(false);
    const [showLeafIcon, setShowLeafIcon] = useState(true);

    const onSelect = (selectedKeys, info) => {
        if (props.open === true) {
            props.setFormContent(info.node);
        } else {
            console.log('else');

            props.setFormContent(info.node);
            props.setAntdForm(true);
            props.setEditableFormContent({
                editAttribute: true,
                editParent: true,
                editCode: true,
                editName: true,
            });
        }
    };

    const handleLeafIconChange = (value) => {
        if (value === 'custom') {
            return setShowLeafIcon(<CheckOutlined />);
        }
        if (value === 'true') {
            return setShowLeafIcon(true);
        }
        return setShowLeafIcon(false);
    };
    return (
        <div>
            <Tree
                showLine={
                    true
                    // showLine
                    //   ? {
                    //       showLeafIcon,
                    //     }
                    //   : false
                }
                showIcon={showIcon}
                defaultExpandedKeys={[]}
                onSelect={onSelect}
                treeData={treeData2.data}
                fieldNames={{ title: 'geoName', children: 'subGeo', key: 'geoParentCode' }}
            />
        </div>
    );
};
