import axios from 'axios';

async function GetNextMessageSafe(aiServerUrl, gstate, user_question = null) {
  try {
    console.log('callling backend...');

    // const url = process.env.REACT_APP_AI_URL;
    const url = aiServerUrl;

    const call_object = user_question === null ? gstate : { 'data': gstate, 'message': user_question };
    const result = await axios.post(url, call_object, {
        headers: {
          'Content-Type': 'application/json'
        }
    });
    console.log('returned from the backend...');
    if (result.status === 200) {
      const rstate = result.data;
      const message = rstate.message;
      const reply = rstate.filler;
      return {success: true, message, reply, callObject: rstate};
    }
    console.log(result && result.status_coode ? result.status_code : 'UNKNOWN ERROR');
    return {success: false, message:'', reply:'', callObject: gstate};
  }
  catch (err) {
    console.log(err);
    return {success:false, message:'', reply:'', callObject: gstate};
  }
}

export default GetNextMessageSafe;