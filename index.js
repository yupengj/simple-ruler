Page({
  onReady: function () {
    var query = wx.createSelectorQuery();
    query.select('#ruler')
    .fields({ node: true, size: true })
    .exec((result)=>{
      const canvas = result[0].node
      const context = canvas.getContext('2d')

      var window = wx.getSystemInfoSync();
      console.log(window)
      var ppi = this.estimatePPI(window)
      var dpr = window.pixelRatio
      var mmOfCount = (ppi/25.4).toFixed(3)// 1 毫米有几个像素
      console.log(ppi+"--"+dpr+"--"+mmOfCount)

      // 设置Canvas的实际大小
      canvas.width = result[0].width * dpr;
      canvas.height = result[0].height * dpr;
      context.scale(dpr, dpr);

      var th = 20*mmOfCount/dpr;
      context.moveTo(10, 10)
      context.lineTo(10, 10+th)
      context.stroke();

      // context.scale(dpr, dpr); // 缩放Canvas

      // context.font = "20px serif";
      // this.onDrawRuler(context, 10, maxHeight, 5, 0, 10, true);
      // this.onDrawRuler(context, 10, maxHeight, 5, maxWidth - 10, maxWidth, false);
    });
  },
  onDrawRuler: function (context, start, end, onemm, lineStart, lineEnd, isLeft) {
    var conunt = 0;
    var textPx = isLeft ? lineEnd + 3 : lineStart - 10
    for (var i = start; i < end; i += onemm) {
      var temp = 0;
      if (conunt % 10 == 0) {
        temp += 10;
        var tempTextPx = isLeft ? textPx + temp : textPx - temp
        context.fillText(conunt / 10, tempTextPx, i)
      } else if (conunt % 5 == 0) {
        temp += 5;
      }
      var tempLineStart = isLeft ? lineStart : lineStart - temp;
      var tempLineEnd = isLeft ? lineEnd + temp : lineEnd;
      context.moveTo(tempLineStart, i)
      context.lineTo(tempLineEnd, i)
      context.stroke();
      conunt++
    }
  },

  estimatePPI: function(window) {
    // 获取设备像素比例
    var pixelRatio = window.pixelRatio || 1;

    // 获取屏幕分辨率
    var screenWidth = window.screenWidth * pixelRatio;
    var screenHeight = window.screenHeight * pixelRatio;

    // 获取屏幕尺寸（以英寸为单位）
    var screenInches = Math.sqrt(screenWidth ** 2 + screenHeight ** 2) / window.pixelRatio / 96; // 1英寸=96 CSS像素
    console.log("screenInches",screenInches)
    // 估算PPI
    var estimatedPPI = Math.sqrt(screenWidth ** 2 + screenHeight ** 2) / screenInches;

    return estimatedPPI;
  },
});