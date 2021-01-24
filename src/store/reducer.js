import {
    ADD_FLORIST,
    ADD_ORDER,
    EDIT_ORDER_NAME,
    EDIT_ORDER_AUTHOR,
    REMOVE_ORDER,
    DOWNLOAD_ORDERS_DATA,
    MOVE_ORDER_LEFT,
    MOVE_ORDER_RIGHT
} from './actions';

const initialState = {
    companies: []
};

export default function reducer(state=initialState, {type, payload}) {
    let bilboardToMove = null;

    switch(type) {
    case ADD_FLORIST:
        return {
            ...state,
            companies: [
                ...state.companies, payload
            ]
        };
    case ADD_ORDER:
        return {
            ...state,
            companies: state.companies.map((bilboardArr, index) => (
                index === payload.BilboardArrId ? {
                    ...bilboardArr,
                    bilboards: [...bilboardArr.bilboards, payload.order]
                }
                : bilboardArr
            ))
        };
    case EDIT_ORDER_NAME:
        return {
            ...state,
            companies: state.companies.map((bilboardArr, index) => (
                index === payload.BilboardArrId ? {
                    ...bilboardArr,
                    bilboards: bilboardArr.bilboards.map((order, indexBilboard) => (
                        indexBilboard === payload.bilboardId ? {
                            ...order,
                            name: payload.newName
                        }
                        : order
                    ))
                }
                : bilboardArr
            ))
        };
    case EDIT_ORDER_AUTHOR:
        return {
            ...state,
            companies: state.companies.map((bilboardArr, index) => (
                index === payload.BilboardArrId ? {
                    ...bilboardArr,
                    bilboards: bilboardArr.bilboards.map((order, indexBilboard) => (
                        indexBilboard === payload.bilboardId ? {
                            ...order,
                            author: payload.newAuthor
                        }
                        : order
                    ))
                }
                : bilboardArr
            ))
        };
    case REMOVE_ORDER:
        return {
            ...state,
            companies: state.companies.map((bilboardArr, index) => (
                index === payload.BilboardArrId ? {
                    ...bilboardArr,
                    bilboards: bilboardArr.bilboards.filter((order, bilboardIndex) => (bilboardIndex !== payload.bilboardId))
                }
                : bilboardArr
            ))
        };
    case DOWNLOAD_ORDERS_DATA:
        return {
            ...state,
            companies: payload
        }
    case MOVE_ORDER_LEFT:
        bilboardToMove = state.companies[payload.BilboardArrId].bilboards[payload.bilboardId];

        return {
            ...state,
            companies: state.companies.map((bilboardArr, index) => {
                if (index === payload.BilboardArrId) {
                    return {
                        ...bilboardArr,
                        bilboards: bilboardArr.bilboards.filter((order, bilboardIndex) => (bilboardIndex !== payload.bilboardId))
                    };
                }
                if (index === payload.BilboardArrId - 1) {
                    return {
                        ...bilboardArr,
                        bilboards: [...bilboardArr.bilboards, bilboardToMove]
                    };
                }
                return bilboardArr;
            })
        };
    case MOVE_ORDER_RIGHT:
        bilboardToMove = state.companies[payload.BilboardArrId].bilboards[payload.bilboardId];

        return {
            ...state,
            companies: state.companies.map((bilboardArr, index) => {
                if (index === payload.BilboardArrId) {
                    return {
                        ...bilboardArr,
                        bilboards: bilboardArr.bilboards.filter((order, bilboardIndex) => (bilboardIndex !== payload.bilboardId))
                    };
                }
                if (index === payload.BilboardArrId + 1) {
                    return {
                        ...bilboardArr,
                        bilboards: [...bilboardArr.bilboards, bilboardToMove]
                    };
                }
                return bilboardArr;
            })
        };
    default:
        return state;
    }
};
