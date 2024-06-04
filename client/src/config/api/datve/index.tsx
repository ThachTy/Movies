import http from '@config/http'


const datve = async (data: any) => {
    return await http.post(`/DatVe/Them`, { ...data }).then(res => res);
}

export { datve }    