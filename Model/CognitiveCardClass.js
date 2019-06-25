export default class CognitiveCardClass {
    constructor() {
        this.data = null;
    }

    async getCardData(id) {
        let result = $.ajax({  
            url: '/api/card',  
            type: 'GET',  
            dataType: 'json',
            data: {
                'id': id
            }
        });

        return result;
    }
}