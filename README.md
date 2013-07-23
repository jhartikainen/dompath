# dompath

Simple experimental library which generates CSS selectors from DOM nodes.

## usage

    //call function, pass any element:
    var path = dompath(document.body);

    //get CSS selector:
    var selector = path.toCSS();

    //can be serialized into JSON:
    var json = JSON.stringify(path);

    //and deserialized later on:
    var newPath = dompath(JSON.parse(json));
    
    //you can also get element based on the path:
    var element = newPath.select();

## tests

Tests can be ran using karma
