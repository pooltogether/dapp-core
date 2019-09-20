'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var ethers = require('ethers');
var apolloClient = require('apollo-client');
var apolloCacheInmemory = require('apollo-cache-inmemory');
var apolloLinkEthereum = require('apollo-link-ethereum');
var apolloLinkEthereumResolverEthersjs = require('apollo-link-ethereum-resolver-ethersjs');
var _ = require('lodash');
var ___default = _interopDefault(_);
var apolloLinkEthereumMutationsEthersjs = require('apollo-link-ethereum-mutations-ethersjs');
var gql = _interopDefault(require('graphql-tag'));
var dateFns = require('date-fns');
var React = require('react');
var React__default = _interopDefault(React);
var reactApollo = require('react-apollo');

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var runtime_1 = createCommonjsModule(function (module) {
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var runtime = function (exports) {

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined$1; // More compressible than void 0.

  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []); // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.

    generator._invoke = makeInvokeMethod(innerFn, self, context);
    return generator;
  }

  exports.wrap = wrap; // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.

  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed"; // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.

  var ContinueSentinel = {}; // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.

  function Generator() {}

  function GeneratorFunction() {}

  function GeneratorFunctionPrototype() {} // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.


  var IteratorPrototype = {};

  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));

  if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction"; // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.

  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      prototype[method] = function (arg) {
        return this._invoke(method, arg);
      };
    });
  }

  exports.isGeneratorFunction = function (genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor ? ctor === GeneratorFunction || // For the native GeneratorFunction constructor, the best we can
    // do is to check its .name property.
    (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
  };

  exports.mark = function (genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;

      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }

    genFun.prototype = Object.create(Gp);
    return genFun;
  }; // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.


  exports.awrap = function (arg) {
    return {
      __await: arg
    };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);

      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;

        if (value && typeof value === "object" && hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function (value) {
            invoke("next", value, resolve, reject);
          }, function (err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function (unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function (error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function (resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise = // If enqueue has been called before, then we want to wait until
      // all previous Promises have been resolved before calling invoke,
      // so that results are always delivered in the correct order. If
      // enqueue has not been called before, then it is important to
      // call invoke immediately, without waiting on a callback to fire,
      // so that the async generator function has the opportunity to do
      // any necessary setup in a predictable way. This predictability
      // is why the Promise constructor synchronously invokes its
      // executor callback, and why async functions synchronously
      // execute code before the first await. Since we implement simple
      // async functions in terms of async generators, it is especially
      // important to get this right, even though it requires care.
      previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, // Avoid propagating failures to Promises returned by later
      // invocations of the iterator.
      callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
    } // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).


    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);

  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };

  exports.AsyncIterator = AsyncIterator; // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.

  exports.async = function (innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList));
    return exports.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
    : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;
    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        } // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume


        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;

        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);

          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;
        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);
        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;
        var record = tryCatch(innerFn, self, context);

        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done ? GenStateCompleted : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };
        } else if (record.type === "throw") {
          state = GenStateCompleted; // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.

          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  } // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.


  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];

    if (method === undefined$1) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined$1;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError("The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (!info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value; // Resume execution at the desired location (see delegateYield).

      context.next = delegate.nextLoc; // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.

      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined$1;
      }
    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    } // The delegate iterator is finished, so forget it and continue with
    // the outer generator.


    context.delegate = null;
    return ContinueSentinel;
  } // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.


  defineIteratorMethods(Gp);
  Gp[toStringTagSymbol] = "Generator"; // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.

  Gp[iteratorSymbol] = function () {
    return this;
  };

  Gp.toString = function () {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{
      tryLoc: "root"
    }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function (object) {
    var keys = [];

    for (var key in object) {
      keys.push(key);
    }

    keys.reverse(); // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.

    return function next() {
      while (keys.length) {
        var key = keys.pop();

        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      } // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.


      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];

      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1,
            next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined$1;
          next.done = true;
          return next;
        };

        return next.next = next;
      }
    } // Return an iterator with no values.


    return {
      next: doneResult
    };
  }

  exports.values = values;

  function doneResult() {
    return {
      value: undefined$1,
      done: true
    };
  }

  Context.prototype = {
    constructor: Context,
    reset: function (skipTempReset) {
      this.prev = 0;
      this.next = 0; // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.

      this.sent = this._sent = undefined$1;
      this.done = false;
      this.delegate = null;
      this.method = "next";
      this.arg = undefined$1;
      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
            this[name] = undefined$1;
          }
        }
      }
    },
    stop: function () {
      this.done = true;
      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;

      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },
    dispatchException: function (exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;

      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined$1;
        }

        return !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }
          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }
          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },
    abrupt: function (type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },
    complete: function (record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" || record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },
    finish: function (finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },
    "catch": function (tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;

          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }

          return thrown;
        }
      } // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.


      throw new Error("illegal catch attempt");
    },
    delegateYield: function (iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined$1;
      }

      return ContinueSentinel;
    }
  }; // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.

  return exports;
}( // If this script is executing as a CommonJS module, use module.exports
// as the regeneratorRuntime namespace. Otherwise create a new empty
// object. Either way, the resulting object will be used to initialize
// the regeneratorRuntime variable at the top of this file.
 module.exports );

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}
});

var regenerator = runtime_1;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function getNetworkName() {
  return _getNetworkName.apply(this, arguments);
}

function _getNetworkName() {
  _getNetworkName = _asyncToGenerator(
  /*#__PURE__*/
  regenerator.mark(function _callee() {
    var defaultNetworkName,
        tempProvider,
        network,
        networkName,
        _args = arguments;
    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            defaultNetworkName = _args.length > 0 && _args[0] !== undefined ? _args[0] : 'homestead';

            if (!(typeof window !== 'undefined' && window.ethereum)) {
              _context.next = 9;
              break;
            }

            tempProvider = new ethers.ethers.providers.Web3Provider(window.ethereum);
            _context.next = 5;
            return tempProvider.getNetwork();

          case 5:
            network = _context.sent;
            networkName = network.name;
            _context.next = 22;
            break;

          case 9:
            if (!(typeof window !== 'undefined' && window.web3)) {
              _context.next = 21;
              break;
            }

            if (!window.web3.currentProvider.isToshi) {
              _context.next = 14;
              break;
            }

            network = ethers.ethers.utils.getNetwork(parseInt(window.web3.version.network, 10));
            _context.next = 18;
            break;

          case 14:
            tempProvider = new ethers.ethers.providers.Web3Provider(window.web3.currentProvider);
            _context.next = 17;
            return tempProvider.getNetwork();

          case 17:
            network = _context.sent;

          case 18:
            networkName = network.name;
            _context.next = 22;
            break;

          case 21:
            networkName = defaultNetworkName;

          case 22:
            return _context.abrupt("return", networkName);

          case 23:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getNetworkName.apply(this, arguments);
}

/**
  Retrieves a new provider specific for sending transactions.
  The reason we separate the read and the writes is that the
  web3 providers on mobile dapps are extremely buggy; it's
  better to read the network through an INFURA JsonRpc endpoint.

  This function will first check to see if there is an injected web3
  which is using the new window.ethereum API. It will fall back to
  the older style with window.web3. If web3 is being injected,
  then an Ethers Web3Provider is instantiated and returned.
*/

function getWriteProvider() {
  return _getWriteProvider.apply(this, arguments);
}

function _getWriteProvider() {
  _getWriteProvider = _asyncToGenerator(
  /*#__PURE__*/
  regenerator.mark(function _callee() {
    var networkName;
    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(typeof window !== 'undefined' && window.ethereum)) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return", new ethers.ethers.providers.Web3Provider(window.ethereum));

          case 4:
            if (!(typeof window !== 'undefined' && window.web3)) {
              _context.next = 11;
              break;
            }

            _context.next = 7;
            return getNetworkName();

          case 7:
            networkName = _context.sent;
            return _context.abrupt("return", new ethers.ethers.providers.Web3Provider(window.web3.currentProvider, networkName));

          case 11:
            throw new Error('You must have a web3-enabled browser to send Ethereum transactions');

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getWriteProvider.apply(this, arguments);
}

var debug = require('debug')('dapp-core:getSystemInfo');

function isWindowDefined() {
  return typeof window !== 'undefined';
}

function isNavigatorDefined() {
  return typeof navigator !== 'undefined';
}
/**
 * Determine the browser.
 * This function returns one of Brave, Chrome, Firefox, Safari, Opera
 * https://stackoverflow.com/questions/21741841/detecting-ios-android-operating-system
 *
 * @returns {String}
 */


var getBrowser = function getBrowser(userAgent) {
  var browser = 'unknown';

  if (/chrome/i.test(userAgent)) {
    browser = 'Chrome';
  } else if (/safari/i.test(userAgent)) {
    browser = 'Safari';
  } else if (/firefox/i.test(userAgent)) {
    browser = 'Firefox';
  }

  return browser;
};
/**
 * Determine the mobile operating system.
 * This function returns one of 'iOS', 'Android', or 'unknown'.
 * https://stackoverflow.com/questions/21741841/detecting-ios-android-operating-system
 *
 * @returns {String}
 */


var getMobileOperatingSystem = function getMobileOperatingSystem(userAgent) {
  var os = 'unknown';

  if (/android/i.test(userAgent)) {
    os = 'Android';
  } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    os = 'iOS';
  }

  return os;
};
/**
 * Determine if Web3 is available.
 *
 * @returns {Bool}
 */


var getWeb3Installed = function getWeb3Installed() {
  var isInstalled = false;

  if (isWindowDefined() && (window.web3 || window.ethereum)) {
    isInstalled = true;
  }

  return isInstalled;
};
/**
 * Lets you know if they've given you permission to their web3 wallet.
 *
 * @returns {Bool}
 */


var getWeb3Permission =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regenerator.mark(function _callee() {
    var hasPermission, isUnlocked, isApproved;
    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            hasPermission = false;

            if (!(isWindowDefined() && window.ethereum)) {
              _context.next = 11;
              break;
            }

            if (!window.ethereum._metamask) {
              _context.next = 9;
              break;
            }

            _context.next = 5;
            return window.ethereum._metamask.isUnlocked();

          case 5:
            isUnlocked = _context.sent;
            _context.next = 8;
            return window.ethereum._metamask.isApproved();

          case 8:
            isApproved = _context.sent;

          case 9:
            debug(window.ethereum); // // hack due to a MetaMask bug that shows up when you Quit Chrome and re-open Chrome
            // // right back to the tab using MetaMask
            // if ((isUnlocked && isApproved) && !defined(this.props.address)) {
            //   window.location.reload(true)
            // }
            // hasPermission = isUnlocked && isEnabled && isApproved

            hasPermission = isUnlocked && isApproved;

          case 11:
            return _context.abrupt("return", hasPermission);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getWeb3Permission() {
    return _ref.apply(this, arguments);
  };
}();

function getSystemInfo() {
  return _getSystemInfo.apply(this, arguments);
}

function _getSystemInfo() {
  _getSystemInfo = _asyncToGenerator(
  /*#__PURE__*/
  regenerator.mark(function _callee2() {
    var osInfo, userAgent, hasWeb3Permission;
    return regenerator.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            osInfo = {};

            if (!(isNavigatorDefined() || isWindowDefined())) {
              _context2.next = 8;
              break;
            }

            userAgent = navigator.userAgent || navigator.vendor || window.opera;
            _context2.next = 5;
            return getWeb3Permission();

          case 5:
            _context2.t0 = _context2.sent;
            hasWeb3Permission = _context2.t0 === true;
            osInfo = {
              mobileOS: getMobileOperatingSystem(userAgent),
              // Android or iOS
              browser: getBrowser(userAgent),
              hasWeb3Available: getWeb3Installed(),
              hasWeb3Permission: hasWeb3Permission
            };

          case 8:
            return _context2.abrupt("return", osInfo);

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _getSystemInfo.apply(this, arguments);
}

/**
  Checks to see if the user is using CoinBase Wallet
*/
function isToshi() {
  return typeof window !== 'undefined' && window.web3 && window.web3.currentProvider.isToshi;
}

var debug$1 = require('debug')('pt:web3Resolvers');
/**
 * Resolvers execute the behaviour when an Apollo query with the same name is run.
 */


var account =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regenerator.mark(function _callee(opts, args, context, info) {
    var writeProvider, provider, accounts, systemInfo, signer, address;
    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            writeProvider = context.writeProvider;

            if (writeProvider) {
              _context.next = 14;
              break;
            }

            _context.prev = 2;
            _context.next = 5;
            return getWriteProvider();

          case 5:
            provider = _context.sent;
            debug$1('got write provider: ', !!provider);
            _context.next = 12;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](2);
            console.error(_context.t0);

          case 12:
            _context.next = 17;
            break;

          case 14:
            _context.next = 16;
            return writeProvider();

          case 16:
            provider = _context.sent;

          case 17:
            if (!isToshi()) {
              _context.next = 24;
              break;
            }

            debug$1('is toshi');
            accounts = window.web3.eth.accounts;

            if (!accounts.length) {
              _context.next = 22;
              break;
            }

            return _context.abrupt("return", accounts[0]);

          case 22:
            _context.next = 47;
            break;

          case 24:
            _context.next = 26;
            return getSystemInfo();

          case 26:
            systemInfo = _context.sent;

            if (systemInfo.hasWeb3Available) {
              _context.next = 29;
              break;
            }

            return _context.abrupt("return", null);

          case 29:
            if (provider) {
              _context.next = 32;
              break;
            }

            debug$1('no writeProvider!');
            return _context.abrupt("return", null);

          case 32:
            _context.prev = 32;
            signer = provider.getSigner();
            debug$1('signer: ', signer);
            _context.next = 37;
            return signer.getAddress();

          case 37:
            address = _context.sent;
            debug$1('got address: ', address);
            return _context.abrupt("return", address);

          case 42:
            _context.prev = 42;
            _context.t1 = _context["catch"](32);
            debug$1('ERROR: ', _context.t1);

            if (_context.t1.message.indexOf('unknown account') === -1) {
              console.error("Error in web3Resolvers#account: ".concat(_context.t1));
            }

            return _context.abrupt("return", null);

          case 47:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 9], [32, 42]]);
  }));

  return function account(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

var provider;
/**
  Retrieves a new provider specific to read.  The reason we separate the read and the writes is that the
  web3 providers on mobile dapps are extremely buggy; it's better to read the network through an INFURA
  JsonRpc endpoint.

  This function will first check to see if there is an injected web3.  If web3 is being injected, then a
  Ethers Web3Provider is instantiated to check the network.  Once the network is determined the Ethers
  getDefaultProvider function is used to create a provider pointing to the same network using an Infura node.
*/

function getReadProvider() {
  return _getReadProvider.apply(this, arguments);
}

function _getReadProvider() {
  _getReadProvider = _asyncToGenerator(
  /*#__PURE__*/
  regenerator.mark(function _callee() {
    var _ref,
        defaultNetworkName,
        systemInfo,
        networkName,
        _args = arguments;

    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _ref = _args.length > 0 && _args[0] !== undefined ? _args[0] : {}, defaultNetworkName = _ref.defaultNetworkName;

            if (!provider) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", provider);

          case 3:
            _context.next = 5;
            return getSystemInfo();

          case 5:
            systemInfo = _context.sent;

            if (!systemInfo.hasWeb3Available) {
              _context.next = 12;
              break;
            }

            _context.next = 9;
            return getWriteProvider();

          case 9:
            provider = _context.sent;
            _context.next = 14;
            break;

          case 12:
            networkName = defaultNetworkName || 'homestead';

            if (networkName === 'localhost') {
              provider = new ethers.ethers.providers.JsonRpcProvider('http://localhost:8545');
            } else {
              provider = ethers.ethers.getDefaultProvider(networkName);
            }

          case 14:
            return _context.abrupt("return", provider);

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getReadProvider.apply(this, arguments);
}

var debug$2 = require('debug')('pt:web3Resolvers:block');
/**
 * Resolvers execute the behaviour when an Apollo query with the same name is run.
 */


var block =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regenerator.mark(function _callee(opts, args, context, info) {
    var readProvider, provider, blockNumber, block, result;
    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            readProvider = context.readProvider;

            if (readProvider) {
              _context.next = 7;
              break;
            }

            _context.next = 4;
            return getReadProvider();

          case 4:
            provider = _context.sent;
            _context.next = 10;
            break;

          case 7:
            _context.next = 9;
            return readProvider();

          case 9:
            provider = _context.sent;

          case 10:
            blockNumber = args.blockNumber;
            debug$2('blockNumber: ', blockNumber);
            _context.next = 14;
            return provider.getBlock(blockNumber);

          case 14:
            block = _context.sent;
            result = _objectSpread({
              __typename: 'EthersBlock',
              id: blockNumber
            }, block);
            debug$2("block(".concat(blockNumber, "): "), result);
            return _context.abrupt("return", result);

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function block(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

var debug$3 = require('debug')('dapp-core:hasEthereumPermissions');

function hasEthereumPermissions() {
  return _hasEthereumPermissions.apply(this, arguments);
}

function _hasEthereumPermissions() {
  _hasEthereumPermissions = _asyncToGenerator(
  /*#__PURE__*/
  regenerator.mark(function _callee() {
    var systemInfo;
    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return getSystemInfo();

          case 2:
            systemInfo = _context.sent;
            debug$3({
              systemInfo: systemInfo
            });
            return _context.abrupt("return", systemInfo && systemInfo.hasWeb3Permission || systemInfo && systemInfo.hasWeb3Available && systemInfo.hasWeb3Permission === undefined);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _hasEthereumPermissions.apply(this, arguments);
}

/**
 * Resolvers execute the behaviour when an Apollo query with the same name is run.
 */

var ethereumPermission =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regenerator.mark(function _callee() {
    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return hasEthereumPermissions();

          case 2:
            return _context.abrupt("return", _context.sent);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function ethereumPermission() {
    return _ref.apply(this, arguments);
  };
}();

var debug$4 = require('debug')('dapp-core:networkId');
/**
 * Resolvers execute the behaviour when an Apollo query with the same name is run.
 */


var networkId =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regenerator.mark(function _callee(opts, args, context, info) {
    var readProvider, provider, network;
    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            debug$4('Starting...');
            readProvider = context.readProvider;

            if (readProvider) {
              _context.next = 8;
              break;
            }

            _context.next = 5;
            return getReadProvider();

          case 5:
            provider = _context.sent;
            _context.next = 11;
            break;

          case 8:
            _context.next = 10;
            return readProvider();

          case 10:
            provider = _context.sent;

          case 11:
            _context.next = 13;
            return provider.getNetwork();

          case 13:
            network = _context.sent;
            debug$4(network.chainId);
            return _context.abrupt("return", network.chainId);

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function networkId(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * Resolvers execute the behaviour when an Apollo query with the same name is run.
 */

var systemInfo =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regenerator.mark(function _callee() {
    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return getSystemInfo();

          case 2:
            return _context.abrupt("return", _context.sent);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function systemInfo() {
    return _ref.apply(this, arguments);
  };
}();



var index = /*#__PURE__*/Object.freeze({
	account: account,
	block: block,
	ethereumPermission: ethereumPermission,
	networkId: networkId,
	systemInfo: systemInfo
});

/**
 * Resolvers execute the behaviour when an Apollo query with the same name is run.
 */

var Query = {
  account: account,
  block: block,
  ethereumPermission: ethereumPermission,
  networkId: networkId,
  systemInfo: systemInfo
};

var debug$5 = require('debug')('dapp-core:boundQuery');

function wrap(fxn, extraContext) {
  return function (opts, args, context, info) {
    debug$5(extraContext);
    return fxn(opts, args, Object.assign({}, context, extraContext), info);
  };
}

function boundQuery(_ref) {
  var readProvider = _ref.readProvider,
      writeProvider = _ref.writeProvider;
  var extraContext = {
    readProvider: readProvider,
    writeProvider: writeProvider
  };
  return {
    account: wrap(account, extraContext),
    block: wrap(block, extraContext),
    ethereumPermission: ethereumPermission,
    networkId: wrap(networkId, extraContext),
    systemInfo: systemInfo
  };
}



var index$1 = /*#__PURE__*/Object.freeze({
	queries: index,
	Query: Query,
	boundQuery: boundQuery
});

function addTruffleArtifact(abiMapping, name, abi, truffleJsonArtifact) {
  abiMapping.addAbi(name, abi);
  Object.keys(truffleJsonArtifact.networks).forEach(function (networkId) {
    abiMapping.addAddress(name, parseInt(networkId), truffleJsonArtifact.networks[networkId].address);
  });
}

var Observable_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
} // === Symbol Support ===


var hasSymbols = function () {
  return typeof Symbol === 'function';
};

var hasSymbol = function (name) {
  return hasSymbols() && Boolean(Symbol[name]);
};

var getSymbol = function (name) {
  return hasSymbol(name) ? Symbol[name] : '@@' + name;
};

if (hasSymbols() && !hasSymbol('observable')) {
  Symbol.observable = Symbol('observable');
}

var SymbolIterator = getSymbol('iterator');
var SymbolObservable = getSymbol('observable');
var SymbolSpecies = getSymbol('species'); // === Abstract Operations ===

function getMethod(obj, key) {
  var value = obj[key];
  if (value == null) return undefined;
  if (typeof value !== 'function') throw new TypeError(value + ' is not a function');
  return value;
}

function getSpecies(obj) {
  var ctor = obj.constructor;

  if (ctor !== undefined) {
    ctor = ctor[SymbolSpecies];

    if (ctor === null) {
      ctor = undefined;
    }
  }

  return ctor !== undefined ? ctor : Observable;
}

function isObservable(x) {
  return x instanceof Observable; // SPEC: Brand check
}

function hostReportError(e) {
  if (hostReportError.log) {
    hostReportError.log(e);
  } else {
    setTimeout(function () {
      throw e;
    });
  }
}

function enqueue(fn) {
  Promise.resolve().then(function () {
    try {
      fn();
    } catch (e) {
      hostReportError(e);
    }
  });
}

function cleanupSubscription(subscription) {
  var cleanup = subscription._cleanup;
  if (cleanup === undefined) return;
  subscription._cleanup = undefined;

  if (!cleanup) {
    return;
  }

  try {
    if (typeof cleanup === 'function') {
      cleanup();
    } else {
      var unsubscribe = getMethod(cleanup, 'unsubscribe');

      if (unsubscribe) {
        unsubscribe.call(cleanup);
      }
    }
  } catch (e) {
    hostReportError(e);
  }
}

function closeSubscription(subscription) {
  subscription._observer = undefined;
  subscription._queue = undefined;
  subscription._state = 'closed';
}

function flushSubscription(subscription) {
  var queue = subscription._queue;

  if (!queue) {
    return;
  }

  subscription._queue = undefined;
  subscription._state = 'ready';

  for (var i = 0; i < queue.length; ++i) {
    notifySubscription(subscription, queue[i].type, queue[i].value);
    if (subscription._state === 'closed') break;
  }
}

function notifySubscription(subscription, type, value) {
  subscription._state = 'running';
  var observer = subscription._observer;

  try {
    var m = getMethod(observer, type);

    switch (type) {
      case 'next':
        if (m) m.call(observer, value);
        break;

      case 'error':
        closeSubscription(subscription);
        if (m) m.call(observer, value);else throw value;
        break;

      case 'complete':
        closeSubscription(subscription);
        if (m) m.call(observer);
        break;
    }
  } catch (e) {
    hostReportError(e);
  }

  if (subscription._state === 'closed') cleanupSubscription(subscription);else if (subscription._state === 'running') subscription._state = 'ready';
}

function onNotify(subscription, type, value) {
  if (subscription._state === 'closed') return;

  if (subscription._state === 'buffering') {
    subscription._queue.push({
      type: type,
      value: value
    });

    return;
  }

  if (subscription._state !== 'ready') {
    subscription._state = 'buffering';
    subscription._queue = [{
      type: type,
      value: value
    }];
    enqueue(function () {
      return flushSubscription(subscription);
    });
    return;
  }

  notifySubscription(subscription, type, value);
}

var Subscription = function () {
  function Subscription(observer, subscriber) {
    _classCallCheck(this, Subscription); // ASSERT: observer is an object
    // ASSERT: subscriber is callable


    this._cleanup = undefined;
    this._observer = observer;
    this._queue = undefined;
    this._state = 'initializing';
    var subscriptionObserver = new SubscriptionObserver(this);

    try {
      this._cleanup = subscriber.call(undefined, subscriptionObserver);
    } catch (e) {
      subscriptionObserver.error(e);
    }

    if (this._state === 'initializing') this._state = 'ready';
  }

  _createClass(Subscription, [{
    key: 'unsubscribe',
    value: function unsubscribe() {
      if (this._state !== 'closed') {
        closeSubscription(this);
        cleanupSubscription(this);
      }
    }
  }, {
    key: 'closed',
    get: function () {
      return this._state === 'closed';
    }
  }]);

  return Subscription;
}();

var SubscriptionObserver = function () {
  function SubscriptionObserver(subscription) {
    _classCallCheck(this, SubscriptionObserver);

    this._subscription = subscription;
  }

  _createClass(SubscriptionObserver, [{
    key: 'next',
    value: function next(value) {
      onNotify(this._subscription, 'next', value);
    }
  }, {
    key: 'error',
    value: function error(value) {
      onNotify(this._subscription, 'error', value);
    }
  }, {
    key: 'complete',
    value: function complete() {
      onNotify(this._subscription, 'complete');
    }
  }, {
    key: 'closed',
    get: function () {
      return this._subscription._state === 'closed';
    }
  }]);

  return SubscriptionObserver;
}();

var Observable = exports.Observable = function () {
  function Observable(subscriber) {
    _classCallCheck(this, Observable);

    if (!(this instanceof Observable)) throw new TypeError('Observable cannot be called as a function');
    if (typeof subscriber !== 'function') throw new TypeError('Observable initializer must be a function');
    this._subscriber = subscriber;
  }

  _createClass(Observable, [{
    key: 'subscribe',
    value: function subscribe(observer) {
      if (typeof observer !== 'object' || observer === null) {
        observer = {
          next: observer,
          error: arguments[1],
          complete: arguments[2]
        };
      }

      return new Subscription(observer, this._subscriber);
    }
  }, {
    key: 'forEach',
    value: function forEach(fn) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        if (typeof fn !== 'function') {
          reject(new TypeError(fn + ' is not a function'));
          return;
        }

        function done() {
          subscription.unsubscribe();
          resolve();
        }

        var subscription = _this.subscribe({
          next: function (value) {
            try {
              fn(value, done);
            } catch (e) {
              reject(e);
              subscription.unsubscribe();
            }
          },
          error: reject,
          complete: resolve
        });
      });
    }
  }, {
    key: 'map',
    value: function map(fn) {
      var _this2 = this;

      if (typeof fn !== 'function') throw new TypeError(fn + ' is not a function');
      var C = getSpecies(this);
      return new C(function (observer) {
        return _this2.subscribe({
          next: function (value) {
            try {
              value = fn(value);
            } catch (e) {
              return observer.error(e);
            }

            observer.next(value);
          },
          error: function (e) {
            observer.error(e);
          },
          complete: function () {
            observer.complete();
          }
        });
      });
    }
  }, {
    key: 'filter',
    value: function filter(fn) {
      var _this3 = this;

      if (typeof fn !== 'function') throw new TypeError(fn + ' is not a function');
      var C = getSpecies(this);
      return new C(function (observer) {
        return _this3.subscribe({
          next: function (value) {
            try {
              if (!fn(value)) return;
            } catch (e) {
              return observer.error(e);
            }

            observer.next(value);
          },
          error: function (e) {
            observer.error(e);
          },
          complete: function () {
            observer.complete();
          }
        });
      });
    }
  }, {
    key: 'reduce',
    value: function reduce(fn) {
      var _this4 = this;

      if (typeof fn !== 'function') throw new TypeError(fn + ' is not a function');
      var C = getSpecies(this);
      var hasSeed = arguments.length > 1;
      var hasValue = false;
      var seed = arguments[1];
      var acc = seed;
      return new C(function (observer) {
        return _this4.subscribe({
          next: function (value) {
            var first = !hasValue;
            hasValue = true;

            if (!first || hasSeed) {
              try {
                acc = fn(acc, value);
              } catch (e) {
                return observer.error(e);
              }
            } else {
              acc = value;
            }
          },
          error: function (e) {
            observer.error(e);
          },
          complete: function () {
            if (!hasValue && !hasSeed) return observer.error(new TypeError('Cannot reduce an empty sequence'));
            observer.next(acc);
            observer.complete();
          }
        });
      });
    }
  }, {
    key: 'concat',
    value: function concat() {
      var _this5 = this;

      for (var _len = arguments.length, sources = Array(_len), _key = 0; _key < _len; _key++) {
        sources[_key] = arguments[_key];
      }

      var C = getSpecies(this);
      return new C(function (observer) {
        var subscription = void 0;
        var index = 0;

        function startNext(next) {
          subscription = next.subscribe({
            next: function (v) {
              observer.next(v);
            },
            error: function (e) {
              observer.error(e);
            },
            complete: function () {
              if (index === sources.length) {
                subscription = undefined;
                observer.complete();
              } else {
                startNext(C.from(sources[index++]));
              }
            }
          });
        }

        startNext(_this5);
        return function () {
          if (subscription) {
            subscription.unsubscribe();
            subscription = undefined;
          }
        };
      });
    }
  }, {
    key: 'flatMap',
    value: function flatMap(fn) {
      var _this6 = this;

      if (typeof fn !== 'function') throw new TypeError(fn + ' is not a function');
      var C = getSpecies(this);
      return new C(function (observer) {
        var subscriptions = [];

        var outer = _this6.subscribe({
          next: function (value) {
            if (fn) {
              try {
                value = fn(value);
              } catch (e) {
                return observer.error(e);
              }
            }

            var inner = C.from(value).subscribe({
              next: function (value) {
                observer.next(value);
              },
              error: function (e) {
                observer.error(e);
              },
              complete: function () {
                var i = subscriptions.indexOf(inner);
                if (i >= 0) subscriptions.splice(i, 1);
                completeIfDone();
              }
            });
            subscriptions.push(inner);
          },
          error: function (e) {
            observer.error(e);
          },
          complete: function () {
            completeIfDone();
          }
        });

        function completeIfDone() {
          if (outer.closed && subscriptions.length === 0) observer.complete();
        }

        return function () {
          subscriptions.forEach(function (s) {
            return s.unsubscribe();
          });
          outer.unsubscribe();
        };
      });
    }
  }, {
    key: SymbolObservable,
    value: function () {
      return this;
    }
  }], [{
    key: 'from',
    value: function from(x) {
      var C = typeof this === 'function' ? this : Observable;
      if (x == null) throw new TypeError(x + ' is not an object');
      var method = getMethod(x, SymbolObservable);

      if (method) {
        var observable = method.call(x);
        if (Object(observable) !== observable) throw new TypeError(observable + ' is not an object');
        if (isObservable(observable) && observable.constructor === C) return observable;
        return new C(function (observer) {
          return observable.subscribe(observer);
        });
      }

      if (hasSymbol('iterator')) {
        method = getMethod(x, SymbolIterator);

        if (method) {
          return new C(function (observer) {
            enqueue(function () {
              if (observer.closed) return;
              var _iteratorNormalCompletion = true;
              var _didIteratorError = false;
              var _iteratorError = undefined;

              try {
                for (var _iterator = method.call(x)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                  var item = _step.value;
                  observer.next(item);
                  if (observer.closed) return;
                }
              } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                  }
                } finally {
                  if (_didIteratorError) {
                    throw _iteratorError;
                  }
                }
              }

              observer.complete();
            });
          });
        }
      }

      if (Array.isArray(x)) {
        return new C(function (observer) {
          enqueue(function () {
            if (observer.closed) return;

            for (var i = 0; i < x.length; ++i) {
              observer.next(x[i]);
              if (observer.closed) return;
            }

            observer.complete();
          });
        });
      }

      throw new TypeError(x + ' is not observable');
    }
  }, {
    key: 'of',
    value: function of() {
      for (var _len2 = arguments.length, items = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        items[_key2] = arguments[_key2];
      }

      var C = typeof this === 'function' ? this : Observable;
      return new C(function (observer) {
        enqueue(function () {
          if (observer.closed) return;

          for (var i = 0; i < items.length; ++i) {
            observer.next(items[i]);
            if (observer.closed) return;
          }

          observer.complete();
        });
      });
    }
  }, {
    key: SymbolSpecies,
    get: function () {
      return this;
    }
  }]);

  return Observable;
}();

if (hasSymbols()) {
  Object.defineProperty(Observable, Symbol('extensions'), {
    value: {
      symbol: SymbolObservable,
      hostReportError: hostReportError
    },
    configurable: true
  });
}
});

unwrapExports(Observable_1);
var Observable_2 = Observable_1.Observable;

var zenObservable = Observable_1.Observable;

var Observable = zenObservable;

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

/* global Reflect, Promise */
var extendStatics = function (d, b) {
  extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (d, b) {
    d.__proto__ = b;
  } || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
  };

  return extendStatics(d, b);
};

function __extends(d, b) {
  extendStatics(d, b);

  function __() {
    this.constructor = d;
  }

  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var __assign = function () {
  __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var genericMessage = "Invariant Violation";
var _a = Object.setPrototypeOf,
    setPrototypeOf = _a === void 0 ? function (obj, proto) {
  obj.__proto__ = proto;
  return obj;
} : _a;

var InvariantError =
/** @class */
function (_super) {
  __extends(InvariantError, _super);

  function InvariantError(message) {
    if (message === void 0) {
      message = genericMessage;
    }

    var _this = _super.call(this, typeof message === "number" ? genericMessage + ": " + message + " (see https://github.com/apollographql/invariant-packages)" : message) || this;

    _this.framesToPop = 1;
    _this.name = genericMessage;
    setPrototypeOf(_this, InvariantError.prototype);
    return _this;
  }

  return InvariantError;
}(Error);

function invariant(condition, message) {
  if (!condition) {
    throw new InvariantError(message);
  }
}

function wrapConsoleMethod(method) {
  return function () {
    return console[method].apply(console, arguments);
  };
}

(function (invariant) {
  invariant.warn = wrapConsoleMethod("warn");
  invariant.error = wrapConsoleMethod("error");
})(invariant || (invariant = {})); // Code that uses ts-invariant with rollup-plugin-invariant may want to
// import this process stub to avoid errors evaluating process.env.NODE_ENV.
// However, because most ESM-to-CJS compilers will rewrite the process import
// as tsInvariant.process, which prevents proper replacement by minifiers, we
// also attempt to define the stub globally when it is not already defined.


var processStub = {
  env: {}
};

if (typeof process === "object") {
  processStub = process;
} else try {
  // Using Function to evaluate this assignment in global scope also escapes
  // the strict mode of the current module, thereby allowing the assignment.
  // Inspired by https://github.com/facebook/regenerator/pull/369.
  Function("stub", "process = stub")(processStub);
} catch (atLeastWeTried) {// The assignment can fail if a Content Security Policy heavy-handedly
  // forbids Function usage. In those environments, developers should take
  // extra care to replace process.env.NODE_ENV in their production builds,
  // or define an appropriate global.process polyfill.
}

function getOperationName(doc) {
  return doc.definitions.filter(function (definition) {
    return definition.kind === 'OperationDefinition' && definition.name;
  }).map(function (x) {
    return x.name.value;
  })[0] || null;
}

var canUseWeakMap = typeof WeakMap === 'function' && !(typeof navigator === 'object' && navigator.product === 'ReactNative');

function validateOperation(operation) {
  var OPERATION_FIELDS = ['query', 'operationName', 'variables', 'extensions', 'context'];

  for (var _i = 0, _a = Object.keys(operation); _i < _a.length; _i++) {
    var key = _a[_i];

    if (OPERATION_FIELDS.indexOf(key) < 0) {
      throw process.env.NODE_ENV === "production" ? new InvariantError(2) : new InvariantError("illegal argument: " + key);
    }
  }

  return operation;
}

var LinkError = function (_super) {
  __extends(LinkError, _super);

  function LinkError(message, link) {
    var _this = _super.call(this, message) || this;

    _this.link = link;
    return _this;
  }

  return LinkError;
}(Error);

function isTerminating(link) {
  return link.request.length <= 1;
}

function transformOperation(operation) {
  var transformedOperation = {
    variables: operation.variables || {},
    extensions: operation.extensions || {},
    operationName: operation.operationName,
    query: operation.query
  };

  if (!transformedOperation.operationName) {
    transformedOperation.operationName = typeof transformedOperation.query !== 'string' ? getOperationName(transformedOperation.query) : '';
  }

  return transformedOperation;
}

function createOperation(starting, operation) {
  var context = __assign({}, starting);

  var setContext = function (next) {
    if (typeof next === 'function') {
      context = __assign({}, context, next(context));
    } else {
      context = __assign({}, context, next);
    }
  };

  var getContext = function () {
    return __assign({}, context);
  };

  Object.defineProperty(operation, 'setContext', {
    enumerable: false,
    value: setContext
  });
  Object.defineProperty(operation, 'getContext', {
    enumerable: false,
    value: getContext
  });
  Object.defineProperty(operation, 'toKey', {
    enumerable: false,
    value: function () {
      return getKey(operation);
    }
  });
  return operation;
}

function getKey(operation) {
  var query = operation.query,
      variables = operation.variables,
      operationName = operation.operationName;
  return JSON.stringify([operationName, query, variables]);
}

function passthrough(op, forward) {
  return forward ? forward(op) : Observable.of();
}

function toLink(handler) {
  return typeof handler === 'function' ? new ApolloLink(handler) : handler;
}

function empty() {
  return new ApolloLink(function () {
    return Observable.of();
  });
}

function from(links) {
  if (links.length === 0) return empty();
  return links.map(toLink).reduce(function (x, y) {
    return x.concat(y);
  });
}

function split(test, left, right) {
  var leftLink = toLink(left);
  var rightLink = toLink(right || new ApolloLink(passthrough));

  if (isTerminating(leftLink) && isTerminating(rightLink)) {
    return new ApolloLink(function (operation) {
      return test(operation) ? leftLink.request(operation) || Observable.of() : rightLink.request(operation) || Observable.of();
    });
  } else {
    return new ApolloLink(function (operation, forward) {
      return test(operation) ? leftLink.request(operation, forward) || Observable.of() : rightLink.request(operation, forward) || Observable.of();
    });
  }
}

var concat = function (first, second) {
  var firstLink = toLink(first);

  if (isTerminating(firstLink)) {
    process.env.NODE_ENV === "production" || invariant.warn(new LinkError("You are calling concat on a terminating link, which will have no effect", firstLink));
    return firstLink;
  }

  var nextLink = toLink(second);

  if (isTerminating(nextLink)) {
    return new ApolloLink(function (operation) {
      return firstLink.request(operation, function (op) {
        return nextLink.request(op) || Observable.of();
      }) || Observable.of();
    });
  } else {
    return new ApolloLink(function (operation, forward) {
      return firstLink.request(operation, function (op) {
        return nextLink.request(op, forward) || Observable.of();
      }) || Observable.of();
    });
  }
};

var ApolloLink = function () {
  function ApolloLink(request) {
    if (request) this.request = request;
  }

  ApolloLink.prototype.split = function (test, left, right) {
    return this.concat(split(test, left, right || new ApolloLink(passthrough)));
  };

  ApolloLink.prototype.concat = function (next) {
    return concat(this, next);
  };

  ApolloLink.prototype.request = function (operation, forward) {
    throw process.env.NODE_ENV === "production" ? new InvariantError(1) : new InvariantError('request is not implemented');
  };

  ApolloLink.empty = empty;
  ApolloLink.from = from;
  ApolloLink.split = split;
  ApolloLink.execute = execute;
  return ApolloLink;
}();

function execute(link, operation) {
  return link.request(createOperation(operation.context, transformOperation(validateOperation(operation)))) || Observable.of();
}

var sendTransactionFactory = function sendTransactionFactory(abiMapping, writeProvider) {
  return (
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regenerator.mark(function _callee(rootData, args, context, info) {
        var provider, options, fn;
        return regenerator.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(typeof writeProvider === 'function')) {
                  _context.next = 6;
                  break;
                }

                _context.next = 3;
                return writeProvider();

              case 3:
                provider = _context.sent;
                _context.next = 13;
                break;

              case 6:
                if (!writeProvider) {
                  _context.next = 10;
                  break;
                }

                provider = writeProvider;
                _context.next = 13;
                break;

              case 10:
                _context.next = 12;
                return getWriteProvider();

              case 12:
                provider = _context.sent;

              case 13:
                options = {
                  provider: provider,
                  abiMapping: abiMapping
                };
                fn = apolloLinkEthereumMutationsEthersjs.sendTransactionWithOptions(options);
                return _context.abrupt("return", fn(rootData, args, context, info));

              case 16:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x, _x2, _x3, _x4) {
        return _ref.apply(this, arguments);
      };
    }()
  );
};

function _taggedTemplateLiteral(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }

  return Object.freeze(Object.defineProperties(strings, {
    raw: {
      value: Object.freeze(raw)
    }
  }));
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  query accountQuery {\n    account @client\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}
var accountQuery = gql(_templateObject());

function _templateObject$1() {
  var data = _taggedTemplateLiteral(["\n  query networkIdQuery {\n    networkId @client\n  }\n"]);

  _templateObject$1 = function _templateObject() {
    return data;
  };

  return data;
}
var networkIdQuery = gql(_templateObject$1());

function _templateObject$2() {
  var data = _taggedTemplateLiteral(["\n  query ethereumPermissionQuery {\n    ethereumPermission @client\n  }\n"]);

  _templateObject$2 = function _templateObject() {
    return data;
  };

  return data;
}
var ethereumPermissionQuery = gql(_templateObject$2());

/**
 * Creates Apollo GraphQL subscriptions to watch for changes to the web3
 * browser network and refresh the page when an account or network is changed
 *
 * @returns {undefined}
 */

function watchNetworkAndAccount(apolloClient) {
  // If the user signs in to MetaMask or logs out, we should ... (refresh the page?)
  apolloClient.watchQuery({
    query: accountQuery,
    pollInterval: 2000,
    fetchPolicy: 'network-only'
  }).subscribe(); // This subscription listens for changes to a web3 browser (ie metamask's) network

  apolloClient.watchQuery({
    query: networkIdQuery,
    pollInterval: 2000,
    fetchPolicy: 'network-only'
  }).subscribe();
  apolloClient.watchQuery({
    query: ethereumPermissionQuery,
    pollInterval: 1000,
    fetchPolicy: 'network-only'
  }).subscribe();
}

/**
 * Configures and returns the Apollo client using all of it's mutations,
 * resolvers and contract addresses
 *
 * @returns {Object}
 */

var createClient = function createClient() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var abiMapping = options.abiMapping,
      provider = options.provider,
      link = options.link,
      writeProvider = options.writeProvider,
      defaultFromBlock = options.defaultFromBlock;
  var userResolvers = options.resolvers || {};
  var initialCacheData = options.initialCacheData || {};
  var ethersResolver = new apolloLinkEthereumResolverEthersjs.EthersResolver({
    abiMapping: abiMapping,
    provider: provider,
    defaultFromBlock: defaultFromBlock
  });
  var ethereumLink = new apolloLinkEthereum.EthereumLink(ethersResolver);
  var cache = new apolloCacheInmemory.InMemoryCache();

  var initCache = function initCache() {
    cache.writeData({
      data: _.merge(initialCacheData, {
        transactions: []
      })
    });
  };

  initCache();
  var resolvers = _.merge({
    Query: Query
  }, {
    Mutation: {
      sendTransaction: sendTransactionFactory(abiMapping, writeProvider)
    }
  }, userResolvers);
  var apolloLink;

  if (link) {
    apolloLink = ApolloLink.from([ethereumLink, link]);
  } else {
    apolloLink = ethereumLink;
  }

  var client = new apolloClient.ApolloClient({
    cache: cache,
    link: apolloLink,
    resolvers: resolvers
  });
  client.onResetStore(initCache);
  watchNetworkAndAccount(client);
  return client;
};



var index$2 = /*#__PURE__*/Object.freeze({
	resolvers: index$1,
	addTruffleArtifact: addTruffleArtifact,
	createClient: createClient
});

function _templateObject$3() {
  var data = _taggedTemplateLiteral(["\n  query blockQuery($blockNumber: Float!) {\n    block(blockNumber: $blockNumber) @client\n  }\n"]);

  _templateObject$3 = function _templateObject() {
    return data;
  };

  return data;
}
var blockQuery = gql(_templateObject$3());

function _templateObject$4() {
  var data = _taggedTemplateLiteral(["\n  subscription blockSubscription {\n    block @block\n  }\n"]);

  _templateObject$4 = function _templateObject() {
    return data;
  };

  return data;
}
var blockSubscription = gql(_templateObject$4());

function _templateObject$5() {
  var data = _taggedTemplateLiteral(["\n  query networkAccountQuery {\n    networkId @client\n    account @client\n  }\n"]);

  _templateObject$5 = function _templateObject() {
    return data;
  };

  return data;
}
var networkAccountQuery = gql(_templateObject$5());

function _templateObject$6() {
  var data = _taggedTemplateLiteral(["\n  query systemInfoQuery {\n    systemInfo @client\n  }\n"]);

  _templateObject$6 = function _templateObject() {
    return data;
  };

  return data;
}
var systemInfoQuery = gql(_templateObject$6());



var index$3 = /*#__PURE__*/Object.freeze({
	accountQuery: accountQuery,
	blockQuery: blockQuery,
	blockSubscription: blockSubscription,
	ethereumPermissionQuery: ethereumPermissionQuery,
	networkAccountQuery: networkAccountQuery,
	networkIdQuery: networkIdQuery,
	systemInfoQuery: systemInfoQuery
});

function bigNumberify(value) {
  if (!value) {
    return ethers.ethers.utils.bigNumberify(0);
  }

  return ethers.ethers.utils.bigNumberify(value);
}

function dateRelativeMs(pastTimestamp) {
  var futureTimestamp = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Date();

  if (!pastTimestamp) {
    return '';
  }

  if (pastTimestamp instanceof Date) {
    return dateFns.formatRelative(pastTimestamp, futureTimestamp);
  } else {
    return dateFns.formatRelative(bigNumberify(pastTimestamp).toNumber(), futureTimestamp);
  }
}

function twoDecimalPlaces(str) {
  return str.substr(0, str.indexOf('.') + 3);
}

function displayWeiToEther(wei) {
  if (wei === 0) {
    wei = ethers.ethers.utils.bigNumberify(0);
  }

  if (!wei) {
    return '';
  }

  var etherValueAsString = ethers.ethers.utils.commify(ethers.ethers.utils.formatEther(wei.toString(), {
    commify: true
  }));
  var amount = twoDecimalPlaces(etherValueAsString); // If the amount ends in .0 or .00 strip out the needless decimal values

  amount = amount.replace(/\.00$/, '').replace(/\.0$/, '');
  return amount;
}

function formatEtherscanAddressUrl(address, networkId) {
  var baseUrl;

  switch (networkId) {
    case 3:
      baseUrl = 'https://ropsten.etherscan.io';
      break;

    case 4:
      baseUrl = 'https://rinkeby.etherscan.io';
      break;

    case 42:
      baseUrl = 'https://kovan.etherscan.io';
      break;

    default:
      baseUrl = 'https://etherscan.io';
      break;
  }

  return "".concat(baseUrl, "/address/").concat(address);
}

var ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
var BLOCKS_PER_YEAR = 2102400;
var SECONDS_PER_YEAR = 365 * 24 * 3600;

function futureBlockDate(currentBlockDate, numberOfBlocksIntoFuture) {
  var secondsPerBlock = SECONDS_PER_YEAR / BLOCKS_PER_YEAR;
  return dateFns.addSeconds(currentBlockDate, numberOfBlocksIntoFuture * secondsPerBlock);
}

function isAddressZero(address) {
  return !address || address === ZERO_ADDRESS;
}

/**
 * Converts any case sensitive Ethereum address (in Ethereum, case
 * sensitivity is used as an (optional) checksum) to it's lowercase
 * version, which is necessary in some cases.
 *
 * @returns {String}
 */
function normalizeAddr(address) {
  if (!address) {
    return null;
  }

  return address.toLowerCase();
}

var expression = /^(\w{6})\w*(\w{2})$/;
function shortenAddress(address) {
  var result;

  if (!address) {
    return null;
  }

  result = expression.exec(address);
  return "".concat(result[1], "...").concat(result[2]);
}

//
// [
//   { amount: '123' },
//   { amount: '4302' },
//   { amount: '1208' }
// ] => 123, 1208, 4302
//

var sortBigNumbers = function sortBigNumbers(array, key) {
  ___default.mixin({
    sortWith: function sortWith(arr, customFn) {
      return ___default.map(arr).sort(customFn);
    }
  });

  return ___default.sortWith(array, function (a, b) {
    var order = -1;

    if (ethers.ethers.utils.bigNumberify(a[key]).gte(ethers.ethers.utils.bigNumberify(b[key]))) {
      // console.log(`${a.amount} is greater than or equal to ${b.amount}`)
      order = 1;
    }

    return order;
  });
};

function toWei(ether) {
  if (!ether) {
    return ethers.ethers.utils.bigNumberify(0);
  }

  return ethers.ethers.utils.parseUnits(ether, 'ether');
}



var index$4 = /*#__PURE__*/Object.freeze({
	isAddressZero: isAddressZero,
	bigNumberify: bigNumberify,
	displayWeiToEther: displayWeiToEther,
	formatEtherscanAddressUrl: formatEtherscanAddressUrl,
	futureBlockDate: futureBlockDate,
	getSystemInfo: getSystemInfo,
	dateRelativeMs: dateRelativeMs,
	normalizeAddr: normalizeAddr,
	shortenAddress: shortenAddress,
	sortBigNumbers: sortBigNumbers,
	toWei: toWei,
	twoDecimalPlaces: twoDecimalPlaces
});

function _typeof2(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof2 = function _typeof2(obj) {
      return typeof obj;
    };
  } else {
    _typeof2 = function _typeof2(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof2(obj);
}

function _typeof(obj) {
  if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
    _typeof = function _typeof(obj) {
      return _typeof2(obj);
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

var EventEmitter = require('eventemitter3');

var debug$6 = require('debug')('pt:withTransactionEe');

function withTransactionEe(Component) {
  var _temp;

  return reactApollo.graphql(apolloLinkEthereumMutationsEthersjs.allTransactionsQuery, {
    name: 'allTransactionsQuery'
  })((_temp =
  /*#__PURE__*/
  function (_PureComponent) {
    _inherits(_withTransactionLifecycle, _PureComponent);

    function _withTransactionLifecycle(props) {
      var _this;

      _classCallCheck(this, _withTransactionLifecycle);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(_withTransactionLifecycle).call(this, props));

      _defineProperty(_assertThisInitialized(_this), "componentDidUpdate", function (oldProps) {
        var _ref = _this.props.allTransactionsQuery || {},
            transactions = _ref.transactions;

        if (!transactions) {
          return;
        }

        var oldTransactions = oldProps.allTransactionsQuery ? oldProps.allTransactionsQuery.transactions : [];
        Object.keys(_this.transactionEmitters).forEach(function (transactionIdStr) {
          var transactionId = parseInt(transactionIdStr, 10); // debug('================= ', typeof transactionId, transactionId, transactions)

          var transaction = transactions.find(function (t) {
            return t.id === transactionId;
          });
          var oldTransaction = oldTransactions.find(function (t) {
            return t.id === transactionId;
          });

          if (transaction.completed && transaction.blockNumber && !transaction.error && (!oldTransaction || !oldTransaction.completed)) {
            _this.ee(transactionId).emit('receipt', transaction);
          } else if (transaction.error && (!oldTransaction || !oldTransaction.error)) {
            _this.ee(transactionId).emit('error', transaction);
          } else if (transaction.sent && (!oldTransaction || !oldTransaction.sent)) {
            _this.ee(transactionId).emit('sent', transaction);
          }
        });
      });

      _defineProperty(_assertThisInitialized(_this), "ee", function (transactionId) {
        debug$6('------------ ', _typeof(transactionId), transactionId);

        if (!_this.transactionEmitters[transactionId]) {
          _this.transactionEmitters[transactionId] = new EventEmitter();
        }

        return _this.transactionEmitters[transactionId];
      });

      _this.transactionEmitters = {};
      _this.onReturn = {
        onTransaction: _this.on
      };
      return _this;
    }

    _createClass(_withTransactionLifecycle, [{
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        Object.values(this.transactionEmitters).forEach(function (ee) {
          ee.removeAllListeners();
        });
      }
    }, {
      key: "render",
      value: function render() {
        return React__default.createElement(Component, Object.assign({}, this.props, {
          ee: this.ee
        }));
      }
    }]);

    return _withTransactionLifecycle;
  }(React.PureComponent), _temp));
}



var index$5 = /*#__PURE__*/Object.freeze({
	withTransactionEe: withTransactionEe
});

var debug$7 = require('debug')('dapp-core:askEthereumPermissions');

function askEthereumPermissions() {
  return _askEthereumPermissions.apply(this, arguments);
}

function _askEthereumPermissions() {
  _askEthereumPermissions = _asyncToGenerator(
  /*#__PURE__*/
  regenerator.mark(function _callee() {
    var requestPopUp,
        msg,
        _msg,
        _args = arguments;

    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            requestPopUp = _args.length > 0 && _args[0] !== undefined ? _args[0] : true;

            if (!(typeof window !== 'undefined' && window.ethereum)) {
              _context.next = 23;
              break;
            }

            _context.prev = 2;
            debug$7("ethereum.enable(".concat(requestPopUp, ")"));
            _context.next = 6;
            return window.ethereum.enable(requestPopUp);

          case 6:
            debug$7("enabled!");
            _context.next = 21;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](2);
            msg = _context.t0.message;

            if (!/User rejected provider access/i.test(msg)) {
              _context.next = 16;
              break;
            }

            console.error(_context.t0);
            _context.next = 21;
            break;

          case 16:
            if (!/got 1 arguments/i.test(msg)) {
              _context.next = 21;
              break;
            }

            if (!requestPopUp) {
              _context.next = 21;
              break;
            }

            _context.next = 20;
            return window.ethereum.enable();

          case 20:
            debug$7('Enabled ethereum');

          case 21:
            _context.next = 25;
            break;

          case 23:
            _msg = 'Could not find `window` or `window.ethereum` (Browser is not an Ethereum-powered browser?)';
            console.warn(_msg);

          case 25:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 9]]);
  }));
  return _askEthereumPermissions.apply(this, arguments);
}

function getNetworkId() {
  return _getNetworkId.apply(this, arguments);
}

function _getNetworkId() {
  _getNetworkId = _asyncToGenerator(
  /*#__PURE__*/
  regenerator.mark(function _callee() {
    var provider, network;
    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return getReadProvider();

          case 2:
            provider = _context.sent;
            _context.next = 5;
            return provider.getNetwork();

          case 5:
            network = _context.sent;

            if (!network) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return", network.chainId);

          case 8:
            return _context.abrupt("return", null);

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getNetworkId.apply(this, arguments);
}



var index$6 = /*#__PURE__*/Object.freeze({
	askEthereumPermissions: askEthereumPermissions,
	getNetworkId: getNetworkId,
	getNetworkName: getNetworkName,
	getReadProvider: getReadProvider,
	getWriteProvider: getWriteProvider,
	hasEthereumPermissions: hasEthereumPermissions,
	isToshi: isToshi
});

exports.apollo = index$2;
exports.queries = index$3;
exports.react = index$5;
exports.utils = index$4;
exports.web3 = index$6;
