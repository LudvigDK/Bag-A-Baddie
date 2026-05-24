const pages = document.querySelectorAll('.page')

function switchPage(pid) {
    pages.forEach(p => {
        p.classList.toggle('hidden', p.id !== pid)
    });
}

function applyPageLoadScripts(container) {
    const mute = container.classList.contains('hidden')
    container.querySelectorAll('audio').forEach(a => a.muted = mute)

    if (container.classList.contains('hidden')) return
    if (container.dataset.initScript) window[container.dataset.initScript]()
}

pages.forEach(applyPageLoadScripts)

const observer = new MutationObserver(mutations => {
    mutations.forEach(m => applyPageLoadScripts(m.target))
})

pages.forEach(container => {
    observer.observe(container, { attributes: true, attributeFilter: ['class'] })
})