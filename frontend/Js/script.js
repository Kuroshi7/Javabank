const h2 = document.getElementById('textH2')
const text = [
    'T','u','d','o','o','q','u','e','v','o','c','ê',
    'p','r','e','c','i','s','a','e','m','u','m','s',
    'ó','l','u','g','a','r'
]

let c = 0;

const typewriter = () => {

    h2.innerText += text[c]
    c++

    if(c === 30){
        clearInterval(interval)
    }

    if(c == 12){
        h2.innerHTML += '<br>'
    }

    if(c == 4 || c == 8 || c == 12 || c == 19 || c == 21 || c == 23 || c == 25){
        h2.innerHTML += '&nbsp;' 
    } 

}

const interval = setInterval(typewriter, 125)