import React, { Component } from 'react'
import MenuConfig from './../../config/menuConfig'
import './index.css'
import {connect} from 'react-redux'
import {switchMenu} from './../../redux/action'
import { Menu, Icon } from 'antd';
import { NavLink } from 'react-router-dom';
const { SubMenu } = Menu;
class NavLeft extends Component {
  state = {
    currentKey:'/home'
  }

  handleClick = ({item}) => {
    const {dispatch} = this.props
    dispatch(switchMenu(item.props.title))
    // console.log(item)
    this.setState({
      currentKey:item.props.eventKey
    })
  }

  componentWillMount(){
    let currentKey = window.location.hash.replace(/#|\?.$/g,'')
    const menuTreeNode = this.renderMenu(MenuConfig)
    this.setState({
      currentKey,
      menuTreeNode
    })
  }
  //菜单渲染
  renderMenu = (data) => {
    return data.map((item) =>{
      if(item.children){
        return (
          <SubMenu title={item.title} key={item.key}>
            {this.renderMenu(item.children)}
          </SubMenu>
        )
      }
      return <Menu.Item title={item.title} key={item.key}>
        <NavLink to={item.key}>{item.title}</NavLink>
      </Menu.Item>
    })
  }
  render() {
    return (
      <div>
        <div className='logo'>
          <img src='/assets/logo-ant.svg' alt='' />
          <h1>Imooc MS</h1>
          <Menu
            onClick={this.handleClick} 
            selectedKeys={this.state.currentKey}
            theme='dark'
          >
            {this.state.menuTreeNode}
          </Menu>
        </div>
      </div>
    )
  }
}
export default connect()(NavLeft)