import API from '../api'
import {
    FetchGet,
    FetchPost
} from '../common/fetch'

// 请求首页的分类
export function getHomeCateList() {
    // 使用async， await
    return new Promise((resolve, reject) => {
        FetchGet(API.CATE_LIST_URL)
            .then(
                (data) => {
                    // 过滤数据
                    resolve(data.map(({
                        name,
                        id
                    }) => ({
                        name,
                        id
                    })));
                    // this.list = data.map((item)=>{
                    //     return {
                    //         name: item.name,
                    //         id: item.id
                    //     }
                    // })
                }
            )
    })
};

//请求首页轮播图数据;
export function getHomeFocusList() {
    return new Promise((resolve, reject) => {
        FetchGet(API.HOME_BANNER_LIST_URL)
            .then(data => {
                let newData = data.map(({
                    id,
                    picUrl,
                    targetUrl
                }) => ({
                    id,
                    picUrl,
                    targetUrl
                }));
                resolve(newData);
            })
    })
}


// 请求首页网易严选协议
export function getPolicyList() {
    return new Promise((resolve, reject) => {
        FetchGet(API.POLICY_LIST_URL)
            .then(data => {
                resolve(data);
            })
    })
}

// 请求首页分类列表
export function getHomeList() {
    return new Promise((resolve, reject) => {
        FetchGet(API.HOME_CATE_LIST_URL)
            .then(data => {
                resolve({
                    background: data.background,
                    list: data.kingKongList.map(({
                        text,
                        picUrl
                    }) => ({
                        text,
                        picUrl
                    }))
                })
            })
    })
}

//请求首页活动
export function getHomeActivity() {
    return new Promise((resolve, reject) => {
        FetchGet(API.HOME_ACTIVITY_URL)
            .then(data => {
                resolve({
                    backgroundUrl: data.backgroundUrl,
                    bigPromotionData: [
                        data.bigPromotionList[0].data.contents[0],
                        ...data.bigPromotionList[1].data.contents
                    ]
                })
            })
    })
}


//请求品牌制造商直供
export function getHomeTagList() {
    return new Promise((resolve, reject) => {
        FetchGet(API.HOME_TAG_LIST_URL)
            .then(data => {
                let newData = data.map(({
                    id,
                    floorPrice,
                    picUrl,
                    name
                }) => ({
                    id,
                    floorPrice,
                    picUrl,
                    name
                }));
                resolve(newData);
            })
    })
}


//请求类目热销榜
export function getHomeCateSell() {
    return new Promise((resolve, reject) => {
        FetchGet(API.HOME_CATE_HOT_SELL_URL)
            .then(data => {
                resolve({
                    title: data.title,
                    cateList: data.categoryList.map(({
                        categoryName,
                        picUrl
                    }) => ({
                        categoryName,
                        picUrl
                    }))
                })
            })
    })
}


//请求首页的分类数据
export function getHomeCateDetail(id) {
    return new Promise((resolve, reject) => {
        var MyIframe = document.createElement('iframe');
        MyIframe.src = API.CATEDETAIL_URL + '?id=' + id;
        MyIframe.style.display = 'none';
        MyIframe.onload = function () {
            // console.log(MyIframe.contentDocument.querySelectorAll('script')[10].innerText);
            let scriptText = MyIframe.contentDocument.querySelectorAll('script')[10].innerText;
            let index = scriptText.indexOf('=');
            let jsonData = scriptText.substring(index + 1, scriptText.length - 2);
            let data = JSON.parse(jsonData);
            resolve({
                bannerUrl: data.currentCategory.bannerUrl,
                categoryList: data.categoryItemList.map((item) => {
                    return {
                        id: item.category.id,
                        name: item.category.name,
                        frontName: item.category.frontName,
                        itemlist: item.itemList.map((listItem) => {
                            return {
                                id: listItem.id,
                                name: listItem.name,
                                simpleDesc: listItem.simpleDesc,
                                price: listItem.retailPrice,
                                itemTagList: listItem.itemTagList
                            }
                        })
                    }
                })
            })
        }
        document.querySelector('.test').appendChild(MyIframe);
    })
}


// 请求分类列表的数据
export function getCategoryList() {
    return new Promise((resolve, reject) => {
        FetchGet(API.CATEGOEY_LIST_URL)
            .then(data => {
                let newData = data.map(item => {
                    return {
                        id: item.id,
                        name: item.name,
                        wapBannerUrl: item.wapBannerUrl,
                        subCateList: item.subCateList.map((subItem) => {
                            return {
                                id: subItem.id,
                                name: subItem.name,
                                bannerUrl: subItem.bannerUrl
                            }
                        })
                    }
                })
                resolve(newData);
            })
    })
}