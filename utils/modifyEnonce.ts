export function addNewLines(enonce: string, charsPerLine: number) {
    //fix this mess
    //maybe only get math expressions in svg and let other stuff just be text
    var bigList = customSplit(enonce, `$$`);

    for (let i = 0; i < bigList.length; i += 2) {
        const small = customSplit(bigList[i], '$');
        let acc = 0;
        for (let j = 0; j < small.length; j += 2) {
            if (j + 1 < small.length) acc += small[j + 1].length;
            acc += small[j].length;
            if (acc >= charsPerLine) {
                let c = small[j].length - 1;
                while (acc >= charsPerLine) {
                    acc--;
                    c--;
                }
                small[j] = `${small[j].slice(0, c)}\\\\${small[j].slice(c)}`;
                acc = 0;
            }
        }
        bigList[i] = small.join('$');
    }
    const ret  = bigList.join('$$');
    return ret;
}

function customSplit(str:string,separator:string){
    var list = []
    var acc = 0
    for (let i = 0; i < str.length; i++) {
        if(str.slice(i,i+separator.length)===separator){
            list.push(str.slice(acc,i))
            acc = i+separator.length
        }
        
    }
    list.push(str.slice(acc))
    return list
}