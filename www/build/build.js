({
    name                    : "main",
    baseUrl                 : "../js",
    paths                   : { requireLib: 'libs/require' },
    include                 : ["requireLib"],
    mainConfigFile          : "js/main.js",
    out                     : "js/build.min.js",
    optimize                : "uglify2", // "none"
    generateSourceMaps      : true,
    preserveLicenseComments : false
})