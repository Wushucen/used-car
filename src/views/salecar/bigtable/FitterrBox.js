import React, {Component} from 'react';
import {connect} from 'dva';
import {Row, Col} from 'antd';

import OneSingleMultiChoise from './OneSingleMultiChoise.js';
import Tags from './Tags.js';

@connect(
    ({bigtable})=>({
        ...bigtable
    })
)
export default class FitterrBox extends Component {
    constructor () {
        super();
        this.state = {
            buydate:[]
        };
    }
    render () {
        const spans = {
            labelSpan:2,
            choseSpan:13,
            btnSpan:1
        };

        return (
            <div>
                <Tags />
                <OneSingleMultiChoise
                    {...spans}
                    k={'color'}
                    c={'颜色'}
                    options={['红', '橙', '黄', '绿', '蓝', '黑', '白', '灰', '香槟']}
                />
                <OneSingleMultiChoise
                    {...spans}
                    k={'exhaust'}
                    c={'尾气'}
                    options={['国一', '国二', '国三', '国四', '国五']}
                />
                <OneSingleMultiChoise
                    {...spans}
                    k={'engine'}
                    c={'发动机'}
                    options={['1.6L', '1.6T', '1.8L', '1.8T', '2.0L', '2.0T', '2.4L', '2.4T']}
                />

                <OneSingleMultiChoise
                    {...spans}
                    k={'fuel'}
                    c={'燃料'}
                    options={['汽油', '柴油', '油电混合', '纯电动']}
                />
                <Row style={{'display':this.props.buydate.length === 0 ? 'block' : 'none'}}>
                    <Col span={spans.labelSpan}>
                        <b>购买日期：</b>
                    </Col>
                </Row>
            </div>
        );
    }
}
