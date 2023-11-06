//import soapRequest  from 'easy-soap-request';
import fs from 'fs';
import {data} from './data.js';
import generateW1XML from './utils/generateW1XML.js';
import reportError from './utils/reportError.js';

const url = 'https://tpvs2.hmrc.gov.uk/ws/atwd/service?WSDL';
const sampleHeaders = {
  'user-agent': 'sampleTest',
  'Content-Type': 'text/xml;charset=UTF-8',
  'soapAction': 'https://graphical.weather.gov/xml/DWMLgen/wsdl/ndfdXML.wsdl#LatLonListZipCode',
};

(async () => {
  const xml = generateW1XML('w1.xml',data);
  //return

  const { response } = await soapRequest({ url: url, headers: sampleHeaders, xml: xml, timeout: 1000 }); // Optional timeout parameter(milliseconds)
  const { headers, body, statusCode } = response;

  if(statusCode === 200){
    console.log("SUCCESS");
  }
  else
  {
    reportError(response)
  }
})();

function soapRequest(opts = {
    method: 'POST',
    url: '',
    headers: {},
    xml: '',
    extraOpts: {},
  }) {
    const {
      method,
      url,
      headers,
      xml,
      extraOpts,
    } = opts;

    return new Promise((resolve, reject) => {
      fetch(url, {
        method: method || 'POST',
        headers,
        body: xml,
        ...extraOpts,
      }).then(async (response) => {
        resolve({
          response: {
            headers: response.headers,
            body: await response.text(),
            statusCode: response.status,
          },
        });
      }).catch(async (error) => {
        reject(error)
      });
    });
  }