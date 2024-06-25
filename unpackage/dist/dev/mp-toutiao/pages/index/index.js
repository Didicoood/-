"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uv_pick_color2 = common_vendor.resolveComponent("uv-pick-color");
  _easycom_uv_pick_color2();
}
const _easycom_uv_pick_color = () => "../../node-modules/@climblee/uv-ui/components/uv-pick-color/uv-pick-color.js";
if (!Math) {
  _easycom_uv_pick_color();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const ctx = common_vendor.ref();
    const canvasBgColor = common_vendor.ref("#eeeeee");
    const points = common_vendor.ref([]);
    const penWidth = common_vendor.ref(10);
    const penColor = common_vendor.ref("#000000");
    const pickerColor = common_vendor.ref();
    const windowWidth = common_vendor.ref();
    const windowHeight = common_vendor.ref();
    const cvWidth = common_vendor.ref();
    const cvHeight = common_vendor.ref();
    const uniPlatform = common_vendor.ref(common_vendor.index.getSystemInfoSync().uniPlatform);
    common_vendor.onReady(() => {
      ctx.value = common_vendor.index.createCanvasContext("firstCanvas");
      ctx.value.lineCap = "round";
      ctx.value.lineJoin = "round";
      common_vendor.index.getSystemInfo({
        success(res) {
          windowWidth.value = res.windowWidth;
          windowHeight.value = res.windowHeight;
          cvWidth.value = res.windowWidth * res.devicePixelRatio;
          cvHeight.value = res.windowHeight * res.devicePixelRatio;
          ctx.value.setFillStyle(canvasBgColor.value);
          ctx.value.fillRect(0, 0, cvWidth.value, cvHeight.value);
        }
      });
    });
    const historyStack = common_vendor.ref([]);
    const redoStack = common_vendor.ref([]);
    const undo = () => {
      if (historyStack.value.length > 0) {
        let lastDraw = historyStack.value.pop();
        redoStack.value.push(lastDraw);
        redraw(historyStack.value[historyStack.value.length - 1]);
      }
    };
    const redo = () => {
      if (redoStack.value.length > 0) {
        let nextDraw = redoStack.value.pop();
        historyStack.value.push(nextDraw);
        redraw(historyStack.value[historyStack.value.length - 1]);
      }
    };
    const redraw = (imgUrl) => {
      ctx.value.drawImage(imgUrl, 0, 0, windowWidth.value, windowHeight.value);
      ctx.value.draw();
    };
    const clearPointsInterval = 500;
    let lastClearPointsTimestamp = 0;
    const confirm = (e) => {
      penColor.value = e.hex;
    };
    const openColor = () => {
      pickerColor.value.open();
    };
    const canvasClick = (e) => {
      let startX = e.detail.x;
      let startY = e.detail.y;
      let clickPointColor = penColor.value;
      if (eraserstatus.value == true) {
        clickPointColor = canvasBgColor.value;
      }
      ctx.value.setLineWidth(penWidth.value);
      ctx.value.setStrokeStyle(clickPointColor);
      ctx.value.beginPath();
      ctx.value.arc(startX, startY, penWidth.value / 2, 0, 2 * Math.PI);
      ctx.value.closePath();
      ctx.value.setFillStyle(clickPointColor);
      ctx.value.fill();
      ctx.value.draw(true);
    };
    const onTouchstart = (e) => {
      let startX = e.changedTouches[0].x;
      let startY = e.changedTouches[0].y;
      let startPoint = {
        X: startX,
        Y: startY,
        width: penWidth.value,
        color: penColor.value
      };
      points.value.push(startPoint);
      ctx.value.setLineWidth(penWidth.value);
      ctx.value.setStrokeStyle(penColor.value);
      if (eraserstatus.value == true) {
        startPoint.color = canvasBgColor.value;
        ctx.value.setStrokeStyle(startPoint.color);
      }
      ctx.value.beginPath();
    };
    const onTouchmove = (e) => {
      let moveX = e.changedTouches[0].x;
      let moveY = e.changedTouches[0].y;
      let movePoint = {
        X: moveX,
        Y: moveY,
        width: penWidth.value,
        color: penColor.value
      };
      if (eraserstatus.value == true) {
        movePoint.color = canvasBgColor.value;
      }
      points.value.push(movePoint);
      if (points.value.length >= 2) {
        draw();
      }
      const currentTimestamp = Date.now();
      if (currentTimestamp - lastClearPointsTimestamp > clearPointsInterval) {
        lastClearPointsTimestamp = currentTimestamp;
        const lastPath = points.value.slice(-2);
        points.value = lastPath;
      }
    };
    const draw = () => {
      let point1 = points.value[0];
      let point2 = points.value[1];
      points.value.shift();
      let dx = point2.X - point1.X;
      let dy = point2.Y - point1.Y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      let step = 3;
      for (let t = 0; t < distance; t += step) {
        let x = point1.X + t / distance * dx;
        let y = point1.Y + t / distance * dy;
        ctx.value.beginPath();
        ctx.value.arc(x, y, point1.width / 2, 0, 2 * Math.PI);
        ctx.value.closePath();
        ctx.value.setFillStyle(point1.color);
        ctx.value.fill();
      }
      ctx.value.beginPath();
      ctx.value.moveTo(point1.X, point1.Y);
      ctx.value.lineTo(point2.X, point2.Y);
      ctx.value.stroke();
      ctx.value.draw(true);
    };
    const onTouchend = () => {
      points.value = [];
      redoStack.value = [];
      common_vendor.index.canvasToTempFilePath({
        canvasId: "firstCanvas",
        quality: 1,
        destWidth: cvWidth.value,
        destHeight: cvHeight.value,
        success: (res) => {
          historyStack.value.push(res.tempFilePath);
        }
      });
    };
    const clearCanvas = () => {
      ctx.value.clearRect(0, 0, cvWidth.value, cvHeight.value);
      ctx.value.draw(true);
      points.value = [];
    };
    const eraserstatus = common_vendor.ref(false);
    const eraserCanvas = () => {
      eraserstatus.value = !eraserstatus.value;
    };
    const updatePenWidth = (e) => {
      penWidth.value = e.detail.value;
    };
    const saveAsPic = () => {
      let scopeVal = "scope.writePhotosAlbum";
      if (uniPlatform.value == "mp-toutiao") {
        scopeVal = "scope.album";
      }
      common_vendor.index.getSetting({
        success(set_res) {
          if (set_res.authSetting[scopeVal]) {
            saveCanvasToImg();
          } else if (set_res.authSetting[scopeVal] === void 0) {
            saveCanvasToImg();
          } else {
            common_vendor.index.openSetting({
              success(open_res) {
                if (open_res.authSetting[scopeVal]) {
                  saveCanvasToImg();
                } else {
                  common_vendor.index.showToast({
                    title: "请开启图片访问权限",
                    icon: "none"
                  });
                }
              },
              fail() {
                common_vendor.index.showToast({
                  title: "设置失败",
                  icon: "none"
                });
              }
            });
          }
        },
        fail() {
          common_vendor.index.showToast({
            title: "设置失败",
            icon: "none"
          });
        }
      });
    };
    function saveCanvasToImg() {
      common_vendor.index.canvasToTempFilePath({
        canvasId: "firstCanvas",
        quality: 1,
        destWidth: cvWidth.value,
        destHeight: cvHeight.value,
        success: (res) => {
          common_vendor.index.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success() {
              common_vendor.index.showToast({
                title: "已保存到系统相册",
                icon: "none"
              });
            }
          });
        }
      });
    }
    return (_ctx, _cache) => {
      return {
        a: canvasBgColor.value,
        b: common_vendor.o(canvasClick),
        c: common_vendor.o(onTouchstart),
        d: common_vendor.o(onTouchmove),
        e: common_vendor.o(onTouchend),
        f: cvWidth.value + "px",
        g: cvHeight.value + "px",
        h: common_vendor.o(clearCanvas),
        i: eraserstatus.value == true ? "gray" : "royalblue",
        j: common_vendor.o(eraserCanvas),
        k: common_vendor.o(saveAsPic),
        l: common_vendor.o(openColor),
        m: penColor.value,
        n: penWidth.value,
        o: common_vendor.o(updatePenWidth),
        p: historyStack.value.length == 0 ? true : false,
        q: common_vendor.o(undo),
        r: redoStack.value.length == 0 ? true : false,
        s: common_vendor.o(redo),
        t: common_vendor.sr(pickerColor, "1cf27b2a-0", {
          "k": "pickerColor"
        }),
        v: common_vendor.o(confirm)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"], ["__file", "C:/Users/chasony/code/github-code/uniapp-drawing-board/pages/index/index.vue"]]);
tt.createPage(MiniProgramPage);
