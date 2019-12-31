'use strict';
const { regexpOption, regexpAlias, typeOfParam, removeAliasSymbol } = require('./helpers');

//COMMAND constructor
function Command() {
    this.options = {}; //Option definition
    this.parsed = {}; //Parsed the user's command by using references from options
}

/**
 * OPTION constructor
 * @param {string} option is like -o
 * @param {string} alias is like --alias (Using as a key)
 * @param {string} description
 */
function Option(option, aliasKey, description) {
    this[aliasKey] = {
        option: option,
        description: description,
        subOptions: {}
    };
}

Command.prototype.option = function (taskName, option, alias, description = "") {
    //Checking input params
    if (!taskName || !option || !alias) {
        if (!taskName) {
            throw (new Error('Missing the input parameter -> taskName'));
        } else if (!option) {
            throw (new Error('Missing the input parameter -> option'));
        } else if (!alias) {
            throw (new Error('Missing the input parameter -> alias'));
        }
    } else if (!regexpOption.test(option) && !regexpAlias.test(alias)) {
        throw (new Error('The input params are invalid'));
    }

    const aliasKey = removeAliasSymbol(alias);// Using alias as a key and remove the characters "--"
    const optionRef = new Map([
        [option, alias]
    ]);
    const newOption = new Option(option, aliasKey, description);

    //Merge with the existence root key
    if (this.options[taskName] && !this.options[taskName][aliasKey]) {
        //Update reference by using mapping
        this.options[taskName].reference = new Map([
            ...this.options[taskName].reference,
            ...optionRef
        ]);

        //Add new option
        this.options[taskName] = {
            ...this.options[taskName],
            ...newOption
        };

    } else {
        //Create a new root key by using taskName and then create a new option
        this.options = {
            ...this.options,
            [taskName]: {
                reference: optionRef,
                ...newOption
            }
        };
    }

    return this;
};

Command.prototype.subOption = function (taskName, optionAlias, subOption, subOptionAlias, description = "") {
    //Checking input params
    if (!taskName || !optionAlias || !subOption || !subOptionAlias) {
        if (!taskName) {
            throw (new Error('Missing the parameter -> taskName'));
        } else if (!optionAlias) {
            throw (new Error('Missing the parameter -> optionAlias'));
        } else if (!subOption) {
            throw (new Error('Missing the parameter -> subOption'));
        } else if (!subOptionAlias) {
            throw (new Error('Missing the parameter -> subOptionAlias'));
        }
    } else if (!regexpAlias.test(optionAlias) &&
        !regexpOption.test(subOption) &&
        !regexpAlias.test(subOptionAlias)) {

        throw (new Error('The input params are invalid'));
    }

    const aliasKey = removeAliasSymbol(optionAlias);
    if (this.options[taskName] && this.options[taskName][aliasKey]) {
        const subOptKey = removeAliasSymbol(subOptionAlias);
        const newSubOption = {
            [subOptKey]: {
                subOption: subOption,
                description: description
            }
        };

        if (!this.options[taskName][aliasKey].subOptions[subOptKey]) {
            this.options[taskName][aliasKey].subOptions = {
                ...this.options[taskName][aliasKey].subOptions,
                ...newSubOption
            };

            //Update reference
            const subOptRef = new Map([
                [subOption, subOptionAlias]
            ]);

            this.options[taskName].reference = new Map([
                ...this.options[taskName].reference,
                ...subOptRef
            ]);
        }
    }

    return this;
};

Command.prototype.getOptions = function () {
    return this.options;
};

Command.prototype.parse = function (processArgv = []) {
    try {
        if (!processArgv || !Array.isArray(processArgv)) {
            throw (new Error(`\x1b[31mMissing the parameter: processArgv. It must be an array of argument(s)\x1b[0m`));
        }

        const processArgvLength = processArgv.length,
            taskName = processArgv[0];

        let parsedCommand = {},
            cmdPart,
            mainOptKey;

        const taskRef = this.options[taskName];
        if (taskRef) {
            const optionRef = taskRef.reference; // Get reference list (Mapping)

            for (let i = 1; i < processArgvLength; ++i) {
                cmdPart = typeOfParam(processArgv[i]);

                switch (cmdPart) {
                    case 'option':
                    case 'alias':

                        const optAlias = cmdPart === 'option' ?
                            optionRef.get(processArgv[i]) :
                            cmdPart === 'alias' ? processArgv[i] : null;

                        if (optAlias) {
                            const optKey = removeAliasSymbol(optAlias);

                            if (!mainOptKey && taskRef[optKey] && !parsedCommand[optKey]) {
                                //Parsing main option key
                                mainOptKey = optKey;

                                parsedCommand = {
                                    ...parsedCommand,
                                    [mainOptKey]: {}
                                };
                            } else if (parsedCommand[mainOptKey]) {
                                //Parsing subOption key
                                if (taskRef[mainOptKey].subOptions[optKey]) {
                                    parsedCommand[mainOptKey] = {
                                        ...parsedCommand[mainOptKey],
                                        [optKey]: true
                                    };
                                }
                            }
                        }

                        break;

                    case 'argument':
                        if (parsedCommand[mainOptKey]) {
                            parsedCommand[mainOptKey] = {
                                ...parsedCommand[mainOptKey],
                                "argument": processArgv[i]
                            };

                            mainOptKey = null; //Clearing when finishing a command part
                        }

                        break;

                    default:
                        break;
                }
            }
        }

        return parsedCommand;
    } catch (err) { return err; }
};

module.exports = { Command };