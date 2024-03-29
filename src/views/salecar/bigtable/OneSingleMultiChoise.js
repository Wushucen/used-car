import React, {Component} from 'react';
import {connect} from 'dva';
import classnames from 'classnames';
import {Row, Col, Button} from 'antd';

@connect(
    ({bigtable})=>({
        ...bigtable
    })
)
export default class OneSingleMultiChoise extends Component {
    constructor () {
        super();
        this.state = {
            isMultiple :false,
            // 已经选中的项
            arr:[]
        };
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps[this.props.k] !== this.props[this.props.k]) {
            this.setState({
                isMultiple : false,
                arr:[]
            });
        }
    }
    render () {
        return (
            <div className='myrow' style={{'display': this.props[this.props.k].length === 0 ? 'block' : 'none'}}>
                <Row>
                    <Col span={this.props.labelSpan}>
                        <b>{this.props.c}:</b>
                    </Col>
                    <Col span={this.props.choseSpan}>
                        {
                            this.props.options.map(item=> <span
                                className={classnames(['c_span', {
                                    'cur': this.state.arr.includes(item)
                                }])}
                                key={item}
                                onClick={()=>{
                                    if (this.state.isMultiple) {
                                        if (this.state.arr.includes(item)) {
                                            this.setState({
                                                arr:this.state.arr.filter(_item => _item !== item)
                                            });
                                        } else {
                                            this.setState({
                                                arr : [...this.state.arr, item]
                                            });
                                        }
                                    } else {
                                        this.props.dispatch({'type':'bigtable/更新列表SAGA', 'k': this.props.k, 'v':[item]});
                                    }
                                }}
                            >
                                {item}
                            </span>)
                        }
                    </Col>
                    <Col span={this.props.btnSpan}>
                        {
                            this.state.isMultiple ? <Button type='primary' onClick={()=>{
                                this.props.dispatch({'type':'bigtable/更新列表SAGA', 'k':this.props.k, 'v':this.state.arr});
                            }}>确定</Button> : <Button onClick={()=>{
                                this.setState({
                                    isMultiple :true
                                });
                            }}>多选</Button>
                        }
                    </Col>
                </Row>
            </div>
        );
    }
}
