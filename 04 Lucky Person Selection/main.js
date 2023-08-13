const students = [
    {name: "Anıl Gider", sex: "male"},
    {name: "Aytekin Şahin", sex: "male"},
    {name: "Çağrı Dai", sex: "male"},
    {name: "Doğukan Yıldırım", sex: "male"},
    {name: "Ferhat Canbaz", sex: "male"},
    {name: "Kutluhan Tarlacı", sex: "male"},
    {name: "Özlem Kösretaş", sex: "female"},
    {name: "Sena Özyiğit", sex: "female"},
    {name: "Ufuk Balcı", sex: "male"},
    {name: "Sercan Gürsoy", sex: "male"},
    {name: "Halenur Küçük", sex: "female"},
    {name: "Semih Senan", sex: "male"},
    {name: "Berna Yılmaz", sex: "female"},
    {name: "Emine Mümtaz", sex: "female"},
]
const listStudentElm = document.getElementById('listedstudents')

function studentInit(member){
    listStudentElm.innerHTML = ''
    if (member == null){
        students.forEach((element) => {
        listStudentElm.innerHTML += '<li>' +element.name+ '</li>' 
        });
    }else{
        for (let i=0; i<students.length; i++){
            listStudentElm.innerHTML += '<li>' +students[i].name+ '</li>'
            if(member == i){
                listStudentElm.childNodes[i].style.background = 'yellow'    
            }     
        }
    }    
}
studentInit();

function lucky(){
    let randInd = Math.floor(Math.random() * students.length)
    studentInit(randInd)
    /* bize 0-13 arası bir sayı lazım */
}