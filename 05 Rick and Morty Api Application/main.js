let uri = 'https://rickandmortyapi.com/api/character/'
let link
let searchParam = ''
function getCharacters(link = uri) {
    fetch(link)
        .then(response => response.json())
        .then(item => {
            renderCharacters(item)
        })
        .catch((error) => { alert('There is not such a character') })
}
getCharacters()

function renderCharacters(data) {
    var resultElm = document.getElementById('character-list')
    resultElm.replaceChildren()
    for (let i = 0; i < data.results.length; i++) {
        let div = document.createElement('div')
        div.classList.add('character')
        let img = document.createElement('img')
        let div2 = document.createElement('div')
        div2.classList.add('character-info')
        let span_name = document.createElement('span')
        let span_gender = document.createElement('span')
        let span_species = document.createElement('span')
        let span_status = document.createElement('span')
        img.src = data.results[i].image
        span_name.innerHTML = '<b>Name: </b>' + data.results[i].name
        span_gender.innerHTML = '<b> Gender: </b>' + data.results[i].gender
        span_species.innerHTML = '<b> Species: </b>' + data.results[i].species
        span_status.innerHTML = '<b> Status: </b>' + data.results[i].status
        resultElm.appendChild(div)
        div.appendChild(img)
        div.appendChild(div2)
        div2.appendChild(span_name)
        div2.appendChild(span_gender)
        div2.appendChild(span_species)
        div2.appendChild(span_status)
    }
    pageNumber(data)
}

function pageNumber(data) {
    let pagenumber = data.info.pages
    var sliderdiv = document.getElementsByClassName('slider')[0]
    sliderdiv.replaceChildren()
    if (pagenumber > 1) {
        for (let i = 1; pagenumber >= i; i++) {
            let buttonslider = document.createElement('button')
            buttonslider.innerHTML = i
            sliderdiv.appendChild(buttonslider)
            buttonslider.onclick = function () {
                link = uri + '?page=' + i + '&' + searchParam
                getCharacters(link)
            }
        }
    }
}

function controlboxes() {
    searchParam = ''
    const checkBoxElm = document.querySelectorAll('input[type=checkbox]')
    let checkedBoxesGender = []
    let checkedBoxesSpecies = []
    let checkedBoxesStatus = []
    for (let i = 0; i < checkBoxElm.length; i++) {
        if (checkBoxElm[i].checked) {
            if (checkBoxElm[i].className == 'gender') { checkedBoxesGender.push(checkBoxElm[i].value) }
            if (checkBoxElm[i].className == 'species') { checkedBoxesSpecies.push(checkBoxElm[i].value) }
            if (checkBoxElm[i].className == 'status') { checkedBoxesStatus.push(checkBoxElm[i].value) }
        }
    }
    if ((checkedBoxesGender.length > 1) || (checkedBoxesSpecies.length > 1) || (checkedBoxesStatus.length > 1)) {
        alert('You can select only one item in each topic')
    } else {
        checkedBoxesGender.forEach(element => { searchParam += 'gender=' + element + '&' })
        checkedBoxesSpecies.forEach(element => { searchParam += 'species=' + element + '&' })
        checkedBoxesStatus.forEach(element => { searchParam += 'status=' + element + '&' })
    }
    link = uri + '?' + searchParam
    getCharacters(link);
}   