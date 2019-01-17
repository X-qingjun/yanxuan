import API from '../api'
import {
    FetchGet,
    FetchPost
} from '../common/fetch'

// 请求首页的分类
export function getHomeCateList() {
    // 使用async， await
    return new Promise((resolve, reject) => {
        FetchGet(API.CATELIST_URL)
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
        FetchGet(API.FOCUSLIST_URL)
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


// 请求首页的推荐 分类板块的数据
export function getHomeTopData() {
    return new Promise((resolve, reject) => {
        FetchGet(API.TOPDATA_URL)
            .then(data => {
                resolve({
                    policyDescList: data.policyDescList,
                    kingKongData: {
                        background: data.kingKongModule.background,
                        list: data.kingKongModule.kingKongList.map(({
                            sequen,
                            text,
                            picUrl
                        }) => ({
                            id: sequen,
                            text,
                            picUrl
                        }))
                    },
                    bigPromotionData: [
                        data.bigPromotionModule.bigPromotionList[0].data.contents[0],
                        ...data.bigPromotionModule.bigPromotionList[1].data.contents
                    ],
                    bgUrl: data.bigPromotionModule.backgroundUrl
                });
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
        FetchGet(API.CATEGORY_LIST_URL)
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