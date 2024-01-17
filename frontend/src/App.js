console.log("app is running!");

class App {
  $target = null; //$ = dom을 가리키는것
  data = []; 

  constructor($target) { //target을 받아 초기화
    this.$target = $target;

    this.Loading = new Loading({
      $target,
    });
    
    this.searchInput = new DarkModeToggle({
      $target,
      // onSearch: keyword => {
      //   api.fetchCats(keyword).then(({ data }) => this.setState(data));
      // }
    });

    this.searchInput = new SearchInput({
      $target,
      onSearch: keyword => {
        //로딩 show
        console.log('show');
        this.Loading.show();
        api.fetchCats(keyword).then(({ data }) => {
          this.setState(data);
          console.log('hide');
          this.Loading.hide();
          //로컬에 저장
          this.saveResult(data);
        });
      },
      onRandomSearch: () =>{
        this.Loading.show();
        api.fetchRandomCats().then(({data}) => {
          this.setState(data);
          this.Loading.hide();
        })
      }
    });

    this.searchResult = new SearchResult({
      $target,
      initialData: this.data,
      onClick: cat => {
        console.log(cat);
        this.imageInfo.showDetail({
          visible: true,
          cat
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
    this.searchResult.setState(nextData);
  }

  saveResult(result){
    console.log(result);
    localStorage.setItem('lastResult', JSON.stringify(result)); 
  }

  init(){
    const lastResult = localStorage.getItem('keywordHistory') === null ? [] :
    JSON.parse(localStorage.getItem('keywordHistory')); 
    this.setState(lastResult);
  }
}
