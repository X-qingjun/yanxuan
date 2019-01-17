/*
接口：请求首页头部导航数据
mehtod: GET
params: 无
*/
const CATELIST_URL = '/api/home/catelist';


/*
接口：请求首页轮播图数据
method: GET
params: 无
*/
const FOCUSLIST_URL = '/api/home/focuslist';



/*
接口：首页推荐的分类板块数据
mehtod: GET
params:无
*/
const TOPDATA_URL = '/api/home/topdata';


/*
接口：请求首页的分类数据
method: GET
params: id   
*/
const CATEDETAIL_URL = '/api/home/categorylist'


/*
接口：请求分类数据
method: GET
params: id  
*/
const CATEGORY_LIST_URL = '/api/category/list'


export default {
    CATELIST_URL,
    FOCUSLIST_URL,
    TOPDATA_URL,
    CATEDETAIL_URL,
    CATEGORY_LIST_URL
}