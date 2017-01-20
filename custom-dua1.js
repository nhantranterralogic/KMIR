/*================================
 * INSERT LIBs
 *================================*/
// document.write("\<script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min.js' type='text/javascript'>\<\/script>");
document.write("\<script src='http://ftpcontent.worldnow.com/wncustom/custom/wthr/2013/helpers.js' type='text/javascript'>\<\/script>");
document.write("\<script src='http://ftpcontent.worldnow.com/wncustom/js/jquery.ellipsis.js' type='text/javascript'>\<\/script>");
document.write("\<script src='http://ftpcontent.worldnow.com/wncustom/custom/wthr/2013/helpers.js' type='text/javascript'>\<\/script>");

if (window.location.host == "managekmir.worldnow.com") {
    document.write("\<script src='https://code.jquery.com/jquery-1.11.0.js' integrity='sha256-zgND4db0iXaO7v4CLBIYHGoIIudWI5hRMQrPB20j0Qw=' crossorigin='anonymous' type='text/javascript'>\<\/script>");
}

/* httprequest */
if (typeof (wng_includesTracker) == 'undefined') { var wng_includesTracker = {}; } wng_includesTracker['/global/interface/httprequest/httprequest.js'] = 1; if (!wng_includesTracker['/global/interface/globals.js']) { var wng_includesDomain = ''; var wng_includesVersion = ''; try { wng_includesDomain = wng_pageInfo.contentDomain; wng_includesVersion = wng_pageInfo.includesVersion; } catch (e) { wng_includesDomain = 'http://content.worldnow.com'; wng_includesVersion = '20070120'; } document.writeln('<scr' + 'ipt type="text/javascript" src="' + wng_includesDomain + '/global/interface/globals.js?ver=' + wng_includesVersion + '"></scr' + 'ipt>'); } var wng_doc = document; var WNHttpRequestManager = function () { var _PROXY_URL = '/global/interface/httprequest/hrproxy.asp'; var _PROXY_PARAM_URL = 'url'; var _METHODS = { GET: 1, HEAD: 1, POST: 1, PUT: 1, DELETE: 1 }; var _METHOD_DEFAULT = 'GET'; var _POST_MIMETYPE_DEFAULT = 'application/x-www-form-urlencoded'; var _XMLPARSER_LIBVERSIONS = [['MSXML2', '3.0'], ['MSXML2', '2.6'], ['Microsoft', '']]; var _RESPONSE_HEADERS_DELIMITER = new RegExp(':\\s+|\\n', 'g'); var _READYSTATE_HANDLERS = { onSuccess: true, onError: true, onCompleted: 4, onInteractive: 3, onLoaded: 2, onLoading: 1, onUninitialized: 0 }; var _encodeURIComponent = (typeof (encodeURIComponent) != 'undefined') ? encodeURIComponent : escape; function _convertXMLParserObjectType(libraryName, objectType) { if (libraryName != 'Microsoft') { return objectType; } switch (objectType) { case 'DOMDocument': { return 'XMLDOM'; break; } case 'FreeThreadedDOMDocument': { return 'FreeThreadedXMLDOM'; break; } case 'DSOControl': { return 'XMLDSO'; break; } default: { return objectType; break; } } } function _getProgId(libraryName, objectType, version) { var progId = ''; if (libraryName && objectType) { progId = libraryName + '.' + objectType; if (version) { progId += '.' + version; } } return progId; } function _getXMLParserActiveXControl(objectType) { if (!objectType || !window.ActiveXObject) { return; } var libraryName = _getXMLParserActiveXControl.libraryName; if (libraryName) { objectType = _convertXMLParserObjectType(libraryName, objectType); return new ActiveXObject(_getProgId(libraryName, objectType, _getXMLParserActiveXControl.version)); } var libVersion, libraryName, version, tempObjectType, xmlHttp, xmlParserObj; for (var i = 0, v = _XMLPARSER_LIBVERSIONS, l = v.length; i < l; i++) { libVersion = v[i], libraryName = libVersion[0], version = libVersion[1]; try { tempObjectType = _convertXMLParserObjectType(libraryName, objectType); xmlParserObj = new ActiveXObject(_getProgId(libraryName, tempObjectType, version)); _getXMLParserActiveXControl.libraryName = libraryName; _getXMLParserActiveXControl.version = version; return xmlParserObj; } catch (e) { } } } function _getXMLHttpRequest() { var request = null; try { if (window.XMLHttpRequest) { request = new XMLHttpRequest(); } else { request = _getXMLParserActiveXControl('XMLHTTP'); } } catch (e) { request = null; } return request; } function _loadXMLDocFromString(text) { var xmlDoc = null; if (text) { if (window.DOMParser) { var parser = new DOMParser(); xmlDoc = parser.parseFromString(text, 'text/xml'); if (xmlDoc.documentElement.nodeName == 'parsererror') { xmlDoc = null; } } else { xmlDoc = _getXMLParserActiveXControl('DOMDocument'); if (xmlDoc) { xmlDoc.async = false; loaded = xmlDoc.loadXML(text); if (!loaded) { xmlDoc = null; } } } } return xmlDoc; } function _setRequestHeaders(request, headers) { try { for (var header in headers) { request.setRequestHeader(header, headers[header]); } } catch (e) { } } function _extractResponseHeaders(headersText) { var values = headersText.split(_RESPONSE_HEADERS_DELIMITER); var headers = {}; var l = headers.length; if (l) { var i = 0; do { headers[values[i++]] = values[i++]; } while (i < l); } return headers; } function _XMLHttpResponse(request) { this.status = request.status; this.statusText = request.statusText; this.responseText = request.responseText; responseXML = request.responseXML; if (!responseXML || !responseXML.documentElement) { responseXML = _loadXMLDocFromString(this.responseText); } this.responseXML = responseXML; this._headersText = request.getAllResponseHeaders(); this._headers = null; } _XMLHttpResponse.prototype = { getResponseHeader: function (header) { if (!this._headers) { this._headers = _extractResponseHeaders(this._headersText); } return this._headers[header]; }, getAllResponseHeaders: function () { return this._headersText; } }; function _XMLHttpWrapper(url, options) { this.url = url; this.setOptions(options); this._statesHandled = {}; var self = this; this._handleRequestChange = function () { try { var readyState = self.request.readyState; } catch (e) { self.onRequestError(e); } switch (readyState) { case 0: { self._performCallback('onUninitialized'); break; } case 1: { self._performCallback('onLoading'); break; } case 2: { self._performCallback('onLoaded'); break; } case 3: { self._performCallback('onInteractive'); break; } case 4: { self._onRequestStateCompleted(); break; } } }; } _XMLHttpWrapper.prototype = { PROXY_URL: _PROXY_URL, setOptions: function (options) { if (typeof (options) != 'object' || options instanceof Array) { options = {}; } options.async = true; if (!_METHODS[options.method]) { options.method = _METHOD_DEFAULT; } if (!options.requestHeaders) { options.requestHeaders = {}; } if (options.method == 'POST') { if (!options.postData) { options.postData = ''; } if (!options.requestHeaders['Content-Type']) { options.requestHeaders['Content-Type'] = _POST_MIMETYPE_DEFAULT; } } if (!options.parameters) { options.parameters = ''; } this.options = options; }, getRequestUrl: function () { var url = this.url, useProxy = false; if (!url || typeof (url) != 'string') { return null; } var domainStart = url.indexOf('//'), slashIndex = url.indexOf('/'), urlLen = url.length; var hostEnd = (slashIndex > -1) ? slashIndex : urlLen; if (domainStart > -1 || (url.substring(0, hostEnd)).indexOf('.') > -1) { var protocol = url.substring(0, url.indexOf(':') + 1); if (protocol && protocol != window.location.protocol) { useProxy = true; } else { var domainEnd = url.indexOf('/', domainStart + 2); domainStart = (domainStart != -1) ? domainStart + 2 : 0, domainEnd = (domainEnd != -1) ? domainEnd : urlLen; var domain = url.substring(domainStart, domainEnd); if (window.location.host != domain) { useProxy = true; } } } var separator = (url.indexOf('?') == -1) ? '?' : '&'; var options = this.options; if (options.method == 'GET') { var parameters = this.getRequestParameters(); if (parameters.length) { url += separator + parameters; } } var fullUrl = ''; if (useProxy) { url = _encodeURIComponent(url); fullUrl += this.PROXY_URL; var separator = (fullUrl.indexOf('?') == -1) ? '?' : '&'; var parameters = this.getRequestParameters('proxyParameters'); if (parameters.length) { fullUrl += separator + parameters; separator = '&'; } fullUrl += separator + _PROXY_PARAM_URL + '='; } fullUrl += url; var separator = (fullUrl.indexOf('?') == -1) ? '?' : '&'; fullUrl += separator + 'rand=' + (Math.floor(Math.random() * 999999)); return fullUrl; }, getRequestParameters: function (type) { var parameters = (type != 'proxyParameters') ? this.options['parameters'] : this.options['proxyParameters']; var paramsTypeOf = typeof (parameters); var paramsStr = ''; if (parameters && paramsTypeOf == 'string') { var params = parameters.split('&'); for (var i = 0, l = params.length, param; i < l; i++) { param = params[i].split('='); paramsStr += '&' + _encodeURIComponent(param[0]) + '=' + _encodeURIComponent(param[1]); } } else if (paramsTypeOf == 'object' && !(parameters instanceof Array)) { for (var key in parameters) { paramsStr += '&' + _encodeURIComponent(key) + '=' + _encodeURIComponent(parameters[key]); } } if (paramsStr) { paramsStr = paramsStr.substr(1); } return paramsStr; }, makeRequest: function () { try { var request = _getXMLHttpRequest(); if (request) { var url = this.getRequestUrl(); if (url) { this.request = request; var options = this.options, method = options.method, headers = options.requestHeaders; var content = null; if (method == 'POST') { content = options.postData; if (headers.mimetype == _POST_MIMETYPE_DEFAULT) { var parameters = this.getRequestParameters(); if (parameters) { if (content) { content += '&'; } content += parameters; } } headers['Content-Length'] = content.length; headers['Connection'] = 'close'; } request.onreadystatechange = this._handleRequestChange; if (typeof (WNClosureTracker) != 'undefined') { WNClosureTracker.add(this.request, 'onreadystatechange', true); WNClosureTracker.add(this, 'request'); } request.open(method, url, options.async); _setRequestHeaders(request, headers); request.send(content); } else { throw new Error('Invalid request url'); } } else { throw new Error('XMLHTTPRequest not supported by this browser'); } } catch (e) { this.onRequestError(e); } }, _performCallback: function (name) { try { if (this._statesHandled[name]) { return; } this._statesHandled[name] = true; var callback = this.options[name]; if (callback) { var handler, args = []; if (typeof (callback) == 'function') { handler = callback; } else if (callback instanceof Array) { handler = callback[0]; if (callback.length > 1) { args = callback[1]; } } else if (typeof (callback) == 'object') { handler = callback.callback; if (typeof (callback.args) != 'undefined') { args = callback.args; } } if (!(args instanceof Array)) { args = [args]; } if (arguments.length > 1) { var al = args.length; for (var i = 1, l = arguments.length; i < l; i++) { args[al++] = arguments[i]; } } if (typeof (handler) == 'function') { if (handler.apply) { handler.apply(this, args); } else { var arg; for (var i = 0, l = args.length, arg; i < l; i++) { arg = args[i]; if (typeof (arg) == 'string') { args[i] = "'" + arg + "'"; } } eval('handler(' + args.toString() + ')'); } } } } catch (e) { if (name != 'onError') { this.onRequestError(e); } else { } } }, onRequestError: function (e) { this.errorMessage = (e.message || e); this._performCallback('onError', e); }, _onRequestStateCompleted: function () { try { if (this._statesHandled['onCompleted']) { return; } this.response = new _XMLHttpResponse(this.request); this._performCallback('onCompleted'); var status = this.response.status; delete this.request['onreadystatechange']; this.request = null; if (status == 200 || status == 304) { this._performCallback('onSuccess'); } else { throw new Error('XMLHTTPRequest status was ' + status); } } catch (e) { this.onRequestError(e); } } }; var Manager = { Handlers: {}, makeRequest: function (url, options) { var xmlHttpRequest = new _XMLHttpWrapper(url, options); xmlHttpRequest.makeRequest(); return xmlHttpRequest; }, transferNodeData: function (parent, nodeName, target) { var result = false; try { var source = parent.getElementsByTagName(nodeName); source = (source.length) ? source[0] : this.retrieveChildElement(parent, nodeName); if (source) { var hasInnerHTML = typeof (target.innerHTML) != 'undefined'; var nLen = source.childNodes.length; if (hasInnerHTML && nLen == 1) { target.innerHTML = source.firstChild.nodeValue; result = true; } else if (hasInnerHTML && typeof (source.xml) != 'undefined' && nLen) { if (nLen == 1) { target.innerHTML = source.firstChild.xml; } else { var htmlStr = ''; var child = source.firstChild; if (child) { do { htmlStr += child.xml; } while (child = child.nextSibling); } target.innerHTML = htmlStr; } result = true; } else { try { target.appendChild(wng_doc.importNode(source, true)); result = true; } catch (e) { } } } } catch (e) { } if (!result && target && target.style) { target.style.display = 'none'; } return result; }, retrieveChildElement: function (parent, nodeName) { if (!parent.childNamesIndex) { parent.childNamesIndex = { _index: 0 }; } var namesIndex = parent.childNamesIndex; var nIndex = (!recalculate) ? namesIndex._index : 0; var nodes = parent.childNodes, nLen = nodes.length; if (nIndex === nLen) { var cIndex = namesIndex[nodeName]; return (typeof (cIndex) == 'number') ? nodes[cIndex] : null; } var node; while (nIndex < nLen) { node = nodes[nIndex]; if (node.nodeType === 1) { namesIndex[node.nodeName] = nIndex; if (node.nodeName === nodeName) { break; } } nIndex++; } namesIndex._index = nIndex; parent.childNamesIndex = namesIndex; var cIndex = namesIndex[nodeName]; return (typeof (cIndex == 'number')) ? nodes[cIndex] : null; } }; Manager.Handlers.RSS = function () { var _RSS_TARGET_DEFAULT = '_blank'; var _RSS_REQUIRED_NODES_DEFAULT = { link: 1, title: 1 }; function _createItemStructure(target) { var item = wng_doc.createElement('DIV'); item.className = 'rssItem'; var href = wng_doc.createElement('A'); href.setAttribute('target', target); item.appendChild(href); var desc = wng_doc.createElement('DIV'); desc.className = 'rssItemDesc'; item.appendChild(desc); return item; } return { onSuccess: function (targetId, options) { try { if (!options) { options = {}; } var wrapper = wng_doc.getElementById(targetId); if (options.clearTarget) { var child = wrapper.firstChild; while (child) { wrapper.removeChild(child); child = wrapper.firstChild; } } var xmlDoc = this.response.responseXML; var nodes = xmlDoc.documentElement.getElementsByTagName('item'), nLen = nodes.length; if (nLen == 0 && options.hideEmpty) { return; } var limit = options.limit; if (typeof (limit) != 'number' || limit > nLen) { limit = nLen; } var bucket = wng_doc.createElement('DIV'); bucket.className = 'rssBucket'; var header = wng_doc.createElement('DIV'); header.className = 'rssHeader'; var oHeader = options.header; if (oHeader) { if (typeof (header.innerHTML) != 'undefined') { header.innerHTML = oHeader; } else { oHeader = (oHeader.nodeType) ? oHeader.cloneNode(true) : wng_doc.createTextNode(oHeader); header.appendChild(oHeader); } } var footer = wng_doc.createElement('DIV'); footer.className = 'rssFooter'; var oFooter = options.footer; if (oFooter) { if (typeof (footer.innerHTML) != 'undefined') { footer.innerHTML = oFooter; } else { oFooter = (oFooter.nodeType) ? oFooter.cloneNode(true) : wng_doc.createTextNode(oFooter); footer.appendChild(oFooter); } } var items = wng_doc.createElement('DIV'); items.className = 'rssItems'; var displayWhileLoading = options.displayWhileLoading; if (displayWhileLoading) { bucket.appendChild(header); bucket.appendChild(items); wrapper.appendChild(bucket); } var itemClone = _createItemStructure(options.target || _RSS_TARGET_DEFAULT); var requiredNodes = options.requiredNodes || _RSS_REQUIRED_NODES_DEFAULT; var transfer = WNHttpRequestManager.transferNodeData; var retrieve = WNHttpRequestManager.retrieveChildElement; for (var i = 0, node, item, linkVal; i < limit; i++) { node = nodes[i]; item = itemClone.cloneNode(true); linkVal = node.getElementsByTagName('link'); linkVal = (linkVal.length) ? linkVal[0] : retrieve(node, 'link'); linkVal = (linkVal) ? linkVal.firstChild : null; if (linkVal && linkVal.nodeValue) { item.firstChild.setAttribute('href', linkVal.nodeValue); } else if (requiredNodes['link']) { continue; } if (!transfer(node, 'title', item.firstChild) && requiredNodes['title']) { continue; } if (!transfer(node, 'description', item.lastChild) && requiredNodes['description']) { continue; } items.appendChild(item); } if (!displayWhileLoading) { bucket.appendChild(header); bucket.appendChild(items); } bucket.appendChild(footer); if (!displayWhileLoading) { wrapper.appendChild(bucket); } } catch (e) { this.onRequestError(e); } }, onError: function (targetId, options, e) { try { if (!options) { options = {}; } if (options.hideTarget) { var wrapper = wng_doc.getElementById(targetId); wrapper.style.display = 'none'; } } catch (e) { } } }; } (); return Manager; } ();


/*! jCarousel - v0.3.3 - 2015-02-28
* http://sorgalla.com/jcarousel/
* Copyright (c) 2006-2015 Jan Sorgalla; Licensed MIT */
(function (t) { "use strict"; var i = t.jCarousel = {}; i.version = "0.3.3"; var s = /^([+\-]=)?(.+)$/; i.parseTarget = function (t) { var i = !1, e = "object" != typeof t ? s.exec(t) : null; return e ? (t = parseInt(e[2], 10) || 0, e[1] && (i = !0, "-=" === e[1] && (t *= -1))) : "object" != typeof t && (t = parseInt(t, 10) || 0), { target: t, relative: i} }, i.detectCarousel = function (t) { for (var i; t.length > 0; ) { if (i = t.filter("[data-jcarousel]"), i.length > 0) return i; if (i = t.find("[data-jcarousel]"), i.length > 0) return i; t = t.parent() } return null }, i.base = function (s) { return { version: i.version, _options: {}, _element: null, _carousel: null, _init: t.noop, _create: t.noop, _destroy: t.noop, _reload: t.noop, create: function () { return this._element.attr("data-" + s.toLowerCase(), !0).data(s, this), !1 === this._trigger("create") ? this : (this._create(), this._trigger("createend"), this) }, destroy: function () { return !1 === this._trigger("destroy") ? this : (this._destroy(), this._trigger("destroyend"), this._element.removeData(s).removeAttr("data-" + s.toLowerCase()), this) }, reload: function (t) { return !1 === this._trigger("reload") ? this : (t && this.options(t), this._reload(), this._trigger("reloadend"), this) }, element: function () { return this._element }, options: function (i, s) { if (0 === arguments.length) return t.extend({}, this._options); if ("string" == typeof i) { if (s === void 0) return this._options[i] === void 0 ? null : this._options[i]; this._options[i] = s } else this._options = t.extend({}, this._options, i); return this }, carousel: function () { return this._carousel || (this._carousel = i.detectCarousel(this.options("carousel") || this._element), this._carousel || t.error('Could not detect carousel for plugin "' + s + '"')), this._carousel }, _trigger: function (i, e, r) { var n, o = !1; return r = [this].concat(r || []), (e || this._element).each(function () { n = t.Event((s + ":" + i).toLowerCase()), t(this).trigger(n, r), n.isDefaultPrevented() && (o = !0) }), !o } } }, i.plugin = function (s, e) { var r = t[s] = function (i, s) { this._element = t(i), this.options(s), this._init(), this.create() }; return r.fn = r.prototype = t.extend({}, i.base(s), e), t.fn[s] = function (i) { var e = Array.prototype.slice.call(arguments, 1), n = this; return "string" == typeof i ? this.each(function () { var r = t(this).data(s); if (!r) return t.error("Cannot call methods on " + s + " prior to initialization; " + 'attempted to call method "' + i + '"'); if (!t.isFunction(r[i]) || "_" === i.charAt(0)) return t.error('No such method "' + i + '" for ' + s + " instance"); var o = r[i].apply(r, e); return o !== r && o !== void 0 ? (n = o, !1) : void 0 }) : this.each(function () { var e = t(this).data(s); e instanceof r ? e.reload(i) : new r(this, i) }), n }, r } })(jQuery), function (t, i) { "use strict"; var s = function (t) { return parseFloat(t) || 0 }; t.jCarousel.plugin("jcarousel", { animating: !1, tail: 0, inTail: !1, resizeTimer: null, lt: null, vertical: !1, rtl: !1, circular: !1, underflow: !1, relative: !1, _options: { list: function () { return this.element().children().eq(0) }, items: function () { return this.list().children() }, animation: 400, transitions: !1, wrap: null, vertical: null, rtl: null, center: !1 }, _list: null, _items: null, _target: t(), _first: t(), _last: t(), _visible: t(), _fullyvisible: t(), _init: function () { var t = this; return this.onWindowResize = function () { t.resizeTimer && clearTimeout(t.resizeTimer), t.resizeTimer = setTimeout(function () { t.reload() }, 100) }, this }, _create: function () { this._reload(), t(i).on("resize.jcarousel", this.onWindowResize) }, _destroy: function () { t(i).off("resize.jcarousel", this.onWindowResize) }, _reload: function () { this.vertical = this.options("vertical"), null == this.vertical && (this.vertical = this.list().height() > this.list().width()), this.rtl = this.options("rtl"), null == this.rtl && (this.rtl = function (i) { if ("rtl" === ("" + i.attr("dir")).toLowerCase()) return !0; var s = !1; return i.parents("[dir]").each(function () { return /rtl/i.test(t(this).attr("dir")) ? (s = !0, !1) : void 0 }), s } (this._element)), this.lt = this.vertical ? "top" : "left", this.relative = "relative" === this.list().css("position"), this._list = null, this._items = null; var i = this.index(this._target) >= 0 ? this._target : this.closest(); this.circular = "circular" === this.options("wrap"), this.underflow = !1; var s = { left: 0, top: 0 }; return i.length > 0 && (this._prepare(i), this.list().find("[data-jcarousel-clone]").remove(), this._items = null, this.underflow = this._fullyvisible.length >= this.items().length, this.circular = this.circular && !this.underflow, s[this.lt] = this._position(i) + "px"), this.move(s), this }, list: function () { if (null === this._list) { var i = this.options("list"); this._list = t.isFunction(i) ? i.call(this) : this._element.find(i) } return this._list }, items: function () { if (null === this._items) { var i = this.options("items"); this._items = (t.isFunction(i) ? i.call(this) : this.list().find(i)).not("[data-jcarousel-clone]") } return this._items }, index: function (t) { return this.items().index(t) }, closest: function () { var i, e = this, r = this.list().position()[this.lt], n = t(), o = !1, l = this.vertical ? "bottom" : this.rtl && !this.relative ? "left" : "right"; return this.rtl && this.relative && !this.vertical && (r += this.list().width() - this.clipping()), this.items().each(function () { if (n = t(this), o) return !1; var a = e.dimension(n); if (r += a, r >= 0) { if (i = a - s(n.css("margin-" + l)), !(0 >= Math.abs(r) - a + i / 2)) return !1; o = !0 } }), n }, target: function () { return this._target }, first: function () { return this._first }, last: function () { return this._last }, visible: function () { return this._visible }, fullyvisible: function () { return this._fullyvisible }, hasNext: function () { if (!1 === this._trigger("hasnext")) return !0; var t = this.options("wrap"), i = this.items().length - 1, s = this.options("center") ? this._target : this._last; return i >= 0 && !this.underflow && (t && "first" !== t || i > this.index(s) || this.tail && !this.inTail) ? !0 : !1 }, hasPrev: function () { if (!1 === this._trigger("hasprev")) return !0; var t = this.options("wrap"); return this.items().length > 0 && !this.underflow && (t && "last" !== t || this.index(this._first) > 0 || this.tail && this.inTail) ? !0 : !1 }, clipping: function () { return this._element["inner" + (this.vertical ? "Height" : "Width")]() }, dimension: function (t) { return t["outer" + (this.vertical ? "Height" : "Width")](!0) }, scroll: function (i, s, e) { if (this.animating) return this; if (!1 === this._trigger("scroll", null, [i, s])) return this; t.isFunction(s) && (e = s, s = !0); var r = t.jCarousel.parseTarget(i); if (r.relative) { var n, o, l, a, h, u, c, f, d = this.items().length - 1, _ = Math.abs(r.target), p = this.options("wrap"); if (r.target > 0) { var g = this.index(this._last); if (g >= d && this.tail) this.inTail ? "both" === p || "last" === p ? this._scroll(0, s, e) : t.isFunction(e) && e.call(this, !1) : this._scrollTail(s, e); else if (n = this.index(this._target), this.underflow && n === d && ("circular" === p || "both" === p || "last" === p) || !this.underflow && g === d && ("both" === p || "last" === p)) this._scroll(0, s, e); else if (l = n + _, this.circular && l > d) { for (f = d, h = this.items().get(-1); l > f++; ) h = this.items().eq(0), u = this._visible.index(h) >= 0, u && h.after(h.clone(!0).attr("data-jcarousel-clone", !0)), this.list().append(h), u || (c = {}, c[this.lt] = this.dimension(h), this.moveBy(c)), this._items = null; this._scroll(h, s, e) } else this._scroll(Math.min(l, d), s, e) } else if (this.inTail) this._scroll(Math.max(this.index(this._first) - _ + 1, 0), s, e); else if (o = this.index(this._first), n = this.index(this._target), a = this.underflow ? n : o, l = a - _, 0 >= a && (this.underflow && "circular" === p || "both" === p || "first" === p)) this._scroll(d, s, e); else if (this.circular && 0 > l) { for (f = l, h = this.items().get(0); 0 > f++; ) { h = this.items().eq(-1), u = this._visible.index(h) >= 0, u && h.after(h.clone(!0).attr("data-jcarousel-clone", !0)), this.list().prepend(h), this._items = null; var v = this.dimension(h); c = {}, c[this.lt] = -v, this.moveBy(c) } this._scroll(h, s, e) } else this._scroll(Math.max(l, 0), s, e) } else this._scroll(r.target, s, e); return this._trigger("scrollend"), this }, moveBy: function (t, i) { var e = this.list().position(), r = 1, n = 0; return this.rtl && !this.vertical && (r = -1, this.relative && (n = this.list().width() - this.clipping())), t.left && (t.left = e.left + n + s(t.left) * r + "px"), t.top && (t.top = e.top + n + s(t.top) * r + "px"), this.move(t, i) }, move: function (i, s) { s = s || {}; var e = this.options("transitions"), r = !!e, n = !!e.transforms, o = !!e.transforms3d, l = s.duration || 0, a = this.list(); if (!r && l > 0) return a.animate(i, s), void 0; var h = s.complete || t.noop, u = {}; if (r) { var c = { transitionDuration: a.css("transitionDuration"), transitionTimingFunction: a.css("transitionTimingFunction"), transitionProperty: a.css("transitionProperty") }, f = h; h = function () { t(this).css(c), f.call(this) }, u = { transitionDuration: (l > 0 ? l / 1e3 : 0) + "s", transitionTimingFunction: e.easing || s.easing, transitionProperty: l > 0 ? function () { return n || o ? "all" : i.left ? "left" : "top" } () : "none", transform: "none"} } o ? u.transform = "translate3d(" + (i.left || 0) + "," + (i.top || 0) + ",0)" : n ? u.transform = "translate(" + (i.left || 0) + "," + (i.top || 0) + ")" : t.extend(u, i), r && l > 0 && a.one("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd", h), a.css(u), 0 >= l && a.each(function () { h.call(this) }) }, _scroll: function (i, s, e) { if (this.animating) return t.isFunction(e) && e.call(this, !1), this; if ("object" != typeof i ? i = this.items().eq(i) : i.jquery === void 0 && (i = t(i)), 0 === i.length) return t.isFunction(e) && e.call(this, !1), this; this.inTail = !1, this._prepare(i); var r = this._position(i), n = this.list().position()[this.lt]; if (r === n) return t.isFunction(e) && e.call(this, !1), this; var o = {}; return o[this.lt] = r + "px", this._animate(o, s, e), this }, _scrollTail: function (i, s) { if (this.animating || !this.tail) return t.isFunction(s) && s.call(this, !1), this; var e = this.list().position()[this.lt]; this.rtl && this.relative && !this.vertical && (e += this.list().width() - this.clipping()), this.rtl && !this.vertical ? e += this.tail : e -= this.tail, this.inTail = !0; var r = {}; return r[this.lt] = e + "px", this._update({ target: this._target.next(), fullyvisible: this._fullyvisible.slice(1).add(this._visible.last()) }), this._animate(r, i, s), this }, _animate: function (i, s, e) { if (e = e || t.noop, !1 === this._trigger("animate")) return e.call(this, !1), this; this.animating = !0; var r = this.options("animation"), n = t.proxy(function () { this.animating = !1; var t = this.list().find("[data-jcarousel-clone]"); t.length > 0 && (t.remove(), this._reload()), this._trigger("animateend"), e.call(this, !0) }, this), o = "object" == typeof r ? t.extend({}, r) : { duration: r }, l = o.complete || t.noop; return s === !1 ? o.duration = 0 : t.fx.speeds[o.duration] !== void 0 && (o.duration = t.fx.speeds[o.duration]), o.complete = function () { n(), l.call(this) }, this.move(i, o), this }, _prepare: function (i) { var e, r, n, o, l = this.index(i), a = l, h = this.dimension(i), u = this.clipping(), c = this.vertical ? "bottom" : this.rtl ? "left" : "right", f = this.options("center"), d = { target: i, first: i, last: i, visible: i, fullyvisible: u >= h ? i : t() }; if (f && (h /= 2, u /= 2), u > h) for (; ; ) { if (e = this.items().eq(++a), 0 === e.length) { if (!this.circular) break; if (e = this.items().eq(0), i.get(0) === e.get(0)) break; if (r = this._visible.index(e) >= 0, r && e.after(e.clone(!0).attr("data-jcarousel-clone", !0)), this.list().append(e), !r) { var _ = {}; _[this.lt] = this.dimension(e), this.moveBy(_) } this._items = null } if (o = this.dimension(e), 0 === o) break; if (h += o, d.last = e, d.visible = d.visible.add(e), n = s(e.css("margin-" + c)), u >= h - n && (d.fullyvisible = d.fullyvisible.add(e)), h >= u) break } if (!this.circular && !f && u > h) for (a = l; ; ) { if (0 > --a) break; if (e = this.items().eq(a), 0 === e.length) break; if (o = this.dimension(e), 0 === o) break; if (h += o, d.first = e, d.visible = d.visible.add(e), n = s(e.css("margin-" + c)), u >= h - n && (d.fullyvisible = d.fullyvisible.add(e)), h >= u) break } return this._update(d), this.tail = 0, f || "circular" === this.options("wrap") || "custom" === this.options("wrap") || this.index(d.last) !== this.items().length - 1 || (h -= s(d.last.css("margin-" + c)), h > u && (this.tail = h - u)), this }, _position: function (t) { var i = this._first, s = i.position()[this.lt], e = this.options("center"), r = e ? this.clipping() / 2 - this.dimension(i) / 2 : 0; return this.rtl && !this.vertical ? (s -= this.relative ? this.list().width() - this.dimension(i) : this.clipping() - this.dimension(i), s += r) : s -= r, !e && (this.index(t) > this.index(i) || this.inTail) && this.tail ? (s = this.rtl && !this.vertical ? s - this.tail : s + this.tail, this.inTail = !0) : this.inTail = !1, -s }, _update: function (i) { var s, e = this, r = { target: this._target, first: this._first, last: this._last, visible: this._visible, fullyvisible: this._fullyvisible }, n = this.index(i.first || r.first) < this.index(r.first), o = function (s) { var o = [], l = []; i[s].each(function () { 0 > r[s].index(this) && o.push(this) }), r[s].each(function () { 0 > i[s].index(this) && l.push(this) }), n ? o = o.reverse() : l = l.reverse(), e._trigger(s + "in", t(o)), e._trigger(s + "out", t(l)), e["_" + s] = i[s] }; for (s in i) o(s); return this } }) } (jQuery, window), function (t) { "use strict"; t.jcarousel.fn.scrollIntoView = function (i, s, e) { var r, n = t.jCarousel.parseTarget(i), o = this.index(this._fullyvisible.first()), l = this.index(this._fullyvisible.last()); if (r = n.relative ? 0 > n.target ? Math.max(0, o + n.target) : l + n.target : "object" != typeof n.target ? n.target : this.index(n.target), o > r) return this.scroll(r, s, e); if (r >= o && l >= r) return t.isFunction(e) && e.call(this, !1), this; for (var a, h = this.items(), u = this.clipping(), c = this.vertical ? "bottom" : this.rtl ? "left" : "right", f = 0; ; ) { if (a = h.eq(r), 0 === a.length) break; if (f += this.dimension(a), f >= u) { var d = parseFloat(a.css("margin-" + c)) || 0; f - d !== u && r++; break } if (0 >= r) break; r-- } return this.scroll(r, s, e) } } (jQuery), function (t) { "use strict"; t.jCarousel.plugin("jcarouselControl", { _options: { target: "+=1", event: "click", method: "scroll" }, _active: null, _init: function () { this.onDestroy = t.proxy(function () { this._destroy(), this.carousel().one("jcarousel:createend", t.proxy(this._create, this)) }, this), this.onReload = t.proxy(this._reload, this), this.onEvent = t.proxy(function (i) { i.preventDefault(); var s = this.options("method"); t.isFunction(s) ? s.call(this) : this.carousel().jcarousel(this.options("method"), this.options("target")) }, this) }, _create: function () { this.carousel().one("jcarousel:destroy", this.onDestroy).on("jcarousel:reloadend jcarousel:scrollend", this.onReload), this._element.on(this.options("event") + ".jcarouselcontrol", this.onEvent), this._reload() }, _destroy: function () { this._element.off(".jcarouselcontrol", this.onEvent), this.carousel().off("jcarousel:destroy", this.onDestroy).off("jcarousel:reloadend jcarousel:scrollend", this.onReload) }, _reload: function () { var i, s = t.jCarousel.parseTarget(this.options("target")), e = this.carousel(); if (s.relative) i = e.jcarousel(s.target > 0 ? "hasNext" : "hasPrev"); else { var r = "object" != typeof s.target ? e.jcarousel("items").eq(s.target) : s.target; i = e.jcarousel("target").index(r) >= 0 } return this._active !== i && (this._trigger(i ? "active" : "inactive"), this._active = i), this } }) } (jQuery), function (t) { "use strict"; t.jCarousel.plugin("jcarouselPagination", { _options: { perPage: null, item: function (t) { return '<a href="#' + t + '">' + t + "</a>" }, event: "click", method: "scroll" }, _carouselItems: null, _pages: {}, _items: {}, _currentPage: null, _init: function () { this.onDestroy = t.proxy(function () { this._destroy(), this.carousel().one("jcarousel:createend", t.proxy(this._create, this)) }, this), this.onReload = t.proxy(this._reload, this), this.onScroll = t.proxy(this._update, this) }, _create: function () { this.carousel().one("jcarousel:destroy", this.onDestroy).on("jcarousel:reloadend", this.onReload).on("jcarousel:scrollend", this.onScroll), this._reload() }, _destroy: function () { this._clear(), this.carousel().off("jcarousel:destroy", this.onDestroy).off("jcarousel:reloadend", this.onReload).off("jcarousel:scrollend", this.onScroll), this._carouselItems = null }, _reload: function () { var i = this.options("perPage"); if (this._pages = {}, this._items = {}, t.isFunction(i) && (i = i.call(this)), null == i) this._pages = this._calculatePages(); else for (var s, e = parseInt(i, 10) || 0, r = this._getCarouselItems(), n = 1, o = 0; ; ) { if (s = r.eq(o++), 0 === s.length) break; this._pages[n] = this._pages[n] ? this._pages[n].add(s) : s, 0 === o % e && n++ } this._clear(); var l = this, a = this.carousel().data("jcarousel"), h = this._element, u = this.options("item"), c = this._getCarouselItems().length; t.each(this._pages, function (i, s) { var e = l._items[i] = t(u.call(l, i, s)); e.on(l.options("event") + ".jcarouselpagination", t.proxy(function () { var t = s.eq(0); if (a.circular) { var e = a.index(a.target()), r = a.index(t); parseFloat(i) > parseFloat(l._currentPage) ? e > r && (t = "+=" + (c - e + r)) : r > e && (t = "-=" + (e + (c - r))) } a[this.options("method")](t) }, l)), h.append(e) }), this._update() }, _update: function () { var i, s = this.carousel().jcarousel("target"); t.each(this._pages, function (t, e) { return e.each(function () { return s.is(this) ? (i = t, !1) : void 0 }), i ? !1 : void 0 }), this._currentPage !== i && (this._trigger("inactive", this._items[this._currentPage]), this._trigger("active", this._items[i])), this._currentPage = i }, items: function () { return this._items }, reloadCarouselItems: function () { return this._carouselItems = null, this }, _clear: function () { this._element.empty(), this._currentPage = null }, _calculatePages: function () { for (var t, i, s = this.carousel().data("jcarousel"), e = this._getCarouselItems(), r = s.clipping(), n = 0, o = 0, l = 1, a = {}; ; ) { if (t = e.eq(o++), 0 === t.length) break; i = s.dimension(t), n + i > r && (l++, n = 0), n += i, a[l] = a[l] ? a[l].add(t) : t } return a }, _getCarouselItems: function () { return this._carouselItems || (this._carouselItems = this.carousel().jcarousel("items")), this._carouselItems } }) } (jQuery), function (t) { "use strict"; t.jCarousel.plugin("jcarouselAutoscroll", { _options: { target: "+=1", interval: 3e3, autostart: !0 }, _timer: null, _init: function () { this.onDestroy = t.proxy(function () { this._destroy(), this.carousel().one("jcarousel:createend", t.proxy(this._create, this)) }, this), this.onAnimateEnd = t.proxy(this.start, this) }, _create: function () { this.carousel().one("jcarousel:destroy", this.onDestroy), this.options("autostart") && this.start() }, _destroy: function () { this.stop(), this.carousel().off("jcarousel:destroy", this.onDestroy) }, start: function () { return this.stop(), this.carousel().one("jcarousel:animateend", this.onAnimateEnd), this._timer = setTimeout(t.proxy(function () { this.carousel().jcarousel("scroll", this.options("target")) }, this), this.options("interval")), this }, stop: function () { return this._timer && (this._timer = clearTimeout(this._timer)), this.carousel().off("jcarousel:animateend", this.onAnimateEnd), this } }) } (jQuery);

/*================================
 * GLOBAL VARIABLES
 *================================*/
var url = window.location.href.indexOf('#') > -1 ? window.location.href.substring(0, window.location.href.indexOf('#')) : window.location.href;
url = url.indexOf('/?clienttype=smartdevice') > -1 ? url.replace('/?clienttype=smartdevice', '') : url; // use check mobile on desktop
url = url.indexOf('?clienttype=smartdevice') > -1 ? url.replace('?clienttype=smartdevice', '') : url; // use check mobile on desktop
var GLOBALDATA = ''; // get all data of the page with JSON format
var GLOBALDATABREAKINGNEWS = '';
var domain = 'http://www.kmir.com/';
var proxyURL = domain + 'global/interface/httprequest/hrproxy.asp?url=';
var weatherDummy = 'http://ftpcontent.worldnow.com/professionalservices/clients/rfdtv/images/weather_author_dummy.PNG';
var iconHourlyForecast = 'http://ftpcontent.worldnow.com/professionalservices/clients/wwny/images/next_icon_weather_page.PNG';
var jsonUrls = {
    dataJSON: "?clienttype=container.json",
    weatherPage: {
        data: "http://data-services.wsi.com/200904-01/576347879/Weather/Report/",
        defaultZipCode: '92262',
        info: '?clienttype=weather.json'
    }
};
// link social of the team weather
var wxTeamSocialInfo = [
    ['Thor', 'https://www.facebook.com/RodeoProfilesSteveKenyon', 'https://twitter.com/ProRodeoLive', 'newsdesk@rfdtv.com'],
    ['Tom Cruise', 'https://www.facebook.com/OfficialRFDTV', 'https://twitter.com/markoppold', 'newsdesk@rfdtv.com']
];
var linkSocialTools = ['https://www.facebook.com/WWNY7.WNYF28',
    '',
    'https://twitter.com/7newsfox28',
    'http://www.wwnytv.com/?sitemap=rss',
    ''
];
// var zipcodeList = ['33900', 'Fort Myers', '34101', 'Naples',
//     '33950', 'punta gorda', '34133', 'Bonita Springs', '33974', 'lehigh acres'];
var zipcodeList = ['92262', 'palm springs', '92211', 'palm desert',
    '92201', 'indio', '92549', 'idyllwild', '92277', 'twentynine palms'];
var urlWeather = 'http://data-services.wsi.com/200904-01/576347879/Weather/Report/';
var urlBreadkingNews = 'http://www.kmir.com/category/322139/breaking-news-category';
var urlMostPopular = 'http://' + wng_pageInfo.baseUrl + '/category/277968/mostpopularstory';
var MOSTPOPULAR = '';
///////////////////
/// setup for page
////////////////
var numberOfBreakingNewsShow = 1;
var querySearch ='/search?vendor=ez&qu=';

/* script block handle render video player in weather block for the weather page */
function WN193040()
{
	      
        var wnWidgetId_801;
        if (wnWidgetId_801 == undefined) wnWidgetId_801 = "193040";

        var WNVideoCanvas801 = new WNVideoWidget("WNVideoCanvas", "divWNVideoCanvas801");
        WNVideoCanvas801.SetStylePackage("dark");
        WNVideoCanvas801.SetVariable("widgetId", wnWidgetId_801);
        WNVideoCanvas801.SetVariable("addThisDivId", "divWNImageCanvas801_addThis");
        WNVideoCanvas801.SetVariable("incanvasAdDivId", "divWNImageCanvas801_adDiv");
        WNVideoCanvas801.SetVariable("helpPage", "http://www.kmir.com/Global/story.asp?S=4925699");
        WNVideoCanvas801.SetVariable("isMute", "false");
        WNVideoCanvas801.SetVariable("isAutoStart", "false");
        WNVideoCanvas801.SetSkin(CANVAS_SKINS.flat.silver);
        WNVideoCanvas801.SetVariable("toolsShareButtons", "link,share");
        WNVideoCanvas801.SetVariable("overlayShareButtons", "link,share");
        WNVideoCanvas801.SetWidth(455);
        WNVideoCanvas801.SetHeight(256);
        WNVideoCanvas801.RenderWidget();

        var WNGallery801 = new WNVideoWidget("WNGallery", "divWNGallery801");
        WNGallery801.SetStylePackage("dark");
        WNGallery801.SetVariable("widgetId", wnWidgetId_801);
        WNGallery801.SetVariable("addThisDivId", "divWNImageCanvas801_addThis");
        WNGallery801.SetVariable("incanvasAdDivId", "divWNImageCanvas801_adDiv");
        WNGallery801.SetVariable("isContinuousPlay", "false");
        WNGallery801.SetVariable("hasSearch", "false");
        WNGallery801.SetVariable("topVideoCatNo", "314823");
        WNGallery801.SetWidth(7);
        WNGallery801.SetHeight(7);
        WNGallery801.RenderWidget();

}

////////////////
/// ***********************support JSON DATA*************************
/////////////////////
/* Methods list */
//// moveAds: move a ad to different place.
//// generateDataLink: generate from link to xml data.
///
var CDEVSupport = {
    msieversion: function() {
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf("MSIE ");
        if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)){
            return (parseInt(ua.substring(msie + 5, ua.indexOf(".", msie))));
        } else {
            return '0';
        }
    },

    convertToEDTTimeZone: function (clientDate, timezone) {
        var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var offset = 0;
        switch (timezone) {
            case 'EST':
                return moment(new Date(clientDate)).utcOffset('-5.0').format('MMM DD, YYYY hh:mm A') + ' EST';
            case 'EDT':
                break;
        }
    },
    // id:
    showLoading: function (id) {
        var loading = '<div class="load-wrapp">' +
            '<div class="load-4">' +
            '<div class="ring-1"></div>' +
            '</div>' +
            '</div>';
        $wn(loading).prependTo($wn('#' + id));
    },
    hideLoading: function () {
        $wn('.load-wrapp').remove();
    },
    extraAd: function (adNum, w, h, $container, method) {

        var newOwnerInfo = $wn.parseJSON('{"' + wng_pageInfo.affiliateName.toLowerCase() + '": {"share":1 }}'),
            $ad = '<div id="WNAd' + adNum + '" class="wnad wnad' + adNum + '"></div>',
            wncc = wng_pageInfo.contentClassification.toLowerCase();

        while (wncc.indexOf(" ") != -1) {
            wncc = wncc.replace(" ", "");
        }

        $container[method]($ad);

        var ad = new Worldnow.Ad({
            id: adNum,
            ownerinfo: newOwnerInfo,
            width: w,
            height: h,
            wncc: wncc,
            type: 'dom',
            application: 'banner',
            parent: 'WNAd' + adNum
        });
        ad.load();
        $wn('#WNTopVideosWrapper').insertAfter($wn('#WNAd146'));
        return;
    },
    /**
     * replace ajax on enviroment Worlnow, and only run on WN
     * @param {[type]} url             [description]
     * @param {[type]} callbacksuccess [description]
     * @param {[type]} callbackerror   [description]
     */
    WNHttpRequestManagerRequest: function (url, callbacksuccess, callbackerror) {
        WNHttpRequestManager.makeRequest(url, {
            onSuccess: function () {
                // var data = $.parseJSON(this.response.responseText);
                callbacksuccess(this.response);
            },
            onError: function (e) {
                console.log('error when call WNHttpRequestManager function.');
                callbackerror(e);
                return;
            }
        });
    },
    /**
     * [description]
     * @param  {[type]} url             [description]
     * @param  {[type]} callbacksuccess [description]
     * @param  {[type]} callbackerror   [description]
     * @return {[type]}                 [description]
     */
    ajaxCall: function (url, callbacksuccess, callbackerror) {
        $.ajax({
            url: url,
            success: function (data) {
                callbacksuccess(data);
            },
            error: function (error) {
                callbackerror(error);
            }
        });
    },
    /**
     * move position of ad copy and remove old AD
     * @param  {Number} idAD        ex: WNAD46 -> idAD = 46
     * @param  {String} idContentAd ex: 246 and must different idAD of WN
     * @param  {String} timeout
     * @param  {String} style    style of jquery assign: append, prependTo, after...
     * @return {String}             no
     */
    moveAds: function (idAD, idADNew, idContentAd, style) {
        if (wng_pageInfo.ads[idAD]) {
            var myad = wng_pageInfo.ads[idAD];
            var ad = wng_pageInfo.ads[idAD];
            ad = null;
            myad.id = idADNew;
            Worldnow.AdMan.attachAd({
                selector: '#' + idContentAd,
                attachStyle: style
            }, myad);
            $wn('#WNAd' + idAD).remove();
        }
    },
    //for generateDataLink to get data from XML
    generateDataLink: function (url) {
        var hashPosition = url.indexOf('#');
        if (hashPosition == -1) {
            return url + '?debug_verbose=XML&frankly-key=MjAxNi0wOS0xNQ==&frankly-email=pmtandhqn@gmail.com&frankly-data=XML';
        } else {
            return url.substring(0, hashPosition) + '?debug_verbose=XML&frankly-key=MjAxNi0wOS0xNQ==&frankly-email=pmtandhqn@gmail.com&frankly-data=XML';
        }
    },
    //for generateDataLink to get data from XML
    generateDataLink: function (url) {
        var hashPosition = url.indexOf('#');
        if (hashPosition == -1) {
            return url + '?debug_verbose=XML&frankly-key=MjAxNi0wOS0xNQ==&frankly-email=pmtandhqn@gmail.com&frankly-data=XML';
        } else {
            return url.substring(0, hashPosition) + '?debug_verbose=XML&frankly-key=MjAxNi0wOS0xNQ==&frankly-email=pmtandhqn@gmail.com&frankly-data=XML';
        }
    },
    escapeRegExp: function (str) {
        return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    },
    replaceAll: function (str, find, replace) {
        if ((typeof replace == 'undefined') || (replace.trim().length == 0)) {
            return '';
        } else {
            return str.replace(new RegExp(this.escapeRegExp(find), 'g'), replace);
        }
    },
    convertDate: function (e, t, i, a) {
        return t = t || "%MMM% %DD%, %YYYY% %h%:%mm% %AMPM% %tz%",
            1 == a ? new Date(e).customFormat(t, i) : new Date(e).customFormat(t, i)
    },
    // Methods of Story(S)
    // remove_tags: remove HTML's tag in text
    // getStoryAbstractImageJSON: get Abstract Image of S
    // getStoryHeadlineJSON: get headline of S
    // getStoryLinkJSON: get link of S
    // getStoryIDJSON: get ID of S
    // getStoryDateJSON: get time of S
    // getStoryAbstractJSON: get abstract content of specific story
    // getStoryIconClipJSON: check S has clip or not
    // spliceStories: get story list from ID, ....
    // getStoryListTopics
    storySuport: {
        remove_tags: function (html) {
            return jQuery(html).text();
        },
        //get abstractimage of specific story
        getStoryAbstractImageJSON: function (story) {
            //if the story is hasn't have any abtractimage, just use default images
            if ((typeof story.abstractimage == 'undefined') || (story.abstractimage.length == 0)) {
                return 'http://kmir.images.worldnow.com/images/4513961_G.jpg';
            } else {
                return story.abstractimage.filename;
            }
        },
        //get headline of specific story
        getStoryHeadlineJSON: function (story) {
            return story.headline;
        },
        //get hyperlink of specific story
        getStoryLinkJSON: function (story) {
            // var type = story.type;
            // var storyID = story.id;
            // var pageurl = story.seo.pageurl;
            // return '/' + type + '/' + storyID + '/' + pageurl;
            var locationm = window.location.protocol+ '//'+ window.location.host;
            var link = story.link.substring(story.link.indexOf('/story/'), story.link.length);
            return locationm + link;
        },
        //get id of specific story
        getStoryIDJSON: function (story) {
            return story.id;
        },
        //get date of specific story
        getStoryDateJSON: function (story) {
            var date;
            //if story has lastediteddate, mean that story has been edited
            if ((typeof story.lastEditedDate !== 'undefined') || (story.lastEditedDate.length > 0)) {
                date = 'Updated: ' + CDEVSupport.convertDate(story.lastEditedDate, '', false);
            } else {
                date = 'Posted: ' + CDEVSupport.convertDate(story.lastEditedDate, '', false);
            }
            return date;
        },
        //get abstract content of specific story
        getStoryAbstractJSON: function (story) {
            // return this.remove_tags(story.abstract);
            return story.abstract;
        },
        //getStory iconClip
        getStoryIconClipJSON: function (story) {
            var hasClip = false;
            if ((typeof story.surfaceable !== 'undefined') && (story.surfaceable[0].type == 'Clip') && (story.surfaceable[0].status == 'L')) {
                hasClip = true;
            }

            return hasClip;
        },
        getStoryUpdatedTimeJSON: function (story) {
            return story.updatedDate;
        },
        /*======================================================================================================
         *
         * SPLICES STORIES IN ARRAY WITH MATCHED DISPLAYSIZE, FROM BEGININDEX, WITH NUMBER STORIES IN DATA PARAMS
         *
         *=======================================================================================================*/
        spliceStories: function (displaySize, beginIndex, numerStories, data) {
            var dataDS = [];
            var result = [];
            //CHECK FIRST: if beginIndex param if greater than data length, return empty array now!!
            if (beginIndex > data.length - 1) {
                return result;
            }
            //loop and push all data stories matched this displaySize
            for (var i = 0; i < data.length; i++) {
                if (data[i].displaysize == displaySize) {
                    dataDS.push(data[i]);
                }
            }
            //when beginIndex greater than length of data DISPLAYSIZE input. CANNOT get any result form it
            if (beginIndex > dataDS.length - 1) {
                return result;
            }
            //loop all matched data matched and get avaiable data
            for (var j = beginIndex; j < dataDS.length; j++) {
                result.push(dataDS[j]);
                //if number of result equals number user need or end of array result
                if ((result.length == numerStories) || (j == dataDS.length - 1)) {
                    return result;
                }
            }
        },
        //get all topic in story in push it in a result array
        getStoryListTopics: function (story) {
            var list = [];
            if (typeof story == 'undefined') {
                return list;
            }
            if ((typeof story.topics !== 'undefined') && (story.topics.length > 0)) {
                for (var i = 0; i < story.topics.length; i++) {
                    list.push(story.topics[i].value);
                }
            }
            return list;
        }
    },
    // getCategory: return category with id
    categorySupport: {
        getCategory: function (data, id) {
            var categories = [];
            for (var i = 0; i < data.length; i++) {
                if (data[i].displaysize == id && data[i].type == 'category') {
                    categories.push(data[i]);
                }
            }
            return categories;
        },
        getLink: function(category){
            if ( typeof category != "object")
                return '';
            var locationm = window.location.protocol+ '//'+ window.location.host;
            var link = category.link.substring(category.link.indexOf('/category/'), category.link.length);
            return locationm + link;
        }
    },
    getDataByDisplaysizeID: function(listData, id){
      if ( Object.prototype.toString.call( listData ) === '[object Array]'  ){
        var len = listData.length;
        var listResult = [];
        for ( var i = 0; i < len; i++ ){
          if( listData[i].displaysize == id )
            listResult.push(listData[i]);
        }
        return listResult;
      }
      return [];
    }
};

var CDEVKMIR = {
    /*======================================================================================================
     *
     * GET DATA FOR THIS PAGE, ASYNC IS OFF TO MAKE SURE GLOBAL IS ALREADY EXIST BEFORE RUN ANOTHER FUNCTIONS
     *
     *=======================================================================================================*/
    initData: function () {
        $.ajax({
                url: url + '?clienttype=container.json',
                async: false //make blocking I/O
            })
            .fail(function (err) {
                console.log(err);
            })
            .done(function (result) {
                GLOBALDATA = result.features;
            });
        $.ajax({
                url: urlBreadkingNews + '?clienttype=container.json',
                async: false //make blocking I/O
            })
            .fail(function (err) {
                console.log(err);
            })
            .done(function (result) {
                GLOBALDATABREAKINGNEWS = result.features;
            });
        $.ajax({
                url: urlMostPopular + '?clienttype=container.json',
                async: false //make blocking I/O
            })
            .fail(function (err) {
                console.log(err);
            })
            .done(function (result) {
                MOSTPOPULAR = result.features;
            });
        // WNHttpRequestManager.makeRequest(urlMostPopular + '?clienttype=container.json', {
        //     onSuccess: function () {
        //         // var data = $.parseJSON(this.response.responseText);
        //         // callbacksuccess(this.response);
        //         MOSTPOPULAR = $.parseJSON(this.response.responseText).features;
        //     },
        //     onError: function (e) {
        //         console.log(e);
        //         return;
        //     }
        // });
    },
    initDataPublisher: function(data){
        
    },
    /////////////
    ///// giang.nguyen
    //////////////
    siteWideElements: {
      // functions
      submitNewsForm: function(){
        if ( wng_pageInfo.containerClass == 'weather')
          return;
          // override new version
          // move summary into
          $wn('#DisplaySizeId64 > ul > li > div.wnContent.summary').prependTo($wn('#DisplaySizeId64 > ul > li > div.wnContent.quickform'));
          // move login/logout to summary
          $wn('#DisplaySizeId64 > ul > li > div.wnContent.quickform  div.wnContent.summary').append($wn('#DisplaySizeId64 > ul > li div.memberinfo > div.pmloginLink'));
          $wn('div#DisplaySizeId64').addClass('override-submit-form');
          $wn('#DisplaySizeId64 > ul > li > h4').addClass('override-submit-form');
          $wn('#DisplaySizeId64 > ul input').addClass('override-submit-form');
          $wn('#DisplaySizeId64 > ul textarea').addClass('override-submit-form');
          $wn('#DisplaySizeId64 > ul div.memberinfo > div.pmloginLabel.wnRequired > h4 > div.wnMemberNonuser > label').addClass('override-submit-form');
          $wn('#DisplaySizeId64 > ul div.wnFormField.wnEmailInput > span').addClass('override-submit-form');
          $wn('#DisplaySizeId64 > ul div.wnSubmit.wnFormField').addClass('override-submit-form');
          $wn('#DisplaySizeId64 > ul input[type="submit"]').addClass('override-submit-form');
          $wn('#DisplaySizeId64  div.wnSubmit.wnFormField').addClass('override-submit-form');
          $wn('#DisplaySizeId64  ul li h4 label').addClass('override-submit-form');

          $wn('#DisplaySizeId64 > ul div.memberinfo > div > h4 > div.wnMemberNonuser > label').addClass('override-submit-form');
          $wn('#DisplaySizeId64 > ul  div.wnContent.summary > span.text').addClass('override-submit-form');
          $wn('#DisplaySizeId64 > ul  div.wnContent.summary > span.text p').addClass('override-submit-form');
          $wn('#DisplaySizeId64  ul li div.memberinfo > div').addClass('override-submit-form');
          $wn('#DisplaySizeId64  ul li div.wnContent.summary > div.pmloginLink').addClass('override-submit-form');
          $wn('#DisplaySizeId64  ul li div.wnContent.summary > div > div.wnMemberNonuser > label').addClass('override-submit-form');
          $wn('#DisplaySizeId64  ul li div.wnContent.summary > div > div.wnMemberNonuser > a.wnMemberLogin').addClass('override-submit-form');
          $wn('#DisplaySizeId64  ul li div div > select').addClass('override-submit-form');
          $wn('#DisplaySizeId64 > ul > li > div > div').addClass('override-submit-form');
          $wn('#DisplaySizeId64 > ul > li > div > div  h4 > label').addClass('override-submit-form');
          $wn('#DisplaySizeId64 > ul div.wnFormField > label.Escaped').addClass('override-submit-form');


        // override
        // $wn('div#DisplaySizeId64').addClass('override-submit-form');
        // $wn('#DisplaySizeId64 > ul > li > h4').addClass('override-submit-form');

        // $wn('#DisplaySizeId64  div.wnFormField.wnSingleText').insertBefore($wn('#DisplaySizeId64 div.memberinfo'));

        // $wn('#DisplaySizeId64  div.wnFormField.wnSingleText:eq(0) > h4 > label').text('NAME *');
        // $wn('#DisplaySizeId64  div.wnFormField.wnSingleText:eq(1) > h4 > label').text('PHONE');
        // $wn('#DisplaySizeId64 div.memberinfo > div.pmloginLabel.wnRequired > h4 > div.wnMemberNonuser > label').text('EMAIL ADDRESS *');
        // $wn('#allformfields-41456  div.wnFormField.wnMultiText > h4 > label').text('WHAT IS YOUR NEWS TIP? *');

        // $wn('#DisplaySizeId64 > ul div.wnSubmit.wnFormField').addClass('override-submit-form');
        // $wn('#DisplaySizeId64 > ul input[type="submit"]').addClass('override-submit-form');
        // $wn('#DisplaySizeId64  div.wnSubmit.wnFormField').addClass('override-submit-form');
        // $wn('#DisplaySizeId64 > ul > li > div.wnContent.summary > span > div').addClass('override-submit-form');
        // $wn('#DisplaySizeId64 > ul label').addClass('override-submit-form');
        // $wn('#DisplaySizeId64 > ul textarea').addClass('override-submit-form');
        // $wn('#DisplaySizeId64 > ul div.memberinfo > div.pmloginLabel.wnRequired > h4 > div.wnMemberNonuser > label').addClass('override-submit-form');
        // $wn('#DisplaySizeId64 > ul div.wnFormField.wnEmailInput > span').addClass('override-submit-form');
        // $wn('#DisplaySizeId64 > ul input').addClass('override-submit-form');
        // other fields of the form
        //$wn('#DisplaySizeId64 > ul > li > div.wnContent.summary').append($wn('#DisplaySizeId64 ul div.memberinfo > div.pmloginLink'));

        // $wn('<div style="clear: both;"></div><div class="upload-file"><span>UPLOAD VIDEO</span>'+
        // '<input type="file" name="" style="display: none;" value=""></div>').insertBefore($wn('#DisplaySizeId64 > ul div.wnSubmit.wnFormField'));

        return;
        // create new layout for the submit form
        // var html = '<div class="submit-news-form">';
        // html += '<h5 class="headline">SUBMIT NEWS</h5>';
        // html += '<div class="infor-login"><span>* Denotes required fields</span>'+
        //         '<span class="logign">Login to <a href="#">Member center</a></span></div>';
        // html += '<form>';
        // html += '<label for="name">Name *</label>';
        // html += '<input type="text" name="name" id="name" value="">';
        // html += '<label for="phone">Phone</label>';
        // html += '<input type="text" name="phone" id="phone" value="" />';
        // html += '<label for="email">Email Address *</label>';
        // html += '<input type="text" name="email" id="email" value="" />';
        // html += '<label for="name">WHAT IS YOUR NEWS TIP? *</label>';
        // html += '<textarea type="text" name="name" id="name" value="" />';
        // html += '<div class="upload-file"><span>UPLOAD VIDEO</span><input type="file" name="" style="display: none;"  value="" /></div>';
        // html += '<input type="submit" name=""  value="Submit" />';
        // html += '</form>';
        // html += '</div>';
        // // add to col 4
        // if ( $wn('#WNCol4 .dev-sitewide-FM').length > 0 )
        //   $wn(html).insertBefore($wn('#WNCol4 .dev-sitewide-FM').first());
        // else
        //   $wn('#WNCol4').append(html);
      },
      weatherCol4: function(){
        if ( wng_pageInfo.containerClass == 'weather')
          return;
        var radarImage = 'http://ftpcontent.worldnow.com/professionalservices/clients/kmir/images/dummy_radar_col4.png';
        var w = '<div id="CDEV-col4-weather">' +
              '<div class="headline"><h1>PALM SPRINGS, CA</h1></span></div>'+
              '<div class="weather-detail">'+
                '<div class="temp-radar">'+
                  '<div class="image"><span></span><span></span><span></span></div>'+
                  '<div class="radar"></div>'+
                '</div>'+
                '<div class="feelslike-hl"><span></span><span></span></div>' +
                '<div class="pre-hum"><span></span><span></span></div>' +
              '</div>'+
            //   '<div class="more-infor">'+
            //     '<a href="#"><span>7 DAY</span></a>' +
            //     '<a href="#"><span>RADAR</span></a>' +
            //     '<a href="#"><span>HOURLY</span></a>' +
            //     '<a href="#"><span>WEB CAMS</span></a>' +
            //   '</div>'+
            '</div>';
            $wn(w).prependTo('#WNCol4');
            getDataWeather(jsonUrls.weatherPage.defaultZipCode);

        function getDataWeather(zipcode) {
            CDEVSupport.ajaxCall(urlWeather + zipcode, success, '');

            function success(data) {
                var $city = $wn(data);
                var isError = data.getElementsByTagName('Error');
                // get all information
                if (isError.length == 0) { // right
                    $cO = $city.find('CurrentObservation');
                    $dF = $city.find('DailyForecast').find('Day:lt(2)');
                    // var $hF = $city.find('HourlyForecast').find('Hour:lt(21)');
                    var $tF = $city.find('DailyForecast').find('Day:eq(0)');
                    // var $cH = $city.find('HourlyForecast').find('Hour:eq(0)');
                    var cityName = $city.attr('Name') + ', ' + $city.attr('StateAbbr');

                    var phrase = ($tF.attr('PhraseDay').length > 1) ? $tF.attr('PhraseDay') : $tF.attr('PhraseNight');
                    changeInforWeather($cO, $tF);
                } else { // not found the city
                    alert('No cities found.');
                }
            }
        }

        function changeInforWeather($cO, $tF) {
            var temperature, humidity, precip, pressure, img, sky, feels;
            if (typeof $cO != 'string') { // current

                temperature = $cO.attr('TempF');
                humidity = $cO.attr('RelHumidity');
                precip = $tF.attr('PrecipChance');
                pressure = $cO.attr('Pressure');
                img = $cO.attr('IconCode');
                sky = $cO.attr('Sky');
                feels = $cO.attr('FeelsLikeF');
            }
            $wn('#CDEV-col4-weather > div.weather-detail > div > div.image > span:nth-child(2)').html(temperature + '&deg;');
            $wn('#CDEV-col4-weather > div.weather-detail > div.feelslike-hl > span:nth-child(1)').html('Feels like <b>' +feels + '&deg; </b>');
            $wn('#CDEV-col4-weather > div.weather-detail > div.pre-hum > span:nth-child(2)').html('HUMIDITY <b> ' +humidity + '% </b>');
            $wn('#CDEV-col4-weather > div.weather-detail > div.pre-hum > span:nth-child(1)').html('PRECIPITATION <b>' + precip + '% </b>');
            $wn('#CDEV-col4-weather > div.weather-detail > div.feelslike-hl > span:nth-child(2)').html('High <b>' +
                $tF.attr('HiTempF') + '&deg; </b> / Low <b>' + $tF.attr('LoTempF') + '&deg; </b>');
            $wn('#CDEV-col4-weather > div.weather-detail > div > div.image > span:nth-child(3)').text(sky);
            var src = 'http://ftpcontent.worldnow.com/wncustom/wx_icons/wsi50/' + img + '.png';
            $wn('#CDEV-col4-weather > div.weather-detail > div > div.image > span:nth-child(1)').css('background',
                "url('" + src + "') #fff center no-repeat");
            $wn('#CDEV-col4-weather > div.weather-detail > div > div.radar').css('background',
                "url('" + radarImage + "') #fff center no-repeat");
            
            var smallGrey = '<div id="smallGrey"><a href="http://www.kmir.com/link/781794/kmir-weather-sponsor" target="_blank"><img src="http://KMIR.images.worldnow.com/images/12946039_G.gif"></a></div>';
            $wn(smallGrey).insertAfter('#CDEV-col4-weather');
        }
      },
      renderPopularAndFeature: function(listStories, type){
        if ( wng_pageInfo.containerClass == 'weather')
          return;
        if ( Object.prototype.toString.call( listStories ) ==  '[object Array]' ){
          var listStories = CDEVSupport.storySuport.spliceStories("-7", 0, 5, listStories);
          if ( listStories.length == 0) return;
          var html = '<div  class="dev-sitewide-FM">';
          if ( type == 'F' )
            html += '<h3>Features</h3>';
          else
            html += '<h3>Most Popular</h3>';
          html += '<ul>';
          var len = listStories.length;
          for( var i = 0; i < len; i++){
            var headline  = CDEVSupport.storySuport.getStoryHeadlineJSON(listStories[i]);
            var link = CDEVSupport.storySuport.getStoryLinkJSON(listStories[i]);
            var image = CDEVSupport.storySuport.getStoryAbstractImageJSON(listStories[i]);
            var hasClip = CDEVSupport.storySuport.getStoryIconClipJSON(listStories[i]);
            html += '<li>';
            if ( image == 'http://kmir.images.worldnow.com/images/4513961_G.jpg'){
              if ( hasClip )
                html += '<a href='+ link +'><h5 class="headline hasClip" style="width: 100%;">'+ headline +'</h5></a>';
              else
                html += '<a href='+ link +'><h5 class="headline" style="width: 100%;">'+ headline +'</h5></a>';
            }else{
              if ( hasClip )
                html += '<a href='+ link +'><h5 class="headline hasClip">'+ headline +'</h5></a>';
              else
                html += '<a href='+ link +'><h5 class="headline">'+ headline +'</h5></a>';
              html += '<div class="image" style="background-size: cover !important; background: url(' + image + ') black center no-repeat;"></div>';
            }

            html += '<div style="clear: both;"></div></li>';
          }
          html +='</ul></div>';
          $wn('#WNCol4').append(html);
          $wn('#WNCol4 > div:nth-child(6) > ul > li> a > h5').ellipsis({
              row: 3,
              onlyFullWords: true
          });
        }
      },
      navigationBar: function(){
        // move the nav
        $wn('#WNBranding > div > div.nav-custom').append($wn('#WNMenuCol1'));
        // detect active subnav
        $wn('#submenu2476 > li').each(function(){
          if ( $wn(this).attr('id').indexOf(''+ wng_pageInfo.containerId ) > -1 ){
            $wn(this).attr('style', 'background: #e6dede !important;');
          }
        });
        // init
        var posBrading = 0;
            posBrading = $wn('#WNBranding').position().top + 20;

        var pos = $wn(document).scrollTop();
        if (pos > posBrading) {
          $wn('#WNBranding > div > div.nav-custom').addClass('scroll-nav');
          $wn('#WNMenuCol1').addClass('scroll-nav');
          $wn('#menu2476 UL > li > ul, .wnLevel2.wnSublevel').addClass('scroll-nav');
        } else {
          $wn('#WNBranding > div > div.nav-custom').removeClass('scroll-nav');
          $wn('#WNMenuCol1').removeClass('scroll-nav');
          $wn('#menu2476 UL > li > ul, .wnLevel2.wnSublevel').removeClass('scroll-nav');
        }
        $wn(document).scroll(function (event) {
            var pos = $wn(document).scrollTop();
            posBrading = $wn('#WNBranding').position().top + 20;
            if (pos > posBrading) {
              $wn('#WNBranding > div > div.nav-custom').addClass('scroll-nav');
              $wn('#WNMenuCol1').addClass('scroll-nav');
              $wn('#menu2476 UL > li > ul, .wnLevel2.wnSublevel').addClass('scroll-nav');
            } else {
              $wn('#WNBranding > div > div.nav-custom').removeClass('scroll-nav');
              $wn('#WNMenuCol1').removeClass('scroll-nav');
              $wn('#menu2476 UL > li > ul, .wnLevel2.wnSublevel').removeClass('scroll-nav');
            }
        });
      },
      branding: function(){
        // remove element
        $wn('#WNContainerMemberSearch-headertop').remove();
        var urlImage = $wn('#WNBrandingImage').attr('src');
        $wn('#WNBranding').html('');
        $wn('#WNBranding').show();
        var branding = '<div class="branding-custom">';
            branding += '<a class="home-link" href="http://' + wng_pageInfo.baseUrl + '"><div class="image"></div></a>';
            branding += '<div class="nav-custom"></div>';
            branding += '<div class="icons-custom"></div>';
            branding += '</div>';
       $wn('#WNBranding').append(branding);
       // set image
       $wn('#WNBranding > div a > div.image').css('background', 'url("' + urlImage + '") left no-repeat');
       // add icons
       var icons = '';
           icons += '<a href="/category/289811/live-streaming-video"><span></span></a>';
           icons += '<a href="http://www.facebook.com/KMIRNEWS"><span></span></a>';
           icons += '<a href="http://twitter.com/kmirnews"><span></span></a>';
           icons += '<a href="https://www.instagram.com/kmirnews"><span></span></a>';
           icons += '<span class="search"><span class="search-image"></span><input type="text" style="display: none;" /></span>';
        $wn('#WNBranding > div > div.icons-custom').append(icons);
        // event search icon
        $wn('#WNBranding > div > div.icons-custom > span.search > span').click(function(){
          if ( $wn(this).attr('class').indexOf('clicked') > -1 ){
            var host = window.location.host;
            window.location.href = 'http://' + host + '/search?vendor=ez&qu=' + $wn('#WNBranding > div > div.icons-custom > span > input[type="text"]').val().replace(/ /g, '+');
          }else{
            $wn(this).addClass('clicked');
            $wn('#WNBranding > div > div.icons-custom > span > input[type="text"]').show();
          }
        });
        $wn('#WNBranding > div > div.icons-custom > span > input[type="text"]').keypress(function(e) {
            if(e.which == 13) {
                $wn('#WNBranding > div > div.icons-custom > span.search > span').click();
            }
        });
        // remove event search
        $wn(window).click(function (e) {
          if (e.target.nodeName != 'SPAN' && e.target.nodeName != 'INPUT') {
            $wn('#WNBranding > div > div.icons-custom > span > input[type="text"]').hide();
            $wn('#WNContainerMemberSearch-headertop #searchIcon-change').css('display', 'block');
            $wn('#WNBranding > div > div.icons-custom > span.search > span').removeClass('clicked');
          }
        });

      },
      breakingNews: function(){
        if ( typeof GLOBALDATABREAKINGNEWS != 'undefined' && typeof GLOBALDATABREAKINGNEWS != 'string'){
          // $wn('#DisplaySizeId-30').remove(); // remove the old breaking news
          var listStories = CDEVSupport.storySuport.spliceStories("-7", 0, numberOfBreakingNewsShow, GLOBALDATABREAKINGNEWS);
          var breakingNewsHTML = '<div class="wnBlock displaySizeId-30 displaySizeId-30-custom " id="DisplaySizeId-30">';
          breakingNewsHTML += '<span class="show-breaking-news">Show Breaking News</span>';
          breakingNewsHTML += '<ul class="wnGroup contentGroup">';
          for ( var i = 0; i < listStories.length ; i++){
            var headline = CDEVSupport.storySuport.getStoryHeadlineJSON(listStories[i]);
            var link = CDEVSupport.storySuport.getStoryLinkJSON(listStories[i]);
            var hasClip = CDEVSupport.storySuport.getStoryIconClipJSON(listStories[i]);
            if ( i > 0 )
              breakingNewsHTML += '<li class="wnItem feature" style="border-top: 1px solid #ff8d8d;">';
            else
              breakingNewsHTML += '<li class="wnItem feature">';
            breakingNewsHTML += '<span class="title">breaking news</span>';
            breakingNewsHTML += '<a href="' + link + '"><span class="headline">' + headline + '</span></a>';
            if ( hasClip ){
              breakingNewsHTML += '<div class="small-icon-white"> </div>';
            }
            breakingNewsHTML += '<span class="more"><a href="' + link + '">read more</a><div style="clear: both;"></div></span>';

            breakingNewsHTML += '<span class="close"></span>';
            breakingNewsHTML += '</li>';
          }
          breakingNewsHTML += '</ul>';
          breakingNewsHTML += '</div>';
          // insert breakingNews
          $wn(breakingNewsHTML).prependTo($wn('#WNHeader'));
          $wn('#DisplaySizeId-30').show();

          if (wng_pageInfo.isMobile ){
            if ( $wn('#DisplaySizeId-30 > ul > li > div.small-icon-white').length > 0 ){
              $wn('#DisplaySizeId-30 > ul > li > div.small-icon-white').hide();
              $wn('#DisplaySizeId-30 > ul li a span').addClass('afterf');
            }
            $wn('#DisplaySizeId-30 > ul li span.more').wrap( '<div style="padding-right: 11px;text-align: right;"></div>' );
          }else {
            $wn('#DisplaySizeId-30 > ul li span.headline').ellipsis({
                row: 1,
                onlyFullWords: true
            });
          }

          // events
          $wn('#DisplaySizeId-30 > ul li span.close').click(function(){
            $this = $wn(this);
            $this.parent().addClass('hide');
            // if( $wn('#DisplaySizeId-30 > ul li.hide').length == $wn('#DisplaySizeId-30 > ul li').length )
                // $wn('#DisplaySizeId-30 > span.show-breaking-news').css('display', 'block');
          });
          $wn('#DisplaySizeId-30 > span.show-breaking-news').click(function(){
              $wn(this).css('display', 'none');
              $wn('#DisplaySizeId-30 > ul li').removeClass('hide');
          });
        }
      },
      footer: function(){
        // the footer's menu
        var $menu = $wn('#CDEV-footer > div.cdev-footer-site-links > div.cdev-footer-site-links-bottom').clone();
        $menu.find('ul li').each(function(){
          if( $wn(this).text() == "â€¢" )
            $wn(this).remove();
        });
        var $li = $menu.find('ul li');
        $menu.append('<ul class="edit"></ul>');
        $menu.find(' ul.edit').append($li);
        $menu.find(' ul.cdev-footer-sitemap-links').remove();
        $menu.find(' ul.edit').attr('class', 'cdev-footer-sitemap');
        // remove semicolon of the first item
        $li.first().html($li.first().find('a'));
        var copyright = '<div class="cdev-footer-copyright">'+
                            '<span class="cdev-footer-worldnow-logo"></span>'+
                            'All content © Copyright 2000 - 2017 KMIR. All Rights Reserved. For more information on this site, '+
                            'please read our <a title="Privacy Policy" href="/story/18990/this">Privacy Policy</a>, '+
                            'and <a title="Terms of Use" href="/story/18991/this">Terms of Service</a>,'+
                            ' and <a class="adchoice" href="//www.aboutads.info/choices" target="policy">Ad Choices</a>.</div>';
        // remove
        $wn('#WNCopyright > table').remove();
        // add
        $wn('#WNCopyright').append($menu).append(copyright);
        $wn('#WNCopyright > div.cdev-footer-site-links-bottom > ul > li:nth-child(3)').remove();
      }
    },

    weatherPage: {
        weather: function(){
          var textSummary = '';
          var left = 0;
          var right = 7;
          // check page's url to view weatherpage
          if (!(wng_pageInfo.contentClassification == "Weather"))
              return;
          $wn('#WNDS29 > div > div.wnDVWxFullForecast').hide();
          // a weather page HTML RAW structure to render this Weather Forecast block
          var weatherForecastPage = '<div id="currentConditions"><div class="conditions"></div><div class="player">' +
              '</div></div>' +
              '<div id="meterologistForecast"></div>' +
              '<div class="wnBlock displaySize">' +
              '<div class="hourly-forecast-wrapper clearfix">' +
              '<div class="wnGroup contentGroup collapsible closed">' +

              '<div class="wnItem "><h3 class="headline-kmir-stand">Hourly Forecast<div class="wnClear"></div></h3></div>' +
              '<div id="hourlyForecast" class="hourly-group jcarousel clearfix">' +
              '<span><img style="     transform: rotate(180deg); webkit-transform: rotate(180deg); ms-transform: rotate(180deg) " src="' + iconHourlyForecast + '"></span>' +
              '<ul class="hourly-rail"></ul>' +
              '<span><img src="' + iconHourlyForecast + '"></span>' +
              '</div>' +
              '</div>' +
              '</div>' +
              '</div>' +
              '<div class="wnBlock displaySize">' +
              '<div class="daily-forecast-wrapper clearfix">' +
              '<div class="wnGroup contentGroup collapsible closed">' +

              '<div class="wnItem "><h3 class="headline-kmir-stand">7-DAY FORECAST<div class="wnClear"></div></h3></div>' +
              '<div id="dailyForecast" class="daily-group jcarousel clearfix">' +
              '<div id="CDEV-daily-forecast">' +
              '<div class="quick-group jcarousel clearfix"><ul class="quick-rail"></ul></div>' +
              //'<div class="detail-group clearfix"></div>' +
            //  '<div class="cdev-weather-footer clearfix"></div>' +
              '</div>' +
              '</div>' +
              '</div>' +
              '</div>' +
              '</div>';
          // insert weatherForecastPage structure into site
          $wn(weatherForecastPage).prependTo($wn('#WNCol23'));
          // video weather

          var weatherForecast = '<div id="weather-forecast">' +

              '<div id="weather-forecast-detail">' +
              '<div class="zipcode-tabs">' +
              '</div>' +
              '<div class="lagre-infor">' +
              '<div id="img-weather"><img src=""></div>' +
              '<div class="temp-skype"><span class="temperature"></span><span class="skype"></span></div>' +

              '</div>' +
              '<div class="skyp-low-high">' +
              '<span class="low-high"></span><span class="pre" ></span>' +
              '</div>' +
              '<div style="clear:both;"></div>' +
              '<ul class="more-info">' +
              '<li><span><b>Feels Like </b></span><span></span></li>' +
              '<li><span><b>Humidity </b> </span><span></span></li>' +
              '<li><span><b>Pressure </b></span><span></span></li>' +
              '<li><span><b>Windspeed </b></span><span></span></li>' +
              '</ul>' +
              '<ul class="sun-moon">' +
                '<li><span><b>Sunrise:</b></span><span>4:12AM</span></li>' +
                '<li><span><b>Sunset:</b></span><span>4:12AM</span></li>' +
                '<li><span><b>Moonrise:</b></span><span>4:12AM</span></li>' +
                '<li><span><b>Moonset:</b></span><span>4:12AM</span></li>' +
              '</ul>' +

              '</div>' +
              '<div id="weather-forecast-video">' +
              '<div id="video-details" ></div>' +
              '</div>' +
              '</div>';

          $wn('#currentConditions').append(weatherForecast);
          $wn('<div style="clear: both;"></div>').insertAfter('#weather-forecast-video')
          $wn('#weather-forecast').prependTo($wn('#WNCols23-4'));
          $wn('#weather-forecast').wrap('<div style="background:white; padding: 15px 10px;"></div>');
          $wn('#video-details').append('<div id="divWNWidgetsContainer801" style="overflow:hidden;height:256px;width:455px;"> <div id="divWNVideoCanvas801"></div> <div id="divWNGallery801"></div> </div>');

          $wn('#video-details').append('<script type="text/javascript" src="http://KMIR.images.worldnow.com/interface/js/WNVideo.js?ver=20110628400"><\/script>');
          $wn('#video-details').append('<script type="text/javascript">var wnOnLibraryLoad = function() {if (window.removeEventListener) {window.removeEventListener("load", wnOnLibraryLoad , false);} else if (window.detachEvent) {window.detachEvent("onload", wnOnLibraryLoad );}; WN193040();}; if (window.addEventListener) {window.addEventListener("load", wnOnLibraryLoad , false);} else if (window.attachEvent) {window.attachEvent("onload", wnOnLibraryLoad );}<\/script>');
        //   if( wng_pageInfo.isMobile)
        //   $wn('#divWNGallery673').css('display', 'none');
          // $wn('#divWNVideoCanvas673').remove();
          if (typeof wnWxWSIinfo === 'undefined' || wnWxWSIinfo === null) {
              var wnWxWSIinfo = {};
          }
          // set video
          // $wn('#weather-forecast-video').append("<script type='text/javascript' src='http://api.worldnow.com/feed/v2.0/widgets/188924?alt=js&contextaffiliate=1184'></script>");
          url = url.indexOf('?clienttype=smartdevice') > -1 ? url.replace('?clienttype=smartdevice', '') : url; // use check mobile on desktop
          // get the weather information from producer
          $.ajax(url + jsonUrls.weatherPage.info)
              .done(function (data) {
                  wnWxWSIinfo.wnInfo = {};
                  wnWxWSIinfo.wnInfo.header = typeof data.header == 'undefined' ? '-1' : data.header;
                  wnWxWSIinfo.wnInfo.currentconditions = typeof data.currentconditions == 'undefined' ? '-1' : data.currentconditions;
                  wnWxWSIinfo.wnInfo.byline = typeof data.byline == 'undefined' ? '-1' : data.byline;
                  wnWxWSIinfo.wnInfo.lastupdatedate = data.lastupdatedate;
                  // mock data
                  getData(zipcodeList[0]);
              })
              .fail(function (data) {
                  console.log('error');
                  //alert( "error" );
              })
              .always(function (data) {

              });


          /**
           * count items show on page of Hourly Daily
           * @return {[type]} [description]
           */
          function countItemHourlyShow() {
              $wn('ul.hourly-rail li').show(); // reset items
              /* when button cancel click -> hide  */
              $wn("#hourlyForecast span:first").hide();
              $wn("#hourlyForecast span:last").show();
              var numberItems = Math.floor($wn('ul.hourly-rail').width() / 72); // 72 is width one item.
              left = 0;
              right = numberItems - 1;
              var realW = 72 + ($wn('ul.hourly-rail').width() - 72 * numberItems) / numberItems;
              $wn('ul.hourly-rail li').css('width', (realW).toString());
          }
          // some events for the weather page
          function addEvvents() {
              /* when button cancel click -> hide  */
              $wn("#hourlyForecast span:first").hide();
              // search weather follows zipcode
              $wn('#weather-forecast-detail > div.zipcode-tabs > span').click(function () {
                  var zip = $wn(this).attr('zipcode');
                  if (zip.length != 5 || Number(zip).toString() == 'NaN') {
                      alert('Please enter 5-digit zip code.');
                      return;
                  }
                  getData(zip);
              });
              /* read more button */
              $wn('#meterologistForecast > div.todays-forecast.clearfix > div > span').click(function(){
                $wn('#meterologistForecast > div.todays-forecast.clearfix > div > div').css('height', 'auto');
                $wn(this).hide();
              });
              /* next and back */
              $wn("#hourlyForecast span:last").click(function () {
                  var len = $wn('.hourly-forecast-wrapper.clearfix ul.hourly-rail li').length;

                  if ((len - 1) > right) {
                      left++;
                      right++;
                      $wn('.hourly-forecast-wrapper.clearfix ul.hourly-rail li').show();
                      $wn('.hourly-forecast-wrapper.clearfix ul.hourly-rail li:lt(' + left + ')').hide();
                      $wn('.hourly-forecast-wrapper.clearfix ul.hourly-rail li:gt(' + right + ')').hide();
                      $wn("#hourlyForecast span:first").show();
                      if ((len - 1) == right)
                          $wn(this).hide();
                  } else {
                      $wn(this).hide();
                  }
              });
              $wn("#hourlyForecast span:first").click(function () {
                  var len = $wn('.hourly-forecast-wrapper.clearfix ul.hourly-rail li').length;
                  if (left > 0) {
                      left--;
                      right--;
                      $wn('.hourly-forecast-wrapper.clearfix ul.hourly-rail li').show();
                      $wn('.hourly-forecast-wrapper.clearfix ul.hourly-rail li:lt(' + left + ')').hide();
                      $wn('.hourly-forecast-wrapper.clearfix ul.hourly-rail li:gt(' + right + ')').hide();
                      $wn("#hourlyForecast span:last").show();
                      if (left == 0)
                          $wn(this).hide();
                  } else {
                      $wn(this).hide();
                  }
              });
              // event landscape for mobile
              window.addEventListener("orientationchange", function () {
                  var deg = screen.orientation.angle;
                  setTimeout(function () { /// delay for browswer do something, I don't know what happen into to the broswer, but if not have setTimeout, it runs not true.

                      if (deg == 90) { // landscape
                          $wn('.daily-forecast-wrapper.clearfix ul li:nth-child(2) span:nth-child(1)').css('width', '124px');
                          countItemHourlyShow();
                      } else {
                          $wn('.daily-forecast-wrapper.clearfix ul li:nth-child(2) span:nth-child(1)').css('width', '108px');
                          countItemHourlyShow();
                      }
                  }, 500);

              });
          }
          // call api get data
          function getData(zipcode) {
              $.ajax({
                  url: jsonUrls.weatherPage.data + zipcode,
                  success: function (response) {
                      var isError = response.getElementsByTagName('Error');
                      // get all information
                      var $city = $wn(response).find('City')[0];
                      $city = $wn($city);
                      if (isError.length == 0) { // right
                          var $cO = $city.find('CurrentObservation');
                          var $dF = $city.find('DailyForecast').find('Day:lt(8)');
                          var $hF = $city.find('HourlyForecast').find('Hour:lt(21)');
                          var $tF = $city.find('DailyForecast').find('Day:eq(0)');
                          var $cH = $city.find('HourlyForecast').find('Hour:eq(0)');
                          var cityName = $city.attr('Name') + ', ' + $city.attr('StateAbbr');

                          var phrase = ($tF.attr('PhraseDay').length > 1) ? $tF.attr('PhraseDay') : $tF.attr('PhraseNight');

                          // change details
                          changeDetails($cO, $tF, zipcode);
                          // show MeterologistForecast
                          showMeterologistForecast(cityName, wnWxWSIinfo, phrase);
                          // show hourly
                          showHourlyForecast($hF);
                          // show daily
                          showDailyForecast($dF, $city);
                          // $wn('#WNAffRFDTV #WNColsAll .wnDSContainer-standard').remove();
                          // $wn('#DisplaySizeId29').remove();
                          $wn('#DisplaySizeId29 > div.wnDVWxFullForecast > div.wnDSItems-standard').remove();
                          $wn('#DisplaySizeId29 > div.wnDVEmbeddedLink').remove();
                          $wn('#DisplaySizeId29 > div.wnDVWxFullForecast.wnWxHorizontal.wnDSContainer-standard').remove();

                      } else { // not found the city
                          alert('No cities found.');
                      }
                      addEvvents();

                  },
                  error: function (error) {
                      console.log(error);
                  }
              });
          }
          // apply the weather information
          function changeDetails($cO, $tF, active) {
              // render zipcode-tabs
              $wn('#weather-forecast .zipcode-tabs').html('');
              for ( var i = 0; i < zipcodeList.length; i = i + 2 ){
                var ac = '';
                if ( zipcodeList[i] == active  )
                  ac = 'class="active"';
                $wn('#weather-forecast .zipcode-tabs').append('<span ' + ac + ' zipcode="' + zipcodeList[i] + '">' + zipcodeList[ i + 1 ] + '</span>');

              }
              var temperature = $cO.attr('TempF');
              var wind = $cO.attr('WndSpdMph');
              var humidity = $cO.attr('RelHumidity');
              var feelslike = $cO.attr('FeelsLikeF');
              var precip = $tF.attr('PrecipChance');
              var low = $tF.attr('LoTempF');
              var high = $tF.attr('HiTempF');
              var pressure = $cO.attr('Pressure');
              var img = $cO.attr('IconCode');
              var sky = $cO.attr('Sky');
              var windspeed = $cO.attr('WndSpdMph');
              var sunrise = $tF.attr('Sunrise');
              var sunset = $tF.attr('Sunset');
              var moonrise = $tF.attr('Moonrise');
              var moonset = $tF.attr('Moonset');
              $wn('#weather-forecast-detail > ul.sun-moon > li:nth-child(1) > span:nth-child(2)').html(getTimeString(sunrise));
              $wn('#weather-forecast-detail > ul.sun-moon > li:nth-child(2) > span:nth-child(2)').html(getTimeString(sunset));
              $wn('#weather-forecast-detail > ul.sun-moon > li:nth-child(3) > span:nth-child(2)').html(getTimeString(moonrise));
              $wn('#weather-forecast-detail > ul.sun-moon > li:nth-child(4) > span:nth-child(2)').html(getTimeString(moonset));
              $wn('#weather-forecast-detail > div.lagre-infor > div.temp-skype > span.temperature').html(temperature + '');
              $wn('#weather-forecast-detail > ul.more-info > li:nth-child(1) > span:nth-child(2)').html(feelslike + '&deg;');
              $wn('#weather-forecast-detail > div > span.low-high').html('<b>LOW</b> ' + low + '&deg; <b>HIGH</b> ' + high + '&deg;'); /// low high
              $wn('#weather-forecast-detail > ul.more-info > li:nth-child(4) > span:nth-child(2)').html(windspeed + ' in' );
              $wn('#weather-forecast-detail > ul.more-info > li:nth-child(3) > span:nth-child(2)').html( pressure + ' in');
              $wn('#weather-forecast-detail > ul.more-info > li:nth-child(2) > span:nth-child(2)').html(humidity + '%');
              $wn('#weather-forecast-detail > div > span.pre').html('<b>Precipitation: </b> '+ precip + '%');
              var src = 'http://ftpcontent.worldnow.com/wncustom/wx_icons/wsi50/' + img + '.png';
              $wn('#weather-forecast #weather-forecast-detail  #img-weather img').attr('src', src);
              $wn('#weather-forecast-detail > div.lagre-infor > div.temp-skype > span.skype').text(sky);


              $wn('#weather-forecast-detail > div.lagre-infor > span.temperature').append('&deg;');
              $wn('#weather-forecast-detail > div.lagre-infor > span.feels-like').append('&deg;');
          }
          // show meterologistForecast
          function showMeterologistForecast(cityName, wnWxWSIinfo, phrase) {
            var meterologistForecast = '';
            if ( cityName.toUpperCase().indexOf('PALM SPRINGS') > -1 &&  typeof  wnWxWSIinfo.wnInfo.byline != 'string' ) {
                meterologistForecast += '<div class="todays-forecast clearfix">';

                meterologistForecast += '<div class="info">';
                meterologistForecast += '<h3>FORECAST: ' + wnWxWSIinfo.wnInfo.header + '</h3>';
                meterologistForecast += '<h5>LAST UPDATED: ' + moment(wnWxWSIinfo.wnInfo.lastupdatedate).format('h:mmA, MMMM D, YYYY ') + '</h5>';
                meterologistForecast += '<div class="infor-detail">'
                meterologistForecast += wnWxWSIinfo.wnInfo.currentconditions;
                meterologistForecast += wnWxWSIinfo.wnInfo.currentconditions;
                meterologistForecast += '</div>'
                meterologistForecast += '<span>READ MORE</span>';
                meterologistForecast += '</div>';
                meterologistForecast += '</div>';

                meterologistForecast += '<div class="bylines">';
                meterologistForecast += '<img class="profile-image" src="' + wnWxWSIinfo.wnInfo.byline.profileimage + '">';
                meterologistForecast += '<div class="profile-name">' + wnWxWSIinfo.wnInfo.byline.firstname + ' ' + wnWxWSIinfo.wnInfo.byline.lastname + '</div>';
                meterologistForecast += '<div class="profile-title">' + wnWxWSIinfo.wnInfo.byline.title + '</div>';
                meterologistForecast += '<div class="contact-info">';

                meterologistForecast += '<a class="fb" href="http://www.facebook.com/' + wnWxWSIinfo.wnInfo.byline.socialnetworksinfo.facebook + '" target="_blank">' +
                    '</a>' +
                    '<a class="twitter" href="http://www.twitter.com/' + wnWxWSIinfo.wnInfo.byline.socialnetworksinfo.twitter + '" target="_blank">' +
                    '</a>' +
                    '<a class="email" href="mailto:' + wnWxWSIinfo.wnInfo.byline.emailaddress + '" target="_blank">' +
                    '</a></div>';
                meterologistForecast += '</div>';
            } else {
                meterologistForecast += '<div class="todays-forecast clearfix"><h3>TODAY\'S FORECAST</h3>' + phrase + '</div></div>';
            }
            $wn('#meterologistForecast').html(meterologistForecast);
            $wn('#meterologistForecast > div.todays-forecast.clearfix > div > p').remove();
            $wn('#meterologistForecast').append('<div style="clear:both;" ></div>');
          }
          // show hourly Forecast
          function showHourlyForecast(hourlyList) {
              if (hourlyList.length > 0) {
                  var len = hourlyList.length;
                  var hourlyDiv = '';
                  for (var i = 0; i < len; i++) {
                      var $hour = $wn(hourlyList[i]);
                      var d = new Date($hour.attr('ValidDateLocal')),
                          dd,
                          firstClass = '';
                      if (i === 0) {
                          firstClass = 'active';
                      }

                      d = d.toLocaleTimeString();
                      dd = d.replace(/[0-9]/g, '').replace(/:/g, '').replace(/ /g, '');
                      d = d.split(":")[0];
                      dd = dd.substring(0, 2);
                      d = d + ' ' + dd;
                      d = i == 0 ? "NOW" : d;
                      hourlyDiv += '<li id="hourly-' + (i + 1) + '" class="hourly ' + firstClass + ' clearfix" data-hournum="' + $hour.attr('HourNum') + '">';
                      hourlyDiv += '<div class="time">' + d.replace(' ', '') + '</div>';
                      hourlyDiv += '<div class="precip-chance">' + $hour.attr('PrecipChance') + '&#37;</div>';
                      hourlyDiv += '<div class="wx-icon" ><img style="width:25px;" src="http://ftpcontent.worldnow.com/wncustom/wx_icons/wsi40/' +
                          $hour.attr('IconCode') + '.png' + '"></div>';
                      hourlyDiv += '<div class="temperature">' + $hour.attr('TempF') + '&deg;</div>';
                      hourlyDiv += '<div class="wind-speed clearfix">' + $hour.attr('WndDirCardinal') + '&nbsp;' + $hour.attr('WndSpdMph') + ' mph</div>';
                      hourlyDiv += '</li>';
                  }
                  $wn('#hourlyForecast .hourly-rail').html(hourlyDiv);
                  countItemHourlyShow();
              }

          }
          // show daily Forecast
          function showDailyForecast($dF, $city) {
              var $dailyForecastDiv = $wn('#CDEV-daily-forecast'),
                  $quickGroup = $dailyForecastDiv.find('.quick-group'),
                  $detailGroup = $dailyForecastDiv.find('.detail-group');
              $quickGroup.html('<ul class="quick-rail"></ul>');
              var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
              // var geoDiv2 = '<div class="geolocation"><span>Lat: ' + $city.attr('Latitude') + '</span><span class="separator">|</span><span>Long: ' + $city.attr('Longitude') +
              //     '</span><span class="last-update">Updated: ' + CDEVSupport.convertToEDTTimeZone($city.find('CurrentObservation').attr('ReportTime'), 'EST') + '</span></div></div>';

              function dailyForecast() {
                  var totalDay = $dF.length,
                      quickDiv = '',
                      detailDiv = '';

                  $dF.each(function (i) {
                      var $this = $wn(this),
                          d = new Date($this.attr('ValidDateUtc')),
                          firstClass = '';

                      if (i === 0) {
                          return true;
                      }

                      if (i === 1) {
                          firstClass = 'active';
                      }

                      quickDiv += '<li id="quickDay-' + i + '" class="quick-day ' + firstClass + '" data-daynum="' + $this.attr('DayNum') + '">';
                      quickDiv += '<div class="quick">';
                      quickDiv += '<div class="day">' + $this.attr('DayOfWk') + '</div>';
                      quickDiv += '<div class="date">' + monthNames[d.getMonth()] + '&nbsp;' + d.getDate() + '</div>';
                      quickDiv += '<div class="wx-icon" style="background-image:url(http://ftpcontent.worldnow.com/wncustom/wx_icons/wsi50/' + $this.attr('IconCode') + '.png)">' + $this.attr('SkyText') + '</div>';
                      quickDiv += '<div class="sky-condition">' + $this.attr('SkyText') + '</div>';
                      quickDiv += '<div class="temperature"><span class="hi-temp">' + $this.attr('HiTempF') + '</span><span class="lo-temp">' + $this.attr('LoTempF') + '</span></div>';
                      quickDiv += '<div class="precip-chance">' + $this.attr('PrecipChance') + '&#37;</div>';
                      quickDiv += '</div>';
                      quickDiv += '<div class="more-info-day-daily">';
                      quickDiv += '<div>' +  $this.attr('WndDirCardinal') + '&nbsp;' + $this.attr('WndSpdMph') + 'mph</div>';
                      quickDiv += '<div>Humidity ' +  $this.attr('RelHumidity') + '%</div>';
                      quickDiv += '<div>Wind ' +  $this.attr('WndSpdMph') + ' mph  </div>';
                      quickDiv += '<div>Sunrise ' +  getTimeString($this.attr('Sunrise'), true) + '</div>';
                      quickDiv += '<div>Sunset ' +  getTimeString($this.attr('Sunset'), true) + '</div>';
                      quickDiv += '<div><span>Less Details</span></div>';
                      quickDiv += '</div>';
                      quickDiv += '</li>';
                  });

                  $quickGroup.find('.quick-rail').append(quickDiv);
                  $quickGroup.append('<a class="arrow day-arrow left jcarousel-control jcarousel-control-prev hidden" href="javascript:void(0);"></a><a class="arrow day-arrow right jcarousel-control jcarousel-control-next" href="javascript:void(0);""></a>');
                  // $detailGroup.append(detailDiv);
                  // $dailyForecastDiv.find('.cdev-weather-footer').html(geoDiv2);

                  $quickGroup.jcarousel();
                  $quickGroup.find('.jcarousel-control-prev')
                      .on('jcarouselcontrol:active', function () {
                          $wn(this).removeClass('hidden');
                          var target = $quickGroup.jcarousel('target');
                          setActive($wn(target));
                      }).on('jcarouselcontrol:inactive', function () {
                          $wn(this).addClass('hidden');
                          setActive($quickGroup.find('.quick-day:first'));
                      })
                      .jcarouselControl({
                          target: '-=3'
                      });
                  $quickGroup.find('.jcarousel-control-next')
                      .on('jcarouselcontrol:active', function () {
                          $wn(this).removeClass('hidden');
                          var target = $quickGroup.jcarousel('target');
                          setActive($wn(target));
                      }).on('jcarouselcontrol:inactive', function () {
                          $wn(this).addClass('hidden');
                          setActive($quickGroup.find('.quick-day:last'));
                      })
                      .jcarouselControl({
                          target: '+=3'
                      });

                  function setActive($item) {

                      var $this = $item,
                          dayNum = $this.attr('data-daynum');

                      $wn('.quick-day.active, .detail-day.active').removeClass('active');
                      $wn('.quick-day[data-daynum=' + dayNum + ']').addClass('active');
                      $wn('.detail-day[data-daynum=' + dayNum + ']').addClass('active');

                      return;
                  }

                  // $wn('.quick-day').click(function (e) {
                  //     e.preventDefault();
                  //     e.stopPropagation();
                  //
                  //     if ($wn(this).hasClass('active')) {
                  //         return;
                  //     }
                  //     $quickGroup.jcarousel('scroll', $wn(this));
                  //     setActive($wn(this));
                  //
                  //     return;
                  // });

                  // show more infor of day daily
                  $wn('div.more-info-day-daily > div:nth-child(6)').click(function(e){
                    $wn(this).parent().hide();
                    e.stopPropagation();
                    return;
                  });
                  $wn('#CDEV-daily-forecast  ul li').click(function(){
                    $wn('div.more-info-day-daily').hide();
                    $wn(this).find('div.more-info-day-daily').show();
                  });
                  return;
              }
              dailyForecast();

          }

          function getTimeString(s, hasSpace) {
              var ns = s,
                  sf;

              if (s.charAt(0) === '0') {
                  ns = s.slice(1);
                  //return ns;
              }

              sf = s.slice(-2);
              ns = ns.slice(0, ns.indexOf(sf));
              ns = ns.slice(0, ns.lastIndexOf(':'));
              if ( hasSpace )
                ns = ns + ' ' + sf;
              else
                ns = ns + '' + sf;

              return ns;
          }
        },
        meetTheTeam: function(){
          // check page's url to view weatherpage
          if (!(wng_pageInfo.contentClassification == "Weather") || typeof GLOBALDATA == 'string' )
              return;
          var category = CDEVSupport.categorySupport.getCategory(GLOBALDATA, '68')[0];
          if  ( category.length == 0 )
            return;
          var listStories = [];
          try {
            listStories = category.nested.features;
          }catch(err){
            return;
          }
          if ( typeof listStories != 'undefined' && listStories.length == 0 )
            return;
          listStories = CDEVSupport.storySuport.spliceStories('-7', 0, 100, listStories);
          var len = listStories.length;
          if ( len == 0 )
            return;
          var buildHTML = '';
          buildHTML += '<h3> MEET THE weather team</h3>';
          buildHTML += '<ul class="wnGroup contentGroup odd collapsible closed last">';
          for ( var i = 0; i < len; i++){
            var headline = CDEVSupport.storySuport.getStoryHeadlineJSON(listStories[i]);
            var link = CDEVSupport.storySuport.getStoryLinkJSON(listStories[i]);
            var image = CDEVSupport.storySuport.getStoryAbstractImageJSON(listStories[i]);
            var name = headline.split(',')[0];
            var level = headline.split(',').length > 1 ? headline.split(',')[1] : ' ';
            var facebook = 'https://www.facebook.com/KMIRNews/';
            var mailto = 'news@kmir.com';
            var twitter = 'https://twitter.com/kmirnews';
            for( var j = 0 ; j < wxTeamSocialInfo.length; j++ ){
              if (wxTeamSocialInfo[j][0].toUpperCase() == name.toUpperCase()) {
                  twitter = wxTeamSocialInfo[j][1];
                  facebook = wxTeamSocialInfo[j][2];
                  mailto = wxTeamSocialInfo[j][3];
                  break;
              }
            }
            buildHTML += '<li class="wnItem feature ">';
            buildHTML += '<a href="' + link + '"><div class="img" style="background: url(' + image + ') black center no-repeat;"></div></a>';
            buildHTML += '<a href="' + link + '"><div><span class="name">' + name + '</span><span class="level">' + level + '</span></div></a>';
            buildHTML += '<div class="socials-links">';
            buildHTML += '<a class="fb" href="' + facebook + '" target="_blank"></a>' +
                '<a class="twitter" href="' + twitter + '" target="_blank"></a>' +
                '<a class="email" href="mailto:' + mailto + '" target="_blank">' +
                '</a>';
            buildHTML += '</div>';
            buildHTML += '</li>';
          }
          buildHTML += '</ul>';
          $wn('#DisplaySizeId68').html(buildHTML);
          $wn('#DisplaySizeId68').addClass('meet-the-team-col4');
        },
        headlineBoxCol4: function(){
          if (!(wng_pageInfo.contentClassification == "Weather"))
              return;
          if ( typeof GLOBALDATA != 'string' ){
            var category = CDEVSupport.categorySupport.getCategory(GLOBALDATA, '78')[0];
            var listStories = '';
            try{
               listStories = category.nested.features;
            }catch(err){
              return;
            }
            listStories = CDEVSupport.storySuport.spliceStories('-10', 0, 5, listStories);
            if ( listStories.length == 0) return;
            var html = '<div id="DisplaySizeId78" class="dev-sitewide-FM">';
            html += '<h3 class="headline-kmir-stand">' + category.headline + '</h3>';
            html += '<ul>';
            var len = listStories.length;
            for( var i = 0; i < len; i++){
              var headline  = CDEVSupport.storySuport.getStoryHeadlineJSON(listStories[i]);
              var link = CDEVSupport.storySuport.getStoryLinkJSON(listStories[i]);
              var image = CDEVSupport.storySuport.getStoryAbstractImageJSON(listStories[i]);
              var hasClip = CDEVSupport.storySuport.getStoryIconClipJSON(listStories[i]);
              html += '<li>';
              if ( hasClip )
                html += '<a href='+ link +'><h5 class="headline hasClip" style="width: 100%;">'+ headline +'</h5></a>';
              else
                html += '<a href='+ link +'><h5 class="headline" style="width: 100%;">'+ headline +'</h5></a>';
              html += '<div style="clear: both;"></div></li>';
            }
            html +='</ul></div>';
            $("#DisplaySizeId78" ).replaceWith( html );
            $("#DisplaySizeId78" ).insertAfter($("#DisplaySizeId68" ));
            $wn('div.dev-sitewide-FM ul li').addClass('override-weather');
            $wn('div.dev-sitewide-FM ul li').last().css({
              'border-bottom': 'none',
              'padding-bottom': '0px'
            })
          }
        }
    },

    storyPageSection: function (data) {
        var styleDateTime = function () {
            if ($('#WNStoryHeader > em:nth-child(2)').length && $('#WNStoryHeader > em:nth-child(4)').length) {
                var postDate = $('#WNStoryHeader > em:nth-child(2)').html();
                var openTag = postDate.indexOf('<script type="text/javascript">');
                var closeTag = postDate.indexOf('</script>');
                postDate = postDate.substring(0, openTag) + postDate.substring(closeTag + 9, postDate.length);
                postDate = postDate.replace('Posted:', '<b>Posted</b>');
                $('#WNStoryHeader > em:nth-child(2)').html(postDate);

                var postDate = $('#WNStoryHeader > em:nth-child(4)').html();
                var openTag = postDate.indexOf('<script type="text/javascript">');
                var closeTag = postDate.indexOf('</script>');
                postDate = postDate.substring(0, openTag) + postDate.substring(closeTag + 9, postDate.length);
                postDate = postDate.replace('Updated:', '<b>Updated</b>');
                $('#WNStoryHeader > em:nth-child(4)').html(postDate);
            }
        }

        var socialBox = function () {
            $('#WNStoryUtils').insertAfter('#WNStoryHeader > em:nth-child(4)');
        }

        var videoplayer = function () {
            $('#WNDS16').insertBefore('#WNStoryUtils');
        }

        var moreStories = function (data) {
            $('#DisplaySizeId80').css('background', 'none');
            $('#DisplaySizeId80').empty();

            //********************
            //    NEWS BLOCK
            //********************

            $.ajax({
                url: 'http://' + location.host + '/category/317950/news?clienttype=container.json',
                async: false
            })
            .fail(function (err) {
                console.log(err);
            })
            .done(function (data) {
                var categoryHeadline = data.headline;
                var categoryLink = CDEVSupport.categorySupport.getLink( data);
                var storiesData = CDEVSupport.storySuport.spliceStories('-20', 0, 5, data.features);
                if (storiesData.length < 1) {
                    return false; //category with no stories
                } else {
                    jQuery('<div/>', {
                        class: 'wnBlock displaySize displaySizeId80 nestedCategory WNmoreNews'
                    }).prependTo('#WNCol23Bottom');

                    $('.WNmoreNews:nth-child(1)').each(function () {
                        var headline = '<h1 class="headline">' + categoryHeadline + '</h1>';
                        $(headline).appendTo($(this));
                        var moreLink = '<a href="' + categoryLink + '"><span class="btn-more">More ></span></a>';
                        $(moreLink).appendTo($(this));
                    });

                    var stories = CDEVSupport.storySuport.spliceStories('-20', 0, 5, storiesData);
                    var sectionRAW = '';
                    for (var i = 0; i < stories.length; i++) {
                        sectionRAW += '<li><a href="' + CDEVSupport.storySuport.getStoryLinkJSON( stories[i]) + '">' + stories[i].headline + '</a></li>';
                    }
                    sectionRAW = '<ul class="list-stories">' + sectionRAW + '</ul>';
                    $(sectionRAW).insertAfter('#WNCol23Bottom > div:nth-child(1) > h1');

                    $wn('.WNmoreNews .list-stories li a').ellipsis({
                        row: 2,
                        onlyFullWords: true
                    });
                }
            });


            //********************
            //    SPORTS BLOCK
            //********************
            $.ajax({
                url: 'http://' + location.host + '/category/317951/sports?clienttype=container.json',
                async: false
            })
            .fail(function (err) {
                console.log(err);
            })
            .done(function (data) {
                var categoryHeadline = data.headline;
                var categoryLink = CDEVSupport.categorySupport.getLink(data);
                var storiesData = CDEVSupport.storySuport.spliceStories('-20', 0, 5, data.features);
                if (storiesData.length < 1) {
                    return false; //category with no stories
                } else {
                    jQuery('<div/>', {
                        class: 'wnBlock displaySize displaySizeId80 nestedCategory WNmoreNews'
                    }).insertAfter('#WNCol23Bottom > div:nth-child(1)');

                    $('.WNmoreNews:nth-child(2)').each(function () {
                        var headline = '<h1 class="headline">' + categoryHeadline + '</h1>';
                        $(headline).appendTo($(this));
                        var moreLink = '<a href="' + categoryLink + '"><span class="btn-more">More ></span></a>';
                        $(moreLink).appendTo($(this));
                    });

                    var stories = CDEVSupport.storySuport.spliceStories('-20', 0, 5, storiesData);
                    var sectionRAW = '';
                    for (var i = 0; i < stories.length; i++) {
            sectionRAW += '<li><a href="' + CDEVSupport.storySuport.getStoryLinkJSON(stories[i]) + '">' + stories[i].headline + '</a></li>';
                    }
                    sectionRAW = '<ul class="list-stories">' + sectionRAW + '</ul>';
                    $(sectionRAW).insertAfter('#WNCol23Bottom > div:nth-child(2) > h1');

                    $wn('.WNmoreNews .list-stories li a').ellipsis({
                        row: 2,
                        onlyFullWords: true
                    });
                }
            });
            //make same height of two
            var firstHeight = $('#WNCol23Bottom > div:nth-child(1) > ul').height();
            var secondHeight = $('#WNCol23Bottom > div:nth-child(2) > ul').height();

            if (firstHeight >= secondHeight) {
                $('#WNCol23Bottom > div:nth-child(1) > ul').height(firstHeight);
                $('#WNCol23Bottom > div:nth-child(2) > ul').height(firstHeight);
            } else {
                $('#WNCol23Bottom > div:nth-child(1) > ul').height(secondHeight);
                $('#WNCol23Bottom > div:nth-child(2) > ul').height(secondHeight);
            }
        }

        var byline = function () {
            //move story byline
            if ($wn('#WNStoryByline').length) {
                $wn('#WNStoryRelatedBox').css('display', 'block');
                if ( $wn('#DisplaySizeId3').length ){
                  $wn('#WNStoryByline').insertBefore($wn('#DisplaySizeId3'));
                }else {
                  $wn('#WNStoryRelatedBox').append($wn('#WNStoryByline'));
                }
                $wn('#WNStoryByline > div > div.wn-anchor > a').text('READ BIO');
            }
            // edit structure of wnDate
            $wn('<div class="custom-date"></div>').insertAfter($wn('#WNStoryHeader > h3'));
            $wn('#WNStoryHeader > div.custom-date').append($wn('#WNStoryHeader > em'));
        }

        var relatedStories = function() {
            if ($('#DisplaySizeId3 ul li.wnItem').length == 0 ) {
                return false;
            } else  {
                $('<h1 class="headline">Related Stories</h1>').prependTo('#DisplaySizeId3');
                $wn('#DisplaySizeId3 ul li.wnItem.feature span').ellipsis({
                    row: 2,
                    onlyFullWords: true
                });

                $wn('#DisplaySizeId3 ul li.wnItem.feature').last().css('border-bottom', '0px');
                $wn('#DisplaySizeId3 ul li.wnItem.header').first().css('border-bottom', '0px');
            }
        }

        var relatedThumbnail = function() {
            $wn('#WNStoryRelatedBox > div.wnStoryBodyGraphic.wnImageWidth-180 > a > div > h6').empty();

        }

        if (wng_pageInfo.containerClass === 'story') {
            //excute all function
            styleDateTime();
            socialBox();
            videoplayer();
            moreStories(data);
            byline();
            relatedStories();
            relatedThumbnail();
        }
    },

    ///////////////
    /// nhan.tran
    //////////////
    /*======================================================================================================
     *
     * GENERATE TOP STORY BLOCK
     *
     *=======================================================================================================*/
    topStorySection: function (data) {
        var storiesData = CDEVSupport.storySuport.spliceStories('-20', 0, 5, data);
        if (storiesData.length == 0) { //if no available data to display
            return false;
        } else {
            if (wng_pageInfo.containerClass == 'home') { //top story for homepage

                jQuery('<div/>', {
                    id: 'WNTopStoryWrapper',
                    class: 'wnTSWConfigDS-20 wnDSContainer-standard displaySize'
                }).prependTo('#WNCol2');

                //clean all old design
                $wn('#WNTopStoryWrap').remove();
                //remove TOP ROTATOR
                $wn('#WNDS29').remove();
                //remove old list DS -20 Top Story
                $wn('#WNDS-20').remove();

                var topStoryElement = '';
                var topStoryRAW = '<div class="mainTopStory" style="background: url(\'{*imgTopStory*}\') #000 center no-repeat" title="{*topStoryHeadline*}">' +
                    '<div class="mainTopStoryHealdine {*iconPlayMainTopStory*}"><a href="{*mainStoryURL*}">{*topStoryHeadline*}</a></div>' +
                    '</div></a>';

                //
                //main Top Story
                //

                topStoryElement = CDEVSupport.replaceAll(topStoryRAW, '{*topStoryHeadline*}', CDEVSupport.storySuport.getStoryHeadlineJSON(storiesData[0]))
                topStoryElement = CDEVSupport.replaceAll(topStoryElement, '{*imgTopStory*}', CDEVSupport.storySuport.getStoryAbstractImageJSON(storiesData[0]))
                topStoryElement = CDEVSupport.replaceAll(topStoryElement, '{*mainStoryURL*}', CDEVSupport.storySuport.getStoryLinkJSON(storiesData[0]));

                if (CDEVSupport.storySuport.getStoryIconClipJSON(storiesData[0])) {
                    topStoryElement = CDEVSupport.replaceAll(topStoryElement, '{*iconPlayMainTopStory*}', 'hasClip');
                } else {
                    topStoryElement = CDEVSupport.replaceAll(topStoryElement, '{*iconPlayMainTopStory*}', 'noClip');
                }
                $wn(topStoryElement).appendTo('#WNTopStoryWrapper');

                if (wng_pageInfo.isMobile) {
                    $wn('#WNTopStoryWrapper > div.mainTopStory > div > a').ellipsis({
                        row: 3,
                        onlyFullWords: true
                    });
                } else {
                    // $wn('#WNTopStoryWrapper > div.mainTopStory > div > a').ellipsis({
                    //     row: 2,
                    //     onlyFullWords: true
                    // });
                }

                //
                //list Top Story
                //
                var listTopStoriesItemElement = '';
                var listTopStoriesItemRAW = '<li index="{*index*}"><a href="{*storyURL*}"><div title="{*headline*}" class="item-thumbnail" style="background: url(\'{*imgSRC*}\') #000 center no-repeat"></div></a><a href="{*storyURL*}"><div class="headline {*iconPlay*}" title="{*headline*}"><h1>{*headline*}</h1></div></a>{*timeAgo*}</li>';
                var listTopStoriesElement = '';
                var listTopStoriesRAW = '<div class="listTopStories"><ul>{*listTopStories*}</ul></div>';

                for (var i = 1; i < storiesData.length; i++) {

                    var link = CDEVSupport.storySuport.getStoryLinkJSON(storiesData[i]);
                    var imgSrc = CDEVSupport.storySuport.getStoryAbstractImageJSON(storiesData[i]);
                    var headline = CDEVSupport.storySuport.getStoryHeadlineJSON(storiesData[i]);
                    var date = CDEVSupport.storySuport.getStoryDateJSON(storiesData[i]);
                    var hasClip = CDEVSupport.storySuport.getStoryIconClipJSON(storiesData[i]);
                    var timeAgo = CDEVSupport.storySuport.getStoryUpdatedTimeJSON(storiesData[i]);

                    var item = listTopStoriesItemRAW;
                    item = CDEVSupport.replaceAll(listTopStoriesItemRAW, '{*index*}', "" + i);
                    item = CDEVSupport.replaceAll(item, '{*storyURL*}', link);
                    item = CDEVSupport.replaceAll(item, '{*imgSRC*}', imgSrc);
                    item = CDEVSupport.replaceAll(item, '{*headline*}', headline);
                    if (timeAgo.indexOf('ago') < -1) {
                        item = CDEVSupport.replaceAll(item, '{*timeAgo*}', '<span class="time-ago">' + CSHELPERS.timeAgo(timeAgo.replace(/(\d+)(st|nd|rd|th)/, "$1")) + '</span>');
                    } else {
                        item = CDEVSupport.replaceAll(item, '{*timeAgo*}', '<span class="time-ago"></span>');
                    }

                    if (hasClip) {
                        item = CDEVSupport.replaceAll(item, '{*iconPlay*}', 'hasClip');
                    } else {
                        item = CDEVSupport.replaceAll(item, '{*iconPlay*}', 'noClip');
                    }

                    listTopStoriesItemElement += item;
                }

                listTopStoriesElement = CDEVSupport.replaceAll(listTopStoriesRAW, '{*listTopStories*}', listTopStoriesItemElement);
                $wn(listTopStoriesElement).appendTo('#WNTopStoryWrapper');
                if (CDEVSupport.msieversion() == "0") {
                    $wn('#WNTopStoryWrapper .listTopStories ul li a .headline h1').ellipsis({
                        row: 3,
                        onlyFullWords: true
                    });
                } else {
                    $wn('#WNTopStoryWrapper .listTopStories ul li a .headline h1').ellipsis({
                        row: 4,
                        onlyFullWords: true
                    });
                }


                $('.mainTopStory').click(function () {
                    var link = $(this).find('.mainTopStoryHealdine a').attr('href');
                    window.location.href = link;
                });

            } else { //////////////////// TOP STORY ON OTHER PAGE //////////////////////////////
                if (wng_pageInfo.contentClassification == 'Weather') {
                    return;
                }
                var storiesData = CDEVSupport.storySuport.spliceStories('-20', 0, 9, data);

                if (storiesData.length < 1) {
                    return false;
                }

                $('#WNTopStoryWrap').empty(); //remove all old design
                $('#WNDS-20').remove(); //remove all old TOP STORY section

                //create Top Story Wrapper
                jQuery('<div/>', {
                    id: 'WNTopStoryWrapper'
                }).prependTo('#WNTopStoryWrap');

                
                //create list main top story wrapper
                jQuery('<div/>', {
                    id: 'WNMainListTopStory'
                }).prependTo('#WNTopStoryWrapper');


                //first main top Story
                var firstMainListTopStoryRAW = '<div class="firstMainListTopStory">' +
                    '<a href="{*link*}"><div class="thumbnail" style="background: url(\'{*imgSRC*}\') #000 center no-repeat"></div></a>' +
                    '<div class="content">' +
                        '<a href="{*link*}"><h1 class="{*clipIcon*}">{*headline*}</h1></a>' +
                        '<span>{*abstract*}</span>' +
                        '<span class="read-more"><a href="{*link*}">Read More</a></span>' +
                    '</div>' +
                '</div>';

                var link = CDEVSupport.storySuport.getStoryLinkJSON(storiesData[0]);
                var imgSrc = CDEVSupport.storySuport.getStoryAbstractImageJSON(storiesData[0]);
                var headline = CDEVSupport.storySuport.getStoryHeadlineJSON(storiesData[0]);
                var abstract = CDEVSupport.storySuport.getStoryAbstractJSON(storiesData[0]);
                var hasClip = CDEVSupport.storySuport.getStoryIconClipJSON(storiesData[0]);

                var item = firstMainListTopStoryRAW;
                item = CDEVSupport.replaceAll(firstMainListTopStoryRAW, '{*link*}', link);
                item = CDEVSupport.replaceAll(item, '{*imgSRC*}', imgSrc);
                item = CDEVSupport.replaceAll(item, '{*headline*}', headline);
                item = CDEVSupport.replaceAll(item, '{*abstract*}', abstract);

                if (hasClip) {
                    item = CDEVSupport.replaceAll(item, '{*clipIcon*}', 'hasClip');
                } else {
                    item = CDEVSupport.replaceAll(item, '{*clipIcon*}', 'noClip');
                }

                $('#WNMainListTopStory').append(item);

                //related Stories Secion
                var linkRelatedFeed = link + '?clienttype=container.json';
                $.ajax({
                    url: linkRelatedFeed,
                    async: false //make blocking I/O
                })
                .fail(function (err) {
                    console.log(err);
                })
                .done(function (result) {
                    var relatedStories = CDEVSupport.storySuport.spliceStories('3', 0, 5, result.features);

                    if (relatedStories.length > 1) {
                        var relatedSectionElement = '';
                        var relatedSectionRaw = '<div class="relatedSection"><ul>{*listRelatedStories*}</ul></div>';
                        var relatedItemElement = '';
                        var relatedItemRaw = '<li><a href="{*storyURL*}"><span class="relatedHeadline {*clipIcon*}">{*headline*}</span></a></li>';

                        for (var i = 0; i < relatedStories.length; i++) {
                            var link = CDEVSupport.storySuport.getStoryLinkJSON(relatedStories[i]);
                            var headline = CDEVSupport.storySuport.getStoryHeadlineJSON(relatedStories[i]);
                            var hasClip = CDEVSupport.storySuport.getStoryIconClipJSON(relatedStories[i]);

                            var item = relatedItemRaw;
                            item = CDEVSupport.replaceAll(item, '{*storyURL*}', link);
                            item = CDEVSupport.replaceAll(item, '{*headline*}', headline);

                            if (hasClip) {
                                item = CDEVSupport.replaceAll(item, '{*clipIcon*}', 'hasClip');
                            } else {
                                item = CDEVSupport.replaceAll(item, '{*clipIcon*}', 'noClip');
                            }

                            relatedItemElement += item;
                        }

                        relatedSectionElement = CDEVSupport.replaceAll(relatedSectionRaw, '{*listRelatedStories*}', relatedItemElement);
                        $wn(relatedSectionElement).insertAfter('#WNMainListTopStory .firstMainListTopStory');

                        $wn('#WNMainListTopStory > div.relatedSection > ul > li > a > span').ellipsis({
                            row: 3,
                            onlyFullWords: true
                        });
                    }
                });

                //secondary list main story
                var secondaryListTopStoryElement = '';
                var secondaryListTopStoryRaw = '<div class="secondaryListTopStory"><ul>{*listItems*}</ul></div>';

                var listSecondaryTopStoriesItemElement = '';
                var listSecondaryTopStoriesItemRAW = '<li index="{*index*}"><a href="{*storyURL*}"><div title="{*headline*}" class="item-thumbnail" style="background: url(\'{*imgSRC*}\') #000 center no-repeat"></div></a><a href="{*storyURL*}"><div class="headline {*iconPlay*}" title="{*headline*}"><h1>{*headline*}</h1></div></a><div style="clear: both;"></div></li>';

                if (storiesData.length < 6) {
                    var secondaryRange = storiesData.length;
                } else {
                    var secondaryRange = 5;
                }


                for (var i = 1; i < secondaryRange; i++) {

                    var link = CDEVSupport.storySuport.getStoryLinkJSON(storiesData[i]);
                    var imgSrc = CDEVSupport.storySuport.getStoryAbstractImageJSON(storiesData[i]);
                    var headline = CDEVSupport.storySuport.getStoryHeadlineJSON(storiesData[i]);
                    var hasClip = CDEVSupport.storySuport.getStoryIconClipJSON(storiesData[i]);

                    var item = listSecondaryTopStoriesItemRAW;
                    item = CDEVSupport.replaceAll(listSecondaryTopStoriesItemRAW, '{*index*}', "" + i);
                    item = CDEVSupport.replaceAll(item, '{*storyURL*}', link);
                    item = CDEVSupport.replaceAll(item, '{*imgSRC*}', imgSrc);
                    item = CDEVSupport.replaceAll(item, '{*headline*}', headline);

                    if (hasClip) {
                        item = CDEVSupport.replaceAll(item, '{*iconPlay*}', 'hasClip');
                    } else {
                        item = CDEVSupport.replaceAll(item, '{*iconPlay*}', 'noClip');
                    }

                    listSecondaryTopStoriesItemElement += item;
                }

                secondaryListTopStoryElement = CDEVSupport.replaceAll(secondaryListTopStoryRaw, '{*listItems*}', listSecondaryTopStoriesItemElement);
                $wn(secondaryListTopStoryElement).appendTo('#WNMainListTopStory');




                //create list top story wrapper
                jQuery('<div/>', {
                    id: 'WNListTopStory'
                }).prependTo('#WNTopStoryWrapper');

                if (wng_pageInfo.contentClassification === "Sport") {
                    var headline = '<a href="http://www.kmir.com/category/13566/national-sports"><h1 class="headline">Top Story</h1></a>';
                } else {
                    var headline = '<h1 class="headline">Top Story</h1>';
                }

                $(headline).appendTo('#WNListTopStory');

                var listTopStoryElement = '';
                var listTopStoryRaw = '<div class="listTopStory"><ul>{*listItems*}</ul></div>';

                var listTopStoriesItemElement = '';
                var listTopStoriesItemRAW = '<li index="{*index*}">'+
                    '<a href="{*storyURL*}">'+
                        '<div class="headline {*iconPlay*}" title="{*headline*}">'+
                            '<h1>{*headline*}</h1>' +
                        '</div>'+
                    '</a>'+
                    '<a href="{*storyURL*}">'+
                        '<div class="abstract">'+
                            '<span>{*abstract*}</span>'+
                        '</div>'+
                    '</a>'+
                    '<a href="{*storyURL*}">'+
                        '<span class="read-more">Read More</span>'+
                    '</a>'+
                    '<div style="clear: both;"></div></li>';

                if (storiesData.length > 6) {
                    var secondaryRange = storiesData.length;
                } else {
                    var secondaryRange = 5;
                }

                //call for SPORTS page
                if (wng_pageInfo.contentClassification === "Sport") {
                    $.ajax({
                        url: 'http://www.kmir.com/category/13566/national-sports?clienttype=container.json',
                        async: false //make blocking I/O
                    })
                    .fail(function (err) {
                        console.log(err);
                    })
                    .done(function (result) {
                        storiesData = CDEVSupport.storySuport.spliceStories('-1', 0, 10, result.features);
                        for (var i = 0; i < 5; i++) {
                            var link = CDEVSupport.storySuport.getStoryLinkJSON(storiesData[i]);
                            var abstract = CDEVSupport.storySuport.getStoryAbstractJSON(storiesData[i]);
                            var headline = CDEVSupport.storySuport.getStoryHeadlineJSON(storiesData[i]);
                            var hasClip = CDEVSupport.storySuport.getStoryIconClipJSON(storiesData[i]);

                            var item = listTopStoriesItemRAW;
                            item = CDEVSupport.replaceAll(listTopStoriesItemRAW, '{*index*}', "" + i);
                            item = CDEVSupport.replaceAll(item, '{*storyURL*}', link);
                            item = CDEVSupport.replaceAll(item, '{*abstract*}', abstract);
                            item = CDEVSupport.replaceAll(item, '{*headline*}', headline);

                            if (hasClip) {
                                item = CDEVSupport.replaceAll(item, '{*iconPlay*}', 'hasClip');
                            } else {
                                item = CDEVSupport.replaceAll(item, '{*iconPlay*}', 'noClip');
                            }

                            listTopStoriesItemElement += item;
                        }
                    });
                } else { //for other page out SPORTS
                    for (var i = 5; i < secondaryRange; i++) {
                        var link = CDEVSupport.storySuport.getStoryLinkJSON(storiesData[i]);
                        var abstract = CDEVSupport.storySuport.getStoryAbstractJSON(storiesData[i]);
                        var headline = CDEVSupport.storySuport.getStoryHeadlineJSON(storiesData[i]);
                        var hasClip = CDEVSupport.storySuport.getStoryIconClipJSON(storiesData[i]);

                        var item = listTopStoriesItemRAW;
                        item = CDEVSupport.replaceAll(listTopStoriesItemRAW, '{*index*}', "" + i);
                        item = CDEVSupport.replaceAll(item, '{*storyURL*}', link);
                        item = CDEVSupport.replaceAll(item, '{*abstract*}', abstract);
                        item = CDEVSupport.replaceAll(item, '{*headline*}', headline);

                        if (hasClip) {
                            item = CDEVSupport.replaceAll(item, '{*iconPlay*}', 'hasClip');
                        } else {
                            item = CDEVSupport.replaceAll(item, '{*iconPlay*}', 'noClip');
                        }

                        listTopStoriesItemElement += item;
                }
            }

            listTopStoryElement = CDEVSupport.replaceAll(listTopStoryRaw, '{*listItems*}', listTopStoriesItemElement);
            $wn(listTopStoryElement).appendTo('#WNListTopStory');

            }
        }
    },
    /*======================================================================================================
     *
     * GENERATE SLIDESHOW AT HOMEPAGE
     *
     *=======================================================================================================*/
    slideShowSection: function (data) {
        var categoriesData = CDEVSupport.storySuport.spliceStories('7', 0, 1, data);
        if (categoriesData.length === 0 || wng_pageInfo.containerClass !== 'home') {
            return false;
        } else {
            var storiesData = [];
            for (var i = 0; i < categoriesData[0].nested.features.length; i++) {
                storiesData.push(categoriesData[0].nested.features[i]);
            }

            if (storiesData.length === 0) {
                return false;
            } else {
                if ($wn('#WNAd146').length > 0) {
                    jQuery('<div/>', {
                        id: 'WNSlideshowWrapper',
                        class: 'wnBlock displaySize displaySizeId7 nestedCategory'
                    }).insertAfter('#WNAd146');
                } else {
                    $wn('#DisplaySizeId7').empty(); //remove old design
                    jQuery('<div/>', {
                        id: 'WNSlideshowWrapper',
                        class: 'wnBlock displaySize displaySizeId7 nestedCategory'
                    }).appendTo('#DisplaySizeId7');
                }

                if (wng_pageInfo.isMobile) {
                    jQuery('<div/>', {
                        id: 'WNTopVideosWrapper',
                        class: 'wnBlock displaySize displaySizeId7 nestedCategory'
                    }).insertAfter('#WNCol4');
                }

                var categoryLink = CDEVSupport.categorySupport.getLink(categoriesData[0]);
                var categoryName = categoriesData[0].headline;

                var topVideosElement = '';

                if (wng_pageInfo.contentClassification == 'Homepage') {
                    var topVideosRAW = '<h1 class="title">' + categoryName + '</h1><span class="navigator"><div class="left-arrow"></div><div class="right-arrow"></div></span><div class="list-story-wrapper"><div class="slidelist-wrapper"><ul>{*listStories*}</ul></div>';
                } else {
                    var topVideosRAW = '<h1 class="title">' + categoryName + '</h1><span class="navigator"><div class="left-arrow"></div><div class="right-arrow"></div></span><div class="list-story-wrapper"><div class="slidelist-wrapper"><ul>{*listStories*}</ul></div><div class="footer-button"><a href="{*categoryURL*}"><span class="more-btn">More</span></a></div></div>';
                }

                var topVideosItemsElement = '';
                var topVideosItemsRAW = '<li><div class="list-story-item">' +
                    '<a href="{*storyURL*}"><div class="item-thumbnail" title="{*headline*}" style="background: url(\'{*imgSRC*}\') #000 center no-repeat">' +
                    '</div></a>' +
                    '<div class="item-info">' +
                    '<a href="{*storyURL*}"><div class="headline {*iconPlay*}"><h1>{*headline*}</h1></div></a>' +
                    '</div>' +
                    '</div></li>';

                for (var j = 0; j < storiesData.length; j++) {

                    var link = CDEVSupport.storySuport.getStoryLinkJSON(storiesData[j]);
                    var imgSrc = CDEVSupport.storySuport.getStoryAbstractImageJSON(storiesData[j]);
                    var headline = CDEVSupport.storySuport.getStoryHeadlineJSON(storiesData[j]);
                    var hasClip = CDEVSupport.storySuport.getStoryIconClipJSON(storiesData[j]);

                    var item = topVideosItemsRAW;

                    item = CDEVSupport.replaceAll(topVideosItemsRAW, '{*storyURL*}', link);
                    item = CDEVSupport.replaceAll(item, '{*imgSRC*}', imgSrc);
                    item = CDEVSupport.replaceAll(item, '{*headline*}', headline);

                    if (hasClip) {
                        item = CDEVSupport.replaceAll(item, '{*iconPlay*}', 'hasClip');
                    } else {
                        item = CDEVSupport.replaceAll(item, '{*iconPlay*}', 'noClip');
                    }

                    topVideosItemsElement += item;

                }

                topVideosElement = CDEVSupport.replaceAll(topVideosRAW, '{*listStories*}', topVideosItemsElement);
                topVideosElement = CDEVSupport.replaceAll(topVideosElement, '{*categoryURL*}', categoryLink);

                $wn(topVideosElement).appendTo('#WNSlideshowWrapper');

                $wn('#WNCol2 > div.footer-button').appendTo($wn('#WNSlideshowWrapper'));

                $('#WNSlideshowWrapper .list-story-wrapper .slidelist-wrapper ul li .list-story-item .item-info h1').ellipsis({
                    row: 3
                });


                //setting for slide
                var itemWidth = 159; //width of one items
                var numberDisplayItem = 1; //number of items can be displayed in one time
                if (wng_pageInfo.isMobile) {
                    numberDisplayItem = 1;
                }


                var leftAlign = 0;
                var leftAlignString = '';
                var currentPosition = 0;

                $wn('#WNSlideshowWrapper .left-arrow').css('visibility','hidden');

                if ($wn('#WNSlideshowWrapper .slidelist-wrapper ul li').length * itemWidth > 880) {
                    $wn('#WNSlideshowWrapper .right-arrow').css('visibility','visible');
                } else {
                    $wn('#WNSlideshowWrapper .right-arrow').css('visibility','hidden');
                }


                $wn('#WNSlideshowWrapper .left-arrow').click(function () {
                    currentPosition -= numberDisplayItem;
                    leftAlign = leftAlign + numberDisplayItem * itemWidth;
                    leftAlignString = leftAlign.toString() + 'px';
                    $("#WNSlideshowWrapper .list-story-wrapper ul").animate({
                        marginLeft: leftAlignString,
                    }, 10);

                    if (currentPosition === 0) {
                        $wn('#WNSlideshowWrapper .left-arrow').css('visibility','hidden');
                        $wn('#WNSlideshowWrapper .right-arrow').css('visibility','visible');
                    } else {
                        $wn('#WNSlideshowWrapper .right-arrow').css('visibility','visible');
                    }
                });

                $wn('#WNSlideshowWrapper .right-arrow').click(function () {
                    currentPosition += numberDisplayItem;
                    leftAlign = leftAlign - numberDisplayItem * itemWidth;
                    leftAlignString = leftAlign.toString() + 'px';
                    $("#WNSlideshowWrapper .list-story-wrapper ul").animate({
                        marginLeft: leftAlignString,
                    }, 50);

                    if (wng_pageInfo.isMobile) {
                        if (currentPosition + 1 == $wn('#WNSlideshowWrapper .slidelist-wrapper ul li').length) {
                            $wn('#WNSlideshowWrapper .right-arrow').css('visibility','hidden');
                            $wn('#WNSlideshowWrapper .left-arrow').css('visibility','visible');
                        } else {
                            $wn('#WNSlideshowWrapper .left-arrow').css('visibility','visible');
                        }
                    } else {
                        if (currentPosition + 4 == $wn('#WNSlideshowWrapper .slidelist-wrapper ul li').length) {
                            $wn('#WNSlideshowWrapper .right-arrow').css('visibility','hidden');
                            $wn('#WNSlideshowWrapper .left-arrow').css('visibility','visible');
                        } else {
                            $wn('#WNSlideshowWrapper .left-arrow').css('visibility','visible');
                        }
                    }
                });
            }
        }
    },
    /*======================================================================================================
     *
     * GENERATE LASTEST VIDEO AT HOMEPAGE
     *
     *=======================================================================================================*/
    lastestVideoSection: function (data) {
        var categoriesData = CDEVSupport.storySuport.spliceStories('85', 0, 1, data);
        if (categoriesData.length === 0 || wng_pageInfo.containerClass !== 'home') {
            return false;
        } else {
            var storiesData = [];
            for (var i = 0; i < categoriesData[0].nested.features.length; i++) {
                storiesData.push(categoriesData[0].nested.features[i]);
            }

            if (storiesData.length === 0) {
                return false;
            } else {
                if ($wn('#WNAd146').length > 0) {
                    jQuery('<div/>', {
                        id: 'WNLastestVideosWrapper',
                        class: 'wnBlock displaySize displaySizeId7 nestedCategory'
                    }).insertAfter('#WNAd146');
                } else {
                    $wn('#DisplaySizeId85').empty(); //remove old design
                    jQuery('<div/>', {
                        id: 'WNLastestVideosWrapper',
                        class: 'wnBlock displaySize displaySizeId7 nestedCategory'
                    }).appendTo('#DisplaySizeId85');
                }

                if (wng_pageInfo.isMobile) {
                    jQuery('<div/>', {
                        id: 'WNLastestVideosWrapper',
                        class: 'wnBlock displaySize displaySizeId7 nestedCategory'
                    }).insertAfter('#WNCol4');
                }

                var categoryLink = CDEVSupport.categorySupport.getLink(categoriesData[0]);
                var categoryName = categoriesData[0].headline;

                var topVideosElement = '';

                if (wng_pageInfo.contentClassification == 'Homepage') {
                    var topVideosRAW = '<h1 class="title">' + categoryName + '</h1><span class="navigator"><div class="left-arrow"></div><div class="right-arrow"></div></span><div class="list-story-wrapper"><div class="slidelist-wrapper"><ul id="original-list">{*listStories*}</ul></div><div class="footer-button"><a href="{*categoryURL*}"><span class="more-btn">More</span></a></div></div>';
                } else {
                    var topVideosRAW = '<h1 class="title">' + categoryName + '</h1><span class="navigator"><div class="left-arrow"></div><div class="right-arrow"></div></span><div class="list-story-wrapper"><div class="slidelist-wrapper"><ul id="original-list">{*listStories*}</ul></div><div class="footer-button"><a href="{*categoryURL*}"><span class="more-btn">More</span></a></div></div>';
                }

                var topVideosItemsElement = '';
                var topVideosItemsRAW = '<li><div class="list-story-item">' +
                    '<a href="{*storyURL*}"><div class="item-thumbnail" title="{*headline*}" style="background: url(\'{*imgSRC*}\') #000 center no-repeat">' +
                    '</div></a>' +
                    '<div class="item-info">' +
                    '<a href="{*storyURL*}"><div class="headline {*iconPlay*}"><h1>{*headline*}</h1></div></a>' +
                    '</div>' +
                    '</div></li>';

                for (var j = 0; j < storiesData.length; j++) {

                    var link = CDEVSupport.storySuport.getStoryLinkJSON(storiesData[j]);
                    var imgSrc = CDEVSupport.storySuport.getStoryAbstractImageJSON(storiesData[j]);
                    var headline = CDEVSupport.storySuport.getStoryHeadlineJSON(storiesData[j]);
                    var hasClip = CDEVSupport.storySuport.getStoryIconClipJSON(storiesData[j]);

                    var item = topVideosItemsRAW;

                    item = CDEVSupport.replaceAll(topVideosItemsRAW, '{*storyURL*}', link);
                    item = CDEVSupport.replaceAll(item, '{*imgSRC*}', imgSrc);
                    item = CDEVSupport.replaceAll(item, '{*headline*}', headline);

                    if (hasClip) {
                        item = CDEVSupport.replaceAll(item, '{*iconPlay*}', 'hasClip');
                    } else {
                        item = CDEVSupport.replaceAll(item, '{*iconPlay*}', 'noClip');
                    }

                    topVideosItemsElement += item;

                }

                topVideosElement = CDEVSupport.replaceAll(topVideosRAW, '{*listStories*}', topVideosItemsElement);
                topVideosElement = CDEVSupport.replaceAll(topVideosElement, '{*categoryURL*}', categoryLink);

                $wn(topVideosElement).appendTo('#WNLastestVideosWrapper');

                var numberStories = $("#WNLastestVideosWrapper .list-story-wrapper ul#original-list li").length;
                var page = 0;
                if (numberStories % 6 > 0) {
                    page = Math.floor((numberStories / 6) + 1);
                } else {
                    page = Math.floor(numberStories / 6);
                }

                for (var i = 0; i < page; i++) {
                    var numberItem = 6;
                    var $listItems = $('#WNLastestVideosWrapper .slidelist-wrapper ul#original-list li:lt('+numberItem+')');
                    $('<ul />', {'class': 'child-list'}).append($listItems).appendTo('#WNLastestVideosWrapper .list-story-wrapper .slidelist-wrapper');
                }
                $("#WNLastestVideosWrapper .list-story-wrapper ul#original-list").remove();

                $wn('#WNLastestVideosWrapper .footer-button').insertAfter($wn('#WNLastestVideosWrapper'));

                $('#WNLastestVideosWrapper .list-story-wrapper .slidelist-wrapper ul li .list-story-item .item-info h1').ellipsis({
                    row: 3
                });


                //setting for slide
                var maxPage = page;
                var currentPage = 0;
                if ($('#WNLastestVideosWrapper .list-story-wrapper .slidelist-wrapper ul li').length <= 6) {
                    $wn('#WNLastestVideosWrapper .right-arrow').css('visibility','hidden');
                } else {
                    $wn('#WNLastestVideosWrapper .right-arrow').css('visibility','visible');
                }

                $wn('#WNLastestVideosWrapper .left-arrow').css('visibility','hidden');

                $wn('#WNLastestVideosWrapper .list-story-wrapper .slidelist-wrapper ul.child-list').each(function(index){
                    if (index == 0) {
                        $(this).show();
                    } else {
                        $(this).hide();
                    }
                });

                $('#WNLastestVideosWrapper > span > div.left-arrow').click(function(){
                    currentPage = currentPage - 1;
                    if (currentPage == 0) {
                        $wn('#WNLastestVideosWrapper .right-arrow').css('visibility','visible');
                        $wn('#WNLastestVideosWrapper .left-arrow').css('visibility','hidden');
                    }
                    $wn('#WNLastestVideosWrapper .list-story-wrapper .slidelist-wrapper ul.child-list').each(function(index){
                        if (index == currentPage) {
                            $(this).fadeIn(400);
                        } else {
                            $(this).hide();
                        }
                    });
                });

                $('#WNLastestVideosWrapper > span > div.right-arrow').click(function(){
                    currentPage = currentPage + 1;
                    if (currentPage == maxPage - 1) {
                        $wn('#WNLastestVideosWrapper .right-arrow').css('visibility','hidden');
                        $wn('#WNLastestVideosWrapper .left-arrow').css('visibility','visible');
                    }
                    $wn('#WNLastestVideosWrapper .list-story-wrapper .slidelist-wrapper ul.child-list').each(function(index){
                        if (index == currentPage) {
                            $(this).fadeIn(400);
                        } else {
                            $(this).hide();
                        }
                    });
                });

            }
        }
    },

    /*======================================================================================================
     *
     * GENERATE HEADLINE BOX 2A AT HOMEPAGE
     *
     *=======================================================================================================*/
    headlineCol2ASection: function (data, socialData) {
        if (($wn('#DisplaySizeId80 ul').length == 0))
            return;
        /////// FOR HOME PAGE
        if (wng_pageInfo.contentClassification == 'Homepage') {
            $wn('#DisplaySizeId80').html('');
            $wn('#DisplaySizeId80').css('background-color', 'transparent');
            var categories = CDEVSupport.categorySupport.getCategory(data, '80');
            var content = '';
            for (var i = 0; i < categories.length; i++) { // loop category
                var category = categories[i];
                var cateogryHeadline = category.headline;
                var categoryLink = CDEVSupport.categorySupport.getLink(category);
                var stories = category.nested.features;
                var l = stories.length > 5 ? 5 : stories.length;
                var ul = "<ul wnGroup contentGroup odd collapsible closed>";
                ul += '<span class="header-cross"></span>';
                ul += '<li class="wnItem header"><h3><span class="text abridgedHeadline">' + cateogryHeadline + '</span></h3></li>';

                    for (var j = 0; j < l; j++) { // loop stories
                        var story = stories[j];
                        var storyImage = CDEVSupport.storySuport.getStoryAbstractImageJSON(story);
                        var storyLink = CDEVSupport.storySuport.getStoryLinkJSON(story);
                        var storyHeadline = CDEVSupport.storySuport.getStoryHeadlineJSON(story);
                        var storySummary = CDEVSupport.storySuport.getStoryAbstractJSON(story);
                        var updated = CDEVSupport.convertToEDTTimeZone(story.lastEditedDate, 'EST');
                        var hasClip = CDEVSupport.storySuport.getStoryIconClipJSON(story);
                        if (j == 0) {
                            ul += '<li class="wnItem feature Sport story priority-1 odd displaySizeId-7 odd-7">';
                            ul += '<a href="' + storyLink + '">';
                            ul += '<span class="img" style="background-size: cover !important; background: url(' + storyImage + ') black center no-repeat;">';

                            ul += '<div>';
                            if (hasClip)
                                ul += '<h4 class="wnContent headline hasClip"><a href="' + storyLink + '"> ' + storyHeadline + '</a></h4> ';
                            else
                                ul += '<h4 class="wnContent headline noClip"><a href="' + storyLink + '"> ' + storyHeadline + '</a></h4> ';
                            ul += '<span>Updated: ' + updated.replace('EST', 'EDT') + '</span>';
                            ul += '<span></span>'
                            ul += '<span class="wnContent summary">' + storySummary + '</span>';
                            ul += '</div>';
                        } else {
                            ul += '<li class="wnItem feature Sport story priority-1 odd displaySizeId-7 odd-7 table-align">';
                            ul += '<div>';
                            if (hasClip)
                                ul += '<h4 class="wnContent headline hasClip"><a href="' + storyLink + '"> ' + storyHeadline + '</a></h4> ';
                            else
                                ul += '<h4 class="wnContent headline noClip"><a href="' + storyLink + '"> ' + storyHeadline + '</a></h4> ';
                            ul += '</div>';
                        }
                        ul += '</li>';
                        if (j == 3 || j == l - 1) {
                            ul += '<span class="border-span"></span>';
                        }
                    }
                    ul += '<a href="' + categoryLink + '"><span>more</span></a>';
                    ul += '</ul>';
                    content += ul;
                }
                $wn('#DisplaySizeId80').html(content);

                /* override css */
                $wn('#DisplaySizeId80 > ul').addClass('category-override');
                $wn('#DisplaySizeId80 > ul > li.wnItem.header > h3 > span').addClass('category-override');
                $wn('#DisplaySizeId80 > ul > li.wnItem.header > h3').addClass('category-override');
                $wn('#DisplaySizeId80 > ul> li > a > span.img').addClass('category-override');
                $wn('#DisplaySizeId80 > ul > li:nth-child(3)').addClass('category-override');
                $wn('#DisplaySizeId80 > ul > li:nth-child(3) > a').addClass('category-override');
                $wn('#DisplaySizeId80 > ul > li:nth-child(3) > div').addClass('category-override');
                $wn('#DisplaySizeId80 .headline').addClass('category-override');
                $wn('#DisplaySizeId80 > ul > li.wnItem.feature > div > span.summary').addClass('category-override');
                $wn('#DisplaySizeId80 > ul> li.wnItem.feature > div > h4 > a').addClass('category-override');
                $wn('#DisplaySizeId80 > ul > li.wnItem.feature > div > span:nth-child(3)').addClass('category-override');

                $wn('#DisplaySizeId80 > ul > li.wnItem.feature > div > span.wnContent.summary.category-override').ellipsis({
                    row: 3,
                    onlyFullWords: true
                });

                $('#DisplaySizeId80 ul h3 span').first().text('Trending Now.');
                $('#DisplaySizeId80 ul h3 span').last().text('You Ask. We Investigate.');

            } else { ///// HEADLINE COL 2A FOR ANOTHER CATEGORY PAGE EXCEPT Weather PAGE
                if ($wn('#DisplaySizeId80 ul').length < 1) {
                    return false;
                } else {
                    $('#DisplaySizeId80').empty();
                    jQuery('<div/>', {
                        id: 'WNMeetTheTeamWrapper',
                        class: 'wnBlock displaySizeId80'
                    }).prependTo('#DisplaySizeId80');

                    var categoriesData = CDEVSupport.storySuport.spliceStories('80', 0, 1, data);

                    var storiesData = [];
                    for (var i = 0; i < categoriesData[0].nested.features.length; i++) {
                        storiesData.push(categoriesData[0].nested.features[i]);
                    }

                    var categoryName = categoriesData[0].headline;

                    var meetTheTeamElement = '';

                    if (wng_pageInfo.contentClassification == 'Homepage') {
                        var meetTheTeamRaw = '<h1 class="title">' + categoryName + '</h1><div class="list-story-wrapper"><span class="navigator"><div class="left-arrow"></div><div class="right-arrow"></div></span><div class="slidelist-wrapper"><ul>{*listStories*}</ul></div></div>';
                    } else {
                        var meetTheTeamRaw = '<h1 class="title">' + categoryName + '</h1><div class="list-story-wrapper"><span class="navigator"><div class="left-arrow"></div><div class="right-arrow"></div></span><div class="slidelist-wrapper"><ul>{*listStories*}</ul></div></div>';
                    }



                    var meetTheTeamItemElement = '';
                    var meetTheTeamItemRaw = '<li>' +
                            '<div class="list-story-item">' +
                                '<a href="{*storyURL*}">' +
                                    '<div class="item-thumbnail" title="{*headline*}" style="background: url(\'{*imgSRC*}\') #000 center no-repeat"></div>' +
                                '</a>' +
                                '<div class="item-info">' +
                                    '<a href="{*storyURL*}">' +
                                        '<div class="headline {*iconPlay*}">'+
                                            '<h1>{*headline*}</h1>' +
                                        '</div>'+
                                    '</a>' +
                                    '<div class="socials-links">' +
                                        '<a class="fb" href="{*facebook*}" target="_blank"></a>' +
                                        '<a class="twitter" href="{*twitter*}" target="_blank"></a>' +
                                        '<a class="email" href="{*email*}" target="_blank"></a>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                        '</li>';

                    for (var j = 0; j < storiesData.length; j++) {

                        var link = CDEVSupport.storySuport.getStoryLinkJSON(storiesData[j]);
                        var imgSrc = CDEVSupport.storySuport.getStoryAbstractImageJSON(storiesData[j]);
                        var headline = CDEVSupport.storySuport.getStoryHeadlineJSON(storiesData[j]);
                        var hasClip = CDEVSupport.storySuport.getStoryIconClipJSON(storiesData[j]);

                        var item = meetTheTeamItemRaw;

                        item = CDEVSupport.replaceAll(meetTheTeamItemRaw, '{*storyURL*}', link);
                        item = CDEVSupport.replaceAll(item, '{*imgSRC*}', imgSrc);
                        item = CDEVSupport.replaceAll(item, '{*headline*}', headline);

                        if (hasClip) {
                            item = CDEVSupport.replaceAll(item, '{*iconPlay*}', 'hasClip');
                        } else {
                            item = CDEVSupport.replaceAll(item, '{*iconPlay*}', 'noClip');
                        }

                        //loop in socialData to add social data href
                        for (var s = 0; s < socialData.length; s++) {
                            if (headline.toLowerCase() == socialData[s][0].toLowerCase()) {
                                item = CDEVSupport.replaceAll(item, '{*facebook*}', socialData[s][1]);
                                item = CDEVSupport.replaceAll(item, '{*twitter*}', socialData[s][2]);
                                item = CDEVSupport.replaceAll(item, '{*email*}', 'mailto:' + socialData[s][3]);
                            } else {
                                item = CDEVSupport.replaceAll(item, '{*facebook*}', 'https://www.facebook.com/KMIRNews/');
                                item = CDEVSupport.replaceAll(item, '{*twitter*}', 'https://twitter.com/kmirnews');
                                item = CDEVSupport.replaceAll(item, '{*email*}', 'mailto:news@kmir.com');
                            }
                        }

                        meetTheTeamItemElement += item;

                    }

                    meetTheTeamElement = CDEVSupport.replaceAll(meetTheTeamRaw, '{*listStories*}', meetTheTeamItemElement);

                    $wn(meetTheTeamElement).appendTo('#WNMeetTheTeamWrapper');


                    //setting for slide
                    var itemWidth = 190; //width of one items
                    var numberDisplayItem = 1; //number of items can be displayed in one time
                    if (wng_pageInfo.isMobile) {
                        numberDisplayItem = 1;
                    }


                    var leftAlign = 0;
                    var leftAlignString = '';
                    var currentPosition = 0;

                    $wn('#WNMeetTheTeamWrapper .left-arrow').css('visibility','hidden');

                    if ($wn('#WNMeetTheTeamWrapper .slidelist-wrapper ul li').length * itemWidth > 880) {
                        $wn('#WNMeetTheTeamWrapper .right-arrow').css('visibility','visible');
                    } else {
                        $wn('#WNMeetTheTeamWrapper .right-arrow').css('visibility','hidden');
                    }


                    $wn('#WNMeetTheTeamWrapper .left-arrow').click(function () {
                        currentPosition -= numberDisplayItem;
                        leftAlign = leftAlign + numberDisplayItem * itemWidth;
                        leftAlignString = leftAlign.toString() + 'px';
                        $("#WNMeetTheTeamWrapper .list-story-wrapper ul").animate({
                            marginLeft: leftAlignString,
                        }, 70);

                        if (currentPosition === 0) {
                            $wn('#WNMeetTheTeamWrapper .left-arrow').css('visibility','hidden');
                            $wn('#WNMeetTheTeamWrapper .right-arrow').css('visibility','visible');
                        } else {
                            $wn('#WNMeetTheTeamWrapper .right-arrow').css('visibility','visible');
                        }
                    });

                    $wn('#WNMeetTheTeamWrapper .right-arrow').click(function () {
                        currentPosition += numberDisplayItem;
                        leftAlign = leftAlign - numberDisplayItem * itemWidth;
                        leftAlignString = leftAlign.toString() + 'px';
                        $("#WNMeetTheTeamWrapper .list-story-wrapper ul").animate({
                            marginLeft: leftAlignString,
                        }, 70);

                        if (wng_pageInfo.isMobile) {
                            if (currentPosition + 1 == $wn('#WNMeetTheTeamWrapper .slidelist-wrapper ul li').length) {
                                $wn('#WNMeetTheTeamWrapper .right-arrow').css('visibility','hidden');
                                $wn('#WNMeetTheTeamWrapper .left-arrow').css('visibility','visible');
                            } else {
                                $wn('#WNMeetTheTeamWrapper .left-arrow').css('visibility','visible');
                            }
                        } else {
                            if (currentPosition + 4 == $wn('#WNMeetTheTeamWrapper .slidelist-wrapper ul li').length) {
                                $wn('#WNMeetTheTeamWrapper .right-arrow').css('visibility','hidden');
                                $wn('#WNMeetTheTeamWrapper .left-arrow').css('visibility','visible');
                            } else {
                                $wn('#WNMeetTheTeamWrapper .left-arrow').css('visibility','visible');
                            }
                        }
                    });                    
                }
            }
    },
    /*======================================================================================================
     *
     * GENERATE HEADLINE BOX 2B AT HOMEPAGE
     *
     *=======================================================================================================*/
    headlineCol2BSection: function(data){
        if ($wn('#DisplaySizeId82 ul').length < 1) {
            return false;
        } else {
            $wn('#DisplaySizeId82 ul').each(function(index){
                jQuery('<div/>', {
                    class: 'wnBlock displaySize displaySizeId82 nestedCategory WNmoreNews'
                }).prependTo('#DisplaySizeId82');
                var headline = '<h1 class="headline">'+ $(this).find('li.wnItem.header h3 > span').text() +'</h1>';
                var moreBtn = '<a href="' + $(this).find('li.wnItem.header h3 a').attr('href') +'"><span class="btn-more">More</span></a>';

                var listItemRAW = '';
                $(this).find('li.wnItem.feature').each(function(topic){
                    if ($(this).find('h4.abridged span.wn-icon-video-included').length) {
                        listItemRAW += '<li><a class="hasClip" href="'+ $(this).find('h4.headline a').attr('href') +'">'+ $(this).find('h4.headline a span').text() +'</a></li>';
                    } else {
                        listItemRAW += '<li><a href="'+ $(this).find('h4.headline a').attr('href') +'">'+ $(this).find('h4.headline a span').text() +'</a></li>';
                    }
                })

                var listComponent = '<ul class="list-stories">'+ listItemRAW +'</ul>';

                if (index == 0) {
                    var target = $('#DisplaySizeId82 > div:nth-child(1)');
                } else {
                    var target = $('#DisplaySizeId82 > div:nth-child(1)');
                }

                $(headline).appendTo(target);
                $(listComponent).appendTo(target);
                $(moreBtn).appendTo(target);
            });

            $('#DisplaySizeId82 .contentGroup').remove();
            $('#DisplaySizeId82 .WNmoreNews .list-stories li a').ellipsis({
                row: 3,
                onlyFullWords: true
            });
        }
    },

    /*======================================================================================================
     *
     * GENERATE MORE NEWS FULL HORIZONTAL ON CATEGORY PAGE
     *
     *=======================================================================================================*/
    moreNewsSection: function(data){
        if (wng_pageInfo.containerClass == 'category') {
            var storiesData = CDEVSupport.storySuport.spliceStories('-20', 9, 10, data);
            if (storiesData.length < 1) {
                return false;
            } else {
                $('#DisplaySizeId-7').empty();
                $wn('#WNCol2 #WNDS-20').remove(); //remove old design;
                var sectionHeadline = 'MORE NEWS';

                jQuery('<div/>', {
                    id: 'WNMoreNewsWrapper',
                    class: 'wnBlock displaySize displaySizeId-20 nestedCategory'
                }).prependTo('#WNCol2');

                $wn('<h1>' + sectionHeadline + '</h1>').appendTo('#WNMoreNewsWrapper');

                var moreNewsElement = '';
                var moreNewsElementRaw = '<li>' +
                    '<a href="{*storyURL*}"><div class="local-news-thumbnail title="{*headline*}" style="background: url(\'{*imgSRC*}\') #000 center no-repeat">' +
                    '</div></a>' +
                    '<div class="local-news-content">' +
                    '<a href="{*storyURL*}"><h1>{*headline*} {*iconPlay*}</h1></a>' +
                    '<span class="date">{*date*}</span>' +
                    '<span class="abstract">{*abtract*}</span>' +
                    '</div>' +
                    '</li>';

                for (var i = 0; i < storiesData.length; i++) {

                    var link = CDEVSupport.storySuport.getStoryLinkJSON(storiesData[i]);
                    var imgSrc = CDEVSupport.storySuport.getStoryAbstractImageJSON(storiesData[i]);
                    var headline = CDEVSupport.storySuport.getStoryHeadlineJSON(storiesData[i]);
                    var abstract = CDEVSupport.storySuport.getStoryAbstractJSON(storiesData[i]);
                    var date = CDEVSupport.storySuport.getStoryDateJSON(storiesData[i]);
                    var hasClip = CDEVSupport.storySuport.getStoryIconClipJSON(storiesData[i]);

                    var item = moreNewsElementRaw;

                    item = CDEVSupport.replaceAll(moreNewsElementRaw, '{*storyURL*}', link);
                    item = CDEVSupport.replaceAll(item, '{*storyURL*}', link);
                    item = CDEVSupport.replaceAll(item, '{*imgSRC*}', imgSrc);
                    item = CDEVSupport.replaceAll(item, '{*headline*}', headline);
                    item = CDEVSupport.replaceAll(item, '{*date*}', date);
                    item = CDEVSupport.replaceAll(item, '{*abtract*}', abstract);

                    if (hasClip) {
                        item = CDEVSupport.replaceAll(item, '{*iconPlay*}', '<tag title="Video included" class="inline-videoicon"></tag>');
                    } else {
                        item = CDEVSupport.replaceAll(item, '{*iconPlay*}', '<tag style="display: none" title="Video included" class="inline-videoicon"></tag>');
                    }

                    moreNewsElement += item;
                }

                moreNewsElement = '<ul>' + moreNewsElement + '</ul>';

                $('#WNMoreNewsWrapper').append($(moreNewsElement));
            }
        }
    },
    /*======================================================================================================
     *
     * GENERATE SLIDESHOW NESTED CATEGORY COL 2
     *
     *=======================================================================================================*/
    nestedCategoriesCol2: function(data) {
        if ((wng_pageInfo.containerClass == 'category') || (wng_pageInfo.contentClassification !== 'weather')) {
            var categoriesData = CDEVSupport.storySuport.spliceStories('7', 0, 100, data);
            if (categoriesData.length === 0) {
                return false;
            } else {
                var storiesData = [];
                for (var i = 0; i < categoriesData[0].nested.features.length; i++) {
                    storiesData.push(categoriesData[0].nested.features[i]);
                }

                if (storiesData.length === 0) {
                    return false;
                } else {
                    if ($wn('#WNAd146').length > 0) {
                        jQuery('<div/>', {
                            id: 'WNSlideshowWrapper',
                            class: 'wnBlock displaySize DisplaySizeId7 nestedCategory'
                        }).insertAfter('#WNAd146');
                    } else {
                        $wn('#DisplaySizeId7').empty(); //remove old design
                        if ($('#DisplaySizeId80').length) {
                            if (wng_pageInfo.contentClassification === "Homepage") {
                                jQuery('<div/>', {
                                    id: 'WNSlideshowWrapper',
                                    class: 'wnBlock displaySize DisplaySizeId7 nestedCategory'
                                }).insertAfter('#DisplaySizeId80 ul:first');
                            } else {
                                jQuery('<div/>', {
                                    id: 'WNSlideshowWrapper',
                                    class: 'wnBlock displaySize DisplaySizeId7 nestedCategory'
                                }).insertAfter('#DisplaySizeId80');
                            }
                        } else {
                            jQuery('<div/>', {
                                id: 'WNSlideshowWrapper',
                                class: 'wnBlock displaySize DisplaySizeId7 nestedCategory'
                            }).appendTo('#WNCol2');
                        }
                    }

                    if (wng_pageInfo.isMobile) {
                        jQuery('<div/>', {
                            id: 'WNTopVideosWrapper',
                            class: 'wnBlock displaySize DisplaySizeId7 nestedCategory'
                        }).insertAfter('#WNCol4');
                    }

                    var categoryLink = CDEVSupport.categorySupport.getLink(categoriesData[0]);
                    var categoryName = categoriesData[0].headline;

                    var topVideosElement = '';

                    if (wng_pageInfo.contentClassification == 'Homepage') {
                        var topVideosRAW = '<h1 class="title">' + categoryName + '</h1><span class="navigator"><div class="left-arrow"></div><div class="right-arrow"></div></span><div class="list-story-wrapper"><div class="slidelist-wrapper"><ul>{*listStories*}</ul></div><div class="footer-button"><a href="{*categoryURL*}"><span class="more-btn">More</span></a></div></div>';
                    } else {
                        var topVideosRAW = '<h1 class="title">' + categoryName + '</h1><span class="navigator"><div class="left-arrow"></div><div class="right-arrow"></div></span><div class="list-story-wrapper"><div class="slidelist-wrapper"><ul>{*listStories*}</ul></div><div class="footer-button"><a href="{*categoryURL*}"><span class="more-btn">More</span></a></div></div>';
                    }

                    var topVideosItemsElement = '';
                    var topVideosItemsRAW = '<li><div class="list-story-item">' +
                        '<a href="{*storyURL*}"><div class="item-thumbnail" title="{*headline*}" style="background: url(\'{*imgSRC*}\') #000 center no-repeat">' +
                        '</div></a>' +
                        '<div class="item-info">' +
                        '<a href="{*storyURL*}"><div class="headline {*iconPlay*}"><h1>{*headline*}</h1></div></a>' +
                        '</div>' +
                        '</div></li>';

                    for (var j = 0; j < storiesData.length; j++) {

                        var link = CDEVSupport.storySuport.getStoryLinkJSON(storiesData[j]);
                        var imgSrc = CDEVSupport.storySuport.getStoryAbstractImageJSON(storiesData[j]);
                        var headline = CDEVSupport.storySuport.getStoryHeadlineJSON(storiesData[j]);
                        var hasClip = CDEVSupport.storySuport.getStoryIconClipJSON(storiesData[j]);

                        var item = topVideosItemsRAW;

                        item = CDEVSupport.replaceAll(topVideosItemsRAW, '{*storyURL*}', link);
                        item = CDEVSupport.replaceAll(item, '{*imgSRC*}', imgSrc);
                        item = CDEVSupport.replaceAll(item, '{*headline*}', headline);

                        if (hasClip) {
                            item = CDEVSupport.replaceAll(item, '{*iconPlay*}', 'hasClip');
                        } else {
                            item = CDEVSupport.replaceAll(item, '{*iconPlay*}', 'noClip');
                        }

                        topVideosItemsElement += item;

                    }

                    topVideosElement = CDEVSupport.replaceAll(topVideosRAW, '{*listStories*}', topVideosItemsElement);
                    topVideosElement = CDEVSupport.replaceAll(topVideosElement, '{*categoryURL*}', categoryLink);

                    $wn(topVideosElement).appendTo('#WNSlideshowWrapper');

                    // $wn('#WNSlideshowWrapper .footer-button').insertAfter($wn('#WNSlideshowWrapper'));

                    $('#WNSlideshowWrapper .list-story-wrapper .slidelist-wrapper ul li .list-story-item .item-info h1').ellipsis({
                        row: 3,
                        onlyFullWords: true
                    });


                    //setting for slide
                    var itemWidth = 159; //width of one items
                    var numberDisplayItem = 1; //number of items can be displayed in one time
                    if (wng_pageInfo.isMobile) {
                        numberDisplayItem = 1;
                    }


                    var leftAlign = 0;
                    var leftAlignString = '';
                    var currentPosition = 0;

                    $wn('#WNSlideshowWrapper .left-arrow').css('visibility','hidden');

                    if ($wn('#WNSlideshowWrapper .slidelist-wrapper ul li').length * itemWidth > 880) {
                        $wn('#WNSlideshowWrapper .right-arrow').css('visibility','visible');
                    } else {
                        $wn('#WNSlideshowWrapper .right-arrow').css('visibility','hidden');
                    }


                    $wn('#WNSlideshowWrapper .left-arrow').click(function () {
                        currentPosition -= numberDisplayItem;
                        leftAlign = leftAlign + numberDisplayItem * itemWidth;
                        leftAlignString = leftAlign.toString() + 'px';
                        $("#WNSlideshowWrapper .list-story-wrapper ul").animate({
                            marginLeft: leftAlignString,
                        }, 70);

                        if (currentPosition === 0) {
                            $wn('#WNSlideshowWrapper .left-arrow').css('visibility','hidden');
                            $wn('#WNSlideshowWrapper .right-arrow').css('visibility','visible');
                        } else {
                            $wn('#WNSlideshowWrapper .right-arrow').css('visibility','visible');
                        }
                    });

                    $wn('#WNSlideshowWrapper .right-arrow').click(function () {
                        currentPosition += numberDisplayItem;
                        leftAlign = leftAlign - numberDisplayItem * itemWidth;
                        leftAlignString = leftAlign.toString() + 'px';
                        $("#WNSlideshowWrapper .list-story-wrapper ul").animate({
                            marginLeft: leftAlignString,
                        }, 70);

                        if (wng_pageInfo.isMobile) {
                            if (currentPosition + 1 == $wn('#WNSlideshowWrapper .slidelist-wrapper ul li').length) {
                                $wn('#WNSlideshowWrapper .right-arrow').css('visibility','hidden');
                                $wn('#WNSlideshowWrapper .left-arrow').css('visibility','visible');
                            } else {
                                $wn('#WNSlideshowWrapper .left-arrow').css('visibility','visible');
                            }
                        } else {
                            if (currentPosition + 4 == $wn('#WNSlideshowWrapper .slidelist-wrapper ul li').length) {
                                $wn('#WNSlideshowWrapper .right-arrow').css('visibility','hidden');
                                $wn('#WNSlideshowWrapper .left-arrow').css('visibility','visible');
                            } else {
                                $wn('#WNSlideshowWrapper .left-arrow').css('visibility','visible');
                            }
                        }
                    });

                    if (wng_pageInfo.containerClass !== 'home') {
                        $('#DisplaySizeId7').insertAfter('#WNCol23Top');
                    }
                }
            } //END
        }
    },

    meetTheTeamHeadlineBoxCol2A: function() {

    },

    movePositionSection: function() {
        //move this block below TRENDING NOW sectionRAW
        $('#DisplaySizeId85').insertAfter('#DisplaySizeId80 > ul:nth-child(2)');
    }
}
/**
 * When body is starting to render
 * 1. Hide original/in-build content
 * 2. Pre-populate data for rendering when body rendering is done
 */
Worldnow.EventMan.event('bodystart', function () {
  CDEVKMIR.initData();
  CDEVKMIR.initDataPublisher(GLOBALDATA);
});


Worldnow.EventMan.event('WNCol4done', function () {
  // render the feature col 4
  CDEVKMIR.siteWideElements.renderPopularAndFeature( MOSTPOPULAR , 'M');
  // render the most popular col 4
  CDEVKMIR.siteWideElements.renderPopularAndFeature( MOSTPOPULAR , 'F');
  // render the most popular col 4
  CDEVKMIR.siteWideElements.weatherCol4();
  // render the most popular col 4
  CDEVKMIR.siteWideElements.submitNewsForm();
  //siteWideElements: move ad PS-853
  // style headlinebox col 4
  CDEVKMIR.weatherPage.headlineBoxCol4();
  // meeth the team weather page
  CDEVKMIR.weatherPage.meetTheTeam();
  CDEVSupport.moveAds(52, 252, 'WNCol4', 'append');
});

Worldnow.EventMan.event('wncol23done', function () {

});


Worldnow.EventMan.event('bodydone', function () {
    CDEVKMIR.siteWideElements.footer();
    CDEVKMIR.siteWideElements.breakingNews();
    CDEVKMIR.siteWideElements.branding();
    CDEVKMIR.siteWideElements.navigationBar();
    CDEVKMIR.weatherPage.weather();
    CDEVKMIR.topStorySection(GLOBALDATA);
    CDEVKMIR.slideShowSection(GLOBALDATA);
    CDEVKMIR.lastestVideoSection(GLOBALDATA);
    CDEVKMIR.headlineCol2ASection(GLOBALDATA, wxTeamSocialInfo);
    CDEVKMIR.nestedCategoriesCol2(GLOBALDATA);
    CDEVKMIR.headlineCol2BSection(GLOBALDATA);
    CDEVKMIR.moreNewsSection(GLOBALDATA);
    CDEVKMIR.storyPageSection(GLOBALDATA);
    //if current page is NEWS
    if (wng_pageInfo.contentClassification == 'News') {
        $wn('#WNSlideshowWrapper').prependTo('#WNCol2');
    }

    if ( !wng_pageInfo.isMobile ){
      // $wn('link[href="/professionalservices/clients/kmir/custom-mobile.css"]').remove();


      if (wng_page_containerType == 'S') {
        if ($('#WNAd41').length > 0){
          /* event page */
          $wn('<div id="wnad-term" style="margin-top: 35px; margin-bottom: -15px;"></div>').insertAfter($wn('#WNHeader'));
          CDEVSupport.moveAds(41, '246', 'wnad-term', 'append');
        }
      } else {
          if ($('#WNAd46').length > 0){
              /* event page */
              $wn('<div id="wnad-term" style="margin-top: 35px; margin-bottom: -15px;"></div>').insertAfter($wn('#WNHeader'));
              CDEVSupport.moveAds(46, '246', 'wnad-term', 'append');
            }
          else {
              if ($('#WNAd41').length > 0){
                  /* event page */
                  $wn('<div id="wnad-term" style="margin-top: 35px; margin-bottom: -15px;"></div>').insertAfter($wn('#WNHeader'));
                  CDEVSupport.moveAds(41, '241', 'wnad-term', 'append');
                }
          }
      }
    }
    // else{
    //   $wn('head').append('<link rel="stylesheet" href="/professionalservices/clients/kmir/custom-dua1.css" type="text/css" />');
    // }

});
$wn(document).ready(function () {
    CDEVKMIR.movePositionSection(); //move all block into right position
});

Worldnow.EventMan.event('documentready', function () {


});

$wn(window).load(function () {


});