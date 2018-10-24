var e = "300";

function t() {
    return Math.random().toString(36).substring(7)
}

function n(e) {
    var t = "";
    return e ? (e.forceEmbedLayout && (t += "embed=1"), e.clickToLoad && (t += (t.length ? "&" : "") + "ctl=1"), e.openFile && (t += (t.length ? "&" : "") + "file=" + e.openFile), !e.view || "preview" !== e.view && "editor" !== e.view || (t += (t.length ? "&" : "") + "view=" + e.view), e.hideExplorer && (t += (t.length ? "&" : "") + "hideExplorer=1"), e.hideNavigation && (t += (t.length ? "&" : "") + "hideNavigation=1;"), e.hideDevTools && (t += (t.length ? "&" : "") + "hidedevtools=1"), "number" == typeof e.devToolsHeight && e.devToolsHeight > 0 && e.devToolsHeight < 100 && (t += (t.length ? "&" : "") + "devtoolsheight=" + e.devToolsHeight), t.length ? "?" + t : t) : t
}

function i(t, n, i) {
    if (null === t.parentNode) throw new Error("Invalid Element");
    n.id = t.id,
        function(t, n) {
            n && (n.hasOwnProperty("height") && (t.height = "" + n.height), n.hasOwnProperty("width") && (t.width = "" + n.width));
            t.height || (t.height = e);
            t.width || t.setAttribute("style", "width:100%;")
        }(n, i), t.parentNode.replaceChild(n, t)
}

function o(e) {
    if ("string" == typeof e) {
        var t = document.getElementById(e);
        if (null !== t) return t
    } else if (e instanceof HTMLElement) return e;
    throw new Error("Invalid Element")
}

function r(e) {
    return e && !1 === e.newWindow ? "_self" : "_blank"
}
var a = function(e) {
    var t = this;
    this.pending = {}, this.port = e, this.port.onmessage = function(e) {
        if (e.data.payload.__reqid) {
            var n = e.data.payload.__reqid,
                i = e.data.payload.__success;
            if (t.pending[n]) {
                if (delete e.data.payload.__reqid, delete e.data.payload.__success, i) {
                    var o = 0 === Object.keys(e.data.payload).length && e.data.payload.constructor === Object ? null : e.data.payload;
                    t.pending[n].resolve(o)
                } else {
                    t.pending[n].reject(e.data.payload.error ? e.data.type + ": " + e.data.payload.error : e.data.type)
                }
                delete t.pending[n]
            }
        }
    }
};
a.prototype.request = function(e) {
    var n = this,
        i = t();
    return new Promise(function(t, o) {
        n.pending[i] = {
            resolve: t,
            reject: o
        }, e.payload.__reqid = i, n.port.postMessage(e)
    })
};
var d = function(e, t) {
    var n = this;
    this.rdc = new a(e), this.preview = {}, Object.defineProperty(this.preview, "origin", {
        value: t.previewOrigin,
        writable: !1
    }), this.editor = {
        openFile: function(e) {
            return n.rdc.request({
                type: "SDK_OPEN_FILE",
                payload: {
                    path: e
                }
            })
        }
    }
};
d.prototype.applyFsDiff = function(e) {
    return this.rdc.request({
        type: "SDK_APPLY_FS_DIFF",
        payload: e
    })
}, d.prototype.getFsSnapshot = function() {
    return this.rdc.request({
        type: "SDK_GET_FS_SNAPSHOT",
        payload: {}
    })
}, d.prototype.getDependencies = function() {
    return this.rdc.request({
        type: "SDK_GET_DEPS_SNAPSHOT",
        payload: {}
    })
};
var c = [],
    s = ["typescript", "create-react-app", "angular-cli", "javascript"],
    p = "https://stackblitz.com/run";

function l(e, t) {
    var n = document.createElement("input");
    return n.type = "hidden", n.name = e, n.value = t, n
}

function u(e) {
    if (-1 === s.indexOf(e.template)) throw new Error("Unsupported project template, must be one of: " + s.join(", "));
    var t = document.createElement("form");
    return t.method = "POST", t.setAttribute("style", "display:none;"), t.appendChild(l("project[title]", e.title)), t.appendChild(l("project[description]", e.description)), t.appendChild(l("project[template]", e.template)), e.tags && e.tags.forEach(function(e) {
        t.appendChild(l("project[tags][]", e))
    }), e.dependencies && t.appendChild(l("project[dependencies]", JSON.stringify(e.dependencies))), e.settings && t.appendChild(l("project[settings]", JSON.stringify(e.settings))), Object.keys(e.files).forEach(function(n) {
        t.appendChild(l("project[files][" + n + "]", e.files[n]))
    }), t
}
var h = {
    connect: function(e) {
        if (!e || !e.contentWindow) return Promise.reject("Provided element is not an iframe.");
        var n, i, o = (i = (n = e) instanceof Element ? "element" : "id", c.find(function(e) {
            return e[i] === n
        }) || null);
        return o ? o.pending : new function(e) {
            var n = this;
            this.id = t(), this.element = e, this.pending = new Promise(function(e, t) {
                var i = function(t) {
                        t.data.action && "SDK_INIT_SUCCESS" === t.data.action && t.data.id === n.id && (n.vm = new d(t.ports[0], t.data.payload), e(n.vm), r())
                    },
                    o = function() {
                        n.element.contentWindow && n.element.contentWindow.postMessage({
                            action: "SDK_INIT",
                            id: n.id
                        }, "*")
                    };

                function r() {
                    window.clearInterval(s), window.removeEventListener("message", i)
                }
                window.addEventListener("message", i), o();
                var a = 0,
                    s = window.setInterval(function() {
                        if (n.vm) r();
                        else {
                            if (a >= 20) return r(), t("Timeout: Unable to establish a connection with the StackBlitz VM"), void c.forEach(function(e, t) {
                                e.id === n.id && c.splice(t, 1)
                            });
                            a++, o()
                        }
                    }, 500)
            }), c.push(this)
        }(e).pending
    },
    openGithubProject: function(e, t) {
        window.open("https://stackblitz.com/github/" + e + n(t), r(t));
    },
    openProject: function(e, t): any {
        ! function(e, t): any{
            var i = u(e);
            i.action = p + n(t), i.target = r(t), document.body.appendChild(i), i.submit(), document.body.removeChild(i)
        }(e, t)
    },
    openProjectId: function(e, t) {
        window.open("https://stackblitz.com/edit/" + e + n(t), r(t))
    },
    embedGithubProject: function(e, t, r) {
        var a = o(e),
            d = document.createElement("iframe");
        return d.src = "https://stackblitz.com/github/" + t + n(r), i(a, d, r), h.connect(d)
    },
    embedProject: function(e, t, r) {
        var a = o(e),
            d = function(e, t) {
                var i = u(e);
                return i.action = p + n(t), i.id = "sb", "<html><head><title></title></head><body>" + i.outerHTML + "<script>document.getElementById('sb').submit();<\/script></body></html>"
            }(t, r),
            c = document.createElement("iframe");
        return i(a, c, r), c.contentDocument && c.contentDocument.write(d), h.connect(c)
    },
    embedProjectId: function(e, t, r) {
        var a = o(e),
            d = document.createElement("iframe");
        return d.src = "https://stackblitz.com/edit/" + t + n(r), i(a, d, r), h.connect(d)
    }
};
export default h;
