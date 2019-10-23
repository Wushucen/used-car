import React, {Component} from 'react';
import {connect} from 'dva';
import classnames from 'classnames';
import {Tag} from 'antd';
import moment from 'moment';

@connect(
    ({bigtable}) => ({
        ...bigtable
    })
)
export default class Tags extends Component {
    constructor () {
        super();
    }
    // 封装一个函数
    showTagOrNull (json) {
        if (this.props[json.k].length === 0) {
            return null;
        } else {
            let v = '';
            switch (json.k) {
            case 'color':
            case 'engine':
            case 'fuel':
            case 'exhaust':
                v = this.props[json.k].join(' 或 ');
                break;
            case 'buydate':
                v = this.props[json.k].map(item=> {
                    return moment(item).format('YYYY年MM月DD日');
                }).join(' 到 ');
                break;
            }
            return <Tag key={json.k} closable onClose={()=>{
                this.props.dispatch({'type' :'bigtable/更新列表SAGA', 'k': json.k, 'v': []});
            }}>
                {json.c} : {v}
            </Tag>;
        }
    }
    render () {
        return (
            <div>
                <div className='tagsbox'>
                    {
                        [
                            {'k': 'color', 'c': '颜色'},
                            {'k': 'engine', 'c': '发动机'},
                            {'k': 'fuel', 'c': '燃料'},
                            {'k': 'exhaust', 'c': '排放'},
                            {'k': 'buydate', 'c': '购买日期', 'b': ' 到 '}
                        ].map(item => this.showTagOrNull(item))
                    }
                </div>
            </div>
        );
    }
}
