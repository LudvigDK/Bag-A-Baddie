function initGame() {
    loadBar(1)
    populateBars()
    document.querySelector('#game #timer').textContent = 0
    document.querySelector('#game .bar > .girl > .avatar').setAttribute('src', '')
    document.querySelector('#game #convo #ai-response span').textContent = ''
    document.querySelectorAll('#game .bar.girl-selected').forEach(e => {
        e.classList.remove('girl-selected')
    });
}