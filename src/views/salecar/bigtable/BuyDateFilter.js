import React, {Component} from 'react';
import {connect} from 'dva';
import {Row, Col, Button, DatePicker} from 'antd';

const {RangePicker} = DatePicker;

@connect(
    ({bigtable})=>({
        ...bigtable
    })
)
export default class BuyDateFilter extends Component {
    render () {
        return (
            <div>
                <Row style={{'display':this.props.buydate.length === 0 ? 'block' : 'none'}}>
                    <Col span={this.props.labelSpan}>
                        <b>购买日期：</b>
                    </Col>
                    <Col span={this.props.choseSpan}>
                        <RangePicker onChange={arr => {
                            const v = arr.map(item => item.unix() * 1000);
                            this.setState({
                                buydate: v
                            });
                        }} />
                    </Col>
                    <Col span={this.props.btnSpan}>
                        <Button onClick={()=>{
                            this.props.dispatch({'type' :'bigtable/更新列表SAGA', 'k' : 'buydate', 'v' :this.state.buydate});
                        }}>确定</Button>
                    </Col>
                </Row>
            </div>
        );
    }
}
