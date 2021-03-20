(function(){function require(e,t,n){t||(t=0);var r=require.resolve(e,t),i=require.m[t][r];if(!i)throw new Error('failed to require "'+e+'" from '+n);if(i.c){t=i.c,r=i.m,i=require.m[t][i.m];if(!i)throw new Error('failed to require "'+r+'" from '+t)}return i.exports||(i.exports={},i.call(i.exports,i,i.exports,require.relative(r,t))),i.exports}require.resolve=function(e,t){var n=e,r=e+".js",i=e+"/index.js";return require.m[t][r]&&r?r:require.m[t][i]&&i?i:n},require.relative=function(e,t){return function(n){if("."!=n.charAt(0))return require(n,t,e);var r=e.split("/"),i=n.split("/");r.pop();for(var s=0;s<i.length;s++){var o=i[s];".."==o?r.pop():"."!=o&&r.push(o)}return require(r.join("/"),t,e)}};
require.m = [];
require.m[0] = {
"radar_client": { exports: window.RadarClient },
"minilog": { exports: window.Minilog },
"ember": { exports: window.Ember },
"handlebars": { exports: window.Handlebars },
"i18n": { exports: window.I18n },
"jquery": { exports: window.jQuery },
"underscore": { exports: window._ },
"zd": { exports: window.Zendesk },
"app.js": function(module, exports, require){
/*globals Em, Handlebars*/

var $                 = require('jquery'),
    _                 = require('underscore'),
    Site              = require('site'),
    BarAppContainer   = require('app_container/bar'),
    Support           = require('support'),
    InstalledApp      = require('installed_app'),
    FrameworkVersion  = require('version'),
    AppI18n           = require('app_i18n'),
    AppHelpers        = require('app_helpers'),
    logger            = require('log/base'),
    zdMenuAdapter     = require('lib/views/adapters/zd_menu'),
    slice             = Array.prototype.slice,
    forEach           = Array.prototype.forEach,
    assert            = Support.assert,
    runLater          = Support.runLater;

function ArgumentError() {
  var msg, types = [];
  if (arguments.length) {
    forEach.call(arguments, function(klass) {
      types.push(typeof(klass));
    });
    msg = '%@: Argument(s) should be of type: [ %@ ]'.fmt(this.name, types);
    Error.call(this, msg);
    this.message = msg;
  }
}
$.extend(ArgumentError.prototype, Error, {
  constructor: ArgumentError,
  message:     'Incorrect arguments provided',
  name:        'ArgumentError'
});

function withCleanHandlebars(func, context, args) {
  var originalHelpers = Handlebars.helpers;
  Handlebars.helpers = AppHelpers;
  AppHelpers.currentApp = context;
  var result = func.apply(context, args);
  Handlebars.helpers = originalHelpers;
  return result;
}

function processRequests(app, requests) {
  var Request = app.framework().Request,
      processedRequests = {};

  Object.keys(requests).forEach(function(name) {
    processedRequests[name] = new Request(name,
                                          requests[name],
                                          app);
  });

  return processedRequests;
}

function requestFor(app, requestName) {
  if (app.processedRequests == null) {
    app.processedRequests = processRequests(app, app.requests);
  }
  var request = app.processedRequests[requestName];
  assert('No such request: %@'.fmt(requestName), request != null);
  return request;
}

function isBarApp(app) {
  return BarAppContainer.detect(app.host);
}

function inDOM(app) {
  return !!app.$().length;
}

// ## ZendeskApps
//
// Zendesk App framework
//
function App(properties) {
  $.extend(this, properties);
  this.adapters = [ zdMenuAdapter ];
  this.I18n = new AppI18n(this);
}

$.extend(App.prototype, {

  template: function(name) {
    assert('Trying to access a template for a "No template" App', !this._isNoTemplate());

    var template = this.templates[name];
    assert('No such template: ' + name, template != null);

    if (!$.isFunction(template)) {
      template = Handlebars.compile(template);
      this.templates[name] = template;
    }

    return template;
  },

  _isNoTemplate: function() {
    return _.isEmpty(this.templates);
  },

  setting: function(name) {
    // setting "name" has been deprecated and will be removed in 0.6
    if ( name === 'name' ) { name = 'title'; }
    return this.settings[name];
  },

  store: function(key, value) {
    var dataStore = this.installation.dataStore;
    return dataStore.store.apply(dataStore, arguments);
  },

  installationId: function() {
    return this.installation.installation.id;
  },

  id: function() {
    return this.installation.installation.app_id;
  },

  assetURL: function(name) {
    return "%@%@".fmt(this.assetUrlPrefix, name);
  },

  ajax: function(name) {
    var request = requestFor(this, name);
    return request.perform.apply(request, slice.call(arguments, 1));
  },

  framework: function() {
    return FrameworkVersion.find(this.frameworkVersion);
  },

  promise: function(fn) {
    var dfd = $.Deferred();
    if (typeof fn !== 'function') { throw new ArgumentError(Function); }
    runLater(this, fn, dfd.resolve, dfd.reject);
    return dfd.promise();
  },

  when: function() {
    return $.when.apply($, arguments);
  },

  trigger: function(eventName, data) {
    var self      = this,
        event     = $.Event("%@.appview".fmt(eventName), data),
        callback  = function(view) {
          view.$().trigger(event);
        };

    this.host.callWhenViewIsReady(this, callback);
  },

  //v1: to be removed
  dependency: function(key) {
    return this.deps[key];
  },

  // Called with the app's host and configuration when it is launched.
  // Does nothing by default; override in your app as necessary.
  // @api public
  launch: function(host, settings) {
  },

  renderTemplate: function(name, data) {
    var context = this._renderContext(data || {});
    var template = this.template(name);
    return withCleanHandlebars(template, this, [context]);
  },

  renderCurrentState: function() {
    if (!this.currentState) { return; }
    var html = this.renderTemplate(this.currentState, this.currentData);
    this.$main().html(html);
    this.applyViewAdapters();
  },

  applyViewAdapters: function() {
    var $view = this.$main();
    if (this.adapters.length === 0) { return; }
    this.adapters.forEach(function(adapter) {
      adapter($view);
    });
  },

  switchTo: function(state, data) {
    this.currentState = state;
    this.currentData = data || {};
    if (isBarApp(this) && !inDOM(this)) { return; }
    this.logger.benchmark('switchTo', this.renderCurrentState.bind(this));
  },

  '$main': function() {
    var mainElem = this.$('[data-main]');
    assert('No DOM element marked as `main` (use a `data-main` attribute to indicate)', mainElem.length);
    return mainElem;
  },

  _renderContext: function(data) {
    return $.extend(
      {},
      { I18n: this.translations },
      this.containerContext(),
      { author: this.author },
      data
    );
  }

});

App.install = function installApp(installation) {
  InstalledApp.push(this, installation);
};

App.create = function createApp(settings) {
  logger.warn('ZendeskApps.app.create is deprecated. Use new ZendeskApps.App');
  var Klass = this;
  return new Klass(settings);
};

App.extend = function extendApp(subclass_properties) {
  var ParentClass = this;
  function AppSubclass(settings) {
    ParentClass.call(this, settings);
  }

  AppSubclass.reopen = function(properties) {
    $.extend(this.prototype, properties);
    return this;
  };
  AppSubclass.reopenClass = function(properties) {
    $.extend(this, properties);
    return this;
  };
  AppSubclass.reopen(new ParentClass(subclass_properties));
  AppSubclass.reopenClass(this);

  return AppSubclass;
};

module.exports = App;
},
"i18n.js": function(module, exports, require){
var I18n = {
  t: function(key, context, defaultValue) {
    var EmberI18n = window.I18n;
    if (typeof EmberI18n !== 'undefined' &&
      EmberI18n.translations[key] != null) {
      return EmberI18n.t(key, context);
    }
    return defaultValue;
  }
};

module.exports = I18n;
},
"site.js": function(module, exports, require){
module.exports = {
  NAV_BAR:            'nav_bar',
  TICKET_SIDEBAR:     'ticket_sidebar',
  NEW_TICKET_SIDEBAR: 'new_ticket_sidebar',
  USER_SIDEBAR:       'user_sidebar',
  TOP_BAR:            'top_bar'
};
},
"index.js": function(module, exports, require){
var $             = require('jquery'),
    _             = require('underscore'),
    Em            = require('ember'),
    Handlebars    = require('handlebars'),
    logger        = require('log/base').logger,
    assert        = require('support').assert,
    globalRequire = window.require;

assert('jQuery is not available', $ !== null);
assert('Underscore is not available', _ !== null);
assert('Handlebars is not available', Handlebars !== null);

var InstalledApp = require('installed_app'),
    AppScope     = require('app_scope'),
    App          = require('app');

// CRUFT: This code should be removed when we can migrate any old apps that use `require('apps/framework/app_scope')`
// can be updated to use the new approach `window.ZendeskApps.AppScope`.
if (globalRequire && globalRequire.cache) {
  globalRequire.cache['apps/framework/app_scope'] = AppScope;
}

logger.time('Initialize Apps');

module.exports = {
  Reloader:             require('reloader'),
  Store:                require('storage'),
  Site:                 require('site'),
  AppScope:             AppScope,
  Logger:               logger,
  AppContainerHostView: require('app_container/host_view'),
  AppContainer:         require('app_container/base'),
  BarAppContainer:      require('app_container/bar'),
  TicketAppContainer:   require('app_container/ticket'),
  UserAppContainer:     require('app_container/user'),
  AppView:              require('app_view/base'),
  DefaultAppViewClass:  require('app_view/default'),
  InstalledApp:         InstalledApp,
  defineApp:            App.extend.bind(App),
  sortAppsForSite:      InstalledApp.sortAppsForSite.bind(InstalledApp),
  installedAppsFor:     InstalledApp.forSite.bind(InstalledApp)
};

},
"closet.js": function(module, exports, require){
/* Closet( useNativeCloset )
*
*  Wrapper for HTML5 localStorage
*
*  ## Functionality
*
*  - auto detects whether browser supports HTML5 localStorage and
*    gracefully defaults to an in-memory data store when unavailable.
*
*  - localStorage only accepts and returns serialized string
*    objects. Closet automatically manages serialization
*    and deserialization.
*
*  ## Usage
*
#    var Closet = require('lib/closet'),
*        closet = new Closet();
*    closet.setItem('example', {name: 'John Doe', age: 45});
*    closet.setItem('Friday', 5);
*
*    closet.getItem('example');   // {name: 'John Doe', age: 45}
*    closet.getItem('Friday');    // 5
*
*    closet.clear();
*    closet.getItem('example');   // null
*
*
*  ## Modalities
*
*    Not all browser support localStorage. If it is supported,
*    Closet will use it, otherwise it will use a temporary,
*    in-memory data store. Normally, this is automatically determined
*    by Closet. However, it is possible to force it to use
*    the in-memory data store. This is done by passing in the boolean
*    value true to the useNativeCloset parameter during instanciation.
*
*    In a browser that supports localStorage:
*    var closet = new Closet();
*    closet.storageType();          // 'LocalStorage'
*
*    var closet = new Closet(true);
*    closet.storageType();          // 'Native'
*
*    In a browser that does NOT support localStorage:
*    var closet = new Closet();
*    closet.storageType();          // 'Native'
*
*    var closet = new Closet(true);
*    closet.storageType();          // 'Native'
*
*
*  ## Class methods
*
*    Closet.hasLocalStorage()  // returns a Boolean
*      True if the browser supports HTML5 localStorage
*
*/

var isSecurityError = function(name) {
  // Chrome || Firefox
  return name === 'SECURITY_ERR' || name === 'SecurityError';
};

var Closet = function(useNativeCloset) {
  if (useNativeCloset || !Closet.hasLocalStorage()) {
    return new Closet.NativeStore();
  }

  return new Closet.LocalStore();
};

Closet.hasLocalStorage = function() {
  var storage, result;
  try {
    storage = window.localStorage;
    if ( storage == null ) { return false; }
    storage.setItem('__hasLocalStorage__', 'true');
    result = storage.getItem('__hasLocalStorage__') === 'true';
    storage.removeItem('hasLocalStorage');
    return result;
  } catch(e) {
    if (e.name === 'QUOTA_EXCEEDED_ERR' || isSecurityError(e.name)) {
      return false;
    } else {
      throw e;
    }
  }
};


var storage,  // private data store for Closet.NativeStore
    updateLength;

var findKeys = function(storage, regex) {
  var keys = [];
  regex = new RegExp(regex);
  for (var key in storage) {
    if (storage.hasOwnProperty(key)) {
      if (regex && !regex.test(key)) { continue; }
      keys.push(key);
    }
  }
  return keys;
};

Closet.NativeStore = function() {
  storage = {};

  updateLength = function() {
    var count = 0;
    for (var key in storage) {
      if (storage.hasOwnProperty(key)) { count+= 1; }
    }
    this.length = count;
  };
};

Closet.NativeStore.prototype = {
  length: 0,

  getItem: function(name) {
    return typeof(storage[name]) === 'undefined' ? null : storage[name];
  },

  setItem: function(name, value) {
    storage[name] = value;
    updateLength.call(this);
  },

  removeItem: function(name) {
    delete storage[name];
    updateLength.call(this);
  },

  clear: function() {
    storage = {};
    updateLength.call(this);
  },

  keys: function(regex) {
    return findKeys(storage, regex);
  },

  storageType: function() {
    return 'Native';
  }
};

Closet.LocalStore = function() {

  updateLength = function() {
    this.length = window.localStorage.length;
  };

};

Closet.LocalStore.prototype = {
  length: 0,

  getItem: function(name) {
    try {
      return JSON.parse(window.localStorage.getItem(name));
    } catch (e) {
      return null;
    }
  },

  setItem: function(name, value) {
    var result = window.localStorage.setItem(name, JSON.stringify(value));
    updateLength.call(this);
    return result;
  },

  removeItem: function(name) {
    var result = window.localStorage.removeItem(name);
    updateLength.call(this);
    return result;
  },

  clear: function() {
    var result = window.localStorage.clear();
    updateLength.call(this);
    return result;

  },

  keys: function(regex) {
    return findKeys(window.localStorage, regex);
  },

  storageType: function() {
    return 'LocalStorage';
  }
};

module.exports = Closet;
},
"helpers.js": function(module, exports, require){
/*globals Handlebars*/
var unboundSlice = Array.prototype.slice,
    slice        = Function.prototype.call.bind(unboundSlice);

module.exports = {
  fmt: function(str) {
    return str.fmt.apply(str, slice(arguments, 1));
  },

  safeString: function(str) {
    return new Handlebars.SafeString(str);
  }
};
},
"version.js": function(module, exports, require){
/*globals $*/


var allVersions = {};

function FrameworkVersion(versionNumber, directory) {
  $.extend(this, directory, { versionNumber: versionNumber });
  allVersions[versionNumber] = this;
}

FrameworkVersion.prototype.toString = function() {
  return 'Apps Framework Version %@'.fmt(this.versionNumber);
};

FrameworkVersion.find = function(versionNumber) {
  return allVersions[versionNumber];
};

new FrameworkVersion('1.0', {
  Request: require('request')
});

// CRUFT: Currently have to set folder name to use underscore due to a limitation
//        of Sprockets where it treats dots in folder names incorrectly.
new FrameworkVersion('0.5', {
  Request: require('0_5/request')
});


module.exports = FrameworkVersion;
},
"log/app.js": function(module, exports, require){
var Support      = require('support'),
    Logger       = require('log/base'),
    extendSafely = Support.extendSafely,
    get          = Support.get,
    set          = Support.set,
    Em           = require('ember'),
    I18n         = require('i18n');

var AppLogger = function(app) {
  var appTitle  = app.setting('title').dasherize(),
      installId = app.installationId();
  Logger.call(this, '%@/installation-%@'.fmt(appTitle, installId));
  this.errorMessages = [];
  this.app = app;
};

extendSafely(AppLogger.prototype, Logger, {

  error: function(error) {
    var hasErrors = this.hasErrors(),
        message   = error.stack || error.message;

    this.errorMessages.push(error.message);
    this._super(message); // Push to Minilog
    console.error('[App "%@"]'.fmt(this.app.setting('title')), message); // Push to console for App Developers

    if (!hasErrors) {
      this._appendNewError(error.message);
    } else {
      this._appendLatestErrors();
    }
  },

  hasErrors: function() {
    return this.errorMessages.length > 0;
  },

  latestErrors: function(howMany) {
    howMany = howMany || 5;
    return this.errorMessages.slice(0, howMany);
  },

  _appendNewError: function(message) {
    var $headers = this.app.$().find('header'),
        selector = $headers.length ? $headers.first() : this.app.$(),
        // TODO: move this logic into the host so this doesn't have
        //       a dependency on translations.
        title = I18n.t("txt.apps.error.javascript_exception");
    selector.prepend(
      '<span id="test" class="badge badge-warning app-warning-icon"><i class="icon-warning-sign"></i></span>'
    );
    selector.find('.app-warning-icon').popover({
      'content': message,
      'placement': 'left',
      'title': title,
      'html': true,
      'trigger': 'hover'
    });
  },

  _appendLatestErrors: function() {
    var iconWarning  = this.app.$().find('.app-warning-icon'),
        latestErrors = this.latestErrors();

    iconWarning.attr('data-content', latestErrors.join('<br/>')); // Show last 5 errors
  },

  clear: function() {
    this.errorMessages.length = 0;
  }
});

module.exports = AppLogger;
},
"storage.js": function(module, exports, require){
var Closet = require('closet'),
    _ = require('underscore'),
    NAMESPACE_TPL = 'install-%@.%@',
    EXPIRES_IN_DAYS = 30;

var fmtKey = function(id, key, privateKey) {
  if(privateKey) {
    return NAMESPACE_TPL.fmt(id + '-private', key);
  }
  return NAMESPACE_TPL.fmt(id, key);
};

var getItem = function(key) {
  return this.closet.getItem(key);
};

var setItem = function(key, value) {
  this.closet.setItem(key, value);
  this.closet.setItem(fmtKey(this.id, 'timestamp', true), new Date());
};

/// Apps can store data for later use with the `store` helper.
///
/// ### Scope
///
/// Data is stored on an installation-and-user basis. Two different
/// installations of the same app will not be able to access each other's data.
/// Nor will an installation be able to store or access data for a user other
/// than the current user. `store` is ideal for keeping user-specific state like
/// preferences or credentials for third-party services.
///
/// ### Persistence
///
/// Data is stored in localStorage if supported by the browser and will expire
/// 30+ days after initial storage, unless the store method is used to update
/// the value for a stored key. If localStorage is not supported, data is stored
/// in memory, which means it will not be shared across browsers or browser tabs
/// and will be lost when the user closes or refreshes the browser tab or reloads
/// the app tray.
///
/// ### Javascript API
///
/// #### store(key_or_hash)
/// If passed a String key, returns the value stored under that key for this
/// installation and user. If passed an Object, stores all of key/value pairs.
/// As with `store(key, value)`, all values must be encodable as JSON.
///
/// ```javascript
///   var userID = this.store('user.id');
/// ```
///
/// ```javascript
///   this.store({ foo: 'bar', bar: 'foo' });
/// ```
///
/// #### store(key, value)
/// Sets the value stored in `key` for this installation and current user.
/// `value` must be encodable as JSON. (`null`, Strings, numbers, and simple
/// objects are all JSON-encodable.)
///
/// ```javascript
///   this.store( 'user.id', this.currentUser().id() );
/// ```
///
/// ### Handlebars API
///
/// Stored data is available via the `store` helper:
///
/// ```html
///   My username is {{store "username"}}
/// ```
function DataStore(id) {
  this.id = id;
  this.closet = new Closet();

  if (this.hasExpired()) {
    this.clear();
  }
}

DataStore.prototype.store = function(key, value) {
  var fmttedKey = fmtKey(this.id, key);
  if ( _.isString(key) && arguments.length === 1 ) {
    return getItem.call(this, fmttedKey);
  } else if ( _.isObject(key) && arguments.length === 1 ) {
    _.each(key, function(val, k) {
      if (key.hasOwnProperty(k)) {
        this.store(k, val);
      }
    }, this);
  } else {
    setItem.call(this, fmttedKey, value);
  }
};

DataStore.prototype.hasExpired = function() {
  var timestampKey = fmtKey(this.id, 'timestamp', true),
      expiryDate = new Date(this.closet.getItem(timestampKey)),
      now = new Date();

  expiryDate.setDate(expiryDate.getDate() + EXPIRES_IN_DAYS);

  return (now > expiryDate && this.closet.storageType() === 'LocalStorage');
};

DataStore.prototype.clear = function() {
  var regex = new RegExp('install-' + this.id),
      installStore = this.closet.keys(regex);

  _.each(installStore, function(key) {
    this.closet.removeItem(key);
  }, this);
};

module.exports = DataStore;
},
"support.js": function(module, exports, require){
var Support = {},
    $       = require('jquery'),
    _       = require('underscore'),
    Ember   = require('ember'),
    slice   = Array.prototype.slice,
    assert, set;

function setPathHelper(obj, path, value, onMissing) {
  var keys = path.split('.'),
      lastKey = keys.pop();

  keys.forEach(function(key) {
    obj.hasOwnProperty(key) || onMissing(obj, key);
    obj = obj[key];
  });

  return set( obj, lastKey, value );
}

var fnOverride = function(fnTarget, fnSource) {
  var fn = function() {
    var origSuper = this._super;
    this._super = fnTarget;
    var result = fnSource.apply(this, arguments);
    this._super = origSuper;
    return result;
  };
  return fn;
};

assert = Support.assert = function assert(desc, test) {
  if ('function' === typeof test) {
    test = test() !== false;
  }
  if (!test) throw new Error("assertion failed: " + desc);
};

if ( Ember ) {
  Support.get = Ember.get;
  Support.getPath = Ember.getPath;
  set = Support.set = Ember.set;
  Support.setPath = Ember.setPath;
  Support.runLater = $.proxy( Ember.run.next, Ember.run );
} else {
  Support.get = function get(obj, key) {
    assert( "You need to provide an object to `get`.", obj != null );
    assert( "You need to provide a key to `get`.", key != null );
    return (key.indexOf('.') !== -1 ? Support.getPath(obj, key) : obj[key]);
  };

  Support.getPath = function getPath(obj, path) {
    assert( "You need to provide an object to `getPath`.", obj != null );
    assert( "You need to provide a path to `getPath`.", path != null );
    return path.split('.').reduce(function(memo, key) {
      return memo == null ? null : memo[key];
    }, obj);
  };

  set = Support.set = function set(obj, key, value) {
    assert( "You need to provide an object to `set`.", obj != null );
    assert( "You need to provide a key to `set`.", key != null );
    if (key.indexOf('.') !== -1) {
      Support.setPath(obj, key, value);
    } else {
      obj[key] = value;
    }
    return value;
  };

  Support.setPath = function setPath(obj, path, value) {
    assert( "You need to provide an object to `setPath`.", obj != null );
    assert( "You need to provide a path to `setPath`.", path != null );
    return setPathHelper(obj, path, value, function(obj, key) {
      assert( "Object in path %@ could not be found.".fmt(key), obj != null );
    });
  };

  Support.runLater = function runLater(context, callback) {
    var extraArgs = slice.call(arguments);
    extraArgs.shift();
    extraArgs.shift();
    setTimeout( function() {
      callback.apply(context, extraArgs);
    }, 1);
  };
}

// Same as setPath, but auto-vivifies.
Support.setPath_p = function setPath_p(obj, path, value) {
  assert( "You need to provide an object to `setPath_p`.", obj != null );
  assert( "You need to provide a path to `setPath_p`.", path != null );

  return setPathHelper(obj, path, value, function(obj, key) {
    obj[key] = {};
  });
};

Support.notifyPropertyChange = function notifyPropertyChange(obj) {
  assert( "You need to provide an object to `notifyPropertyChange`", obj != null );

  if (_.isFunction(obj.notifyPropertyChange)) {
    var extraArgs = slice.call(arguments, 1);
    obj.notifyPropertyChange.apply(obj, extraArgs);
  }
};

Support.extendSafely = function extendSafely(obj) {
  if (arguments.length < 2) { return obj; }
  var args = slice.call(arguments, 1),
      key, src;
  for (var i = 0; i < args.length; i++) {
    src = args[i];
    if (typeof src === 'function') { src = src.prototype; }
    for (key in src) {
      if (!src.hasOwnProperty(key)) continue;
      if (typeof obj[key] === 'function' && typeof src[key] === 'function') {
        obj[key] = fnOverride(obj[key], src[key]);
      } else {
        obj[key] = src[key];
      }
    }
  }
};

Support.getTime = function() {
  return window.performance && 'now' in window.performance ? window.performance.now() : Date.now();
};

Support.invokeInApp = function(app, func) {
  var args = slice.call(arguments, 2);
  try {
    return func.apply(app, args);
  } catch(error) {
    app.logger.error(error);
    return error;
  }
};

module.exports = Support;
},
"request.js": function(module, exports, require){
/*globals Zd*/

var $        = require('jquery'),
    Support  = require('support'),
    runLater = Support.runLater,
    get      = Support.get,
    slice    = Array.prototype.slice;

function authenticityToken() {
  return get(Zd, 'currentUser.authenticity_token');
}

/// ### this.requests
///
/// The `requests` attribute contains named HTTP requests.
/// Each definition can be any of
///
///  * a `String`, which will be interpreted as a URL for a GET request
///  * an `Object` that is compatible with
///    [`jQuery.ajax`](http://api.jquery.com/jQuery.ajax/).
///  * a `Function` that returns either of the above
///
/// If the URL is relative to the current help desk (e.g. `/api/v2/tickets`),
/// the request definition will passed directly to `jQuery.ajax`.
///
/// If it is a fully-qualified URL (e.g. http://example.com/widget), Zendesk will:
///
///  * send the request directly to the remote server if you specify `cors: true`
///  * proxy the request throught the new proxy (`proxy_v2`) if you specify `proxy_v2: true`
///  * proxy the request through the old proxy if nothing is specified
///
/// ### this.ajax(name, *args)
///
/// Performs a named HTTP request.
///
/// #### Arguments
///
///  * `name` the name of a defined HTTP request
///  * `*args` any additional arguments, which will be passed to
///    the named request if it is a `Function`.
///
/// #### Returns
///
/// A [`jQuery Promise`](http://api.jquery.com/promise/) that will
/// be resolved when the request does. Any `done`, `fail`, or `always`
/// callbacks will be passed the same arguments that the corresponding
/// callbacks for calls to `jQuery.ajax`. For successful requests, this
/// means they will receive the response body after it has been modified by
/// any jQuery `dataFilter`s.
///
/// #### Triggers
///
/// When the request returns, the `[request name].always` and either
/// the `[request name].done` or `[request name].fail` events will be
/// triggered. Any event handlers will also be passed the same arguments
/// as the promise callbacks.
///
/// ### Zendesk Proxy
///
/// In June 2013, we released a new version of our proxy. This version will be made the
/// default version around October 2013. This new proxy acts like a true "pass-through"
/// proxy and simply sends your requests as they are without interfering with the
/// request or response headers.
///
/// In order to use this new proxy in your Apps you'll need to pass `proxy_v2 : true` as a parameter in each AJAX request.
///
/// Here are some examples:
///
/// GET request with URL params:
///
/// ```
///   requests: {
///     save: function() {
///       return {
///         url:      'http://www.example.com/abc?x=1&y=2',
///         type:     'GET',
///         proxy_v2: true
///       };
///     }
///   }
/// ```
///
/// GET request with data attribute:
///
/// ```
///   requests: {
///     save: function() {
///       return {
///         url:      'http://www.example.com/abc',
///         type:     'GET',
///         data:     {x: 1, y: 2},
///         proxy_v2: true
///       };
///     }
///   }
/// ```
///
/// POST form data:
///
/// ```
///   requests: {
///     save: function() {
///       return {
///         url:      'http://www.example.com/post',
///         type:     'POST',
///         data:     {x: 1, y: 2},
///         proxy_v2: true
///       };
///     }
///   }
/// ```
///
/// POST JSON data (need to JSON stringify the data):
///
/// ```
///   requests: {
///     save: function() {
///       return {
///         url:         'http://www.example.com/post.json',
///         type:        'POST',
///         contentType: 'application/json',
///         data:        JSON.stringify({x: 1, y: 2}), // '{"x": 1, "y": 2}'
///         proxy_v2:    true
///       };
///     }
///   }
/// ```
///
/// POST XML data:
///
/// ```
///   requests: {
///     save: function() {
///       return {
///         url:         'http://www.example.com/post.xml',
///         type:        'POST',
///         contentType: 'application/xml',
///         data:        '<x>1</x>',
///         proxy_v2:    true
///       };
///     }
///   }
/// ```
///
/// ### CORS support
///
/// [Cross-Origin Resource Sharing](http://www.w3.org/TR/cors) (CORS) allows AJAX
/// requests made across domains to behave similarly to those made to the same domain.
/// This allows apps to send requests to directly to a remote server without the request
/// being proxied through Zendesk's servers.
///
/// #### Preflight request
///
/// Only [simple request headers](http://www.w3.org/TR/cors/#simple-header) will be sent,
/// so a preflight will not be required for `GET`, `POST`, or `HEAD` requests by default.
///
/// If other headers are added to the request, or if another request method is specified,
/// the response must contain headers that explicitly allow the use of the request headers,
/// or method.
///
/// #### Browser support
///
/// CORS is supported by most modern browsers. Please review the
/// [list of browsers](http://caniuse.com/cors) that support CORS to
/// determine if using CORS is right for your App.
///
/// ##### Internet Explorer 9 support
///
/// Internet Explorer 9 has limited support for CORS.
///
/// [Limitations](http://blogs.msdn.com/b/ieinternals/archive/2010/05/13/xdomainrequest-restrictions-limitations-and-workarounds.aspx) include (for IE9 only):
///
/// * The target URL must be accessed using the HTTP or HTTPS protocols.
/// * The target URL must be accessed using only the HTTP methods GET and POST.
/// * No custom headers may be added to the request.
/// * Only text/plain is supported for the request's Content-Type header.
/// * No authentication or cookies will be sent with the request.
/// * Requests must be targeted to the same scheme as the hosting page.
///
/// No additional work is required to support CORS for clients using IE9.
///
/// #### Example CORS request and response
///
/// ##### Request
///
/// ```javascript
/// {
///    requests: {
///      getWidget: function(name) {
///        return {
///          url:  'https://cdn.example.com/widgets/' + name,
///          cors: true
///        };
///      }
///    }
/// }
///
/// ```
///
/// ##### Request headers
///
/// Note: some browser headers have been omitted.
///
/// ```
/// Accept:application/json, text/javascript, */*; q=0.01
/// Host:cdn.example.com
/// Origin:https://example.zendesk.com
/// Referer:https://example.zendesk.com/agent
/// ```
///
/// ##### Response headers
///
/// ```
/// Access-Control-Allow-Credentials:true
/// Access-Control-Allow-Methods:GET, POST, OPTIONS
/// Access-Control-Allow-Origin:https://example.zendesk.com
/// Access-Control-Max-Age:3600
/// Content-Type:application/json;charset=utf-8
/// ```
///
/// ### Example
///
/// ```javascript
/// {
///    requests: {
///      getWidget: function(name) {
///        return {
///          url:      'http://example.com/widgets/' + name,
///          dataType: 'json',
///          proxy_v2: true
///        };
///      }
///    },
///
///    showWidget(name) {
///      this.ajax('getWidget', name)
///          .done(function(data) {
///            /// render the JSON data
///          });
///    }
/// }
/// ```
var Request = function(name, options, app) {
  this.name    = name;
  this.options = options;
  this.app     = app;
};

Request.prototype = {
  _triggerEvent: function(kind, args) {
    this.app.trigger("%@.%@".fmt(this.name, kind), { responseArgs: slice.call(args) });
  },

  perform: function() {
    var self = this;

    var options = this.options;

    if( $.isFunction(options) ) {
      options = options.apply(this.app, arguments);
    }

    this.useCors = $.support.cors && get(options, 'cors');

    var result = $.Deferred();

    runLater(this, function() {
      this._addCallbacks(
        this._proxiedAJAX(
          this._addAuthenticityToken(options)
        ), result
      );
    });

    return result.promise();
  },

  _addCallbacks: function(ajax, dfd) {
    var self = this;
    ajax
      .fail(  function() { self._triggerEvent('fail', arguments); })
      .done(  function() { self._triggerEvent('done', arguments); })
      .always(function() { self._triggerEvent('always', arguments); })
      .fail(  function() { dfd.rejectWith(self.app, arguments); })
      .done(  function() { dfd.resolveWith(self.app, arguments); });
  },

  _addAuthenticityToken: function(options) {
    var needsToken = !this._urlShouldBeProxied(options.url, this.useCors) &&
                     /^post|put|delete$/i.test(options.type);

    if ( needsToken ) {
      options.data = options.data || {};
      options.data.authenticity_token = authenticityToken();
    }

    return options;
  },

  _addCustomHeaders: function(options) {
    var installationId = get(this, 'app.installation.installation.id'),
        appId = get(this, 'app.installation.installation.app_id'),
        beforeSend = options.beforeSend;

    options.beforeSend = function(jqXHR, settings) {
      if ($.isFunction(beforeSend)) {
        beforeSend(jqXHR, settings);
      }
      jqXHR.setRequestHeader("X-Zendesk-App-Installation-Id", installationId);
      jqXHR.setRequestHeader("X-Zendesk-App-Id", appId);
    };
  },

  _proxiedAJAX: function(options) {
    options.context = options.context || this.app;
    options.url = options.url || '';

    if ( this._urlShouldBeProxied(options.url, this.useCors) ) {
      this._addCustomHeaders(options);
      return $.ajax( this._mungeOptionsForProxy(options) );
    }
    return $.ajax(options);
  },

  _mungeOptionsForProxy: function (options) {
    var result         = $.extend({}, options),
        oauth          = get(options, 'oauth'),
        destinationUrl = "/proxy/to/%@",
        isGet          = (options.type === undefined || options.type === 'GET'),
        originalUrl    = options.url,
        divider;

    if (oauth) {
      destinationUrl = "/apps/oauth/to/%@";
    }

    if (isGet && options.data) {
      divider = originalUrl.indexOf('?') > 0 ? '&' : '?';
      originalUrl += (divider + decodeURIComponent($.param(options.data)));
    }

    result.url = destinationUrl.fmt(encodeURIComponent(originalUrl));
    return result;
  },

  _pageHost: function() {
    return window.location.host;
  },

  _pageProtocol: function() {
    return window.location.protocol;
  },

  _urlShouldBeProxied: function(url, usingCors) {
    if ( usingCors ) {
      return false;
    }

    var isMyDomain,
        app = this.app,
        mySubdomain = app.currentAccount() && app.currentAccount().subdomain();
    if ( mySubdomain ) {
      var host = this._pageHost(),
          protocol = this._pageProtocol(),
          subdomain = host.split('.')[0];
      isMyDomain = subdomain === mySubdomain && (new RegExp('^%@\\/\\/%@\\/'.fmt(protocol, host))).test(url);
    }
    return url.match(/^https?:\/\//) != null && !isMyDomain;
  }

};

module.exports = Request;
},
"reloader.js": function(module, exports, require){
var $           = require('jquery'),
    zat         = $.queryParameters().zat,
    appURL      = '/api/v2/apps/installed.js',
    queue       = $.Callbacks('unique'),
    isReloading = false;

if (zat) {
  if (zat === 'true') {
    appURL  = 'http://localhost:4567/app.js';
  } else if (zat.match(/^http:\/\/localhost:\d+\/app.js$/)) {
    appURL  = zat;
  }
}

var Reloader = {
  reload: function(callback) {
    callback && queue.add(callback);
    if (isReloading) { return; }
    isReloading = true;
    $.getScript(appURL)
      .done(queue.fire.bind(queue))
      .always(function() {
        queue.empty();
        isReloading = false;
      });
  }
};

module.exports = Reloader;
},
"log/base.js": function(module, exports, require){
var Minilog   = require('minilog'),
    getTime   = require('support').getTime,
    slice     = Array.prototype.slice,
    timeCache = {};

var K = function() {
  return this;
};

var tryConsole = function(name) {
  return console[name] && console[name].apply(console, slice.call(arguments, 1));
};

var Logger = function(scope) {
  var loggerName = 'apps';
  if (scope) { loggerName += '/' + scope; }
  this.minilog = Minilog(loggerName);
};

Logger.prototype.willLog = K;

['debug', 'info', 'warn', 'error'].forEach(function(name) {
  Logger.prototype[name] = function() {
    var args = slice.call(arguments);
    this.willLog && this.willLog(args); // A hook for modifying args before they're logged
    return this.minilog[name].apply(this.minilog, args);
  };
});

Logger.prototype.log = Logger.prototype.info;

Logger.prototype.time = function(label) {
  timeCache[label] = getTime();
};

Logger.prototype.timeEnd = function(label) {
  var start = timeCache[label];
  if (typeof start === 'number') {
    this.info('%@: %@ (ms)'.fmt(label, getTime() - start));
  }
};

Logger.prototype.timeStamp = tryConsole.bind(console, 'timeStamp');

// For the group functions, send something to Minilog that we can read as a group
['group', 'groupEnd', 'groupCollapsed'].forEach(function(name) {
  Logger.prototype[name] = function(label) {
    this.info('%@:%@'.fmt(name, label));
    return tryConsole(name, label);
  };
});

Logger.prototype.benchmark = function(name, fn) {
  var args = slice.call(arguments, 2),
      start, result;
  start = getTime();
  this.timeStamp(name);
  result = fn.apply(null, args);
  this.info(name, '%@ (ms)'.fmt(getTime() - start));
  return result;
};

Logger.logger = Object.freeze(new Logger());

module.exports = Logger;
},
"app_i18n.js": function(module, exports, require){
/*globals */
var $          = require('jquery'),
    Handlebars = require('handlebars'),
    Em         = require('ember'),
    Support    = require('support'),
    get        = Support.get,
    set        = Support.set;

function AppI18n(app) { this.app = app; }

$.extend(AppI18n.prototype, {

  t: function(key, context) {
    return this._template(key)(context);
  },

  _template: function(key) {
    var templatePath = 'app.translations.%@'.fmt(key),
        template     = get(this, templatePath);
    if (template == null) { template = "Missing translation: %@".fmt(key); }
    if (!$.isFunction(template)) {
      template = Handlebars.compile(template);
      set(this, templatePath, template);
    }
    return template;
  }

});

module.exports = AppI18n;
},
"app_scope.js": function(module, exports, require){
var $              = require('jquery'),
    TicketField    = require('wrappers/ticket_field'),
    TicketType     = require('wrappers/ticket_type'),
    TicketPriority = require('wrappers/ticket_priority'),
    TicketStatus   = require('wrappers/ticket_status'),
    CoreServices   = require('core_services'),
    Helpers        = require('helpers');

module.exports = {
  require:      undefined,
  'undefined':  undefined,
  document:     undefined,
  window:       undefined,
  jQuery:       undefined,
  $:            undefined,
  Ember:        undefined,
  Em:           undefined,
  Zendesk:      undefined,
  Zd:           undefined,

  JSON: {
    parse:      $.proxy( JSON.parse, JSON ),
    stringify:  $.proxy( JSON.stringify, JSON )
  },

  TicketField: Object.freeze( TicketField ),
  TicketType: Object.freeze( TicketType ),
  TicketPriority: Object.freeze( TicketPriority ),
  TicketStatus: Object.freeze( TicketStatus ),

  services: Object.freeze( CoreServices ),
  helpers:  Object.freeze( Helpers )
};
},
"helpers/t.js": function(module, exports, require){
var AppHelpers = require('app_helpers');

module.exports = function() {
  return function(key, options) {
    return AppHelpers.currentApp.I18n.t(key, options.hash);
  };
};
},
"events/dom.js": function(module, exports, require){
var $            = require('jquery'),
    Support      = require('support'),
    Event        = require('events/event'),
    extendSafely = Support.extendSafely,
    get          = Support.get;

function DOMEvent() {}

extendSafely(DOMEvent.prototype, Event, {

  // private

  wrapHandler: function(handler) {
    var state   = this.descriptor.state,
        app     = this.app;

    return this._super(function() {
      if(!state || (state === get(app, 'currentState'))) {
        return handler.apply(app, arguments);
      }
    });
  },

  // public

  init: function(app, descriptor, handler, view) {
    this._super.apply(this, arguments);
    this.bind(view);
  },

  bind: function(view) {
    var descriptor = this.descriptor,
        eventName = descriptor.name.replace(/\S+\b/g, function(m) { return m+".appview"; }),
        selector = descriptor.selector,
        handler = this.wrappedHandler;

    if (selector === "" || (view.$().is(selector) && !view.$(selector).length)) {
      view.$().on(eventName, handler);
    } else {
      view.$().on(eventName, selector, handler);
    }
  }

});

module.exports = DOMEvent;
},
"events/hook.js": function(module, exports, require){
var $            = require('jquery'),
    Event        = require('events/event'),
    Support      = require('support'),
    extendSafely = Support.extendSafely,
    runLater     = Support.runLater,
    get          = Support.get;

function HookEvent() {}

extendSafely(HookEvent.prototype, Event, {

  // public

  run: function() {
    var app = this.app,
        result = this.wrappedHandler();
    if (result && typeof result.then === 'function') {
      var promiseWithApp = $.Deferred();
      result.then(
        promiseWithApp.resolve.bind(promiseWithApp),
        function(message) {
          promiseWithApp.reject({
            message: message,
            title:   app.setting('title')
          });
        }
      );
      return promiseWithApp;
    }
    var dfd = $.Deferred(),
        isFalsy = result === false || result instanceof Error || typeof result === 'string';
    return $.when(isFalsy ? dfd.reject({ message: result, title: app.setting('title') }) : dfd.resolve());
  },

  init: function() {
    this._super.apply(this, arguments);
    get(this.app, 'host.hooks').pushObject(this);
  }

});

module.exports = HookEvent;
},
"0_5/request.js": function(module, exports, require){


var $       = require('jquery'),
    Request = require('request');

function Request_v0_5(name, options, app) {
  Request.call(this, name, options, app);
}

Request_v0_5.prototype = new Request();

Request_v0_5.prototype._mungeOptionsForProxy = function(options) {
  var result      = $.extend({}, options),
      originalUrl = options.url;

  if (options.proxy_v2) {
    var isGet = (options.type === undefined || options.type === 'GET'),
        divider;

    if (isGet && options.data) {
      divider = originalUrl.indexOf('?') > 0 ? '&' : '?';
      originalUrl += (divider + decodeURIComponent($.param(options.data)));
    }
    result.url = "/proxy/to/%@".fmt(encodeURIComponent(originalUrl));
  } else {
    var isPost         = (options.type === 'POST' || options.type === 'PUT'),
        dataType       = options.dataType,
        destinationUrl = "/proxy/direct?url=%@&timeout=10";

    if (dataType != null && dataType.toLowerCase() === 'json') {
      if (isPost) {
        result.data = "body=%@".fmt(encodeURIComponent(JSON.stringify(options.data)));
        result.processData = false;
      }
      destinationUrl += "&contenttype=application/json";
    } else if (isPost && dataType != null && dataType.toLowerCase() === 'xml') {
      result.data = "body=%@".fmt(encodeURIComponent(options.data));
      result.processData = false;
    }

    result.url = destinationUrl.fmt(encodeURIComponent(originalUrl));
  }

  return result;
};

module.exports = Request_v0_5;
},
"app_helpers.js": function(module, exports, require){
var $          = require('jquery'),
    Handlebars = require('handlebars'),
    Logger     = require('log/base'),
    AppHelpers = $.extend({}, Handlebars.helpers, { currentApp: null, t: null }),
    logger     = new Logger('app-helpers'),
    slice      = Array.prototype.slice;

function lookupHelper(name) {
  var helper;
  try {
    helper = require('helpers/%@'.fmt(name.underscore()))();
  } catch(err) {
    helper = null;
  }
  return helper;
}

var helperMissing = AppHelpers.helperMissing;
AppHelpers.helperMissing = function(name) {
  var args = slice.call(arguments);
  return logger.benchmark('helperMissing', function() {
    var helper = lookupHelper(name);
    if (helper) {
      AppHelpers[name] = helper;
      return helper.apply(this, args.slice(1));
    }
    return helperMissing.apply(this, args);
  }.bind(this));
};

// Pre-register the 'getter' helpers that lookup the App
// All of these helpers should receive only one parameter
// when invoked. This is important for methods like `store` that
// behave like a setter when supplied with multiple arguments
['assetURL', 'setting', 'store'].forEach(function(helperName) {
  AppHelpers[helperName] = function(name) {
    return AppHelpers.currentApp[helperName](name);
  };
});

module.exports = AppHelpers;
},
"events/event.js": function(module, exports, require){
var $             = require('jquery'),
    Em            = require('ember'),
    Support       = require('support'),
    invokeInApp   = Support.invokeInApp,
    get           = Support.get,
    stateRefRegex = /^%([a-zA-Z0-9]+)$/,
    eventSplitter = /^([a-zA-Z(\*\.)](?:[a-zA-Z0-9\._,\-]+))\s*(.*)$/;

// Helpers

var parseEventName = function(event) {
  var eventName = {}, selector;

  var match = event.match(eventSplitter);
  eventName.name = match[1].replace(/,/g," ");
  selector = match[2];

  match = selector.match(stateRefRegex);
  if(match) {
    eventName.state    = match[1];
  } else {
    eventName.selector = selector;
  }

  return eventName;
};

var resolveHandler = function(handlerName, app) {
  if(Em.typeOf(handlerName) === "function") {
    return handlerName;
  }

  var match = handlerName.match(stateRefRegex);

  if(match) {
    return function() {
      app.switchTo(match[1]);
    };
  } else {
    return get(app, handlerName);
  }
};

// Event class

function Event() {}
Event.prototype = {

  _initialised: false,

  init: function(app, descriptor, handler) {
    if (this._initialised) { return; }
    this._initialised = true;
    this.app = app;
    var customFieldPlaceholderMatch = descriptor.match(/custom_field_(\{\{(.+)\}\})/);
    if (customFieldPlaceholderMatch && app.settings[customFieldPlaceholderMatch[2]]) {
      descriptor = descriptor.replace(customFieldPlaceholderMatch[1], app.settings[customFieldPlaceholderMatch[2]]);
    }
    this.descriptor = parseEventName(descriptor);
    var resolvedHandler = resolveHandler(handler, app);
    this.wrappedHandler = this.wrapHandler(resolvedHandler);
  },

  destroy: function() {
    this._initialised    = false;
    this.app             = null;
    this.wrappedHandler = null;
  },

  wrapHandler: function(handler) {
    return invokeInApp.bind(null, this.app, handler);
  }

};

module.exports = Event;
},
"installed_app.js": function(module, exports, require){
var _                    = require('underscore'),
    Support              = require('support'),
    DataStore            = require('storage'),
    logger               = require('log/base').logger,
    get                  = Support.get,
    set                  = Support.set,
    installedApps        = {},
    installedAppsForSite = {},
    InstalledApp;

function InstalledApp(appClass, installation) {
  this.appClass     = appClass;
  this.installation = installation;
  this.settings     = installation.settings;
  this.site         = this.appClass.location;
  this.active       = true;
  this.dataStore    = new DataStore(installation.id);
  this.updated      = installation.updated;
}

InstalledApp.prototype = {
  exit: function() {
    this.active = false;
    // This would ensure the list would be rebuilt for the site *if* an app was deactivated
    delete installedAppsForSite[this.site];
  }
};

InstalledApp.sortAppsForSite = function(site, installationIds) {
  installedAppsForSite[site] = _.reduce(installationIds, function(memo, id) {
    installedApps[id] && memo.push(installedApps[id]);
    return memo;
  }, []);
};

InstalledApp.forSite = function(site) {
  var installationsCache = installedAppsForSite[site];

  if (!installationsCache) {
    installationsCache = _.filter(installedApps, function(app) {
      if (!app.active) return false;
      if (_.isArray(app.site)) { return _.contains(app.site, site); }
      return app.site === site;
    });

    installedAppsForSite[site] = installationsCache;
  }

  return installationsCache;
};

InstalledApp.push = function(app, installationData) {
  var installedApp = new InstalledApp(app, installationData);
  installedApps[installationData.id] = installedApp;
};

InstalledApp.count = function() {
  return Object.keys(installedApps).filter(function(id) {
    return installedApps[id] instanceof InstalledApp;
  }).length || 0;
};

InstalledApp.clear = function() {
  installedApps        = {};
  installedAppsForSite = {};
};

module.exports = InstalledApp;
},
"core_services.js": function(module, exports, require){
/*globals Zendesk*/
var $               = require('jquery'),
    AppsTrayWrapper = require('wrappers/apps_tray'),
    get             = require('support').get;

/// Apps have access to some services through `services`.
///
/// ### services.notify(message, kind)
///
/// Show a notification message to the user. This API is available to all apps.
///
/// #### Arguments
///  * `kind` one the following values: `notice`, `alert`, `error`, defaulting to `notice` if you don't specify.
///
/// #### Example
///
/// ```javascript
/// services.notify("Bookmark added!");
/// ```
///
/// @import lib/wrappers/apps_tray.js

module.exports = {
  appsTray: function() {
    var controller = get(Zendesk, 'appsController');
    return new AppsTrayWrapper(controller);
  },

  notify: function(message, kind) {
    kind = kind || 'notice';
    $.jGrowl(message, { themeState: kind, life: 4000 });
  }
};
},
"app_view/base.js": function(module, exports, require){
var _            = require('underscore'),
    Em           = require('ember'),
    Support      = require('support'),
    EventFactory = require('events/event_factory'),
    invokeInApp  = Support.invokeInApp,
    get          = Support.get,
    set          = Support.set;

var AppView = Em.Mixin.create({
  canvas: function() {
    return get(this, 'element');
  }.property('element').cacheable(),

  didInsertElement: function() {
    var logger = get(this, 'app.logger');
    return logger.benchmark('didInsertElement', function() {
      this.bindEvents(this);
      this.switchToDefaultState();

      return this._super.apply(this, arguments);
    }.bind(this));
  },

  bindEvents: function(target) {
    var app             = get(this, 'app'),
        events          = get(this, 'app.events') || {},
        processedEvents = get(this, 'app.processedEvents') || [],
        key;

    for(key in events) {
      if(!events.hasOwnProperty(key)) { continue; }
      processedEvents.push(EventFactory.eventFor(app, key, events[key], target));
    }

    set(this, 'app.processedEvents', _.uniq(processedEvents));
  },

  switchToDefaultState: function() {
    var app = get(this, 'app'),
        defaultState = get(this, 'app.defaultState');

    if (defaultState) {
      invokeInApp(app, app.switchTo.bind(app, defaultState));
    }
  }

});

module.exports = AppView;
},
"events/request.js": function(module, exports, require){
var $        = require('jquery'),
    DOMEvent = require('events/dom'),
    Support  = require('support'),
    extendSafely = Support.extendSafely;

function RequestEvent(app, descriptor, handler) {
}

extendSafely(RequestEvent.prototype, DOMEvent, {

  wrapHandler: function(handler) {
    var app = this.app;
    return this._super(function(evt) {
      handler.apply(app, evt.responseArgs);
    });
  }

});

module.exports = RequestEvent;
},
"helpers/zd_menu.js": function(module, exports, require){
var $                      = require('jquery'),
    Handlebars             = require('handlebars'),
    compiled               = require('templates/zd_menu.hdbs');

// "search" type is disabled until it becomes possible to access the menu utils
// in a better way than by requiring from the Lotus cache directly
var validTypes = {
  select:       true,
  combo_select: true,
  search:       false
};

function normalizeMenuType(type) {
  if (!validTypes[type]) return 'select';
  return type;
}

module.exports = function() {
  return function(content, options) {
    var type = normalizeMenuType(options.hash.type),
        data = $.extend({}, options, { options: content, type: type });
    return new Handlebars.SafeString(compiled(data));
  };
};
},
"helpers/spinner.js": function(module, exports, require){
var _          = require('underscore'),
    Handlebars = require('handlebars');

module.exports = function() {
  return function(key) {
    if (_.isObject(key)) { key = "dotted"; }
    return new Handlebars.SafeString('<div class="spinner %@"></div>'.fmt(key));

  };
};
},
"app_view/default.js": function(module, exports, require){
var Em = require('ember'),
    _ = require('underscore'),
    AppView = require('app_view/base'),
    get = require('support').get;

var DefaultAppViewClass = Em.View.extend(AppView, {
  render: function(buffer) {
    var app = get(this, 'app');
    if (_.isEmpty(app.templates)) { return; }
    buffer.push(app.renderTemplate('layout'));
  }
}).reopenClass({ preservesContext: true });

module.exports = DefaultAppViewClass;
},
"app_container/bar.js": function(module, exports, require){
var $            = require('jquery'),
    Em           = require('ember'),
    AppContainer = require('app_container/base'),
    Support      = require('support'),
    get          = Support.get,
    runLater     = Support.runLater;

module.exports = Em.Mixin.create(AppContainer, {

  activeAppView: null,

  activateAppView: function(appView, data) {
    if (appView === this.get('activeAppView')) { return; }
    this.deactivateAppView();
    appView.get('app').trigger('pane.activated', data);
    this.set('activeAppView', appView);
  },

  deactivateAppView: function() {
    var activeAppView = this.get('activeAppView');
    if (!activeAppView) { return; }
    activeAppView.get('app').trigger('pane.deactivated');
    this.set('activeAppView', null);
  },

  didInsertElement: function() {
    runLater(this, function() {
      this.didActivate();
    });
    return this._super.apply(this, arguments);
  },

  removeApps: function() {
    this.deactivateAppView();
    this._super();
  },

  willDestroyElement: function() {
    this.didDeactivate();
  },

/// #### this.setIconState(state, assetPath)
///
/// Sets the path of the icon for a given state.
///
/// ##### Arguments
///
///  * `state` the state you would like to set the icon for. This can be `active`, `inactive` or `hover`.
///
///  * `assetPath` the path to your icon. You can pass the value returned from the `assetURL` helper or an absolute URL.
///
/// Example:
///
/// ```javascript
///   this.setIconState('active', this.assetURL('selectedIcon.png'));
///   this.setIconState('inactive', this.setting('inactiveIconURL'));
///   this.setIconState('hover', 'https://yourdomain.com/path/to/hoverIcon.png');
/// ```

  containerMethods: function() {
    var host = this;
    return $.extend({}, this._super(), {
      setIconState: function(state, assetPath) {
        if (state && assetPath) {
          host.getAppView(this).setIconState(state, assetPath);
        }
      }
    });
  }
});
},
"wrappers/apps_tray.js": function(module, exports, require){
/*globals $, ZendeskApps*/

var get = require('support').get;

/// ### appsTray
///
/// Access to the tray which apps are located.
///
/// #### appsTray.hide()
/// Hides the tray.
///
/// ```javascript
/// var tray = services.appsTray();
/// tray.hide();
/// ```
///
/// #### appsTray.isVisible()
/// Show current Apps tray state.
///
/// ```javascript
/// var tray = services.appsTray();
/// tray.isVisible(); // true
/// ```
///
/// #### appsTray.show()
/// Shows the tray.
///
/// ```javascript
/// var tray = services.appsTray();
/// tray.show();
/// ```
///
var AppsTrayWrapper = function(controller) {
  this.hide = function() {
    controller.hideApps();
    return this;
  };

  this.isVisible = function() {
    return controller.get('isActive');
  };

  this.show = function() {
    controller.showApps();
    return this;
  };

  Object.freeze(this);
};

module.exports = AppsTrayWrapper;
},
"app_container/user.js": function(module, exports, require){
var $                   = require('jquery'),
    Em                  = require('ember'),
    Support             = require('support'),
    get                 = Support.get,
    USER_SIDEBAR_SITE   = require('site').USER_SIDEBAR,
    SidebarAppContainer = require('app_container/sidebar'),
    UserWrapper         = require('wrappers/user_wrapper'),
    GroupWrapper        = require('wrappers/group_wrapper'),
    UserFieldWrapper    = require('wrappers/user_field_wrapper');

var UserAppContainer = Em.Mixin.create(SidebarAppContainer, {

  site: USER_SIDEBAR_SITE,

  _user: function() {
    var emUser = get(this, 'user');
    if (!emUser) { return null; }
    return new UserWrapper(emUser);
  }.property('user').cacheable(),

  _userFields: function() {
    return (get(this, 'userFieldViews') || [])
      .filterProperty('isDestroyed', false)
      .map(function(userField) {
        return new UserFieldWrapper(userField);
      });
  }.property('userFieldViews.@each.isDestroyed').cacheable(),

  containerMethods: function() {
    var host = this;
    return $.extend({}, this._super(), {
      user: function() {
        return get(host, "_user");
      },
      groups: function() {
        return get(host, "_user").groups();
      },
      userFields: function(name) {
        if (name !== undefined) {
          return get(host, '_userFields').find(function(field) {
            return field.name() === name;
          });
        } else {
          return get(host, "_userFields");
        }
      }
    });
  },

  init: function() {
    this._super();
    this.appContext = this.containerMethods();
  },

  eventPaths: {
    'user.name': 'user.name',
    'user.role': 'user.role'
  }

});

module.exports = UserAppContainer;
},
"app_container/base.js": function(module, exports, require){
/*globals Em*/
var $                           = require('jquery'),
    _                           = require('underscore'),
    Zendesk                     = require('zd'),
    Support                     = require('support'),
    Helpers                     = require('helpers'),
    get                         = Support.get,
    set                         = Support.set,
    setPath_p                   = Support.setPath_p,
    runLater                    = Support.runLater,
    AccountWrapper              = require('wrappers/account_wrapper'),
    UserWrapper                 = require('wrappers/user_wrapper'),
    DeferredActivationViewMixin = require('lib/views/deferred_activation_view_mixin'),
    RunningAppsManager          = require('running_apps_manager'),
    DefaultAppViewClass         = require('app_view/default'),
    InstalledApp                = require('installed_app'),
    Reloader                    = require('reloader'),
    Logger                      = require('log/base'),
    logger                      = new Logger('app-container'),
    currentUserGroupsPromise    = false;

function flattenWrappers(wrappers) {
  wrappers.forEach(function(elem, index) {
    if (Em.typeOf(elem) === 'object') {
      _.keys(elem).forEach(function(field) {
        if (elem[field].call != null) {
          elem[field] = elem[field].call(field);
        }
      });
    }
  });

  return wrappers;
}

// To be mixed in to views that are app container views
module.exports = Em.Mixin.create(DeferredActivationViewMixin, {

  isActive: false,

  site: Em.required(),

  appsController: null,

  appsManager: null,

  appViewClass: DefaultAppViewClass,

  init: function() {
    set(this, 'appsManager', new RunningAppsManager(this));
    set(this, 'context', {});
    set(this, 'eventContext', {});
    set(this, 'hooks', []);
    return this._super();
  },

  runHooksFor: function(type) {
    var hooksCopy = get(this, 'hooks').slice();
    if (type) {
      hooksCopy = hooksCopy.filter(function(hook) {
        return get(hook, 'descriptor.name') === type;
      });
    }
    return $.when.apply($, hooksCopy.map(function(hook) { return hook.run(); }));
  },

  _didActivate: function() {
    if(!get(this, 'appsLoaded')) {
      get(this, 'appsManager').launchApps();
      this.addEmptyViewIfNoVisibleApps();
      set(this, 'appsLoaded', true);
    } else {
      get(this, 'appsManager').notifyApps("app.activated", { firstLoad: false });
    }
    set(this, 'isActive', true);
  },

  didDeactivate: function() {
    if (!get(this, 'isActive')) { return; }
    get(this, 'appsManager').notifyApps("app.deactivated");
    this.resetActivationState();
    set(this, 'isActive', false);
  },

  removeApps: function() {
    this.didDeactivate();
    get(this, 'appsManager').removeApps();
    set(this, 'eventContext', {});
    this.removeEmptyView();
    set(this, 'appsLoaded', false);
    set(this, 'hooks', []);
  },

  reloadApps: function() {
    var isActive = get(this, 'isActive');
    this.removeApps();
    get(this, 'appsManager').reloadAllApps(function() {
      isActive && this.didActivate();
    }.bind(this));
  },

  willDestroy: function() {
    get(this, 'appsManager').destroy();
    this._super.apply(this, arguments);
  },

  didInsertElement: function() {
    return logger.benchmark('didInsertElement %@'.fmt(get(this, 'site')), function() {
      this._setupObservers();
      this.updateContainerContext();
      return this._super.apply(this, arguments);
    }.bind(this));
  },

  addEmptyViewIfNoVisibleApps: function() {
    if ( get(this, 'appsManager').hasVisibleApps() ) { return; }

    var emptyViewClass = get(this, 'emptyViewClass');
    if ( emptyViewClass == null ) { return; }

    var view = this.createChildView(emptyViewClass.create());
    get(this, 'childViews').pushObject(view);
  },

  removeEmptyView: function() {
    var emptyView, emptyViewClass = get(this, 'emptyViewClass');

    if (emptyViewClass) {
      emptyView = get(this, 'childViews').find(function(v) {
        return emptyViewClass.detectInstance(v);
      });

      if(emptyView) {
        emptyView.destroy();
      }
    }
  },

  createViewForApp: function(app) {
    var view = app.logger.benchmark('createAppView', this.createAppView.bind(this, app));

    set(view, 'app', app);

    app.$ = function(sel) {
      var elem = get(view, 'canvas');
      return (elem && sel) ? Em.$(sel, elem) : Em.$(elem);
    };

    get(this, 'childViews').pushObject(view);

    return view;
  },

  createAppView: function(app) {
    var appViewClass = get(this, 'appViewClass'),
        locationClass = "apps_" + get(this, 'site'),
        // TODO: context should be rendered for the target canvas
        viewOptions = app._renderContext({
        classNames: [ get(app, 'appClassName'), locationClass, 'app_view' ],
        events:     get(app, 'events')
      });

    if (app._isNoTemplate()) {
      viewOptions.classNames.push('hidden');
    }

    return this.createChildView(appViewClass, viewOptions);
  },

  getAppView: function(app) {
    var runningApp = get(this, 'appsManager').find(app);
    if (!runningApp) { return; }
    return runningApp.view;
  },

  _getAppTarget: function(runningAppView) {
    if ( !runningAppView ) { return; }
    var target = get(runningAppView, 'target');
    // TODO: should not return view if app is supposed to have a target
    if ( !target ) { return runningAppView; }
    return target;
  },

  // Delay event until view state is inDOM (currently, when bootApp fires app.activated app view state is preRender, even after runLater)
  callWhenViewIsReady: function(app, callback) {
    // If event was triggered after host was destroyed (deactivated), ignore it
    if ( this.get('state') !== 'inDOM' ) { return; }

    var runningAppView = this.getAppView(app),
        targetView = this._getAppTarget(runningAppView);

    if ( !targetView ) { return; }
    if ( get(targetView, 'state') !== 'inDOM' ) {
      runLater(this, 'callWhenViewIsReady', app, callback);
      return;
    }

    callback(runningAppView);
  },

  _currentAccount: function() {
    if ( !get(this, 'currentAccount') ) { return null; }
    return new AccountWrapper(get(this, 'currentAccount'));
  }.property('currentAccount').cacheable(),

  _currentUser: function() {
    if ( !get(this, 'currentUser') ) { return null; }
    return new UserWrapper(get(this, 'currentUser'));
  }.property('currentUser').cacheable(),

  addContainerMethods: function(app) {
    $.extend(app, this.containerMethods());
  },

  containerMethods: function() {
    var host = this;
    return {
      currentAccount: function() {
        return get(host, '_currentAccount');
      },
      currentUser: function() {
        return get(host, '_currentUser');
      },
      containerContext: function() {
        host.updateContainerContext();
        return host.context;
      },
      currentLocation: function() {
        return get(host, 'site');
      }
    };
  },

  readyToActivate: function() {
    currentUserGroupsPromise = currentUserGroupsPromise || get(this, 'currentUser.groups').fetch();
    return $.when(this._super(), currentUserGroupsPromise);
  },

  updateContainerContext: function() {
    for(var key in this.eventPaths) {
      if(!this.eventPaths.hasOwnProperty(key)) { continue; }
      setPath_p(this.context, key, this.valueForPath(key));
    }
  },

  valueForPath: function(path) {
    var value = this.appContext;
    path.split(".").forEach(function(part) {
      if ( !value ) { return; }
      if ( part.match(/^custom_field_/) ) {
        value = value.customField(part);
      } else {
        value = value[part].call(part);
      }
    });

    //TODO: Current implementation limitation: array fields only work if is last part of path
    if (Em.isArray(value)) {
      value = flattenWrappers(value);
    }

    return value;
  },

  _setupObservers: function() {
    var self = this, invoker, observers = {}, name, path, eventPaths = this.eventPaths || {};

    Object.keys(eventPaths).forEach(function(name) {
      $.makeArray(self.eventPaths[name]).forEach(function(path) {
        invoker = self._makeObserver(name, path);

        observers[path] = invoker;

        Em.addObserver(self, path, invoker);
        invoker();
      });
    });

    set(this, 'dependencyObservers', observers);
  },


  _makeObserver: function(key, path) {
    var self = this;
    return function() {
      Em.run.once(function() {
        if (get(self, 'appsManager').length() === 0) { return; }
        var currentValue, newValue;

        currentValue = get(self.eventContext, key);
        newValue = self.valueForPath(key);

        if (!self._isEqual(currentValue, newValue)) {
          setPath_p(self.eventContext, key, newValue);
          get(self, 'appsManager').notifyApps('%@.changed'.fmt(key), newValue);
          get(self, 'appsManager').notifyApps('*.changed', {
            propertyName : key,
            newValue     : newValue
          });
        }
      });
    };
  },

  _isEqual: function(value1, value2) {
    if(Em.isArray(value1) && Em.isArray(value2)) {
      return $(value1).not(value2).length === 0 && $(value2).not(value1).length === 0;
    } else {
      return value1 == value2;
    }
  },

  destroy: function() {
    var observers = get(this, 'dependencyObservers'), path;
    for(path in observers) {
      Em.removeObserver(this, path, observers[path]);
    }

    return this._super.apply(this, arguments);
  },

  // Change the browser's path. `path` will be URL-encoded and prefixed
  // with `#/`. For example, to go to ticket number 123, call
  // `goToPath('tickets/123')`.

  // @api public
  goToPath: function(path) {
    Zendesk.Routes.setLocation("#/%@".fmt(encodeURI(path)));
  }
});
},
"events/notification.js": function(module, exports, require){
var _                   = require('underscore'),
    Event               = require('events/event'),
    NotificationManager = require('notification_manager'),
    extendSafely        = require('support').extendSafely,
    get                 = require('support').get;

function NotificationEvent() {}

extendSafely(NotificationEvent.prototype, Event, {

  // Public

  init: function(app, descriptor, handler) {
    this._super.apply(this, arguments);
    this._descriptorHandler = function(msg) {
      if (descriptor.slice(descriptor.indexOf('.') + 1) === msg.key) {
        this.wrappedHandler(msg.value);
      }
    }.bind(this);
    NotificationManager.subscribe(app, this._descriptorHandler);
  },

  destroy: function() {
    NotificationManager.unsubscribe(this.app, this._descriptorHandler);
    this._descriptorHandler = null;
    this._super();
  },

  // Private

  wrapHandler: function(handler) {
    var app = this.app;

    return this._super(function(msg) {
      var parsedMsg;
      try {
        parsedMsg = JSON.parse(msg);
      } catch(err) {
        parsedMsg = msg;
      }

      handler.call(app, parsedMsg);
    });
  }

});

module.exports = NotificationEvent;
},
"templates/zd_menu.hdbs": function(module, exports, require){
var Handlebars = require('handlebars');
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, tmp1, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n  <option";
  stack1 = helpers.id || depth0.id
  stack2 = helpers['if']
  tmp1 = self.program(2, program2, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  stack1 = helpers.value || depth0.value
  stack2 = helpers['if']
  tmp1 = self.program(4, program4, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">";
  stack1 = helpers.label || depth0.label
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "label", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</option>\n";
  return buffer;}
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += " id=\"";
  stack1 = helpers.id || depth0.id
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "id", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\"";
  return buffer;}

function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += " value=\"";
  stack1 = helpers.value || depth0.value
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "value", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\"";
  return buffer;}

  buffer += "<select data-zd-type=\"";
  stack1 = helpers.type || depth0.type
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "type", { hash: {} }); }
  buffer += escapeExpression(stack1) + "_menu\">\n";
  stack1 = helpers.options || depth0.options
  tmp1 = self.program(1, program1, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, tmp1); }
  else { stack1 = blockHelperMissing.call(depth0, stack1, tmp1); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</select>\n";
  return buffer;});
},
"running_apps_manager.js": function(module, exports, require){
var _               = require('underscore'),
    InstalledApp    = require('installed_app'),
    Reloader        = require('reloader'),
    Support         = require('support'),
    Helpers         = require('helpers'),
    AppLogger       = require('log/app'),
    Logger          = require('log/base'),
    get             = Support.get,
    set             = Support.set,
    logger          = new Logger('running-apps-manager'),
    totalAppsBooted = 0;

function RunningApp(installation) {
  this.app = new installation.appClass({});
  this.installation = installation;
}

RunningApp.prototype = {
  bootApp: function(manager) {
    var app = this.app,
        installation = this.installation;

    app.helpers = Helpers;
    app.installation = installation;
    app.settings = installation.settings;
    app.logger = new AppLogger(app);
    app.host = manager.host;

    app.host.addContainerMethods(app);
    this.view = app.host.createViewForApp(app);

    app.trigger('app.activated', { firstLoad: true });
    //backwards compatibility
    app.launch(manager, installation.settings);

    totalAppsBooted++;

    if (InstalledApp.count() === totalAppsBooted) {
      Logger.logger.timeEnd('Initialize Apps');
    }
  },

  destroyEvents: function() {
    if (_.isArray(this.app.processedEvents)) {
      var processedEvents = this.app.processedEvents.slice(),
          evt;
      this.app.processedEvents.clear();
      _.invoke(processedEvents, 'destroy');
    }
  },

  exit: function() {
    if (!this.view) { return; }

    this.app.trigger('app.willDestroy');
    this.app.logger.clear();
    this.destroyEvents();

    var target = get(this.view, 'target');
    target && target.destroy();

    this.view.destroy();
  }
};

function RunningAppsManager(host) {
  this.host = host;
  get(host, 'appsController').addObject(this);
  set(this, '_runningApps', []);
}

RunningAppsManager.prototype = {
  length: function() {
    return get(this, '_runningApps').length || 0;
  },

  appInstallations: function() {
    var site = get(this.host, 'site');
    return InstalledApp.forSite(site);
  },

  launchApps: function() {
    logger.benchmark('launchApps', function() {
      this.appInstallations().forEach(function(installation) {
        if (!installation.active) { return; }
        this._launchApp(installation);
      }, this);
    }.bind(this));
  },

  _launchApp: function(installation) {
    var runningApp = new RunningApp(installation);
    get(this, '_runningApps').pushObject(runningApp);
    logger.benchmark('bootApp', runningApp.bootApp.bind(runningApp, this));
  },

  hasVisibleApps: function() {
    return _(get(this, '_runningApps')).any(function(running) {
      return !running.app._isNoTemplate();
    });
  },

  find: function(app) {
    return get(this, '_runningApps').find(function(running) {
      return running.app === app;
    });
  },

  notifyApps: function(eventName, data) {
    get(this, '_runningApps').forEach(function(running) {
      running.app.trigger(eventName, data);
    });
  },

  reloadAllApps: function(callback) {
    InstalledApp.clear();
    Reloader.reload(callback);
  },

  removeApps: function() {
    var runningApps = get(this, '_runningApps');
    runningApps.forEach(function(running) {
      running.exit();
    });
    runningApps.clear();
  },

  destroy: function() {
    get(this.host, 'appsController').removeObject(this);
  }

};

module.exports = RunningAppsManager;
},
"events/event_factory.js": function(module, exports, require){
var _                 = require('underscore'),
    Event             = require('events/event'),
    DOMEvent          = require('events/dom'),
    RequestEvent      = require('events/request'),
    NotificationEvent = require('events/notification'),
    HookEvent         = require('events/hook'),
    get               = require('support').get;

var Hook = {
  TICKET_SAVE: 'ticket.save',
  is: function(descriptor) {
    return _.contains(_.values(this), descriptor);
  }
};

var eventClassMap = {
  'dom':          DOMEvent,
  'request':      RequestEvent,
  'hook':         HookEvent,
  'notification': NotificationEvent
};

var typeOf = function(desc) {
  var typeOf = 'dom';
  if (Hook.is(desc)) { typeOf = 'hook'; }
  if ((/\.(done|always|fail)$/).test(desc)) { typeOf = 'request'; }
  if ((/^notification\./).test(desc)) { typeOf = 'notification'; }
  return typeOf;
};

module.exports = Object.seal({

  // public

  eventFor: function(app, descriptor, handler) {
    var type       = typeOf(descriptor),
        eventClass = eventClassMap[type] || Event,
        event;
    if (type !== 'dom') {
      event = _.find(get(app, 'processedEvents'), function(evt) {
        return evt.descriptor.name === descriptor;
      });
    }
    if (!event) {
      event = new eventClass();
      event.init.apply(event, arguments);
    }
    return event;
  }
});
},
"wrappers/ticket_type.js": function(module, exports, require){
module.exports = {
  0: 'ticket',
  1: 'question',
  2: 'incident',
  3: 'problem',
  4: 'task',
  TICKET:   0,
  QUESTION: 1,
  INCIDENT: 2,
  PROBLEM:  3,
  TASK:     4
};
},
"notification_manager.js": function(module, exports, require){
var _            = require('underscore'),
    $            = require('jquery'),
    RadarClient  = require('radar_client'),
    get          = require('support').get,
    APPS_CHANNEL = 'apps_notifications';

function ScopeWrapper(key) {
  this._key    = key;
  this._length = 0;
}

_.extend(ScopeWrapper.prototype, {

  _key:       null,
  _callbacks: null,
  _length:    null,
  _scope:     null,

  // Public

  addCallback: function(cb) {
    var idle = this.length() === 0;
    if (!this._callbacks) {
      this._callbacks = $.Callbacks();
    }
    if (this._callbacks.has(cb)) { return false; }
    this._callbacks.add(cb);
    this._length++;
    if (idle) {
      this.on();
    }
    return true;
  },

  removeCallback: function(cb) {
    if (!this._callbacks.has(cb)) { return false; }
    if (this._callbacks.remove(cb)) {
      this._length--;
      if (!this.length()) {
        this.off();
      }
    }
    return true;
  },

  removeAllCallbacks: function() {
    this._callbacks.empty();
    this._length = 0;
  },

  length: function() {
    return this._length || 0;
  },

  on: function(cb) {
    this._getScope().done(function(scope) {
      scope.subscribe(cb);
    });
  },

  off: function(cb) {
    this._getScope().done(function(scope) {
      scope.unsubscribe(cb);
    });
  },

  // Private

  _getScope: function() {
    var dfd = $.Deferred();
    if (!this._scope) {
      RadarClient.alloc(APPS_CHANNEL, function() {
        this._scope = RadarClient.status(this._key);
        this._scope.on(this._eventEmitted.bind(this));
        dfd.resolveWith(this, [this._scope]);
      }.bind(this));
    } else {
      dfd.resolveWith(this, [this._scope]);
    }
    return dfd.promise();
  },

  _eventEmitted: function(msg) {
    this._callbacks.fire(msg);
  }

});

module.exports = Object.seal({

  _scopeWrappers: {},

  _getWrapper: function(to) {
    return (this._scopeWrappers[to] || (this._scopeWrappers[to] = new ScopeWrapper(to)));
  },

  subscribe: function(app, cb) {
    var scope = '%@/%@'.fmt(APPS_CHANNEL, get(app, 'installation.installation.app_id'));
    this._getWrapper(scope)
      .addCallback(cb);
    this._getWrapper('%@/%@'.fmt(scope, app.currentUser().id()))
      .addCallback(cb);
  },

  unsubscribe: function(app, cb) {
    var scope = '%@/%@'.fmt(APPS_CHANNEL, get(app, 'installation.installation.app_id'));
    this._getWrapper(scope)
      .removeCallback(cb);
    this._getWrapper('%@/%@'.fmt(scope, app.currentUser().id()))
      .removeCallback(cb);
  }

});
},
"app_container/ticket.js": function(module, exports, require){
var $                   = require('jquery'),
    Em                  = require('ember'),
    _                   = require('underscore'),
    Support             = require('support'),
    get                 = Support.get,
    TICKET_SIDEBAR_SITE = require('site').TICKET_SIDEBAR,
    SidebarAppContainer = require('app_container/sidebar'),
    CommentWrapper      = require('wrappers/comment_wrapper'),
    TicketWrapper       = require('wrappers/ticket_wrapper'),
    TicketFieldWrapper  = require('wrappers/ticket_field_wrapper');

var TicketAppContainer = Em.Mixin.create(SidebarAppContainer, {
  init: function() {
    this._super();
    this.deps = {};
    this.appContext = this.containerMethods();
  },

  site: TICKET_SIDEBAR_SITE,

  _comment: function() {
    if ( !get(this, 'ticket') || !get(this, 'ticketController') ) { return null; }
    return new CommentWrapper(get(this, 'ticket'), get(this, 'ticketController'));
  }.property('ticket', 'ticketController').cacheable(),

  _ticket: function() {
    if ( !get(this, 'ticket') ) { return null; }
    return new TicketWrapper(get(this, 'ticket'), get(this, 'ticketController'), get(this, 'ticketFields'), get(this, 'agreements'));
  }.property('ticket', 'ticketController', 'ticketFields', 'agreements').cacheable(),

  _ticketFields: function() {
    return this.get('ticketFieldViews')
      .filter(function(fieldView) {
        return !fieldView.get('isDestroyed');
      })
      .map(function(fieldView) {
        return new TicketFieldWrapper(fieldView);
      });
  }.property('ticketFieldViews.@each.isDestroyed').cacheable(),

  eventPaths: {
    'comment.text':                     'workspace.ticket.comment.body',
    'ticket.assignee.user.email':       'workspace.ticket.assignee.email',
    'ticket.assignee.user.externalId':  'workspace.ticket.assignee.external_id',
    'ticket.assignee.user.name':        'workspace.ticket.assignee.name',
    'ticket.assignee.user.id':          'workspace.ticket.assignee.id',
    'ticket.assignee.group.name':       'workspace.ticket.group.name',
    'ticket.collaborators':             'workspace.ticket.collaborators.@each',
    'ticket.description':               'workspace.ticket.description',
    'ticket.form.id':                   'workspace.ticketController.currentTicketFormId',
    'ticket.requester.email':           'workspace.ticket.requester.email',
    'ticket.requester.externalId':      'workspace.ticket.requester.external_id',
    'ticket.requester.name':            'workspace.ticket.requester.name',
    'ticket.requester.id':              'workspace.ticket.requester.id',
    'ticket.sharedWith':                [ 'workspace.ticket.agreementIdToShare', 'workspace.ticket.related.shared.@each' ],
    'ticket.status':                    'workspace.ticket.status_id',
    'ticket.tags':                      'workspace.ticket.tags.@each'
  },

  supportedEvents: {
    'ticket.assignee.group.id': { attributeName: 'group_id',       path: 'workspace.ticket.group.id' },
    'ticket.priority':          { attributeName: 'priority_id',    path: 'workspace.ticket.priority_id' },
    'ticket.subject':           { attributeName: 'subject',        path: 'workspace.ticket.subject' },
    'ticket.type':              { attributeName: 'ticket_type_id', path: 'workspace.ticket.ticket_type_id' }
  },

  containerMethods: function() {
    var host = this;
    return $.extend({}, this._super(), {
      comment: function() {
        return get(host, '_comment');
      },

      ticket: function() {
        return get(host, "_ticket");
      },

      ticketFields: function(name) {
        if(name !== undefined) {
          return get(host, '_ticketFields').find(function(field) {
            return field.name() === name;
          });
        } else {
          return get(host, '_ticketFields');
        }
      },

      disableSave: function() {
        var ticketController = get(host, 'ticketController');
        if(!ticketController) { return; }
        ticketController.set('submitButtonDisabled', true);
      },

      enableSave: function() {
        var ticketController = get(host, 'ticketController');
        if(!ticketController) { return; }
        ticketController.set('submitButtonDisabled', false);
      }

    });
  },

  didInsertElement: function() {
    // This should be executed before super (otherwise observers will be added before changing 'eventPaths')
    this._setupCustomFieldPaths();
    this._setupEventPaths();
    return this._super.apply(this, arguments);
  },

  _setupEventPaths: function() {
    var self = this, supportedEvents = get(this, 'supportedEvents'), ticketFields = get(this, 'ticketFields');
    _.each(supportedEvents, function(value, key) {
      if ( ticketFields && ticketFields.findProperty('attributeName', value.attributeName) ) {
        get(self, 'eventPaths')[key] = value.path;
      }
    });
  },

  _setupCustomFieldPaths: function() {
    var ticketFields = get(this, 'ticketFields') || [];
    ticketFields
      .filter(function(tf) { return (/^custom_field_/).test(get(tf, 'attributeName')); })
      .forEach(function(cf) {
      var attributeName = get(cf, 'attributeName'),
          eventPaths = get(this, 'eventPaths'),
          name = "ticket.%@".fmt(attributeName),
          path = "workspace.%@".fmt(name);
      eventPaths[name] = path;
    }, this);
  }

});

module.exports = TicketAppContainer;

},
"wrappers/user_wrapper.js": function(module, exports, require){
/*globals Zd*/
var $               = require('jquery'),
    Support         = require('support'),
    GroupWrapper    = require('wrappers/group_wrapper'),
    get             = Support.get,
    set             = Support.set,
    buildGetter     = require('wrappers/build_getter'),
    fetchAndExecute = require('wrappers/fetch_and_execute');

/// ### User Object
///
/// #### user.id()
/// Returns the user ID as an integer.
///
/// ```javascript
/// user.id();
/// ```
///
/// #### user.email()
/// Returns the user email as a string.
///
/// ```javascript
/// user.email();
/// ```
///
/// #### user.groups()
/// Returns the user groups as an array. If there are no groups available, an
/// empty array is returned.
///
/// ```javascript
/// user.groups();
/// ```
///
/// #### user.name()
/// Returns the user name as a string.
///
/// ```javascript
/// user.name();
/// ```
///
/// #### user.role()
/// Returns the user role as a string. Possible values are "end-user", "agent", "admin" or a custom role
/// id if the user has a custom role on the entreprise plan.
///
/// ```javascript
/// user.role();
/// ```
///
/// #### user.externalId()
/// Returns the user external ID as a string.
///
/// ```javascript
/// user.externalId();
/// ```
///
/// #### user.externalId(value)
/// Sets the user external ID.
/// This method immediately saves the changed user; it does not wait for the current ticket to be saved.
///
/// ```javascript
/// user.externalId('abc123');
/// ```
function UserWrapper(emUser) {
  this.id     = buildGetter(emUser, 'id');
  this.email  = buildGetter(emUser, 'email');
  this.name   = buildGetter(emUser, 'name');
  this.role   = buildGetter(emUser, 'getRole');

  this.externalId = function(val) {
    if ( val !== undefined ) {
      // Setter: saves user immediately, as saving associations when saving ticket
      // (after submit) isn't supported
      fetchAndExecute(Zd.User, get(emUser, 'id'), function(user) {
        set(emUser, 'external_id', val);
        emUser.save().done( $.proxy(emUser.fetch, emUser) );
      });
      return this;
    }
    return get(emUser, 'external_id');
  };

  this.groups = function() {
    var emGroups = get(emUser, 'groups');
    if (!emGroups) { return null; }
    return emGroups.map(function(group) {
      return new GroupWrapper(group);
    });
  };
}

module.exports = UserWrapper;
},
"app_container/sidebar.js": function(module, exports, require){
/*globals Em*/
var $                     = require('jquery'),
    AppContainer          = require('app_container/base'),
    AppContainerHostView  = require('app_container/host_view'),
    Support               = require('support'),
    get                   = Support.get,
    runLater              = Support.runLater;

var SidebarAppContainer = Em.Mixin.create(AppContainer, {

  isAvailable: function() {
    return get(this, 'workspace.active') && get(this, 'parentView.isVisible');
  }.property('workspace.active', 'parentView.isVisible').cacheable(),

  didInsertElement: function() {
    this.registerWithContainerHost();
    this.didSwitchContainer();
    return this._super.apply(this, arguments);
  },

  switchContainer: function() {
    if (get(this, 'isAvailable')) {
      if (get(this, 'isActive')) { return; }
      runLater(this, function() {
        this.didActivate();
      });
    } else {
      this.didDeactivate();
    }
  },

  didSwitchContainer: function() {
    Em.run.once(this, this.switchContainer);
  }.observes('isAvailable'),

  readyToActivate: function() {
    return $.when(this._super(), get(this, 'containerHostView').fetchedPromise());
  },

  registerWithContainerHost: function() {
    var containerHostView = get(this, 'containerHostView');
    if(!containerHostView) { return; }

    containerHostView.registerAppContainer(this);
  },

  containerHostView: function() {
    var get = Em.get, view = this;

    while(view) {
      if(AppContainerHostView.detect(view)) { return view; }
      view = get(view, 'parentView');
    }
  }.property().volatile(),

  willDestroy: function() {
    var containerHostView = get(this, 'containerHostView');
    containerHostView && containerHostView.unregisterAppContainer(this);

    this._super.apply(this, arguments);
  }

});

module.exports = SidebarAppContainer;
},
"wrappers/build_getter.js": function(module, exports, require){
var t = require('i18n').t,
    get = require('support').get;

var GETTER_ONLY_ERROR = t('txt.apps.error.field_getter_only', null, 'This method is not a setter!');

function buildGetter(object, key) {
  return function getProperty(newValue) {
    if ( newValue !== undefined ) { throw new Error(GETTER_ONLY_ERROR); }
    return get(object, key);
  };
}

buildGetter.GETTER_ONLY_ERROR = GETTER_ONLY_ERROR;

module.exports = buildGetter;
},
"wrappers/ticket_field.js": function(module, exports, require){
module.exports = {
  PRIORITY : 'priority',
  STATUS   : 'status',
  TYPE     : 'type'
};
},
"wrappers/ticket_status.js": function(module, exports, require){
module.exports = {
  0: 'new',
  1: 'open',
  2: 'pending',
  3: 'solved',
  4: 'closed',
  5: 'deleted',
  6: 'hold',
  NEW:     0,
  OPEN:    1,
  PENDING: 2,
  SOLVED:  3,
  CLOSED:  4,
  DELETED: 5,
  HOLD:    6
};
},
"wrappers/group_wrapper.js": function(module, exports, require){
var Support = require('support'),
    get = Support.get,
    buildGetter = require('wrappers/build_getter');

/// ### Group Object
///
/// #### group.id()
/// Returns the group ID as an integer.
///
/// ```javascript
/// group.id();
/// ```
///
/// #### group.name()
/// Returns the group name as a string.
///
/// ```javascript
/// group.name();
/// ```
module.exports = function GroupWrapper(emGroup) {
  this.id   = buildGetter(emGroup, 'id');
  this.name = buildGetter(emGroup, 'name');
};
},
"wrappers/ticket_wrapper.js": function(module, exports, require){
var Zd                  = require('zd'),
    $                   = require('jquery'),
    _                   = require('underscore'),
    Support             = require('support'),
    get                 = Support.get,
    set                 = Support.set,
    buildGetter         = require('wrappers/build_getter'),
    fetchAndExecute     = require('wrappers/fetch_and_execute'),
    AgreementWrapper    = require('wrappers/agreement_wrapper'),
    GroupWrapper        = require('wrappers/group_wrapper'),
    TicketFormWrapper   = require('wrappers/ticket_form_wrapper'),
    UserWrapper         = require('wrappers/user_wrapper'),
    ONLY_ONE_AGREEMENT  = 'Only one agreement allowed!',
    TICKET_IS_SHARED    = 'Ticket has already been shared!';

/// ### Ticket Object
///
/// #### ticket.id()
/// Returns the ticket ID as an integer.
///
/// ```javascript
/// var ticket = this.ticket();
/// ticket.id();
/// ```
///
/// #### ticket.subject()
/// Returns the ticket subject as a string.
///
/// ```javascript
/// var ticket = this.ticket();
/// ticket.subject();
/// ```
///
/// #### ticket.subject(value)
/// Sets the ticket subject to the passed string.
///
/// ```javascript
/// var ticket = this.ticket();
/// ticket.subject("This is important");
/// ```
///
/// #### ticket.description()
/// Returns the ticket description as a string.
///
/// ```javascript
/// var ticket = this.ticket();
/// ticket.description();
/// ```
///
/// #### ticket.status()
/// Returns one of:  `new`, `open`, `pending`, `solved`, `closed`, `deleted`
///
/// ```javascript
/// var ticket = this.ticket();
/// ticket.status();
/// ```
///
/// #### ticket.status(value)
/// Sets the ticket status.
///
/// You can pass in one of the following values: `open`, `pending`, `solved`
///
/// ```javascript
/// var ticket = this.ticket();
/// ticket.status("pending");
/// ```
///
/// #### ticket.priority()
/// Returns one of:  `-`,  `low`,  `normal`,  `high`,  `urgent`
///
/// ```javascript
/// var ticket = this.ticket();
/// ticket.priority();
/// ```
///
/// #### ticket.priority(value)
/// Sets the ticket priority.
///
/// You can pass in one of the following values: `low`,  `normal`,  `high`,  `urgent`
///
/// ```javascript
/// var ticket = this.ticket();
/// ticket.priority("low");
/// ```
///
/// #### ticket.type()
/// Returns one of:  `ticket`,  `question`,  `incident`,  `problem`,  `task`
///
/// ```javascript
/// var ticket = this.ticket();
/// ticket.type();
/// ```
///
/// #### ticket.type(value)
/// Sets the ticket type.
///
/// You can pass in one of the following values: `question`,  `incident`,  `problem`,  `task`
///
/// ```javascript
/// var ticket = this.ticket();
/// ticket.type("question");
/// ```
///
/// #### ticket.requester()
/// Returns the ticket requester as an [user object](#user-object).
///
/// ```javascript
/// var ticket = this.ticket();
/// ticket.requester()
/// ```
///
/// #### ticket.requester({ email: value [, name: newName] })
/// Sets the ticket requester. If no user is matched, a new requester will be created.
///
/// You may optionally provide a name. If the requester already exists, the name will
/// be ignored.
///
/// ```javascript
/// var ticket = this.ticket();
/// ticket.requester({ email: "someone@example.com" });
/// ticket.requester({ email: "someone@example.com", name: 'A Name' });
/// ```
///
/// #### ticket.requester({ id: value })
/// Sets the ticket requester.
///
/// ```javascript
/// var ticket = this.ticket();
/// ticket.requester({ id: 10 })
/// ```
///
/// #### ticket.assignee()
/// Returns the ticket assignee as an object.
///
/// Assignee is a composition of user (an agent) and his/her group.
///
/// ```javascript
/// var ticket = this.ticket();
/// ticket.assignee();
/// ```
///
/// #### ticket.assignee({ groupId: groupId })
/// Sets the ticket assignee to a group.
///
/// ```javascript
/// var ticket = this.ticket();
/// ticket.assignee({ groupdId: 2 })
/// ```
///
/// #### ticket.assignee({ userId: userId, groupId: groupId })
/// Sets the ticket assignee to a user/group combination.
///
/// ```javascript
/// var ticket = this.ticket();
/// ticket.assignee({ userId: 5, groupdId: 2 })
/// ```
///
/// #### ticket.assignee().user()
/// Returns the ticket assignee user as an [user object](#user-object).
///
/// ```javascript
/// var ticket = this.ticket();
/// ticket.assignee().user();
/// ```
///
/// #### ticket.assignee().group()
/// Returns the ticket assignee group as an [group object](#group-object).
///
/// ```javascript
/// var ticket = this.ticket();
/// ticket.assignee().group();
/// ```
///
/// #### ticket.collaborators()
/// Returns the list of collaborators on the ticket as an array of [user objects](#user-object).
///
/// ```javascript
/// var ticket = this.ticket();
/// ticket.collaborators();
/// ```
///
/// The returned array has some additional functionality explained below.
///
/// #### ticket.collaborators().add({ email: value })
/// Adds the passed email as a new collaborator on the ticket.
///
/// ```javascript
/// var ticket = this.ticket();
/// ticket.collaborators().add({ email: "someone@example.com" });
/// ```
///
/// #### ticket.collaborators().add({ id: value })
/// Adds the passed user (matched by id) as a new collaborator on the ticket.
///
/// ```javascript
/// var ticket = this.ticket();
/// ticket.collaborators().add({ id: 15 });
/// ```
///
/// #### ticket.collaborators().remove({ email: "someone@example.com" })
/// Removes the passed email from the list of collaborators on the ticket.
///
/// ```javascript
/// var ticket = this.ticket();
/// ticket.collaborators().remove({ email: "someone@example.com" });
/// ```
///
/// #### ticket.collaborators().remove({ id: value })
/// Removes the passed user (matched by id) from the list of collaborators on the ticket.
///
/// ```javascript
/// var ticket = this.ticket();
/// ticket.collaborators().remove({ id: value });
/// ```
///
/// #### ticket.tags()
/// Returns the list of tags on the ticket as an array of strings.
///
/// ```javascript
/// var ticket = this.ticket();
/// ticket.tags(); //["foo", "bar"]
/// ```
///
/// The returned array has some additional functionality explained below.
///
/// #### ticket.tags().add(value)
/// Adds the passed string as a new tag on the ticket.
///
/// ```javascript
/// var ticket = this.ticket();
/// ticket.tags().add("baz");
/// ```
///
/// You can also add multiple tags at once using:
///
/// ```javascript
/// var ticket = this.ticket();
/// ticket.tags().add(["baz", "turnip"]);
/// ```
///
/// #### ticket.tags().remove(value)
/// Removes the passed string from the list of tags on the ticket.
///
/// ```javascript
/// var ticket = this.ticket();
/// ticket.tags().remove("baz");
/// ```
///
/// #### ticket.tags([value1, value2...])
/// Sets multiple tags at once.
///
/// ```javascript
/// var ticket = this.ticket();
/// ticket.tags(["bar", "baz"]);
/// ```
///
/// #### ticket.form()
///
/// Returns the ticket form as a [ticket form object](#ticket-form-object).
///
/// ```javascript
/// var ticketFormID = this.ticket().form().id();
/// ```
///
/// #### ticket.sharedWith()
/// Returns the ticket shared agreement as an array of [agreement objects](#agreement-object). (at this time only one agreement is allowed).
///
/// ```javascript
/// var ticket = this.ticket();
/// var agreements = ticket.sharedWith();
/// var currentAgreement = agreements[0]; // Corresponds to the selected element in the sharing dropdown. Returns `undefined` if nothing is selected.
/// ```
///
/// #### ticket.sharedWith([ { id: value } ])
/// Sets the shared with field to the passed value.
///
/// ```javascript
/// var ticket = this.ticket();
/// ticket.sharedWith([ { id: 1 } ]);
/// ticket.sharedWith({ id: 1 }); // Optionally, passing a hash is accepted
/// ticket.sharedWith([{ id: 1 }, { id: 2 }]); // Will throw an exception, only one agreement is allowed at this time.
/// ```
///
/// #### ticket.customField(fieldName)
/// Returns the ticket custom field value as its defined type.
///
/// ```javascript
/// var ticket = this.ticket();
/// ticket.customField("custom_field_1");
/// ```
///
/// #### ticket.customField(fieldName, value)
/// Sets the ticket custom field to the passed value.
///
/// ```javascript
/// var ticket = this.ticket();
/// ticket.customField("custom_field_1", "text"); // type: text
/// ticket.customField("custom_field_2", "yes"); // type: checkbox
/// ticket.customField("custom_field_3", "vip"); // type: tagger
/// ```
function TicketWrapper(emTicket, emController, emTicketFields, emAgreements) {
  var agreements = emAgreements, ticket = emTicket, ticketFields = emTicketFields;

  var getOrSet = function(field, val) {
    var tf = ticketFields.find(function(t) { return field === get(t, 'attributeName'); });
    if(tf === undefined) { return; }
    if ( val !== undefined ) {
      if ( _.isNumber(val) && !tf.mapValueToString(val) ) { val = undefined; }
      if ( _.isString(val) ) { val = tf.mapStringToValue(val); }
      if ( val !== undefined ) { set(ticket, field, val); }
      return this;
    } else {
      val = get(ticket, field);
      if (val === undefined && /^custom_field_\d+/.test(field) && get(ticket, 'isFetched')) {
        val = null;
      }
      return tf.mapValueToString(val);
    }
  };

  var extendCollaboratorsArray = function(array) {
    return $.extend(array.map(function(c) {
        return new UserWrapper(c);
      }),
      // TODO: extract collaborators into its own wrapper
      {
        add: function(options) {
          options = options || {};
          var ccs = get(ticket, 'collaborators'),
              email = options.email,
              id = options.id;

          var emailIsValid = 'string' === typeof email && email.toString().match(/.+@.+\..+/);
          if ( emailIsValid ) {
            // Ticket collaborators UI shows duplicated CCs
            var existsByEmail = ccs.find(function(c) { return email === get(c, 'email'); });
            if ( !existsByEmail ) {
              ccs.pushObject(Zd.User.create({ email: email, name: email }));
            }
          } else if ( !!id ) {
            var existsById = ccs.find(function(c) { return id === get(c, 'id'); });
            if ( !existsById ) {
              fetchAndExecute(Zd.User, id, function(user) {
                ccs.pushObject(user);
              });
            }
          }

          return wrappedTicket.collaborators();
        },

        remove: function(options) {
          options = options || {};
          var ccs = get(ticket, 'collaborators'),
              email = options.email,
              id = options.id;

          if ( email !== undefined ) {
            var ccByEmail = ccs.find(function(c) { return email === get(c, 'email'); });
            if ( ccByEmail ) {
              ccs.removeObject(ccByEmail);
            }
          } else if ( id !== undefined ) {
            var ccById = ccs.find(function(c) { return id === get(c, 'id'); });
            if ( ccById ) {
              ccs.removeObject(ccById);
            }
          }
          return wrappedTicket.collaborators();
        }
      }
    );
  };

  var extendTagsArray = function(self, array) {
    return $.extend(array, {
      add: function(val) {
        if ( val !== undefined ) {
          var incoming = $.makeArray(val).filter(function(tag) { return _.isString(tag); });
          self.tags(self.tags().concat(incoming));
        }
        return self.tags();
      },

      remove: function(val) {
        if ( val !== undefined ) {
          var incoming = $.makeArray(val).filter(function(tag) { return _.isString(tag); });
          incoming.forEach(function(tag) {
            get(ticket, 'tags').removeObject(tag);
          });
        }
        return self.tags();
      }
    });
  };

  var wrappedTicket = {
    assignee: function(options) {
      options = options || {};
      // The Group model exists in Lotus but can be lazily loaded from the require cache by the time assignee is executed.
      var Group = get(Zd, 'Group'),
          groupId = options.groupId,
          userId = options.userId;

      if ( groupId !== undefined ) {
        fetchAndExecute(Group, groupId, function(group) {
          set(ticket, 'assignee', null);
          set(ticket, 'group', group);
        });
      }

      if ( userId !== undefined ) {
        fetchAndExecute(Zd.User, userId, function(user) {
          if ( !get(user, 'isAgent') ) { throw "User '%@' is not an agent!".fmt(get(user, 'name')); }
          set(ticket, 'assignee', user);
        });
      }

      return {
        group: function() {
          if ( !get(ticket, 'group.id') ) { return undefined; }
          // Group could be not fetched (TODO: check that)
          Group.create({ id: get(ticket, 'group.id') }).fetch();
          return new GroupWrapper(get(ticket, 'group'));
        },

        user: function() {
          if ( !get(ticket, 'assignee.id') ) { return undefined; }
          // Assignee could be not fetched
          Zd.User.create({ id: get(ticket, 'assignee.id') }).fetch();
          return new UserWrapper(get(ticket, 'assignee'));
        }
      };
    },

    collaborators: function(val) {
      if ( val !== undefined ) { throw 'This method is not a setter!'; }

      var collaborators = get(ticket, 'collaborators') || [];
      return extendCollaboratorsArray(get(ticket, 'collaborators').toArray());
    },

    customField: getOrSet,

    description: buildGetter(ticket, 'description'),

    id: buildGetter(ticket, 'id'),

    priority: function(val) {
      return getOrSet('priority_id', val);
    },

    requester: function(options) {
      options = options || {};
      var email = options.email, id = options.id;

      if ( email !== undefined ) {
        var name = options.name ? options.name : email.replace(/@.*$/, '');
        set(ticket, 'requester', Zd.User.create({ email: email, name: name }));
      } else if ( id !== undefined ) {
        fetchAndExecute(Zd.User, id, function(user) {
          set(ticket, 'requester', user);
        });
      }

      if ( !get(ticket, 'requester.id') && !get(ticket, 'requester.email') ) { return undefined; }
      return new UserWrapper(get(ticket, 'requester'));
    },

    // Design decision: although Lotus/Classic currently show Shared With as a dropdown, internally and in API v2
    // (http://developer.zendesk.com/documentation/rest_api/tickets.html) it is treated as an array (main constrain for only one agreement
    // is the UI). So decision was made to expose this field as an array in the Data API.
    sharedWith: function(val) {
      var shared = get(ticket, 'related.shared.firstObject');
      if ( val !== undefined ) {
        val = $.makeArray(val);
        if ( val.length !== 1 ) {
          throw new Error(ONLY_ONE_AGREEMENT);
        } else if ( shared != null ) {
          throw new Error(TICKET_IS_SHARED);
        }

        var agreementId = val[0] && val[0].id;
        if ( agreementId !== undefined ) {
          set(ticket, 'agreementIdToShare', agreementId);
        }
      }
      // If dropdown visible (there are active agreements and ticket ins't shared), value is mapped to ticket agreementIdToShare property
      // if ticket is already shared, value is mapped to ticket related shared property (first element, at this time Lotus only supports
      // sharing a ticket once)
      var idToShare = get(ticket, 'agreementIdToShare'),
          agreement = idToShare ? agreements.find(function(a) { return get(a, 'id') == idToShare; }) : shared;
      return agreement ? [ new AgreementWrapper(agreement) ] : null;
    },

    // sharingAgreementOptions isn't actually a ticket field, so getOrSet
    // won't work.
    sharingAgreementOptions: function(val) {
      if (arguments.length === 0) {
        return get(ticket, 'sharingAgreementOptions');
      } else {
        set(ticket, 'sharingAgreementOptions', val);
        return this;
      }
    },

    status: function(val) {
      return getOrSet('status_id', val);
    },

    subject: function(val) {
      return getOrSet('subject', val);
    },

    tags: function(val) {
      if ( val !== undefined ) {
        var valid = val.uniq().filter(function(t) { return t != null; });
        set(ticket, 'tags', valid);
      }
      return extendTagsArray(this, get(ticket, 'tags').copy());
    },

    type: function(val) {
      return getOrSet('ticket_type_id', val);
    },

    form: function() {
      if (arguments.length > 0) {
        throw new Error(buildGetter.GETTER_ONLY_ERROR);
      }
      return new TicketFormWrapper(emController);
    }
  };
  getOrSet = $.proxy(getOrSet, wrappedTicket);
  return wrappedTicket;
}

TicketWrapper.ONLY_ONE_AGREEMENT = ONLY_ONE_AGREEMENT;
TicketWrapper.TICKET_IS_SHARED   = TICKET_IS_SHARED;

module.exports = TicketWrapper;
},
"app_container/host_view.js": function(module, exports, require){
/*globals Em*/
var $       = require('jquery'),
    Support = require('support'),
    get     = Support.get,
    set     = Support.set;

// To be mixed in to views that can contain app container views.
var AppContainerHostView = Em.Mixin.create({

  init: function() {
    var dfd = $.Deferred();
    this.fetchedPromise = function() { return dfd.promise(); };
    this.resolveFetched = function() { dfd.resolve(); };
    this.resetFetched = function() { dfd = $.Deferred(); };
    set(this, 'appContainers', []);
    return this._super();
  },

  didChangeWorkspace: function() {
    this.resetFetched();
    get(this, 'workspace')
      .on('@workspace:fetched', this, function() {
        this.resolveFetched();
      });
  }.observes('workspace'),

  unregisterAppContainer: function(container) {
    get(this, 'appContainers').removeObject(container);
  },

  registerAppContainer: function(container) {
    get(this, 'appContainers').pushObject(container);
  },

  reset: function() {
    if (this.fetchedPromise().state() !== 'pending') { this.resetFetched(); }
  }

});

module.exports = AppContainerHostView;
},
"wrappers/account_wrapper.js": function(module, exports, require){
var buildGetter = require('wrappers/build_getter');

/// ### Account Object
///
/// #### currentAccount.id()
/// Returns the current account id as an integer.
///
/// ```javascript
///   var currentAccount = this.currentAccount();
///   currentAccount.id();
/// ```
///
/// #### currentAccount.planName()
/// Returns the current planName as a string.
///
/// ```javascript
///   var currentAccount = this.currentAccount();
///   currentAccount.planName();
/// ```
///
/// #### currentAccount.subdomain()
/// Returns the current subdomain as a string.
///
/// ```javascript
///   var currentAccount = this.currentAccount();
///   currentAccount.subdomain();
/// ```
module.exports = function AccountWrapper(emAccount) {
  this.id         = buildGetter(emAccount, 'id');
  this.planName   = buildGetter(emAccount, 'planName');
  this.subdomain  = buildGetter(emAccount, 'subdomain');
};
},
"wrappers/comment_wrapper.js": function(module, exports, require){
/* jshint indent: false */

var Support     = require('support'),
    _           = require('underscore'),
    get         = Support.get,
    set         = Support.set,
    buildGetter = require('wrappers/build_getter');

var commentStates = {
  'fbPrivateMessage': 'facebookPrivateMessage',
  'fbWallReply':      'facebookWallReply',
  'privateComment':   'internalNote',
  'publicComment':    'publicReply',
  'twitterDm':        'twitterDirectMessage',
  'twitterMention':   'twitterReply'
};

function getResponseType(ticketController, state) {
  var currentState = get(ticketController, 'commentMode');
  return commentStates[currentState];
}

function isResponseTypeAvailable(ticketController, val) {
  switch(val) {
    case 'fbPrivateMessage':
      return get(ticketController, 'facebookPrivateMessageVisible');
    case 'fbWallReply':
      return get(ticketController, 'facebookChannelVisible');
    case 'twitterDm':
    case 'twitterMention':
      return get(ticketController, 'twitterChannelsVisible');
    default:
      return true;
  }
}

function responseTypeNotAvailableMessage(state) {
  switch(state) {
    case 'fbPrivateMessage':
    case 'fbWallReply':
      return 'This is not a Facebook Ticket!';
    case 'twitterDm':
    case 'twitterMention':
      return 'This is not a Twitter Ticket!';
    default:
      return '';
  }
}

function keyLookup(hash, value) {
  var result;
  _.each(hash, function(v,k){ if (v == value) { result = k; } });
  return result;
}

/// ### Comment Object
///
/// #### comment.text()
/// Returns the comment text as a string.
///
/// ```javascript
/// var comment = this.comment();
/// comment.text();
/// ```
///
/// #### comment.text(value)
/// Sets the comment text to the passed string.
///
/// ```javascript
/// var comment = this.comment();
/// comment.text('New Comment');
/// ```
///
/// #### comment.type()
/// Returns one of: `facebookPrivateMessage`, `facebookWallReply`,
/// `internalNote`, `publicReply`, `twitterDirectMessage`, `twitterReply`.
///
/// ```javascript
/// var comment = this.comment();
/// comment.type();
/// ```
///
/// #### comment.type(value)
/// Sets the comment type.
///
/// You can pass in one of the following values: `facebookPrivateMessage`,
/// `facebookWallReply`, `internalNote`, `publicReply`,
/// `twitterDirectMessage`, `twitterReply`.
///
/// Twitter- and Facebook related options will only be accepted if those options
/// are visible on screen.
///
/// ```javascript
/// var comment = this.comment();
/// comment.type('internalNote');
/// ```
function CommentWrapper(emTicket, emTicketController) {
  var ticket = emTicket, ticketController = emTicketController;

  return {
    type: function(val) {
      if ( val !== undefined ) {
        var key = keyLookup(commentStates, val);
        if ( key != null ) {
          if ( isResponseTypeAvailable(ticketController, key) ) {
            ticketController.toggleCommentMode(key);
          } else {
            throw responseTypeNotAvailableMessage(key);
          }
        }
        return this;
      } else {
        return getResponseType(ticketController, 'commentMode');
      }
    },

    text: function(val) {
      if ( val !== undefined ) {
        set(ticket, 'comment.body', val);
        return this;
      } else {
        return get(ticket, 'comment.body');
      }
    }
  };
}

module.exports = CommentWrapper;
},
"wrappers/ticket_priority.js": function(module, exports, require){
module.exports = {
  0: '-',
  1: 'low',
  2: 'normal',
  3: 'high',
  4: 'urgent',
  NONE:   0,
  LOW:    1,
  NORMAL: 2,
  HIGH:   3,
  URGENT: 4
};
},
"wrappers/agreement_wrapper.js": function(module, exports, require){
var buildGetter = require('wrappers/build_getter');

/// ### Agreement Object
///
/// #### agreement.id()
/// Returns the agreement ID as an integer.
///
/// ```javascript
///   agreement.id();
/// ```
///
/// #### agreement.name()
/// Returns the agreement name as a string.
///
/// ```javascript
///   agreement.name();
/// ```
///
/// #### agreement.partnerName()
/// Returns the partner name as a string. The partner name may be `null`.
///
/// ```javascript
///   agreement.partnerName();
/// ```
module.exports = function AgreementWrapper(emAgreement) {
  this.id          = buildGetter(emAgreement, 'id');
  this.name        = buildGetter(emAgreement, 'name');
  this.partnerName = buildGetter(emAgreement, 'partnerName');
};
},
"lib/views/adapters/zd_menu.js": function(module, exports, require){
var $      = require('jquery'),
    _      = require('underscore'),
    logger = require('log/base').logger;

module.exports = function initAdapter($view) {
  var $items = $view
    .find('select')
    .filter('[data-zd-type$="_menu"]');

  if ($items.length === 0) { return; }

  logger.benchmark('zd_menu', function() {

    $items.each(function(i, el) {
      var $el        = $(el),
          type       = $el.data('zdType'),
          pluginName = 'zd_%@'.fmt(type),
          pluginFunc = $el[pluginName.camelize()];
      pluginFunc && pluginFunc.call($el);
    });

  }.bind(this));
};
},
"wrappers/fetch_and_execute.js": function(module, exports, require){
module.exports = function fetchAndExecute(klass, id, callback) {
  var resource = klass.create({ id: id });
  resource.fetch()
    .done(function() {
      callback(resource);
    })
    .fail(function() {
      var model = klass.toString().replace(/(\w*\.)/, '').toLowerCase();
      throw "Could not find %@ with id '%@'".fmt(model, id);
    });
};
},
"wrappers/user_field_wrapper.js": function(module, exports, require){
var _ = require('underscore'),
    UserFieldOptionWrapper = require('wrappers/user_field_option_wrapper'),
    Support = require('support'),
    get = Support.get,
    set = Support.set,
    t = require('i18n').t,
    DOESNT_SUPPORT_OPTIONS_ERROR = t('txt.apps.error.field_doesnt_support_options', null,
      'The user field you are accessing doesn\'t have any options available');

var UserFieldWrapper = function(userFieldView) {

  return {
    /// #### userField.name()
    ///
    /// Returns the name of the user field.
    ///
    /// ```javascript
    ///   var field = this.userFields('role');
    ///   field.name(); // 'role'
    /// ```
    ///
    name: function() {
      return get(userFieldView, 'name');
    },

    /// #### userField.show()
    ///
    /// Shows the user field in the Zendesk interface.
    ///
    /// ```javascript
    ///   var field = this.userFields('tags')
    ///   field.show();
    /// ```
    ///
    show: function() {
      set(userFieldView, 'isVisible', true);
      return this;
    },

    /// #### userField.hide()
    ///
    /// Hides the user field in the Zendesk interface.
    ///
    /// ```javascript
    ///   var field = this.userFields('tags')
    ///   field.hide();
    /// ```
    ///
    hide: function() {
      set(userFieldView, 'isVisible', false);
      return this;
    },

    /// #### userField.toggle()
    ///
    /// Toggles the user field in the Zendesk interface.
    ///
    /// ```javascript
    ///   var field = this.userFields('tags')
    ///   field.toggle();
    /// ```
    ///
    toggle: function() {
      if (this.isVisible()) {
        return this.hide();
      }
      return this.show();
    },

    /// #### userField.isVisible()
    ///
    /// Returns `true` if the field is visible in the Zendesk interface.
    ///
    /// ```javascript
    ///   var field = this.userFields('tags')
    ///   field.isVisible(); // true
    /// ```
    ///
    isVisible: function() {
      return get(userFieldView, 'isVisible');
    },

    /// #### userField.options()
    ///
    /// Returns either the option object with the given value, or all the option objects
    /// available if no value is passed in.
    ///
    /// ```javascript
    ///   var roleField = this.userFields('role');
    ///   roleField.options(); // { label: 'End-user', value: 'end-user' }, { label: 'Administrator', value: 'admin' }, ...]
    ///   var admin = roleField.options()[1];
    ///   admin.label(); // 'Administrator'
    ///   admin.value(); // 'admin'
    /// ```
    ///
    options: function() {
      var options = get(userFieldView, 'options');
      if (options === undefined) { throw new Error(DOESNT_SUPPORT_OPTIONS_ERROR); }
      return options.map(function(opt) {
        return new UserFieldOptionWrapper(opt);
      });
    }

  };
};

module.exports = UserFieldWrapper;
},
"wrappers/ticket_form_wrapper.js": function(module, exports, require){
var buildGetter = require('wrappers/build_getter');

/// ### Ticket Form Object
///
/// #### form.id()
/// Returns the ticket form ID as an integer.
///
/// ```javascript
///   form.id();
/// ```
module.exports = function TicketFormWrapper(ticketController) {
  this.id = buildGetter(ticketController, 'currentTicketFormId');
};
},
"wrappers/ticket_field_wrapper.js": function(module, exports, require){
var _                            = require('underscore'),
    Support                      = require('support'),
    TicketFieldOptionWrapper     = require('wrappers/ticket_field_option_wrapper'),
    TicketField                  = require('wrappers/ticket_field'),
    TicketType                   = require('wrappers/ticket_type'),
    TicketPriority               = require('wrappers/ticket_priority'),
    TicketStatus                 = require('wrappers/ticket_status'),
    t                            = require('i18n').t,
    get                          = Support.get,
    set                          = Support.set,
    NESTED_HASH_DELIM            = '::',
    DOESNT_SUPPORT_OPTIONS_ERROR = t('txt.apps.error.field_doesnt_support_options', null,
      'The ticket field you are accessing doesn\'t have any options available');

// This method will take the output of the Zd.NestedHashConverter#toList() method and
// flatten it to a single level list where option objects have a compound label (nestedLabel)
// that describes the path to that option like One::Two::Three.
var toFlattenedList = function(children, path) {
  var opts = [],
      optChildren,
      label,
      totalChildren = children.length;
  var setNestedLabel = function setNestedLabel(opt) {
    if (_.isEmpty(path)) return;
    set(opt, 'nestedLabel', path.join(NESTED_HASH_DELIM) + NESTED_HASH_DELIM + get(opt, 'label'));
  };
  path = path || [];
  _.each(children, function(opt) {
    label = get(opt, 'label');
    setNestedLabel(opt);
    optChildren = get(opt, 'children');
    opts.push(opt);
    if (optChildren) {
      path.push(label);
      opts.push.apply(opts, toFlattenedList(optChildren, path));
    }
    totalChildren--;
    if (!totalChildren && path.length) {
      path.pop();
    }
  });
  return opts;
};

function TicketFieldWrapper(emTicketFieldView) {
  var ticketFieldView = emTicketFieldView,
      optionValueMap;

  var friendlyNameMap = {
    ticket_type_id: 'type',
    priority_id:    'priority',
    problem_id:     'problem',
    ticket_sharing: 'sharedWith'
  };

  var typeMap = {
    type:     TicketType,
    priority: TicketPriority,
    status:   TicketStatus
  };

  var getWrappedOption = function getWrappedOption(opt) {
    if (opt instanceof TicketFieldOptionWrapper) return opt;
    return new TicketFieldOptionWrapper(opt, ticketFieldView);
  };

  var buildOptionValueMap = function buildOptionValueMap(opts, type) {
    var wrappedOpt,
        originalVal,
        symbolVal,
        hasSymbol;
    if (!_.isUndefined(optionValueMap)) return;
    optionValueMap = {};
    _.each(opts, function(opt) {
      wrappedOpt = getWrappedOption(opt);
      originalVal = wrappedOpt.value();
      symbolVal = typeMap[type] && typeMap[type][originalVal] || originalVal;
      hasSymbol = !_.isUndefined(symbolVal);
      // Store a reference against the symbolic value, ie. 'question'
      // Keep a reference to that value, we'll return it later when accessing
      // a wrapped option's value().
      if (hasSymbol) {
        set(opt, 'symbolValue', symbolVal);
        optionValueMap[symbolVal] = wrappedOpt;
      }
      if (originalVal !== symbolVal) optionValueMap[originalVal] = wrappedOpt; // Store against the original value if different.
    });
  };

  return {
    /// #### ticketField.name()
    ///
    /// Returns the name of the ticket field.
    ///
    /// ```javascript
    ///   var field = this.ticketFields('requester');
    ///   field.name(); // 'requester'
    /// ```
    ///
    name: function() {
      var name = get(ticketFieldView, 'name');
      return friendlyNameMap[name] || name;
    },

    /// #### ticketField.label()
    ///
    /// Returns the label of the ticket field.
    ///
    /// ```javascript
    ///   var field = this.ticketFields('requester');
    ///   field.label(); // 'Requester'
    /// ```
    ///
    /// #### ticketField.label(newLabel)
    ///
    /// Sets the ticket field label to newLabel. Please note that the change is cosmetic
    /// and will revert if the ticket tab is closed or page reloaded (until you set it again).
    ///
    /// ```javascript
    ///   var field = this.ticketFields('requester');
    ///   field.label('Foo');
    ///   field.label(); // 'Foo'
    /// ```
    ///
    label: function(newLabel) {
      if (newLabel) {
        return set(ticketFieldView, 'customLabelText', newLabel);
      } else {
        return get(ticketFieldView, 'labelText');
      }
    },

    /// #### ticketField.options()
    ///
    /// Returns either the option object with the given value, or all the option objects
    /// available if no value is passed in.
    ///
    /// ```javascript
    ///   var typeField = this.ticketFields('type');
    ///   typeField.options(); // [{ label: '-', value: 0 }, { label: 'Question', value: 1 }, { label: 'Incident', value: 2 }, ...]
    ///   var incident = typeField.options(2);
    ///   incident.label(); // 'Incident'
    ///   incident.value(); // 2
    /// ```
    /// or
    ///
    /// ```javascript
    ///   var myCustomField = this.ticketFields('custom_field_1234');
    ///   myCustomField.options(); // [{ label: '-', value: '' }, { label: 'A', value: 'a' }, { label: 'B', value: 'b' }, ...]
    ///   var a = myCustomField.options('a');
    ///   a.label(); // 'A'
    ///   a.value(); // 'a'
    /// ```
    ///
    options: function(val) {
      var rawOptions = get(ticketFieldView, 'options'),
          flatOptions;
      if (_.isUndefined(rawOptions)) { throw new Error(DOESNT_SUPPORT_OPTIONS_ERROR); }
      flatOptions = toFlattenedList(rawOptions);
      buildOptionValueMap(flatOptions, this.name());
      if (arguments.length) {
        return optionValueMap[val];
      } else {
        return _.map(flatOptions, function(opt) {
          return getWrappedOption(opt);
        });
      }
    },

    /// #### ticketField.isRequired()
    ///
    /// Returns `true` if the ticket field is required for ticket closure, `false` otherwise.
    ///
    /// ```javascript
    ///   var field = this.ticketFields('requester');
    ///   field.isRequired(); // true
    /// ```
    ///
    isRequired: function() {
      return get(ticketFieldView, 'isRequired');
    },

    /// #### ticketField.show()
    ///
    /// Shows the ticket field in the Zendesk interface.
    ///
    /// ```javascript
    ///   var field = this.ticketFields('tags')
    ///   field.show();
    /// ```
    ///
    show: function() {
      set(ticketFieldView, 'isVisible', true);
      return this;
    },

    /// #### ticketField.hide()
    ///
    /// Hides the ticket field in the Zendesk interface.
    ///
    /// ```javascript
    ///   var field = this.ticketFields('tags')
    ///   field.hide();
    /// ```
    ///
    hide: function() {
      set(ticketFieldView, 'isVisible', false);
      return this;
    },

    /// #### ticketField.toggle()
    ///
    /// Toggles the ticket field in the Zendesk interface.
    ///
    /// ```javascript
    ///   var field = this.ticketFields('tags')
    ///   field.toggle();
    /// ```
    ///
    toggle: function() {
      if (this.isVisible()) {
        return this.hide();
      }
      return this.show();
    },

    /// #### ticketField.isVisible()
    ///
    /// Returns `true` if the field is visible in the Zendesk interface.
    ///
    /// ```javascript
    ///   var field = this.ticketFields('tags')
    ///   field.isVisible(); // true
    /// ```
    ///
    isVisible: function() {
      return get(ticketFieldView, 'isVisible');
    },

    /// #### ticketField.disable()
    ///
    /// Disables the ticket field in the Zendesk interface. The field will be visible, but will not allow user interaction.
    ///
    /// ```javascript
    ///   var field = this.ticketFields('tags')
    ///   field.disable();
    /// ```
    ///
    disable: function() {
      set(ticketFieldView, 'disabled', true);
      return this;
    },

    /// #### ticketField.enable()
    ///
    /// Enables the ticket field, allowing user interaction.
    ///
    /// ```javascript
    ///   var field = this.ticketFields('tags')
    ///   field.enable();
    /// ```
    ///
    enable: function() {
      set(ticketFieldView, 'disabled', false);
      return this;
    }
  };
}

module.exports = TicketFieldWrapper;
},
"wrappers/user_field_option_wrapper.js": function(module, exports, require){
var _ = require('underscore'),
    get = require('support').get;

function UserFieldOptionWrapper(emUserFieldOption) {

  var userFieldOption = emUserFieldOption,
      cachedValue;

  var getLabel = function() {
    var label = get(userFieldOption, 'label');
    return label.toString(); // toString() the returned value as it may be a Handlebars.SafeString
  };

  var getValue = function() {
    if (cachedValue == null) {
      ['value', 'id', 'label'].some(function(key) {
        cachedValue = get(userFieldOption, key);
        return cachedValue != null;
      });
    }

    return cachedValue;
  };

  return {

    /// #### userFieldOption.label()
    ///
    /// Returns the label of the user field option.
    ///
    /// ```javascript
    ///   option.label(); // 'Foo'
    /// ```
    ///
    label: function() {
      return getLabel();
    },

    /// #### userFieldOption.value()
    ///
    /// Returns the value of the user field option, if one exists, or undefined.
    ///
    /// ```javascript
    ///   option.value();
    /// ```
    ///
    value: function() {
      return getValue();
    }

  };
}

module.exports = UserFieldOptionWrapper;
},
"wrappers/ticket_field_option_wrapper.js": function(module, exports, require){
var _ = require('underscore'),
    Support = require('support'),
    notify = Support.notifyPropertyChange,
    get = Support.get,
    set = Support.set,
    NESTED_HASH_DELIM = '::';

function TicketFieldOptionWrapper(emTicketFieldOption, emTicketFieldView) {

  var ticketFieldOption = emTicketFieldOption,
      ticketFieldView = emTicketFieldView,
      lastValue;

  var isNested = function() {
    if (!_.has(ticketFieldOption, 'nestedLabel')) return false;
    return new RegExp(NESTED_HASH_DELIM).test(get(ticketFieldOption, 'nestedLabel'));
  };

  var setAndNotify = function(obj, key, value) {
    if (get(obj, key) === value) { return value; }
    var result = set(obj, key, value);
    notify(ticketFieldView, 'options');
    return result;
  };

  var setLabel = function(newLabel) {
    var result, path;
    if (!newLabel) return;
    result = setAndNotify(ticketFieldOption, 'label', newLabel);
    if (result === newLabel && isNested()) {
      path = get(ticketFieldOption, 'nestedLabel').split(NESTED_HASH_DELIM);
      if (path.length > 1) {
        path = path.slice(0, -1);
        path.push(newLabel);
      }
      set(ticketFieldView, 'nestedLabel', path.join(NESTED_HASH_DELIM));
    }
    return result;
  };

  var getLabel = function() {
    var label;
    if (isNested()) {
      label = get(ticketFieldOption, 'nestedLabel');
    } else {
      label = get(ticketFieldOption, 'label');
    }
    return label.toString(); // toString() the returned value as it may be a Handlebars.SafeString
  };

  var getValue = function() {
    if (lastValue != null) { return lastValue; }
    return _.reduce(['symbolValue', 'value', 'id', 'label'], function(val, key) {
      if (val == null) { val = lastValue = get(ticketFieldOption, key); }
      return val;
    }, undefined);
  };

  // When the v2 API moves to using only symbolic strings rather than integers for ticket field values
  // we can remove mapping implemented here to convert strings to integers and back.
  // @see https://zendesk.atlassian.net/browse/APPS-648
  var mapStringToInteger = function() {
    var val = getValue(),
        symbolVal = get(ticketFieldOption, 'symbolValue'),
        intVal = get(ticketFieldOption, 'value');
    if (val != null && symbolVal === val && _.isNumber(intVal)) { return intVal; }
    return val;
  };

  return {

    /// #### ticketFieldOption.label()
    ///
    /// Returns the label of the ticket field option.
    ///
    /// ```javascript
    ///   option.label();
    /// ```
    ///
    /// #### ticketFieldOption.label(newLabel)
    ///
    /// Sets the ticket field option label to newLabel.
    /// Please note that the change is cosmetic and will revert if the ticket tab is
    /// closed or page reloaded (until you set it again).
    ///
    /// ```javascript
    ///   option.label('Foo');
    ///   option.label(); // 'Foo'
    /// ```
    ///
    label: function(newLabel) {
      if (newLabel) {
        return setLabel(newLabel);
      } else {
        return getLabel();
      }
    },

    /// #### ticketFieldOption.value()
    ///
    /// Returns the value of the ticket field option, if one exists, or undefined.
    ///
    /// ```javascript
    ///   option.value();
    /// ```
    ///
    value: function() {
      return getValue();
    },

        /// #### ticketFieldOption.isEnabled()
    ///
    /// Returns 'true' if the ticket field option is enabled, 'false' otherwise.
    ///
    /// ```javascript
    ///   option.isEnabled();
    /// ```
    ///
    isEnabled: function() {
      return get(ticketFieldOption, 'enabled');
    },

    /// #### ticketFieldOption.enable()
    ///
    /// Enables the ticket field option for user interaction.
    ///
    /// ```javascript
    ///   option.enable();
    /// ```
    ///
    enable: function() {
      setAndNotify(ticketFieldOption, 'enabled', true);
      return this;
    },

    /// #### ticketFieldOption.disable()
    ///
    /// Disables the option in the ticket field to which the option belongs.
    /// The field option will be visible, but will not allow user interaction.
    ///
    /// ```javascript
    ///   option.disable();
    /// ```
    ///
    disable: function() {
      setAndNotify(ticketFieldOption, 'enabled', false);
      return this;
    },

    /// #### ticketFieldOption.show()
    ///
    /// Shows the ticket field option in the Zendesk interface.
    ///
    /// ```javascript
    ///   option.show();
    /// ```
    ///
    show: function() {
      ticketFieldView.showOptions(mapStringToInteger());
      return this;
    },

    /// #### ticketFieldOption.hide()
    ///
    /// Hides the ticket field option in the Zendesk interface.
    ///
    /// ```javascript
    ///   option.hide();
    /// ```
    ///
    hide: function() {
      ticketFieldView.hideOptions(mapStringToInteger());
      return this;
    },

    /// #### ticketFieldOption.toggle()
    ///
    /// Toggles the ticket field option in the Zendesk interface.
    ///
    /// ```javascript
    ///   option.toggle();
    /// ```
    ///
    toggle: function() {
      if (this.isVisible()) { return this.hide(); }
      return this.show();
    },

    /// #### ticketFieldOption.isVisible()
    ///
    /// Returns `true` if the option is visible in the Zendesk interface.
    ///
    /// ```javascript
    ///   option.isVisible(); // true
    /// ```
    ///
    isVisible: function() {
      return ticketFieldView.optionIsVisible(mapStringToInteger());
    }

  };
}

module.exports = TicketFieldOptionWrapper;
},
"lib/views/deferred_activation_view_mixin.js": function(module, exports, require){
/*globals Em*/
var $ = require('jquery');

var ActivationState = {
  PENDING:  'pending',
  DEFERRED: 'deferred',
  READY:    'ready'
};

var DeferredActivationViewMixin = Em.Mixin.create({

  _didActivate: Em.required(),

  activationState: ActivationState.PENDING,

  isInState: function(state) {
    return this.get('activationState') === state;
  },

  init: function() {
    var dfd = $.Deferred();

    this._setViewIsReady = function() { dfd.resolve(); };
    this._viewWillDestroy = function() { dfd.reject(); };
    this._viewIsReadyPromise = function() { return dfd.promise(); };

    this._super.apply(this, arguments);
  },

  didInsertElement: function() {
    this._setViewIsReady();
    this._super();
  },

  willDestroyElement: function() {
    this._viewWillDestroy();
    this._super();
  },

  didActivate: function() {
    if (this.isInState(ActivationState.READY)) {
      this._didActivate();
    } else {
      this.activateWhenReady();
    }
  },

  activateWhenReady: function() {
    if (this.isInState(ActivationState.DEFERRED)) { return; }

    this.set('activationState', ActivationState.DEFERRED);

    this.readyToActivate()
      .then(function() {
        this._didActivate();
        this.set('activationState', ActivationState.READY);
      }.bind(this));
  },

  readyToActivate: function() {
    return this._viewIsReadyPromise();
  },

  resetActivationState: function() {
    this.set('activationState', ActivationState.PENDING);
  }
});

module.exports = DeferredActivationViewMixin;
},
};
ZendeskApps = require('index.js');
}());