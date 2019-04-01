import React from 'react';
import classNames from 'classnames';
import styles from './index.less';
import {Row,Col} from 'antd';

const GlobalFooter = ({ className, links, copyright }) => {
    const clsString = classNames(styles.globalFooter, className);
    return (
      <div className={clsString}>
        {links && (
          <div>
            <Row>
            {links.map(link => ( 
              <Col span={6} className={styles.links} key={link.key}>
                <a key={link.key} target={link.blankTarget ? '_blank' : '_self'} href={link.href}>
                {link.title}
                </a>
              </Col>
              ))}
            </Row>
          </div>
        )}
        {copyright && <div className={styles.copyright}>{copyright}</div>}
      </div>
    );
  };
  
class GlobalFooterWrapper extends React.Component{
  
  render(){
    const links=[
      {title:'SpringBoot',key:'1',href:'http://SpringBoot.com'},
      {title:'AntDesign',key:'2',href:'http://antDesign.com'},
      {title:'React',key:'3',href:'http://baidu.com'},
      {title:'Spring',key:'4',href:'http://baidu.com'},
      {title:'MySQL',key:'5',href:'http://baidu.com'},
      {title:'IDEA',key:'6',href:'http://baidu.com'},
      {title:'MyBatis',key:'7',href:'http://baidu.com'},
      {title:'SpringCloud',key:'8',href:'http://baidu.com'},
       
    ];
    
    return(
      <GlobalFooter 
      className='global-footer' 
      links={links}
      copyright='@CopyRight · Leesure 河南大学软件学院'/>
    )
  }
}
export default GlobalFooterWrapper;