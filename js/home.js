function showHighscores() {
    const highscores = document.querySelector('#home #highscores table tbody')
    score_template = `<tr>
            <td>{name}</td>
            <td>{time}</td>
            <td>{messages}</td>
            <td>{score}</td>
        </tr>`

    getHighscores().then(scores => {
        scores.forEach(s => {
            highscores.innerHTML += format(score_template, {
                name: s.name,
                time: s.time,
                messages: s.messages,
                score: s.score,
            })
        });
    })
}

function initHome() {
    console.log('home')
    window.addEventListener('load', () => { showHighscores() })
}