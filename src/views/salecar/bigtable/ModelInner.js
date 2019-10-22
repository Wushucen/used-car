import React, {Component} from 'react';
import {connect} from 'dva';
import _ from 'lodash';

import OneSmallElement from './OneSmallElement.js';
import './bigtable.less';
import columnsMap from './columnsMap.js';

@connect(
    ({bigtable})=>({
        ...bigtable
    })
)
export default class ModelInner extends Component {
    constructor (props) {
        super();
        // 这里设置备选列的初始数组，直接交给lodash计算差集
        let alternativeArr = _.difference(Object.keys(columnsMap), props.columnsArr);
        console.log(alternativeArr);
        // 遍历字典，看看这个选项的键名，是否在装饰器props.columnsArr中
        // 如果不在就push到alternativeArr数组中
        this.state = {
            'columnsArr' : props.columnsArr,
            'alternativeArr':alternativeArr
        };
    }
    render () {
        return (
            <div>
                <p>当前为您展示的列（可以拖拽排序）：</p>
                <div className='onesmallelementbox'>
                    {
                        this.state.columnsArr.map((item, i)=>{
                            return (
                                <OneSmallElement
                                    key={i}
                                    onSortItems={(columnsArr)=>{
                                        this.setState({
                                            columnsArr
                                        });
                                    }}
                                    items={this.state.columnsArr}
                                    sortId={i}
                                    english={item}
                                    chinese={columnsMap[item].title}
                                >{item}
                                </OneSmallElement>
                            );
                        })
                    }
                </div>
                <p>备选列：</p>
                <div className="alternativeArr">
                    {
                        this.state.alternativeArr.map((item, i)=> <span
                            keys={i}
                        >
                            {columnsMap[item].title}
                            <b> +</b>
                        </span>)
                    }
                </div>
            </div>
        );
    }
}
