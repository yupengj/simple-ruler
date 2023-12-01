Page({
  onReady: function () {
    var query = wx.createSelectorQuery();
    query.select('#ruler')
    .fields({ node: true, size: true })
    .exec((result)=>{
      const canvas = result[0].node
      const context = canvas.getContext('2d')

      var window = wx.getSystemInfoSync();
      var dpr = window.pixelRatio
      var maxWidth = window.windowWidth; 
      var maxHeight = window.screenHeight; 
      var onemm = 5; 
   
      canvas.width = result[0].width * dpr;
      canvas.height = result[0].height * dpr;
      context.scale(dpr, dpr);

      // var ppi = this.estimatePPI(window) // 1英寸有几个像素
      // var mmOfCount = (ppi/25.4).toFixed(3)// 1 毫米有几个像素
      // console.log(ppi+"--"+dpr+"--"+mmOfCount)

      context.font = "20px serif";
      this.onDrawRuler(context, 10, maxHeight, onemm, 0, 10, true);
      this.onDrawRuler(context, 10, maxHeight, onemm, maxWidth - 10, maxWidth, false);
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