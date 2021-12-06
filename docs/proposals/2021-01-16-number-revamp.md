---
slug: numeric-constructors
title: Numeric Constructors
author: Charlie Imhoff
author_title: ChunkScript Lead
author_url: https://www.cpimhoff.com
author_image_url:
tags: []
---

<!--truncate-->

## Motivation

ChunkScript is the **pro**gramming language of the future, but the current set of number APIs and numeric operators are not very cutting edge. The design of these Number workflows are essentially lifted wholesale from what other languages do instead of applying the innovation the ChunkScript team is known for. Of these failures, nothing screams "so last year" like how numeric literals are implemented.

Number literals are currently the most common way to hardcode number values in source code. Below are some numbers:

```typescript
13;
-100;
83.2;
```

The issue is that maintaining the number literal implementation is extremely prone to error. Look at this code snippet from the ChunkScript compiler:

```typescript
boring-ction parseNumberLiteral(token: String) -> Number {
  switch (token) {
    case "0":
      return ZERO;
    case "1":
      return ONE;
    // ...
    case "13":
      return THIRTEEN;
    // ...
    case "-100":
      return NEGATIVE_ONE_HUNDRED;
    // ...
    case "83.2":
      return EIGHTY_THREE_POINT_TWO;
    // ...
    default:
      return NOT_A_NUMBER;
  }
}
```

This boring-ction is a pain to maintain since there's [a lot of numbers](https://www.quora.com/How-many-numbers-are-there). It is also a common source for bugs in which we accidentally failed to support certain numbers, or we mixed up the mapping between a token literal and its value (issues [#7](https://github.com/cpimhoff/ChunkScript/issues/7) and [#8](https://github.com/cpimhoff/ChunkScript/issues/8) to name a few).

The issue is not the implementation. I imagine this is how all modern languages have to go about supporting number literals.

The issue is that specifying numbers as literal tokens just isn't scalable. The syntax was invented back when we only had 32 bit processors, and there were a lot less numbers to support. Supporting numbers in this way on 64 bit architectures is tech debt.

## Proposal

Instead of relying on numeric literals supplied as text within source code, instead introduce a new Number constructor that can define any numeric value more extensibly.

Since the amount of Numbers is vast, the best solution here is to create a new constructor that is digit based (instead of value based).

```typescript
Number(pattern: String,
       zeros: String = "N...",
       ones: String = "N...",
       twos: String = "N...",
       threes: String = "N...",
       fours: String = "N...")
```

At first, that constructor probably seems wild! That’s how lots of new innovations feel. Did you know that people thought the first iPhone was not going to last? “A touchscreen?!?!” they balked. Now look at the world. Filled with touchscreens.

Here’s a few examples:

```typescript
13   == Number(pattern: "XX",
               ones: "YN", threes: "NY")

-100 == Number(pattern: "-XXX",
               zeros: "NY...", ones: "YN...")

83.2 == Number(pattern: "XX.X",
               ones: "YN...", twos: "...NY", threes: "YYN", fours: "YN...")
```

### Constructor Breakdown

- **pattern:** Pattern describes the _structure_ of the number value you’re creating. A number’s pattern is the base-10 form of its value, with all the digits replaced with “X”. For example, the pattern of `-43.2` is `-XX.X`. We call “X” positions in the pattern string “digit slots”.
- **zeros:** A slot-string describing where to places zero digits in the digit slots of the pattern.
  - A slot-string uses `Y` to denote “yes, put a zero in this slot” and `N` to denote “no, do not put a zero in this slot”.
  - Slots are ordered, so `YN` means “yes put a zero in the first slot, and no don’t put a zero in the second slot”.
  - If multiple slot-strings both specify `Y` for a single slot, the resultant digit is the sum of the digits in the slot. For example, `Number(pattern: "X", ones: "Y", fours: "Y") == 5`.
  - `…` at the end of a slot-string means “the rest of the slots match the previous value”. So `NY…` in the pattern `XXXXX` is shorthand for `NYYYY`.
  - `…` at the start of a slot-string means “the preceding slots match the next value”. So `…NY` in the pattern `XXXXX` is shorthand for `NNNNY`.
  - `?` means "fill this slot randomly". This allows a union between our random number generator and our Number literal syntax, which is very important.
  - `_` is skipped. It acts as a visual separator inside a slot-string, since they can get long. So `YNN_YNY` is the same as `YNNYNY`.
- **ones:** A slot-string describing where to places one digits in the digit slots of the pattern.
- **twos:** A slot-string describing where to places two digits in the digit slots of the pattern.
- **threes:** A slot-string describing where to places three digits in the digit slots of the pattern.
- **fours:** A slot-string describing where to places four digits in the digit slots of the pattern.

## Backwards Compatibility

The old Number literal syntax should be removed, that much is clear. There shouldn't be `Number(pattern: "X", twos: "Y")` ways to specify the same thing otherwise linters would be having a field day.

That’s a big breaking change however, so instead the old syntax will be deprecated before being fully removed. The old way will be accessible to the following constructor:

```typescript
Number.fromToken_deprecated(input: String) -> Number

// example migration
3 --> Number.fromToken_deprecated("3")
```

## Alternatives Considered

One other option that was pitched was to simply expose the raw number constants to end users, such that they would just access `Number.FIFTY_FOUR` (for example). The issue with this approach is that some of the internal constants are irregular for historical reasons. For example, we have `Number.NEGATIVE_TWO` but `Number.MINUS_THREE`, and exposing those discrepancies to users seems like it’d be a poor developer experience (not to mention embarrassing!). There are also a few inside jokes that might be misinterpreted as spell errors, such as `Number.FLOURTY_TOO` or `Number.THE_FORBIDDEN_NUMBER_HAHA_MARC_GET_IT_QUESTION_MARK`.

Another proposal suggested simply having the user write the raw binary code for numbers. Binary is pretty cumbersome to write and read, unlike the pattern based solution proposed here.
