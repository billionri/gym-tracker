/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-7e5eb42b'], (function (workbox) { 'use strict';

  self.skipWaiting();
  workbox.clientsClaim();
  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "pwa-maskable-512x512.png",
    "revision": "9aa85ab6d8cef614d57362926903527b"
  }, {
    "url": "pwa-512x512.png",
    "revision": "d1493b49aac45d8d8c4474cad4e4719c"
  }, {
    "url": "pwa-192x192.png",
    "revision": "101f5a2e2b85570f8488139211bb5861"
  }, {
    "url": "index.html",
    "revision": "177b18cf548528f2536c0e60a5be0988"
  }, {
    "url": "icon.svg",
    "revision": "7e90849be4125e492f73d22962263cc6"
  }, {
    "url": "favicon.ico",
    "revision": "ef0652e1dec4b4397e27b3b6bef8e63f"
  }, {
    "url": "apple-touch-icon.png",
    "revision": "f698e2a58212b0b3e2d800e1319a569f"
  }, {
    "url": "assets/workbox-window.prod.es5-Bd17z0YL.js",
    "revision": null
  }, {
    "url": "assets/index-BsmpElMK.js",
    "revision": null
  }, {
    "url": "assets/index-BJuyhukN.css",
    "revision": null
  }, {
    "url": "apple-touch-icon.png",
    "revision": "f698e2a58212b0b3e2d800e1319a569f"
  }, {
    "url": "favicon.ico",
    "revision": "ef0652e1dec4b4397e27b3b6bef8e63f"
  }, {
    "url": "icon.svg",
    "revision": "7e90849be4125e492f73d22962263cc6"
  }, {
    "url": "pwa-192x192.png",
    "revision": "101f5a2e2b85570f8488139211bb5861"
  }, {
    "url": "pwa-512x512.png",
    "revision": "d1493b49aac45d8d8c4474cad4e4719c"
  }, {
    "url": "pwa-maskable-512x512.png",
    "revision": "9aa85ab6d8cef614d57362926903527b"
  }, {
    "url": "manifest.webmanifest",
    "revision": "531d0c59612b99648a902e396c567008"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html")));

}));
