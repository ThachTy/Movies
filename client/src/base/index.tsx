

export const setLocalStorage = (value: any, valueName: string) => {
    let valueString = JSON.stringify(value);
    localStorage.setItem(valueName, valueString)
}

export const getLocalStorage = (valueName: string) => {
    let data = localStorage.getItem(valueName);
    return data ? JSON.parse(data) : null
}

export const setSessionStorage = (value: any, valueName: string) => {
    let valueString = JSON.stringify(value);
    sessionStorage.setItem(valueName, valueString)
}
export const getSessionStorage = (valueName: string) => {
    let data = sessionStorage.getItem(valueName);
    return data ? JSON.parse(data) : null
}

export const uniqueArray = (list: Array) => {

}
