interface arrayType {
    id: number;
    name: string;
    parentId: number | null;
    children?: arrayType[];
}

interface mapType {
    [studentId: number]: arrayType;
}

const treeToArray = (data: arrayType[]): arrayType => {
    let result: arrayType = {
        id: 0,
        name: '',
        parentId: 0
    };
    const map: mapType = {};
    data.forEach((item) => {
        map[item.id] = item;
    });
    data.forEach((item) => {
        if (item.parentId) {
            const parent = map[item.parentId];

            if (!parent.children) {
                parent.children = [];
            }
            parent.children.push(item);
        }
        else {
            result = item;
        }
        // const parent = map[item.parentId];
        // if (item.parentId) {
        //     if (!parent.children) {
        //         parent.children = [];
        //     }
        //     parent.children.push(item);
        // } else {
        //     result = item;
        // }
    });
    return result;
};

export default treeToArray;
