import React from 'react';
import Dva from 'dva';

import App from './App.js';
import bigtableModel from './models/bigtableModel.js';

const app = Dva();

// 模型列表
app.model(bigtableModel);

// 路由
app.router(()=>{
    return <App />;
});

app.start('#app');
