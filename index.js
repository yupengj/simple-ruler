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
      const ratio = ppi / dpr / 96; // 和显示长度的倍数相差
      var mmOfCount = (ppi/25.4).toFixed(3)// 1 毫米有几个像素
      console.log(ppi+"--"+dpr+"--"+mmOfCount+"--"+ratio)
 
      var aa = this.estimatePPI2(window)
      console.log(aa)

      // 设置Canvas的实际大小
      canvas.width = result[0].width * dpr;
      canvas.height = result[0].height * dpr;
      // context.scale(dpr, dpr);

      // 设置正方形的边长
      var sideLength = 10*ratio;  // 10厘米
      console.log(sideLength)

      // 设置正方形的起始坐标
      var x = 30;
      var y = 30;

      // // 设置正方形的边框颜色
      // context.strokeStyle = 'black';

      // 绘制正方形
      context.strokeRect(x, y, sideLength, sideLength);

      // console.log(";;;;"+dpr)
      // var maxWidth = result[0].width * dpr;
      // var maxHeight = result[0].height * dpr

      // const canvas = result[0].node
      // canvas.width = maxWidth
      // canvas.height = maxHeight

      // const context = canvas.getContext('2d')
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

  estimatePPI2: function(window){
    var ppi = (96 * window.pixelRatio) / 100
    var dpi = Math.round(96 * ppi)
    var distanceInInches = 4
    return distanceInInches* dpi
  }
});