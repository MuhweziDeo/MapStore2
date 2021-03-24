/*
 * Copyright 2017, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import {isEmpty} from 'lodash';
import { InputGroup, Glyphicon } from 'react-bootstrap';
import localizedProps from '../misc/enhancers/localizedProps';
const Select = localizedProps(['placeholder', 'clearValueText', 'noResultsText'])(require('react-select').default);

export default ({
    services,
    selectedService,
    onChangeSelectedService = () => {},
    onChangeCatalogMode = () => {}
}) => (<InputGroup>
    <Select
        clearValueText={"catalog.clearValueText"}
        noResultsText={"catalog.noResultsText"}
        clearable
        options={services}
        value={selectedService}
        onChange={(val) => onChangeSelectedService(val && val.value ? val.value : "")}
        placeholder={"catalog.servicePlaceholder"} />
    {!isEmpty(selectedService) ? (<InputGroup.Addon className="btn"
        onClick={() => onChangeCatalogMode("edit", false)}>
        <Glyphicon glyph="pencil"/>
    </InputGroup.Addon>) : null}
    <InputGroup.Addon className="btn" onClick={() => onChangeCatalogMode("edit", true)}>
        <Glyphicon glyph="plus"/>
    </InputGroup.Addon>
</InputGroup>
);
