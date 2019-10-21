import React, {Component} from 'react';
import {connect} from 'dva';
import {Table, Button, Modal} from 'antd';

import columnsMap from './columnsMap.js';
import './bigtable.less';

@connect(
    ({bigtable})=>({
        ...bigtable
    })
)
export default class BigTable extends Component {
    constructor () {
        super();
        this.state = {
            showChangeColumnModal:false
        };
    }
    // 组件即将上树
    componentWillMount () {
        this.props.dispatch({'type':'bigtable/获取列中的本地数据'});
    }
    render () {
        return (
            <div>
                <Modal
                    title='请调整表格列的排序'
                    // 关于数据的数据要走model 关于UI的数据要走组件
                    visible={this.state.showChangeColumnModal}
                >

                </Modal>
                <div className="button_box">
                    <Button
                        className="btn"
                        type="primary"
                        shape="circle"
                        icon="setting"
                        onClick={()=>{
                            this.setState({
                                showChangeColumnModal : true
                            });
                        }}
                    />
                </div>
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
