function DynamicTree(target, options) {
    var _bK = $(target);
    var _au = null;
    var _an = null;
    var defaults = {
        loadtype: 1,
        viewField: "_text"
    };
    _x();
    function _Y() {
        $.extend(defaults, {
            datasetName: _bK.attr("componentdataset"),
            contextmenu: _bK.attr("contextmenu")
        });
    };
    function _x() {
        _Y();
        var _aq = $.extend(defaults, options || {});
        var tree = _bK;
        var datasetName = _aq.datasetName;
        _au = getDatasetByID(datasetName);
        var contextmenu = _aq.contextmenu;
        _au.init = false;
        _an = copyDataset(datasetName + new Date().getTime(), datasetName);
        _an.flushData(1);
        tree.tree({
            data: _an,
            loader: function(param, success, error) {
                _an.setParameter("_id", param.id);
                _an.flushData(1);
                success(_an);
                _an.setParameter("_id", null);
            },
            loadFilter: function(_an) {
                return treedataset2json(_an, _aq);
            },
            onContextMenu: function(e, node) {
                e.preventDefault();
                this.rightSelectedNode = node;
                if (this.supportRightClick && contextmenu) {
                    $(contextmenu).menu('show', {
                        left: e.pageX,
                        top: e.pageY,
                        data: {
                            tree: tree,
                            node: node,
                            record: node.attributes.record
                        }
                    });
                }
            },
            onBeforeCollapse: function(node) {
                var _bR = tree.attr("id") + "_beforeCollapseNode";
                if (isUserEventDefined(_bR)) {
                    var _aB = fireUserEvent(_bR, [tree, node]);
                    if (!_aB) return false;
                }
            },
            onCollapse: function(node) {
                var _bR = tree.attr("id") + "_afterCollapseNode";
                fireUserEvent(_bR, [tree, node]);
            },
            onBeforeExpand: function(node) {
                var _bR = tree.attr("id") + "_beforeExpandNode";
                if (isUserEventDefined(_bR)) {
                    var _aB = fireUserEvent(_bR, [tree, node]);
                    if (!_aB) return false;
                }
            },
            onExpand: function(node) {
                var _bR = tree.attr("id") + "_afterExpandNode";
                fireUserEvent(_bR, [tree, node]);
            },
            onSelect: function(node) {
                if ((this.selectedNode && this.selectedNode.id != node.id) || (!this.selectedNode)) {
                    var _bR = tree.attr("id") + "_onSelectionChanged";
                    fireUserEvent(_bR, [tree, node, this.selectedNode]);
                    this.selectedNode = node;
                }
                var _bR = tree.attr("id") + "_onSelect";
                fireUserEvent(_bR, [tree, node]);
            },
            onBeforeCheck: function(node, checked) {
                var _bR = tree.attr("id") + "_onBeforeCheck";
                if (isUserEventDefined(_bR)) {
                    var _aB = fireUserEvent(_bR, [tree, node, checked]);
                    if (!_aB) return false;
                }
            },
            onCheck: function(node, checked) {
                var _bR = tree.attr("id") + "_onCheck";
                fireUserEvent(_bR, [tree, node, checked]);
            }
        });
    };
    function _n(state) {
        return _bK.tree('getChecked', state);
    };
    function _y(id) {
        var node = _bK.tree('find', id);
        return node || {};
    };
    function _F(id) {
        var node = _y(id);
        _bK.tree('select', node.target);
    };
    function _t(id) {
        var node = _y(id);
        _bK.tree('check', node.target);
    };
    function _f(id) {
        var node = _y(id);
        _bK.tree('uncheck', node.target);
    };
    function _Z(id) {
        var node = _y(id);
        _bK.tree('collapse', node.target);
    };
    function _L(id) {
        var node = _y(id);
        _bK.tree('expand', node.target);
    };
    function _Q(id) {
        var node = _y(id);
        _bK.tree('toggle', node.target);
    };
    function _m(id) {
        var node = _y(id);
        _bK.tree('collapseAll', node.target);
    };
    function _at(id) {
        var node = _y(id);
        _bK.tree('expandAll', node.target);
    };
    function _J(id, data, pos) {
        var node = _y(id);
        if (pos == 'before') {
            _bK.tree('insert', {
                before: node.target,
                data: data
            });
        } else {
            _bK.tree('append', {
                parent: node.target,
                data: data
            });
        }
    };
    function _b(id) {
        var node = _y(id);
        return _bK.tree('pop', node.target);
    };
    function _W(id) {
        var node = _y(id);
        return _bK.tree('isLeaf', node.target);
    };
    function _X() {
        return _bK.tree('getSelected');
    };
    function _A(id) {
        var node = _y(id);
        return _bK.tree('getParent', node.target);
    };
    function _z() {
        return _bK.tree('getRoot');
    };
    function _getRoots() {
        return _bK.tree('getRoots');
    };
    function _R(id) {
        var node = _y(id);
        var _bR = tree.attr("id") + "_onBeforeRefresh";
        var _aB = fireUserEvent(_bR, [tree, node]);
        if (!_aB) return false;
        _bK.tree('reload', node.target);
        _bR = tree.attr("id") + "_onRefresh";
        fireUserEvent(_bR, [tree, node]);
    };
    function _N(id) {
        return _bK.tree('options');
    };
    function _H(id, param) {
        var node = _y(id);
        param = param || {};
        _bK.tree('update', {
            target: node.target,
            text: param.text
        });
    };
    this.rightSelectedNode = null;
    this.selectedNode = null;
    this.supportRightClick = true;
    this.targetFrame = null;
    this.topNode = _bK.tree("getRoot");
    this.getChecked = function() {
        return _n();
    };
    this.getUnChecked = function() {
        return _n('unchecked');
    };
    this.getIndeterminate = function() {
        return _n('indeterminate');
    };
    this.find = _y;
    this.select = _F;
    this.selectAll = function() {
        var roots = _getRoots();
        for (var i = 0; i < roots.length; i++) {
            _t(roots[i].id);
        }
    };
    this.unSelectAll = function() {
        var roots = _getRoots();
        for (var i = 0; i < roots.length; i++) {
            _f(roots[i].id);
        }
    };
    this.check = _t;
    this.uncheck = _f;
    this.collapse = _Z;
    this.expand = _L;
    this.toggle = _Q;
    this.collapseAll = _m;
    this.expandAll = _at;
    this.append = _J;
    this.remove = _b;
    this.isLeaf = _W;
    this.getSelected = _X;
    this.getParent = _A;
    this.getRoot = _z;
    this.getRoots = _getRoots;
    this.refresh = _R;
    this.options = _N;
};
function DynamicTabSet(target, options) {
    var _bM = this;
    var _bK = $(target);
    var _aY = {};
    var _bE = 1;
    var _ak = null;
    var _bp = null;
    var _aJ = false;
    var _aX = {};
    var defaults = {
        title: '&nbsp',
        fit: true,
        init: true,
        isHaveNavigate: false,
        contextMenu: true,
        onSelectNavigate: function(_aZ, _aq) {
            if (!_aZ.isHaveNavigate && !_aZ.isComplete) return;
            if (_aq.isHaveNavigate) {
                var w = $("ul.tabs li.tabs-selected").width();
                $("ul.tabs li.tabs-selected span.tabs-click").css('left', 0).width(w);
                var _aa;
                $("div.tabs-container div.tabs-header div.tabs-wrap ul.tabs li.tabs-selected a.tabs-inner span.tabs-click").hover(function(e) {
                    $('.tabs li.tabs-selected a.tabs-inner', this).addClass("navigate");
                    var _ae = $("div.tabs-container div.tabs-panels div:visible");
                    var navigate = $("div.navigate-div", _ae);
                    if (navigate.length == 0) {
                        var _ay = new Array();
                        _ay.push("<div class=\"navigate-div\">");
                        _ay.push('<ul class="nav">');
                        if (_aZ.rootId) {
                            _ay.push('<li class="normal">');
                            _ay.push("<a class=''><span>" + _aZ.rootId + "</span></a>");
                            _ay.push('</li>');
                            _ay.push('<li class="arrow_hleft">&nbsp;</li>');
                        }
                        for (var i = 0; i < _aZ.history.length; i++) {
                            var url = _aZ.history[i].url;
                            if (i == (_aZ.history.length - 1)) {
                                if (url.indexOf('.ftl') != -1) {
                                    if (i % 2 == 0) {
                                        _ay.push('<li class="hlight">');
                                    } else {
                                        _ay.push('<li class="normal">');
                                    }
                                    _ay.push("<a class='current-iframe' href=\"#\" onclick=\"dts.refresh('','" + url + "');$('div.navigate-div').remove();$('.tabs li.tabs-selected a.tabs-inner').removeClass('navigate');\"><span>" + (_aZ.history[i].title || _aZ.desc) + "</span></a>");
                                    _ay.push('</li>');
                                    if (i % 2 == 0) {
                                        _ay.push('<li class="arrow_wright">&nbsp;</li>');
                                    } else {
                                        _ay.push(' <li class="arrow_bright">&nbsp;</li>');
                                    }
                                } else {
                                    if (i % 2 == 0) {
                                        _ay.push('<li class="hlight">');
                                    } else {
                                        _ay.push('<li class="normal">');
                                    }
                                    _ay.push("<a class='current-iframe'><span>" + (_aZ.history[i].title || _aZ.desc) + "</span></a>");
                                    _ay.push('</li>');
                                    if (i % 2 == 0) {
                                        _ay.push('<li class="arrow_wright">&nbsp;</li>');
                                    } else {
                                        _ay.push(' <li class="arrow_bright">&nbsp;</li>');
                                    }
                                }
                                continue;
                            }
                            if (url.indexOf('.ftl') != -1) {
                                if (i % 2 == 0) {
                                    _ay.push('<li class="hlight">');
                                } else {
                                    _ay.push('<li class="normal">');
                                }
                                _ay.push("<a class='' href=\"#\" onclick=\"dts.refresh('','" + url + "');$('div.navigate-div').remove();$('.tabs li.tabs-selected a.tabs-inner').removeClass('navigate');\"><span>" + (_aZ.history[i].title || _aZ.desc) + "</span></a>");
                                _ay.push('</li>');
                                if (i % 2 == 0) {
                                    _ay.push('<li class="arrow_hright">&nbsp;</li>');
                                } else {
                                    _ay.push('<li class="arrow_hleft">&nbsp;</li>');
                                }
                            } else {
                                if (i % 2 == 0) {
                                    _ay.push('<li class="hlight">');
                                } else {
                                    _ay.push('<li class="normal">');
                                }
                                _ay.push("<a class=''><span>" + (_aZ.history[i].title || _aZ.desc) + "</span></a>");
                                _ay.push('</li>');
                                if (i % 2 == 0) {
                                    _ay.push('<li class="arrow_hright">&nbsp;</li>');
                                } else {
                                    _ay.push('<li class="arrow_hleft">&nbsp;</li>');
                                }
                            }
                        }
                        _ay.push("</ul></div>");
                        var nav = $(_ay.join(''));
                        var src = e || event;
                        var x = src.clientX + document.body.scrollLeft + -40 + "px";
                        nav.css('left', x);
                        $('a.menu-search', nav).hover(function() {},
                        function() {});
                        var li = $("li", nav);
                        if (li.length == 2) return;
                        nav.prependTo("div.tabs-container div.tabs-panels div.panel:visible").show(300);
                        $("div.navigate-div").hover(function() {
                            clearTimeout(_aa);
                        },
                        function() {
                            $("div.navigate-div").remove();
                            $('.tabs li.tabs-selected a.tabs-inner').removeClass("navigate");
                        });
                    }
                },
                function() {
                    _aa = setTimeout(function() {
                        $("div.navigate-div").remove();
                        $('.tabs li.tabs-selected a.tabs-inner').removeClass("navigate");
                    },
                    200);
                });
            }
        },
        onContextMenu: function(e, _aq) {
            if (!_N().contextMenu) {
                return;
            }
            _contextmenu_onfilter(_ak, _aY, _aq);
            _ak.menu('show', {
                left: e.pageX,
                top: e.pageY
            });
            _ak.data('current-id', _aq.title);
            return false;
        },
        onBeforeSelect: function(id, title) {
            $("div.tabs-container div.tabs-wrap ul.tabs li.tabs-selected a.tabs-inner span.tabs-click").unbind("mouseenter mouseleave");
            if (!_aJ || _N().disableEvent) {
                return;
            }
            if (id == _D(0)) {
                return;
            }
            var p = _V(id);
            if (p) {
                var iframe = p.find('iframe')[0];
                if (iframe) {
                    var _aF = iframe.contentWindow;
                    var _bR = target + "_tabset_beforeTabChange";
                    try {
                        var _aB = _aF.fireUserEvent(_bR, [_aY, title, id]);
                        if (_aB == false) {
                            return false;
                        }
                    } catch(e) {}
                }
            }
            return true;
        },
        onSelect: function(id) {
            if (!_aJ) {
                return;
            }
            var _aF = _X().find('iframe');
            if (_aF[0]) {
                var url = _aF.attr("url");
                if (!_aF.attr("src")) {
                    if (_bp) {
                        clearTimeout(_bp);
                    }
                    _bp = setTimeout(function() {
                        _aF.attr("src", wrapUrl(url, _aX));
                    },
                    200);
                }
            }
        },
        onAfterSelect: function(id, title) {
            if (!_aJ || _N().disableEvent) {
                return;
            }
            _bM.selectName = _B();
            _bM.selectIndex = _K();
            _bM.selectTab = _X();
            if (_bM.selectTab) _bM.selectTab.name = _bM.selectName;
            if (id == _D(1)) {
                return;
            }
            var p = _V(id);
            if (p) {
                var iframe = p.find('iframe')[0];
                if (iframe) {
                    var _aF = iframe.contentWindow;
                    var _bR = target + "_tabset_afterTabChange";
                    try {
                        _aF.fireUserEvent(_bR, [_aY, title, id]);
                    } catch(e) {}
                }
            }
        }
    };
    _x();
    function _C(_bB) {
        if (_bB == false || _bB == "false") {
            return false;
        } else {
            return true;
        }
    };
    function _N() {
        if (arguments.length == 0) {
            return _aY.tabs('options');
        } else if (arguments.length == 1) {
            return _aY.tabs('options')[arguments[0]];
        } else if (arguments.length == 2) {
            _aY.tabs('options')[arguments[0]] = arguments[1];
        }
    };
    function _D(i) {
        i = i || 0;
        var _ar = _aY.tabs('selectHis');
        var _i = _ar.length - 1 - i;
        return _ar[_i];
    };
    function _F(id) {
        _aY.tabs('select', id);
    };
    function _w(id) {
        return _aY.tabs('exists', id);
    };
    function _H(id, param) {
        var tab = _aY.tabs('getTab', id);
        _aY.tabs('update', {
            tab: tab,
            options: param
        });
    };
    function _s(id, enable) {
        enable ? _aY.tabs('enableTab', id) : _aY.tabs('disableTab', id);
    };
    function _T(id, iconCls) {
        var _aq = _V(id).panel('options');
        var tab = _aq.tab;
        var _aO = tab.find('span.tabs-title');
        var _bd = tab.find('span.tabs-icon');
        _bd.attr("class", "tabs-icon");
        if (iconCls) {
            _aO.addClass("tabs-with-icon");
            _bd.addClass(iconCls);
        } else {
            _aO.removeClass("tabs-with-icon");
        }
        _aq.iconCls = iconCls;
    };
    function _c(id, title) {
        var _aq = _V(id).panel('options');
        _aq.tab.find("span.tabs-title").html(title);
        _aq.desc = title;
    };
    function _e(id, closable) {
        var pp = _V(id);
        var _aq = pp.panel('options');
        var tab = _aq.tab;
        tab.find("a.tabs-close").remove();
        var _aO = tab.find('span.tabs-title');
        if (closable) {
            _aO.addClass('tabs-closable');
            var _bt = $('<a href="javascript:void(0)" class="tabs-close"></a>').appendTo(tab);
            _bt.bind('click.tabs', {
                tabset: _aY,
                id: id,
                tab: pp
            },
            function(e) {
                if ($(this).parent().hasClass('tabs-disabled')) {
                    return;
                }
                if (_aq.onCloseClick.call(this, e.data.tab) == false) {
                    return;
                }
                e.data.tabset.tabs('close', e.data.id);
                return false;
            });
        } else {
            _aO.removeClass('tabs-closable');
        }
        _aq.closable = closable;
    };
    function _u(id) {
        return _V(id).panel('options').title;
    };
    function _X() {
        return _aY.tabs('getSelected');
    };
    function _K() {
        return _aY.tabs('getTabIndex', _X());
    };
    function _B() {
        return _X().panel('options').title;
    };
    function _V(id) {
        return _aY.tabs('getTab', id);
    };
    function _P(id) {
        return _aY.tabs('getTabIndex', _V(id));
    };
    function _as(id) {
        var _id = id == 0 ? 0 : (id || _B());
        var _aq = _V(_id).panel('options');
        if (_tabset_onBeforeClose(_aY, _aq.title, _aq.desc) == false) {
            return;
        }
        _aY.tabs('close', _id);
    };
    function _l() {
        $(_aY.tabs('tabs')).each(function() {
            var id = $(this).panel('options').title;
            _as(id);
        });
    };
    function _I(id) {
        var _id = id || _B();
        $(_aY.tabs('tabs')).each(function() {
            var _bL = $(this).panel('options').title;
            if (_bL != _id) {
                _as(_bL);
            }
        });
    };
    function _O(id) {
        var _id = id || _B();
        var tab = _aY.tabs('getTab', _id);
        var index = _aY.tabs('getTabIndex', tab);
        $(_aY.tabs('tabs')).each(function(i) {
            if (i > index) {
                _as(index + 1);
            }
        });
    };
    function _o(id) {
        var _id = id || _B();
        var tab = _aY.tabs('getTab', _id);
        var index = _aY.tabs('getTabIndex', tab);
        $(_aY.tabs('tabs')).each(function(i) {
            if (i < index) {
                _as(0);
            }
        });
    };
    function _G(id, url) {
        var _id = id || _B();
        var tab = _aY.tabs('getTab', _id);
        var _aF = tab.find('iframe');
        if (_aF[0]) {
            if (url) {
                _aF.attr("url", url).attr("src", url);
            } else {
                _aF[0].contentWindow.location.reload(true);
            }
        }
    };
    function _k(_al, _bg) {
        var _aT = _al.split(",");
        var _bf = _bg.split(",");
        for (var i = 0; i < _aT.length; i++) {
            _aX[_aT[i]] = _bf[i];
        }
    };
    function _M(_bl) {
        _aX = _bl;
    };
    function _h(_ap) {
        _N().contextMenu = _ap;
    };
    function _Y() {
        $.extend(defaults, {
            selected: _bK.attr("selectedId"),
            contextMenu: _bK.attr("hasMenu") ? _bK.attr("hasMenu") == "true": undefined,
            isHaveNavigate: _bK.attr("isHaveNavigate") ? _bK.attr("isHaveNavigate") == "true": undefined
        });
    };
    function _x() {
        _Y();
        var _aq = $.extend(defaults, options || {});
        _aY = _bK.tabs(_aq);
        var menu = $('<div class="tabs-contextmenu"/>').width(120).appendTo($('body'));
        $('<div name="menuitem_close" />').text($.fn.tabs.defaults.m_close).appendTo(menu);
        $('<div name="menuitem_closeall" />').text($.fn.tabs.defaults.m_closeAll).appendTo(menu);
        $('<div name="menuitem_closeother" />').text($.fn.tabs.defaults.m_closeOther).appendTo(menu);
        $('<div class="menu-sep" />').appendTo(menu);
        $('<div name="menuitem_closeright" />').text($.fn.tabs.defaults.m_closeRight).appendTo(menu);
        $('<div name="menuitem_closeleft" />').text($.fn.tabs.defaults.m_closeLeft).appendTo(menu);
        $('<div class="menu-sep" />').appendTo(menu);
        $('<div name="menuitem_refresh" />').text($.fn.tabs.defaults.m_refresh).appendTo(menu);
        menu.menu({
            onClick: function(item) {
                var id = _ak.data('current-id');
                switch (item.name) {
                case "menuitem_close":
                    {
                        _as(id);
                        break;
                    }
                case "menuitem_closeall":
                    {
                        _l();
                        break;
                    }
                case "menuitem_closeother":
                    {
                        _I(id);
                        break;
                    }
                case "menuitem_closeright":
                    {
                        _O(id);
                        break;
                    }
                case "menuitem_closeleft":
                    {
                        _o(id);
                        break;
                    }
                case "menuitem_refresh":
                    {
                        _G(id);
                        break;
                    }
                }
            }
        });
        _ak = menu;
        _aJ = true;
        if (_aq.selected || _aq.selected == 0) {
            _F(_aq.selected);
        }
    };
    function _d(_aq) {
        if (typeof _aq == "object" && !_aq.id) {
            alert('tab id is required!');
            return;
        }
        if (_w(_aq.id)) {
            _F(_aq.id);
            return;
        }
        var content = null;
        if (_aq.url) {
            content = '<iframe scrolling="yes" frameborder="0" url="' + getUrl(_aq.url) + '" style="width:100%;height:100%;"></iframe>';
        } else {
            content = _aq.content || '&nbsp;';
        }
        var options = {
            title: "" + _aq.id,
            desc: _aq.title || 'New Tab ' + _bE++,
            content: content,
            iconCls: _aq.iconCls,
            closable: _C(_aq.closable),
            history: _aq.history || new Array(),
            rootId: _aq._bT,
            isComplete: false,
            isHaveNavigate: typeof(_aq.isHaveNavigate) == 'undefined' ? true: _aq.isHaveNavigate
        };
        var _aq = $.extend({
            onCloseClick: function(tab) {
                var _aq = tab.panel('options');
                if (_tabset_onBeforeClose(_aY, _aq.title, _aq.desc) == false) {
                    return false;
                } else {
                    return true;
                }
            }
        },
        options);
        _N().disableEvent = true;
        _aY.tabs('add', _aq);
        _N().disableEvent = false;
    };
    this.init = function(json) {
        _N().init = false;
        var _aV = null;
        for (var i = 0; i < json.length; i++) {
            if (json[i].selected) {
                _aV = json[i].id;
            }
            this.add(json[i]);
        }
        _F(_aV);
        _N().init = true;
    };
    this.options = _N;
    this.add = _d;
    this.select = _F;
    this.isExist = _w;
    this.setEnable = _s;
    this.setIconCls = _T;
    this.setTitle = _c;
    this.setClosable = _e;
    this.getTitle = _u;
    this.getSelected = _X;
    this.getSelectedIndex = _K;
    this.getSelectedId = _B;
    this.getTab = _V;
    this.getTabIndex = _P;
    this.close = _as;
    this.closeAll = _l;
    this.closeOther = _I;
    this.closeRight = _O;
    this.closeLeft = _o;
    this.refresh = _G;
    this.setContextMenu = _h;
    this.setParams = _M;
    this.addParams = _k;
    this.id = _bK.attr("id");
    this.setActiveTabIndex = _F;
    this.setActiveTab = _F;
    DynamicTabSet._bI[target] = this;
};
DynamicTabSet._bI = {};
DynamicTabSet.get = function(_av) {
    if (window == window.top) {
        return DynamicTabSet._bI[_av];
    }
    if (DynamicTabSet._bI[_av]) {
        return DynamicTabSet._bI[_av];
    } else {
        return parent.DynamicTabSet.get(_av);
    }
};
function unwrapUrl(url) {
    var i = url.indexOf('?');
    var param = {};
    if (i > -1) {
        url = url.substring(i + 1);
        var p = url.split('&');
        for (var j = 0; j < p.length; j++) {
            var kv = p[j].split('=');
            if (kv.length == 2) {
                param[kv[0]] = kv[1];
            }
        }
    }
    return param;
};
function wrapUrl(url, param) {
    var _aH = "";
    for (var k in param) {
        if (typeof param[k] == 'object') continue;
        _aH += "&" + k + "=" + param[k];
    }
    if (_aH == "") {
        return url;
    } else {
        var i = url.indexOf('?');
        if (i > -1) {
            url += _aH;
        } else {
            url += "?" + _aH.substring(1);
        }
        return url;
    }
};
function getUrl(url) {
    if (url.indexOf("http://") == 0) {} else {
        if (url.indexOf(_application_root) == -1) {
            url = _application_root + url;
        }
    }
    return url;
};
function _contextmenu_onfilter(_ak, tabset, _aq) {
    var _id = _aq.title;
    if (_id == 'home') {
        _ak.find('[name="menuitem_close"]').addClass('menu-item-disabled');
    } else {
        _ak.find('[name="menuitem_close"]').removeClass('menu-item-disabled');
    }
};
function _tabset_onBeforeClose(_aY, id, title) {
    if (id == "home") return false;
};
function tabNavigate(title, url) {
    if (parent.dts) {
        var o = new Object();
        o.title = title;
        var index = $.inArray(_application_root, url)
        //var index = url.indexOf(_application_root);
        //alert(String(url).substring(index));
        o.url = String(url).substring(index);
        var dynamicTab = parent.dts;
        if (dynamicTab.getSelectedIndex() == 0) return;
        var _aq = dynamicTab.getSelected().panel('options');
        var history = _aq.history;
        o.desc = _aq.desc;
        history.push(o);
        sortPath(history);
        _aq.isComplete = true;
    }
};
function sortPath(h) {
    var _aR = h.length;
    for (var i = _aR - 1; i > 0; i--) {
        for (var j = _aR - 2; j >= 0; j--) {
            if (h[i].title == h[j].title && i != j) {
                h.splice(j + 1, _aR - j - 1);
                return h;
            }
        }
    }
};
var KEYCODE = {
    ENTER: 13,
    ESC: 27,
    END: 35,
    HOME: 36,
    SHIFT: 16,
    TAB: 9,
    LEFT: 37,
    RIGHT: 39,
    UP: 38,
    DOWN: 40,
    DELETE: 46,
    BACKSPACE: 8
};
var easyMsg = {
    _bN: "#alertMsgBox",
    _bA: "#alertBackground",
    _ai: null,
    _opentime: 0,
    _az: {
        error: "error",
        info: "info",
        warn: "warn",
        correct: "correct",
        confirm: "confirm"
    },
    _aC: {
        "alertBoxFrag": '<div id="alertMsgBox" class="alert"><div class="alertContent"><div class="#type#"><div class="alertInner"><h1>#title#</h1><div class="msg">#message#</div></div><div class="toolBar">#butFragment#</div></div></div><div class="alertFooter"><div class="alertFooter_r"><div class="alertFooter_c"></div></div></div></div> ',
        "alertButFrag": '<a class="easyui-linkbutton" iconCls="#btnIcon#" rel="#callback#" onclick="easyMsg.close()" href="javascript:"><span>#butMsg#</span></a> '
    },
    _u: function(key) {
        return $.regional.alertMsg.title[key];
    },
    _aK: function(event) {
        if (event.keyCode == KEYCODE.ENTER) event.data.target.trigger("click");
        return false;
    },
    _aE: function(event) {
        if (event.keyCode == KEYCODE.ESC) event.data.target.trigger("click");
    },
    _aQ: function(type, msg, buttons, options) {
        var _newtime = new Date().getTime();
        var _oldtime = this._opentime;
        this._opentime = _newtime;
        if (_newtime - _oldtime < 100 && $(this._bN).has("." + type)) {
            var _msgDiv = $(this._bN).find(".msg");
            _msgDiv.html(msg + "<br/>" + _msgDiv.html());
            return;
        }
        $(this._bN).remove();
        var _aA = "";
        if (buttons) {
            for (var i = 0; i < buttons.length; i++) {
                var _bG = buttons[i].call ? "callback": "";
                _aA += this._aC["alertButFrag"].replace("#butMsg#", buttons[i].name).replace("#callback#", _bG).replace("#btnIcon#", buttons[i].btnIcon);
            }
        }
        var _bP = this._aC["alertBoxFrag"].replace("#type#", type).replace("#title#", options.title ? options.title: this._u(type)).replace("#message#", msg).replace("#butFragment#", _aA);
        var box = $(_bP).appendTo("body").css({
            top: -$(this._bN).height() + "px"
        }).animate({
            top: "0px"
        },
        500);
        $.parser.parse(box);
        if (this._ai) {
            clearTimeout(this._ai);
            this._ai = null;
        }
        if (this._az.info == type || this._az.correct == type) {} else {
            $(this._bA).show();
        }
        $('<input type="text" style="width:0;height:0;" name="_alertFocusCtr"/>').appendTo(this._bN).focus().hide();
        var _ah = $(this._bN).find("a.easyui-linkbutton");
        var _br = _ah.filter("[rel=callback]");
        var _ax = $(document);
        for (var i = 0; i < buttons.length; i++) {
            if (buttons[i].call) {
                _br.eq(i).click(buttons[i].call);
            }
            if (buttons[i].keyCode == KEYCODE.ENTER) {
                _ax.bind("keydown", {
                    target: _ah.eq(i)
                },
                this._aK);
            }
            if (buttons[i].keyCode == KEYCODE.ESC) {
                _ax.bind("keydown", {
                    target: _ah.eq(i)
                },
                this._aE);
            }
        }
    },
    close: function() {
        $(document).unbind("keydown", this._aK).unbind("keydown", this._aE);
        $(this._bN).animate({
            top: -$(this._bN).height()
        },
        500,
        function() {
            $(this).remove();
        });
        $(this._bA).hide();
    },
    error: function(msg, options) {
        this._by(this._az.error, msg, options);
    },
    info: function(msg, options) {
        this._by(this._az.info, msg, options);
    },
    warn: function(msg, options) {
        this._by(this._az.warn, msg, options);
    },
    correct: function(msg, options) {
        this._by(this._az.correct, msg, options);
    },
    _by: function(type, msg, options) {
        var op = {
            okName: $.regional.alertMsg.butMsg.ok,
            okCall: null
        };
        $.extend(op, options);
        var buttons = [{
            name: op.okName,
            call: op.okCall,
            keyCode: KEYCODE.ENTER,
            btnIcon: "icon-ok"
        }];
        this._aQ(type, msg, buttons, op);
    },
    confirm: function(msg, options) {
        var op = {
            okName: $.regional.alertMsg.butMsg.ok,
            okCall: null,
            cancelName: $.regional.alertMsg.butMsg.cancel,
            cancelCall: null
        };
        $.extend(op, options);
        var buttons = [{
            name: op.okName,
            call: op.okCall,
            keyCode: KEYCODE.ENTER,
            btnIcon: "icon-ok"
        },
        {
            name: op.cancelName,
            call: op.cancelCall,
            keyCode: KEYCODE.ESC,
            btnIcon: "icon-cancel"
        }];
        this._aQ(this._az.confirm, msg, buttons, op);
    }
}; (function($) {
    $.setRegional = function(key, value) {
        if (!$.regional) $.regional = {};
        $.regional[key] = value;
    };
    $.setRegional("alertMsg", {
        title: {
            error: "Error",
            info: "Information",
            warn: "Warning",
            correct: "Successful",
            confirm: "Confirmation"
        },
        butMsg: {
            ok: "OK",
            yes: "Yes",
            no: "No",
            cancel: "Cancel"
        }
    });
    window.alert = function(msg, title, buttonText) {
        window.top.easyMsg.info(msg, {
            title: title,
            okName: buttonText
        });
    };
})(jQuery); (function($) {
    function _r(jq, disabled) {
        var select = $.data(jq, "popselect");
        var options = select.options;
        if (!disabled) {
            var _ac = $.data(jq, "combo").combo.find("span.combo-arrow");
            _ac.unbind('click.combo').bind('click.combo',
            function() {
                if (select.dialog.is(":visible")) {
                    select.dialog.dialog("close");
                } else {
                    if (options.onShowPanel.call(jq) == false) {
                        return;
                    }
                    select.dialog.dialog("open");
                    var _af = select.dialog.find('iframe');
                    if (_af[0] && !_af.hasClass("popselect-f-loaded")) {
                        _af[0].contentWindow.location.href = options.url;
                        _af.addClass("popselect-f-loaded");
                        select.dialog.dialog("maximize");
                    }
                }
            });
        }
    };
    function create(jq) {
        var select = $.data(jq, "popselect");
        var options = select.options;
        $(jq).addClass("popselect-f");
        $(jq).combo($.extend({},
        options, {}));
        $(jq).combo("textbox").parent().addClass("popselect");
        _r(jq, false);
        if (!select.dialog) {
            select.dialog = $("<div></div>").insertAfter(jq);
            var _aF = $('<iframe scrolling="yes" frameborder="0" style="width:100%;height:100%;"></iframe>');
            select.dialog.append(_aF);
            select.dialog.attr('title', options.title || "Select Dialog");
            select.dialog.dialog({
                width: 500,
                height: 300,
                maximizable: true,
                collapsible: false,
                modal: true,
                resizable: true,
                closed: true,
                buttons: [{
                    text: 'Ok',
                    iconCls: 'icon-ok',
                    handler: function() {
                        var record = null;
                        var _af = _aF[0];
                        if (_af.contentWindow.dropDown_onGetRecord) {
                            record = _af.contentWindow.dropDown_onGetRecord();
                        }
                        if (options.onSelect.call(jq, record) == false) {
                            select.dialog.dialog("close");
                            return;
                        }
                        select.dialog.dialog("close");
                    }
                },
                {
                    text: 'Cancel',
                    iconCls: 'icon-cancel',
                    handler: function() {
                        var _af = _aF[0];
                        var result;
                        if (_af.contentWindow.dropDown_onCanelRecord) {
                            result = _af.contentWindow.dropDown_onCanelRecord();
                        }
                        if (options.onCancel.call(jq, result) == false) {
                            return;
                        }
                        select.dialog.dialog("close");
                    }
                }]
            });
            if ($.data(select.dialog[0], "window").mask) {
                $.data(select.dialog[0], "window").mask.click(function() {
                    select.dialog.dialog("close");
                });
            }
        }
    };
    $.fn.popselect = function(options, param) {
        if (typeof options == "string") {
            var fn = $.fn.popselect.methods[options];
            if (fn) {
                return fn(this, param);
            } else {
                return this.combo(options, param);
            }
        }
        options = options || {};
        return this.each(function() {
            var data = $.data(this, "popselect");
            if (data) {
                $.extend(data.options, options);
            } else {
                data = $.data(this, "popselect", {
                    options: $.extend({},
                    $.fn.popselect.defaults, $.fn.popselect.parseOptions(this), options)
                });
            }
            create(this);
        });
    };
    $.fn.popselect.methods = {
        options: function(jq) {
            return $.data(jq[0], "popselect").options;
        },
        getData: function(jq) {
            return $.data(jq[0], "popselect").data;
        },
        setValues: function(jq, values) {
            return jq.each(function() {
                setValues(this, values);
            });
        },
        showPanel: function(jq) {
            $.data(jq[0], "combo").combo.find("span.combo-arrow").trigger("click.combo");
        },
        setValue: function(jq, value) {
            return jq.each(function() {
                $(jq).combo("setValue", value).combo("setText", value);
            });
        },
        disable: function(jq) {
            return jq.each(function() {
                $(jq).combo("disable");
                _r(this, true);
            });
        },
        enable: function(jq) {
            return jq.each(function() {
                $(jq).combo("enable");
                _r(this, false);
            });
        }
    };
    $.fn.popselect.parseOptions = function(target) {
        var t = $(target);
        return $.extend({},
        $.fn.combo.parseOptions(target), {
            valueField: t.attr("valueField"),
            textField: t.attr("textField"),
            mode: t.attr("mode"),
            method: (t.attr("method") ? t.attr("method") : undefined),
            url: t.attr("url")
        });
    };
    $.fn.popselect.defaults = $.extend({},
    $.fn.combo.defaults, {
        valueField: "value",
        textField: "text",
        url: "",
        keyHandler: {
            up: function() {},
            down: function() {},
            enter: function() {},
            query: function(q) {}
        },
        formatter: function(row) {
            var options = $(this).popselect("options");
            return row[options.textField];
        },
        onShowPanel: function() {},
        onSelect: function(param) {},
        onCancel: function(param) {}
    });
})(jQuery); (function($) {
    function init(target) {
        $(target).addClass('portal');
        var table = $('<table border="0" cellspacing="0" cellpadding="0"><tr></tr></table>').appendTo(target);
        var tr = table.find('tr');
        var _ab = [];
        var _bz = 0;
        $(target).children('div:first').addClass('portal-column-left');
        $(target).children('div:last').addClass('portal-column-right');
        $(target).find('>div').each(function() {
            var column = $(this);
            _bz += column.outerWidth();
            _ab.push(column.outerWidth());
            var td = $('<td class="portal-column-td"></td>').appendTo(tr);
            column.addClass('portal-column').appendTo(td);
            column.find('>div').each(function() {
                var p = $(this).addClass('portal-p').panel({
                    doSize: false,
                    cls: 'portal-panel',
                    draggable: $(this).attr('draggable')
                });
                _aG(target, p);
            });
        });
        for (var i = 0; i < _ab.length; i++) {
            _ab[i] /= _bz;
        }
        $(target).bind('_resize',
        function() {
            var _aq = $.data(target, 'portal').options;
            if (_aq.fit == true) {
                setSize(target);
            }
            return false;
        });
        return _ab;
    };
    function setSize(target) {
        var t = $(target);
        var _aq = $.data(target, 'portal').options;
        if (_aq.fit) {
            var p = t.parent();
            _aq.width = p.width() - 5;
            _aq.height = p.height() - 5;
        }
        if (!isNaN(_aq.width)) {
            if ($.boxModel == true) {
                t.width(_aq.width - (t.outerWidth() - t.width()));
            } else {
                t.width(_aq.width);
            }
        } else {
            t.width('auto');
        }
        if (!isNaN(_aq.height)) {
            if ($.boxModel == true) {
                t.height(_aq.height - (t.outerHeight() - t.height()));
            } else {
                t.height(_aq.height);
            }
        } else {
            t.height('auto');
        }
        var _aW = t.find('>table').outerHeight() > t.height();
        var width = t.width();
        var _ab = $.data(target, 'portal')._ab;
        var _bF = 0;
        for (var i = 0; i < _ab.length; i++) {
            var p = t.find('div.portal-column:eq(' + i + ')');
            var w = Math.floor(width * _ab[i]);
            if (i == _ab.length - 1) {
                w = width - _bF - (_aW == true ? 18 : 0);
            }
            if ($.boxModel == true) {
                p.width(w - (p.outerWidth() - p.width()));
            } else {
                p.width(w);
            }
            _bF += p.outerWidth();
            p.find('div.portal-p').panel('resize', {
                width: p.width() - 1
            });
        }
        _aq.onResize.call(target, _aq.width, _aq.height);
    };
    function _aG(target, panel) {
        if (panel.panel('options').draggable == false || panel.panel('options').draggable == 'false') {
            return;
        }
        var _bb;
        panel.panel('panel').draggable({
            handle: '>div.panel-header>div.panel-title',
            proxy: function(source) {
                var p = $('<div class="portal-proxy">proxy</div>').insertAfter(source);
                p.width($(source).width());
                p.height($(source).height());
                p.html($(source).html());
                p.find('div.portal-p').removeClass('portal-p');
                return p;
            },
            onBeforeDrag: function(e) {
                e.data.startTop = $(this).position().top + $(target).scrollTop();
            },
            onStartDrag: function(e) {
                $(this).hide();
                _bb = $('<div class="portal-_bb"></div>').insertAfter(this);
                _ba($(this).outerWidth(), $(this).outerHeight());
            },
            onDrag: function(e) {
                var p = _q(e, this);
                if (p) {
                    if (p.pos == 'up') {
                        _bb.insertBefore(p.target);
                    } else {
                        _bb.insertAfter(p.target);
                    }
                    _ba($(p.target).outerWidth());
                } else {
                    var c = _U(e);
                    if (c) {
                        if (c.find('div.portal-_bb').length == 0) {
                            _bb.appendTo(c);
                            setSize(target);
                            _ba(c.width());
                        }
                    }
                }
            },
            onStopDrag: function(e) {
                $(this).css('position', 'static');
                $(this).show();
                _bb.hide();
                $(this).insertAfter(_bb);
                _bb.remove();
                setSize(target);
                panel.panel('move');
                var _aq = $.data(target, 'portal').options;
                if (_aq.cookied) {
                    var state = _g(target);
                    document.cookie = 'portal-state-' + _current_user + '=' + state;
                }
                _aq.onStateChange.call(target);
            }
        });
        function _g(target) {
            var aa = [];
            var colsize = $(target).find('div.portal-column').size();
            for (var _aI = 0; _aI < colsize; _aI++) {
                var cc = [];
                var panels = $(target).portal('getPanels', _aI);
                for (var i = 0; i < panels.length; i++) {
                    cc.push(panels[i].attr('id'));
                }
                aa.push(cc.join(','));
            }
            return aa.join(':');
        };
        function _q(e, source) {
            var result = null;
            $(target).find('div.portal-p').each(function() {
                var _bn = $(this).panel('panel');
                if (_bn[0] != source) {
                    var pos = _bn.offset();
                    if (e.pageX > pos.left && e.pageX < pos.left + _bn.outerWidth() && e.pageY > pos.top && e.pageY < pos.top + _bn.outerHeight()) {
                        if (e.pageY > pos.top + _bn.outerHeight() / 2) {
                            result = {
                                target: _bn,
                                pos: 'down'
                            };
                        } else {
                            result = {
                                target: _bn,
                                pos: 'up'
                            };
                        }
                    }
                }
            });
            return result;
        };
        function _U(e) {
            var result = null;
            $(target).find('div.portal-column').each(function() {
                var _bn = $(this);
                var pos = _bn.offset();
                if (e.pageX > pos.left && e.pageX < pos.left + _bn.outerWidth()) {
                    result = _bn;
                }
            });
            return result;
        };
        function _ba(width, height) {
            if ($.boxModel == true) {
                _bb.width(width - (_bb.outerWidth() - _bb.width()));
                if (height) {
                    _bb.height(height - (_bb.outerHeight() - _bb.height()));
                }
            } else {
                _bb.width(width);
                if (height) {
                    _bb.height(height);
                }
            }
        }
    };
    function _bj(panel, _aq) {
        if (_aq.link && _aq.linktext) {
            var a = $("<a/>").css({
                'margin': '0px 20px'
            }).attr("href", _aq.link).text(_aq.linktext);
            panel.prev().find("div.panel-tool").prepend(a);
        }
    };
    $.fn.portal = function(options, param) {
        if (typeof options == 'string') {
            return $.fn.portal.methods[options](this, param);
        }
        options = options || {};
        return this.each(function() {
            var state = $.data(this, 'portal');
            if (state) {
                $.extend(state.options, options);
            } else {
                state = $.data(this, 'portal', {
                    options: $.extend({},
                    $.fn.portal.defaults, $.fn.portal.parseOptions(this), options),
                    _ab: init(this)
                });
            }
            if (state.options.border) {
                $(this).removeClass('portal-noborder');
            } else {
                $(this).addClass('portal-noborder');
            }
            setSize(this);
        });
    };
    $.fn.portal.methods = {
        options: function(jq) {
            return $.data(jq[0], 'portal').options;
        },
        resize: function(jq, param) {
            return jq.each(function() {
                if (param) {
                    var _aq = $.data(this, 'portal').options;
                    if (param.width) _aq.width = param.width;
                    if (param.height) _aq.height = param.height;
                }
                setSize(this);
            });
        },
        getColumNum: function(jq) {
            return jq.find('div.portal-column').size();
        },
        getPanels: function(jq, _aI) {
            var c = jq;
            if (_aI >= 0) {
                c = jq.find('div.portal-column:eq(' + _aI + ')');
            }
            var panels = [];
            c.find('div.portal-p').each(function() {
                panels.push($(this));
            });
            return panels;
        },
        addPanels: function(jq, panels) {
            var _aM = {};
            function getUrl(url) {
                _bD = '';
                try {
                    _bD = _application_root;
                } catch(e) {}
                if (url.indexOf("http://") == 0) {} else if (url.indexOf("/") == 0) {
                    url = _bD + url;
                } else {
                    url = _bD + "/" + url;
                }
                return url;
            };
            var _bw = jq.portal('getColumNum');
            var cn = _bw <= 0 ? 999999 : _bw;
            for (var i = 0; i < panels.length; i++) {
                panels[i].collapsible = panels[i].collapsible != false;
                var content = null;
                if (panels[i].url) {
                    content = '<iframe scrolling="yes" frameborder="0" src="' + getUrl(panels[i].url) + '" src1="" style="width:100%;height:100%;padding:0px;margin:0px" ></iframe>';
                } else {
                    content = panels[i].content || '&nbsp;';
                    if (panels[i].href) {
                        panels[i].href = getUrl(panels[i].href);
                    }
                }
                panels[i].content = content;
                panels[i]._aI = isNumber("" + panels[i]._aI) ? panels[i]._aI: i % cn;
                panels[i].rowIndex = isNumber("" + panels[i].rowIndex) ? panels[i].rowIndex: i;
                _aM["" + panels[i].id] = panels[i];
            }
            var _aq = $.data(jq[0], 'portal').options;
            var state = _aq.cookied ? jq.portal('getState') : null;
            if (state) {
                var columns = state.split(':');
                for (var _aI = 0; _aI < columns.length; _aI++) {
                    var cc = columns[_aI].split(',');
                    for (var j = 0; j < cc.length; j++) {
                        var options = _aM[cc[j]];
                        if (options) {
                            options._aI = _aI > _bw - 1 ? _bw - 1 : _aI;
                            options.rowIndex = j;
                        }
                    }
                }
            }
            function _E(x, y) {
                if (x.rowIndex > y.rowIndex) return 1;
                if (x.rowIndex < y.rowIndex) return - 1;
                return 0;
            };
            panels.sort(_E);
            for (var i = 0; i < panels.length; i++) {
                var options = panels[i];
                var p = $('<div/>').attr('id', options.id).appendTo('body');
                p.panel(options);
                jq.portal('add', {
                    panel: p,
                    _aI: options._aI
                });
            }
            jq.portal('resize');
        },
        add: function(jq, param) {
            return jq.each(function() {
                var c = $(this).find('div.portal-column:eq(' + param._aI + ')');
                var p = param.panel.addClass('portal-p');
                p.panel('panel').addClass('portal-panel').appendTo(c);
                _aG(this, p);
                p.panel('resize', {
                    width: c.width()
                });
            });
        },
        getState: function(jq) {
            var _aq = $.data(jq[0], "portal").options;
            var _ag = document.cookie.split(';');
            if (!_ag.length) return '';
            for (var i = 0; i < _ag.length; i++) {
                var _bv = _ag[i].split('=');
                if ($.trim(_bv[0]) == 'portal-state-' + _current_user) {
                    return $.trim(_bv[1]);
                }
            }
            return '';
        },
        remove: function(jq, panel) {
            return jq.each(function() {
                var panels = $(this).portal('getPanels');
                for (var i = 0; i < panels.length; i++) {
                    var p = panels[i];
                    if (p[0] == $(panel)[0]) {
                        p.panel('destroy');
                    }
                }
            });
        },
        disableDragging: function(jq, panel) {
            panel.panel('panel').draggable('disable');
            return jq;
        },
        enableDragging: function(jq, panel) {
            panel.panel('panel').draggable('enable');
            return jq;
        },
        addToolbar: function(jq, param) {
            var id = param[0];
            var text = param[1];
            var link = param[2];
            var a = $("<a/>").css({
                'margin': '0px 20px'
            }).attr("href", link).text(text);
            jq.find("div[id='" + id + "']").prev().find("div.panel-tool").prepend(a);
        }
    };
    $.fn.portal.parseOptions = function(target) {
        var t = $(target);
        return {
            width: (parseInt(target.style.width) || undefined),
            height: (parseInt(target.style.height) || undefined),
            border: (t.attr('border') ? t.attr('border') == 'true': undefined),
            fit: (t.attr('fit') ? t.attr('fit') == 'true': undefined),
            cookied: (t.attr('cookied') ? t.attr('cookied') == 'true': undefined)
        };
    };
    $.fn.portal.defaults = {
        width: 'auto',
        height: 'auto',
        border: true,
        fit: false,
        cookied: false,
        onResize: function(width, height) {},
        onStateChange: function() {}
    };
})(jQuery); (function(window, document, $) {
    var _aj = 'placeholder' in document.createElement('input'),
    _bk = 'placeholder' in document.createElement('textarea'),
    prototype = $.fn,
    valHooks = $.valHooks,
    hooks,
    placeholder;
    if (_aj && _bk) {
        placeholder = prototype.placeholder = function() {
            return this;
        };
        placeholder.input = placeholder.textarea = true;
    } else {
        placeholder = prototype.placeholder = function() {
            var _aD = this;
            _aD.filter((_aj ? 'textarea': ':input') + '[placeholder]').not('.placeholder').bind({
                'focus.placeholder': _S,
                'blur.placeholder': _aN
            }).data('placeholder-enabled', true).trigger('blur.placeholder');
            return _aD;
        };
        placeholder.input = _aj;
        placeholder.textarea = _bk;
        hooks = {
            'get': function(_bq) {
                var _bm = $(_bq);
                return _bm.data('placeholder-enabled') && _bm.hasClass('placeholder') ? '': _bq.value;
            },
            'set': function(_bq, value) {
                var _bm = $(_bq);
                if (!_bm.data('placeholder-enabled')) {
                    return _bq.value = value;
                }
                if (value == '') {
                    _bq.value = value;
                    if (_bq != document.activeElement) {
                        _aN.call(_bq);
                    }
                } else if (_bm.hasClass('placeholder')) {
                    _S.call(_bq, true, value) || (_bq.value = value);
                } else {
                    _bq.value = value;
                }
                return _bm;
            }
        };
        _aj || (valHooks.input = hooks);
        _bk || (valHooks.textarea = hooks);
        $(function() {
            $(document).delegate('form', 'submit.placeholder',
            function() {
                var _aL = $('.placeholder', this).each(_S);
                setTimeout(function() {
                    _aL.each(_aN);
                },
                10);
            });
        });
        $(window).bind('beforeunload.placeholder',
        function() {
            $('.placeholder').each(function() {
                this.value = '';
            });
        });
    }
    function _v(_bS) {
        var _bV = {},
        _aw = /^jQuery\d+$/;
        $.each(_bS.attributes,
        function(i, attr) {
            if (attr.specified && !_aw.test(attr.name)) {
                _bV[attr.name] = attr.value;
            }
        });
        return _bV;
    };
    function _S(event, value) {
        var input = this,
        _a = $(input);
        if (input.value == _a.attr('placeholder') && _a.hasClass('placeholder')) {
            if (_a.data('placeholder-password')) {
                _a = _a.hide().next().show().attr('id', _a.removeAttr('id').data('placeholder-id'));
                if (event === true) {
                    return _a[0].value = value;
                }
                _a.focus();
            } else {
                input.value = '';
                _a.removeClass('placeholder');
                input == document.activeElement && input.select();
            }
        }
    };
    function _aN() {
        var _ad, input = this,
        _a = $(input),
        _bU = _a,
        id = this.id;
        if (input.value == '') {
            if (input.type == 'password') {
                if (!_a.data('placeholder-textinput')) {
                    try {
                        _ad = _a.clone().attr({
                            'type': 'text'
                        });
                    } catch(e) {
                        _ad = $('<input>').attr($.extend(_v(this), {
                            'type': 'text'
                        }));
                    }
                    _ad.removeAttr('name').data({
                        'placeholder-password': true,
                        'placeholder-id': id
                    }).bind('focus.placeholder', _S);
                    _a.data({
                        'placeholder-textinput': _ad,
                        'placeholder-id': id
                    }).before(_ad);
                }
                _a = _a.removeAttr('id').hide().prev().attr('id', id).show();
            }
            _a.addClass('placeholder');
            _a[0].value = _a.attr('placeholder');
        } else {
            _a.removeClass('placeholder');
        }
    }
} (this, document, jQuery));
function AccordionMenu(target) {
    var _bK = $(target);
    var _F = _bK.attr("selectedId");
    var _asyc = _bK.attr("aysc") == "true";
    var _au = null;
    var _an = null;
    var defaults = {
        loadtype: 1,
        viewField: "_text"
    };
    function _Y() {
        $.extend(defaults, {
            datasetName: _bK.attr("componentdataset"),
            contextmenu: _bK.attr("contextmenu")
        });
    };
    function _x() {
        _bK.accordion({
            onSelect: function(title, index, _id) {
                if (_asyc) {}
            }
        });
        _Y();
        var _aq = defaults;
        var datasetName = _aq.datasetName;
        _au = getDatasetByID(datasetName);
        _au.init = false;
        var contextmenu = _aq.contextmenu;
        _an = copyDataset(datasetName + new Date().getTime(), datasetName);
        _an.flushData(1);
        var json = treedataset2json(_an, _aq);
        _load(json);
    };
    _x();
    function _d(obj) {
        var _p = _bK.accordion("add", {
            title: obj.text,
            id: obj.id,
            selected: _F == obj.id,
            iconCls: obj.iconCls
        });
        if (obj.children.length > 0) {
            _addtree(_p, obj.children);
        }
    };
    function _addtree(jq, arr) {
        var panels = $.data(jq[0], "accordion").panels;
        $("<ul/>").tree({
            data: arr,
            onClick: function(node) {
                fireUserEvent(_bK.attr("id") + "_onClick", [node.attributes.record, node]);
            }
        }).appendTo(panels[panels.length - 1]);
    };
    function _load(json) {
        var _j = json;
        if ($.type(_j) == "string") {
            _j = eval("(" + json + ")");
        }
        if ($.type(_j) == "array") {
            for (var i = 0; i < _j.length; i++) {
                _d(_j[i]);
            }
        }
    }
}