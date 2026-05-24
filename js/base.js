function format(str, values) {
    return str.replace(/{(\w+)}/g, (_, key) => values[key]);
}

window.OPENAI_KEY = ''
window.NAME = ''