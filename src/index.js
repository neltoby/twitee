import React from 'react'
import ReactDOM from 'react-dom'
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import App from './component/App'
import Provider from './component/Provider'

Sentry.init({
    dsn: "https://af328288a0fa4d02ae247051a9edd393@o469982.ingest.sentry.io/5500100",
    integrations: [
      new Integrations.BrowserTracing(),
    ],
  
    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 1.0,
  });

ReactDOM.render(<Provider><App /></Provider>, document.getElementById('root'))
