const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));


app.get('/', (req, res) => {
  res.send('Bellow Expressed!');
});

app.listen(8000, () => {
  console.log('Express server is listening on port 8000!');
});

app.get('/burgers', (req, res) => {
  res.send('We have juicy cheese burgers!');
})

app.get('/pizza/pepperoni', (req, res) => {
  res.send('Your pizza is on the way!')
})

app.get('/pizza/pineapple', (req, res) => {
  res.send("We don't serve that here. Never call again!")
})

app.get('/echo', (req, res) => {
  const responseText = `Here are some details of your request:
    Base URL: ${req.baseUrl}
    Host: ${req.hostname}
    Path: ${req.path}
    Secure: ${req.secure}
  `;
  res.send(responseText);
})

app.get('/queryViewer', (req, res) => {
  console.log(req.query);
  res.end();
})

app.get('/greetings', (req, res) => {
  const name = req.query.name;
  const race = req.query.race;

  if (!name) {
    return res.status(400).send('Please provide a name.');
  }

  if (!name) {
    return res.status(400).send('Please proved a race.');
  }

  const greeting = `Greetings ${name} the ${race}, 
    welcome to our Kingdom.`

  res.send(greeting)
})

//Drill 1 
app.get('/cipher', (req, res) => {
  const { text, shift } = req.query;

  // validation: both values are required, shift must be a number
  if (!text) {
    return res
      .status(400)
      .send('text is required');
  }

  if (!shift) {
    return res
      .status(400)
      .send('shift is required');
  }

  const numShift = parseFloat(shift);

  if (Number.isNaN(numShift)) {
    return res
      .status(400)
      .send('shift must be a number');
  }
  const base = 'A'.charCodeAt(0);

  const cipher = text
    .toUpperCase()
    .split('')
    .map(char => {
      const code = char.charCodeAt(0);

      if (code < base || code > (base + 26)) {
        return char;
      }

      let diff = code - base;
      diff = diff + numShift;

      diff = diff % 26;

      const shiftedChar = String.fromCharCode(base + diff);
      return shiftedChar;
    })
    .join('');

  res
    .status(200)
    .send(cipher);
});


//Drill 3
app.get('/lotto', (req, res) => {
  const nums = req.query.num;
  let count = 0;
  console.log('nums: ', nums)
  if (nums.length > 6 || nums.length < 6 || !nums) {
    return res.status(400).send('Please send 6 numbers to play.')
  }

  for (let i = 0; i < nums.length; i++) {

    if (isNaN(Number(nums[i]))) {
      return res.status(400).send('Please make sure you are only using numbers.')
    }
    if (nums[i] > 20 || nums[i] < 1) {
      return res.status(400).send('Please use numbers between 1 and 20 to play.')
    }
  }

  let number = 0;

  for (let i = 0; i < nums.length; i++) {
    number = Math.ceil(Math.random() * 20)
    if (nums[i] == number) {
      count = count + 1;
    }
  }

  if (count < 4) {
    return res.status(400).send("Sorry, you lose")
  }
  if (count == 4) {
    return res.status(400).send("Congratulations, you win a free ticket")
  }
  if (count == 5) {
    return res.status(400).send("Congratulations! You win $100!")
  }
  if (count == 6) {
    return res.status(400).send("Wow! Unbelievable! You could have won the mega millions!")
  }
  console.log(nums, count)
})