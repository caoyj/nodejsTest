/**
 * 定义应用路
 */
import { HashRouter as Router } from 'react-router-dom';
import { Switch, Route } from 'react-router';
import React from 'react';

import routerConfig from './routerConfig';

/**
 * 将路由信息扁平化，继承上一级路由的 path
 * @param {Array} config 路由配置
 */
function recursiveRouterConfigV4(config = []) {
  const routeMap = [];
  config.forEach((item) => {
    const route = {
      path: item.path,
      layout: item.layout,
      component: item.component,
    };
    if (Array.isArray(item.children)) {
      route.childRoutes = recursiveRouterConfigV4(item.children);
    }
    routeMap.push(route);
  });
  return routeMap;
}

/**
 * 将扁平化后的路由信息生成 Route 节点
 *
 * @param {Element} container 路由容器
 * @param {object} router 路由对象
 * @param {string} contextPath 上层路由地址
 * @return {Route}
 * @example
 * <Switch>
 *   <Route exact path="/" component={Home} />
 *   <Route exact path="/page3" component={Page3} />
 *   