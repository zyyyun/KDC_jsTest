class SearchResult {
  $searchResult = null;
  data = null;
  onClick = null;

  constructor({ $target, initialData, onClick ,onNextPage }) {
    const $wrapper = document.createElement('section');
    this.$searchResult = document.createElement("ul");
    this.$searchResult.className = "SearchResult";
    $wrapper.appendChild(this.$searchResult);
    $target.appendChild($wrapper);

    this.data = initialData;
    this.onClick = onClick;
    this.onNextPage = onNextPage;

    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  listObserver = new IntersectionObserver((items, observer) => {
    items.forEach(item =>{    
      //아이템이 화면에 보일 때
      if (items.isIntersecting){
        //이미지를 로드한다
        item.target.querySelector('img').src = item.target
        .querySelector('img').dataset.src;

        //마지막 요소를 찾아낸다
        // console.log(this.data.length);
        let dataIndex = Number(item.target.dataset.index);
        // console.log(dataIndex);
        //마지막 요소라면? nextPage 호출
        if(dataIndex + 1 === this.data.length){
          console.log('마지막');
          this.onNextPage();
        }
      }
    })
  });

  render() {
    this.$searchResult.innerHTML = this.data
      .map(
        (cat, index) => `
          <li class="item" data-index=${index}>
            <img src="https://via.placeholder.com/200*300"
            data-src=${cat.url} alt=${cat.name} />
          </li>
        `
      )
      .join("");

    this.$searchResult.querySelectorAll(".item").forEach(($item, index) => {
      $item.addEventListener("click", () => {
        this.onClick(this.data[index]);
      });

      this.listObserver.observe($item);
    });
  }
}
