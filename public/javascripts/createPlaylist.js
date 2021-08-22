const body = document.querySelector('body')

document.querySelector('.create-playlist').addEventListener('click', () => {
    let container = document.createElement('div')
    let opaque = document.createElement('div')

    container.innerHTML = `<form method="POST" action="/create-playlist">
        <label for="playlist-url">Enter a playlist URL</label>
        <img id="close-create" src="https://s2.svgbox.net/hero-outline.svg?ic=x&color=fff" width="32" height="32">
        <input type="text" name="playlist-url" id="playlist-url">
        <input type="submit" value="Submit">
    </form>`

    opaque.classList.add('opaque')
    container.classList.add('create-playlist-form')
    body.appendChild(opaque)
    body.appendChild(container)
    
    document.getElementById('close-create').addEventListener('click', () => {
        body.removeChild(document.querySelector('.opaque'))
        body.removeChild(document.querySelector('.create-playlist-form'))
    })

})