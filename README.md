# cookiemonster
[![CI](https://github.com/qiwi/cookiemonster/actions/workflows/ci.yaml/badge.svg?branch=master&event=push)](https://github.com/qiwi/cookiemonster/actions/workflows/ci.yaml)
[![Maintainability](https://api.codeclimate.com/v1/badges/01b67bf5bc60a67df296/maintainability)](https://codeclimate.com/github/qiwi/cookiemonster/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/01b67bf5bc60a67df296/test_coverage)](https://codeclimate.com/github/qiwi/cookiemonster/test_coverage)
> Stateless fake API based on cookie processing

## Usage
On server side:
```ts
//...
import {cookiemonster} from '@qiwi/cookiemonster'

const app = express()

app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', cookiemonster())
```

On client:
```ts
document.cookie = 'Fake-Scenario={order-details:{ok: {themeCode: "salampay"}}+payment-methods:{ok}+commission:{ok}+polling:{ok}+pay:{ok}+merchant-site:{ok}+email:{ok}+create-invoice:{ok}+customization:{ok}+create-qr-code:{ok}}'
```

## Refs
* [mock-server/mockserver](https://github.com/mock-server/mockserver)

## License
[MIT](./LICENSE)
