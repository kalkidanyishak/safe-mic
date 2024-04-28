export const useGlobal = (value=null) => {

    let setGlobal = (data) => {
        localStorage.setItem('global', JSON.stringify(data))
    }
    let getGlobal = (dataKey = null) => {
        let output = {}
        if (localStorage.getItem('global')) {
            output = JSON.parse(localStorage.getItem('global'))
            if (dataKey == null) {
                return output
            }
            if (Object.keys(output).includes(dataKey)) {
                return output[dataKey]
            }
            return output
        }
        return output
    }

    if(value!=null){
        setGlobal(value)
    }
    return getGlobal()
}
