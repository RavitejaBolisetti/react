import React from 'react';

import TreeView from 'pages/common/TreeView';

import 'assets/style/new_robin.scss';
import 'assets/style/sidebar.css';
import 'font-awesome/css/font-awesome.min.css';
import { withLayoutMaster } from 'components/withLayoutMaster';

export const GeoPageBase = () => {
    return (
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
                                                <span className="innerheading">Product Hierarchy</span>
                                            </span>
                                        </div>
                                        <div className="col-md-6">
                                            <button type="button" className="btn btn-outline mr0 mrl15 fr boxShdwNon">
                                                Exit
                                            </button>
                                            <button type="button" className="btn btn-outline fr mr0 boxShdwNon" onclick="buttonClicked()">
                                                <i className="fa fa-history mrr5" aria-hidden="true"></i>
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
                                            <i className="fa fa-chevron-right mrl5" aria-hidden="true"></i>
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
                                                    <label className="control-label-blk">Attribute Level</label>
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
                                                    <label className="control-label-blk">Parent</label>
                                                    <div className=" input-group">
                                                        <input name="name" type="text" placeholder="Parent" className="form-control" />
                                                        <div className="input-group-append">
                                                            <button type="button" id="hierarchyChange" className="btn btn-outline srchbtn mr0 boxShdwNon">
                                                                <i className="fa fa-search"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="control-label-blk">Code</label>
                                                    <input name="name" type="text" placeholder="Type Code here" className="form-control" />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="control-label-blk">Short Description</label>
                                                    <input name="name" type="text" placeholder="Type here" className="form-control" />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="control-label-blk">Long Description</label>
                                                    <textarea name="name" type="text" placeholder="Type here" rows="5" id="comment" className="form-control"></textarea>
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="control-label-blk">Status</label>
                                                    <div className="switchToggle">
                                                        <input type="checkbox" id="switch2" checked />
                                                        <label for="switch2">Status</label>
                                                    </div>
                                                </div>
                                                <div className="col-md-12 mrt10">
                                                    <button type="button" className="btn btn-outline rightbtn boxShdwNon mrl15">
                                                        <i className="fa fa-undo mrr5"></i>
                                                        Reset
                                                    </button>
                                                    <button type="button" className="btn btn-outline rightbtn boxShdwNon mrl15">
                                                        <i className="fa fa-save mrr5"></i>Save
                                                    </button>
                                                    <button type="button" className="btn btn-outline rightbtn boxShdwNon mrl15">
                                                        <i className="fa-solid fa-user-group mrr5"></i> Add Sibling
                                                    </button>
                                                    <button type="button" className="btn btn-outline rightbtn boxShdwNon mrl15" onclick="buttonClicked()">
                                                        <i className="fa-solid fa-user-plus mrr5"></i>
                                                        Add Child
                                                    </button>

                                                    <button type="button" className="btn btn-outline rightbtn boxShdwNon mrl15" onclick="buttonClicked()">
                                                        <i className="fas fa-edit mrr5"></i>
                                                        Edit
                                                    </button>
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
    );
};

export const GeoPage = withLayoutMaster(GeoPageBase);
