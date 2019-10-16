The JavaScript client for Flare to catch your frontend errors.

Comes with Vue and React integrations.

# Flare Client

### Important notes
 - None of the integrations will work before running the setup of the client. Make sure to import the `flare-client` before importing any integrations.

 - The client will only automatically report **uncaught** errors or errors that you manually report. Error boundaries (like `try…catch` or React error boundaries) will need to implement a custom method of reporting errors to the platform, as described elsewhere in the docs.

### Setup

```js
import flareClient from 'flare-client';

// only launch in production, we don't want to waste Flare quota while developing.
if (process.env.NODE_ENV === 'production') {
    flareClient.light('yOuRpRoJeCtKeY');
}

/* TODO: remove the reporting URL in the production client.
Maybe let it default to https://flareapp.io/api/reports,
but allow us to overwrite it for testing purposes? */
```

# Browser

Errors that are not caught and bubble up to `window`, are caught automatically by the Flare client.

# Vue

### Setup

```js
import flareClient from 'flare-client';
import flareVlue from 'flare-vue';

flareClient.light('flare-api-token', 'http://flareapp.io/api/report');

Vue.use(flareVue);
```

# React

### Important notes

- If you bundle React for development, you will see that many issues are reported twice. This is expected behaviour and will not occur in a production bundle (read more: https://github.com/facebook/react/issues/10474).


### Setup

In your app's root file (`/src/App.js` for `creact-react-app`), wrap your entire component tree in the provided `FlareErrorBoundary` component:

```js
import FlareErrorBoundary from 'flare-react';

render(
    <FlareErrorBoundary>
        <Root />
    </FlareErrorBoundary>,
    document.getElementById('app')
)
```

You should use a combination of Flare's and your own error boundaries, continue reading to find out how to report errors to Flare in your own error boundary components.

### Reporting React errors in your own error boundaries

If you have your own error boundary components, e.g. for displaying a fallback component when something goes wrong, the error won't bubble up to the error boundary exported by `flare-react` and we won't be able to report it to the Flare app.

If you still want to know about these errors, you can easily report the error manually by using the `reportReactError` function exported from the `flare-react` library:

```js
import { reportReactError } from "flare-react";

export default class ErrorBoundary extends React.Component {
    componentDidCatch(error, info) {
        reportReactError(error, info);
    }
}
```
