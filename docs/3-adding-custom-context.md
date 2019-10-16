# Adding custom context

We already collect a lot of context about the environment to help you debug bugs, but if you feel like we're missing something or you can add some application-specific information, you can add some context of your own like this:

```JS
import flareClient from 'flare-client';

flareClient.addContext('version', '2.1.2');

flareClient.addContext("vuex store content", {
    user: { name: "Adrian", role: "admin" }
});
```

These will show up in the `Generic context` group in a report's _Context_ tab.

You can also add custom context groups:

```JS
flareClient.addContextGroup("custom context group", {
    key: 0,
    anotherKey: 'another value:',
});

```

## Customizing the report before sending

Sometimes you want to add in some extra context right as an error report is being created, or you might want to do the opposite and strip some context to protect your users' privacy even more. You can do this by using the `beforeSubmit` method of the client:

```JS
import flareClient from 'flare-client';

flareClient.beforeSubmit = function(report) {
    const editedReport = _.deepclone(report);

    // Hide a user's useragent
    editedReport.context.request.useragent = null;

    return editedReport;
}
```

You can also use this method to stop reports from being sent altogether, by simply returning `false`:

```JS
import flareClient from 'flare-client';

flareClient.beforeSubmit = function(report) {
    // Some checks you want to do before sending a report, for example if a user is on IE
    const passedChecks = …;

    if (!passedChecks) {
        return false;
    }

    return report;
}
```