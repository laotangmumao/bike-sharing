import React, { Component } from 'react'
import { HashRouter , Route , Router , Switch ,Redirect } from 'react-router-dom'
import App from './App'
import Login from './pages/login'
import Admin from './admin'
import Buttons from './pages/ui/Buttons'
import NoMatch from './pages/nomatch'
import Modals from './pages/ui/Modals'
import Loading from './pages/ui/Loading'
import Notice from './pages/ui/Notice'
import Messages from './pages/ui/Messages'
import ITabs from './pages/ui/Tabs'
import Gallery from './pages/ui/Gallery'
import ICarousel from './pages/ui/Carousel'
import FormLogin from './pages/form/Login'
import FormRegister from './pages/form/Register'
import BasicTable from './pages/table/BasicTable'
import HighTable from './pages/table/HighTable'
import City from './pages/city'
import Order from './pages/order'
import Common from './Common'
import OrderDetail from './pages/order/detail'
import User from './pages/user'
import BikeMap from './pages/map/BikeMap'
import Bar from './pages/echarts/bar'
import Pie from './pages/echarts/pie'
import Line from './pages/echarts/line'
import RichText from './pages/rich'
import Permission from './pages/permission'
import Home from './pages/home'

export default class IRouter extends Component {
    render() {
        return (
            <div>
                <HashRouter>
                    <App>
                        <Switch>
                            <Route path='/login' component={Login} />
                            <Route path='/common'  render={()=>
                                <Common>
                                    <Route path='/common/order/detail/:orderId' component={OrderDetail} />
                                </Common>
                            }

                            />
                            <Route path='/' render={()=>
                                <Admin>
                                    <Switch>
                                        <Route path='/home' component={Home} />
                                        <Route  path='/ui/buttons' component={Buttons} />
                                        <Route  path='/ui/modals' component={Modals} />
                                        <Route  path='/ui/loadings' component={Loading} />
                                        <Route path='/ui/notification' component={Notice} />
                                        <Route path='/ui/messages' component={Messages} />
                                        <Route path='/ui/tabs' component={ITabs} />
                                        <Route path='/ui/gallery' component={Gallery} />
                                        <Route path='/ui/carousel' component={ICarousel} />
                                        <Route path='/form/login' component={FormLogin} />
                                        <Route path='/form/reg' component={FormRegister} />
                                        <Route path='/table/basic' component={BasicTable} />
                                        <Route path='/table/high' component={HighTable} />
                                        <Route path='/city' component={City} />
                                        <Route path='/order' component={Order} />
                                        <Route path='/user' component={User} />
                                        <Route path='/bikeMap' component={BikeMap} />
                                        <Route path='/echarts/bar' component={Bar} />
                                        <Route path='/echarts/pie' component={Pie} />
                                        <Route path='/echarts/line' component={Line} />
                                        <Route path='/rich' component={RichText} />
                                        <Route path='/permission' component={Permission} />
                                        <Redirect to='/home' />
                                        <Route  component={NoMatch} />
                                        
                                    </Switch>
                                </Admin>
                            } />
                        </Switch>
                    </App>
                </HashRouter>
            </div>
        )
    }
}
