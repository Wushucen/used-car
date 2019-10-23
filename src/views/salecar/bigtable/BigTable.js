import React, {Component} from 'react';
import {connect} from 'dva';
import {Table, Button, Modal} from 'antd';

import columnsMap from './columnsMap.js';
import ModelInner from './ModelInner.js';
import FitterrBox from './FitterrBox.js';
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
        this.props.dispatch({'type':'bigtable/初始化'});
    }
    render () {
        return (
            <div>
                <Modal
                    title='请调整表格列的排序'
                    // 关于数据的数据要走model 关于UI的数据要走组件
                    visible={this.state.showChangeColumnModal}
                    footer=''
                >
                    <ModelInner ref='modelinner' okHandler={(columns)=>{
                        console.log(columns);
                        // 点击确定按钮之后做的事情
                        this.props.dispatch({'type':'bigtable/设置列中的数据存到本地', columns});
                        this.setState({
                            showChangeColumnModal:false
                        });
                    }} cancelHandler={(columns)=>{
                        this.setState({
                            showChangeColumnModal:false
                        });
                    }} />
                </Modal>

                <FitterrBox />

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
                    rowKey='id'
                    columns={
                        // 这个时候需要用已经转换过的数据来map进去
                        this.props.columnsArr.map(item=>({
                            'key':item,
                            'dataIndex':item,
                            // ...的好处就是如果某一项有一个render就可以直接被罗列出来了
                            ...columnsMap[item]
                        }))
                    }
                    dataSource={this.props.results}
                />
            </div>
        );
    }
}
