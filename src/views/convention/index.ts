interface tableDataType {
    date: string;
    name: string;
    address: string;
}

export interface columnListType {
    prop: string;
    label: string;
    show: boolean
}
interface testType {
    content: string | number;
    show: boolean
}

export interface testDatasType {
    name: testType;
    age: testType;
    city: testType;
    tel: testType
}

