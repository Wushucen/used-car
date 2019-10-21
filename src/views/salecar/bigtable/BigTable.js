import React, {Component} from 'react';
import {connect} from 'dva';
import {Table} from 'antd';

import columnsMap from './columnsMap.js';

@connect(
    ({bigtable})=>({
        ...bigtable
    })
)
export default class BigTable extends Component {
    // 组件即将上树
    componentWillMount () {
        this.props.dispatch({'type':'bigtable/获取列中的本地数据'});
    }
    render () {
        return (
            <div>
                <Table
                    columns={
                        // 这个时候需要用已经转换过的数据来map进去
                        this.props.columnsArr.map(item=>({
                            'key':item,
                            'dataIndex':item,
                            // ...的好处就是如果某一项有一个render就可以直接被罗列出来了
                            ...columnsMap[item]
                        }))
                    }
                />
            </div>
        );
    }
}
