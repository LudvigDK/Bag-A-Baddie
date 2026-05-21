const CONVO_CONTAINER = document.querySelector('#convo')
const USER_INPUT_FORM = CONVO_CONTAINER.querySelector('#user-input')
const USER_INPUT = CONVO_CONTAINER.querySelector('#user-input > input')
const AI_RESPONSE = CONVO_CONTAINER.querySelector('#ai-response > span')

let CONVO = []

function setActiveGirl(bar, gid) {
    CONVO = [
        { role: 'system', content: getCharacterPrompt(gid) }
    ]
    const avatar = document.querySelector(`#${bar} > .girl > .avatar`)
    avatar.src = `assets/characters/${gid}.png`
    document.querySelector(`#${bar}`).classList.add('girl-selected')
}

function rejectUser(item) {
    switchPage('end')
    const args = JSON.parse(item.arguments);
    AI_RESPONSE.textContent = args.message
    alert('You have been rejected')
}
function giveNumber(item) {
    switchPage('end')
    const args = JSON.parse(item.arguments);
    AI_RESPONSE.textContent = args.message
    alert('You got her number')
}

function __submit_user_input__() {
    if (!confirm('Confirm openai api request')) return

    CONVO.push({ role: 'user', content: USER_INPUT.value })

    USER_INPUT.disabled = true
    openai.responses.create({
        model: 'gpt-5.4-mini',
        reasoning: { effort: "low" },
        tools: TOOLS,
        input: CONVO
    }).then(resp => {
        CONVO.push(...resp.output)

        AI_RESPONSE.textContent = resp.output_text
        USER_INPUT.disabled = false
        
        resp.output.forEach(item => {
            if (item.type === 'function_call') {
                if (item.name === 'reject_user') rejectUser(item)
                if (item.name === 'give_number') giveNumber(item)
                CONVO.push({
                    type: "function_call_output",
                    call_id: item.call_id,
                    output: "ok"
                })
            }
        })
    })

    USER_INPUT.value = "";
    AI_RESPONSE.textContent = ""
}

USER_INPUT_FORM.addEventListener('submit', (e) => {
    e.preventDefault()
    __submit_user_input__()
})