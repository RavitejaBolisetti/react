import React from "react";
import { useState } from "react";
import { Button, Checkbox, Form, Input, Select } from "antd";
import { Space, Row, Col } from "antd";
import { Modal } from 'antd';
// import SearchTree from "./SearchTree";
import GeoTree from "./GeoTree";


//import { objects } from "./Antd";
// import { formContent } from './GeoTree';
const { Option } = Select;
const { Search } = Input;
const onFinish = (values) => {

  console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const Antd2 = (props) => {
  const [open, setOpen] = useState(false);

  const [form] = Form.useForm();
  const [setter, setSetter] = useState("Continent");

  // console.log(props)
  console.log(props.formContent)
  const [activate, setActivate] = useState({
    Attribute: "",
    Parent: "",
    Code: "",
    Name: "",
  });

  const [show, setShow] = useState(true);

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

  const handleEdit = () => {

    props.setAntdForm(false);


  }
  const addChild = () => {

    props.setAntdForm(false);
    console.log(typeof (props.formContent), props.formContent.geoName);
    let s = "";
    switch (props.formContent.geoName) {
      case "Continent":
        // setSetter('Country');
        s = "Country"
        break;
      case 'Country':
        s = "State"
        break;
      case 'State':
        s = "City"
        break;

      case 'City':
        s = "Tahsil"
        break;

      case 'Tahsil':
        s = "Pincode"
        break;

      default:
        console.log("error");
    }
    // console.log(setter)
    console.log(props.formContent)
    props.setFormContent({
      geoName: s,
      geoCode: props.formContent.geoCode,
      geoParentCode: "",
      attributeKey: "",
    });

    props.setEditableFormContent({
      editAttribute: true,
      editParent: true,
      editCode: false,
      editName: false,
    });



  }


  const handleAddSibling = () => {
    props.setAntdForm(false);
    console.log(typeof (props.formContent), props.formContent.geoName);

    // console.log(setter)
    console.log(props.formContent)
    props.setFormContent({
      geoName: props.formContent.geoName,
      geoCode: props.formContent.geoCode,
      geoParentCode: "",
      attributeKey: "",
    });
    props.setEditableFormContent({
      editAttribute: true,
      editParent: true,
      editCode: false,
      editName: false,
    });
  }


  const EditAddSib = () => {
    return (
      <Form.Item
        wrLoginerCol={{
          offset: 8,
          span: 20,
        }}
      >
        <Button onClick={handleEdit} danger>
          Edit
        </Button>
        <Button onClick={addChild} danger>ADD CHILD</Button>

        <Button onClick={handleAddSibling} danger>ADD SIBLING</Button>
      </Form.Item>
    );
  };

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
      //   //  Attribute:props.formContent.geoName,
      //   //  Parent: props.formContent.geoCode,
      //   //  Code: props.formContent.attributeKey,
      //   //  Name: props.formContent.geoParentCode,

      // }}
      form={form}
      onFinish={onFinish}
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
            <Select placeholder={props.formContent.geoCode} disabled={props.editableFormContent.editAttribute} allowClear>
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


            <div className="input-group">
              <Input className="form-control" readOnly={props.editableFormContent.editParent} name="Parent" onChange={handle} placeholder="Parent" />

              <div className="input-group-append">

                <Button type="primary" id="hierarchyChange"
                  className="btn btn-outline srchbtn mr0 boxShdwNon"
                  disabled={props.editableFormContent.editParent}
                  onClick={() => setOpen(true)}>


                  <i className="fa fa-search"></i>
                </Button>


              </div>
            </div>
          </Form.Item>
        </Col>

      </Row>


      {/* </div > */}


      <Modal
        title=""
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}

      // bodyStyle={{height:800 }}
      >
        <h3>Parent Hierarchy</h3>
        <hr></hr>
        <Space direction="vertical">
        </Space>


        {/* <SearchTree /> */}
        <GeoTree />
        {/* <StackTree /> */}
      </Modal>

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
            <Input placeholder={props.formContent.geoCode} name="Code" readOnly={props.editableFormContent.editCode} onChange={handle} />
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
            <Input placeholder={props.formContent.geoName} name="Name" readOnly={props.editableFormContent.editName} onChange={handle} />
          </Form.Item>
        </Col>
      </Row>
      <div class="switchToggle">
        <input type="checkbox" id="switch2" />
        <label for="switch2">Status</label>
      </div>


      {/* <Form.Item
        name="remember"
        valuePropName="checked"
        wrLoginerCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item> */}
      <EditAddSib />



      {/* <div>{activate.Attribute}</div>
      <div>{activate.Parent}</div>
      <div>{activate.Code}</div>
      <div>{activate.Name}</div> */}
      {/* <button onClick={checker}>Click me</button> */}
    </Form >
  );
};
export default Antd2;