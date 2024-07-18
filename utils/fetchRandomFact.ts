export async function getFact(){
    var parag = ''
    const number = Math.floor(Math.random() * 100);
    var res = await fetch('http://numbersapi.com/'+number+'/math')
    parag = await res.text()
    return parag

    
}