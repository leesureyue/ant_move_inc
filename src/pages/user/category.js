import React from 'react';
import {
    List,Select,Card
} from 'antd';
import { defaultCipherList } from 'constants';


//todo 这里写页面的类目条
const CategoryList = ({category})=>{
     
    return(
        <div>
            <span>所属分类</span>
            {
                category.data.map(item=>(
                    <span key={item.id}>
                        <a href={item.href}>
                        {item.value}
                        </a>
                    </span>
                ))
            }
        </div>
    )
}
//todo 这里写搜索框
const SearchBar=({onBlur})=>{
    return(
        <div>
            <span>其他选项：</span>
             <Select showSearch
                    placeholder='支持店家名/地区/搜索'
                    onBlur={onBlur}>
                    
             </Select>
        </div>
    )
}

/**
 * 商店列表
 * @param {List} dataSource 数据来源 
 * @param {function} onClick 点击事件
 * @param {number}  id  点击的商店id
 */
const ShopCardList=({dataSource,onClick,id})=>{
    return(
        <div>
            <List grid={{
                gutter:16,xs:1,sm:2,md:4,lg:4,xl:6,xxl:3,
            }}
            dataSource={dataSource}
            renderItem={item=>(
                <List.Item>
                    <Card title={item.title}>{item.description}</Card>
                </List.Item>
            )}
                />
        </div>
    )
}

class CategoryPage extends React.Component{
    
   constructor(props) {
       super(props);
   }
    
    state={
        categoryTitle:{
            data:[
                {id:1,href:'http://localhost:8000',value:'category One'},
                {id:2,href:'http://localhost:8000',value:'category Two'},
                {id:3,href:'http://localhost:8000',value:'category Three'}
            ]
        },
        cardList:[
            {title:'shop one',description:'description one',rate:3},
            {title:'shop Two',description:'description two',rate:4},
            {title:'shop three',description:'descrption three',rate:5}
        ]
    }
    render(){
        return (
            <div>
                <CategoryList category={this.state.categoryTitle}/>
                <ShopCardList dataSource={this.state.cardList}/>
            </div>
        )
    }
}

export default CategoryPage;