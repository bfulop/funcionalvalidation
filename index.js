// import {List} from 'immutable';
import I from './immutable-ext.js';

const Right = x =>
({
  fold: (f, g) => g(x),
  map: f => Right(f(x)),
  concat: o =>
    o.fold(e => Left(e),
      r => Right(x.concat(r)))
})

const Left = x =>
({
  fold: (f, g) => f(x),
  map: f => Left(x),
  concat: o => Left(x)
})

const fromNullable = x =>
  x != null ? Right(x) : Left(null)

// const First = xs => 
//   fromNullable(xs[0])

class Either {
  constructor(x) {
    this.$value = x;
  }

  static of(x) {
    return Right(x);
  }
}

const First = either =>
({
  fold: f => f(either),
  concat: o => 
    either.isLeft ? o : First(either)
})

const validate = (spec, obj) => 
  I.List(Object.keys(spec)).foldMap(
  key => {
    return spec[key](obj[key]) ? Right(First(obj)) : Left(`${key} bad`)
  },
  Either.of(First(obj))
  )

const obj = {name: 'brian', email: 'brian@brian.com'}

export default validate;

