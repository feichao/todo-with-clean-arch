window.initData = function() {
  localStorage.setItem('CleanTodo::Todos', JSON.stringify([{
    id: 100000001,
    desc: '制定代码审核流程机制',
    isDone: false,
    assigners: [900000001],
    createdBy: 900000001,
    deadline: 1646471837000,
    createDate: 1646206994841,
    updateDate: 1646206994841,
  },{
    id: 100000002,
    desc: '选举文档委员和技术委员',
    isDone: true,
    assigners: [900000001, 900000002, 900000004],
    createdBy: 900000001,
    deadline: 1646126237000,
    createDate: 1646093837000,
    updateDate: 1646111837000,
  },{
    id: 100000003,
    desc: '交互视觉规范',
    isDone: true,
    assigners: [900000002],
    createdBy: 900000001,
    deadline: 1646471867000,
    createDate: 1646093837000,
    updateDate: 1646111837000,
  },{
    id: 100000004,
    desc: '完成新技术架构的 Demo',
    isDone: false,
    assigners: [900000001, 900000003],
    createdBy: 900000001,
    deadline: 1646282036500,
    createDate: 1646093837000,
    updateDate: 1646111837000,
  }]));

  localStorage.setItem('CleanTodo::Users', JSON.stringify([{
    id: 900000001,
    name: 'Frank',
    avatar: '',
    createDate: 1641014237000,
    updateDate: 1641014237000,
  },{
    id: 900000002,
    name: 'Lily',
    avatar: '',
    createDate: 1641014237000,
    updateDate: 1641014237000,
  }, {
    id: 900000003,
    name: 'Duck',
    avatar: '',
    createDate: 1641014237000,
    updateDate: 1641014237000,
  }, {
    id: 900000004,
    name: 'Make',
    avatar: '',
    createDate: 1641014237000,
    updateDate: 1641014237000,
  }]));
}

export {};