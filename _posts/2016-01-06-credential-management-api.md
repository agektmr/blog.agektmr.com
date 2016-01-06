---
layout: post
title: "Streamlining sign-in flow with the Credential Management API"
date: "2016-01-06"
categories:
- Identity
- Authentication
---

Getting users signed-up and signed-in on your website is vital for providing sophisticated user experience. It lets users interact with other people using a dedicated profile, sync data across devices, process data while offline, the list goes on and on. But creating, remembering and typing passwords tend to be cumbersome for end users and it's easier for them to re-use same passwords end up raising their accounts' security rink.

<!-- excerpt -->

Using federation such as [Google Sign-In](https://developers.google.com/identity/sign-in/web/) is great options, but a transition from existing id/password solution isn't a work of a day.

Chrome has landed a brand new feature called [Credential Management API](http://w3c.github.io/webappsec-credential-management/) in which Chrome 50 complies with the latest spec as of January 2016. It's [an open standard](http://w3c.github.io/webappsec-credential-management/) for the web that can handle credential information for users to help them sign-in.

Find out how it works:
[https://credential-management-sample.appspot.com/](https://credential-management-sample.appspot.com/)

# What is Credential Management API?
Credential Management API allows developers saving, restoring user's credential information from a browser so developers can let users programmatically sign-in using JavaScript. In Chrome's implementation, those passwords will be stored in Chrome's password manager. Users can sign in to Chrome to sync their passwords across devices.

Their passwords can also be synced with Android apps which have integrated the Smart Lock for Passwords API for Android. Read [official documentation](https://developers.google.com/identity/smartlock-passwords/android/) to learn more.

# Requirements
Credential Management API is available on Chrome version later than 50 with `chrome://flags/#enable-credential-manager-api` flag turned on. You need to use it on secure origins such as HTTPS domains or localhost.

# Basics
Credential Management API has 3 APIs.

* navigator.credentials.get()
* navigator.credentials.store()
* navigator.credentials.requireUserMediation()


## navigator.credentials.get()
This function gives you access to a stored credential for the origin from password manager. If there are multiple credentials stored, browser shows a prompt so the user can choose one.

<img src="/images/2016-01-06-credential-management-api/screenshot1.png" width="300" />

An argument object provides options for the credential to obtain:

* `password`: Boolean whether you want to receive a password credential or not
* `federated`:
    * `providers`: An array of expected identity providers in string
    * `protocols`: An array of expected federation protocol in string
* `suppressUI`: Boolean whether you want to skip UI? (See below for more details)

For `providers` array, you can assign arbitrary strings as long as you can determine which identity provider that means. `protocols` isn't implemented yet.

### Example:
{% highlight js %}
navigator.credentials.get({
  password: true, // Obtain password credentials or not
  federated: {    // Obtain federation credentials or not
    providers: [  // Specify IdPs
      'https://account.google.com/',
      'https://www.facebook.com/'
    ]
  },
  suppressUI: false // true if auto sign-in (learn "mediation")
}).then(onCredentialGet);
{% endhighlight %}

The resolving function will receive a credential object which includes:

* `type`: The type of the credential in string: `password` or `federated`.
* `id`: The id of the account
* `iconURL`: The icon url associated with the id


Depending on the type of the credential object, it also includes
### Password credential:

* `password`: The password for the account

### Federated credential:

* `provider`: A provider name in string
* `protocol`: A protocol name in string (not implemented as of Chrome 49)


### Example:
{% highlight js %}
var onCredentialGet = function(cred) {
  if (cred.type == 'password') {
    // `POST` the credential object as HTTP body.
    // It will be converted to `FormData`
  } else if (cred.type == 'federated' &&
             cred.provider == 'https://accounts.google.com/') {
    var id = cred.id;

    // Federated login using Google Sign-In
    var auth2 = gapi.auth2.getAuthInstance();
    // By using `login_hint` you can specify the account
    // user wants to sign-in with.
    auth2.signIn({
      login_hint: id
    });
  }
};
{% endhighlight %}

* Note that raw passwords are unretrievable through JavaScript.

To learn more about Google Sign-In, read [the official documentation](https://developers.google.com/identity/sign-in/web/).

## navigator.credentials.store()
This function stores a user credential for the origin on the password manager.

Use `new PasswordCredential()` or `new FederatedCredential()` depending on the type of the credential.

Credential object takes an argument including

* `id`: the id of the account
* `iconURL`: The icon url associated with the id


Depending on the type of the credential object, they additionally includes:

### Password credential:

* `password`: The password for the account

#### Example:
{% highlight js %}
// If password
var cred = new PasswordCredential({
  id: id,
  password: password,
  iconURL: iconUrl
});
navigator.credentials.store(cred);
{% endhighlight %}

### Federated credential:

* `provider`: An identity provider in string
* `protocol`: A federation protocol in string


#### Example:
{% highlight js %}
// If federation
var cred = new FederatedCredential({
  id: id,
  provider: 'https://account.google.com/',
  iconURL: iconUrl
});
navigator.credentials.store(cred);
{% endhighlight %}

## navigator.credentials.requireUserMediation()
This function turns on user's mediation status. Read on for more details on "mediation".

### Example:
{% highlight js %}
navigator.credentials.requireUserMediation();
{% endhighlight %}

# Integrating the feature in your site
The main benefit of using Credential Management API is auto sign-in. You can let users sign-in without any explicit action.

In order to make it happen, you will need to:

1. Store user's credential upon user sign up
1. Get the credential then let the user sign-in


But wait, what happens if the user sign-out while auto sign-in is enabled? Won't this bring the user back to signed-in state right away? Does this mean users won't be able to sign-out forever? How can the user create or switch to another account?

This is where the concept of mediation comes in. "Mediation" is a per origin status that the user indicated explicit sign-out which is saved to the browser by calling `navigator.credentials.requireUserMediation()`.

The mediation status prevents users from automatically sign-in when `suppressUI` is `true` and it won't be turned off until the next time user explicitly chooses to sign-in with `suppressUI: false`. Ending session and closing browser won't turn this off.

This means you will call `navigator.credentials.get()` twice on your website, once with `suppressUI: true` when trying automatic sign-in and the second with `suppressUI: false` when trying explicitly sign-in.

Things got a bit complex, but in summary, here's how it should work:

1. Upon user landing, try automatic sign-in (`suppressUI: true`).
    1. If the user gets signed-in, you are done.
1. If the user is not signed-in, show a sign-in button and wait for an explicit sign-in action.
1. Upon button press, try explicit sign-in (`suppressUI: false`)
    1. Account chooser show up and wait for the user's explicit action
    1. If the user gets signed-in, you are done.
1. Unless the user is signed-in yet, this means he/she is not signed up yet, or intended to use an account that is not stored yet.
1. Show a form to let the user manually sign-in.
1. Upon successful user sign-in, store the user credential
    1. If the user gets signed-in, you are done.
1. Upon user sign-out, don't forget to call `navigator.credentials.requireUserMediation()` to enable mediation mode.

<img src="/images/2016-01-06-credential-management-api/flowchart.png">

# Sample code

## automatic sign-in
Upon user landing, try automatic sign-in.

{% highlight js %}
if (navigator.credentials) {
  // Obtain credential information
  // Account chooser appears if multiple accounts are stored
  navigator.credentials.get({
    password: true,
    federated: {
      providers: [
        'https://account.google.com/',
        'https://www.facebook.com/'
      ]
    },
    suppressUI: true // automatic sign-in
  }).then(function(cred) {
    if (cred) {
      switch (cred.type) {
        case 'password':
          signInWithPassword(cred); // pseudo code
          return;
        case 'federated':
          switch (cred.provider) {
            case 'https://accounts.google.com/':
              signInWithGoogle(cred.id); // pseudo code
              return;
            case 'https://www.facebook.com/':
              signInWithFacebook(cred.id); // pseudo code
              return;
            default:
              console.error('unknown identity provider');
              break;
          }
          break;
        default:
          console.log('No credentials found');
          break;
      }
    }
    // no credential information found
    renderSignInButton();
  }, function(err) {
    // failed obtaining credential information
    renderSignInButton();
  });
}
// credential management api is not available.
renderSignInButton();
{% endhighlight %}

## Explicit sign-in
Upon user pressing sign-in button, try explicit sign-in. Notice most of the code is identical to automatic sign-in.

{% highlight js %}
var autoSignIn = function() {
if (navigator.credentials) {
  navigator.credentials.get({
    password: true,
    federated: {
      providers: [
        'https://account.google.com/',
        'https://www.facebook.com/'
      ]
    },
    suppressUI: false // explicit sign-in
  }).then(function(cred) {
    if (cred) {
      switch (cred.type) {
        case 'password':
          signInWithPassword(cred); // pseudo code
          return;
        case 'federated':
          switch (cred.provider) {
            case 'https://accounts.google.com/':
              signInWithGoogle(cred.id); // pseudo code
              return;
            case 'https://www.facebook.com/':
              signInWithFacebook(cred.id); // pseudo code
              return;
            default:
              console.error('unknown identity provider');
              break;
          }
          break;
        default:
          console.log('No credentials found');
          break;
      }
    }
    // no credential information found
    renderSignInForm();
  }, function(err) {
    // failed obtaining credential information
    renderSignInForm();
  });
}
renderSignInForm();
{% endhighlight %}

## Store credentials
{% highlight js %}
// Upon successful user sign-in or sign-up...
// On password credential
var cred = new PasswordCredential({
  id: email,
  password: password,
  iconURL: imageUrl
});

// On federation credential
var cred = new FederatedCredential({
  id: email,
  name: name,
  provider: provider,
  iconURL: imageURL
});

navigator.credentials.store(cred).then(function() {
  // storing credential is done.
});
{% endhighlight %}

## Use Mediation
{% highlight js %}
// ** After Sign out **
// Following code prevents automatic sign-in regardless of session.
// Next time the user comes back, navigator.credentials.get() with
// suppressUI: true will be silently ignored.
navigator.credentials.requireUserMediation();
{% endhighlight %}

# Feedback requested
Chrome team is working hard to make this API useful yet secure and convenient. If you have any feedback, concerns or opinions, please do let us know.

Here's the form to submit your feedback. Thanks!
