const pages = document.querySelectorAll('.page')

function switchPage(pid) {
    pages.forEach(p => {
        p.classList.toggle('hidden', p.id !== pid)
    });
}