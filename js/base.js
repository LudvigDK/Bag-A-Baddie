function format(str, values) {
    return str.replace(/{(\w+)}/g, (_, key) => values[key]);
}

let OPENAI_KEY = ''
let NAME = ''