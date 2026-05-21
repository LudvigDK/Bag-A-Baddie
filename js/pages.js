const pages = document.querySelectorAll('.page')

function switchPage(pid) {
    pages.forEach(p => {
        p.classList.toggle('hidden', p.id !== pid)
    });
}

function applyMuteState(container) {
    const mute = container.classList.contains('hidden')
    container.querySelectorAll('audio').forEach(a => a.muted = mute)
}

// Handle existing containers on load
pages.forEach(applyMuteState)

// Watch for class changes
const observer = new MutationObserver(mutations => {
    mutations.forEach(m => applyMuteState(m.target))
})

pages.forEach(container => {
    observer.observe(container, { attributes: true, attributeFilter: ['class'] })
})