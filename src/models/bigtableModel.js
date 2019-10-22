export default {
    namespace:'bigtable',
    state:{
        current:1,
        columnsArr: []
    },
    reducers:{
        更新列 (state, {columnsArr}) {
            return {
                ...state,
                columnsArr
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
            console.log('❤');
            console.log(columnsArr);
            yield put({'type':'更新列', columnsArr});
        }
    }
};