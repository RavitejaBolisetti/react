import React from "react";
import { useState } from "react";

import { Button, Form, Input, Select, Switch } from "antd";
import { Space, Row, Col } from "antd";
import { FaSearch } from "react-icons/fa";
import GeoTree from './GeoTree';
import ModalUtil from "./ModalUtil";


const { Option } = Select;
const { Search } = Input;
let objects = [{}];
const onFinisher = (values) => {
  console.log(values);
  objects = values;

};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const Antd = (props) => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [activate, setActivate] = useState({
    Attribute: "",
    Parent: "",
    Code: "",
    Name: "",
  });
  //   const checker = ()=> {
  //     console.log(activate.length);
  //   }
  const [show, setShow] = useState(true);
  const changer = () => {

    const obj = { ...activate }
    // console.log(obj);
    // if(obj.Attribute.length>0 && obj.Parent.length>0 && obj.Code.length>0 && obj.Name.length>0){
    //     if(show==false)
    //     {
    //         setShow(true);
    //         form.resetFields();
    //     }
    //     else
    //     {
    //     setShow(false);
    //     form.resetFields();
    //     }
    // }

  }
  const handle = (event) => {
    setActivate({
      ...activate,
      [event.target.name]: event.target.value,
    });
    console.log(event.target.name);
  };

  const handle2 = (event) => {
    setActivate({
      ...activate,
      Attribute: event,
    });
  };
  const onFill = () => {
    const obj = { ...activate }
    form.setFieldsValue({
      Attribute: obj.Attribute,
      Parent: obj.Parent,
      Code: obj.Code,
      Name: obj.Name,
    });
    console.log("I am here");
  };

  const SaveResetButton = () => {
    return (
      <Form.Item
        wrLoginerCol={{
          offset: 8,
          span: 20,
        }}
      >
        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
          <Form.Item name="Active inactive button" label="Status">
            <Switch checkedChildren="Active" unCheckedChildren="Inactive" defaultChecked />
          </Form.Item>
        </Col>

        <Button type="primary" htmlType="submit" onClick={changer}>
          Save
        </Button>

        <Button htmlType="button" onClick={onReset}>
          Reset
        </Button>
      </Form.Item >
    );
  };

  const EditAddSib = () => {
    return (
      <Form.Item
        wrAntderCol={{
          offset: 8,
          span: 20,
        }}
      >

        <Button onClick={onFill} danger>
          Edit
        </Button>
        <Button danger>ADD CHILD</Button>

        <Button danger>ADD SIBLING</Button>
      </Form.Item>
    );
  };

  const handleOk = () => {

    //props.setFormContent()
    console.log(props)
    setOpen(false)
  }
  const onReset = () => {
    form.resetFields();
    // setActivate({
    //   ...activate,
    //   Attribute: "",
    //   Parent: "",
    //   Code: "",
    //   Name: "",
    // });
  };
  return (
    <Form
      layout="vertical"
      name="basic"
      // initialValues={{
      //   remember: true,
      //   Attribute: props.formContent.geoName,
      //   Parent: props.formContent.geoCode,
      //   Code: props.formContent.attributeKey,
      //   Name: props.formContent.geoParentCode,
      // }}
      form={form}
      onFinish={onFinisher}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >

      <Row gutter={20}>
        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
          <Form.Item
            name="Attribute"
            label="Attribute Level"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select onSelect={handle2} disabled={props.editableFormContent.editAttribute} allowClear>
              <Option value="Continent">Continent</Option>
              <Option value="Country">Country</Option>
              <Option value="State">State</Option>
              <Option value="City">District/City</Option>
              <Option value="Tashil">Tashil</Option>
              <Option value="Pincode">Pincode</Option>
            </Select>
          </Form.Item>
        </Col>


        {/* <div class="col-md-6"> */}
        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
          <Form.Item
            label="Parent"
            name="Parent"
            className="control-label-blk"
            rules={[
              {
                required: true,
                message: "Please Select a parent !",
              },
            ]}
          >


            {/* <label class="control-label-blk">Parent</label>
													<div class=" input-group">
														<input name="name" type="text" placeholder="Parent"
															class="form-control">
														<div class="input-group-append">
															<button type="button" id="hierarchyChange"
																class="btn btn-outline srchbtn mr0 boxShdwNon">
																<i class="fa fa-search"></i></button> */}


            <Input.Group compact>
              <Input
                style={{
                  width: 'calc(100% - 48px)',
                }}


                readOnly={props.editableFormContent.editParent}
                name="Parent"
                onChange={handle}
                value={props.formContent.geoName} />

              <div className="input-group-append">

                <Button type="button" id="hierarchyChange" className="btn btn-outline srchbtn mr0 boxShdwNon"

                  disabled={props.editableFormContent.editParent}
                  onClick={() => {
                    props.setOpen(true)
                    // console.log("im",props.formContent)

                  }
                  }>


                  <FaSearch />
                </Button>
              </div>
            </Input.Group>
          </Form.Item>
        </Col>

      </Row>

      {/* </div> */}
      {/* <Modal
        title=""
        centered
        open={open}
        onOk={handleOk}
        onCancel={() => setOpen(false)}

      // bodyStyle={{height:800 }}
      >
        <h3>Parent Hierarchy</h3>
        <hr></hr>
        <Space direction="vertical">
        </Space>

        
        {/* <SearchTree /> */}
      {/* <GeoTree/> */}
      {/* <StackTree /> */}
      {/* </Modal> */}
      <Row gutter={20}>
        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
          <Form.Item
            label="Code"
            name="Code"
            rules={[
              {
                required: true,
                message: "Please Enter the Code !",
              },
            ]}
          >
            <Input name="Code" onChange={handle} placeholder="Code" />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
          <Form.Item
            label="Name"
            name="Name"
            rules={[
              {
                required: true,
                message: "Please input the name!",
              },
            ]}
          >
            <Input name="Name" onChange={handle} placeholder="Name" />
          </Form.Item>
        </Col>
      </Row>

      {/* <Form.Item
        name="remember"
        valuePropName="checked"
        wrAntderCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item> */}
      <SaveResetButton />

      {/* <SaveResetButton />
      <EditAddSib /> */}

      {/* <div>{activate.Attribute}</div>
      <div>{activate.Parent}</div>
      <div>{activate.Code}</div>
      <div>{activate.Name}</div> */}
      {/* <button onClick={checker}>Click me</button> */}
    </Form >
  );
};
export default Antd;
export { objects };