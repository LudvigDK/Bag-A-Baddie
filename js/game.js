function initGame() {
    loadBar(1)
    populateBars()
    document.querySelector('#game #timer').textContent = 0
    document.querySelector('#game .bar > .girl > .avatar').setAttribute('src', '')
}