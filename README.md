# Paybyrd Web SDK Integration

This project was created to wrap some exposed functions from Paybyrd Payment SDK to be used
in the UI with Vanilla Javascript. Check this documentation to know how to use it and
what functions we provide.

### Installation

You just need to import our paybyrd.js file in your project and all the methods
will be available in the window, so you don't need any instances to make it work.
It's just plug and play.

### Additional Configuration

Using the DEMO project, you can change the URL selecting the "three dots" button and tying the new URL

### Available Methods

We are using a prefix called `PBSDK_` to help using our methods without getting lost.
Check in the list below what methods we provide and learn more about them:

#### PBSDK_startTransaction()

| Parameter          | Type       | Description                                                                  |
| :----------------- | :--------- | :--------------------------------------------------------------------------- |
| `data`             | `object`   | **Required**. The object that will be sent to the API                        |
| `callbackResponse` | `function` | **Required**. The callback that will be called when any response is received |

```
Data Reference:
{
    amount: Long                            // 100 will be parsed to 0.01
    currency: ENum                          // Check available currencies in the references section
    type: ENum                              // REFUND | CHARGE
    referencedTransactionIdentifier: GUID   // Used when type is REFUND
}

Callback Reference:
@return {Object} // Returns an object with all transaction data with a status, so it can be used in a switch case to handle possible responses
```

#### PBSDK_isPaybyrdWebSDK()

Returns a boolean if the client is using this project under a Paybyrd SDK environment so the
methods works properly

#### PBSDK_getPaybyrdSDKVersion()

Returns the current version of the SDK project

#### PBSDK_getAppData()

Returns information from the APP that is being used

#### PBSDK_getTerminalData()

Returns information from the Terminal that is being integrated

#### PBSDK_installApp(apkPath)

If an APK Path is provided, it can installs the APP programmatically
