/*
 * Copyright 2019, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
*/

import React from 'react';

import PropTypes from 'prop-types';
import { Glyphicon, InputGroup } from 'react-bootstrap';
import MediaQuery from 'react-responsive';
import Toolbar from '../toolbar/Toolbar';
import draggableComponent from '../enhancers/draggableComponent';
import CoordinateEntry from './CoordinateEntry';
import Message from '../../I18N/Message';
import { isEqual, isNumber } from 'lodash';
import DropdownToolbarOptions from '../toolbar/DropdownToolbarOptions';


class CoordinatesRow extends React.Component {
    static propTypes = {
        idx: PropTypes.number,
        component: PropTypes.object,
        onRemove: PropTypes.func,
        onSubmit: PropTypes.func,
        onChangeFormat: PropTypes.func,
        onMouseEnter: PropTypes.func,
        format: PropTypes.string,
        type: PropTypes.string,
        onMouseLeave: PropTypes.func,
        connectDragSource: PropTypes.func,
        aeronauticalOptions: PropTypes.object,
        customClassName: PropTypes.string,
        isDraggable: PropTypes.bool,
        isDraggableEnabled: PropTypes.bool,
        showLabels: PropTypes.bool, // Remove it
        showDraggable: PropTypes.bool,
        showToolButtons: PropTypes.bool,
        removeVisible: PropTypes.bool,
        formatVisible: PropTypes.bool,
        removeEnabled: PropTypes.bool,
        renderer: PropTypes.string,
        disabled: PropTypes.bool,
        hideOnMobile: PropTypes.bool
    };

    static defaultProps = {
        showLabels: false, // Remove it
        formatVisible: false,
        onMouseEnter: () => {},
        onMouseLeave: () => {},
        showToolButtons: true,
        disabled: false,
        hideOnMobile: false
    };

    constructor(props) {
        super(props);
        this.state = {
            lat: isNumber(this.props.component.lat) ? this.props.component.lat : "",
            lon: isNumber(this.props.component.lon) ? this.props.component.lon : "",
            disabledApplyChange: true
        };
    }

    UNSAFE_componentWillReceiveProps(newProps) {
        if (!isEqual(newProps.component, this.props.component)) {
            const lat = isNumber(newProps.component.lat) ? newProps.component.lat : "";
            const lon = isNumber(newProps.component.lon) ? newProps.component.lon : "";
            this.setState({lat, lon, disabledApplyChange: true});
        }
    }

    onChangeLatLon = (coord, val) => {
        this.setState({...this.state, [coord]: parseFloat(val)}, ()=>{
            const changeLat = parseFloat(this.state.lat) !== parseFloat(this.props.component.lat);
            const changeLon = parseFloat(this.state.lon) !== parseFloat(this.props.component.lon);
            this.setState({...this.state, disabledApplyChange: !(changeLat || changeLon)}, ()=> {
                // Auto save on coordinate change for annotations
                this.props.renderer === "annotations" &&  this.props.onSubmit(this.props.idx, this.state);
            });
        });
    };

    onSubmit = () => {
        this.props.onSubmit(this.props.idx, this.state);
    };

    render() {
        const {idx} = this.props;
        const toolButtons = [
            {
                visible: this.props.removeVisible,
                disabled: !this.props.removeEnabled || this.props.disabled,
                glyph: 'trash',
                onClick: () => {
                    this.props.onRemove(idx);
                }
            },
            {
                buttonConfig: {
                    title: <Glyphicon glyph="cog"/>,
                    className: "square-button-md no-border",
                    pullRight: true,
                    tooltipId: "identifyChangeCoordinateFormat"
                },
                menuOptions: [
                    {
                        active: this.props.format === "decimal",
                        onClick: () => { this.props.onChangeFormat("decimal"); },
                        text: <Message msgId="search.decimal"/>
                    }, {
                        active: this.props.format === "aeronautical",
                        onClick: () => { this.props.onChangeFormat("aeronautical"); },
                        text: <Message msgId="search.aeronautical"/>
                    }
                ],
                disabled: this.props.disabled,
                visible: this.props.formatVisible,
                Element: DropdownToolbarOptions
            },
            {
                glyph: "ok",
                disabled: this.state.disabledApplyChange || this.props.disabled,
                tooltipId: 'identifyCoordinateApplyChanges',
                onClick: this.onSubmit,
                visible: this.props.renderer !== "annotations"
            }
        ];

        // drag button cannot be a button since IE/Edge doesn't support drag operation on button
        const dragButton = (
            <div role="button" className="square-button-md no-border btn btn-default"
                style={{display: "table",
                    color: !this.props.isDraggableEnabled && "#999999",
                    pointerEvents: !this.props.isDraggableEnabled ? "none" : "auto",
                    cursor: this.props.isDraggableEnabled && 'grab' }}>
                <Glyphicon
                    glyph="menu-hamburger"
                />
            </div>);


        const renderToolBarButtons = () => {
            if (!this.props.showToolButtons) {
                return null;
            }

            if (this.props.hideOnMobile) {
                return (<MediaQuery minDeviceWidth={1224} >
                    <div key="tools">
                        <Toolbar
                            btnGroupProps={{className: 'tools'}}
                            btnDefaultProps={{className: 'square-button-md no-border'}}
                            buttons={toolButtons}/>
                    </div>
                </MediaQuery>);
            }

            return (<div key="tools">
                <Toolbar
                    btnGroupProps={{className: 'tools'}}
                    btnDefaultProps={{className: 'square-button-md no-border'}}
                    buttons={toolButtons}/>
            </div>);
        };
        return (
            <div className={`coordinateRow ${this.props.format || ""} ${this.props.customClassName || ""}`} onMouseEnter={() => {
                if (this.props.onMouseEnter && this.props.component.lat && this.props.component.lon) {
                    this.props.onMouseEnter(this.props.component);
                }
            }} onMouseLeave={() => {
                if (this.props.onMouseLeave && this.props.component.lat && this.props.component.lon) {
                    this.props.onMouseLeave();
                }
            }}>
                <div style={{cursor: this.props.isDraggableEnabled ? 'grab' : "not-allowed"}}>
                    {this.props.showDraggable ? this.props.isDraggable ? this.props.connectDragSource(dragButton) : dragButton : null}
                </div>
                <div className="coordinate">
                    <div className="input-group-container">
                        <InputGroup>
                            <InputGroup.Addon><Message msgId="latitude"/></InputGroup.Addon>
                            <CoordinateEntry
                                disabled={this.props.disabled}
                                format={this.props.format}
                                aeronauticalOptions={this.props.aeronauticalOptions}
                                coordinate="lat"
                                idx={idx}
                                value={this.state.lat}
                                onChange={(dd) => this.onChangeLatLon("lat", dd)}
                                constraints={{
                                    decimal: {
                                        lat: {
                                            min: -90,
                                            max: 90
                                        },
                                        lon: {
                                            min: -180,
                                            max: 180
                                        }
                                    }
                                }}
                                onKeyDown={this.onSubmit}
                            />
                        </InputGroup>
                    </div>
                    <div className="input-group-container">
                        <InputGroup>
                            <InputGroup.Addon><Message msgId="longitude"/></InputGroup.Addon>
                            <CoordinateEntry
                                disabled={this.props.disabled}
                                format={this.props.format}
                                aeronauticalOptions={this.props.aeronauticalOptions}
                                coordinate="lon"
                                idx={idx}
                                value={this.state.lon}
                                onChange={(dd) => this.onChangeLatLon("lon", dd)}
                                constraints={{
                                    decimal: {
                                        lat: {
                                            min: -90,
                                            max: 90
                                        },
                                        lon: {
                                            min: -180,
                                            max: 180
                                        }
                                    }
                                }}
                                onKeyDown={this.onSubmit}
                            />
                        </InputGroup>
                    </div>
                </div>
                {renderToolBarButtons()}
                {/* {this.props.showToolButtons && !this.props.hideOnMobile &&
                } */}
            </div>
        );
    }
}

export default draggableComponent(CoordinatesRow);
