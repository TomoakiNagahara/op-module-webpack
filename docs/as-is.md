# WebPack Module As-Is

This document describes the current As-Is behavior of the `webpack` module.

## Scope

This document focuses on the module side of the current implementation.

It explains how the module receives requests and delegates grouped asset output to `op-unit-webpack`.

## Related Framework Documents

- `asset/docs/op/invariants.md`
- `asset/docs/op/responsibility-boundaries.md`
- `asset/docs/op/common-recipes.md`

## Role of the Module

In the current design, the `webpack` module is the delivery-side request entry for grouped asset responses.

It is not the part that stores file registration lists or performs the main asset aggregation logic.

Instead, it:

- receives requests for grouped assets
- resolves the requested asset type
- prepares layout-related context
- delegates actual grouping and output to `op-unit-webpack`

## Current Entry Points

The current content entry points include:

- `asset/module/webpack/content/js/index.php`
- `asset/module/webpack/content/css/index.php`
- `asset/module/webpack/content/index.php`

## `js` and `css` Entry Behavior

The `js` and `css` entry scripts currently do the following:

1. determine the extension from the current directory name
2. set MIME based on that extension
3. determine the layout name
4. load layout config if it exists
5. register the layout-specific asset directory
6. register the local directory
7. call `OP::Unit()->WebPack()->Auto()` with no arguments to emit the final grouped output

This means the module side acts as a structured adapter between request URLs and the WebPack unit.

## `content/index.php`

`asset/module/webpack/content/index.php` is the fallback entry.

If the request does not specify a recognized extension path such as `js` or `css`, this entry:

- sets MIME to `text/plain`
- outputs an error message

Current message:

- `No extension specified: JS / CSS`

## Layout-Aware Behavior

The module is layout-aware.

Before delegating to the unit, it determines the effective layout and registers:

- `asset:/layout/<layout>/<extension>/`

It also registers:

- `./`

for module-local or request-local asset discovery.

## [DOC-GAP] Responsibility Boundary for Layout Asset Registration

In the current implementation, the webpack module automatically registers layout-specific asset directories.

This is As-Is behavior, but it differs from the intended ONEPIECE Framework design.

`js` / `css` directories under a layout should not be packed automatically just because the directories exist.

Layout-specific assets should be registered explicitly by each layout through `WebPack()->Auto()` in that layout's own initialization or template flow.

When the packing unit or intermediate module performs this registration automatically, it can cause:

- layout asset policy leaking into the module/unit layer
- unintended asset inclusion
- harder layout-specific debugging
- unclear responsibility boundaries

In the intended future direction, the webpack module should focus on the delivery-side request entry, and automatic layout asset directory registration should move to explicit layout-owned behavior.

## Dependency Boundary

The module depends on `op-unit-webpack` for the actual grouped output behavior.

In the current implementation:

- the module handles request entry and context setup
- the unit handles registration state, concatenation, caching, and minification

## Meaning of the Current Design

The current `webpack` module is a delivery adapter.

Its main responsibility is to turn a request such as a JS or CSS asset request into a controlled call sequence that `op-unit-webpack` can use to build the final response.
