import React, { useState } from 'react'
import Parse from 'parse/dist/parse.min.js';
// Your Parse initialization configuration goes here
const PARSE_APPLICATION_ID = 'gIq6izXuQPBa0ajNpM550S5hfjRRIy9DXXgF22oW';
const PARSE_HOST_URL = 'https://parseapi.back4app.com';
const PARSE_JAVASCRIPT_KEY = 'SXvHwioIxbCb1e9lbEXocSMsRvsuZ0LJ6GCWmiEt';
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

export default function Database() {
  const [person, setPerson] = useState(null);

  async function addPerson() {
    const soccerPlayers = new Parse.Object("users");
        //Define its attributes
        soccerPlayers.set("userId", "A. Wed");
        // soccerPlayers.set("yearOfBirth", 1997);
        // soccerPlayers.set("emailContact", "a.wed@email.io");
        // soccerPlayers.set("attributes", ["fast","good conditioning"])
        try{
            //Save the Object
            let result = await soccerPlayers.save()
            alert('New object created with objectId: ' + result.id);
        }catch(error){
            alert('Failed to create new object, with error code: ' + error.message);
        }
  }

  async function fetchPerson() {
    // create your Parse Query using the Person Class you've created
    const query = new Parse.Query('Person');
    
    // use the equalTo filter to look for user which the name is John. this filter can be used in any data type
    // run the query
    const Person = await query.first();
    // access the Parse Object attributes
    console.log('person name: ', Person.get('name'));
    console.log('person email: ', Person.get('email'));
    console.log('person id: ', Person.id);
    setPerson(Person);
  }

  return (
    <div>
      <button onClick={addPerson}>Add Person</button>
      <button onClick={fetchPerson}>Fetch Person</button>
      {person !== null && (
        <div>
          <p>{`Name: ${person.get('name')}`}</p>
          <p>{`Email: ${person.get('email')}`}</p>
        </div>
      )}
    </div>
  );
}
