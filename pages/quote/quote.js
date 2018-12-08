Page({
    data: {
        // array: ['地区一', '地区二', '地区三', '地区四'],
        // region: "请选择地区区域"
    },
    selectorChange: function (e) {
        this.setData({
            'index': e.detail.value,
            'region': this.data.array[e.detail.value]
        }); 
    },
    formSubmit: function (e) {
        if (e.detail.value.name.length == 0 || e.detail.value.phone.length == 0 || e.detail.value.companyName.length == 0) {
            swan.showModal({
                content: '姓名或面积不得为空!',
                showCancel: false,
            })
        } else if (e.detail.value.phone.length != 11) {
            swan.showModal({
                content: '请输入11位手机号码!',
                showCancel: false,
            })
        } else {
            var data = {};
            data.companyName = e.detail.value.companyName;
            data.linkName = e.detail.value.name;
            data.phone = e.detail.value.phone;
            data.type = 15; //this.data.region 城市编号
            data.status = "0";
            data.url = "百度小程序";
            data.city = "测试";
            swan.request({
                url: "https://manager.rxjy.com/r/saveRegistration",
                method: "POST",
                data: data,
                dataType: 'json',
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                success(res) {
                    if(res.data.status=="no"){
                        swan.showToast({
                            title: '请重试',
                            icon: 'success',
                            duration: 1000
                        });
                    } else {
                        swan.showToast({
                            title: '提交成功',
                            icon: 'success',
                            duration: 1000
                        });
                    }
                    
                    // console.log(res.data)
                }
            })
        }
        //  console.log('携带数据为：', data)
    },
});