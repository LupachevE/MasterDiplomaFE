export default class CognitiveCardClass {
    constructor() {
        this.data = null;
    }

    getDate() {
        const self = this;
        const file = '../test.json';
        return new Promise((resolve, reject) => {
            setTimeout(function () {
                var rawFile = new XMLHttpRequest();
                rawFile.overrideMimeType("application/json");
                rawFile.open("GET", file, true);
                rawFile.onloadend = () => {
                    self.data = JSON.parse(rawFile.responseText);
                    resolve(rawFile);
                }
                rawFile.onerror = () => reject(rawFile);
    
                rawFile.send(null);
            }, 1000);
        });
    }
}