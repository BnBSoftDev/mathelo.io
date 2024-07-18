export async function getFact(){
    const number = Math.floor(Math.random() * 100);
    var res = await fetch('http://numbersapi.com/'+number+'/math')
    return await res.text()
}