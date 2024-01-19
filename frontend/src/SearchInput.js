import KeywordHistory from "./KeywordHistory.js";

const TEMPLATE = '<input type="text">';

class SearchInput {
  constructor({ $target, onSearch, onRandomSearch}) {
    const $wrapper = document.createElement('section');
    $wrapper.className = 'SearchInputSection';
    $target.appendChild($wrapper);
    
    const $searchInput = document.createElement("input");
    this.$searchInput = $searchInput;
    this.$searchInput.placeholder = "고양이를 검색해보세요.|";

    $searchInput.className = "SearchInput";
    $wrapper.appendChild($searchInput);

    $searchInput.addEventListener("keypress", e => {
      if (e.key === 'Enter') {
        onSearch(e.target.value);
        //최근 키워드 저장
        this.KeywordHistory.addKeyword(e.target.value);
      }
    });

    const $randomButton = document.createElement("button");
    this.$randomButton = $randomButton;
    this.$randomButton.className = "RandomButton";
    this.$randomButton.textContent = '랜덤고양이';

    $wrapper.appendChild($randomButton);

    $randomButton.addEventListener("click", e => {
      onRandomSearch();
    });

    this.KeywordHistory = new KeywordHistory({
      $target: $wrapper,
      onSearch
    });
  }
  render() {}
}

export default SearchInput;