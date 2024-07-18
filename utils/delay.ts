export async function delay(period: number) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('');
        }, period);
    });
    
}