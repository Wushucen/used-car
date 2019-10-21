import React, {Component} from 'react';
import OneSmallElement from './OneSmallElement.js';
import './bigtable.less';

export default class ModelInner extends Component {
    constructor () {
        super();
        this.state = {
            arr : ['A', 'B', 'C']
        };
    }
    render () {
        return (
            <div>
                <p>当前为您展示的列（可以拖拽排序）：</p>
                <div className='onesmallelementbox'>
                    {
                        this.state.arr.map((item, i)=>{
                            return (
                                <OneSmallElement
                                    key={i}
                                    onSortItems={arr=>{
                                        this.setState({
                                            arr
                                        });
                                    }}
                                    items={this.state.arr}
                                    sortId={i}
                                    content={item}
                                >{item}
                                </OneSmallElement>
                            );
                        })
                    }
                </div>
                <p>备选列：</p>
                <div className="alternativeArr">
                    <span>发动机 <b>+</b></span>
                    <span>燃料 <b>+</b></span>
                    <span>购买日期 <b>+</b></span>
                    <span>公里数 <b>+</b></span>
                    <span>价格 <b>+</b></span>
                </div>
            </div>
        );
    }
}
