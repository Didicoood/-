"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const _sfc_main = {
  name: "uv-overlay",
  emits: ["click"],
  mixins: [common_vendor.mpMixin, common_vendor.mixin, common_vendor.props$2],
  watch: {
    show(newVal) {
    }
  },
  computed: {
    overlayStyle() {
      const style = {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: this.zIndex,
        bottom: 0,
        "background-color": `rgba(0, 0, 0, ${this.opacity})`
      };
      return this.$uv.deepMerge(style, this.$uv.addStyle(this.customStyle));
    }
  },
  methods: {
    clickHandler() {
      this.$emit("click");
    },
    clear() {
    }
  }
};
if (!Array) {
  const _easycom_uv_transition2 = common_vendor.resolveComponent("uv-transition");
  _easycom_uv_transition2();
}
const _easycom_uv_transition = () => "../uv-transition/uv-transition.js";
if (!Math) {
  _easycom_uv_transition();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($options.clickHandler),
    b: common_vendor.o($options.clear),
    c: common_vendor.p({
      show: _ctx.show,
      mode: "fade",
      ["custom-class"]: "uv-overlay",
      duration: _ctx.duration,
      ["custom-style"]: $options.overlayStyle
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-b1e8b0c8"], ["__file", "C:/Users/chasony/code/github-code/uniapp-drawing-board/node_modules/@climblee/uv-ui/components/uv-overlay/uv-overlay.vue"]]);
tt.createComponent(Component);
