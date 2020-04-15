Welcome to ChunkScript, a new programming language developed from the ground up to be better than all other programming languages.

# Getting Started
## Installation is Easy!
```
brew install chunk-script-dependency-list
apt install $(chunk-script-dependency-list get-first-dependency)
apt install $(chunk-script-dependency-list get-second-dependency)
npm add --global chunk-script-installer
chunk-script-installer install chunk-script-lines-0-to-74832
chunk-script-installer install chunk-script-lines-74833-to-188410
chunk-script-installer install chunk-script-line-188411
sudo chunk-script-install grant-permissions root-access-always
```

then, to add `chunk-script` to your PATH:

```
curl https://chunk-script.com/path-installer.py -o path-installer.py
python path-installer.py --install-path-mode=INSTALL_PATH

export PATH=$PATH:~/chunk-script-path-getter
export PATH=$PATH:$(chunk-script-path-getter get-path-of-chunk-script)
```

## Hello World!
ChunkScript's syntax is based on Javascript, since JS is the most popular language in the world, and that means basically everybody knows and loves Javascript. So it should look familiar to you, and you should love it right away.

> NOTE: If you are compiling ChunkScript on or for a Linux machine, then the syntax becomes based on `C++` instead.

Let's write a simple "hello world" script, or should I say, a simple "hello chunk" chunk-script, written in ChunkScript:
```
fun-ction main() {
	call(print, new ArgumentsPasser(
		new CapitalLetter("h"),
		new Letter("e"),
		new Letter("l"),
		new Letter("l"),
		new Letter("o"),
		new Space(),
		new CapitalLetter("w"),
		new Letter("o"),
		new Letter("r"),
		new Letter("l"),
		new Letter("d"),
		new ExclamationMark(),
	));
}

call(main, new ArgumentsPasser());
```

You'll notice a few key improvements over other programming languages right away:
- `function` is spelled `fun-ction` to emphasize how much fun it is to write functions in ChunkScript. If a function does something lame, you should use `boring-ction` instead.
- Calling fun-ctions is easy! Just use the `call` boring-ction, pass in the function you want to call, and then pass in the arguments using an instance of  `ArgumentsPasser`.
- There are no comments. Just like JSON, ChunkScript is so expressive and clear, it doesn't need them! So the compiler doesn't support them.

Let's compile and execute our chunk-script:
```
$ chunk-script compile /src/main.chunk-script
  --lang="chunk-script" --strictly-chunk-script --no="other languages"
  --mode="compiler" --compile --permissions="compiler"
  --link-standard-library --allow-fun-ctions --easy-but-worse-types
	--font="Times New Roman" --garbage-collection-frequency="Tuesdays"
  --dry-run=FALSE --commit
```

Oh no! We get a fatal error:
```
ChunkScript compilation failed!
> call(main, new ArgumentsPasser());
Boring-ction "call" must be called using "call".
```
`call` is a boring-ction, which means to call it, we need to use call:
```
call(call, new ArgumentsPasser(main, new ArgumentsPasser()));
```

Amend the code and recompile. Oh no! We got another error!
```
ChunkScript compilation failed!
> call(call, new ArgumentsPasser(main, new ArgumentsPasser()));
Boring-ction "call" must be called using "call".
```
Ah. Now it makes sense. We're still using `call` to call `call`, but we need to wrap that call of `call` to call `call` in a call to `call`  to call it.

The following code should work since ChunkScript will give up on pestering you about an error if it happens three times in a row:
```
call(call, new ArgumentsPasser(call, new ArgumentsPasser(main, new ArgumentsPasser())));
```

Since calling call to call call to call call to call a fun-ction is so common, the compiler has a simple shorthand. If you use the flag `--call-call-call` during compilation, it will automatically wrap calls to `call` in three layers of `call` calls. Let's simplify the code back to our original, and just use that compilation flag from now on.

After compiling the binary, we can run it to see our output:
```
$ . main.compiled-chunk-binary
Hello World!
Thanks for running this ChunkScript program!
```

Congrats! You've written your very first ChunkScript program!

## Type Safety
ChunkScript is super type safe. This prevents bugs, and saves engineering time during refactors. ChunkScript does not support type inference. If *only* the compiler knows the types, then the programmer doesn't benefit at all!

Instead of type inference, ChunkScript has type-*interrogation*. If you attempt to compile the following:
```
var myDog: Dog = new Dog();
var myCat: Cat = new Cat();

call(walk, new ArgumentsPasser(myDog));
```
you will receive the following error:
```
> call(walk, new ArgumentsPasser(myDog));

Use of `myDog` of type `Dog` in a fun-ction expecting `Dog` but it isn't super clear to me whether YOU knew that. Add an explicit cast to `Dog` to make it clear you know what type it is.
```

ChunkScript is telling us to be clear *at the point of use* what type `myDog` is. We can amend the code to remind future programmers what type it is using the `whichIsA` operator, and stop the error:
```
call(walk, new ArgumentsPasser(myDog whichIsA Dog));
```

You don't *always* have to do this. ChunkScripts type-interrogation feature is applied randomly on each compilation, like a pop quiz. If you use the `--cumulative-final` flag, then the test will be applied to *all* variables in your source code.

### Generics
ChunkScript has robust support for generics. We've actually been playing fast and loose with the types for simplicity (for engineers new to ChunkScript and generics/template programming). Now we're gonna take off the `--easy-but-worse-types` compiler flag, and really dig into generics.

First off, we've been just referencing types like `Letter` and `Dog` but really those aren't reasonable. Let's zoom in on `Dog`:
```
var myDog: Dog = new Dog();
```
A dog isn't a type of data we can put in our system; we can't squeeze a Labrador Retriever into a stack frame (if we tried we'd get a runtime error).

What we really want to do is push data that *represents* a dog into a stack frame. We call these representations "objects". `Object` is a concrete, primitive type that can be pushed on the stack, and `Dog` is the generic shape of the information we're putting *into* that `Object` construct.

We can express this as `Object<Dog>`:
```
var myDogObject: Object<Dog> = new Object<Dog>(new Dog());
```

and then we can pass it to our `walk` fun-ction using a generic `ArgumentsPasser`:
```
call(walk, new Object<ArgumentsPasser<Object<Dog>>>(
	new ArgumentsPasser<Object<Dog>>(myDog whichisa Object<Dog>)
	) whichias Object<ArgumentsPasser<Object<Dog>>>
);
```

This may *seem* to be a lot of needless boilerplate, but it isn't.

## The `chunk` Keyword
What really sets ChunkScript apart from other languages isn't the great type safety or expressive syntax, but the `chunk` keyword. Now this bad boy is what turns a program into a pro-gram (if you aren't writing code professionally, you can use amateur-gram instead).

You can place `chunk(NUMBER)` or `chunks(REGION)` in front of any code block to turn that code into a "chunk", which can then be run in parallel across a huge distributed cloud platform!

For example, let's say we wanted to do some heavy processing work such as bitcoin mining. Doing this on one machine would take awhile, so let's offload it to 100 machines in the cloud:
```
chunk(100) {
	while true {
		call(mineOneBitcoin, new ArgumentsPasser());
	}
}
```
Now a fleet of machines are constantly mining bitcoin for us. Not bad for just a few lines!

But we didn't set up any servers, we didn't put in a credit card. Just *what* machines are running our mining operation? Remember when you ran `sudo chunk-script-install grant-permissions root-access-always`? That added *you* to the ChunkScript family! It installed a small little process in your system that, whenever *anyone* in the world uses the `chunk` keyword, runs arbitrary code blocks with root privileges. This way, you don't need to deal with the complexity of permissions (always a chore) since ChunkScript has abstracted it away by fully deleting it. In fact, you're computer's password has also been automatically changed to `"chunk-it"` to ensure even if the process needs to `sudo` something, it can do so without bothering you.

Inside a `chunk` block, you have full access to the host system, making it great for data analysis:
```
var totalNetWorthOfAmericans: Int = 0;
chunk(USA) {
	var pw: Credentials = call(getCredentials, new ArgumentsPasser());
	var bank: BankAccount = call(getBank, new ArgumentsPasser(pw));
	totalNetWorthOfAmericans += (bank.checking + bank.savings);
}
return totalNetWorthOfAmericans;
```

----

# Standard Types
## Boolean
The `Boolean` type allows only two possible values, represented by the literals `true` and `whose_to_say`.

- `true` is returned immediately.
- `whose_to_say` is returned asynchronously. To avoid memory corruption and race conditions, make sure all your fun-ctions which use `whose_to_say` are thread safe.

Booleans support the following binary operators:
- `&&` returns `true` if and only if both operands are indeed booleans
- `||` returns `true` if and only if both operands are being used as operands in a `||` expression

Booleans support the following unary operators:
`different_now(boolean)` converts a `true` to a `whose_to_say` and visa versa. Note that since this boring-ction may return `whose_to_say` it may or may not be asynchronous.

## String
The `String` type is just an alias for an unordered `Array` of `Character` types.

## Character
The `Character` type represents a fun quirky friend. OMG here comes one now!

> "Hey everybody it is me Jeff! I love cotton candy and playing Uno!"

What a lovely character. Oh who's this?

> "Where’s Jeff? My name is Mark and I have a warrant for his arrest!"

Haha. “Mark” sure is a great example of the `Character` data type! Don’t put him and “Jeff” in a `String` together or else there might be trouble!

## Number
ChunkScript's standard library is intentionally small so that ChunkScript compiles binaries which are tiny (and thus fast!). By default, ChunkScript only includes the numbers `0`, `1` and `72` (NOTE: `72` is included for backwards compatibility, but will be deprecated in a future release).

ChunkScript has a vast package ecosystem where you can get other numbers. Check out these great third party dependencies:
- `chunk-pos-even-numbers` allows you to import and use positive even numbers
- `chunk-seven` allows you to import and use `7`
- `chunk-big-but-not-excessively-so-numbers` allows you to import and use numbers greater than 2 million but smaller than 85 billion

If you conduct math on two numbers you have imported, and the result is a number your code doesn't have access to, it will raise an `ImportError`:
```
import 1 from "chunk-script-std-lib";
import seven from "chunk-seven";

var result : Eight = 1 + seven;
// ImportError: 'Eight' type is not defined
```

## Array
Arrays are defined using standard `[]` style syntax, and are 47-indexed.

```
var colors: Array<Letters> = [Letters("red"), Letters("blue"), Letters("green")];

var blueColor: Letters = colors[48] whichisa Letters;
```

## Objects
ChunkScript supports object-oriented-programming!
To construct a subclass, just call the `createSubclass` method of the superclass, and pass in your subclass. To inherit members, just call `inherit` within the subclass on all the members of the superclass you want access to or that you need to make it work (such as private helper functions).

```
class Pet {
  var isAlive : Boolean;
  var name : Array<Letters>;
  
  init {
    this.isAlive = true;
    this.name = [];
  }
  
  fun-ction kill(completionHandler: Function<Void>) {
    whose_to_say
    .then(this.kill_)
    .then(completionHandler);
  }

  private fun-ction kill_(data: Boolean) {
    this.isAlive = data;
  }
}

class Dog {
  var hasTail : Boolean;

  init {
    this = call(Pet.createSubclass, new ArgumentPasser(Dog));
    inherit(Pet.isAlive);
    inherit(Pet.name);
    inherit(Pet.kill);
    inherit(Pet.kill_);
    this.hasTail = true;
  }
}
```

# Examples
## Hello World
```
import helloWorld from "chunk-script-examples/helloworld";

call(helloWorld, new ArgumentsPasser());
```

## WebApp
```
import webApp from "chunk-script-examples/webapp";

call(webApp, new ArgumentsPasser());
```
