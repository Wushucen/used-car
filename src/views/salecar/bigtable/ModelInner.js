import React, {Component} from 'react';
import OneSmallElement from './OneSmallElement.js';

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
        );
    }
}
