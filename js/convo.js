const CONVO_CONTAINER = document.querySelector('#convo')
const USER_INPUT_FORM = CONVO_CONTAINER.querySelector('#user-input')
const USER_INPUT = CONVO_CONTAINER.querySelector('#user-input > input')
const AI_RESPONSE = CONVO_CONTAINER.querySelector('#ai-response > span')

let CONVO = []
let USER_MESSAGE_COUNT = 0

let deleteOrTypeTextToken
async function deleteText(e, interval) {
    const token = Symbol()
    deleteOrTypeTextToken = token
    while (deleteOrTypeTextToken === token && e.textContent !== '') {
        e.textContent = e.textContent.slice(0, -1)
        await new Promise(resolve => setTimeout(resolve, interval))
    }
}
async function typeText(e, text, interval) {
    const token = Symbol()
    deleteOrTypeTextToken = token
    while (deleteOrTypeTextToken === token && text !== '') {
        e.textContent = e.textContent + text[0]
        text = text.slice(1)
        await new Promise(resolve => setTimeout(resolve, interval))
    }
}

function setActiveGirl(bar, gid) {
    CONVO = [
        { role: 'system', content: getCharacterPrompt(gid) }
    ]
    const avatar = document.querySelector(`#${bar} > .girl > .avatar`)
    avatar.src = `assets/characters/${gid}.png`
    document.querySelector(`#${bar}`).classList.add('girl-selected')
}

function rejectUser(item) {
    const args = JSON.parse(item.arguments);
    deleteText(AI_RESPONSE, 5).then(() => {
        typeText(AI_RESPONSE, args.message, 15)
    })
    setTimeout(() => {
        switchPage('end')
        
    }, 3000);
}
function giveNumber(item) {
    const args = JSON.parse(item.arguments);
    deleteText(AI_RESPONSE, 5).then(() => {
        typeText(AI_RESPONSE, args.message, 15)
    })
    setTimeout(() => {
        switchPage('end')
        
    }, 3000);
}

function __submit_user_input__() {
    CONVO.push({ role: 'user', content: USER_INPUT.value })

    USER_INPUT.disabled = true
    openai.responses.create({
        model: 'gpt-5.4-mini',
        reasoning: { effort: "low" },
        tools: TOOLS,
        input: CONVO
    }).then(resp => {
        CONVO.push(...resp.output)

        let calledTool = false

        resp.output.forEach(item => {
            if (item.type === 'function_call') {
                if (item.name === 'reject_user') rejectUser(item)
                if (item.name === 'give_number') giveNumber(item)
                CONVO.push({
                    type: "function_call_output",
                    call_id: item.call_id,
                    output: "ok"
                })
                calledTool = true
            }
        }) 
        if (!calledTool) 
            deleteText(AI_RESPONSE, 5).then(() => {
                typeText(AI_RESPONSE, resp.output_text, 15)
            })

        USER_INPUT.disabled = false
        USER_INPUT.focus()
    })

    USER_INPUT.value = "";
    deleteText(AI_RESPONSE, 25)
}

USER_INPUT_FORM.addEventListener('submit', (e) => {
    e.preventDefault()
    __submit_user_input__()
})