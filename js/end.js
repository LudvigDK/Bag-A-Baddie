function initEnd() {
    const time = Math.round((new Date() - START_TIME) / 1000)
    const combined_score = time * USER_MESSAGE_COUNT

    clearInterval(GAME_TIMER_UPDATER)
    if (RESULT == 'success') {
        submitScore(window.NAME, combined_score, time, USER_MESSAGE_COUNT)
        document.querySelector('#end #result').textContent = 'Du fik hendes nummer!'
    } else {
        document.querySelector('#end #result').textContent = 'Du blev afvist :('
    }

    document.querySelector('#end #stats #messages').textContent = USER_MESSAGE_COUNT
    document.querySelector('#end #stats #time').textContent = time
    document.querySelector('#end #stats #final-score').textContent = combined_score
}