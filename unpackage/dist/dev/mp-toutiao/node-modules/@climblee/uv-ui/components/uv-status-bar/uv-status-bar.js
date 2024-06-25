"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const _sfc_main = {
  name: "uv-status-bar",
  mixins: [common_vendor.mpMixin, common_vendor.mixin, common_vendor.props$3],
  data() {
    return {};
  },
  computed: {
    style() {
      const style = {};
      style.height = this.$uv.addUnit(this.$uv.sys().statusBarHeight, "px");
      if (this.bgColor) {
        if (this.bgColor.indexOf("gradient") > -1) {
          style.backgroundImage = this.bgColor;
        } else {
          style.background = this.bgColor;
        }
      }
      return this.$uv.deepMerge(style, this.$uv.addStyle(this.customStyle));
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.s($options.style)
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-4ff5a0d7"], ["__file", "C:/Users/chasony/code/github-code/uniapp-drawing-board/node_modules/@climblee/uv-ui/components/uv-status-bar/uv-status-bar.vue"]]);
tt.createComponent(Component);
