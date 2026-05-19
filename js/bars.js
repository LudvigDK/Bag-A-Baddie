const bars = document.querySelectorAll('.bar')
let currentBar = 1

function loadBar(index) {
    bars.forEach(b => {
        b.classList.toggle('hidden', b.id !== `bar-${index}`)
        console.log(b)
        console.log( b.querySelector('.music'))
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