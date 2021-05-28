---
slug: optimizing-for-engagement
title: Optimizing for Engagement
author: Charlie Imhoff
author_title: ChunkScript Lead
author_url: https://www.cpimhoff.com
author_image_url:
tags: []
---

<!--truncate-->

## Motivation

There is no shortage of people that will tell you that ChunkScript is a blast to use. However, if you look at [Stack Overflow's List of Most Loved Programming Languages](https://insights.stackoverflow.com/survey/2020#technology-most-loved-dreaded-and-wanted-languages-loved) you will notice that ChunkScript does not appear.

This is unacceptable.

Unfortunately, there are not clear paths to improving this score from the perspective of utility.

- Rust currently tops the list, and ChunkScript has _more_ features than Rust, such as the ability to write thread unsafe code that corrupts memory.
- A rebrand isn't in order, as TypeScript is in second, and basically _copied us_ by naming their language "\_\_\_Script".
- Python is in third, but that makes sense since they recently did [a promotional movie tie-in depicting the Python3 migration](https://en.wikipedia.org/wiki/The_Day_the_Earth_Caught_Fire).

This leaves us with a key question that we, the ChunkScript maintainers, must answer:

> How do you improve upon perfection?

The answer, of course, is that we don't. Instead, the answer to our publicity shortcoming is not to make the language a better tool, but to make the experience of using the language more engaging to the masses.

**How do we keep a ChunkScript programmer coming back to ChunkScript, again and again, hungry for more ChunkScripting?**

Enter: the ChunkBox.

## Proposal

A ChunkBox is a [loot-box](https://en.wikipedia.org/wiki/Loot_box) awarded by the ChunkScript compiler. ChunkBoxes contain random items that the programmer can use during development, such as new keywords, compiler targets, bug fixes, language features, and APIs in the standard library.

### Earning ChunkBoxes

Each day the ChunkScript compiler will have 3 randomly generated challenges for the user to attempt to complete for ChunkStars (CS). Challenges will range from easy (1 CS) to hard (3 CS). Every 10 CS, the compiler will automatically award a ChunkBox (CB).

You can view your challenges and progress with the new `dailies` command.

```
$ chunk-script dailies
  * Compile 3 "for" loops
    [----------] COMPLETED
 ** Name a fun-ction "dog_helicopter"
    [          ]
*** Execute 5 segfaults
    [--        ] 1 of 5
```

You can redeem your ChunkStars for ChunkBoxes using the new `store` command:

```
$ chunk-script store balance
   Balance: *32

$ chunk-script store view
   [1] (*10) ChunkBox

$ chunk-script store add-to-cart 1
$ chunk-script store checkout
  Thank you for shopping with ChunkScript!

  ChunkBox x1: *10
     Subtotal: *10
        Taxes: *1
   ------------------
        Total: *11
```

Currently, the store only sells ChunkBoxes, but this ensures that if we want to sell additional products (such as ChunkBox bundle packs) we can.

The store is backed by blockchain and ChunkStars are a cryptocurrency.

### What's in the Box?

So now we have a ChunkBox, and we're eager to see what is inside. Anything can be! The excitement is that we could earn a **common** item, such as a `man` page, or we could earn some really exciting (but rare!) **legendary** item, like the `x86` compiler target.

One issue is that all these features are currently available immediately when you start using ChunkScript. This is changing for two reasons:

- For new users, it'd be nicer if you only had access to `for` _or_ `while` at the start, instead of being overwhelmed by both at the start.
- For long time fans, starting with everything means there's no motivation to keep programming, and no sense of pride and accomplishment for using the `break` keyword.

So to improve these issues, and to add to the ChunkBox prize pool, the following items will be taken out of all installations of ChunkScript, and placed into ChunkBoxes for users to earn.

#### Items Moving Into ChunkBoxes

##### Keywords

- `else` (common)
- `while` (common)
- `public` (common)
- `import` (rare)
- `continue` (rare)
- `break` (legendary)

##### Standard Library

- `String` (common)
- `Double` (common)
- `rand()` (common)
- `print()` (common)
- `MIN_INT` (common)
- `+` operator (common)
- `PI` (common)
- `Array.isEmpty` (common)
- `Array.length` (rare)
- Array literal syntax (`[value]`) (rare)
- Dictionary literal syntax (`{"key": value}`) (rare)
- `assert()` (rare)
- `Mutex` (rare)
- `-` operator (rare)
- `Set` (legendary)
- `Float` (legendary)
- `MAX_INT` (legendary)

##### Language Features

- Single-line comments (common)
- Generics (rare)
- Multi-line comments (legendary)

##### Compiler Options

- `--help` (common)
- `--font` (common)
- `--easy-but-worse-types` (rare)
- `--dry-run` (rare)
- `--garbage-collection-frequency` (rare)
- `--link` (legendary)

##### Compiler Targets

The compiler is always able to target the host machine's architecture, but setting an explicit target is reserved for after you unlock it.

- `pdp-8` (common)
- `pdp-11` (common)
- `mips` (rare)
- `dlx` (rare)
- `micro32` (rare)
- `x86` (legendary)
- `arm64` (legendary)

### Opening Experience

Now that we have a prize pool, let's open our ChunkBox using the new `open` command to see what's inside!

```
$ chunk-script open
  BOOP! String.
  You've unlocked the `String` data type.
  You can now use Strings in all your ChunkScript programs!

  BOOP! else.
  You already have the `else` keyword.

  KABLAM! --link.
  You've unlocked the `--link` compiler option.
  You can now use the linker when compiling programs!
```

I've already received the `else` keyword before, so I get nothing for that, but WOW! I got my first legendary item! I can't wait to use the new `--link` compiler option!

### Monetization

This will be a lot of work to implement, so the ChunkScript team will also monetize ChunkBoxes at 5 $USD each. This can be used if a user wants to skip the grind of daily challenges.

## Alternatives Considered

### Not topping the StackOverflow's most beloved language chart

Unacceptable.

### Battlepass system

This is the rumored route that `C++21` is taking. They are using it to solve the feature bloat that has crept into the language over its long history, not to drive engagement. As a result, I don't think it makes sense to go down this path.

### Direct purchase micro-transactions

The excitement (and thus engagement) of the proposed system is that you don't know what you'll get. If you could just purchase the exact keywords you wanted, people would just buy `while` and then disengage from the system. This way, you may get `else` first, and then you'll learn to appreciate `else` instead.
