
export const init = () => { 
    var data = JSON.stringify({
        "collection": "<COLLECTION_NAME>",
        "database": "<DATABASE_NAME>",
        "dataSource": "Countdowns",
        "projection": {
          "_id": 1
        }
      });
      
      var headers = {
        'Content-Type': 'application/json',
        'Access-Control-Request-Headers': '*',
        'api-key': '0A3Uc7UHSOyClKMzTJvjb9IphkNhn9LxEHJZQRKjK3goCddfpbyHyuR3I2kZ3s7B',
      };
      
      var requestOptions = {
        method: 'POST',
        headers: headers,
        body: data,
      };
      
      fetch('https://sa-east-1.aws.data.mongodb-api.com/app/data-wtdto/endpoint/data/v1/action/findOne', requestOptions)
        .then(response => response.json())
        .then(data => {
          console.log(JSON.stringify(data));
        })
        .catch(error => {
          console.log(error);
        });
      
}
