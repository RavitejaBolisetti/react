import React, { useState } from "react";
import { FaRupeeSign } from "react-icons/fa";

import Header from "pages/common/Header";
import Footer from "pages/common/Footer";
import LeftSideBar from "pages/common/LeftSideBar";
import TreeView from "pages/common/TreeView";

import "assets/style/new_robin.scss";
import "assets/style/sidebar.css";
import "font-awesome/css/font-awesome.min.css";

export function GeoPage() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="hold-transition sidebar-mini layout-fixed">
      <div id="wrapper">
        <Header collapsed={collapsed} />
        <LeftSideBar collapsed={collapsed} setCollapsed={setCollapsed} />
        <div
          className="content-wrapper"
          style={{ marginLeft: collapsed ? "95px" : "250px" }}
        >
          <section className="content">
            <div id="page-wrapper">
              <div className="col-lg-12 pad0">
                <div className="form-container">
                  <div className="card form_card" data-color="red" id="wizard">
                    <div className="col-md-12">
                      <div className="pageHeaderNameSection">
                        <div className="row">
                          <div className="col-md-6">
                            <span
                              className="headingGradient mrl-15"
                              // style="margin-left: -15px;"
                            >
                              <span className="innerheading">
                                Product Hierarchy
                              </span>
                            </span>
                          </div>
                          <div className="col-md-6">
                            <button
                              type="button"
                              className="btn btn-outline mr0 mrl15 fr boxShdwNon"
                            >
                              Exit
                            </button>
                            <button
                              type="button"
                              className="btn btn-outline fr mr0 boxShdwNon"
                              onclick="buttonClicked()"
                            >
                              <i
                                className="fa fa-history mrr5"
                                aria-hidden="true"
                              ></i>
                              Change History
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="leftbar">
                      <div className="row">
                        <div>
                          <button className="semicircle">
                            <i
                              className="fa fa-chevron-right mrl5"
                              aria-hidden="true"
                            ></i>
                          </button>

                          <div id="outer" className="leftpanel">
                            <div id="Inner">
                              <div className="treemenu mrt30">
                                <TreeView />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="right col">
                          <form className="row">
                            <div className="pad7" id="productHierarchy">
                              <div className="col-md-6">
                                <label className="control-label-blk">
                                  Attribute Level
                                </label>
                                <select className="form-control">
                                  <option>Select</option>
                                  <option>Mahindra Scorpio</option>
                                  <option>Mahindra KUV100 NXT</option>
                                  <option>Mahindra Scorpio Classic</option>
                                  <option>Mahindra Thar</option>
                                  <option>Mahindra Bolero</option>
                                </select>
                              </div>
                              <div className="col-md-6">
                                <label className="control-label-blk">
                                  Parent
                                </label>
                                <div className=" input-group">
                                  <input
                                    name="name"
                                    type="text"
                                    placeholder="Parent"
                                    className="form-control"
                                  />
                                  <div className="input-group-append">
                                    <button
                                      type="button"
                                      id="hierarchyChange"
                                      className="btn btn-outline srchbtn mr0 boxShdwNon"
                                    >
                                      <i className="fa fa-search"></i>
                                    </button>
                                  </div>
                                </div>
                                <div className="custom-model-main">
                                  <div className="custom-model-inner">
                                    <div className="close-btn">&#10006;</div>
                                    <div className="custom-model-wrap margin-top-15">
                                      <div className="pop-up-content-wrap form_header">
                                        <h4 className="form-subtitle4">
                                          Parent Hierarchy
                                        </h4>

                                        <div className="searchmenupopu mrt10">
                                          <span className="fa fa-search"></span>
                                          <input placeholder="Search" />
                                        </div>

                                        <div className="treemenu mrt30 pad25">
                                          <ul className="tree">
                                            <li>
                                              <a href="/">Mahindra Scorpio</a>
                                              <ul>
                                                <li>
                                                  <span>
                                                    Mahindra Scorpio-N
                                                  </span>
                                                  <ul>
                                                    <li>
                                                      Scorpio-NZ2 Petrol MT7 STR
                                                    </li>
                                                    <li>
                                                      Scorpio-NZ2 Diesel MT7 STR
                                                    </li>
                                                    <li>Scorpio-NZ2 Z2 </li>
                                                    <li>Scorpio-NZ2 Z3 </li>
                                                    <li>Scorpio-NZ2 Z4 </li>
                                                    <li>Scorpio-NZ2 Z8 </li>
                                                    <li>Scorpio-NZ2 Z8L</li>
                                                  </ul>
                                                </li>
                                                <li>
                                                  <span>
                                                    Mahindra Scorpio Classic
                                                  </span>
                                                  <ul>
                                                    <li>
                                                      Scorpio Classic SMT 7STR
                                                    </li>
                                                    <li>
                                                      Scorpio Classic S11MT 7SCC
                                                    </li>
                                                  </ul>
                                                </li>
                                                <li>
                                                  <span>Sub Product 1.3</span>
                                                  <ul>
                                                    <li>FSub Product 1.3.1</li>
                                                    <li>Sub Product 1.3.2</li>
                                                  </ul>
                                                </li>
                                                <li>
                                                  <span>Sub Product 1.4</span>
                                                  <ul>
                                                    <li>FSub Product 1.4.1</li>
                                                    <li>Sub Product 1.4.2</li>
                                                  </ul>
                                                </li>
                                                <li>
                                                  <span>Sub Product 1.5</span>
                                                  <ul>
                                                    <li>Sub Product 1.5.1</li>
                                                    <li>Sub Product 1.5.2</li>
                                                    <li>Sub Product 1.5.3</li>
                                                    <li>Sub Product 1.5.4</li>
                                                  </ul>
                                                </li>
                                              </ul>
                                            </li>
                                          </ul>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="bg-overlay"></div>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <label className="control-label-blk">
                                  Code
                                </label>
                                <input
                                  name="name"
                                  type="text"
                                  placeholder="Type Code here"
                                  className="form-control"
                                />
                              </div>
                              <div className="col-md-6">
                                <label className="control-label-blk">
                                  Short Description
                                </label>
                                <input
                                  name="name"
                                  type="text"
                                  placeholder="Type here"
                                  className="form-control"
                                />
                              </div>
                              <div className="col-md-6">
                                <label className="control-label-blk">
                                  Long Description
                                </label>
                                <textarea
                                  name="name"
                                  type="text"
                                  placeholder="Type here"
                                  rows="5"
                                  id="comment"
                                  className="form-control"
                                ></textarea>
                              </div>
                              <div className="col-md-6">
                                <label className="control-label-blk">
                                  Status
                                </label>
                                <div className="switchToggle">
                                  <input type="checkbox" id="switch2" checked />
                                  <label for="switch2">Status</label>
                                </div>
                              </div>
                              <div className="col-md-12 mrt10">
                                <button
                                  type="button"
                                  className="btn btn-outline rightbtn boxShdwNon mrl15"
                                >
                                  <i className="fa fa-undo mrr5"></i>
                                  Reset
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-outline rightbtn boxShdwNon mrl15"
                                >
                                  <i className="fa fa-save mrr5"></i>Save
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-outline rightbtn boxShdwNon mrl15"
                                >
                                  <i className="fa-solid fa-user-group mrr5"></i>{" "}
                                  Add Sibling
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-outline rightbtn boxShdwNon mrl15"
                                  onclick="buttonClicked()"
                                >
                                  <i className="fa-solid fa-user-plus mrr5"></i>
                                  Add Child
                                </button>

                                <button
                                  type="button"
                                  className="btn btn-outline rightbtn boxShdwNon mrl15"
                                  onclick="buttonClicked()"
                                >
                                  <i className="fas fa-edit mrr5"></i>
                                  Edit
                                </button>
                              </div>

                              <div className="mrt30" id="usserValidate2">
                                <div className="row">
                                  <div className="col-md-12">
                                    <div
                                      className="accordion"
                                      id="accordionExample"
                                    >
                                      <div className="card">
                                        <div
                                          className="card-header grey-bg minHeight50"
                                          data-toggle="collapse"
                                          data-target="#collapseOne"
                                          aria-expanded="true"
                                        >
                                          <span className="title fontWeight600">
                                            <span className="title fontWeight600">
                                              Product Details
                                            </span>
                                          </span>
                                          <span className="accicon">
                                            <i className="fas fa-angle-down rotate-icon"></i>
                                          </span>
                                        </div>
                                        <div
                                          id="collapseOne"
                                          className="collapse show"
                                          data-parent="#accordionExample"
                                        >
                                          <div className="card-body">
                                            <div className="col-md-6">
                                              <label className="control-label-blk">
                                                Attribute Level
                                              </label>
                                              <select className="form-control">
                                                <option>Select</option>
                                                <option>
                                                  Mahindra Scorpio
                                                </option>
                                                <option>
                                                  Mahindra KUV100 NXT
                                                </option>
                                                <option>
                                                  Mahindra Scorpio Classic
                                                </option>
                                                <option>Mahindra Thar</option>
                                                <option>Mahindra Bolero</option>
                                              </select>
                                            </div>
                                            <div className="col-md-6">
                                              <label className="control-label-blk">
                                                Parent
                                              </label>
                                              <div className=" input-group">
                                                <input
                                                  name="name"
                                                  type="text"
                                                  placeholder="Parent"
                                                  className="form-control"
                                                />
                                                <div className="input-group-append">
                                                  <button
                                                    type="button"
                                                    id="hierarchyChange"
                                                    className="btn btn-outline srchbtn mr0 boxShdwNon"
                                                  >
                                                    <i className="fa fa-search"></i>
                                                  </button>
                                                </div>
                                              </div>
                                              <div className="custom-model-main">
                                                <div className="custom-model-inner">
                                                  <div className="close-btn">
                                                    &#10006;
                                                  </div>
                                                  <div className="custom-model-wrap margin-top-15">
                                                    <div className="pop-up-content-wrap form_header">
                                                      <h4 className="form-subtitle4">
                                                        Parent Hierarchy
                                                      </h4>
                                                      <div className="searchmenupopu mrt10">
                                                        <span className="fa fa-search"></span>
                                                        <input placeholder="Search" />
                                                      </div>

                                                      <div className="treemenu mrt30 pad25">
                                                        <ul className="tree">
                                                          <li>
                                                            <a href="/">
                                                              Mahindra Scorpio
                                                            </a>
                                                            <ul>
                                                              <li>
                                                                <span>
                                                                  Mahindra
                                                                  Scorpio-N
                                                                </span>
                                                                <ul>
                                                                  <li>
                                                                    Scorpio-NZ2
                                                                    Petrol MT7
                                                                    STR
                                                                  </li>
                                                                  <li>
                                                                    Scorpio-NZ2
                                                                    Diesel MT7
                                                                    STR
                                                                  </li>
                                                                  <li>
                                                                    Scorpio-NZ2
                                                                    Z2
                                                                  </li>
                                                                  <li>
                                                                    Scorpio-NZ2
                                                                    Z3
                                                                  </li>
                                                                  <li>
                                                                    Scorpio-NZ2
                                                                    Z4
                                                                  </li>
                                                                  <li>
                                                                    Scorpio-NZ2
                                                                    Z8
                                                                  </li>
                                                                  <li>
                                                                    Scorpio-NZ2
                                                                    Z8L
                                                                  </li>
                                                                </ul>
                                                              </li>
                                                              <li>
                                                                <span>
                                                                  Mahindra
                                                                  Scorpio
                                                                  Classic
                                                                </span>
                                                                <ul>
                                                                  <li>
                                                                    Scorpio
                                                                    Classic SMT
                                                                    7STR
                                                                  </li>
                                                                  <li>
                                                                    Scorpio
                                                                    Classic
                                                                    S11MT 7SCC
                                                                  </li>
                                                                </ul>
                                                              </li>
                                                              <li>
                                                                <span>
                                                                  Sub Product
                                                                  1.3
                                                                </span>
                                                                <ul>
                                                                  <li>
                                                                    FSub Product
                                                                    1.3.1
                                                                  </li>
                                                                  <li>
                                                                    Sub Product
                                                                    1.3.2
                                                                  </li>
                                                                </ul>
                                                              </li>
                                                              <li>
                                                                <span>
                                                                  Sub Product
                                                                  1.4
                                                                </span>
                                                                <ul>
                                                                  <li>
                                                                    FSub Product
                                                                    1.4.1
                                                                  </li>
                                                                  <li>
                                                                    Sub Product
                                                                    1.4.2
                                                                  </li>
                                                                </ul>
                                                              </li>
                                                              <li>
                                                                <span>
                                                                  Sub Product
                                                                  1.5
                                                                </span>
                                                                <ul>
                                                                  <li>
                                                                    Sub Product
                                                                    1.5.1
                                                                  </li>
                                                                  <li>
                                                                    Sub Product
                                                                    1.5.2
                                                                  </li>
                                                                  <li>
                                                                    Sub Product
                                                                    1.5.3
                                                                  </li>
                                                                  <li>
                                                                    Sub Product
                                                                    1.5.4
                                                                  </li>
                                                                </ul>
                                                              </li>
                                                            </ul>
                                                          </li>
                                                        </ul>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="bg-overlay"></div>
                                              </div>
                                            </div>
                                            <div className="">
                                              <label className="control-label-blk">
                                                Code
                                              </label>
                                              <input
                                                name="name"
                                                type="text"
                                                placeholder="Type Code here"
                                                className="form-control"
                                              />
                                            </div>
                                            <div className="">
                                              <label className="control-label-blk">
                                                Short Description
                                              </label>
                                              <input
                                                name="name"
                                                type="text"
                                                placeholder="Type here"
                                                className="form-control"
                                              />
                                            </div>
                                            <div className="">
                                              <label className="control-label-blk">
                                                Long Description
                                              </label>
                                              <textarea
                                                name="name"
                                                type="text"
                                                placeholder="Type here"
                                                rows="5"
                                                id="comment"
                                                className="form-control"
                                              ></textarea>
                                            </div>
                                            <div className="">
                                              <label className="control-label-blk">
                                                Status
                                              </label>
                                              <div className="switchToggle">
                                                <input
                                                  type="checkbox"
                                                  id="switch2"
                                                  checked
                                                />
                                                <label for="switch2">
                                                  Status
                                                </label>
                                              </div>
                                            </div>
                                            <div className=" mrt10">
                                              <button
                                                type="button"
                                                className="btn btn-outline rightbtn boxShdwNon mrl15"
                                              >
                                                <i className="fa fa-undo mrr5"></i>
                                                Reset
                                              </button>
                                              <button
                                                type="button"
                                                className="btn btn-outline rightbtn boxShdwNon mrl15"
                                              >
                                                <i className="fa fa-save mrr5"></i>
                                                Save
                                              </button>
                                              <button
                                                type="button"
                                                className="btn btn-outline rightbtn boxShdwNon mrl15"
                                                onclick="buttonClicked()"
                                              >
                                                <i className="fa-solid fa-user-plus mrr5"></i>
                                                Add Child
                                              </button>

                                              <button
                                                type="button"
                                                className="btn btn-outline rightbtn boxShdwNon mrl15"
                                                onclick="buttonClicked()"
                                              >
                                                <i className="fas fa-edit mrr5"></i>
                                                Edit
                                              </button>

                                              <button
                                                type="button"
                                                onclick="buttonClicked2()"
                                                className="btn btn-outline rightbtn boxShdwNon mrl15"
                                              >
                                                <i className="fas fa-edit mrr5"></i>
                                                View Attribute Detail
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="card">
                                        <div
                                          className="card-header grey-bg minHeight50 collapsed"
                                          data-toggle="collapse"
                                          data-target="#collapseTwo"
                                          aria-expanded="false"
                                          aria-controls="collapseTwo"
                                        >
                                          <span className="title fontWeight600">
                                            <span className="title fontWeight600">
                                              Product Attributes Details
                                              (Mahindra Scorpio Classic Petrol)
                                            </span>
                                          </span>
                                          <span className="accicon">
                                            <i className="fas fa-angle-down rotate-icon"></i>
                                          </span>
                                        </div>

                                        <div
                                          id="collapseTwo"
                                          className="collapse show"
                                          data-parent="#accordionExample"
                                        >
                                          <div className="card-body">
                                            <table className="display productHeadertable lighttable ">
                                              <thead className="lighttable">
                                                <tr>
                                                  <th className="header colwidth">
                                                    Srl.
                                                  </th>
                                                  <th className="header">
                                                    Attribute Name
                                                  </th>
                                                  <th className="header rightBrdr">
                                                    Attribute Value
                                                  </th>
                                                </tr>
                                              </thead>
                                              <tbody>
                                                <tr>
                                                  <td className="colwidth">
                                                    1
                                                  </td>
                                                  <td>Product Division</td>
                                                  <td>
                                                    <input
                                                      name="name"
                                                      type="text"
                                                      className="form-control mrb0"
                                                      placeholder="Division Name"
                                                      readonly
                                                    />
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td className="colwidth">
                                                    2
                                                  </td>
                                                  <td>Model Group</td>
                                                  <td>
                                                    <input
                                                      name="name"
                                                      type="text"
                                                      className="form-control mrb0"
                                                      placeholder="Mahindra Scorpio"
                                                      readonly
                                                    />
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td className="colwidth">
                                                    3
                                                  </td>
                                                  <td>Sales Model Group</td>
                                                  <td>
                                                    <input
                                                      name="name"
                                                      type="text"
                                                      className="form-control mrb0"
                                                      placeholder="Sales Model Group"
                                                      readonly
                                                    />
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td className="colwidth">
                                                    4
                                                  </td>
                                                  <td>Model Family</td>
                                                  <td>
                                                    <input
                                                      name="name"
                                                      type="text"
                                                      className="form-control mrb0"
                                                      placeholder="Mahindra Scorpio-N"
                                                      readonly
                                                    />
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td className="colwidth">
                                                    5
                                                  </td>
                                                  <td>Vehicle Type</td>
                                                  <td>
                                                    <input
                                                      name="name"
                                                      type="text"
                                                      className="form-control mrb0"
                                                      placeholder="Z8L"
                                                      readonly
                                                    />
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td className="colwidth">
                                                    6
                                                  </td>
                                                  <td>Vehicle Category</td>
                                                  <td>
                                                    <input
                                                      name="name"
                                                      type="text"
                                                      className="form-control mrb0"
                                                      placeholder="4XPLOR"
                                                      readonly
                                                    />
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td className="colwidth">
                                                    7
                                                  </td>
                                                  <td>Body Type</td>
                                                  <td>
                                                    <input
                                                      name="name"
                                                      type="text"
                                                      className="form-control mrb0"
                                                      placeholder="Sport Utility Vehicle"
                                                      readonly
                                                    />
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td className="colwidth">
                                                    8
                                                  </td>
                                                  <td>Vehicle Category</td>
                                                  <td>
                                                    <input
                                                      name="name"
                                                      type="text"
                                                      className="form-control mrb0"
                                                      placeholder="4XPLOR"
                                                      readonly
                                                    />
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td className="colwidth">
                                                    9
                                                  </td>
                                                  <td>Seating Capacity</td>
                                                  <td>
                                                    <input
                                                      name="name"
                                                      type="text"
                                                      className="form-control mrb0"
                                                      placeholder="7"
                                                      readonly
                                                    />
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td className="colwidth">
                                                    10
                                                  </td>
                                                  <td>Trim Level</td>
                                                  <td>
                                                    <input
                                                      name="name"
                                                      type="text"
                                                      className="form-control mrb0"
                                                      placeholder="ALFA PASS(NR)"
                                                      readonly
                                                    />
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td className="colwidth">
                                                    11
                                                  </td>
                                                  <td>Model Year</td>
                                                  <td>
                                                    <input
                                                      name="name"
                                                      type="text"
                                                      className="form-control mrb0"
                                                      placeholder="2022"
                                                      readonly
                                                    />
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td className="colwidth">
                                                    12
                                                  </td>
                                                  <td>Drive</td>
                                                  <td>
                                                    <input
                                                      name="name"
                                                      type="text"
                                                      className="form-control mrb0"
                                                      placeholder="4WD"
                                                      readonly
                                                    />
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td className="colwidth">
                                                    13
                                                  </td>
                                                  <td>Model Variant</td>
                                                  <td>
                                                    <input
                                                      name="name"
                                                      type="text"
                                                      className="form-control mrb0"
                                                      placeholder="Z8L"
                                                      readonly
                                                    />
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td className="colwidth">
                                                    14
                                                  </td>
                                                  <td>AC</td>
                                                  <td>
                                                    <input
                                                      name="name"
                                                      type="text"
                                                      className="form-control mrb0"
                                                      placeholder="Rear AC Vents"
                                                      readonly
                                                    />
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td className="colwidth">
                                                    15
                                                  </td>
                                                  <td>Power Steering</td>
                                                  <td>
                                                    <input
                                                      name="name"
                                                      type="text"
                                                      className="form-control mrb0"
                                                      placeholder="Power Steering"
                                                      readonly
                                                    />
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td className="colwidth">
                                                    16
                                                  </td>
                                                  <td>Emission Type</td>
                                                  <td>
                                                    <input
                                                      name="name"
                                                      type="text"
                                                      className="form-control mrb0"
                                                      placeholder="BS VI"
                                                      readonly
                                                    />
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td className="colwidth">
                                                    17
                                                  </td>
                                                  <td>Engine Type</td>
                                                  <td>
                                                    <input
                                                      name="name"
                                                      type="text"
                                                      className="form-control mrb0"
                                                      placeholder="Diesel Engine"
                                                      readonly
                                                    />
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td className="colwidth">
                                                    18
                                                  </td>
                                                  <td>Attribute Description</td>
                                                  <td>
                                                    <textarea
                                                      name="name"
                                                      type="text"
                                                      className="form-control mrb0"
                                                      rows="1"
                                                      placeholder="Muscular Alloy Wheels, Gen 2 mHAWK Diesel Engine,  Thrilling Performance,  Advanced Tech,  Superior Comfort & Safety,  Touch Screen Infotainment."
                                                      readonly
                                                    ></textarea>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                            <div className="cls"></div>
                                            <div className="newPagination">
                                              <nav
                                                className="Pager1"
                                                aria-label="pagination example"
                                              >
                                                <ul className="pagination pagination-circle justify-content-center">
                                                  <li className="page-item disabled">
                                                    <a className="page-link">
                                                      First
                                                    </a>
                                                  </li>

                                                  <li className="page-item disabled">
                                                    <a
                                                      className="page-link"
                                                      aria-label="Previous"
                                                    >
                                                      <span aria-hidden="true">
                                                        &laquo;
                                                      </span>
                                                      <span className="sr-only">
                                                        Previous
                                                      </span>
                                                    </a>
                                                  </li>

                                                  <li className="page-item active">
                                                    <a className="page-link">
                                                      1
                                                    </a>
                                                  </li>
                                                  <li className="page-item">
                                                    <a className="page-link">
                                                      2
                                                    </a>
                                                  </li>
                                                  <li className="page-item">
                                                    <a className="page-link">
                                                      3
                                                    </a>
                                                  </li>
                                                  <li className="page-item">
                                                    <a className="page-link">
                                                      4
                                                    </a>
                                                  </li>
                                                  <li className="page-item">
                                                    <a className="page-link">
                                                      5
                                                    </a>
                                                  </li>

                                                  <li className="page-item">
                                                    <a
                                                      className="page-link"
                                                      aria-label="Next"
                                                    >
                                                      <span aria-hidden="true">
                                                        &raquo;
                                                      </span>
                                                      <span className="sr-only">
                                                        Next
                                                      </span>
                                                    </a>
                                                  </li>

                                                  <li className="page-item">
                                                    <a className="page-link">
                                                      Last
                                                    </a>
                                                  </li>
                                                </ul>
                                              </nav>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}
