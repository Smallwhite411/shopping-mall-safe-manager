import { useUserStore } from '@/store/modules/user'
import fileDownload from './fileDownload'
import axios from 'axios'
// 下载
export function downScanning(id: string, type: string) {
    axios({
        method: 'post',
        url: window.location.origin + '/api/file/download',
        data: { id: id },
        responseType: 'blob',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'xdragon',
        },
    }).then((response: any) => {
        const fileName = response.headers.filename
        const blob = new Blob([response.data], {
            type: type,
        })
        const downUrl = window.URL.createObjectURL(blob)
        fileDownload(downUrl, decodeURI(fileName))
    })
}

// 查看pdf
export function openPDF(id: string) {
    const userStore = useUserStore()
    axios({
        method: 'post',
        url: window.location.origin + '/api/file/download',
        data: { id: id },
        responseType: 'blob',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'xdragon',
        },
    }).then((response: any) => {
        const blob = new Blob([response.data], {
            type: 'application/pdf',
        })
        window.open(window.URL.createObjectURL(blob))
    })
}
