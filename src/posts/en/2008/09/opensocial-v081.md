---
title: OpenSocial v0.8.1 Released
layout: post
lang: en
date: 2008-09-28
tags:
- OpenSocial
translationOf: /2008/09/opensocial-v081.html
translated: 2026-10-03
translatedManually: false
---
The OpenSocial v0.8.1 specification has been released.

* [OpenSocial Specification – Implementation Version 0.8.1](http://www.opensocial.org/Technical-Resources/opensocial-spec-v081)([Translation](http://devlog.agektmr.com/wiki/index.php?cmd=read&page=OpenSocial%2FOpenSocial%20API仕様%20%28v0.8.1%29))
* [OpenSocial RESTful Protocol](http://www.opensocial.org/Technical-Resources/opensocial-spec-v081/restful-protocol)([Translation](http://devlog.agektmr.com/wiki/index.php?cmd=read&page=OpenSocial%2FResultful%20Protocol))
* [OpenSocial RPC Protocol](http://www.opensocial.org/Technical-Resources/opensocial-spec-v081/rpc-protocol)(Untranslated)

* Note: Some parts of the translations may not yet reflect changes made since the beta version. If you spot any errors, please let me know.

Here are the [release notes](http://www.opensocial.org/Technical-Resources/opensocial-release-notes):

### OpenSocial Release Notes

**OpenSocial Specification Changes**

* **Server-side API changes** Added a JSON RPC protocol for server-to-server communication that enables simpler batch processing. For naming consistency, the RESTful API will now be referred to as the RESTful Protocol.
* **Added `-`, `_`, and `.` to characters permitted in OpenSocial IDs** OpenSocial IDs can now include `-`, `_`, and `.`, in addition to the previously allowed alphanumeric characters.
* **Aligned with the Portable Contacts specification**

**Incompatible Changes**

* **RESTful protocol incompatibilities** Many query and response fields were renamed or removed from the RESTful Protocol. The full list of changes to the RESTful Protocol is detailed below.

**RESTful Protocol Changes**

* **Compatibility with PortableContacts** Implementing the RESTful Protocol brings containers into technical compatibility with the [PortableContacts specification](http://portablecontacts.net/). The changes below were made to achieve this compatibility.
* **New response format `format=xml`** Requests now support the `format=xml` parameter. People requests must be made with either `format=xml` or `format=json`.
* **Containers must implement random-access paging** Containers are now required to implement paging using the `startIndex` and `itemsPerPage` parameters.
* **Removed `rel=next` link from collection fields** This parameter has been removed from JSON collection responses.
* **Removed author from collection fields** This parameter has been removed from JSON collection responses.
* **Containers must be able to return all contacts at once** Containers must be able to return all contacts in a single request, but may impose an upper limit on the number of returned contacts for performance reasons.
* **Default value for `itemsPerPage`** The default value when the `itemsPerPage` parameter is omitted from a request is container-dependent.
* **Changes to sorting parameters** The `orderBy` parameter was renamed to sortBy. Additionally, a `sortOrder` parameter was added, accepting `ascending` or `descending`. The default is `ascending`.
* **Added `updatedSince` parameter** Queries can now specify returning only entries that were updated within a specified time frame.
* **Indicate whether sorting and filtering occurred in the response** Since sorting and filtering are costly operations for containers, top-level response fields `filtered`, `sorted`, and `updatedSince` are now included in responses to indicate whether the requested filtering was actually applied.
* **Ability to request deleted `Person` objects** By using the newly added `@deleted` selector and the `updatedSince` parameter, it is now possible to retrieve contacts deleted after a specified date/time.
* **`Person` response must contain at least `id` and `name` fields** Containers must include the `name` and `id` fields in `Person` data.
* **`profileUrl` must also be a URL** The value returned in the `profileUrl` field of a `Person` must also be returned in the `urls` field of an entry with a `type` of `profile`.
* **Added `photos` field to `Person`** Added a `photos` field to `Person`, containing a list of entries with `url`, `type`, and `primary` subfields. When a `thumbnailUrl` field is returned on a `Person` object, that `url` must also be present in the `photos` field of an entry with a `type` of `thumbnail`.
* **Added `ims` field to `Person`** Added an `ims` field to `Person` with `value`, `type`, and `primary` subfields. Commonly used `type` values are defined as `aim`, `gtalk`, `icq`, `xmpp`, `msn`, `skype`, `qq`, and `yahoo`, but new `type` values can also be defined.
* **Added `accounts` field to `Person`** Added an `accounts` field to `Person` representing other services where the person has an account. This field contains a list of entries with `domain`, `userid`, `username`, and `primary` subfields.
* **Added `primary` subfield to multiple `Person` fields** Added a `primary` subfield to the `emails`, `urls`, `ims`, `phoneNumbers`, `addresses`, `organizations`, and `photos` fields of `Person` to indicate which field in the list is the primary one (if any).
* **Consolidated multiple `jobs` and `schools` fields into `organizations`** Entries for `jobs` and `schools` were consolidated into an array of `Organization` structures named `organizations`. The `Organization` structure is extended with a `type` subfield with canonical values of `job` and `school`.
* **Standardized multiple `Person` fields to a `value` field** Primary text values in multiple fields on `Person` should be stored in a subfield named `value`. This requires renaming instances of `emails.address`, `phoneNumbers.number`, `urls.address`, and all `{Enum}.key` fields to `{Enum}.value`. Because the `addresses`, `accounts`, and `organizations` fields are complex, the concept of a `value` field does not apply to them. For sorting and filtering, the "primary" subfields corresponding to these fields are `addresses.formatted`, `accounts.domain`, and `organizations.name`.
* **`Person` `gender` field is now a string** `Person` now treats `gender` as a string field, with `male` and `female` as canonical values.
* **Removed `extendedAddress` and `poBox` subfields from `Addresses`** Since full (potentially multi-line) addresses can now be stored in the `streetAddress` subfield, the `extendedAddress` and `poBox` subfields have been removed from `Address`.
* **Renamed `unstructuredAddress` to `formatted`** The `unstructuredAddress` subfield of `Address` has been renamed to `formatted`.
* **Renamed `dateOfBirth` to `birthday`** The `dateOfBirth` field on `Person` has been renamed to `birthday`.
* **Renamed timeZone to utcOffset** The `timeZone` field on `Person` has been renamed to `utcOffset`.
* **Definition of `nickname`** The `nickname` field on `Person` is defined as "a casual way to refer to the person in the real world."
* **Default set of `Person` fields** When the `fields` query parameter is omitted from a `Person` request, `id`, `name`, and `thumbnailUrl` have been defined as the minimum required default set to match the JS API defaults.
* **Querying supportedFields** Defined `/people/@supportedFields` and `/activities/@supportedFields` endpoints in the RESTful Protocol that return a list of `Person` and `Activity` fields supported by the container.
* **Removed `indexBy`** The `indexBy` query parameter has been removed.
* **`Activity.title` field is now an HTML string** The `Activity` title field will now be treated as a string containing HTML markup rather than a complex data object.
* **Renamed `unstructured` to `formatted`** The `unstructured` name field has been changed to `formatted`. 
* **Added `displayName` field** Added `displayName` as a top-level field on `Person`.

**RPC Protocol Changes**

* **Introduction of the RPC Protocol** A new RPC Protocol has been introduced as an option to simplify batch processing and complex server-to-server operations.

**`opensocial.*` JavaScript Changes**

* **New `opensocial.IdSpec.GroupId` enum** You can now use `opensocial.IdSpec.GroupId.FRIENDS` or `opensocial.IdSpec.GroupId.SELF` to construct `IdSpec` objects.
* **Defined return values for `supportsField`** Defined the return value of `opensocial.Environment.supportsField()` to return `true` if the container supports the field, and `false` otherwise.

**`gadgets.*` JavaScript Changes**

* There are no changes to the `gadgets.*` JavaScript API.

**Gadgets XML Changes**

* **OAuth support in the `<Preload>` element** The `authz` attribute of the `<Preload>` element now supports the value `oauth`. When `authz` is `oauth`, the `oauth_service_name`, `oauth_token_name`, `oauth_request_token`, and `oauth_request_token_secret` attributes are retrieved. These attributes have the same meanings and default values as the corresponding `gadgets.io.makeRequest` parameters.
