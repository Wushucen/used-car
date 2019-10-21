import React, {Component} from 'react';
import {sortable} from 'react-sortable';

import './bigtable.less';

// 装饰器，不能加圆括号
@sortable
export default class OneSmallElement extends Component {
    render () {
        return (
            <div className="onesmallelement" {...this.props}>
               小元素{this.props.children}
            </div>
        );
    }
}
