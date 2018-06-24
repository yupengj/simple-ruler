Page({
  onReady: function () {
    var res = wx.getSystemInfoSync();
    var maxWidth = res.windowWidth;
    var maxHeight = res.screenHeight;
    console.log(maxWidth + " * " + maxHeight + " - " + res.pixelRatio + " - " + res.model)
    var context = wx.createCanvasContext('ruler');
    var onemm = this.onGetOnecmPxiel(res);
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
    var num = 5.2;
    if (res.model == 'iPhone 6 Plus') {
      num = 5.3;
    } else if (res.model == 'iPhone 6') {
      num = 6.0;
    } else if(res.model == 'iPhone 7' || res.model == 'iPhone 8'){
      num = 6.4; 
    } else if (res.model == 'iPhone 7 Plus' || res.model == 'iPhone 8 Plus'){
      num = 6.1
    } else if (res.model == 'iPhone 5'){
      num = 6.6; 
    } else if (res.model == 'OD105'){
      num = 5.3;
    }
    console.log("mun - "+num);
    return num;
  }
});