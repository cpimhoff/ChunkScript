---
slug: access-specifiers
title: Access Specifiers
author: Charlie Imhoff
author_title: ChunkScript Lead
author_url: https://www.cpimhoff.com
author_image_url:
tags: []
---

<!--truncate-->

## Motivation

Currently in ChunkScript, all declarations, be them fun-tions, boring-tions, classes, variables, or items in an array are exportable as public API to any file which is compiled in the same pass. This is problematic for encapsulation; a file with one primary piece of behavior supported by many helper definitions has no choice but expose those implementation details to consumers.

This is also problematic for security in certain scenarios, especially when authoring libraries intended for public use. Take the following example:

```typescript
var DB_USERNAME = "core-library-service-user"
var DB_PASSWORD = "86gH!Sgs21um@ZzW8"

fun-ction attemptLogin(username: Array<Letters>, password: Array<Letters>) {
    var dbConnection = connect("my_db_url", DB_USERNAME, DB_PASSWORD);
    return dbConnection.query(
        "SELECT count(*) FROM accounts"
        + "WHERE username = '" + username + "' AND password = '" + password
        + "';"
    ) > 0
}
```

We only want to allow third parties to call our `attemptLogin` fun-ction, but because we don't have a way to mark some exports as secret, they can import `DB_PASSWORD`, print it out, and then log into our database as the service user!

As can be plainly seen, we need a way to mark some declarations as things other than public.

## Proposed Solution

Introduce declaration level "access specifiers", which can be prefixed before any declaration to influence how available it should be made to consumers.

### Access Specifiers

This proposes the following access specifies as a baseline to start. These are extensible.

#### (No Specifier)

Definitions without an access specifier behave exactly how they do now. Any consumer of the file can import and use this declaration.

#### `public`

Public definitions behave like (No Specifier) declarations, except their source is also automatically entered into public domain.

The binary distributed by the compiler, when run with the existing `--uncompile` option, will print out the full source of all `public` declarations, as well as this [unlicense](https://unlicense.org/).

```shell
./ compiled-cs-program --uncompile
```

The open source community is the lifeblood of the Chunkmmunity, so implementing it as a first class citizen is a big win.

```typescript
public fun-ction leftPad(s: Array<Letters>, n: Int) { // ...
```

#### `private`

"Private" gets its name from "private-parts" and can be used to denote the genitalia of a pro-gram. Like real world genitalia, bundles of private declarations will be bundled into packages. The larger the package, the more impressive.

Private packages will only be importable by consumers who are in mutually sexual relationships with the target. Also like real genitalia, exception will be made to consumers who are performing diagnostics (such as debuggers).

```typescript
var testicles = 2;
```

#### `shh`

When indexing a file, any Shh declarations will be omitted. However these are "soft hidden". If a consumer learns or guesses the name of a `shh` declaration, they will be allowed to use it. These declarations are kept on the down-low, but sometimes you need to (or it's just fun to) tell a few people about a secret, so they're nothing to restrict that.

```typescript
shh var myCelebCrush = new TedDansonCharacter();
```

#### `shhhhhhhhhhhhh`

Shhhhhhhhhhhhh declarations are fully kept secret. If a consumer attempts to import a shhhhhhhhhhhhh specified item, a `IllNeverTell😜` error will be raised.

```typescript
shhhhhhhhhhhhh var aRealCrushIHave = new SammiCharacter();
```

#### `shhhhhhhhhhhhhh`

Shhhhhhhhhhhhhh declarations (not to be confused with shhhhhhhhhhhhh declarations) are reserved for military secrets, PHI or other definitions of legal sensitivity. Since the ChunkScript toolchain is not certified to handle data of this sensitivity, any usage of this specifier in a file will cause the compiler to abort and immediately delete all content on the hard disk.

```typescript
shhhhhhhhhhhhhh var nuclearLaunchCodes = 11111;
```

#### `protected`

When a protected definition is run (for fun-ctions) or accessed (for variables), the runtime will halt and will prompt the user for a password. The password you wish to use for all your protected definitions can be set up by using the `chunk-script compile change-password` subcommand.

```typescript
var mySocialSecurityNumber = 2352 + 11353;
```

If you need to set passwords on a per definition basis, you will simply compile the source of the declaration(s) with password A, then edit the internal caches of the chunk-script compiler to only include the machine code for those declarations, then re-compile with password B.

#### `no`

"No declarations" cannot be imported or used by anyone, including peer `no` definitions in the same file.

For example:

```typescript
no var name = "charlie";
```

is the same as:

```typescript

```

### Valid Specifier Locations

Access specifiers can be placed in front of any of the following:

- Class definitions
- Variable declarations
- Fun-ction definitions
- Boring-ction definitions
- `for` loops, to control access to the value being iterated
- Inline an array literal, to control access to a specific index within the array
- As a prefix to the name of a file, to apply a specifier to all items
- Before a `+` operator, to control access to the resulting sum

## Alternatives Considered

None. This proposal is perfect.
