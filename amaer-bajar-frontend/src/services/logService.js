// import * as Sentry from "@sentry/react";
// import { Integrations } from "@sentry/tracing";

function init() {
    //sentry capture starts
    /*
    Sentry.init({
        dsn: "https://43da54411ef844748ddf542349fafd74@o1024864.ingest.sentry.io/5990734",
        integrations: [new Integrations.BrowserTracing()],

        // Set tracesSampleRate to 1.0 to capture 100%
        // of transactions for performance monitoring.
        // We recommend adjusting this value in production
        tracesSampleRate: 1.0,
    });
    */
    //sentry capture ends
}
function log(error){
    // Sentry.captureException(error); //calling the capture
    // Sentry.captureMessage("Something went wrong");
    console.error(error);
}

export default {
    init,
    log
}