Page({
  /**
   * 页面的初始数据
   */
  data: {
    img: "/images/personCenter/1.jpg",
    name: "筑梦",
    id: "",
    display: "none",
    scores:99,
    balance:99,
    windowWidth: 300,
    windowHeight: 400,
    shareImgSrc: null,
  },
  hideview: function () {
    this.setData({
      display: "none"
    })
  },
  
 
 

  onShareTap: function (event) {
    wx.showLoading({
      title: '生成中',
    })
    this.setData({
      display: "block",
    })
    var that = this;
    that.onshow("溯夜", "../../images/personCenter/1.jpg");
    // wx.getImageInfo({
    //   src: app.globalData.img,
    //   success: function (sres) {
    //     that.onshow(app.globalData.name, sres.path);
    //   }
    // })  
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.RequestData(this.data.id);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '筑梦回收',
      desc: '最好用的回收利器!',
      path: '/page/StartPage/StartPage'
    }
  },
  onshow: function (name, img) {

    var that = this;
    //1. 请求后端API生成小程序码
    //2. canvas绘制文字和图片
    const ctx = wx.createCanvasContext('myCanvas');
    //背景图
    var bgImgPath = '../../images/personCenter/17.jpg'
    var imgPath = '../../images/personCenter/ma.jpg';//二维码
    ctx.drawImage(bgImgPath, 0, 0, this.data.windowWidth, 280);

    ctx.setFillStyle('white')
    ctx.fillRect(0, 280, 300, 120);
    ctx.drawImage(imgPath, 190, 290, 100, 100);

    //ctx.save()
    //ctx.beginPath()
    //ctx.arc(30, 308, 15, 0, 2 * Math.PI)
    //ctx.clip()
    ctx.drawImage(img, 10, 290, 40, 40)
    //ctx.restore()
    //绘制字体
    ctx.setFontSize(14)
    ctx.setFillStyle('#6F6F6F')
    ctx.fillText(name, 63, 314)

    ctx.setFontSize(15)
    ctx.setFillStyle('#111111')
    ctx.fillText('亲们快来使用回收利器', 10, 350)
    ctx.fillText(name + '在筑梦回收', 10, 370)

    ctx.setFontSize(10)
    ctx.fillText('长按扫码查看详情', 10, 390)
    ctx.draw(false, setTimeout(function () {
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        width: that.data.windowWidth,
        height: that.data.windowHeight,
        destWidth: that.data.windowWidth * 2,
        destHeight: that.data.windowHeight * 2,
        canvasId: 'myCanvas',
        success: function (res) {
          console.log(res.tempFilePath);
          wx.hideLoading();
          that.setData({
            shareImgSrc: res.tempFilePath
          })

        },
        fail: function (res) {
          wx.hideLoading();
          wx.showToast({
            title: '生成失败',
            icon: "none"
          })
        }
      })
    }, 200));
  },
  
  showLocal: function () {
    var that = this;
    console.log(that.data.shareImgSrc);
    wx.saveImageToPhotosAlbum({
      filePath: that.data.shareImgSrc,
      success(res) {
        wx.showModal({
          title: '存图成功',
          content: '图片成功保存到相册了，去发圈噻~',
          showCancel: false,
          confirmText: '好哒',
          confirmColor: '#21bba6',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定');
            }

          }
        })
      }, fail: function () {
        wx.showToast({
          title: '保存失败',
          icon: "none"
        })
      }
    })
  }
})