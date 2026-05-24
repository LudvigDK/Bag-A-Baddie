const bars = document.querySelectorAll('.bar')
let currentBar = 1

const girl_selection_html_template = `
<a id="girl-{index}" class="girl" onclick="setActiveGirl('{bar}', '{gid}')">
    <img class="avatar" src="{avatar}">
</a>
`

function loadBar(index) {
    bars.forEach(b => {
        b.classList.toggle('hidden', b.id !== `bar-${index}`)
        if (b.id !== `bar-${index}`)
            b.querySelector('.music').pause()
        else
            b.querySelector('.music').play()
    });
    return true
}
function nextBar() {
    currentBar += 1
    if (currentBar > bars.length) { currentBar = bars.length; return false }
    bars.forEach(b => {
        b.classList.toggle('hidden', b.id !== `bar-${currentBar}`)
        if (b.id !== `bar-${currentBar}`)
            b.querySelector('.music').pause()
        else
            b.querySelector('.music').play()
    });
    return true
}
function prevBar() {
    currentBar -= 1
    if (currentBar < 1) { currentBar = 1; return false }
    bars.forEach(b => {
        b.classList.toggle('hidden', b.id !== `bar-${currentBar}`)
        if (b.id !== `bar-${currentBar}`)
            b.querySelector('.music').pause()
        else
            b.querySelector('.music').play()
    });
    return true
}

function populateBars() {
    let local_girls = structuredClone(GIRLS)
    bars.forEach(b => {
        const girl_selection = b.querySelector('#girl-selection')
        girl_selection.querySelectorAll('.girl').forEach(e => { e.remove() })
        for (let index = 1; index <= 3; index++) {
            let girl = local_girls.splice(Math.floor(Math.random() * local_girls.length), 1)[0]
            girl_selection.innerHTML += format(girl_selection_html_template, {
                index: index,
                bar: b.id,
                gid: girl.gid,
                avatar: girl.avatar
            })
        }
    });
}