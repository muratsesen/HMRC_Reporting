import fs from 'fs';
import { parseString } from 'xml2js'; 
import xml2js from 'xml2js';

export default function reportError(response){
    const { statusCode,body } = response;
    
    console.log("ERROR");
    console.log("STATUS CODE:",statusCode);
    console.log("-------------------");
    
    const parser = xml2js.Parser();
    parser.parseString(body, function (err, result) {
      
      let faultcode = result['env:Envelope']['env:Body'][0]['env:Fault'][0].faultcode.toString();
      let faultstring = result['env:Envelope']['env:Body'][0]['env:Fault'][0].faultstring.toString();
      
      console.log('Fault Code:',faultcode );
      console.log("---------------------");
      console.log('Fault String:',faultstring);
  
    });
  
    //Write to file
    fs.appendFile('serverResponse.json', JSON.stringify(response), (writeErr) => {
      if (writeErr) {
        console.error(writeErr);
      } else {
        console.log('serverResponse file is written successfully');
      }
    });
  
    fs.appendFile('serverResponse.json', '\n------------------------------------\n',()=>null);
  }