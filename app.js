const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev')); 

app.get('/', (req, res) => {
    res.send('Hello Express!');
});

app.get('/echo', (req, res) => {
  const responseText = `Here are some details of your request:
    Base URL: ${req.baseUrl}
    Host: ${req.hostname}
    Path: ${req.path}
    `;
  res.send(responseText);
})

app.get('/queryViewer', (req, res) => {
  console.log(req.query);
  res.end(); //do not send any data back to the client
});

app.get('/greetings', (req, res) => {
  //1. get values from the request
  const name = req.query.name;
  const race = req.query.race;

  //2. validate the values
  if(!name) {
    //3. name was not provided
    return res.status(400).send('Please provide a name');
  }

  if(!race) {
    //3. race was not provided
    return res.status(400).send('Please provide a race');
  }

  //4. and 5. both name and race are valid so do the processing.
  const greeting = `Greetings ${name} the ${race}, welcome to our kingdom.`;

  //6. send the response 
  res.send(greeting);
});

//Assignment #1

app.get('/sum' , (req, res) => {
  const a = req.query.a;
  const b = req.query.b;

  if(!a) {
    return res.status(400).send('Please provide a');
  }

  if(!b) {
    return res.status(400).send('Please provide b');
  }

  const sumString = `The sum of ${a} and ${b} is ${parseInt(a) + parseInt(b)}.`

  res.send(sumString);
});

//Assignment #2

app.get('/cipher', (req, res) => {
  const text = req.query.text;
  const shift = req.query.shift;

  if(!text) {
    return res.status(400).send('Please provide text');
  }

  if(!shift) {
    return res.status(400).send('Please provide shift');
  }

  if(Number.isNaN(shift)) {
    return res.status(400).send('Please provide a number');
  }

  const base = 'A'.charCodeAt(0);

  const cipher = text.toUpperCase().split('').map( char => {
    const code = char.charCodeAt(0);

    if(code < base || code > (base + 26)) {
      return char;
    }

    let diff = code - base;
    diff = diff + parseInt(shift);

    diff = diff % 26

    const shiftedChar = String.fromCharCode(base + diff);
    return shiftedChar;
  })
  .join('');

  res.status(200).send(cipher);
});

//Assignment #3

app.get('/lotto', (req, res) => {
  const numbers = req.query.arr;
  let randomNumbers = [];

  if(numbers === undefined || numbers.length !== 6) {
    return res.status(400).send('Please provide six numbers');
  }

  for(let i=0;i<numbers.length;i++) {
    var randomNumber = Math.floor(Math.random() * 20) + 1;
    randomNumbers.push(randomNumber.toString());
  }

  let result = randomNumbers.filter(number => numbers.includes(number));

  let responseText;

  if(result.length === 6) {
    responseText = "Wow! Unbelievable! You could have won the mega millions!";
  }

  else if(result.length === 5) {
    responseText = "Congratulations! You win $100!";
  }

  else if(result.length === 4) {
    responseText = "Congratulations, you win a free ticket";
  }

  else {
    responseText = "Sorry, you lose";
  }

  console.log(result.length);

  res.status(200).send(responseText);
})

app.listen(8000, () => {
    console.log('Express server is listening on port 8000!');
});