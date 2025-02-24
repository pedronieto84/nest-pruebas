
const generateUUID = () => {
    return 'xxxxxxxxxxxxxxxxxxxx'.replace(/[x]/g, function() {
        const r = Math.random() * 16 | 0;
        return r.toString(16);
    });
}


export {
    generateUUID
}