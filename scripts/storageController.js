function savePageToStorage(key, data){
    let storage= window.localStorage;
    storage.setItem(key, JSON.stringify(data))

}

function getPageFromStorage(key){
    let storage= window.localStorage;
    let res= storage.getItem(key)
    return JSON.parse(res)

}

