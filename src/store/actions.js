const ADD_FLORIST = 'ADD_FLORIST';
const ADD_ORDER = 'ADD_ORDER';
const EDIT_ORDER_NAME = 'EDIT_ORDER_NAME';
const EDIT_ORDER_AUTHOR = 'EDIT_ORDER_AUTHOR';
const REMOVE_ORDER = 'REMOVE_ORDER';
const DOWNLOAD_ORDERS_DATA = 'DOWNLOAD_ORDERS_DATA';
const MOVE_ORDER_LEFT = 'MOVE_ORDER_LEFT';
const MOVE_ORDER_RIGHT = 'MOVE_ORDER_RIGHT';


const addCompanyAction = (bilboardArr) => ({
    type: ADD_FLORIST,
    payload: bilboardArr
});

const addBilboardAction = ({ order, BilboardArrId }) => ({
    type: ADD_ORDER,
    payload: { order, BilboardArrId }
});

const editBilboardNameAction = ({ bilboardId, BilboardArrId, newName }) => ({
    type: EDIT_ORDER_NAME,
    payload: { bilboardId, BilboardArrId, newName }
});

const editBilboardAuthorAction = ({ bilboardId, BilboardArrId, newAuthor }) => ({
    type: EDIT_ORDER_AUTHOR,
    payload: { bilboardId, BilboardArrId, newAuthor }
});

const removeBilboardAction = ({ bilboardId, BilboardArrId }) => ({
    type: REMOVE_ORDER,
    payload: { bilboardId, BilboardArrId }
});

const downloadBilboardsDataAction = (companies) => ({
    type: DOWNLOAD_ORDERS_DATA,
    payload: companies
});

const moveBilboardLeftAction = ({ bilboardId, BilboardArrId }) => ({
    type: MOVE_ORDER_LEFT,
    payload: { bilboardId, BilboardArrId }
});

const moveBilboardRightAction = ({ bilboardId, BilboardArrId  }) => ({
    type: MOVE_ORDER_RIGHT,
    payload: { bilboardId, BilboardArrId }
});

export {
    ADD_FLORIST,
    ADD_ORDER,
    EDIT_ORDER_NAME,
    EDIT_ORDER_AUTHOR,
    REMOVE_ORDER,
    DOWNLOAD_ORDERS_DATA,
    MOVE_ORDER_LEFT,
    MOVE_ORDER_RIGHT,
    addCompanyAction,
    addBilboardAction,
    editBilboardNameAction,
    editBilboardAuthorAction,
    removeBilboardAction,
    downloadBilboardsDataAction,
    moveBilboardLeftAction,
    moveBilboardRightAction
};
