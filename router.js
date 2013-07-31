function route(handle, pathname, response) {
    console.log('Routing request for ' + pathname);
    if (typeof handle[pathname] === 'function') {
        handle[pathname](pathname, response);
    } else {
        console.log('No request handler found for ' + pathname);
        handle._default(pathname, response);
    }
}

exports.route = route;
