<h1 align="center">
  <img src="https://raw.githubusercontent.com/EasyGraphQL/easygraphql-now/master/logo.png" alt="easygraphql-tracing" width="350">
  <br>
    easygraphql-tracing
  <br>
  <br>
</h1>

`easygraphql-tracing` is a node libreary used with [`express-graphql`](https://github.com/graphql/express-graphql) to get the time
to resolve a field.

## Requirements

+ GraphQL: `"^14.0.0"`
+ express-graphql: `"^0.7.0"`

## Installation

To install the package on your project just run on the root of your project

```shell
$ npm install easygraphql-tracing --save-dev
```

## How to use it

+ Import `{ tracing, fieldResolver }` from `easygraphql-tracing` package
+ Create a new express middleware with `tracing`
+ On your `graphqlHTTP` function, set the option `fieldResolver`


## Example:

```js
const express = require('express');
const graphqlHTTP = require('express-graphql');
const { tracing, fieldResolver } = require('easygraphql-tracing');

const app = express();

app.use(tracing)

app.use('/graphql', graphqlHTTP({
  schema: MyGraphQLSchema,
  graphiql: true,
  fieldResolver
}));

app.listen(4000);
```

## Result
It'll create a table on the console
```
┌─────────────┬─────────────┬─────────────┬─────────────────────────────────┬───────────────┬───────────────┐
│ Field name  │ Parent Type │ Return Type │ Path                            │ Duration (ns) │ Duration (ms) │
├─────────────┼─────────────┼─────────────┼─────────────────────────────────┼───────────────┼───────────────┤
│ uuid        │ Activity    │ ID!         │ getActivityByUuid - uuid        │ 3645          │ 0.003645      │
├─────────────┼─────────────┼─────────────┼─────────────────────────────────┼───────────────┼───────────────┤
│ name        │ Activity    │ String!     │ getActivityByUuid - name        │ 1768          │ 0.001768      │
├─────────────┼─────────────┼─────────────┼─────────────────────────────────┼───────────────┼───────────────┤
│ description │ Activity    │ String      │ getActivityByUuid - description │ 751           │ 0.000751      │
├─────────────┼─────────────┼─────────────┼─────────────────────────────────┼───────────────┼───────────────┤
│ rating      │ Activity    │ Float!      │ getActivityByUuid - rating      │ 913           │ 0.000913      │
└─────────────┴─────────────┴─────────────┴─────────────────────────────────┴───────────────┴───────────────┘
```

<img src='./result.gif' alt='result' >


## License
### The MIT License

Copyright (c) 2019 EasyGraphQL

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
