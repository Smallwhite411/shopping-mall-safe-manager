interface transitionType {
    id: number;
    name: string;
    parentId: number | null;
    children?: transitionType[];
  }
  
  const arrayToTree = (data: transitionType[]): transitionType[] => {
    const arr: transitionType[] = [];
  
    const expanded = (datas: transitionType[]): transitionType[] => {
      datas.forEach((e, index) => {
        if (e.children) {
          datas.push(...e.children);
          delete e.children;
        }
        arr.push(e);
        delete datas[index];
      });
      if (datas.join('').length == 0) {

        return arr;
      }
  
      return expanded(datas);
    };
    
    return expanded(data);
  };
  
  export default arrayToTree;
  