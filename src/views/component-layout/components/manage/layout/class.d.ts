
export type CommonClass = ClassLib[];

export type opClassList = {
    [key: string]: any;
}

export interface ClassLib {
    //集合的名称
    title: string;
    //可以控制的class列表
    children: Array<ClassInfo | ClassInfoRelations | ClassCate>;
}


export interface ClassInfo {
    title: string;
    class: string;
    //field是注入到opClassList的键
    field: string;
}

//与classinfo不同的是, 它没有field, 它通过上一层定义的field控制
export interface ClassInfoChild {
    title: string;
    class: string;
}

//关联class , 如flex开启后, flex的其它属性的class才能生效
export interface ClassInfoRelations {
    title: string;
    class: string;
    field: string;
    children: Array<ClassCate | ClassInfo>;
}

//一个class分类, 如果
export interface ClassCate {
    title: string;
    //操作方式 select:单选
    control: string;
    //field是注入到opClassList的键
    field: string;
    children: Array<ClassInfoChild>;
}