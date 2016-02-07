angular-sticky
==============

AngularJS directive to cause elements to stick to the top of the page when scrolling past

Requires jQuery 1.2.6+.

A simple directive enables sticky functionality to be added to elements, causing them to stick to the top of
the screen as they are scrolled past.

Quick implementation and only tested on latest Chrome and Firefox, so use at your peril...

# Features

  * Allows use of a placeholder to stop the page jumping
  * Recalculates element position on page load and on window resize
  * Handles multiple sticky elements efficiently

# Usage

Include the .js and .css file in your page then enable usage of the directive by including the "sticky" module
as a dependency. Use the directive as follows:

    <div sticky>I'm all sticky</div>

To stop the page jumping when the element is fixed to the top of the screen a placeholder can be substituted
for it as follows:

    <div sticky use-placeholder>I'm all sticky</div>

See the example directory for a working example.