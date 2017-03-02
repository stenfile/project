/**
 * Vuex
 * http://vuex.vuejs.org/zh-cn/intro.html
 */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const now = new Date();
const store = new Vuex.Store({
    state: {
        // 当前用户
        user: {
            name: '测试1',
            img: 'dist/images/1.jpg'
        },
        // 会话列表
        sessions: [
            {
                id: 1,
                user: {
                    name: 'vue',
                    img: 'dist/images/2.png'
                },
                messages: [
                    {
                        content: 'Hello，这是一个基于Vue + Vuex + Webpack构建的简单chat页面，聊天记录保存在localStorge。',
                        date: now
                    }, {
                        content: '这是测试用的一句话',
                        date: now
                    }
                ]
            },
            {
                id: 3,
                user: {
                    name: '测试3',
                    img: 'dist/images/3.jpg'
                },
                messages: []
            },
            {
                id: 4,
                user: {
                    name: '测试4',
                    img: 'dist/images/3.jpg'
                },
                messages: []
            },
            {
                id: 5,
                user: {
                    name: '测试5',
                    img: 'dist/images/3.jpg'
                },
                messages: []
            },
            {
                id: 6,
                user: {
                    name: '测试6',
                    img: 'dist/images/3.jpg'
                },
                messages: []
            },
            {
                id: 7,
                user: {
                    name: '测试7',
                    img: 'dist/images/3.jpg'
                },
                messages: []
            },
            {
                id: 8,
                user: {
                    name: '测试8',
                    img: 'dist/images/3.jpg'
                },
                messages: []
            },
            {
                id: 9,
                user: {
                    name: '测试9',
                    img: 'dist/images/3.jpg'
                },
                messages: []
            }
        ],
        // 当前选中的会话
        currentSessionId: 1,
        // 过滤出只包含这个key的会话
        filterKey: ''
    },
    mutations: {
        INIT_DATA (state) {
            let data = localStorage.getItem('vue-chat-session');
            if (data) {
                state.sessions = JSON.parse(data);
            }
        },
        // 发送消息
        SEND_MESSAGE ({ sessions, currentSessionId }, content) {
            let session = sessions.find(item => item.id === currentSessionId);
            session.messages.push({
                content: content,
                date: new Date(),
                self: true
            });
        },
        // 选择会话
        SELECT_SESSION (state, id) {
            state.currentSessionId = id;
        } ,
        // 搜索
        SET_FILTER_KEY (state, value) {
            state.filterKey = value;
        }
    }
});

store.watch(
    (state) => state.sessions,
    (val) => {
        console.log('CHANGE: ', val);
        localStorage.setItem('vue-chat-session', JSON.stringify(val));
    },
    {
        deep: true
    }
);

export default store;
export const actions = {
    initData: ({ dispatch }) => dispatch('INIT_DATA'),
    sendMessage: ({ dispatch }, content) => dispatch('SEND_MESSAGE', content),
    selectSession: ({ dispatch }, id) => dispatch('SELECT_SESSION', id),
    search: ({ dispatch }, value) => dispatch('SET_FILTER_KEY', value)
};
