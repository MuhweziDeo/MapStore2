/*
 * Copyright 2017, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
*/
export const SET_EDITOR_AVAILABLE = "DASHBOARD:SET_AVAILABLE";
export const SET_EDITING = "DASHBOARD:SET_EDITING";
export const SHOW_CONNECTIONS = "DASHBOARD:SHOW_CONNECTIONS";
export const TRIGGER_SAVE_MODAL = "DASHBOARD:TRIGGER_SAVE_MODAL";
export const TRIGGER_SAVE_AS_MODAL = "DASHBOARD:TRIGGER_SAVE_AS_MODAL";

export const SAVE_DASHBOARD = "DASHBOARD:SAVE_DASHBOARD";
export const SAVE_ERROR = "DASHBOARD:SAVE_ERROR";
export const DASHBOARD_SAVED = "DASHBOARD:DASHBOARD_SAVED";

export const LOAD_DASHBOARD = "DASHBOARD:LOAD_DASHBOARD";
export const DASHBOARD_RESET = "DASHBOARD:DASHBOARD_RESET";
export const DASHBOARD_LOADED = "DASHBOARD:DASHBOARD_LOADED";
export const DASHBOARD_LOADING = "DASHBOARD:DASHBOARD_LOADING";
export const DASHBOARD_LOAD_ERROR = "DASHBOARD:DASHBOARD_LOAD_ERROR";
export const DASHBOARD_UPDATE_SERVICES = "DASHBOARD:UPDATE_SERVICES";
export const DASHBOARD_SET_SELECTED_SERVICE = "DASHBOARD:SET_SELECTED_SERVICE";
export const DASHBOARD_ADD_NEW_SERVICE = "DASHBOARD:ADD_NEW_SERVICE";
export const DASHBOARD_CATALOG_MODE = "DASHBOARD:CATALOG_MODE";
export const DASHBOARD_DELETE_SERVICE = "DASHBOARD:DELETE_SERVICE";
export const DASHBOARD_SAVE_SERVICE_LOADING = "DASHBOARD:SAVE_SERVICE_LOADING";
export const DASHBOARD_UPDATE_CATALOG_SERVICE = "DASHBOARD:UPDATE_CATALOG_SERVICE";

export const setEditing = (editing) => ({type: SET_EDITING, editing });

export const setEditorAvailable = available => ({type: SET_EDITOR_AVAILABLE, available});
export const triggerShowConnections = show => ({ type: SHOW_CONNECTIONS, show});
export const triggerSave = show => ({ type: TRIGGER_SAVE_MODAL, show});
export const triggerSaveAs = show => ({ type: TRIGGER_SAVE_AS_MODAL, show});
export const saveDashboard = resource => ({ type: SAVE_DASHBOARD, resource});
export const dashboardSaveError = error => ({type: SAVE_ERROR, error});
export const dashboardSaved = id => ({type: DASHBOARD_SAVED, id});
export const loadDashboard = id => ({ type: LOAD_DASHBOARD, id});
export const resetDashboard = () => ({ type: DASHBOARD_RESET});
export const dashboardLoaded = (resource, data) => ({ type: DASHBOARD_LOADED, resource, data});

/**
 * @param {boolean} value the value of the flag
 * @param {string} [name] the name of the flag to set. loading is anyway always triggered
*/
export const dashboardLoading = (value, name = "loading") => ({
    type: DASHBOARD_LOADING,
    name,
    value
});
export const dashboardLoadError = error => ({type: DASHBOARD_LOAD_ERROR, error});

export const dashboardUpdateServices = services => ({ type: DASHBOARD_UPDATE_SERVICES, services});

export const dashboardSetSelectedService = service => ({ type: DASHBOARD_SET_SELECTED_SERVICE, service });

export const updateDashboardCatalog = (service, services, isNew) => ({ type: DASHBOARD_UPDATE_CATALOG_SERVICE, service, services, isNew});

export const updateDashboardService = (service, services, isNew) => ({ type: DASHBOARD_ADD_NEW_SERVICE, service, services, isNew});

export const setDashboardCatalogMode = (mode, isNew) => ({ type: DASHBOARD_CATALOG_MODE, mode, isNew});

export const dashboardDeleteService = (service, services) => ({ type: DASHBOARD_DELETE_SERVICE, service, services});

export const setDashboardServiceSaveLoading = loading => ({ type: DASHBOARD_SAVE_SERVICE_LOADING, loading});
