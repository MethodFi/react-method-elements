# react-method-elements

[![NPM](https://img.shields.io/npm/v/react-method-elements.svg)](https://www.npmjs.com/package/react-method-elements)

## Introduction
Official react components for Method. See [Method Elements reference](https://docs.methodfi.com/api/elements/intro)
to learn more.

## Install

```bash
npm install --save react-method-elements
```

## Usage

```jsx
import React from 'react';
import { useMethod } from 'react-method-elements';
import './App.css';

function App() {
  const myAPI = {
    createElementToken: async (options) => {
      // Request for an element token from the
      // Method API (POST /elements/token)
      // through your backend server.

      return 'pk_elem_123456789';
    },
  };

  const method = useMethod({
    env: 'dev', // (dev / sandbox / production)
    onEvent: (payload) => {},
    onSuccess: (payload) => {},
    onError: (payload) => {},
    onExit: (payload) => {},
    onOpen: (payload) => {},
  });

  // Ensure method is loaded.
  if (!method) return null;

  const onClick = async () => {
    const token = await myAPI.createElementToken({});
    method.open(token);
  };

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={onClick}>
          Open Element
        </button>
      </header>
    </div>
  );
}

export default App;
```
