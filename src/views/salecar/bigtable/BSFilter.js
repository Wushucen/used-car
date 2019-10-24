import React, {Component} from 'react';
import {connect} from 'dva';
import {Row, Col, Tabs} from 'antd';
import classnames from 'classnames';
const {TabPane} = Tabs;

@connect(
    ({bigtable}) => ({
        ...bigtable
    })
)
export default class BSFilter extends Component {
    constructor () {
        super();
        this.state = {
            nowCapital : ''
        };
    }
    componentWillMount () {
        this.props.dispatch({'type': 'bigtable/获取所有品牌SAGA'});
    }
    componentWillReceiveProps (nextProp) {
        if (nextProp.brand === '') {
            this.setState({
                nowCapital :''
            });
        }
    }
    render () {
        if (Object.keys(this.props.allbs).length === 0) return null;
        return (
            <div className='bsfilter_box'>
                <Row className='myrow'>
                    <Col span={this.props.labelSpan}>
                        <b>品牌：</b>
                    </Col>
                    <Col span={20}>
                        <Tabs defaultActiveKey='1'>
                            {
                                Object.keys(this.props.allbs).map(item => <TabPane tab={item} key={item}>
                                    {
                                        Object.keys(this.props.allbs[item]).map(brand=> <a key={brand} className={classnames(['tab_a', {
                                            'cur':this.props.brand === brand
                                        }])} onClick={()=>{
                                            this.props.dispatch({'type':'bigtable/更新列表SAGA', 'k':'brand', 'v' : brand});
                                            this.setState({
                                                nowCapital:item
                                            });
                                        }}>
                                            {brand}
                                        </a>)
                                    }
                                </TabPane>)
                            }
                        </Tabs>
                    </Col>
                </Row>
                <Row className='myrow'>
                    <Col span={this.props.labelSpan}>
                        <b>车系：</b>
                    </Col>
                    <Col span={this.props.choseSpan}>
                        {
                            (()=>{
                                if (this.state.nowCapital !== '' && this.props.brand !== '') {
                                    return this.props.allbs[this.state.nowCapital][this.props.brand].map(series => <a className={classnames(['tab_a', {
                                        'cur': this.props.series === series
                                    }])} key={series} onClick={()=>{
                                        this.props.dispatch({'type':'bigtable/更新列表SAGA', 'k':'series', 'v':series});
                                    }}>
                                        {series}
                                    </a>);
                                }
                            })()
                        }
                    </Col>
                </Row>
            </div>
        );
    }
}
