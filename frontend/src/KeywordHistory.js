class KeywordHistory{
    $keywordHistory = null;
    data = null;

    constructor({ $target, onSearch}){
        const $keywordHistory = document.createElement('ul');
        this.$keywordHistory = $keywordHistory;
        this.$keywordHistory.className = 'KeywordHistory';
        $target.appendChild(this.$keywordHistory);

        // this.data = [
        //     '아',
        //     '고양이',
        //     'cat'
        // ];

        this.onSearch = onSearch;
        this.init();
        this.render();
    }

    init(){
        const data = this.getHistory();
        this.setState(data)
    }
    
    addKeyword(keyword){
        //최근 키워드 저장
        let keywordHistory = this.getHistory();
        keywordHistory.unshift(keyword);
        keywordHistory = keywordHistory.slice(0, 5);
        localStorage.setItem('keywordHistory', keywordHistory.join(','));
    }

    getHistory(){
        return localStorage.getItem('keywordHistory') === null ? [] :
        localStorage.getItem('keywordHistory').split(','); 
    }

    setState(nextData){
        this.data = nextData;
        this.render();
    }

    render(){
        this.$keywordHistory.innerHTML = this.data
        .map(
            keyword => `
                <li><button>${keyword}</button></li>
            `
        ).join('');

        this.$keywordHistory.querySelectorAll('li button').forEach(
        ($item, index) => {
            $item.addEventListener('click', () =>{
                console.log(this.data[index]);
                this.onSearch(this.data[index]);
            });
        });
    }
}