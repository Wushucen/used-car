import axios from 'axios';
import querystring from 'querystring';

export default {
    namespace:'bigtable',
    state:{
        current:1,
        columnsArr: [],
        color: [],
        exhaust:[],
        fuel:[]
    },
    reducers:{
        更新列 (state, {columnsArr}) {
            return {
                ...state,
                columnsArr
            };
        },
        更新结果 (state, {results}) {
            return {
                ...state,
                results
            };
        },
        更新列表 (state, {k, v}) {
            return {
                ...state,
                [k]: v
            };
        }
    },
    effects:{
        *获取列中的本地数据 (action, {put}) {
            // 试着从本地缓存中读取column字段
            const columnsFromLocalStorage = localStorage.getItem('columns');
            // 如果清除本地缓存后，会报错
            // 从本地存储中读取每一列的存储数据
            // 如果字段中读取出来的是null，表示用户是第一次来本网站或清除过缓存，那么这个时候，我们需要给用户设定一个默认的数据
            if (columnsFromLocalStorage === null) {
                localStorage.setItem('columns', JSON.stringify(['id', 'image', 'brand', 'color', 'fuel']));
            }
            // 再次从本地存储中读取存储数据，并转换
            const columnsArr = JSON.parse(localStorage.getItem('columns'));
            // console.log(columnsArr);
            yield put({'type':'更新列', columnsArr});
        },
        *设置列中的数据存到本地 ({columns}, {put}) {
            console.log(columns);
            // getItem是获取到数据 setItem是输出数据
            localStorage.setItem('columns', JSON.stringify(columns));
            yield put({'type':'获取列中的本地数据'});
        },
        *初始化 (action, {put, select}) {
            const {color, exhaust, fuel} = yield select(({bigtable}) => bigtable);
            const {results, total} = yield axios.get('/api/car?' + querystring.stringify({
                color : color.join('v')
            })).then(data => data.data);
            console.log(results);
            yield put({'type':'更新结果', results});
        },
        *更新列表SAGA ({k, v}, {put}) {
            yield put({'type':'更新列表', k, v});
            yield put({'type':'初始化'});
        }
    }
};