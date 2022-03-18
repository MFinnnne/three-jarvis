export class Config {

    public static zTreeSetting = {
        data: {
            simpleData: {
                enable: false,  //true 、 false 分别表示 使用 、 不使用 简单数据模式
                idKey: 'id',  //节点数据中保存唯一标识的属性名称
                pIdKey: 'parentId',    //节点数据中保存其父节点唯一标识的属性名称
                rootPId: -1,  //用于修正根节点父节点数据，即 pIdKey 指定的属性值
            },
        },
        check: {
            enable: true,  //true 、 false 分别表示 显示 、不显示 复选框或单选框
            nocheckInherit: true,  //当父节点设置 nocheck = true 时，设置子节点是否自动继承 nocheck = true
        },
    };
}
