const fs = require('fs');

const defaultConfig = {
  PORT: 80
}


function arrays_diff(standard, target) { return (typeof standard === "object" && typeof target === "object") ? standard.filter(value => !target.includes(value)) : null; }

function recursiveFunc(currUserConfig, currDefaultConfig, currPath) {
    const configMissingKEYs = arrays_diff(Object.keys(currDefaultConfig), Object.keys(currUserConfig));
    if (!configMissingKEYs || configMissingKEYs.length == 0 ) {
        for (const [key, value] of Object.entries(currDefaultConfig)) {
            if (typeof value === "object" && !Array.isArray(value)) {
                recursiveFunc(currUserConfig[key], value, currPath + "." + key)
            } else if (typeof value !== typeof currUserConfig[key]) {
                const Path = (currPath + "." + key).replace(/^\./, "");
                if (Array.isArray(value)) {
                    throw new Error(`[Config] ${Path} must be a Array.`);
                }

                let valueType;
                if (typeof value == 'string') {
                    try {
                        parseInt(value);
                        valueType = "number like string";
                    } catch {
                        valueType = "string";
                    }
                } else { valueType = typeof value }

                throw new Error(`[Config] ${Path} must be a ${valueType}.`);
            }
        }
    } else {
        throw new Error(`[Config] Please enter the config. ( ${(currPath + "." + configMissingKEYs[0]).replace(/^\./, "")} )`);
    }
}

module.exports = function checkConfig() {
    if (!fs.existsSync(require.main.path + "/config.json")) {
        fs.writeFileSync(require.main.path + "/config.json", JSON.stringify(defaultConfig, null, 2), 'utf-8');
        throw new Error("[Config] Please enter the config.");
    }

    try {
        Config = JSON.parse(fs.readFileSync(require.main.path + "/config.json"));
    } catch(err) {
        throw new Error("[Config] Failed to load the config file.");
    }

    for (const key in Config["LINKS"]) {
        try { 
            if (!Config["LINKS"][key]) {
                delete Config["LINKS"][key];
            } 
        } catch {
            delete Config["LINKS"][key]; 
        }
    }


    recursiveFunc(Config, defaultConfig, "")

    return Config;
}