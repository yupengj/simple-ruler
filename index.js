Page({
  onReady: function () {
    var res = wx.getSystemInfoSync();
    var maxWidth = res.windowWidth;
    var maxHeight = res.screenHeight;
    var onemm = this.onGetOnecmPxiel(res);
    console.log(maxWidth + " * " + maxHeight + " - " + res.pixelRatio + " - " + res.model + " - " + onemm)
    var context = wx.createCanvasContext('ruler');
    this.onDrawRuler(context, 10, maxHeight, onemm, 0, 10, true);
    this.onDrawRuler(context, 10, maxHeight, onemm, maxWidth - 10, maxWidth, false);
    context.draw()
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
      context.setFontSize(10)
      context.moveTo(tempLineStart, i)
      context.lineTo(tempLineEnd, i)
      context.stroke();
      conunt++
    }
  },
  // 计算一毫米等于多少px，然后以一毫米的px递增
  onGetOnecmPxiel: function (res) {
    var num = this.data[res.model];
    if (!num){
      num = 5.2;
    }
    return num;
  },
  data: {
    "iPhone 5": 5.4,
    "iPhone 6": 5.8,
    "iPhone 6 Plus": 5.9,
    "iPhone 7": 6.0,
    "iPhone 7 Plus": 6.1,
    "iPhone 8": 6.0,
    "iPhone 8 Plus": 6.1,
    "OD105": 5.3
  }
});