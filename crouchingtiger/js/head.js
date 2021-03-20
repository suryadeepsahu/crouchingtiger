/*jshint evil:true*/
(function (e) {
    e.SM2_DEFER = !0, e.Zendesk = {},
    function () {
        function t(e) {
            var t = e.indexOf("?") > -1 ? "&" : "?";
            return e = e + t + "host=" + window.location.host, '<script src="' + e + '" crossorigin="anonymous"></' + "script>"
        }
        var n = document.querySelectorAll("script[data-src]"),
            r, i, s;
        for (r = 0; r < n.length; ++r) i = n[r], s = i.attributes["data-src"].value, document.write(t(s)), i.parentNode.removeChild(i)
    }()
})(this);