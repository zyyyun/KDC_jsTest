console.log("app is running!");

import Loading from './Loading.js';
import DarkModeToggle from './DarkModeToggle.js';
import SearchInput from './SearchInput.js';
import SearchResult from './SearchResult.js';
import ImageInfo from './ImageInfo.js';
import api from './api.js';
import Banner from './Banner.js';

class App {
  $target = null; //$ = dom을 가리키는것
  DEFAULT_PAGE = 1
  data = {
    items: [],
    page: this.DEFAULT_PAGE
  }

  constructor($target) { //target을 받아 초기화
    this.$target = $target;

    this.Loading = new Loading({
      $target,
    });
    
    this.searchInput = new DarkModeToggle({
      $target,
    });

    this.searchInput = new SearchInput({
      $target,
      onSearch: (keyword, limit) => {
        //로딩 show
        this.Loading.show();
        api.fetchCatsWithLimit(keyword, limit).then(({ data }) => {
          this.setState({
            items: data,
            page: this.DEFAULT_PAGE
          });
          this.Loading.hide();
          //로컬에 저장
          this.saveResult(data);
        });
      },
      onRandomSearch: () =>{
        this.Loading.show();
        api.fetchRandomCats().then(({data}) => {
          this.setState({
            items: data,
            page: this.DEFAULT_PAGE
          });
          this.Loading.hide();
        })
      }
    });

    this.Banner = new Banner({
      $target,
    });

    this.searchResult = new SearchResult({
      $target,
      initialData: this.data.items,
      onClick: cat => {
        console.log(cat);
        this.imageInfo.showDetail({
          visible: true,
          cat
        });
      },
      onNextPage: () =>{
        console.log('다음 페이지 로딩');
        this.Loading.show();
        const keywordHistory = localStorage.getItem
        ('keywordHistory') === null ? [] : localStorage.getItem
        ('keywordHistory').split(',');

        const lastkeyword = keywordHistory[0];
        const page = this.data.page + 1;
        api.fetchCatsPage(lastkeyword, page).then(({ data }) => {
          let newData = this.data.items.concat(data);
          this.setState({
            items: newData,
            page: page
          })
          this.Loading.hide();
        });
      }
    });

    this.imageInfo = new ImageInfo({
      $target,
      data: {
        visible: false,
        image: null
      }
    });
  }

  setState(nextData) {
    console.log(this);
    this.data = nextData;
    this.searchResult.setState(nextData.items);
  }

  saveResult(result){
    localStorage.setItem('lastResult', JSON.stringify(result)); 
  }

  init(){
    const lastResult = localStorage.getItem('keywordHistory') === null ? [] :
    JSON.parse(localStorage.getItem('keywordHistory')); 
    this.setState({
      items: lastResult,
      page: this.DEFAULT_PAGE
    });
  }
}

export default App;