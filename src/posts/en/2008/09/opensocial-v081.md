---
layout: post
lang: en
title: 'OpenSocial v0.8.1 released'
description: ''
date: 2008-09-28
tags:
- OpenSocial
translationOf: /2008/09/opensocial-v081.html
translated: 2025-11-29
translatedManually: false
---
The OpenSocial v0.8.1 specification has been published.

* [OpenSocial Specification – Implementation Version 0.8.1](http://www.opensocial.org/Technical-Resources/opensocial-spec-v081)([translated](http://devlog.agektmr.com/wiki/index.php?cmd=read&page=OpenSocial%2FOpenSocial%20API仕様%20%28v0.8.1%29))
* [OpenSocial RESTful Protocol](http://www.opensocial.org/Technical-Resources/opensocial-spec-v081/restful-protocol)([translated](http://devlog.agektmr.com/wiki/index.php?cmd=read&page=OpenSocial%2FResultful%20Protocol))
* [OpenSocial RPC Protocol](http://www.opensocial.org/Technical-Resources/opensocial-spec-v081/rpc-protocol)(untranslated)

*Some of the translations have not been updated with the beta version. Please let us know if you find any errors.

The release notes are as follows:

### OpenSocial Release Notes

**OpenSocial specification changes**

* **Server-Side API Changes** The server-to-server communication feature now uses the JSON RPC protocol, which enables simpler batch processing. To maintain naming consistency, the RESTful API will now be called the RESTful protocol.
* **Added `-`, `_`, and `.` to the allowed characters in OpenSocial IDs** OpenSocial IDs can now contain `-`, `_`, and `.` in addition to the traditional alphanumeric characters.
* **Aligned with the Portable Contacts specification**

**Breaking changes**

* **RESTful Protocol Incompatibility** Many query and response fields have been renamed or removed from the RESTful protocol. All changes to the RESTful protocol are listed below.

**RESTful protocol changes**

* **PortableContacts Compatibility** By implementing the RESTful protocol, containers are technically compatible with the
[PortableContacts specification](http://portablecontacts.net/). The following changes have been implemented to achieve this compatibility:
* **New response type `format=xml`** Requests now support the `format=xml` parameter. People requests must be made with `format=xml` or `format=json`.
* **Containers must implement random-access paging** Containers are now required to implement paging using the
`startIndex` and `itemsPerPage` parameters.

* **The `rel=next` link has been removed from collection fields.** This parameter has been removed from JSON collection responses.
* **The author has been removed from collection fields.** This parameter has been removed from JSON collection responses.
* **Containers must be able to return all contacts at once.** Containers must be able to return all contacts in a single request, but can limit the number of contacts returned for performance reasons.
* **Default value for `itemsPerPage`** If the `itemsPerPage` parameter isn't specified in the request, the default value depends on the container.
* **Changes to sorting parameters** The `orderBy` parameter has been renamed to sortBy. The `sortOrder` parameter has also been added, allowing `ascending` (ascending) and `descending` (descending) sorting. The default is `ascending`.
* **Added `updatedSince` parameter** You can specify that a query should only return entries updated within a specified time period.
* **Indicate whether sorting and filtering were performed in the response** Because sorting and filtering can be expensive for containers, the response now includes top-level response fields `filtered`,
`sorted`, and `updatedSince` to indicate whether the requested filtering was performed.
* **Can now request deleted `Person` objects** The newly added `@deleted` selector and `updatedSince` parameter allow you to retrieve contacts deleted after a specified date and time.
* **`Person` The response must include at least the `id` and `name` fields.** The container must include the `name` and `id` fields in the `Person` data.
* **`profileUrl` must also be a URL.** The value returned in the `profileUrl` field of `Person` must also be returned in the `urls` field of the entry whose `type` is `profile`.
* **`Person` now has the `photos` field.** `Person` now has the `photos` field, which contains a list of entries with `url`, `type`, and `primary` subfields.
If an `Person` object returns an `thumbnailUrl` field, this
`url` must also be present in the `photos` field of any entry whose `type` is `thumbnail`.
* **`Person` now includes the `ims` field.** `Person` now includes the `ims` field, with the subfields `value`, `type`, and `primary`. The commonly used `type` values `aim`, `gtalk`, `icq`, `xmpp`, `msn`, `skype`, `qq`, and `yahoo` are predefined, but you can also define a new value `type`.
* **`Person` now includes the `accounts` field.** `Person` now includes the `accounts` field, which indicates other services for which the person has accounts. This field contains a list of entries with the `domain`, `userid`, `username`, and `primary` subfields.
* **`primary` subfield added to several `Person` fields** The `Person` fields
`emails`, `urls`, `ims`, `phoneNumbers`, `addresses`, `organizations`,
`photos` now have the `primary` subfield, which indicates which field in the list is primary (if present).
* **Consolidated `jobs` and `schools` multi-fields into `organizations`** `jobs` and `schools` entries have been consolidated into an array of `Organization` structures named `organizations`. The `Organization` structure has been extended with an `type` subfield, with `job` and `school` as legal values.
* **Standardized `Person` multi-fields into an `value` field** `Person` multi-fields should store their primary text value in a subfield named `value`. This requires renaming `emails.address`, `phoneNumbers.number`, `urls.address`, and all instances of the `{Enum}.key` field to `{Enum}.value`. Due to the complexity of the `addresses`, `accounts`, and `organizations` fields, the concept of a `value` field does not exist. For sorting and filtering purposes, the "primary" subfields of these fields are `addresses.formatted`, `accounts.domain`, and `organizations.name`. * **`Person` `gender` fields are strings** `Person` treats `gender` as a string field, with `male` and `female` as legal values.
* **`Addresses` - `extendedAddress` or `poBox` subfields deprecated**
Because it's now possible to store a complete (possibly multi-line) address in the `streetAddress` subfield, the `Address` subfields `extendedAddress` and `poBox` have been deprecated.
* **`unstructuredAddress` changed to `formatted`** The `unstructuredAddress` subfield of `Address` has been renamed to `formatted`.
* **`dateOfBirth` changed to `birthday`** The `dateOfBirth` field of `Person` has been renamed to `birthday`.
* **timeZone changed to utcOffset** The `timeZone` field of `Person` has been renamed to `utcOffset`.
* **Definition of `nickname`** The `Person` field in `nickname` has been defined as "an informal way to refer to this person in the real world."
* **Default Set of `Person` Fields** `Person` If the query parameter `fields` is missing from a request, a minimal default set of `id`, `name`, and `thumbnailUrl` has been defined to match the defaults in the JS API.
* **Querying supportedFields** The RESTful protocol now defines an endpoint called `/people/@supportedFields
  および/activities/@supportedFields` that returns a list of the `Person` and `Activity` fields supported by the container.
* **`indexBy` Deprecated** The `indexBy` query parameter has been deprecated.
* **`Activity.title` Fields are now treated as HTML strings. **`Activity` The Title field is now treated as a string containing HTML markup, rather than a complex data object.
* **`unstructured` Changed to `formatted`** The Name field `unstructured` has been changed to `formatted`.
* **`displayName` Field Added** `displayName` has been added as a top-level field of the `Person` field.

**RPC protocol changes**

* **The RPC protocol is here** A new option, the RPC protocol, has been introduced to simplify batch processing and complex server-to-server operations.

**`opensocial.*` JavaScript Changes**

* **New `opensocial.IdSpec.GroupId` enum** `IdSpec` objects can now be constructed using `opensocial.IdSpec.GroupId.FRIENDS` or `opensocial.IdSpec.GroupId.SELF`.
* **Responses for `supportsField` Defined**
The return value for `opensocial.Environment.supportsField()` has been defined to return `true` if the container supports fields, or `false` otherwise.

**`gadgets.*` JavaScript Changes**

* `gadgets.*` There are no changes to the JavaScript API.

**Gadgets XML Changes**

* **OAuth support for the `<Preload>` element** The `<Preload>` element's `authz ` attribute now supports the `oauth`
value. When ` authz` is `oauth`,
the `oauth_service_name`, `oauth_token_name`, `oauth_request_token`,
and `oauth_request_token_secret` attributes are retrieved. These attributes have the same meanings and default values as those corresponding to the
`gadgets.io.makeRequest` parameter.
