# `react-zip-hook`

> React hooks for zipcloud in order to fetch address

> You'll need to install `react`, `react-dom`, etc at `^16.8.4`

## Install

```sh
npm i react-zip-hook --save
```

# Usage

```js
import { useAddresses } from 'react-zip-hook';

const Component = () => {
  // useAddresses(zipcode, limit)
  const { addresses } = useAddresses('1450062')
};
```
