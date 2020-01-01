// Default RegExp
const dfRegExOption = /^(-)([a-zA-Z\d]){1}/i;
const dfRegExAlias = /^(--)([a-zA-Z\d-])*([a-zA-Z\d])+/i;
const dfRegExArgument = /^([a-zA-Z\d/"])([a-zA-Z\d\s.:\-_\\])*([a-zA-Z\d\\/"])+/i;

/**
* Returns the type of a param (option/ alias/ argument/ unknown)
* @param {string} param
* @param {object} customRegEx
*/
function typeOfParam(param = '', customRegEx = { regexOption: false, regexAlias: false, regexArgument: false }) {
    // Checking for valid RegExp
    const regExOption = customRegEx.regexOption === RegExp(customRegEx.regexOption) ? customRegEx.regexOption : dfRegExOption;
    const regExAlias = customRegEx.regexAlias === RegExp(customRegEx.regexAlias) ? customRegEx.regexAlias : dfRegExAlias;
    const regExArgument = customRegEx.regexArgument === RegExp(customRegEx.regexArgument) ? customRegEx.regexArgument : dfRegExArgument;

    if (regExOption.test(param)) {
        return 'option';
    } else if (regExAlias.test(param)) {
        return 'alias';
    } else if (regExArgument.test(param)) {
        return 'argument';
    } else {
        return 'unknown';
    }
}

function removeAliasSymbol(alias) {
    return alias.slice(2);
}

module.exports = {
    dfRegExOption,
    dfRegExAlias,
    dfRegExArgument,
    typeOfParam,
    removeAliasSymbol
};