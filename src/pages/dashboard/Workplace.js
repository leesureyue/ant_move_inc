import {Table} from 'antd';
import {connect} from 'dva';

function mapStateToProps(state) {
    return {
      cardsList: state.cards.cardsList,
      cardsLoading: state.loading.effects['cards/queryList'],
    };
  }
  
  export default connect(mapStateToProps)(List);