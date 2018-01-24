;
(function (a, b) {
  var c = typeof define === "function",
    d = typeof module !== "undefined" && module.exports;
  if (c) {
    define(b)
  } else {
    if (d) {
      module.exports = b()
    } else {
      this[a] = b()
    }
  }
})("MeScroll", function () {
  var a = function (b, e) {
    var g = this;
    g.version = "1.3.2";
    g.isScrollBody = (!b || b == "body");
    g.scrollDom = g.isScrollBody ? document.body : g.getDomById(b);
    if (!g.scrollDom) {
      return
    }
    g.options = e || {};
    var d = navigator.userAgent;
    var c = !!d.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    var h = typeof window.orientation == "undefined";
    var f = d.indexOf("Android") > -1 || d.indexOf("Adr") > -1;
    g.os = {
      ios: c,
      pc: h,
      android: f
    };
    g.isDownScrolling = false;
    g.isUpScrolling = false;
    g.initDownScroll();
    g.initUpScroll();
    setTimeout(function () {
      if (g.optDown.use && g.optDown.auto) {
        if (g.optDown.autoShowLoading) {
          g.triggerDownScroll()
        } else {
          g.optDown.callback && g.optDown.callback(g)
        }
      }
      g.optUp.use && g.optUp.auto && !g.isUpAutoLoad && g.triggerUpScroll()
    }, 30)
  };
  a.prototype.extendDownScroll = function (b) {
    a.extend(b, {
      use: true,
      auto: true,
      autoShowLoading: false,
      isLock: false,
      isBoth: false,
      offset: 80,
      outOffsetRate: 0.2,
      bottomOffset: 20,
      minAngle: 45,
      hardwareClass: "mescroll-hardware",
      warpId: null,
      warpClass: "mescroll-downwarp",
      resetClass: "mescroll-downwarp-reset",
      htmlContent: '<p class="downwarp-progress"></p><p class="downwarp-tip">下拉刷新 </p>',
      inited: function (d, c) {
        d.downTipDom = c.getElementsByClassName("downwarp-tip")[0];
        d.downProgressDom = c.getElementsByClassName("downwarp-progress")[0]
      },
      inOffset: function (c) {
        if (c.downTipDom) {
          c.downTipDom.innerHTML = "下拉刷新"
        }
        if (c.downProgressDom) {
          c.downProgressDom.classList.remove("mescroll-rotate")
        }
      },
      outOffset: function (c) {
        if (c.downTipDom) {
          c.downTipDom.innerHTML = "释放更新"
        }
      },
      onMoving: function (d, f, c) {
        if (d.downProgressDom) {
          var e = 360 * f;
          d.downProgressDom.style.webkitTransform = "rotate(" + e + "deg)";
          d.downProgressDom.style.transform = "rotate(" + e + "deg)"
        }
      },
      beforeLoading: function (d, c) {
        return false
      },
      showLoading: function (c) {
        if (c.downTipDom) {
          c.downTipDom.innerHTML = "加载中 ..."
        }
        if (c.downProgressDom) {
          c.downProgressDom.classList.add("mescroll-rotate")
        }
      },
      callback: function (c) {
        c.resetUpScroll()
      }
    })
  };
  a.prototype.extendUpScroll = function (b) {
    var c = this.os.pc;
    a.extend(b, {
      use: true,
      auto: true,
      isLock: false,
      isBoth: false,
      isBounce: true,
      callback: null,
      page: {
        num: 0,
        size: 10,
        time: null
      },
      noMoreSize: 5,
      offset: 100,
      toTop: {
        warpId: null,
        src: null,
        html: null,
        offset: 1000,
        warpClass: "mescroll-totop",
        showClass: "mescroll-fade-in",
        hideClass: "mescroll-fade-out",
        duration: 300,
        supportTap: false
      },
      loadFull: {
        use: false,
        delay: 500
      },
      empty: {
        warpId: null,
        icon: null,
        tip: "暂无相关数据~",
        btntext: "",
        btnClick: null,
        supportTap: false
      },
      clearId: null,
      clearEmptyId: null,
      hardwareClass: "mescroll-hardware",
      warpId: null,
      warpClass: "mescroll-upwarp",
      htmlLoading: '<p class="upwarp-progress mescroll-rotate"></p><p class="upwarp-tip">加载中..</p>',
      htmlNodata: '<p class="upwarp-nodata">-- END --</p>',
      inited: function (d, e) {},
      showLoading: function (d, e) {
        e.innerHTML = d.optUp.htmlLoading
      },
      showNoMore: function (d, e) {
        e.innerHTML = d.optUp.htmlNodata
      },
      onScroll: null,
      scrollbar: {
        use: c,
        barClass: "mescroll-bar"
      }
    })
  };
  a.extend = function (c, b) {
    if (!c) {
      return b
    }
    for (var key in b) {
      if (c[key] == null) {
        c[key] = b[key]
      } else {
        if (typeof c[key] == "object") {
          a.extend(c[key], b[key])
        }
      }
    }
    return c
  };
  a.prototype.initDownScroll = function () {
    var c = this;
    c.optDown = c.options.down || {};
    c.extendDownScroll(c.optDown);
    c.touchstartEvent = function (d) {
      if (c.isScrollTo) {
        d.preventDefault()
      }
      c.startPoint = c.getPoint(d);
      c.lastPoint = c.startPoint;
      c.maxTouchmoveY = c.getBodyHeight() - c.optDown.bottomOffset;
      c.inTouchend = false;
      if (c.os.pc && c.getScrollTop() <= 0) {
        c.scrollDom.addEventListener("mousemove", c.touchmoveEvent);
        document.ondragstart = function () {
          return false
        }
      }
    };
    c.scrollDom.addEventListener("mousedown", c.touchstartEvent);
    c.scrollDom.addEventListener("touchstart", c.touchstartEvent);
    c.touchmoveEvent = function (l) {
      var d = c.getScrollTop();
      var h = c.getPoint(l);
      var f = h.y - c.startPoint.y;
      if (f > 0) {
        if (d <= 0) {
          if (l.cancelable && !l.defaultPrevented) {
            l.preventDefault()
          }
          if (c.optDown.use && !c.inTouchend && !c.isDownScrolling && !c.optDown.isLock && (!c.isUpScrolling || (c.isUpScrolling && c.optUp.isBoth))) {
            var o = Math.abs(c.lastPoint.x - h.x);
            var n = Math.abs(c.lastPoint.y - h.y);
            var m = Math.sqrt(o * o + n * n);
            if (m != 0) {
              var g = Math.asin(n / m) / Math.PI * 180;
              if (g < c.optDown.minAngle) {
                return
              }
            }
            if (c.maxTouchmoveY > 0 && h.y >= c.maxTouchmoveY) {
              c.inTouchend = true;
              c.touchendEvent();
              return
            }
            var p = h.y - c.lastPoint.y;
            if (!c.downHight) {
              c.downHight = 0
            }
            if (c.downHight < c.optDown.offset) {
              if (c.movetype != 1) {
                c.movetype = 1;
                c.optDown.inOffset(c);
                c.downwarp.classList.remove(c.optDown.resetClass);
                c.scrollDom.classList.add(c.optDown.hardwareClass);
                c.scrollDom.style.webkitOverflowScrolling = "auto";
                c.isMoveDown = true
              }
              c.downHight += p
            } else {
              if (c.movetype != 2) {
                c.movetype = 2;
                c.optDown.outOffset(c);
                c.downwarp.classList.remove(c.optDown.resetClass);
                c.scrollDom.classList.add(c.optDown.hardwareClass);
                c.scrollDom.style.webkitOverflowScrolling = "auto";
                c.isMoveDown = true
              }
              if (p > 0) {
                c.downHight += p * c.optDown.outOffsetRate
              } else {
                c.downHight += p
              }
            }
            c.downwarp.style.height = c.downHight + "px";
            var k = c.downHight / c.optDown.offset;
            c.optDown.onMoving(c, k, c.downHight)
          }
        }
      } else {
        if (f < 0) {
          var q = c.getScrollHeight();
          var j = c.getClientHeight();
          var i = q - j - d;
          if (!c.optUp.isBounce && l.cancelable && !l.defaultPrevented && i <= 0) {
            l.preventDefault()
          }
          if (c.optUp.use && !c.optUp.isLock && c.optUp.hasNext && !c.isUpScrolling && (!c.isDownScrolling || (c.isDownScrolling && c.optDown.isBoth)) && (j + c.optUp.offset >= q || i <= 0)) {
            c.triggerUpScroll()
          }
        }
      }
      c.lastPoint = h
    };
    c.scrollDom.addEventListener("touchmove", c.touchmoveEvent);
    c.touchendEvent = function () {
      if (c.optDown.use && c.isMoveDown) {
        if (c.downHight >= c.optDown.offset) {
          c.triggerDownScroll()
        } else {
          c.downwarp.classList.add(c.optDown.resetClass);
          c.downHight = 0;
          c.downwarp.style.height = 0
        }
        c.scrollDom.style.webkitOverflowScrolling = "touch";
        c.scrollDom.classList.remove(c.optDown.hardwareClass);
        c.movetype = 0;
        c.isMoveDown = false
      }
      if (c.os.pc) {
        c.scrollDom.removeEventListener("mousemove", c.touchmoveEvent);
        document.ondragstart = function () {
          return true
        }
      }
    };
    c.scrollDom.addEventListener("mouseup", c.touchendEvent);
    c.scrollDom.addEventListener("mouseleave", c.touchendEvent);
    c.scrollDom.addEventListener("touchend", c.touchendEvent);
    c.scrollDom.addEventListener("touchcancel", c.touchendEvent);
    if (c.optDown.use) {
      c.downwarp = document.createElement("div");
      c.downwarp.className = c.optDown.warpClass;
      c.downwarp.innerHTML = '<div class="downwarp-content">' + c.optDown.htmlContent + "</div>";
      var b = c.optDown.warpId ? c.getDomById(c.optDown.warpId) : c.scrollDom;
      if (c.optDown.warpId && b) {
        b.appendChild(c.downwarp)
      } else {
        if (!b) {
          b = c.scrollDom
        }
        b.insertBefore(c.downwarp, c.scrollDom.firstChild)
      }
      setTimeout(function () {
        c.optDown.inited(c, c.downwarp)
      }, 0)
    }
  };
  a.prototype.getPoint = function (b) {
    return {
      x: b.touches ? b.touches[0].pageX : b.clientX,
      y: b.touches ? b.touches[0].pageY : b.clientY
    }
  };
  a.prototype.triggerDownScroll = function () {
    if (!this.optDown.beforeLoading(this, this.downwarp)) {
      this.showDownScroll();
      this.optDown.callback && this.optDown.callback(this)
    }
  };
  a.prototype.showDownScroll = function () {
    this.isDownScrolling = true;
    this.optDown.showLoading(this);
    this.downHight = this.optDown.offset;
    this.downwarp.classList.add(this.optDown.resetClass);
    this.downwarp.style.height = this.optDown.offset + "px"
  };
  a.prototype.endDownScroll = function () {
    this.downHight = 0;
    this.downwarp.style.height = 0;
    this.isDownScrolling = false;
    if (this.downProgressDom) {
      this.downProgressDom.classList.remove("mescroll-rotate")
    }
  };
  a.prototype.lockDownScroll = function (b) {
    if (b == null) {
      b = true
    }
    this.optDown.isLock = b
  };
  a.prototype.initUpScroll = function () {
    var c = this;
    c.optUp = c.options.up || {
      use: false
    };
    c.extendUpScroll(c.optUp);
    if (c.optUp.scrollbar.use) {
      c.scrollDom.classList.add(c.optUp.scrollbar.barClass)
    }
    if (!c.optUp.isBounce) {
      c.setBounce(false)
    }
    if (c.optUp.use == false) {
      return
    }
    c.optUp.hasNext = true;
    c.upwarp = document.createElement("div");
    c.upwarp.className = c.optUp.warpClass;
    var b;
    if (c.optUp.warpId) {
      b = c.getDomById(c.optUp.warpId)
    }
    if (!b) {
      b = c.scrollDom
    }
    b.appendChild(c.upwarp);
    c.preScrollY = 0;
    c.scrollEvent = function () {
      var f = c.getScrollTop();
      var e = f - c.preScrollY > 0;
      c.preScrollY = f;
      if (!c.isUpScrolling && (!c.isDownScrolling || (c.isDownScrolling && c.optDown.isBoth))) {
        if (!c.optUp.isLock && c.optUp.hasNext) {
          var d = c.getScrollHeight() - c.getClientHeight() - f;
          if (d <= c.optUp.offset && e) {
            c.triggerUpScroll()
          }
        }
        var g = c.optUp.toTop;
        if (g.src || g.html) {
          if (f >= g.offset) {
            c.showTopBtn()
          } else {
            c.hideTopBtn()
          }
        }
      }
      c.optUp.onScroll && c.optUp.onScroll(c, f, e)
    };
    if (c.isScrollBody) {
      window.addEventListener("scroll", c.scrollEvent)
    } else {
      c.scrollDom.addEventListener("scroll", c.scrollEvent)
    }
    setTimeout(function () {
      c.optUp.inited(c, c.upwarp)
    }, 0)
  };
  a.prototype.setBounce = function (b) {
    if (this.isScrollBody || !this.os.ios) {
      return
    }
    if (b == false) {
      this.optUp.isBounce = false;
      window.addEventListener("touchmove", this.bounceTouchmove)
    } else {
      this.optUp.isBounce = true;
      window.removeEventListener("touchmove", this.bounceTouchmove)
    }
  };
  a.prototype.bounceTouchmove = function (h) {
    var j = this;
    var d = h.target;
    var f = true;
    while (d !== document.body && d !== document) {
      var m = d.classList;
      if (m) {
        if (m.contains("mescroll") || m.contains("mescroll-touch")) {
          f = false;
          break
        } else {
          if (m.contains("mescroll-touch-x") || m.contains("mescroll-touch-y")) {
            var c = h.touches ? h.touches[0].pageX : h.clientX;
            var b = h.touches ? h.touches[0].pageY : h.clientY;
            if (!j.preWinX) {
              j.preWinX = c
            }
            if (!j.preWinY) {
              j.preWinY = b
            }
            var l = Math.abs(j.preWinX - c);
            var k = Math.abs(j.preWinY - b);
            var i = Math.sqrt(l * l + k * k);
            j.preWinX = c;
            j.preWinY = b;
            if (i != 0) {
              var g = Math.asin(k / i) / Math.PI * 180;
              if ((g <= 45 && m.contains("mescroll-touch-x")) || (g > 45 && m.contains("mescroll-touch-y"))) {
                f = false;
                break
              }
            }
          }
        }
      }
      d = d.parentNode
    }
    if (f && h.cancelable && !h.defaultPrevented) {
      h.preventDefault()
    }
  };
  a.prototype.triggerUpScroll = function () {
    if (!this.isUpScrolling) {
      this.showUpScroll();
      this.optUp.page.num++;
      this.isUpAutoLoad = true;
      this.optUp.callback && this.optUp.callback(this.optUp.page, this)
    }
  };
  a.prototype.showUpScroll = function () {
    this.isUpScrolling = true;
    this.upwarp.classList.add(this.optUp.hardwareClass);
    this.upwarp.style.visibility = "visible";
    this.optUp.showLoading(this, this.upwarp)
  };
  a.prototype.showNoMore = function () {
    this.upwarp.style.visibility = "visible";
    this.optUp.hasNext = false;
    this.optUp.showNoMore(this, this.upwarp)
  };
  a.prototype.hideUpScroll = function () {
    this.upwarp.style.visibility = "hidden";
    this.upwarp.classList.remove(this.optUp.hardwareClass);
    var b = this.upwarp.getElementsByClassName("upwarp-progress")[0];
    if (b) {
      b.classList.remove("mescroll-rotate")
    }
  };
  a.prototype.endUpScroll = function (b) {
    if (b != null) {
      if (b) {
        this.showNoMore()
      } else {
        this.hideUpScroll()
      }
    }
    this.isUpScrolling = false
  };
  a.prototype.resetUpScroll = function (c) {
    if (this.optUp && this.optUp.use) {
      var b = this.optUp.page;
      this.prePageNum = b.num;
      this.prePageTime = b.time;
      b.num = 1;
      b.time = null;
      if (!this.isDownScrolling && c != false) {
        if (c == null) {
          this.removeEmpty();
          this.clearDataList();
          this.showUpScroll()
        } else {
          this.showDownScroll()
        }
      }
      this.isUpAutoLoad = true;
      this.optUp.callback && this.optUp.callback(b, this)
    }
  };
  a.prototype.setPageNum = function (b) {
    this.optUp.page.num = b - 1
  };
  a.prototype.setPageSize = function (b) {
    this.optUp.page.size = b
  };
  a.prototype.clearDataList = function () {
    var c = this.optUp.clearId || this.optUp.clearEmptyId;
    if (c) {
      var b = this.getDomById(c);
      if (b) {
        b.innerHTML = ""
      }
    }
  };
  a.prototype.endByPage = function (c, e, d) {
    var b;
    if (this.optUp.use && e != null) {
      b = this.optUp.page.num < e
    }
    this.endSuccess(c, b, d)
  };
  a.prototype.endBySize = function (d, c, e) {
    var b;
    if (this.optUp.use && c != null) {
      var f = (this.optUp.page.num - 1) * this.optUp.page.size + d;
      b = f < c
    }
    this.endSuccess(d, b, e)
  };
  a.prototype.endSuccess = function (d, b, f) {
    if (this.isDownScrolling) {
      this.endDownScroll()
    }
    if (this.optUp.use) {
      var e;
      if (d != null) {
        var g = this.optUp.page.num;
        var c = this.optUp.page.size;
        if (g == 1) {
          this.clearDataList();
          if (f) {
            this.optUp.page.time = f
          }
        }
        if (d < c || b == false) {
          this.optUp.hasNext = false;
          if (d == 0 && g == 1) {
            e = false;
            this.showEmpty()
          } else {
            var h = (g - 1) * c + d;
            if (h < this.optUp.noMoreSize) {
              e = false
            } else {
              e = true
            }
            this.removeEmpty()
          }
        } else {
          e = false;
          this.optUp.hasNext = true;
          this.removeEmpty()
        }
      }
      this.endUpScroll(e);
      this.loadFull()
    }
  };
  a.prototype.endErr = function () {
    if (this.isDownScrolling) {
      var b = this.optUp.page;
      if (b && this.prePageNum) {
        b.num = this.prePageNum;
        b.time = this.prePageTime
      }
      this.endDownScroll()
    }
    if (this.isUpScrolling) {
      this.optUp.page.num--;
      this.endUpScroll(false)
    }
  };
  a.prototype.loadFull = function () {
    var b = this;
    if (b.optUp.loadFull.use && !b.optUp.isLock && b.optUp.hasNext && b.getScrollHeight() <= b.getClientHeight()) {
      setTimeout(function () {
        if (b.getScrollHeight() <= b.getClientHeight()) {
          b.triggerUpScroll()
        }
      }, b.optUp.loadFull.delay)
    }
  };
  a.prototype.lockUpScroll = function (b) {
    if (b == null) {
      b = true
    }
    this.optUp.isLock = b
  };
  a.prototype.showEmpty = function () {
    var c = this;
    var d = c.optUp.empty;
    var b = d.warpId || c.optUp.clearEmptyId;
    if (b == null) {
      return
    }
    var g = c.getDomById(b);
    if (g) {
      c.removeEmpty();
      var f = "";
      if (d.icon) {
        f += '<img class="empty-icon" src="' + d.icon + '"/>'
      }
      if (d.tip) {
        f += '<p class="empty-tip">' + d.tip + "</p>"
      }
      if (d.btntext) {
        f += '<p class="empty-btn">' + d.btntext + "</p>"
      }
      c.emptyDom = document.createElement("div");
      c.emptyDom.className = "mescroll-empty";
      c.emptyDom.innerHTML = f;
      g.appendChild(c.emptyDom);
      if (d.btnClick) {
        var e = c.emptyDom.getElementsByClassName("empty-btn")[0];
        if (d.supportTap) {
          e.addEventListener("tap", function (h) {
            h.stopPropagation();
            h.preventDefault();
            d.btnClick()
          })
        } else {
          e.onclick = function () {
            d.btnClick()
          }
        }
      }
    }
  };
  a.prototype.removeEmpty = function () {
    this.removeChild(this.emptyDom)
  };
  a.prototype.showTopBtn = function () {
    if (!this.topBtnShow) {
      this.topBtnShow = true;
      var c = this;
      var d = c.optUp.toTop;
      if (c.toTopBtn == null) {
        if (d.html) {
          c.toTopBtn = document.createElement("div");
          c.toTopBtn.innerHTML = d.html
        } else {
          c.toTopBtn = document.createElement("img");
          c.toTopBtn.src = d.src
        }
        c.toTopBtn.className = d.warpClass;
        if (d.supportTap) {
          c.toTopBtn.addEventListener("tap", function (f) {
            f.stopPropagation();
            f.preventDefault();
            c.scrollTo(0, c.optUp.toTop.duration)
          })
        } else {
          c.toTopBtn.onclick = function () {
            c.scrollTo(0, c.optUp.toTop.duration)
          }
        }
        var b;
        if (d.warpId) {
          b = c.getDomById(d.warpId)
        }
        if (!b) {
          b = document.body
        }
        b.appendChild(c.toTopBtn)
      }
      c.toTopBtn.classList.remove(d.hideClass);
      c.toTopBtn.classList.add(d.showClass)
    }
  };
  a.prototype.hideTopBtn = function () {
    if (this.topBtnShow && this.toTopBtn) {
      this.topBtnShow = false;
      this.toTopBtn.classList.remove(this.optUp.toTop.showClass);
      this.toTopBtn.classList.add(this.optUp.toTop.hideClass)
    }
  };
  a.prototype.scrollTo = function (g, c) {
    var d = this;
    var f = d.getScrollTop();
    var b = g;
    if (b > 0) {
      var e = d.getScrollHeight() - d.getClientHeight();
      if (b > e) {
        b = e
      }
    } else {
      b = 0
    }
    d.isScrollTo = true;
    d.getStep(f, b, function (h) {
      d.setScrollTop(h);
      if (h == b) {
        d.isScrollTo = false
      }
    }, c)
  };
  a.prototype.getStep = function (f, d, k, l, h) {
    var j = d - f;
    if (l == 0 || j == 0) {
      k && k(d);
      return
    }
    l = l || 300;
    h = h || 30;
    var g = l / h;
    var c = j / g;
    var e = 0;
    var b = window.setInterval(function () {
      if (e < g - 1) {
        f += c;
        k && k(f, b);
        e++
      } else {
        k && k(d, b);
        window.clearInterval(b)
      }
    }, h)
  };
  a.prototype.getScrollHeight = function () {
    return this.scrollDom.scrollHeight
  };
  a.prototype.getClientHeight = function () {
    if (this.isScrollBody && document.compatMode == "CSS1Compat") {
      return document.documentElement.clientHeight
    } else {
      return this.scrollDom.clientHeight
    }
  };
  a.prototype.getBodyHeight = function () {
    return document.body.clientHeight || document.documentElement.clientHeight
  };
  a.prototype.getScrollTop = function () {
    if (this.isScrollBody) {
      return document.documentElement.scrollTop || document.body.scrollTop
    } else {
      return this.scrollDom.scrollTop
    }
  };
  a.prototype.getToBottom = function () {
    return this.getScrollHeight() - this.getClientHeight() - this.getScrollTop()
  };
  a.prototype.setScrollTop = function (b) {
    if (this.isScrollBody) {
      document.documentElement.scrollTop = b;
      document.body.scrollTop = b
    } else {
      this.scrollDom.scrollTop = b
    }
  };
  a.prototype.getDomById = function (c) {
    var b;
    if (c) {
      b = document.getElementById(c)
    }
    if (!b) {
      console.error('the element with id as "' + c + '" can not be found: document.getElementById("' + c + '")==null')
    }
    return b
  };
  a.prototype.removeChild = function (c) {
    if (c) {
      var b = c.parentNode;
      b && b.removeChild(c);
      c = null
    }
  };
  a.prototype.destroy = function () {
    var b = this;
    b.scrollDom.removeEventListener("touchstart", b.touchstartEvent);
    b.scrollDom.removeEventListener("touchmove", b.touchmoveEvent);
    b.scrollDom.removeEventListener("touchend", b.touchendEvent);
    b.scrollDom.removeEventListener("touchcancel", b.touchendEvent);
    b.scrollDom.removeEventListener("mousedown", b.touchstartEvent);
    b.scrollDom.removeEventListener("mousemove", b.touchmoveEvent);
    b.scrollDom.removeEventListener("mouseup", b.touchendEvent);
    b.scrollDom.removeEventListener("mouseleave", b.touchendEvent);
    b.removeChild(b.downwarp);
    if (b.isScrollBody) {
      window.removeEventListener("scroll", b.scrollEvent)
    } else {
      b.scrollDom.removeEventListener("scroll", b.scrollEvent)
    }
    b.removeChild(b.upwarp);
    b.removeChild(b.toTopBtn);
    b.setBounce(true)
  };
  return a
});
