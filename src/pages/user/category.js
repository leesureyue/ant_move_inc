import React from 'react';
import {
    List,Select,Card,Rate,Layout
} from 'antd';

import GlobalMenu from '../../component/GlobalMenu';
import GlobalFooter from '../../component/GlobalFooter';
import reqwest from 'reqwest';

import 'animate.css';
import styles from './category.less';

const {Meta}=Card;

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
const SearchBar=({onChange})=>{
    return(
        <div>
            <span>其他选项：</span>
             <Select showSearch className={styles.SearchBar}
                    placeholder='支持店家名/地区/搜索'
                    onChange={onChange}>
                    <Select.Option value='price'>价格从高到底</Select.Option>
                    <Select.Option value='comment'>综合排序</Select.Option>
                    <Select.Option value='rate'>评价最高</Select.Option>
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
                    <a href={`/shop/detail/?id=${item.id}`}>
                    <Card title={item.title} hoverable
                        cover={
                            <img src={require('../../images/estate-agencies-700x467.jpg')}/>
                        }>
                        <Rate disabled defaultValue={item.rate}/>
                        <Meta title={item.title}
                        description={item.description}/>
                    </Card>
                    </a>
                </List.Item>
            )}
                />
        </div>
    )
}
/**
 * 输出页面
 */
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
            {id:1,title:'shop one',description:'description one',rate:3},
            {id:2,title:'shop Two',description:'description two',rate:4},
            {id:3,title:'shop three',description:'descrption three',rate:5},
            {id:4,title:'shop Four',description:'description four',rate:3},
            {id:5,title:'shop Five',description:'description five',rate:4},
            {id:6,title:'shop Four',description:'description four',rate:3},
            {id:7,title:'shop Five',description:'description five',rate:4}
        ]
    }


    onChangeSearch=(value)=>{
        console.log("value",value);
    }

    render(){
        return (
            <div>

                <CategoryList category={this.state.categoryTitle}/>
                <SearchBar onChange={this.onChangeSearch}/>
                <ShopCardList dataSource={this.state.cardList}/>
            </div>
        )
    }
}

export default CategoryPage;