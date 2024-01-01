interface fileType {
    (url: string, fileName?: string): string;
}

const fileDownload: fileType = (url, fileName) => {
    const eleLink = document.createElement('a');
    eleLink.style.display = 'none';
    eleLink.href = url;
    eleLink.download = fileName === undefined ? '自定义名称' : fileName;
    document.body.appendChild(eleLink);
    eleLink.click();
    document.body.removeChild(eleLink);

    return eleLink.href;
};

export default fileDownload;

