Form Placeholder
=============

Provides a fallback for the placeholder property on input elements for older browsers. Does not actually do anything in modern browsers.

This Plugin is part of MooTools [PowerTools!](http://cpojer.net/PowerTools).

* [Build PowerTools!](http://cpojer.net/PowerTools)
* [Fork PowerTools!](https://github.com/cpojer/PowerTools)

Build
-----

Build via [Packager](http://github.com/kamicane/packager), requires [MooTools Core](http://github.com/mootools/mootools-core) and [MooTools Class-Extras](http://github.com/cpojer/mootools-class-extras) to be registered to Packager already


	packager register /path/to/form-placeholder
	packager build Form-Placeholder/* > form-placeholder.js

To build this plugin without external dependencies use

	packager build Form-Placeholder/* +use-only Form-Placeholder > form-placeholder.js

Demo
----

See Demos/index.html

How To Use
----------

Create a new instance of Form.Placeholder for your TextArea-Element

	new Form.Placeholder('myInput', options);

To check if the browser supports placeholders use

	if (Form.Placeholder) // This browser supports placeholders

Options
-------

* value (number, defaults to *#777*): The color to be used for the placeholder text

Tips
--------

Use the following tips to get most out of Form.Placeholder.

Style the color of the placeholder via CSS
	
	/* Firefox */
	input:-moz-placeholder {
		color: #000;
	}
	
	/* Webkit */
	input::-webkit-input-placeholder {
		color: #000;
	}

Note that not all modern browsers support to modify the placeholder color yet. If you absolutely need to change the placeholder color, you can force using Form.Placeholder

	<script type="text/javascript">
	// Force usage of Form.Placeholder in *all* browsers
	var supportsPlaceholder = false;
	</script>

Note: Currently, in browsers without placeholder support, typing the same value as the placeholder will remove the content when you focus the input element again. Given that usually the placeholder is not a useful input value in the context of an application this is intentional. However, I am happy to pull from a fork if someone chooses to fix this (in a sane and simple way).
