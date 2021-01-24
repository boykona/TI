const hostname = 'http://localhost:9999';

const getCompanys = async () => {
    const response = await fetch(hostname + '/billboardarr', {method: 'GET'});
    if (response.status !== 200) {
        throw new Error(`getCompanys returned ${response.status}`);
    }
    const jsonData = await response.json();
    return jsonData;
};

const addCompany = async (bilboardArr) => {
    const response = await fetch(hostname + '/billboardarr', {
        method: 'POST', 
        body: JSON.stringify(bilboardArr),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.status !== 200) {
        throw new Error(`addCompany returned ${response.status}`);
    }
    const { info } = await response.json();
    console.log(info);
};

const addBilboard = async ({ order, BilboardArrId }) => {
    const response = await fetch(hostname + `/billboardarr/${BilboardArrId}/order`, {
        method: 'POST', 
        body: JSON.stringify(order),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    console.log(response);

    if (response.status !== 200) {
        throw new Error(`addBilboard returned ${response.status}`);
    }
    const { info } = await response.json();
    console.log(info);
};

const editBilboard = async ({ bilboardId, BilboardArrId, newName, newAuthor }) => {
    const response = await fetch(hostname + `/billboardarr/${BilboardArrId}/bilboard/${bilboardId}`, {
        method: 'PATCH', 
        body: JSON.stringify({ newName: newName, newAuthor: newAuthor }), 
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.status !== 200) {
        throw new Error(`editBilboardName returned ${response.status}`);
    }
    const { info } = await response.json();
    console.log(info);
};

const removeBilboard = async ({ bilboardId, BilboardArrId }) => {
    const response = await fetch(hostname + `/billboardarr/${BilboardArrId}/bilboard/${bilboardId}`, {
        method: 'DELETE'
    });

    if (response.status !== 200) {
        throw new Error(`removeBilboard returned ${response.status}`);
    }
    const { info } = await response.json();
    console.log(info);
};

const moveBilboard = async ({ bilboardId, BilboardArrId, destCompanyId }) => {
    const response = await fetch(hostname + `/billboardarr/${BilboardArrId}`, {
        method: 'PATCH',
        body: JSON.stringify({ bilboardId: bilboardId, destCompanyId: destCompanyId }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.status !== 200) {
        throw new Error(`removeBilboard returned ${response.status}`);
    }
    const { info } = await response.json();
    console.log(info);
};

export {
    getCompanys,
    addCompany,
    addBilboard,
    editBilboard,
    removeBilboard,
    moveBilboard,
};
