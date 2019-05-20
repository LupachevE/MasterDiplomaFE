export default class CognitiveCardClass {
    constructor() {
        this.data = null;
    }

    async getDate() {
        let result = $.ajax({  
            url: '/api/default',  
            type: 'GET',  
            dataType: 'json',  
        });

        return result;
    }
}