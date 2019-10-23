import React, {Component} from 'react';
import {connect} from 'dva';
import _ from 'lodash';

import OneSmallElement from './OneSmallElement.js';
import './bigtable.less';
import columnsMap from './columnsMap.js';
import {Button} from 'antd';

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
            // slice浅克隆一下,让内存中多一个镜像
            'columnsArr' : props.columnsArr.slice(),
            'alternativeArr':alternativeArr
        };
    }
    deloneitem (english) {
        this.setState({
            // 删filter改map filter是不等于 map是三元
            'columnsArr':this.state.columnsArr.filter(item => item !== english),
            'alternativeArr': [...this.state.alternativeArr, english]
        });
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
                                    other={{
                                        deloneitem : this.deloneitem.bind(this)
                                    }}
                                >{item}
                                </OneSmallElement>
                            );
                        })
                    }
                    <div className='clearfix'></div>
                </div>
                <p className='alternative'>备选列：</p>
                <div className="alternativeArr">
                    {
                        this.state.alternativeArr.map((item, i)=> <span
                            key={i}
                        >
                            {columnsMap[item].title}
                            <b onClick={()=>{
                                this.setState({
                                    'alternativeArr':this.state.alternativeArr.filter(_item => _item !== item),
                                    'columnsArr':[...this.state.columnsArr, item]
                                });
                            }}>+</b>
                        </span>)
                    }
                    <div className='clearfix'></div>
                </div>
                <div>
                    <Button>取消</Button>
                    <Button onClick={()=>{
                        this.props.okHandler(this.state.columnsArr);
                    }}>确定</Button>
                </div>
            </div>
        );
    }
}
