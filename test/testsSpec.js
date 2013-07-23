describe('Element with ID', function() {
	var el;

	beforeEach(function() {
		el = document.createElement('div');
		el.id = 'testId';
		document.body.appendChild(el);
	});

	afterEach(function() {
		el.parentNode.removeChild(el);
	});

	it('uses ID to identify node when present', function() {
		expect(dompath(el).toCSS()).toBe('#' + el.id);
	});

	it('selects correct element', function() {
		expect(dompath(el).select()).toBe(el);
	});
});

describe('Element without ID', function() {
	var el, parent;
	beforeEach(function() {
		el = document.createElement('div');
		parent = document.createElement('div');

		parent.appendChild(el);
		document.body.appendChild(parent);
	});

	afterEach(function() {
		el.parentNode.removeChild(el);
		parent.parentNode.removeChild(parent);
	});

	it('returns selector relative to parent', function() {
		expect(dompath(el, parent).toCSS()).toBe('div:nth-child(1)');
	});

	it('selects correct element', function() {
		expect(dompath(el, parent).select()).toBe(el);
	});
});

describe('Deeply nested node with siblings', function() {
	var el, parent;
	beforeEach(function() {
		el = document.createElement('b');
		parent = document.createElement('div');

		var container = document.createElement('div');

		parent.appendChild(document.createElement('div'));
		parent.appendChild(container);

		var container2 = document.createElement('div');
		container.appendChild(document.createElement('div'));
		container.appendChild(document.createElement('div'));
		container.appendChild(container2);

		container2.appendChild(el);
		document.body.appendChild(parent);
	});

	afterEach(function() {
		parent.parentNode.removeChild(parent);
	});

	it('produces correct selector', function() {
		expect(dompath(el, parent).toCSS()).toBe('div:nth-child(2) > div:nth-child(3) > b:nth-child(1)');
	});

	it('selects correct element', function() {
		expect(dompath(el, parent).select()).toBe(el);
	});
});

describe('JSON serialization', function() {
	var el, parent;
	beforeEach(function() {
		el = document.createElement('div');
		parent = document.createElement('div');

		parent.appendChild(el);
		document.body.appendChild(parent);
	});

	afterEach(function() {
		el.parentNode.removeChild(el);
		parent.parentNode.removeChild(parent);
	});

	it('produces correct selector from JSON', function() {
		var json = JSON.stringify(dompath(el, parent));
		expect(dompath(JSON.parse(json)).toCSS()).toBe('div:nth-child(1)');
	});

	it('selects correct element from JSON serialized path', function() {
		var json = JSON.stringify(dompath(el, parent));
		expect(dompath(JSON.parse(json)).select()).toBe(el);
	});
});
