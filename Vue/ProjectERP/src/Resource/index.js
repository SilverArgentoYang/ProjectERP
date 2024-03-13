//资源仓库

//这里import资源
import cart from './Icons/Cart.vue';
import favorite from './Icons/Favorite.vue';
import history from './Icons/History.vue';
import message from './Icons/Message.vue';
import service from './Icons/Service.vue';
import search from './Icons/Search.vue';
import space from './Icons/Space.vue';
import setting from './Icons/Setting.vue';
import outlog from './Icons/Outlog.vue';
import right_arrow from './Icons/RightArrow.vue';
import left_arrow from './Icons/LeftArrow.vue';
import up_arrow from './Icons/UpArrow.vue';
import down_arrow from './Icons/DownArrow.vue';
import share from './Icons//Share.vue';
import favorite2 from './Icons/Favorite2.vue';
import like from './Icons/Like.vue';
import reply from './Icons/Reply.vue';

import nav_bg from './Imgs/bg1024.jpg';
import nav_logo from './Imgs/LOGO512.png';
import nav_avator from './Imgs/Avatar512.jpg';
import item_img1 from './Imgs/itemimg1.jpg';
import item_img2 from './Imgs/itemimg2.jpg';

//仓库本体
const resources = {
    //这里声明变量
    avator_panel_options:[
        {
            icon : space,
            text:"个人中心"
        },
        {
            icon : setting,
            text:"系统设置"
        },
        {
            icon : outlog,
            text:"退出登录"
        }
    ],

    //这里声明资源
    cart,
    favorite,
    history,
    message,
    service,
    search,
    right_arrow,
    left_arrow,
    up_arrow,
    down_arrow,
    share,
    favorite2,
    like,
    reply,

    nav_bg,
    nav_logo,
    nav_avator,

    //后端数据临时使用
    nav_labels:[
        {
            name:"分类1"
        },
        {
            name:"分类2"
        },
        {
            name:"分类3"
        },
        {
            name:"分类4"
        }
    ],
    users:[
        {
            user_name:"银白",
            vip_level:1,
            vip_count:1200,
        }
    ],
    tags:[
        {
            name:'长款'
        },
        {
            name:'女款'
        },
        {
            name:'男款'
        },
        {
            name:'儿童款'
        }
    ],
    goods:[
        {
            id:0,
            img:item_img1,
            fakeprice:"299.00",
            realprice:"199.00",
            name : "小宸洋台湾庄家千层方块酥牛轧饼干牛扎酥糖烘焙原材料全麦咸蛋黄"
        },
        {
            id:1,
            img:item_img2,
            fakeprice:"453.00",
            realprice:"125.00",
            name : "【4斤装】【新疆天润】terun益家发酵乳酸奶2kg大桶两公斤"
        },
        {
            id:2,
            img:item_img1,
            fakeprice:"8324.00",
            realprice:"1254.00",
            name : "包邮900g一盒50条丹特牌坚果薏米茶韩国进口营养粉早餐奶茶冲饮"
        },
        {
            id:3,
            img:item_img2,
            fakeprice:"345.00",
            realprice:"124.00",
            name : "斗鱼DKM150电竞游戏机械键热插拔青黑红茶轴有线外接办公家用"
        },
        {
            id:4,
            img:item_img1,
            fakeprice:"254.00",
            realprice:"99.00",
            name : "晨光热可擦中性笔芯易可擦子弹头摩擦笔替换芯魔力擦小学生中学生0.5mm墨蓝黑色蓝色晶蓝67K01"
        },
        {
            id:5,
            img:item_img1,
            fakeprice:"759.00",
            realprice:"101.00",
            name : "劳保鞋安全鞋防静电钢包头男女防砸防刺绝缘鞋防臭电工透气轻软"
        },
        {
            id:6,
            img:item_img2,
            fakeprice:"869.00",
            realprice:"343.00",
            name : "MARCO马可黑木铅笔HB一年级小学生书写用hb三角铅笔9008易握矫正三角形铅笔儿童三角杆马克不易断铅笔初学者"
        },
        {
            id:7,
            img:item_img1,
            fakeprice:"100.00",
            realprice:"18.00",
            name : "鹃城牌郫县豆瓣酱四川正宗三年黑豆瓣酱特级娟城炒菜专用蚕豆瓣"
        },
        {
            id:8,
            img:item_img2,
            fakeprice:"496.00",
            realprice:"193.00",
            name : "蓝田401胶瞬间胶强力快干透明胶粘陶瓷木头塑料金属大理石补鞋胶修鞋专用胶饰品胶不发白无气味焊接502胶水"
        },
        {
            id:9,
            img:item_img1,
            fakeprice:"548.00",
            realprice:"474.00",
            name : "青岛啤酒鸿运当头啤酒355ml*12瓶"
        },
        {
            id:10,
            img:item_img1,
            fakeprice:"947.00",
            realprice:"89.00",
            name : "家用青花酒壶 1斤装大号陶瓷酒壶分酒壶白酒酒具酒店用品多款可选"
        },
        {
            id:11,
            img:item_img2,
            fakeprice:"443.00",
            realprice:"195.00",
            name : "致美斋大红浙醋 食醋云吞面条蟹醋泡萝卜凉菜调味醋汁630mL"
        },
        {
            id:12,
            img:item_img1,
            fakeprice:"354.00",
            realprice:"97.00",
            name : "菊乐经典纯牛奶 新鲜国产全脂儿童早餐奶 整箱 255g*24盒装"
        },
        {
            id:13,
            img:item_img2,
            fakeprice:"818.00",
            realprice:"506.00",
            name : "【第2件半价】齐善素食佛家零食纯素素香肠素肉素玉米肠小火腿"
        },
        {
            id:14,
            img:item_img1,
            fakeprice:"797.00",
            realprice:"490.00",
            name : "饭爷红烧酱汁家常炒菜4包装家用便捷红烧排骨"
        },
        {
            id:15,
            img:item_img1,
            fakeprice:"781.00",
            realprice:"608.00",
            name : "土耳其开心果新货进口原味紫皮500g盐焗无添加孕妇坚果仁零食特产"
        },
        {
            id:16,
            img:item_img2,
            fakeprice:"316.00",
            realprice:"276.00",
            name : "4开K卡纸彩色厚手工250克g双面硬卡纸幼儿园学生早教中心班用材料艺术绘画画大张红黄蓝绿白黑色卡纸模型背景"
        },
        {
            id:17,
            img:item_img1,
            fakeprice:"976.00",
            realprice:"385.00",
            name : "床单单件冬季被单单人双人水洗棉学生宿舍枕套儿童ins风男三件套"
        },
        {
            id:18,
            img:item_img2,
            fakeprice:"325.00",
            realprice:"183.00",
            name : "麻老五藤椒油正宗四川特产家用商用特香麻油纯正麻椒油特麻花椒油"
        },
        {
            id:19,
            img:item_img1,
            fakeprice:"969.00",
            realprice:"107.00",
            name : "出口德国高硼硅透明玻璃锅盖高强耐温差161820cm24cm26cm28cm30cm"
        },
        {
            id:20,
            img:item_img1,
            fakeprice:"730.00",
            realprice:"331.00",
            name : "特价双胜一次性帽子防尘头套无纺布蘑菇圆帽厨师帽女男防油烟头罩"
        },
        {
            id:21,
            img:item_img2,
            fakeprice:"986.00",
            realprice:"707.00",
            name : "泰斯卡风暴单一麦芽苏格兰威士忌TALISKER英国原装进口洋酒700ml"
        },
        {
            id:22,
            img:item_img1,
            fakeprice:"884.00",
            realprice:"749.00",
            name : "台式led数码万年历电子钟夜光插电座钟闹钟时钟日历温度电子钟表"
        },
        {
            id:23,
            img:item_img2,
            fakeprice:"827.00",
            realprice:"294.00",
            name : "gemez印尼小鸡面enaak网红干脆面整箱干吃方便面进口儿童零食小吃"
        },
        {
            id:24,
            img:item_img1,
            fakeprice:"723.00",
            realprice:"721.00",
            name : "鲜活蓝柑糖浆果露浓缩金桔糖浆风味糖浆香蜜珍珠奶茶苏打原料1L"
        }
    ],
    cartgoods:[],
    favoritegoods: [],
    historygoods: [],
    rowpapergoods:[],
    suggestgoods:[],
    searchresualt:[]
}
const g = resources.goods
resources.cartgoods = [g[10],g[20],g[12],g[21],g[5]];
resources.favoritegoods = [g[9],g[21],g[14],g[4],g[24]];
resources.historygoods = [g[16],g[22],g[14],g[8],g[23]];
resources.rowpapergoods = [g[17],g[24],g[5],g[14],g[22]];
resources.suggestgoods = [g[1],g[10],g[11],g[16],g[3],g[8]];
resources.searchresualt = g;

export default resources;