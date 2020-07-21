function isArray(tar) {
    return Array.isArray(tar)
}

function isObject(tar) {
    return (typeof tar === 'object') && (tar !== null) && !isArray(tar)
}

function isObjectOrArray(tar) {
    return (typeof tar === 'object') && (tar !== null)
}

/**
 * 处理数组
 * @param value 当前值
 * @param curPath 当前路径
 * @param store 结果
 */
const handleArray = (value, curPath, store) => {
    value.forEach((item, idx) => {        // forEach 会跳过数组空位
        const arrPath = `${ curPath }[${ idx }]`  // 拼接数组路径
        console.log({ item, idx, arrPath, curPath })
        if (isObject(item)) {
            objToPath(item, arrPath + '.', store)
        } else if (isArray(item)) {
            handleArray(item, arrPath, store)
        } else {
            store[arrPath] = item
        }
    })
}

/**
 * 对象转化为路径格式对象
 * @param obj 要转化的对象
 * @param prefix 路径前缀
 * @param store 结果
 */
const objToPath = (obj,
                   prefix = '',
                   store = {}) => {
    for (const [key, value] of Object.entries(obj)) {
        const curPath = prefix === ''  // 当前路径
          ? key
          : prefix.endsWith('].')
            ? `${ prefix }${ key }`
            : `${ prefix }/${ key }`

        if (isObject(value)) {                    // 是对象
            objToPath(value, curPath, store)
        } else if (isArray(value)) {              // 是数组
            handleArray(value, curPath, store)
        } else {
            store[curPath] = value
        }
    }
    return store
}
