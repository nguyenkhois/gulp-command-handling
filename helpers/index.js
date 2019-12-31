const regexpOption = /^(-)([a-zA-Z\d]){1}/i;
const regexpAlias = /^(--)([a-zA-Z\d-])*([a-zA-Z\d])+/i;
const regexpArgument = /^([a-zA-Z\d/"])([a-zA-Z\d\s.:\-_\\])*([a-zA-Z\d\\/"])+/i;

/**
* Returns the type of a param (option/ alias/ argument/ unknown)
* @param {string} param
*/
function typeOfParam(param = '') {
    if (regexpOption.test(param)) {
        return 'option';
    } else if (regexpAlias.test(param)) {
        return 'alias';
    } else if (regexpArgument.test(param)) {
        return 'argument';
    } else {
        return 'unknown';
    }
}

function removeAliasSymbol(alias) {
    return alias.slice(2);
}

module.exports = {
    regexpOption,
    regexpAlias,
    regexpArgument,
    typeOfParam,
    removeAliasSymbol
};