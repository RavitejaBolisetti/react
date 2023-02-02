import React,{useState} from 'react'
import GeoTree from './GeoTree';
import { Space } from "antd";
import { Modal } from 'antd';
function ModalUtil(props) {
   // const [open, setOpen] = useState(false);

   const handleOk = () => {
    props.setOpen(false)
   }
  return (
    
    <Modal
    title=""
    centered
    open={props.open}
    onOk={handleOk}
    onCancel={() => props.setOpen(false)}

  // bodyStyle={{height:800 }}
  >
    <h3>Parent Hierarchy</h3>
    <hr></hr>
    <Space direction="vertical">
    </Space>

    
    {/* <SearchTree /> */}
    

    <GeoTree editableFormContent={props.editableFormContent} setEditableFormContent={props.setEditableFormContent} antdForm={props.antdForm} setAntdForm={props.setAntdForm} setFormContent={props.setFormContent} formContent={props.formContent} open={props.open} setOpen={props.setOpen}/>
    {/* <StackTree /> */}
  </Modal>
  )
}

export default ModalUtil