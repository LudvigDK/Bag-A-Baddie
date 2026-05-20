const CONVO_CONTAINER = document.querySelector('#convo')
const USER_INPUT = CONVO_CONTAINER.querySelector('.user-input > input')
const SEND_BTN = CONVO_CONTAINER.querySelector('.user-input > a')
const AI_RESPONSE = CONVO_CONTAINER.querySelector('.ai-response > span')

let CONVO = []

function setActiveGirl(id) {
    CONVO = [
        { user: 'system', content: getCharacterPrompt('isolde') }
    ]
}

function __submit_user_input__() {
    CONVO.push(USER_INPUT.value)

    openai.responses.create({
        model: 'gpt-5.4-mini',
        reasoning: { effort: "low" },
        TOOLS,
        CONVO
    }).then(resp => {
        CONVO.push(resp.output)
        AI_RESPONSE.textContent = resp.output_text
    })
}


[USER_INPUT, SEND_BTN].forEach(e => {
    e.addEventListener('click', __submit_user_input__)
})