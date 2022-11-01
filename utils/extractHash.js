const extractUrlHash = () => {
    var hash = window.location.hash.substr(1);

    var result = hash.split('&').reduce(function (res, item) {
        var parts = item.split('=');
        res[parts[0]] = parts[1];
        return res;
    }, {});

    return result
}

export default extractUrlHash