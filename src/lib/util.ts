export function convertIndexedArrayToAssociativeArrayBasedOnValue(a: any, k: string, v: string) {
    let n: {[key: string]: string} = {};

    for (let i = 0; i < a.length; i++) {
        n[a[i][k]] = a[i][v];
    }

    return n;
}

export function convertAssociativeArrayToIndexedArrayBasedOnValue(a: any, k: string, v: string) {
    let n: Array<object> = [];
    
    for (const e in a) {
        let t: {[key: string]: string} = {};
        t[k] = e;
        t[v] = a[e];
        n.push({...t});
    }

    return n;
}

export function getFirstX(a: Array<any>, x: number) {
    let n: Array<any> = [];
    for (let i = 0; i < x; i++) {
        if (i === a.length) break;
        n.push(a[i]);
    }
    return n;
}

export function makeId(length: number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}
