/*
---

name: Form.Placeholder

description: Provides a fallback for the placeholder property on input elements for older browsers.

authors: Christoph Pojer (@cpojer)

license: MIT-style license.

requires: [Core/Class.Extras, Core/Element, Core/Element.Style, Class-Extras/Class.Binds, Class-Extras/Class.Singleton]

provides: Form.Placeholder

...
*/

(function(){

if (!this.Form) this.Form = {};

var supportsPlaceholder = ('placeholder' in document.createElement('input'));
// Safari4 does not properly support placeholders. Forcing to use the fallback.
if (Browser.safari && Browser.version <= 4) supportsPlaceholder = false;

if (!('supportsPlaceholder' in this) && this.supportsPlaceholder !== false && supportsPlaceholder) return;

var wrapSet = function(self, set){
	return function(key, value){
		if (key == 'value' && !value){
			self.reset();
			return this;
		}

		return set.apply(this, arguments);
	};
};

var wrapGet = function(get, self){
	return function(key){
		if (key == 'value' && !self.hasValue())
			return '';

		return get.apply(this, arguments);
	};
};

var Placeholder = this.Form.Placeholder = new Class({

	Implements: [Class.Singleton, Class.Binds, Options],

	options: {
		defaultColor: '#777',
		defaultValue: null
	},

	initialize: function(element, options){
		this.setOptions(options);
		element = this.element = document.id(element);

		return this.check(element) || this.setup();
	},

	setup: function(){
		var element = this.element;
		
		this.defaultValue = this.options.defaultValue || element.get('placeholder') || element.value;
		this.color = element.getStyle('color');

		element.erase('placeholder');
		element.set = wrapSet(element.set, this);
		element.get = wrapGet(element.get, this);
		
		this.attach();

		if (!this.hasValue()) this.reset();
	},

	attach: function(){
		this.element.addEvents({
			focus: this.bound('focus'),
			blur: this.bound('blur')
		});
		
		return this;
	},

	detach: function(){
		this.element.removeEvents({
			focus: this.bound('focus'),
			blur: this.bound('blur')
		});

		return this;
	},

	clear: function(){
		var element = this.element;
		element.setStyle('color', this.color);
		if (element.value == this.defaultValue) element.value = '';
		
		return this;
	},

	reset: function(){
		this.element.setStyle('color', this.options.defaultColor).value = this.defaultValue;

		return this;
	},
	
	focus: function(){
		this.clear();
	},
	
	blur: function(){
		if (!this.element.value) this.reset();
	},

	hasValue: function(){
		var value = this.element.value;
		return (value && value != this.defaultValue);
	}

});

})();
