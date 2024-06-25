"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const _sfc_main = {
  name: "uv-pick-color",
  emits: ["confirm", "cancel", "close", "change"],
  mixins: [common_vendor.mpMixin, common_vendor.mixin, common_vendor.props],
  computed: {
    pointerStyle() {
      const style = {};
      style.top = this.$uv.addUnit(this.site[0].top - 8);
      style.left = this.$uv.addUnit(this.site[0].left - 8);
      return style;
    }
  },
  data() {
    return {
      showToolbar: false,
      // rgba 颜色
      rgba: {
        r: 0,
        g: 0,
        b: 0,
        a: 1
      },
      // hsb 颜色
      hsb: {
        h: 0,
        s: 0,
        b: 0
      },
      site: [{
        top: 0,
        left: 0
      }, {
        left: 0
      }, {
        left: 0
      }],
      index: 0,
      bgcolor: {
        r: 255,
        g: 0,
        b: 0,
        a: 1
      },
      hex: "#000000",
      mode: true,
      colorList: common_vendor.colorList
    };
  },
  watch: {
    prefabColor(newVal) {
      this.colorList = newVal;
    }
  },
  created() {
    this.rgba = this.color;
    if (this.prefabColor.length)
      this.colorList = this.prefabColor;
  },
  methods: {
    open() {
      this.$refs.pickerColorPopup.open();
      this.showToolbar = true;
      this.$nextTick(async () => {
        await this.$uv.sleep(350);
        this.getSelectorQuery();
      });
    },
    close() {
      this.$refs.pickerColorPopup.close();
    },
    popupChange(e) {
      if (!e.show)
        this.$emit("close");
    },
    // 点击工具栏的取消按钮
    cancelHandler() {
      this.$emit("cancel");
      this.close();
    },
    // 点击工具栏的确定按钮
    confirmHandler() {
      this.$emit("confirm", {
        rgba: this.rgba,
        hex: this.hex
      });
      this.close();
    },
    // 初始化
    init() {
      this.hsb = common_vendor.rgbToHsb(this.rgba);
      this.setValue(this.rgba);
    },
    async getSelectorQuery() {
      const data = await this.$uvGetRect(".drag-box", true);
      this.position = data;
      this.setColorBySelect(this.rgba);
    },
    // 选择模式
    select() {
      this.mode = !this.mode;
    },
    touchstart(e, index) {
      const { clientX, clientY } = e.touches[0];
      this.pageX = clientX;
      this.pageY = clientY;
      this.setPosition(clientX, clientY, index);
    },
    touchmove(e, index) {
      const { clientX, clientY } = e.touches[0];
      this.moveX = clientX;
      this.moveY = clientY;
      this.setPosition(clientX, clientY, index);
    },
    touchend(e, index) {
    },
    /**
     * 设置位置
     */
    setPosition(x, y, index) {
      this.index = index;
      const { top, left, width, height } = this.position[index];
      this.site[index].left = Math.max(0, Math.min(parseInt(x - left), width));
      if (index === 0) {
        this.site[index].top = Math.max(0, Math.min(parseInt(y - top), height));
        this.hsb.s = parseInt(100 * this.site[index].left / width);
        this.hsb.b = parseInt(100 - 100 * this.site[index].top / height);
        this.setColor();
        this.setValue(this.rgba);
      } else {
        this.setControl(index, this.site[index].left);
      }
    },
    /**
     * 设置 rgb 颜色
     */
    setColor() {
      const rgb = common_vendor.hsbToRgb(this.hsb);
      this.rgba.r = rgb.r;
      this.rgba.g = rgb.g;
      this.rgba.b = rgb.b;
    },
    /**
     * 设置二进制颜色
     * @param {Object} rgb
     */
    setValue(rgb) {
      this.hex = `#${common_vendor.rgbToHex(rgb)}`;
    },
    setControl(index, x) {
      const {
        top,
        left,
        width,
        height
      } = this.position[index];
      if (index === 1) {
        this.hsb.h = parseInt(360 * x / width);
        this.bgcolor = common_vendor.hsbToRgb({
          h: this.hsb.h,
          s: 100,
          b: 100
        });
        this.setColor();
      } else {
        this.rgba.a = +(x / width).toFixed(1);
      }
      this.setValue(this.rgba);
    },
    setColorBySelect(getrgb) {
      const { r, g, b, a } = getrgb;
      let rgb = {};
      rgb = {
        r: r ? parseInt(r) : 0,
        g: g ? parseInt(g) : 0,
        b: b ? parseInt(b) : 0,
        a: a ? a : 0
      };
      this.rgba = rgb;
      this.hsb = common_vendor.rgbToHsb(rgb);
      this.changeViewByHsb();
    },
    changeViewByHsb() {
      const [a, b, c] = this.position;
      this.site[0].left = parseInt(this.hsb.s * a.width / 100);
      this.site[0].top = parseInt((100 - this.hsb.b) * a.height / 100);
      this.setColor(this.hsb.h);
      this.setValue(this.rgba);
      this.bgcolor = common_vendor.hsbToRgb({
        h: this.hsb.h,
        s: 100,
        b: 100
      });
      this.site[1].left = this.hsb.h / 360 * b.width;
      this.site[2].left = this.rgba.a * c.width;
    }
  }
};
if (!Array) {
  const _easycom_uv_toolbar2 = common_vendor.resolveComponent("uv-toolbar");
  const _easycom_uv_popup2 = common_vendor.resolveComponent("uv-popup");
  (_easycom_uv_toolbar2 + _easycom_uv_popup2)();
}
const _easycom_uv_toolbar = () => "../uv-toolbar/uv-toolbar.js";
const _easycom_uv_popup = () => "../uv-popup/uv-popup.js";
if (!Math) {
  (_easycom_uv_toolbar + _easycom_uv_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o($options.cancelHandler),
    b: common_vendor.o($options.confirmHandler),
    c: common_vendor.p({
      show: $data.showToolbar,
      cancelColor: _ctx.cancelColor,
      confirmColor: _ctx.confirmColor,
      cancelText: _ctx.cancelText,
      confirmText: _ctx.confirmText,
      title: _ctx.title,
      ["show-border"]: true
    }),
    d: common_vendor.s($options.pointerStyle),
    e: common_vendor.o(($event) => $options.touchstart($event, 0)),
    f: common_vendor.o(($event) => $options.touchmove($event, 0)),
    g: common_vendor.o(($event) => $options.touchend($event, 0)),
    h: `rgb(${$data.bgcolor.r},${$data.bgcolor.g},${$data.bgcolor.b})`,
    i: `rgba(${$data.rgba.r},${$data.rgba.g},${$data.rgba.b},${$data.rgba.a})`,
    j: _ctx.$uv.getPx($data.site[1].left - 10, true),
    k: common_vendor.o(($event) => $options.touchstart($event, 1)),
    l: common_vendor.o(($event) => $options.touchmove($event, 1)),
    m: common_vendor.o(($event) => $options.touchend($event, 1)),
    n: _ctx.$uv.getPx($data.site[2].left - 10, true),
    o: common_vendor.o(($event) => $options.touchstart($event, 2)),
    p: common_vendor.o(($event) => $options.touchmove($event, 2)),
    q: common_vendor.o(($event) => $options.touchend($event, 2)),
    r: common_vendor.o((...args) => $options.select && $options.select(...args)),
    s: $data.mode
  }, $data.mode ? {
    t: common_vendor.t($data.hex)
  } : {
    v: common_vendor.t($data.rgba.r),
    w: common_vendor.t($data.rgba.g),
    x: common_vendor.t($data.rgba.b),
    y: common_vendor.t($data.rgba.a)
  }, {
    z: common_vendor.f($data.colorList, (item, index, i0) => {
      return {
        a: `rgba(${item.r},${item.g},${item.b},${item.a})`,
        b: common_vendor.o(($event) => $options.setColorBySelect(item)),
        c: index
      };
    }),
    A: common_vendor.sr("pickerColorPopup", "3caff093-0"),
    B: common_vendor.o($options.popupChange),
    C: common_vendor.p({
      mode: "bottom",
      ["close-on-click-overlay"]: _ctx.closeOnClickOverlay
    })
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-3caff093"], ["__file", "C:/Users/chasony/code/github-code/uniapp-drawing-board/node_modules/@climblee/uv-ui/components/uv-pick-color/uv-pick-color.vue"]]);
tt.createComponent(Component);
