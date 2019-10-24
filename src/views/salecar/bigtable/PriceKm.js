import React, {Component} from 'react';
import {connect} from 'dva';
import {Button, Row, Col, Slider} from 'antd';
import classnames from 'classnames';

@connect(
    ({bigtable}) => ({
        ...bigtable
    })
)
export default class PriceKm extends Component {
    constructor () {
        super();
    }
    render () {
        return (
            <div className='bsfilter_box'>
                <Row className='myrow'>
                    <Col span={this.props.labelSpan}>
                        <b>价格：</b>
                    </Col>
                    <Col span={18}>
                        <Slider
                            min={0}
                            max={120}
                            range
                            value={this.props.price}
                            onChange={(arr)=>{
                                this.props.dispatch({'type': 'bigtable/更新列表', 'k':'price', 'v':arr});
                            }}
                            onAfterChange={(arr)=>{
                                this.props.dispatch({'type': 'bigtable/更新列表SAGA', 'k':'price', 'v':arr});
                            }}
                            marks={{
                                0:'0万',
                                10:'10万',
                                30:'30万',
                                50:'50万',
                                70:'70万',
                                100:'100万',
                                120:'120万'
                            }}
                        />
                    </Col>
                </Row>
            </div>
        );
    }
}
