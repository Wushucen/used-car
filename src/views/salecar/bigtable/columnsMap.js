import React from 'react';
import moment from 'moment';

export default {
    'price':{
        'title':'价格'
    },
    'id':{
        'title':'编号'
    },
    'image':{
        'title':'图片',
        'render': (txt, {id})=>{
            return <div>
                <img src={`/api/images/carimages_small/${id}/view/${txt}`} />
            </div>;
        }
    },
    'fuel':{
        'title':'燃料'
    },
    'brand':{
        'title':'品牌'
    },
    'series':{
        'title':'车系'
    },
    'color':{
        'title':'颜色'
    },
    'exhaust':{
        'title':'排放'
    },
    'engine':{
        'title':'发动机'
    },
    'buydate':{
        'title':'购买日期',
        'render': (txt)=>{
            return <div>
                {moment(txt).format('YYYY年MM月DD日')}
            </div>;
        }
    },
    'km':{
        'title':'公里数',
        'reder':(txt) => {
            return <div>
                {txt.toString().replace(/\B(?=(...)+$)/g, ',')}
            </div>;
        }
    }

};