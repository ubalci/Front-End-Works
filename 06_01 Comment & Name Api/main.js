const apiUrl = 'https://kokpit.smartlimon.com/items/'
const commentInput = document.getElementById('comment-input')
const commentName = document.getElementById('name-id')
const postButton = document.getElementById('postButton')
const commentIdInp = document.getElementById('comment-id')
const movieId = document.getElementById('movie-id')
const deleteButton = document.getElementById('deleteButton')
const updateButton = document.getElementById('updateButton')
const tableBody = document.getElementById('table-body')
const token = 'AmN8rnhDsZLLox3-WBVcdmIxFDmRuqhK'

const callApi = (apiEndpoint='comment' ,method='GET', payload=null) => {
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

const getComments = () => {  
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
            tabledata2.innerText = item.comment
            let tabledata3 = document.createElement('td')
            tablerow.append(tabledata3)
            tabledata3.innerText = item.movie_id
            let tablewtd = document.createElement('td')
            tablewtd.classList='title2'
            let tabledata4 = document.createElement('button')
            let tabledata5 = document.createElement('button')
            tablerow.append(tablewtd)
            tablewtd.append(tabledata4)
            tablewtd.append(tabledata5)
                tabledata4.innerText="Yorumu sil"
                tabledata4.addEventListener('click',function(){
                    var result = confirm("Are you sure you want to delete?")
                    if (result) {deleteComment(item.id)}})
                tabledata5.innerText="Yorumu güncelle" 
                tabledata5.addEventListener('click',function(){updateComment(item.id)})
            })           
            })
    .catch(err=>{
        console.log(err)
    })
}

const addComment = () => {
    callApi('comment', 'POST', {name: commentName.value, comment: commentInput.value, movie_id: movieId.value})
    .then(resp=>tableBody.replaceChildren())
    .then(resp=> getComments())
}

const updateComment = (id) => {
    callApi('comment/'+id,'PATCH',{comment: commentInput.value})
    .then(resp=>tableBody.replaceChildren())
    .then(resp=>getComments())
}

const deleteComment = (id) => {
    callApi('comment/'+id,'DELETE')
    .then(resp=>tableBody.replaceChildren())
    .then(resp=>getComments())
}

getComments()

postButton.addEventListener('click',addComment)
deleteButton.addEventListener('click',function(){deleteComment(commentIdInp.value)})
updateButton.addEventListener('click',function(){updateComment(commentIdInp.value)})