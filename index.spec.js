import baretest from 'baretest';
import assert from 'assert';

import subject from './index.js';

const simpleValidation = baretest('Simple validation');

let theData = {name: 'icecream', email: 'vanilla@houses.com'}

const isPresent = x => !!x

const validations = {
    name: isPresent,
    email: isPresent
}

simpleValidation('validation should pass', function() {
  const res = subject(validations, theData)
  res.fold(console.error, function doassert(r) {
    return r.fold(v => {
      assert.deepStrictEqual(v, theData);
    })
  })
})

simpleValidation('validation not passing', function() {
  const res = subject(validations, Object.assign(theData, {name:null}))
  res.fold(function doassert(r) {
    return assert.equal(r, 'name bad');
  }, console.log)
})

simpleValidation.run()
