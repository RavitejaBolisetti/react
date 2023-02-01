import { CarryOutOutlined, CheckOutlined, FormOutlined } from '@ant-design/icons';
import { Select, Switch, Tree } from 'antd';
import { useState } from 'react';

import treeData2 from './geoData2.json'
let formContent= [{}];

const GeoTree = (props) => {
  const [showLine, setShowLine] = useState(true);
  const [showIcon, setShowIcon] = useState(false);
  const [showLeafIcon, setShowLeafIcon] = useState(true);
  
  const onSelect = (selectedKeys, info) => {
  // console.log('selected', selectedKeys, info);
   //props.formContent= info.node;
  // console.log(props)
  //  props.setFormContent(info.node)
 // console.log(props.open)
  if(props.open===true){
 // props.setFormContent(info.node);
   props.setFormContent(info.node);
   //props.setAntdForm(true);
   console.log("if")
  //  props.setEditableFormContent({
  //   editAttribute:true,
  //   editParent:true,
  //   editCode:true,
  //   editName:true,
  // });
}
  else {
    console.log("else")

    props.setFormContent(info.node);
    props.setAntdForm(true);
    props.setEditableFormContent({
     editAttribute:true,
     editParent:true,
     editCode:true,
     editName:true,
   });
  }
  
  }

  
  
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
      {/* <div
        style={{
          marginBottom: 16,
        }}
      >
        showLine: <Switch checked={!!showLine} onChange={setShowLine} />
        <br />
        <br />
        showIcon: <Switch checked={showIcon} onChange={setShowIcon} />
        <br />
        <br />
        showLeafIcon:{' '}
        <Select defaultValue="true" onChange={handleLeafIconChange}>
          <Select.Option value="true">True</Select.Option>
          <Select.Option value="false">False</Select.Option>
          <Select.Option value="custom">Custom icon</Select.Option>
        </Select>
      </div> */}
      <Tree
        showLine={true
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
        fieldNames={{ title: "geoName", children: "subGeo",key: "geoParentCode" }}
      />
    </div>
  );
};
export default GeoTree;
//export { formContent };