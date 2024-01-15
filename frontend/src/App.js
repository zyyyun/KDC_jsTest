console.log("app is running!");

class App {
  $target = null; //$ = dom을 가리키는것
  data = []; 

  constructor($target) { //target을 받아 초기화
    this.$target = $target;

    // this.DarkModeToggle = new this.DarkModeToggle({
    //   $target,
    // });

    this.searchInput = new SearchInput({
      $target,
      onSearch: keyword => {
        api.fetchCats(keyword).then(({ data }) => this.setState(data));
      }
    });

    this.searchResult = new SearchResult({
      $target,
      initialData: this.data,
      onClick: image => {
        this.imageInfo.setState({
          visible: true,
          image
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
}
