const apiUrl = 'https://kokpit.smartlimon.com/items/'
const movieId = document.getElementById('movie-id')
const movieName = document.getElementById('name-id')
const movieScore = document.getElementById('movie-score')
const movieDirector = document.getElementById('director')
const movieGenre = document.getElementById('genre')
const commentList = document.getElementsByClassName('commentlist')[0]
const commentDiv = document.getElementsByClassName('commentdiv')[0]
const postButton = document.getElementById('postButton')
const deleteButton = document.getElementById('deleteButton')
const updateButton = document.getElementById('updateButton')
const tableBody = document.getElementById('table-body')
const token = 'AmN8rnhDsZLLox3-WBVcdmIxFDmRuqhK'

const callApi = (apiEndpoint='movies' ,method='GET', payload=null) => {
    return new Promise((resolve, reject)=>{
        fetch(apiUrl + apiEndpoint,
            {
                method: method,
                body: payload?JSON.stringify(payload):payload,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'Authorization': 'Bearer '+token
                }
            })         
        .then(resp=>{
            if(method!='DELETE'){
                return resp.json()}else{
                    return resp
                }})        
        .then(resp=>{
            resolve(resp.data)
        }).catch(err=>{
            console.log('err', err)
            reject(err)
        })
    })  
}

const getMovies = () => {  
    callApi().then(resp=>{
        console.log(resp)
        resp.reverse().forEach(item=>{
            let tablerow = document.createElement('tr')
            tableBody.append(tablerow)
            let tabledata0 = document.createElement('td')
            tablerow.append(tabledata0)
            tabledata0.innerText = item.id
            let tabledata1 = document.createElement('td')
            tablerow.append(tabledata1)
            tabledata1.innerText = item.name
            let tabledata2 = document.createElement('td')
            tablerow.append(tabledata2)
            tabledata2.innerText = item.score
            let tabledata3 = document.createElement('td')
            tablerow.append(tabledata3)
            tabledata3.innerText = item.director
            let tabledata4 = document.createElement('td')
            tablerow.append(tabledata4)
            tabledata4.innerText = item.genre
            let tablewtd = document.createElement('td')
            tablewtd.classList='title2'
            let tabledata5 = document.createElement('button')
            let tabledata6 = document.createElement('button')
            let tabledata7 = document.createElement('button')
            tablerow.append(tablewtd)
            tablewtd.append(tabledata5)
            tablewtd.append(tabledata6)
            tablewtd.append(tabledata7)
            tabledata5.innerText="Filmi sil"
            tabledata5.addEventListener('click',function(){
                var result = confirm("Are you sure you want to delete?")
                if (result) {deleteMovie(item.id)}})
            tabledata6.innerText="Filmi güncelle" 
            tabledata6.addEventListener('click',function(){updateMovie(item.id)})
            tabledata7.innerText="Yorumları getir" 
            tabledata7.addEventListener('click',function(){getComments(item.id)})
            })           
            })
    .catch(err=>{
        console.log(err)
    })
}

const addMovie = () => {
    callApi('movies', 'POST', {director: movieDirector.value, genre: movieGenre.value, name: movieName.value, score: movieScore.value})
    .then(resp=>tableBody.replaceChildren())
    .then(resp=> getMovies())
}

const updateMovie = (id) => {
    callApi('movies/'+id,'PATCH',{director: movieDirector.value, genre: movieGenre.value, name: movieName.value, score: movieScore.value})
    .then(resp=>tableBody.replaceChildren())
    .then(resp=>getMovies())
}

const deleteMovie = (id) => {
    callApi('movies/'+id,'DELETE')
    .then(resp=>tableBody.replaceChildren())
    .then(resp=>getMovies())
}

const getComments = (id) =>{
    commentList.replaceChildren()
    callApi('comment?filter[movie_id]='+id, 'GET').then(resp => {
        console.log(resp)
        let commentspan = document.createElement('span')
        commentList.append(commentspan)
        if (resp.length<1){
            commentspan.innerText = (id +' numaralı ID\'ye sahip filmin yorumları bulunamadı.')
        }else{   
            commentspan.innerText = (id +' numaralı ID\'ye sahip filmin yorumları aşağıdadır:')
           resp.forEach(element => {
            let commentlist = document.createElement('li')
            commentList.append(commentlist)
            commentlist.innerText = (element.name + ' kullanıcısının yorumu: ' + element.comment)
           });
        }
        
    })
}

getMovies()

postButton.addEventListener('click',addMovie)
deleteButton.addEventListener('click',function(){deleteMovie(movieId.value)})
updateButton.addEventListener('click',function(){updateMovie(movieId.value)})