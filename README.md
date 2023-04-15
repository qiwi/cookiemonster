# cookiemonster
[![CI](https://github.com/qiwi/cookiemonster/actions/workflows/ci.yaml/badge.svg?branch=master&event=push)](https://github.com/qiwi/cookiemonster/actions/workflows/ci.yaml)
[![Maintainability](https://api.codeclimate.com/v1/badges/01b67bf5bc60a67df296/maintainability)](https://codeclimate.com/github/qiwi/cookiemonster/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/01b67bf5bc60a67df296/test_coverage)](https://codeclimate.com/github/qiwi/cookiemonster/test_coverage)
> Stateless fake API based on cookie processing

<img width="400" src="./src/docs/cookiemonster.svg">

## Usage
On server side:
```ts
//...
import {cookiemonster} from '@qiwi/cookiemonster'

const app = express()

app.use(cookieParser())
app.use(bodyParser.json())
app.use(cookiemonster())
```

On client:

```ts
import {formatScenario} from '@qiwi/cookiemonster'

const data = formatScenario({
  steps: [
    {res: {code: 200, body: {foo: 'bar'}}}
  ]
})

document.cookie = `Cookiemonster=${data}`
```

## Refs
* [mock-server/mockserver](https://github.com/mock-server/mockserver)

## License
[MIT](./LICENSE)
