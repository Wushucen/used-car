import React, {Component} from 'react';
import {connect} from 'dva';
import {Row, Col} from 'antd';

import OneSingleMultiChoise from './OneSingleMultiChoise.js';

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
                <OneSingleMultiChoise
                    {...spans}
                    k={'color'}
                    c={'颜色'}
                    options={['红', '橙', '黄', '绿', '蓝', '黑', '白', '灰', '香槟']}
                />
                <Row>
                    <Col>
                        <b>购买日期：</b>
                    </Col>
                </Row>
            </div>
        );
    }
}
