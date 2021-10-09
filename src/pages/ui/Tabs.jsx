import {Card, message,Tabs,Icon} from 'antd'
import './ui.less'
import React, { Component } from 'react'
const TabPane = Tabs.TabPane;
export default class ITabs extends Component {
    state={}
    newTabIndex=1;
    handleCallback = (key) => {
        message.info(`Hi,您选择了页签${key}，你工资一定18000+`)
    }
    componentWillMount(){
        const panes = [
            {
                title:'Tab 1',
                content:'恭喜月薪，18000元+',
                key:'1'
            },
            {
                title:'Tab 2',
                content:'恭喜月薪，19000元+',
                key:'2'
            },
            {
                title:'Tab 3',
                content:'恭喜月薪，20000元+',
                key:'3'
            },
        ] 
        this.setState({
            panes,
            activeKey:panes[0].key
        })
    }
    onChange = (activeKey) => {
        this.setState({
            activeKey
        })
    }
    onEdit = (targetKey, action) => {
        this[action](targetKey);
    };

    add = () => {
        const { panes } = this.state;
        const activeKey = `newTab${this.newTabIndex++}`;
        const newPanes = [...panes];
        newPanes.push({ title: `${activeKey}`, content: 'Content of new Tab', key: activeKey });
        this.setState({
            panes: newPanes,
            activeKey,
        });
    };

    remove = targetKey => {
        const { panes, activeKey } = this.state;
        let newActiveKey = activeKey;
        let lastIndex;
        panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const newPanes = panes.filter(pane => pane.key !== targetKey);
        if (newPanes.length && newActiveKey === targetKey) {
            if (lastIndex >= 0) {
                newActiveKey = newPanes[lastIndex].key;
            } else {
                newActiveKey = newPanes[0].key;
            }
        }
        this.setState({
            panes: newPanes,
            activeKey: newActiveKey,
        });
    };
    render() {
        let {panes , activeKey} = this.state
        return (
            <div>
                <Card title='Tab页签' className='card-wrap'>
                    <Tabs defaultActiveKey='1' onChange={this.handleCallback}>
                        <TabPane tab='Tab 1' key='1'>恭喜月薪，18000元</TabPane>
                        <TabPane tab='Tab 2' key='2'>恭喜月薪，19000元</TabPane>
                        <TabPane tab='Tab 3' key='3'>恭喜月薪，20000元</TabPane>
                    </Tabs>
                </Card>
                <Card title='Tab带图页签' className='card-wrap'>
                    <Tabs defaultActiveKey='1' onChange={this.handleCallback}>
                        <TabPane tab={<span><Icon type='plus' />Tab 1</span>} key='1'>恭喜月薪，18000元</TabPane>
                        <TabPane tab={<span><Icon type='edit' />Tab 2</span>} key='2'>恭喜月薪，19000元</TabPane>
                        <TabPane tab={<span><Icon type='delete' />Tab 3</span>} key='3'>恭喜月薪，20000元</TabPane>
                    </Tabs>
                </Card>
                <Card title='Tab不可点击页签' className='card-wrap'>
                    <Tabs defaultActiveKey='1' onChange={this.handleCallback}>
                        <TabPane tab={<span><Icon type='plus' />Tab 1</span>} key='1'>恭喜 ， 加油</TabPane>
                        <TabPane tab={<span><Icon type='edit' />Tab 2</span>} key='2' disabled>恭喜 ， 加油</TabPane>
                        <TabPane tab={<span><Icon type='delete' />Tab 3</span>} key='3'>恭喜 ， 加油</TabPane>
                    </Tabs>
                </Card>
                <Card title='Tab可编辑页签' className='card-wrap'>
                    <Tabs
                        onChange={this.onChange} 
                        defaultActiveKey='1' 
                        activeKey={activeKey}
                        type='editable-card'
                        onEdit={this.onEdit}
                    >
                        {
                            panes.map(panes=>{
                                return <TabPane tab={panes.title} key={panes.key}  />
                            })
                        }
                    </Tabs>
                </Card>
            </div>
        )
    }
}
